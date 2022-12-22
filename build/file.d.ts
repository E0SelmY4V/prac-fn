/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import * as fs from 'fs';
import P from 'scpo-proce';
import type { IfredArr } from 'accurtype';
import type { EventEmitter } from 'events';
declare type ECom = NodeJS.ErrnoException;
declare type PCom<P extends any[], E extends any[] = [ECom]> = P.Proce<P, E>;
export declare const isExist: <N extends string>(file: N) => P.Proce<[boolean, N], [any]>;
export declare const isExists: <N extends T[], T extends string>(list: N) => PCom<[boolean[], N], []>;
export declare const testFiles: <N extends T[], T extends string = IfredArr<N, string>>(list: N) => P.Proce<[false | T], [any]>;
export declare const existFiles: <N extends T[], T extends string = IfredArr<N, string>>(list: N) => P.Proce<[T[]], [] | [any]>;
export declare const readdir: (file: string) => P.Proce<[string[]], [NodeJS.ErrnoException]>;
export declare const stat: (file: string) => P.Proce<[fs.Stats, string], [NodeJS.ErrnoException]>;
export declare const stats: (list: string[]) => PCom<[fs.Stats[], string[]]>;
export declare const statDir: (file: string) => P.Proce<[fs.Stats[], string[]], [any] | [NodeJS.ErrnoException]>;
export declare const isDirectory: (file: string) => P.Proce<[boolean], [any] | [NodeJS.ErrnoException]>;
export declare const isDirectorys: (list: string[]) => PCom<[
    boolean[]
]>;
export declare const mkdir: (file: string) => P.Proce<[boolean], [NodeJS.ErrnoException]>;
export declare const mkdirs: (list: string[]) => P.Proce<[boolean], [NodeJS.ErrnoException]>;
export declare const mkdirAll: (file: string) => P.Proce<[boolean], [NodeJS.ErrnoException]>;
export declare const mkdirsAll: (list: string[]) => P.Proce<[boolean], [NodeJS.ErrnoException]>;
export declare const rmdir: (file: string) => P.Proce<[true], [NodeJS.ErrnoException]>;
export declare const rmdirs: (list: string[]) => P.Proce<[true], [NodeJS.ErrnoException]>;
export declare const rmdirAll: (file: string) => P.Proce<[true], [NodeJS.ErrnoException]>;
export declare const rmdirsAll: (list: string[]) => P.Proce<[true], [NodeJS.ErrnoException]>;
export declare const unlink: (file: string) => P.Proce<[true], [NodeJS.ErrnoException]>;
export declare const unlinks: (list: string[]) => PCom<[
    true[]
]>;
export declare const deleteAll: (file: string) => PCom<[
    true
]>;
export declare const open: (file: string, flags: fs.OpenMode) => PCom<[
    number
]>;
declare type FsOpn = BufferEncoding | ({
    encoding: BufferEncoding;
    flag?: string | undefined;
} & EventEmitter.Abortable);
export declare const read: (file: string, options?: FsOpn) => PCom<[
    string
]>;
export declare const reads: (list: string[]) => PCom<[
    string[]
]>;
export declare const write: (file: string, data?: string | NodeJS.ArrayBufferView, options?: FsOpn) => PCom<[
    true
]>;
export declare const getFolderO: (file?: string, sep?: "\\" | "/") => string;
export declare const getFolder: (file?: string) => string;
export declare const fileRouteO: (folder?: string, sep?: "\\" | "/") => string[];
export declare const fileRoute: (folder?: string) => string[];
export declare const sJoinO: (a: string, b: string, sep?: "\\" | "/") => string;
export declare const sJoin: (a: string, b: string) => string;
export {};
