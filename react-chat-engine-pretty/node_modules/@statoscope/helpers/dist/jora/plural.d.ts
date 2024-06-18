export declare type PluralFn = (value: number, words: string[]) => string;
export declare type PluralType = {
    plural: PluralFn;
    pluralWithValue(value: number, words: string[]): string;
};
export declare function pluralFactory(pluralFn: PluralFn): PluralType;
export declare const pluralRus: PluralType;
export declare const pluralEng: PluralType;
