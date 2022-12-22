"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPromise = exports.setTimer = exports.array2ms = exports.getTime = exports.getHMS = exports.getYMD = exports.getArrayHMS = exports.getArrayYMD = exports.getArrayYMDOrigin = exports.getArrayTime = exports.getArrayTimeOrigin = exports.getDiffDate = exports.TIME = exports.TimeBase = exports.serverLog = exports.log = exports.LType = exports.fill0 = exports.postAlign = exports.preAlign = exports.testReg = exports.testRegPP = exports.testRegPS = exports.testRegSP = exports.testRegSS = exports.explodeReg = exports.mergeObjs = exports.mergeObj = exports.mROpn = exports.cqtPaths = exports.cqtPath = exports.mSOpn = exports.tidyList = exports.getList = exports.isArrlike = exports.range = exports.bwdPath = exports.fwdPath = exports.fwdPathHard = exports.pathType = exports.isPathfwd = void 0;
const path_1 = __importDefault(require("path"));
const scpo_proce_1 = __importDefault(require("scpo-proce"));
const apply = scpo_proce_1.default.apply;
exports.isPathfwd = path_1.default.sep === '/';
const pathType = (file = '') => {
    const bwd = file.indexOf('\\');
    return (file.indexOf('/') && bwd) ? 'both' : bwd ? '\\' : '/';
};
exports.pathType = pathType;
const fwdPathHard = (n) => n.split('\\').join('/');
exports.fwdPathHard = fwdPathHard;
exports.fwdPath = exports.isPathfwd ? (n) => n : exports.fwdPathHard;
const bwdPath = (n) => n.split('/').join('\\');
exports.bwdPath = bwdPath;
const range = (start, stop, step = 1) => Array(Math.ceil((stop - start) / step)).fill(start).map((x, y) => x + y * step);
exports.range = range;
const isArrlike = (n) => typeof n === 'object' && isFinite(n.length);
exports.isArrlike = isArrlike;
const getList = (list) => Array.isArray(list[0]) ? list[0] : list;
exports.getList = getList;
const tidyList = (list = [], jdgFunc, voidArr = []) => {
    if (list.length) {
        Array.isArray(list[0]) && (list = list[0]);
        if (jdgFunc) {
            const rslt = [];
            return list.forEach(e => jdgFunc(e) ? rslt.push(e) : false), rslt;
        }
        else
            return list;
    }
    else
        return voidArr;
};
exports.tidyList = tidyList;
const mSOpn = (opn) => (...list) => (0, exports.getList)(list).map(e => opn(e));
exports.mSOpn = mSOpn;
exports.cqtPath = exports.isPathfwd ? exports.fwdPath : exports.bwdPath;
exports.cqtPaths = (0, exports.mSOpn)(exports.cqtPath);
const mROpn = (opn) => (...list) => list.map(e => apply(opn, null, e));
exports.mROpn = mROpn;
const mergeObj = (a = {}, b = {}) => {
    if (Array.isArray(a) && Array.isArray(b))
        a.push(...b);
    else
        for (let i in b)
            typeof b[i] === 'object' ? (typeof a[i] === 'undefined' && (a[i] = new b[i].constructor()),
                (0, exports.mergeObj)(a[i], b[i])) : a[i] = b[i];
};
exports.mergeObj = mergeObj;
exports.mergeObjs = (0, exports.mROpn)(exports.mergeObj);
const explodeReg_mem = {};
const explodeReg = (str) => {
    if (explodeReg_mem[str])
        return explodeReg_mem[str];
    else
        try {
            return explodeReg_mem[str] = RegExp(str.slice(1, str.lastIndexOf('/')), str.slice(str.lastIndexOf('/') + 1));
        }
        catch (err) {
            return explodeReg_mem[str] = RegExp('');
        }
};
exports.explodeReg = explodeReg;
const testRegSS = (exp, str) => (0, exports.explodeReg)(exp).test(str);
exports.testRegSS = testRegSS;
const testRegSP = (exp, strList) => {
    for (const str of strList)
        if ((0, exports.testRegSS)(exp, str))
            return true;
    return false;
};
exports.testRegSP = testRegSP;
const testRegPS = (expList, str) => {
    for (const exp of expList)
        if ((0, exports.testRegSS)(exp, str))
            return true;
    return false;
};
exports.testRegPS = testRegPS;
const testRegPP = (expList, strList) => {
    for (const exp of expList)
        for (const str of strList)
            if ((0, exports.testRegSS)(exp, str))
                return true;
    return false;
};
exports.testRegPP = testRegPP;
const testReg = (exp, str) => exports['testReg' + (typeof exp === 'string' ? 'S' : 'P') + (typeof str === 'string' ? 'S' : 'P')](exp, str);
exports.testReg = testReg;
const preAlign = (str = '', num = 8, char = ' ') => {
    const len = num - str.length;
    return char.repeat(len < 0 ? 0 : len) + str;
};
exports.preAlign = preAlign;
const postAlign = (str = '', num = 8, char = ' ') => {
    const len = num - str.length;
    return str + char.repeat(len < 0 ? 0 : len);
};
exports.postAlign = postAlign;
const fill0 = (num, len = 8) => (0, exports.preAlign)(String(num), len, '0');
exports.fill0 = fill0;
var LType;
(function (LType) {
    LType["Server"] = "P";
})(LType = exports.LType || (exports.LType = {}));
const log = (type, message) => console.log('Info ' + type + ' ' + (0, exports.getHMS)() + ' ' + message);
exports.log = log;
const serverLog = (info, pid) => (0, exports.log)(LType.Server, (0, exports.postAlign)(String(pid), 8) + info);
exports.serverLog = serverLog;
class TimeBase extends Array {
    constructor(s = -1, ms = -1) {
        super();
        s !== -1 && (this[5] = s);
        ms !== -1 && (this[6] = ms);
    }
    0 = 12;
    1 = 30;
    2 = 24;
    3 = 60;
    4 = 60;
    5 = 1000;
    6 = 1;
}
exports.TimeBase = TimeBase;
var TIME;
(function (TIME) {
    TIME.timeBase = new TimeBase();
    TIME.BASE = TIME.timeBase;
    let t = 1;
    TIME.MS_BASE = TIME.timeBase.reverse().map(v => t *= v).reverse();
    TIME.FUNC_NAME_UTC = [
        'getUTCFullYear', 'getUTCMonth', 'getUTCDate', 'getUTCHours', 'getUTCMinutes', 'getUTCSeconds', 'getUTCMilliseconds',
    ];
})(TIME = exports.TIME || (exports.TIME = {}));
const getDiffDate = (diff) => new Date(new Date().getTime() + diff);
exports.getDiffDate = getDiffDate;
const otf2stf = (opn) => (date = new Date()) => {
    const origin = opn(date);
    return ++origin[1], origin;
};
const getArrayTimeOrigin = (date = new Date()) => TIME.FUNC_NAME_UTC.map(e => date[e]());
exports.getArrayTimeOrigin = getArrayTimeOrigin;
exports.getArrayTime = otf2stf(exports.getArrayTimeOrigin);
const getArrayYMDOrigin = (date = new Date()) => TIME.FUNC_NAME_UTC.slice(0, 3).map(e => date[e]());
exports.getArrayYMDOrigin = getArrayYMDOrigin;
exports.getArrayYMD = otf2stf(exports.getArrayYMDOrigin);
const getArrayHMS = (date = new Date()) => TIME.FUNC_NAME_UTC.slice(3, -1).map(e => date[e]());
exports.getArrayHMS = getArrayHMS;
const getYMD = (date = new Date()) => (0, exports.getArrayYMD)(date).map(e => (0, exports.fill0)(e, 2)).join('-');
exports.getYMD = getYMD;
const getHMS = (date = new Date()) => (0, exports.getArrayHMS)(date).map(e => (0, exports.fill0)(e, 2)).join(':');
exports.getHMS = getHMS;
const getTime = (date = new Date()) => (0, exports.getYMD)(date) + ' ' + (0, exports.getHMS)(date);
exports.getTime = getTime;
const array2ms = (time) => time.reduce((n, v, i) => n + v * TIME.MS_BASE[i]);
exports.array2ms = array2ms;
const setTimer_test = (dest, todo, ordo) => {
    const now = (0, exports.getArrayTime)();
    for (let i = 0; i < 7; ++i) {
        const diff = dest[i] - now[i];
        if (diff == 0)
            continue;
        if (diff > 1)
            return i === 6 && diff <= exports.setTimer.base[6]
                ? todo() : setTimeout(() => setTimer_test(dest, todo, ordo), exports.setTimer.base.slice(i).reduce((n, c) => n * c));
        if (diff == 1)
            return setTimeout(() => setTimer_test(dest, todo, ordo), exports.setTimer.base.slice(i + 1).reduce((n, c) => n * c));
        if (diff < 0)
            return (0, exports.array2ms)(dest.map((e, i) => now[i] - e)) <= exports.setTimer.overTime
                ? todo() : ordo(new Error('No Time Machine'));
    }
    return todo();
};
const setTimer = (dest) => (0, scpo_proce_1.default)((todo, ordo) => setTimer_test(dest, todo, ordo));
exports.setTimer = setTimer;
exports.setTimer.base = new TimeBase(10, 100);
exports.setTimer.overTime = 3000;
const toPromise = (proce) => new Promise((res, rej) => proce.then(res, rej));
exports.toPromise = toPromise;
