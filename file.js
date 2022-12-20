'use strict';

const fs = require('fs');
const path = require('path');
const { scpoProce } = require('scpo-proce');
const { cqtPaths } = require('./lang');

/**
 * @typedef {scpoProce.Proce} Proce
 * @typedef {(name:string,callback:scpoProce.callbackNext)=>Proce} QueuePusher
 * @typedef {(opn:BasicOpera)=>PlurOpera} PlurOperaCnver
 * @typedef {(opn:(...args)=>string)=>(...args)=>string} PathFTypeCnver
 * @typedef {(file:string,...args?)=>Proce} BasicOpera
 * @typedef {(list:string[],...args?)=>Proce} PlurOpera
 */
/**@type {{[name:string]:scpoProce.Proce}} */
const quFunc = {
	mkdir: scpoProce
};
/**@type {{[file:string]:scpoProce.Proce}} */
const quFile = {};
/**@type {QueuePusher} */
const setOpn = (name, callback) => quFile[name] = (quFile[name] || (quFile[name] = scpoProce)).next(callback).setBefore();
/**@type {QueuePusher} */
const setQue = (name, callback) => quFunc[name] = quFunc[name].next(callback).setBefore();
/**@type {PlurOperaCnver} */
const simulOpera = (opn) => (list) => scpoProce.all(list.map(e => opn(e)));
/**@type {PlurOperaCnver} */
const queueOpera = (opn) => (list) => scpoProce.snake(list.map(e => t => opn(e).then(t)));
/**@type {PathFTypeCnver} */
const pathCnvtoN = (opn) => (...args) => opn(...args, '/');
/**@type {PathFTypeCnver} */
const pathCnvtoS = (opn) => (...args) => opn(...cqtPaths(args));
/**@type {BasicOpera} */
this.isExist = (file) => scpoProce(t => fs.access(file, fs.constants.F_OK, e => t(!e, file)));
/**@type {PlurOpera} */
this.isExists = simulOpera(this.isExist);
/**@type {PlurOpera} */
this.testFiles = (list) => scpoProce.snake(list.map(e => (t, o) => this.isExist(e).then(r => r ? o(e) : t()))).then(() => false, e => e);
/**@type {PlurOpera} */
this.existFiles = (list) => this.isExists(list).then((n, f, r = []) => (n.forEach((e, i) => e && r.push(f[i])), r));
/**@type {BasicOpera} */
this.readdir = (file) => scpoProce((t, o) => fs.readdir(file, 'utf-8', (e, d) => e ? o(e) : t(d)));
/**@type {BasicOpera} */
this.stat = (file) => setOpn(file, (t, o) => fs.stat(file, (e, d) => e ? o(e) : t(d, file)));
/**@type {PlurOpera} */
this.stats = simulOpera(this.stat);
/**@type {BasicOpera} */
this.statDir = (file) => this.readdir(file).then(e => this.stats(e.map(d => path.join(file, d)))).take(1);
/**@type {BasicOpera} */
this.isDirectory = (file) => this.stat(file).then(e => e.isDirectory());
/**@type {PlurOpera} */
this.isDirectorys = simulOpera(this.isDirectory);
/**@type {BasicOpera} */
this.mkdir = (file) => setQue('mkdir', (t, o) => this.isExist(file).then(b => b ? this.stat(file).then(e => t(e.isDirectory())) : fs.mkdir(file, e => e ? o(e) : t(true))));
/**@type {PlurOpera} */
this.mkdirs = queueOpera(this.mkdir);
/**@type {BasicOpera} */
this.mkdirAll = (file) => this.mkdirs(this.fileRouteS(file));
/**@type {PlurOpera} */
this.mkdirsAll = queueOpera(this.mkdirAll);
/**@type {BasicOpera} */
this.rmdir = (file) => setOpn(file, (t, o) => fs.rmdir(file, e => e ? o(e) : t(true)));
/**@type {PlurOpera} */
this.rmdirs = queueOpera(this.rmdir);
/**@type {BasicOpera} */
this.rmdirAll = (file) => this.rmdirs(this.fileRouteS(file).reverse());
/**@type {PlurOpera} */
this.rmdirsAll = queueOpera(this.rmdirAll);
/**@type {BasicOpera} */
this.unlink = (file) => setOpn(file, (t, o) => fs.unlink(file, e => e ? o(e) : t(true)));
/**@type {PlurOpera} */
this.unlinks = simulOpera(this.unlink);
/**@type {BasicOpera} */
this.deleteAll = (file) => this.stat(file).then(s => s.isDirectory() ? this.statDir(file).then((s, f) => scpoProce.all(s.map((e, i) => e.isDirectory() ? this.deleteAll(f[i]) : this.unlink(f[i])))).take(1).then(() => this.rmdir(file)) : this.unlink(file)).take(1);
/**@type {BasicOpera} */
this.open = (file,/**@type {string} */flags) => scpoProce((t, o) => fs.open(file, flags, (e, d) => e ? o(e) : t(d)));
/**@type {BasicOpera} */
this.read = (file,/**@type {string} */options = 'utf-8') => setOpn(file, (t, o) => fs.readFile(file, options, (e, d) => e ? o(e) : t(d)));
/**@type {PlurOpera} */
this.reads = simulOpera(this.read);
/**@type {BasicOpera} */
this.write = (file,/**@type {string|NodeJS.ArrayBufferView} */data = '',/**@type {string} */options = 'utf-8') => setOpn(file, (t, o) => fs.writeFile(file, String(data), options, e => e ? o(e) : t(true)));
this.getFolderO = (file = '.', sep = path.sep) => {
	if (file[file.length - 1] === sep) return file;
	const i = file.lastIndexOf(sep) + 1;
	return i ? file.slice(0, i) : '';
};
this.getFolder = pathCnvtoN(this.getFolderO);
this.getFolderS = pathCnvtoS(this.getFolderO);
this.fileRouteO = (folder = './', sep = path.sep) => {
	let r = '';
	const a = folder.split(sep);
	return a[a.length - 1] || a.pop(), a.map(e => r += e + sep);
};
this.fileRoute = pathCnvtoN(this.fileRouteO);
this.fileRouteS = pathCnvtoS(this.fileRouteO);
this.sJoinO = (a, b, sep = path.sep) => a[a.length - 1] === sep ? a + b : a + sep + b;
this.sJoin = pathCnvtoN(this.sJoinO);
this.sJoinS = pathCnvtoS(this.sJoinO);