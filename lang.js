'use strict';

const path = require('path');
const { scpoProce } = require('scpo-proce');

const isPathfwd = this.isPathfwd = path.sep === '/';
this.pathType = (file = '') => {
	const bwd = file.indexOf('\\');
	return (file.indexOf('/') && bwd) ? 'both' : bwd ? '\\' : '/';
};
this.fwdPath = isPathfwd ? (n = '') => n : (n = '') => n.split('\\').join('/');
this.bwdPath = (n = '') => n.split('/').join('\\');
this.range = (start, stop, step = 1) => Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step);
this.isArrlike = (n) => typeof n === 'object' && isFinite(n.length);
this.getList = (list) => this.isArrlike(list[0]) ? list[0] : list;
this.tidyList = (list = [], jdgFunc = null, voidArr = []) => {
	if (list.length) {
		this.isArrlike(list[0]) && (list = list[0]);
		if (jdgFunc) {
			const rslt = [];
			return list.forEach(e => jdgFunc(e) ? rslt.push(e) : false), rslt;
		} else return list;
	} else return voidArr;
};
this.mOpera = (opn) => (...list) => this.getList(list).map(e => opn(e));
this.cqtPath = isPathfwd ? this.fwdPath : this.bwdPath;
this.cqtPaths = this.mOpera(this.cqtPath);
const mOpera = (operation) => (...list) => list.map(e => this.isArrlike(e) ? operation.apply(null, e) : operation(e));
const mergeObj = (a = {}, b = {}) => {
	if (Array.isArray(a)) a.push(...b);
	else for (let i in b)
		typeof b[i] === 'object' ? (
			typeof a[i] === 'undefined' && (a[i] = new b[i].constructor()),
			mergeObj(a[i], b[i])
		) : a[i] = b[i];
};
this.mergeObj = mergeObj;
this.mergeObjs = mOpera(mergeObj);
/**@type {{[str:string]:RegExp}} */
const explodeReg_mem = {};
this.explodeReg = (/**@type {string} */str) => {
	if (explodeReg_mem[str]) return explodeReg_mem[str];
	else try {
		return explodeReg_mem[str] = new RegExp(str.slice(1, str.lastIndexOf('/')), str.slice(str.lastIndexOf('/') + 1));
	} catch (err) {
		return explodeReg_mem[str] = new RegExp();
	}
};
this.testRegSS = (exp, str) => this.explodeReg(exp).test(str);
this.testRegSP = (exp, strList) => {
	for (let i = strList.length - 1; i >= 0; i--)
		if (this.testRegSS(exp, strList[i])) return true;
	return false;
}
this.testRegPS = (expList, str) => {
	for (let i = expList.length - 1; i >= 0; i--)
		if (this.testRegSS(expList[i], str)) return true;
	return false;
}
this.testRegPP = (expList, strList) => {
	for (let i = expList.length - 1; i >= 0; i--)
		for (let j = strList.length - 1; j >= 0; j--)
			if (this.testRegSS(expList[i], strList[j])) return true;
	return false;
}
this.testReg = (exp, str) => this[
	'testReg' + (typeof exp === 'string' ? 'S' : 'P') + (typeof str === 'string' ? 'S' : 'P')
](exp, str);
this.fillSpace = (str = '', num = 8) => {
	const n = String(str), c = num - n.length;
	return ' '.repeat(c) + n;
};
this.pushSpace = (str = '', num = 8) => {
	const n = String(str), c = num - n.length;
	return n + ' '.repeat(c);
};
this.fill0 = (str = '', num = 8) => {
	const f = str < 0, n = String(f ? -str : str), c = num - n.length;
	let rslt = '';
	if (c > 0) rslt = '0'.repeat(c);
	return (f ? '-' : '') + rslt + n;
};
this.log = (type, message) => console.log('Info ' + type + ' ' + this.getHMS() + ' ' + message);
this.serverLog = (info, pid) => this.log('P', this.pushSpace(pid, 8) + info);
class TimeBase extends Array {
	constructor(s = -1, ms = -1) {
		super();
		s !== -1 && (this[5] = s);
		ms !== -1 && (this[6] = ms);
	}
	0 = 12; 1 = 30; 2 = 24;
	3 = 60; 4 = 60; 5 = 1000; 6 = 1;
};
const timeBase = new TimeBase();
const TIME = {
	BASE: timeBase,
	MS_BASE: (() => {
		let t = 1;
		return timeBase.reverse().map(v => t *= v).reverse();
	})(),
	FUNC_NAME_UTC: [
		'FullYear',
		'Month',
		'Date',
		'Hours',
		'Minutes',
		'Seconds',
		'Milliseconds'
	].map(e => 'getUTC' + e),
};
this.TIME = TIME;
this.getDiffDate = (diff) => new Date(new Date().getTime() + diff);
const orif2stdf = (opn) => (date = new Date()) => {
	const origin = opn(date);
	origin[1]++;
	return origin;
};
this.getArrayTimeOrigin = (date = new Date()) => TIME.FUNC_NAME_UTC.map(e => date[e]());
this.getArrayTime = orif2stdf(this.getArrayTimeOrigin);
this.getArrayYMDOrigin = (date = new Date()) => TIME.FUNC_NAME_UTC.slice(0, 3).map(e => date[e]());
this.getArrayYMD = orif2stdf(this.getArrayYMDOrigin);
this.getArrayHMS = (date = new Date()) => TIME.FUNC_NAME_UTC.slice(3, -1).map(e => date[e]());
this.getYMD = (date = new Date()) => this.getArrayYMD(date).map(e => this.fill0(e, 2)).join('-');
this.getHMS = (date = new Date()) => this.getArrayHMS(date).map(e => this.fill0(e, 2)).join(':');
this.getTime = (date = new Date()) => this.getYMD(date) + ' ' + this.getHMS(date);
this.array2ms = (...time) => this.getList(time).reduce((n, v, i) => n + v * TIME.MS_BASE[i]);
this.setTimer = (...time) => scpoProce((todo, ordo) => this.setTimer_test(this.getList(time).map(e => parseInt(e)), todo, ordo));
this.setTimer_base = new TimeBase(10, 100);
this.setTimer_over = 3000;
this.setTimer_test = (dest, todo, ordo) => {
	const now = exports.getArrayTime(), nextTest = () => this.setTimer_test(dest, todo, ordo);
	for (let i = 0; i < 7; i++) {
		let diff = dest[i] - now[i];
		if (diff < 0) {
			if (this.array2ms(dest.map((e, i) => e - now[i])) <= -this.setTimer_over) return todo();
			else return ordo(new Error('No Time Machine'));
		}
		if (diff >= 2) {
			if (i === 6 && diff <= this.setTimer_base[6]) return todo();
			else return setTimeout(nextTest, this.setTimer_base.slice(i).reduce((n, c) => n * c));
		}
		if (diff === 1) return setTimeout(nextTest, this.setTimer_base.slice(i + 1).reduce((n, c) => n * c));
	}
	return todo();
};