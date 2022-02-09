#!/usr/bin/env node -r esbuild-runner/register
"use strict";
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const zlib_1 = __importDefault(require("zlib"));
const gunzip = util_1.default.promisify(zlib_1.default.gunzip);
// collect from:
//  - ./build-artifacts/1/ui-test-results -> ./test-results/
//  - ./build-artifacts/1/ui-snapshots -> ./test/ui/
const collections = [
    {
        from: './build-artifacts/1/ui-test-results',
        to: './test-results',
    },
    {
        from: './build-artifacts/1/ui-snapshots',
        to: './test/ui',
    },
];
(() => __awaiter(void 0, void 0, void 0, function* () {
    const { globby } = yield Promise.resolve().then(() => __importStar(require('globby')));
    yield Promise.all(collections.map((collection) => __awaiter(void 0, void 0, void 0, function* () {
        const { from, to } = collection;
        const zipPaths = yield globby(`${from}/**/*.png.gz__`);
        yield Promise.all(zipPaths.map((zipPath) => __awaiter(void 0, void 0, void 0, function* () {
            const destination = zipPath.replace('.gz__', '');
            console.log(`un-gzip ${zipPath} -> ${path_1.default.basename(destination)}`);
            const zipped = yield promises_1.default.readFile(zipPath);
            const inflated = yield gunzip(zipped);
            yield promises_1.default.writeFile(destination, inflated);
            yield promises_1.default.unlink(zipPath);
        })));
        const fromPaths = yield globby(`${from}/**/*.png`);
        yield Promise.all(fromPaths.map((fromPath) => __awaiter(void 0, void 0, void 0, function* () {
            const destination = fromPath.replace(from, to);
            const folderExists = fs_1.default.existsSync(path_1.default.dirname(destination));
            if (!folderExists) {
                console.log('mkdir -p', path_1.default.dirname(destination));
                yield promises_1.default.mkdir(path_1.default.dirname(destination), { recursive: true });
            }
            console.log(`mv ${fromPath} ${destination}`);
            yield promises_1.default.rename(fromPath, destination);
        })));
    })));
}))();
