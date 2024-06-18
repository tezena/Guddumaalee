export declare function generateColor(str: string): string;
export declare function colorFromH(h: string | number): string;
export declare function getHSLValue(h: string | number, s: string | number, l: string | number): string;
export declare const fileTypeMap: {
    [key: string]: string;
};
export declare type ColorMap = {
    [key: string]: {
        color: string;
    };
};
export declare function createColorsFromString(strings: string[] | Set<string>): ColorMap;
export declare const colorMap: {
    [x: string]: {
        color: string;
    };
};
