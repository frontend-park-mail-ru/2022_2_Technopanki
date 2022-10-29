// Reference: https://reactjs.org/docs/events.html#clipboard-events

import { attributes, events } from './constants';
import { PropsType } from '../../shared/common';

export const setProps = (element: HTMLElement, props: PropsType) => {
    Object.entries(props).forEach(([name, value]) => {
        if (name !== 'children') {
            if (name.startsWith('on')) {
                if (__DEV__) {
                    if (typeof value !== 'function') {
                        console.error('typeof value != function. value', value);
                        throw new Error('Invalid event type');
                    }
                }
                element.addEventListener(events[name], value);
            } else {
                if (name === 'dangerouslySetInnerHTML') {
                    // NOTE: this is being dangerous
                    element.innerHTML = <string>(
                        (<{ __html: string }>(<unknown>value)).__html
                    );
                } else {
                    element.setAttribute(
                        attributes[name],
                        <string>(<unknown>value),
                    );
                    if (__DEV__) {
                        if (typeof value === 'function') {
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
