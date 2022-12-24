import path from 'path'
import P from 'scpo-proce'
import type { Tostrable } from 'accurtype'

/**
 * |简·陋| - 各种方便好用的 JS 功能函数
 * @version 1.0.0
 * @author E0SelmY4V
 */
declare module "prac-fn/lang"
const apply = P.apply
export const isPathfwd = path.sep === '/'
export const pathType = (file = '') => {
	const bwd = file.indexOf('\\')
	return (file.indexOf('/') && bwd) ? 'both' : bwd ? '\\' : '/'
}
export const fwdPathHard = (n: string) => n.split('\\').join('/')
export const fwdPath = isPathfwd ? (n: string) => n : fwdPathHard
export const bwdPath = (n: string) => n.split('/').join('\\')
export const range = (start: number, stop: number, step = 1): number[] => Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step)
export const isArrlike = (n: any): n is ArrayLike<any> => typeof n === 'object' && isFinite(n.length)
export const getList = (list: any[]) => Array.isArray(list[0]) ? list[0] : list
export const tidyList = <T>(list: T[] = [], jdgFunc?: (n: T) => boolean, voidArr: T[] = []) => {
	if (list.length) {
		Array.isArray(list[0]) && (list = list[0])
		if (jdgFunc) {
			const rslt: T[] = []
			return list.forEach(e => jdgFunc(e) ? rslt.push(e) : false), rslt
		} else return list
	} else return voidArr
}
export const mSOpn = <P, R>(opn: (n: P) => R) => (...list: (P | P[])[]) => (getList(list) as P[]).map(e => opn(e))
export const cqtPath = isPathfwd ? fwdPath : bwdPath
export const cqtPaths = mSOpn(cqtPath)
export const mROpn = <P extends any[], R>(opn: (...arg: P) => R) => (...list: P[]) => list.map(e => apply(opn, null, e))
export const mergeObj = (a: any = {}, b: any = {}) => {
	if (Array.isArray(a) && Array.isArray(b)) a.push(...b)
	else for (let i in b)
		typeof b[i] === 'object' ? (
			typeof a[i] === 'undefined' && (a[i] = new b[i].constructor()),
			mergeObj(a[i], b[i])
		) : a[i] = b[i]
}
export const mergeObjs = mROpn(mergeObj)
const explodeReg_mem: { [str: string]: RegExp } = {}
export const explodeReg = (str: string) => {
	if (explodeReg_mem[str]) return explodeReg_mem[str]
	else try {
		return explodeReg_mem[str] = RegExp(str.slice(1, str.lastIndexOf('/')), str.slice(str.lastIndexOf('/') + 1))
	} catch (err) {
		return explodeReg_mem[str] = RegExp('')
	}
}
export const testRegSS = (exp: string, str: string) => explodeReg(exp).test(str)
export const testRegSP = (exp: string, strList: string[]) => {
	for (const str of strList) if (testRegSS(exp, str)) return true
	return false
}
export const testRegPS = (expList: string[], str: string) => {
	for (const exp of expList) if (testRegSS(exp, str)) return true
	return false
}
export const testRegPP = (expList: string[], strList: string[]) => {
	for (const exp of expList) for (const str of strList) if (testRegSS(exp, str)) return true
	return false
}
export const testReg = (exp: string[] | string, str: string[] | string): boolean => exports[
	'testReg' + (typeof exp === 'string' ? 'S' : 'P') + (typeof str === 'string' ? 'S' : 'P')
](exp, str)
export const preAlign = (str = '', num = 8, char = ' ') => {
	const len = num - str.length
	return char.repeat(len < 0 ? 0 : len) + str
}
export const postAlign = (str = '', num = 8, char = ' ') => {
	const len = num - str.length
	return str + char.repeat(len < 0 ? 0 : len)
}
export const fill0 = (num: Tostrable, len = 8) => preAlign(String(num), len, '0')
export enum LType {
	Server = 'P',
}
export const log = (type: LType, message: string) => console.log('Info ' + type + ' ' + getHMS() + ' ' + message)
export const serverLog = (info: string, pid: number) => log(LType.Server, postAlign(String(pid), 8) + info)
export class TimeBase extends Array {
	constructor(s = -1, ms = -1) {
		super()
		s !== -1 && (this[5] = s)
		ms !== -1 && (this[6] = ms)
	}
	0 = 12
	1 = 30
	2 = 24
	3 = 60
	4 = 60
	5 = 1000
	6 = 1
}
export namespace TIME {
	export const timeBase = new TimeBase()
	export const BASE = timeBase
	let t = 1
	export const MS_BASE = timeBase.reverse().map(v => t *= v).reverse()
	export const FUNC_NAME_UTC: [
		'getUTCFullYear', 'getUTCMonth', 'getUTCDate', 'getUTCHours', 'getUTCMinutes', 'getUTCSeconds', 'getUTCMilliseconds',
	] = [
			'getUTCFullYear', 'getUTCMonth', 'getUTCDate', 'getUTCHours', 'getUTCMinutes', 'getUTCSeconds', 'getUTCMilliseconds',
		]
}
export const getDiffDate = (diff: number) => new Date(new Date().getTime() + diff)
const otf2stf = (opn: (date: Date) => number[]) => (date = new Date()) => {
	const origin = opn(date)
	return ++origin[1], origin
}
export const getArrayTimeOrigin = (date = new Date()) => TIME.FUNC_NAME_UTC.map(e => date[e]())
export const getArrayTime = otf2stf(getArrayTimeOrigin)
export const getArrayYMDOrigin = (date = new Date()) => TIME.FUNC_NAME_UTC.slice(0, 3).map(e => date[e]())
export const getArrayYMD = otf2stf(getArrayYMDOrigin)
export const getArrayHMS = (date = new Date()) => TIME.FUNC_NAME_UTC.slice(3, -1).map(e => date[e]())
export const getYMD = (date = new Date()) => getArrayYMD(date).map(e => fill0(e, 2)).join('-')
export const getHMS = (date = new Date()) => getArrayHMS(date).map(e => fill0(e, 2)).join(':')
export const getTime = (date = new Date()) => getYMD(date) + ' ' + getHMS(date)
export const array2ms = (time: number[]) => time.reduce((n, v, i) => n + v * TIME.MS_BASE[i])
const setTimer_test = (dest: number[], todo: () => void, ordo: (err: Error) => void): any => {
	const now = getArrayTime()
	for (let i = 0; i < 7; ++i) {
		const diff = dest[i] - now[i]
		if (diff == 0) continue;
		if (diff > 1) return i === 6 && diff <= setTimer.base[6]
			? todo() : setTimeout(() => setTimer_test(dest, todo, ordo), setTimer.base.slice(i).reduce((n, c) => n * c))
		if (diff == 1) return setTimeout(() => setTimer_test(dest, todo, ordo), setTimer.base.slice(i + 1).reduce((n, c) => n * c))
		if (diff < 0) return array2ms(dest.map((e, i) => now[i] - e)) <= setTimer.overTime
			? todo() : ordo(new Error('No Time Machine'))
	}
	return todo()
}
export const setTimer = (dest: number[]) => P<[], [Error]>((todo, ordo) => setTimer_test(dest, todo, ordo))
setTimer.base = new TimeBase(10, 100)
setTimer.overTime = 3000
export const toPromise = <P extends any[], E extends any[]>(proce: P.Proce<P, E>) => new Promise<P[0]>((res, rej) => proce.then(res as P.CbNor, rej as P.CbNor))
