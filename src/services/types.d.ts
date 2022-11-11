export interface Service {
    [key: string]: (...data: any) => Promise<any>;
}

type HeadersType = { [key: string]: HeadersInit };
