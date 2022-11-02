export interface Action<T = any> {
    store: T;
    type: T;
    [key: string]: any;
}
