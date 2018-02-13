declare module "fastdom" {
    export const clear: () => void;
    export const measure: (callback: () => void) => void;
    export const mutate: (callback: () => void) => void;
}
