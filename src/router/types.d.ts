export type Path = {
    path: string;
    callback: () => void;
    options?: Options;
};

export type Options = {
    pop: boolean;
    urlParams: string;
};

export interface RouterType {
    navigate(to: Path): void;
}
