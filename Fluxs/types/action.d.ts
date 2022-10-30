export interface Action<T = any> {
    type: T;
    [key: string]: any;
}
