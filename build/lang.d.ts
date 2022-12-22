import P from 'scpo-proce';
import type { Tostrable } from 'accurtype';
export declare const isPathfwd: boolean;
export declare const pathType: (file?: string) => "\\" | "/" | "both";
export declare const fwdPathHard: (n: string) => string;
export declare const fwdPath: (n: string) => string;
export declare const bwdPath: (n: string) => string;
export declare const range: (start: number, stop: number, step?: number) => number[];
export declare const isArrlike: (n: any) => n is ArrayLike<any>;
export declare const getList: (list: any[]) => any[];
export declare const tidyList: <T>(list?: T[], jdgFunc?: ((n: T) => boolean) | undefined, voidArr?: T[]) => T[];
export declare const mSOpn: <P, R>(opn: (n: P) => R) => (...list: (P | P[])[]) => R[];
export declare const cqtPath: (n: string) => string;
export declare const cqtPaths: (...list: (string | string[])[]) => string[];
export declare const mROpn: <P extends any[], R>(opn: (...arg: P) => R) => (...list: P[]) => R[];
export declare const mergeObj: (a?: any, b?: any) => void;
export declare const mergeObjs: (...list: [a?: any, b?: any][]) => void[];
export declare const explodeReg: (str: string) => RegExp;
export declare const testRegSS: (exp: string, str: string) => boolean;
export declare const testRegSP: (exp: string, strList: string[]) => boolean;
export declare const testRegPS: (expList: string[], str: string) => boolean;
export declare const testRegPP: (expList: string[], strList: string[]) => boolean;
export declare const testReg: (exp: string[] | string, str: string[] | string) => boolean;
export declare const preAlign: (str?: string, num?: number, char?: string) => string;
export declare const postAlign: (str?: string, num?: number, char?: string) => string;
export declare const fill0: (num: Tostrable, len?: number) => string;
export declare enum LType {
    Server = "P"
}
export declare const log: (type: LType, message: string) => void;
export declare const serverLog: (info: string, pid: number) => void;
export declare class TimeBase extends Array {
    constructor(s?: number, ms?: number);
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
}
export declare namespace TIME {
    const timeBase: TimeBase;
    const BASE: TimeBase;
    const MS_BASE: number[];
    const FUNC_NAME_UTC: [
        'getUTCFullYear',
        'getUTCMonth',
        'getUTCDate',
        'getUTCHours',
        'getUTCMinutes',
        'getUTCSeconds',
        'getUTCMilliseconds'
    ];
}
export declare const getDiffDate: (diff: number) => Date;
export declare const getArrayTimeOrigin: (date?: Date) => number[];
export declare const getArrayTime: (date?: Date) => number[];
export declare const getArrayYMDOrigin: (date?: Date) => number[];
export declare const getArrayYMD: (date?: Date) => number[];
export declare const getArrayHMS: (date?: Date) => number[];
export declare const getYMD: (date?: Date) => string;
export declare const getHMS: (date?: Date) => string;
export declare const getTime: (date?: Date) => string;
export declare const array2ms: (time: number[]) => number;
export declare const setTimer: {
    (dest: number[]): P.Proce<[], [Error]>;
    base: TimeBase;
    overTime: number;
};
export declare const toPromise: <P extends any[], E extends any[]>(proce: P.Proce<P, E>) => Promise<P[0]>;
