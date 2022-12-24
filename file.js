"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sJoin = exports.sJoinO = exports.fileRoute = exports.fileRouteO = exports.getFolder = exports.getFolderO = exports.write = exports.reads = exports.read = exports.open = exports.deleteAll = exports.unlinks = exports.unlink = exports.rmdirsAll = exports.rmdirAll = exports.rmdirs = exports.rmdir = exports.mkdirsAll = exports.mkdirAll = exports.mkdirs = exports.mkdir = exports.isDirectorys = exports.isDirectory = exports.statDir = exports.stats = exports.stat = exports.readdir = exports.existFiles = exports.testFiles = exports.isExists = exports.isExist = void 0;
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const scpo_proce_1 = __importDefault(require("scpo-proce"));
const quFile = {};
const setOpn = (name, callback) => quFile[name] = (quFile[name] || (quFile[name] = scpo_proce_1.default)).next(callback).setBefore();
const quFunc = {
    mkdir: scpo_proce_1.default,
};
const setQue = (name, callback) => quFunc[name] = quFunc[name].next(callback).setBefore();
const simulOpera = (opn) => (list) => scpo_proce_1.default.all(list.map(e => opn(e)));
const queueOpera = (opn) => (list) => scpo_proce_1.default.snake(list.map(e => t => opn(e).then(t)));
const isExist = (file) => (0, scpo_proce_1.default)((t) => fs.access(file, fs.constants.F_OK, e => t(!e, file)));
exports.isExist = isExist;
exports.isExists = simulOpera(exports.isExist);
const testFiles = (list) => scpo_proce_1.default.snake(list.map(e => (t, o) => (0, exports.isExist)(e).then(r => r ? o(e) : t()))).then(() => false, e => e);
exports.testFiles = testFiles;
const existFiles = (list) => (0, exports.isExists)(list).then((n, f, r = []) => (n.forEach((e, i) => e && r.push(f[i])), r));
exports.existFiles = existFiles;
const readdir = (file) => (0, scpo_proce_1.default)((t, o) => fs.readdir(file, 'utf-8', (e, d) => e ? o(e) : t(d)));
exports.readdir = readdir;
const stat = (file) => setOpn(file, (t, o) => fs.stat(file, (e, d) => e ? o(e) : t(d, file)));
exports.stat = stat;
exports.stats = simulOpera(exports.stat);
const statDir = (file) => (0, exports.readdir)(file).then(e => (0, exports.stats)(e.map(d => path_1.default.join(file, d)))).take(1);
exports.statDir = statDir;
const isDirectory = (file) => (0, exports.stat)(file).then(e => e.isDirectory());
exports.isDirectory = isDirectory;
exports.isDirectorys = simulOpera(exports.isDirectory);
const mkdir = (file) => setQue('mkdir', (t, o) => (0, exports.isExist)(file).then(b => b ? (0, exports.stat)(file).then(e => t(e.isDirectory()), o) : fs.mkdir(file, e => e ? o(e) : t(true))));
exports.mkdir = mkdir;
exports.mkdirs = queueOpera(exports.mkdir);
const mkdirAll = (file) => (0, exports.mkdirs)((0, exports.fileRoute)(file));
exports.mkdirAll = mkdirAll;
exports.mkdirsAll = queueOpera(exports.mkdirAll);
const rmdir = (file) => setOpn(file, (t, o) => fs.rmdir(file, e => e ? o(e) : t(true)));
exports.rmdir = rmdir;
exports.rmdirs = queueOpera(exports.rmdir);
const rmdirAll = (file) => (0, exports.rmdirs)((0, exports.fileRoute)(file).reverse());
exports.rmdirAll = rmdirAll;
exports.rmdirsAll = queueOpera(exports.rmdirAll);
const unlink = (file) => setOpn(file, (t, o) => fs.unlink(file, e => e ? o(e) : t(true)));
exports.unlink = unlink;
exports.unlinks = simulOpera(exports.unlink);
const deleteAll = (file) => (0, exports.stat)(file).then(s => s.isDirectory() ? (0, exports.statDir)(file).then((s, f) => scpo_proce_1.default.all(s.map((e, i) => e.isDirectory() ? (0, exports.deleteAll)(f[i]) : (0, exports.unlink)(f[i]))).then(() => (0, exports.rmdir)(file))).take(2) : (0, exports.unlink)(file)).take(1);
exports.deleteAll = deleteAll;
const open = (file, flags) => (0, scpo_proce_1.default)((t, o) => fs.open(file, flags, (e, d) => e ? o(e) : t(d)));
exports.open = open;
const read = (file, options = 'utf-8') => setOpn(file, (t, o) => fs.readFile(file, options, (e, d) => e ? o(e) : t(d)));
exports.read = read;
exports.reads = simulOpera(exports.read);
const write = (file, data = '', options = 'utf-8') => setOpn(file, (t, o) => fs.writeFile(file, String(data), options, e => e ? o(e) : t(true)));
exports.write = write;
const getFolderO = (file = '.', sep = path_1.default.sep) => {
    if (file[file.length - 1] === sep)
        return file;
    const i = file.lastIndexOf(sep) + 1;
    return i ? file.slice(0, i) : '';
};
exports.getFolderO = getFolderO;
const getFolder = (file = '.') => (0, exports.getFolderO)(file, '/');
exports.getFolder = getFolder;
const fileRouteO = (folder = './', sep = path_1.default.sep) => {
    let r = '';
    const a = folder.split(sep);
    return a[a.length - 1] || a.pop(), a.map(e => r += e + sep);
};
exports.fileRouteO = fileRouteO;
const fileRoute = (folder = '.') => (0, exports.fileRouteO)(folder, '/');
exports.fileRoute = fileRoute;
const sJoinO = (a, b, sep = path_1.default.sep) => a[a.length - 1].indexOf(sep) ? a + sep + b : a + b;
exports.sJoinO = sJoinO;
const sJoin = (a, b) => (0, exports.sJoinO)(a, b, '/');
exports.sJoin = sJoin;
