// Reference: https://reactjs.org/docs/events.html#clipboard-events

import { attributes, events } from './constants';
import { PropsType } from '../../shared/common';
import { createLogger } from 'typescript-plugin-css-modules/lib/helpers/logger';

class EventManager {
    private events = new Map<string, Function[]>();

    addEvent(eventName: string, callback: Function) {
        if (Array.isArray(this.events.get(eventName))) {
            this.events.set(eventName, [
                ...this.events.get(eventName),
                callback,
            ]);
        } else {
            this.events.set(eventName, [callback]);
        }
    }

    getEventListener(eventName: string) {
        return this.events.get(eventName);
    }

    removeEventListenersForEvent(eventName: string) {
        this.events.delete(eventName);
    }

    clearMap() {
        this.events.clear();
    }
}

EventTarget.prototype.__REACTS__event_manager = new EventManager();
EventTarget.prototype.addEventListenerBase =
    EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function (event, listener) {
    this.__REACTS__event_manager.addEvent(event, listener);
    this.addEventListenerBase(event, listener);
};

EventTarget.prototype.removeEventListenerBase =
    EventTarget.prototype.removeEventListener;
EventTarget.prototype.removeEventListener = function (eventName: string) {
    this.__REACTS__event_manager
        .getEventListener(eventName)
        ?.forEach(callback =>
            this.removeEventListenerBase(eventName, callback),
        );

    this.__REACTS__event_manager.removeEventListenersForEvent(eventName);
};

export const setProps = (element: HTMLElement, props: PropsType) => {
    Object.entries(props).forEach(([name, value]) => {
        if (name !== 'children') {
            if (name.startsWith('on')) {
                if (__DEV__) {
                    if (value && typeof value !== 'function') {
                        console.error('typeof value != function. value', value);
                        throw new Error('Invalid event type');
                    }
                }
                if (value) {
                    element.addEventListener(events[name], value);
                }
            } else {
                if (name === 'dangerouslySetInnerHTML') {
                    // NOTE: this is being dangerous
                    element.innerHTML = <string>(
                        (<{ __html: string }>(<unknown>value)).__html
                    );
                } else if (name === 'textContent') {
                    element.textContent = value as string;
                } else {
                    if (value) {
                        element.setAttribute(
                            attributes[name],
                            <string>(<unknown>value),
                        );
                    }
                    if (__DEV__) {
                        if (value && typeof value === 'function') {
                            console.error(
                                'typeof value == function. value',
                                value,
                            );
                            throw new Error('Invalid event type');
                        }
                    }
                }
            }
        }
    });
};
