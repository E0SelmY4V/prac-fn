import * as fs from 'fs'
import path from 'path'
import P from 'scpo-proce'
import type { IfredArr } from 'accurtype'
import type { EventEmitter } from 'events'

const quFile: { [name: string]: P.Nxtable } = {}
const setOpn = <P extends any[], E extends any[]>(name: string, callback: P.CbNxt<P, [], E>) => quFile[name] = (quFile[name] || (quFile[name] = P)).next(callback).setBefore()
const quFunc: { [mod: string]: P.Nxtable } = {
	mkdir: P,
}
const setQue = <P extends any[], E extends any[]>(name: string, callback: P.CbNxt<P, [], E>) => quFunc[name] = quFunc[name].next(callback).setBefore()
const simulOpera = <P, R>(opn: (arg: P) => R) => (list: P[]) => P.all(list.map(e => opn(e)))
type ECom = NodeJS.ErrnoException
type PCom<P extends any[], E extends any[] = [ECom]> = P.Proce<P, E>
const queueOpera = <P, R extends P.ProceN>(opn: (arg: P) => R) => (list: P[]) => P.snake(list.map(e => t => opn(e).then(t))) as R
export const isExist = <N extends string>(file: N) => P((t: (...e: [boolean, N]) => void) => fs.access(file, fs.constants.F_OK, e => t(!e, file)))
export const isExists = simulOpera(isExist) as <N extends T[], T extends string>(list: N) => PCom<[boolean[], N], []>
export const testFiles = <N extends T[], T extends string = IfredArr<N, string>>(list: N) => P.snake(list.map(e => (t, o: (n: T) => void) => isExist(e).then(r => r ? o(e) : t()))).then((): false => false, e => e)
export const existFiles = <N extends T[], T extends string = IfredArr<N, string>>(list: N) => isExists(list).then((n, f, r: T[] = []) => (n.forEach((e, i) => e && r.push(f[i])), r))
export const readdir = (file: string) => P<[string[]], [ECom]>((t, o) => fs.readdir(file, 'utf-8', (e, d) => e ? o(e) : t(d)))
export const stat = (file: string) => setOpn<[fs.Stats, string], [ECom]>(file, (t, o) => fs.stat(file, (e, d) => e ? o(e) : t(d, file)))
export const stats = simulOpera(stat) as (list: string[]) => PCom<[fs.Stats[], string[]]>
export const statDir = (file: string) => readdir(file).then(e => stats(e.map(d => path.join(file, d)))).take(1)
export const isDirectory = (file: string) => stat(file).then(e => e.isDirectory())
export const isDirectorys = simulOpera(isDirectory) as (list: string[]) => PCom<[boolean[]]>
export const mkdir = (file: string) => setQue<[boolean], [ECom]>('mkdir', (t, o) => isExist(file).then(b => b ? stat(file).then(e => t(e.isDirectory()), o as P.CbNor) : fs.mkdir(file, e => e ? o(e) : t(true))))
export const mkdirs = queueOpera(mkdir)
export const mkdirAll = (file: string) => mkdirs(fileRoute(file))
export const mkdirsAll = queueOpera(mkdirAll)
export const rmdir = (file: string) => setOpn<[true], [ECom]>(file, (t, o) => fs.rmdir(file, e => e ? o(e) : t(true)))
export const rmdirs = queueOpera(rmdir)
export const rmdirAll = (file: string) => rmdirs(fileRoute(file).reverse())
export const rmdirsAll = queueOpera(rmdirAll)
export const unlink = (file: string) => setOpn<[true], [ECom]>(file, (t, o) => fs.unlink(file, e => e ? o(e) : t(true)))
export const unlinks = simulOpera(unlink) as (list: string[]) => PCom<[true[]]>
export const deleteAll = (file: string): PCom<[true]> => stat(file).then(s => s.isDirectory() ? statDir(file).then((s, f) => P.all(s.map((e, i) => e.isDirectory() ? deleteAll(f[i]) : unlink(f[i]))).then(() => rmdir(file))).take(2) : unlink(file)).take(1)
export const open = (file: string, flags: fs.OpenMode): PCom<[number]> => P((t, o) => fs.open(file, flags, (e, d) => e ? o(e) : t(d)))
type FsOpn = BufferEncoding | ({ encoding: BufferEncoding, flag?: string | undefined } & EventEmitter.Abortable)
export const read = (file: string, options: FsOpn = 'utf-8'): PCom<[string]> => setOpn(file, (t, o) => fs.readFile(file, options, (e, d) => e ? o(e) : t(d)))
export const reads = simulOpera(read) as (list: string[]) => PCom<[string[]]>
export const write = (file: string, data: string | NodeJS.ArrayBufferView = '', options: FsOpn = 'utf-8'): PCom<[true]> => setOpn(file, (t, o) => fs.writeFile(file, String(data), options, e => e ? o(e) : t(true)))
export const getFolderO = (file = '.', sep = path.sep) => {
	if (file[file.length - 1] === sep) return file
	const i = file.lastIndexOf(sep) + 1
	return i ? file.slice(0, i) : ''
}
export const getFolder = (file = '.') => getFolderO(file, '/')
export const fileRouteO = (folder = './', sep = path.sep) => {
	let r = ''
	const a = folder.split(sep)
	return a[a.length - 1] || a.pop(), a.map(e => r += e + sep)
}
export const fileRoute = (folder = '.') => fileRouteO(folder, '/')
export const sJoinO = (a: string, b: string, sep = path.sep) => a[a.length - 1].indexOf(sep) ? a + sep + b : a + b
export const sJoin = (a: string, b: string) => sJoinO(a, b, '/')
