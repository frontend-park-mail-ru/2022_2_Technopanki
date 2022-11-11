export type Path = {
    path: string;
    callback: () => void;
    options?: Options;
};

export type Options = {
    pop: boolean;
};

export interface RouterType {
    navigate(to: Path): void;
}
