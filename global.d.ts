declare global {
    type PartialExcept<T, K extends keyof T = keyof T> = Partial<Omit<T, K>> & Pick<T, K>;
}

export {};