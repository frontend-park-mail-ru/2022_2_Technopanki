// Reference: https://reactjs.org/docs/events.html#clipboard-events

import { attributes, events } from './constants';
import { PropsType } from '../../shared/common';
import { createLogger } from 'typescript-plugin-css-modules/lib/helpers/logger';

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
