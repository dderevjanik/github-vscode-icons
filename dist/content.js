/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Icons_1 = __webpack_require__(1);
var PageDetect_1 = __webpack_require__(8);
var getIconUrl = function (iconFileName) { return chrome.runtime.getURL('icons/' + iconFileName); };
var DEFAULT_ROOT_OPENED = 'default_root_folder_opened.svg';
var QUERY_NAVIGATION_ITEMS = '.file-wrap>table>tbody:last-child>tr.js-navigation-item';
var QUERY_PATH_SEGMENTS = 'js-path-segment';
var QUERY_LAST_PATH_SEGMENT = 'final-path';
/**
 * Show icon for path segments
 */
function showIconsForSegments() {
    return __awaiter(this, void 0, void 0, function () {
        var aSegments, firstSegment, finalSegment, spanEl, iconPath, i, spanEl, aEl, iconPath;
        return __generator(this, function (_a) {
            aSegments = document.getElementsByClassName(QUERY_PATH_SEGMENTS);
            firstSegment = aSegments[0];
            finalSegment = document.getElementsByClassName(QUERY_LAST_PATH_SEGMENT)[0];
            // first segment has always root folder icon
            if (firstSegment) {
                spanEl = firstSegment.children[0];
                spanEl.innerHTML = "<img src=\"" + getIconUrl(DEFAULT_ROOT_OPENED) + "\" alt=\"icon\" height=\"16\"><span> " + spanEl.innerText + "</span>";
            }
            // check if final segment is file or folder
            if (finalSegment) {
                iconPath = window.location.href.includes('/blob/')
                    ? Icons_1.getIconForFile(finalSegment.innerText)
                    : Icons_1.getIconForOpenFolder(finalSegment.innerText);
                finalSegment.innerHTML = "<img src=\"" + getIconUrl(iconPath) + "\" alt=\"icon\" height=\"16\"><span> " + finalSegment.innerText + "</span>";
            }
            // segments between first and last are always folders
            for (i = 1; i < aSegments.length; i++) {
                spanEl = aSegments[i];
                aEl = spanEl.firstChild;
                iconPath = Icons_1.getIconForOpenFolder(aEl.innerText);
                aEl.innerHTML = "<img src=\"" + getIconUrl(iconPath) + "\" alt=\"icon\" height=\"16\"><span> " + aEl.innerText + "</span>";
            }
            return [2 /*return*/];
        });
    });
}
;
/**
 * Show icons for repository files
 */
function showRepoTreeIcons() {
    return __awaiter(this, void 0, void 0, function () {
        var trEls, i, trEl, iconEl, contentEl, linkToEl, name_1, iconPath;
        return __generator(this, function (_a) {
            trEls = document.querySelectorAll(QUERY_NAVIGATION_ITEMS);
            // console.timeEnd('QUERY_ELEMENTS');
            // console.log(trEls.length);
            // console.time('SHOWING_ICONS');
            for (i = 0; i < trEls.length; i++) {
                trEl = trEls[i];
                iconEl = trEl.children[0];
                contentEl = trEl.children[1];
                linkToEl = contentEl.firstElementChild.firstElementChild;
                name_1 = linkToEl.innerText.toLowerCase();
                iconPath = linkToEl.href.indexOf('/tree/') > 0 // is Folder ?
                    ? Icons_1.getIconForFolder(name_1.split('/').shift())
                    : Icons_1.getIconForFile(linkToEl.innerText.toLowerCase());
                iconEl.innerHTML = "<img src=\"" + getIconUrl(iconPath) + "\" alt=\"icon\">";
            }
            return [2 /*return*/];
        });
    });
}
;
// DIFF ICONS ARE NOT COMPLETED YET
// const showDiffIcon = async () => {
//     const elements = document.getElementsByClassName('file-info');
//     for (let i = 0; i < elements.length; i++) {
//         const element = elements[i];
//         const aEl = element.children[1] as HTMLAnchorElement;
//         const filename = aEl.innerText.split('/').pop();
//         const iconPath = getIconForFile(filename);
//         const iconEl = document.createElement('div');
//         iconEl.innerHTML = `<img class="vsi-icon-diff" src="${chrome.runtime.getURL('icons/' + iconPath)}" alt="icon" height="16">`;
//         element.insertBefore(iconEl.firstChild, element.firstChild);
//     }
// }
var showGistIcons = function () { return __awaiter(_this, void 0, void 0, function () {
    var fileInfos, i, fileInfo, gistName, iconPath;
    return __generator(this, function (_a) {
        fileInfos = document.querySelectorAll('.file-info');
        for (i = 0; i < fileInfos.length; i++) {
            fileInfo = fileInfos[i];
            gistName = fileInfo.lastElementChild.firstElementChild.innerText;
            iconPath = Icons_1.getIconForFile(gistName);
            fileInfo.firstElementChild.innerHTML = "<img src=\"" + getIconUrl(iconPath) + "\" alt=\"icon\" class=\"vscode-icon\">";
        }
        return [2 /*return*/];
    });
}); };
var domLoaded = new Promise(function (resolve) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
    }
    else {
        resolve();
    }
});
function update(e) {
    if (PageDetect_1.isRepoRoot() || PageDetect_1.isRepoTree()) {
        showRepoTreeIcons();
    }
    if ((!PageDetect_1.isRepoRoot() && PageDetect_1.isRepoTree()) || PageDetect_1.isSingleFile() || PageDetect_1.isHistoryForFile()) {
        showIconsForSegments();
    }
    if (PageDetect_1.isCommit()) {
        // showDiffIcon();
    }
    if (PageDetect_1.isGist()) {
        showGistIcons();
    }
}
function init() {
    // Update on fragment update
    var observer = new MutationObserver(update);
    var observeFragment = function () {
        var ajaxFiles = document.querySelector('include-fragment.file-wrap');
        var navigation = document.querySelector('include-fragment.file-navigation');
        var diffContainer = document.querySelector('.js-diff-progressive-container');
        if (ajaxFiles) {
            observer.observe(ajaxFiles.parentNode, {
                childList: true
            });
        }
        if (navigation) {
            observer.observe(navigation.parentNode, {
                childList: true
            });
        }
        if (diffContainer) {
            observer.observe(diffContainer.parentNode, {
                childList: true
            });
        }
    };
    update();
    observeFragment();
    document.addEventListener('pjax:end', update); // Update on page change
    document.addEventListener('pjax:end', observeFragment);
}
init();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var folderNamesToIcon = __webpack_require__(2);
var fileExtensions1ToIcon = __webpack_require__(3);
var fileExtensions2ToIcon = __webpack_require__(4);
var fileNamesToIcon = __webpack_require__(5);
var languagesToIcon = __webpack_require__(6);
var iconsToPath = __webpack_require__(7);
exports.DEFAULT_FOLDER = 'default_folder.svg';
exports.DEFAULT_FOLDER_OPENED = 'default_folder_opened.svg';
exports.DEFAULT_FILE = 'default_file.svg';
/**
 * Get icon for a folder
 * @param folderName name of folder to find icon for
 * @return icon filename
 */
function getIconForFolder(folderName) {
    var folderIcon = folderNamesToIcon[folderName];
    return folderIcon ? folderIcon : exports.DEFAULT_FOLDER;
}
exports.getIconForFolder = getIconForFolder;
/**
 * Get icon for a file
 * @param fileName name of file to find icon for
 * @return icon filename
 */
function getIconForFile(fileName) {
    // match by exact FileName
    var iconFromFileName = fileNamesToIcon[fileName];
    if (iconFromFileName) {
        return iconFromFileName;
    }
    // match by File Extension
    var extensions = fileName.split('.');
    if (extensions.length > 1) {
        var ext1 = extensions.pop();
        var ext2 = extensions.pop();
        // check for `.js.map`, `test.tsx`, ...
        var iconFromExtension2 = fileExtensions2ToIcon[ext2 + "." + ext1];
        if (iconFromExtension2) {
            return iconFromExtension2;
        }
        // check for `.js`, `tsx`, ...
        var iconFromExtension1 = fileExtensions1ToIcon[ext1];
        if (iconFromExtension1) {
            return iconFromExtension1;
        }
    }
    else {
        var ext = extensions.pop();
        var iconFromExtension = fileExtensions1ToIcon[ext];
        if (iconFromExtension) {
            return iconFromExtension;
        }
    }
    // match by language
    var fileExtension = fileName.split('.').pop();
    if (fileExtension) {
        var iconFromLang = languagesToIcon[fileExtension];
        if (iconFromLang) {
            return iconFromLang;
        }
    }
    // if there's no icon for file, use default one
    return exports.DEFAULT_FILE;
}
exports.getIconForFile = getIconForFile;
/**
 * Get icon for an opened folder
 * @param folderName name of opened folder to icon for
 * @return icon filename
 */
function getIconForOpenFolder(folderName) {
    return (getIconForFolder(folderName)
        .split('.')
        .shift() + '_opened.svg');
}
exports.getIconForOpenFolder = getIconForOpenFolder;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {"aurelia_project":"folder_type_aurelia.svg","aws":"folder_type_aws.svg",".aws":"folder_type_aws.svg","bin":"folder_type_binary.svg",".bin":"folder_type_binary.svg","bower_components":"folder_type_bower.svg","cake":"folder_type_cake.svg",".cake":"folder_type_cake.svg","chef":"folder_type_chef.svg",".chef":"folder_type_chef.svg",".circleci":"folder_type_circleci.svg","client":"folder_type_client.svg","composer":"folder_type_composer.svg",".composer":"folder_type_composer.svg","config":"folder_type_config.svg",".config":"folder_type_config.svg","ini":"folder_type_config.svg",".ini":"folder_type_config.svg","initializers":"folder_type_config.svg",".initializers":"folder_type_config.svg","css":"folder_type_css.svg","_css":"folder_type_css.svg","debian":"folder_type_debian.svg","dist":"folder_type_dist.svg","out":"folder_type_dist.svg","export":"folder_type_dist.svg","build":"folder_type_dist.svg","release":"folder_type_dist.svg","docker":"folder_type_docker.svg",".docker":"folder_type_docker.svg","docs":"folder_type_docs.svg","doc":"folder_type_docs.svg",".elasticbeanstalk":"folder_type_elasticbeanstalk.svg",".ebextensions":"folder_type_elasticbeanstalk.svg","flow":"folder_type_flow.svg","fonts":"folder_type_light_fonts.svg","font":"folder_type_light_fonts.svg","fnt":"folder_type_light_fonts.svg","gcp":"folder_type_gcp.svg",".gcp":"folder_type_gcp.svg",".git":"folder_type_git.svg","submodules":"folder_type_git.svg",".submodules":"folder_type_git.svg",".github":"folder_type_github.svg",".gitlab":"folder_type_gitlab.svg","haxelib":"folder_type_haxelib.svg",".idea":"folder_type_idea.svg","images":"folder_type_images.svg","image":"folder_type_images.svg","img":"folder_type_images.svg","icons":"folder_type_images.svg","icon":"folder_type_images.svg","ico":"folder_type_images.svg","include":"folder_type_include.svg","includes":"folder_type_include.svg","incl":"folder_type_include.svg","js":"folder_type_js.svg","kubernetes":"folder_type_kubernetes.svg","k8s":"folder_type_kubernetes.svg","kube":"folder_type_kubernetes.svg","kuber":"folder_type_kubernetes.svg","less":"folder_type_less.svg","_less":"folder_type_less.svg","lib":"folder_type_library.svg",".lib":"folder_type_library.svg","locale":"folder_type_locale.svg","locales":"folder_type_locale.svg","i18n":"folder_type_locale.svg","g11n":"folder_type_locale.svg","log":"folder_type_log.svg","logs":"folder_type_log.svg",".meteor":"folder_type_light_meteor.svg","mjml":"folder_type_mjml.svg",".mjml":"folder_type_mjml.svg","mongodb":"folder_type_mongodb.svg","node_modules":"folder_type_light_node.svg",".nuget":"folder_type_nuget.svg","package":"folder_type_package.svg","packages":"folder_type_package.svg",".package":"folder_type_package.svg",".packages":"folder_type_package.svg",".paket":"folder_type_paket.svg","php":"folder_type_php.svg","plugin":"folder_type_plugin.svg",".plugin":"folder_type_plugin.svg","plugins":"folder_type_plugin.svg",".plugins":"folder_type_plugin.svg","private":"folder_type_private.svg",".private":"folder_type_private.svg","public":"folder_type_public.svg",".public":"folder_type_public.svg","ravendb":"folder_type_ravendb.svg","redis":"folder_type_redis.svg","sass":"folder_type_light_sass.svg","scss":"folder_type_light_sass.svg","_sass":"folder_type_light_sass.svg","_scss":"folder_type_light_sass.svg","script":"folder_type_script.svg","scripts":"folder_type_script.svg","server":"folder_type_server.svg","src":"folder_type_src.svg","source":"folder_type_src.svg","sources":"folder_type_src.svg","style":"folder_type_style.svg","styles":"folder_type_style.svg","tests":"folder_type_test.svg",".tests":"folder_type_test.svg","test":"folder_type_test.svg",".test":"folder_type_test.svg","__tests__":"folder_type_test.svg","__test__":"folder_type_test.svg","spec":"folder_type_test.svg",".spec":"folder_type_test.svg","specs":"folder_type_test.svg",".specs":"folder_type_test.svg","tools":"folder_type_tools.svg",".tools":"folder_type_tools.svg","util":"folder_type_tools.svg","utils":"folder_type_tools.svg","typescript":"folder_type_typescript.svg","ts":"folder_type_typescript.svg","typings":"folder_type_typings.svg","vagrant":"folder_type_vagrant.svg",".vagrant":"folder_type_vagrant.svg","html":"folder_type_view.svg","view":"folder_type_view.svg","views":"folder_type_view.svg",".vs":"folder_type_vs.svg",".vscode":"folder_type_vscode.svg",".vscode-test":"folder_type_vscode_test.svg","webpack":"folder_type_webpack.svg","www":"folder_type_www.svg","wwwroot":"folder_type_www.svg"}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {"accdb":"file_type_access.svg","accdt":"file_type_access.svg","mdb":"file_type_access.svg","accda":"file_type_access.svg","accdc":"file_type_access.svg","accde":"file_type_access.svg","accdp":"file_type_access.svg","accdr":"file_type_access.svg","accdu":"file_type_access.svg","ade":"file_type_access.svg","adp":"file_type_access.svg","laccdb":"file_type_access.svg","ldb":"file_type_access.svg","mam":"file_type_access.svg","maq":"file_type_access.svg","mdw":"file_type_access.svg","ai":"file_type_ai.svg","ino":"file_type_arduino.svg","pde":"file_type_arduino.svg","aspx":"file_type_aspx.svg","ascx":"file_type_aspx.svg","aac":"file_type_audio.svg","act":"file_type_audio.svg","aiff":"file_type_audio.svg","amr":"file_type_audio.svg","ape":"file_type_audio.svg","au":"file_type_audio.svg","dct":"file_type_audio.svg","dss":"file_type_audio.svg","dvf":"file_type_audio.svg","flac":"file_type_audio.svg","gsm":"file_type_audio.svg","iklax":"file_type_audio.svg","ivs":"file_type_audio.svg","m4a":"file_type_audio.svg","m4b":"file_type_audio.svg","m4p":"file_type_audio.svg","mmf":"file_type_audio.svg","mogg":"file_type_audio.svg","mp3":"file_type_audio.svg","mpc":"file_type_audio.svg","msv":"file_type_audio.svg","oga":"file_type_audio.svg","ogg":"file_type_audio.svg","opus":"file_type_audio.svg","ra":"file_type_audio.svg","raw":"file_type_audio.svg","tta":"file_type_audio.svg","vox":"file_type_audio.svg","wav":"file_type_audio.svg","wma":"file_type_audio.svg","a":"file_type_binary.svg","app":"file_type_binary.svg","bin":"file_type_binary.svg","cmo":"file_type_binary.svg","cmx":"file_type_binary.svg","cma":"file_type_binary.svg","cmxa":"file_type_binary.svg","cmi":"file_type_binary.svg","dll":"file_type_binary.svg","exe":"file_type_binary.svg","hl":"file_type_binary.svg","ilk":"file_type_binary.svg","lib":"file_type_binary.svg","n":"file_type_binary.svg","ndll":"file_type_binary.svg","o":"file_type_binary.svg","obj":"file_type_binary.svg","pyc":"file_type_binary.svg","pyd":"file_type_binary.svg","pyo":"file_type_binary.svg","pdb":"file_type_binary.svg","scpt":"file_type_binary.svg","scptd":"file_type_binary.svg","so":"file_type_binary.svg","csr":"file_type_cert.svg","crt":"file_type_cert.svg","cer":"file_type_cert.svg","der":"file_type_cert.svg","pfx":"file_type_cert.svg","p12":"file_type_cert.svg","p7b":"file_type_cert.svg","p7r":"file_type_cert.svg","src":"file_type_cert.svg","crl":"file_type_cert.svg","sst":"file_type_cert.svg","stl":"file_type_cert.svg","lucee":"file_type_cf.svg","h":"file_type_cheader.svg","class":"file_type_class.svg","cjm":"file_type_clojure.svg","cljc":"file_type_clojure.svg","kit":"file_type_codekit.svg","env":"file_type_light_config.svg","hpp":"file_type_cppheader.svg","csx":"file_type_csharp.svg","csproj":"file_type_csproj.svg","db":"file_type_light_db.svg","eco":"file_type_light_docpad.svg","ejs":"file_type_ejs.svg","el":"file_type_emacs.svg","elc":"file_type_emacs.svg","ensime":"file_type_ensime.svg","eps":"file_type_eps.svg","xls":"file_type_excel.svg","xlsx":"file_type_excel.svg","xlsm":"file_type_excel.svg","ods":"file_type_excel.svg","fbx":"file_type_fbx.svg","swf":"file_type_flash.svg","swc":"file_type_flash.svg","woff":"file_type_light_font.svg","woff2":"file_type_light_font.svg","ttf":"file_type_light_font.svg","otf":"file_type_light_font.svg","eot":"file_type_light_font.svg","pfa":"file_type_light_font.svg","pfb":"file_type_light_font.svg","sfd":"file_type_light_font.svg","fsproj":"file_type_fsproj.svg","gmx":"file_type_gamemaker.svg","yy":"file_type_light_gamemaker2.svg","yyp":"file_type_light_gamemaker2.svg","gradle":"file_type_gradle.svg","hxproj":"file_type_haxedevelop.svg","idr":"file_type_idris.svg","lidr":"file_type_idris.svg","ibc":"file_type_idrisbin.svg","ipkg":"file_type_idrispkg.svg","jpeg":"file_type_image.svg","jpg":"file_type_image.svg","gif":"file_type_image.svg","png":"file_type_image.svg","bmp":"file_type_image.svg","tiff":"file_type_image.svg","ico":"file_type_image.svg","infopathxml":"file_type_infopath.svg","xsn":"file_type_infopath.svg","xsf":"file_type_infopath.svg","xtp2":"file_type_infopath.svg","jar":"file_type_jar.svg","jbuilder":"file_type_jbuilder.svg","json5":"file_type_light_json5.svg","jsonld":"file_type_light_jsonld.svg","json-ld":"file_type_light_jsonld.svg","jsp":"file_type_jsp.svg","key":"file_type_key.svg","pem":"file_type_key.svg","ks":"file_type_kos.svg","master":"file_type_layout.svg","enc":"file_type_license.svg","hxp":"file_type_lime.svg","liquid":"file_type_liquid.svg","log":"file_type_log.svg","lsl":"file_type_lsl.svg","crec":"file_type_lync.svg","ocrec":"file_type_lync.svg","makefile":"file_type_makefile.svg","map":"file_type_map.svg","mdown":"file_type_markdown.svg","markdown":"file_type_markdown.svg","fig":"file_type_matlab.png","mex":"file_type_matlab.png","mexn":"file_type_matlab.png","mexrs6":"file_type_matlab.png","mn":"file_type_matlab.png","mum":"file_type_matlab.png","mx":"file_type_matlab.png","mx3":"file_type_matlab.png","rwd":"file_type_matlab.png","slx":"file_type_matlab.png","slddc":"file_type_matlab.png","smv":"file_type_matlab.png","tikz":"file_type_matlab.png","xvc":"file_type_matlab.png","mustache":"file_type_light_mustache.svg","mst":"file_type_light_mustache.svg","njsproj":"file_type_njsproj.svg","nupkg":"file_type_nuget.svg","nuspec":"file_type_nuget.svg","psmdcp":"file_type_nuget.svg","nunj":"file_type_nunjucks.svg","njs":"file_type_nunjucks.svg","one":"file_type_onenote.svg","onepkg":"file_type_onenote.svg","onetoc":"file_type_onenote.svg","onetoc2":"file_type_onenote.svg","sig":"file_type_onenote.svg","cl":"file_type_opencl.svg","opencl":"file_type_opencl.svg","org":"file_type_org.svg","pst":"file_type_outlook.svg","bcmx":"file_type_outlook.svg","otm":"file_type_outlook.svg","msg":"file_type_outlook.svg","oft":"file_type_outlook.svg","pkg":"file_type_package.svg","patch":"file_type_patch.svg","pcd":"file_type_light_pcl.svg","pdf":"file_type_pdf.svg","psd":"file_type_photoshop.svg","php1":"file_type_php.svg","php2":"file_type_php.svg","php3":"file_type_php.svg","php4":"file_type_php.svg","php5":"file_type_php.svg","php6":"file_type_php.svg","phps":"file_type_php.svg","phpsa":"file_type_php.svg","phpt":"file_type_php.svg","phtml":"file_type_php.svg","phar":"file_type_php.svg","pu":"file_type_plantuml.svg","plantuml":"file_type_plantuml.svg","iuml":"file_type_plantuml.svg","puml":"file_type_plantuml.svg","pck":"file_type_plsql_package.svg","pkb":"file_type_plsql_package_body.svg","pkh":"file_type_plsql_package_header.svg","pks":"file_type_plsql_package_spec.svg","po":"file_type_poedit.svg","mo":"file_type_poedit.svg","pot":"file_type_powerpoint.svg","potx":"file_type_powerpoint.svg","potm":"file_type_powerpoint.svg","pps":"file_type_powerpoint.svg","ppsx":"file_type_powerpoint.svg","ppsm":"file_type_powerpoint.svg","ppt":"file_type_powerpoint.svg","pptx":"file_type_powerpoint.svg","pptm":"file_type_powerpoint.svg","pa":"file_type_powerpoint.svg","ppa":"file_type_powerpoint.svg","ppam":"file_type_powerpoint.svg","sldm":"file_type_powerpoint.svg","sldx":"file_type_powerpoint.svg","pro":"file_type_prolog.svg","P":"file_type_prolog.svg","pub":"file_type_publisher.svg","puz":"file_type_publisher.svg","q":"file_type_q.svg","qvd":"file_type_qlikview.svg","qvw":"file_type_qlikview.svg","rake":"file_type_rake.svg","rt":"file_type_reacttemplate.svg","reg":"file_type_registry.svg","sls":"file_type_saltstack.svg","sass":"file_type_sass.svg","scssm":"file_type_scss.svg","fish":"file_type_shell.svg","sketch":"file_type_sketch.svg","sln":"file_type_sln.svg","sqlite":"file_type_sqlite.svg","sqlite3":"file_type_sqlite.svg","db3":"file_type_sqlite.svg","sss":"file_type_sss.svg","storyboard":"file_type_storyboard.svg","svg":"file_type_svg.svg","tcl":"file_type_tcl.svg","exp":"file_type_tcl.svg","tfstate":"file_type_terraform.svg","tst":"file_type_test.svg","texi":"file_type_light_tex.svg","csv":"file_type_text.svg","todo":"file_type_light_todo.svg","vash":"file_type_light_vash.svg","vbhtml":"file_type_vbhtml.svg","vbproj":"file_type_vbproj.svg","vcxproj":"file_type_vcxproj.svg","3g2":"file_type_video.svg","3gp":"file_type_video.svg","asf":"file_type_video.svg","amv":"file_type_video.svg","avi":"file_type_video.svg","divx":"file_type_video.svg","qt":"file_type_video.svg","f4a":"file_type_video.svg","f4b":"file_type_video.svg","f4p":"file_type_video.svg","f4v":"file_type_video.svg","flv":"file_type_video.svg","m2v":"file_type_video.svg","m4v":"file_type_video.svg","mkv":"file_type_video.svg","mk3d":"file_type_video.svg","mov":"file_type_video.svg","mp2":"file_type_video.svg","mp4":"file_type_video.svg","mpe":"file_type_video.svg","mpeg":"file_type_video.svg","mpeg2":"file_type_video.svg","mpg":"file_type_video.svg","mpv":"file_type_video.svg","nsv":"file_type_video.svg","ogv":"file_type_video.svg","rm":"file_type_video.svg","rmvb":"file_type_video.svg","svi":"file_type_video.svg","vob":"file_type_video.svg","webm":"file_type_video.svg","wmv":"file_type_video.svg","vsix":"file_type_light_vsix.svg","doc":"file_type_word.svg","docx":"file_type_word.svg","docm":"file_type_word.svg","dot":"file_type_word.svg","dotx":"file_type_word.svg","dotm":"file_type_word.svg","wll":"file_type_word.svg","wxml":"file_type_wxml.svg","wxss":"file_type_wxss.svg","xcodeproj":"file_type_xcode.svg","xib":"file_type_xib.svg","xliff":"file_type_xliff.svg","xlf":"file_type_xliff.svg","pex":"file_type_xml.svg","tmlanguage":"file_type_xml.svg","yml":"file_type_light_yaml.svg","zip":"file_type_zip.svg","rar":"file_type_zip.svg","7z":"file_type_zip.svg","tar":"file_type_zip.svg","gz":"file_type_zip.svg","bzip2":"file_type_zip.svg","xz":"file_type_zip.svg","bz2":"file_type_zip.svg"}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {"css.map":"file_type_cssmap.svg","js.flow":"file_type_flow.svg","js.map":"file_type_light_jsmap.svg","layout.html":"file_type_layout.svg","layout.htm":"file_type_layout.svg","marko.js":"file_type_markojs.svg","story.js":"file_type_storybook.svg","stories.js":"file_type_storybook.svg","test.js":"file_type_light_testjs.svg","spec.js":"file_type_light_testjs.svg","test.jsx":"file_type_light_testjs.svg","spec.jsx":"file_type_light_testjs.svg","test.ts":"file_type_testts.svg","test.tsx":"file_type_testts.svg","spec.ts":"file_type_testts.svg","spec.tsx":"file_type_testts.svg","d.ts":"file_type_typescriptdef.svg"}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {".angular-cli.json":"file_type_angular.svg","angular-cli.json":"file_type_angular.svg","appveyor.yml":"file_type_appveyor.svg",".appveyor.yml":"file_type_appveyor.svg","aurelia.json":"file_type_aurelia.svg",".babelrc":"file_type_light_babel.svg","babelrc.js":"file_type_light_babel.svg",".bzrignore":"file_type_bazaar.svg",".bithoundrc":"file_type_bithound.svg",".bowerrc":"file_type_bower.svg","bower.json":"file_type_bower.svg",".buckconfig":"file_type_buckbuild.svg","gemfile":"file_type_bundler.svg","gemfile.lock":"file_type_bundler.svg","chefignore":"file_type_chef.svg","berksfile":"file_type_chef.svg","berksfile.lock":"file_type_chef.svg","policyfile":"file_type_chef.svg","circle.yml":"file_type_light_circleci.svg",".cfignore":"file_type_light_cloudfoundry.svg",".codeclimate.yml":"file_type_light_codeclimate.svg","codecov.yml":"file_type_codecov.svg",".codecov.yml":"file_type_codecov.svg","config.codekit":"file_type_codekit.svg","config.codekit2":"file_type_codekit.svg","config.codekit3":"file_type_codekit.svg","coffeelint.json":"file_type_coffeelint.svg",".coffeelintignore":"file_type_coffeelint.svg","composer.json":"file_type_composer.svg","composer.lock":"file_type_composer.svg",".env.example":"file_type_light_config.svg",".coveralls.yml":"file_type_coveralls.svg","crowdin.yml":"file_type_crowdin.svg",".csslintrc":"file_type_csslint.svg",".cvsignore":"file_type_cvs.svg",".boringignore":"file_type_darcs.svg","dependencies.yml":"file_type_dependencies.svg",".dockerignore":"file_type_docker.svg","docker-compose.yml":"file_type_docker.svg","docker-compose.ci-build.yml":"file_type_docker.svg","docker-compose.override.yml":"file_type_docker.svg","docker-compose.vs.debug.yml":"file_type_docker.svg","docker-compose.vs.release.yml":"file_type_docker.svg","docker-cloud.yml":"file_type_docker.svg",".drone.yml":"file_type_light_drone.svg",".drone.yml.sig":"file_type_light_drone.svg",".editorconfig":"file_type_editorconfig.svg","elm-package.json":"file_type_elm.svg",".ember-cli":"file_type_ember.svg","emakefile":"file_type_erlang.svg",".emakerfile":"file_type_erlang.svg",".eslintrc":"file_type_eslint.svg",".eslintignore":"file_type_eslint.svg",".eslintcache":"file_type_eslint.svg",".eslintrc.js":"file_type_eslint.svg",".eslintrc.json":"file_type_eslint.svg",".eslintrc.yaml":"file_type_eslint.svg",".eslintrc.yml":"file_type_eslint.svg","favicon.ico":"file_type_favicon.svg",".firebaserc":"file_type_firebase.svg",".flooignore":"file_type_floobits.svg",".flowconfig":"file_type_flow.svg","ignore-glob":"file_type_fossil.svg","fuse.js":"file_type_fusebox.svg",".gitattributes":"file_type_git.svg",".gitconfig":"file_type_git.svg",".gitignore":"file_type_git.svg",".gitmodules":"file_type_git.svg",".gitkeep":"file_type_git.svg",".gitlab-ci.yml":"file_type_gitlab.svg",".gqlconfig":"file_type_graphql.svg","gruntfile.coffee":"file_type_grunt.svg","gruntfile.babel.coffee":"file_type_grunt.svg","gruntfile.js":"file_type_grunt.svg","gruntfile.babel.js":"file_type_grunt.svg","gruntfile.ts":"file_type_grunt.svg","gruntfile.babel.ts":"file_type_grunt.svg","gulpfile.coffee":"file_type_gulp.svg","gulpfile.babel.coffee":"file_type_gulp.svg","gulpfile.js":"file_type_gulp.svg","gulpfile.babel.js":"file_type_gulp.svg","gulpfile.ts":"file_type_gulp.svg","gulpfile.babel.ts":"file_type_gulp.svg","haxelib.json":"file_type_haxe.svg","checkstyle.json":"file_type_haxecheckstyle.svg",".p4ignore":"file_type_helix.svg",".htmlhintrc":"file_type_htmlhint.svg","ionic.project":"file_type_ionic.svg","ionic.config.json":"file_type_ionic.svg","jenkinsfile":"file_type_jenkins.svg","jest.config.js":"file_type_jest.svg","jest.json":"file_type_jest.svg","jest.config.json":"file_type_jest.svg",".jestrc":"file_type_jest.svg",".jpmignore":"file_type_jpm.svg",".jsbeautifyrc":"file_type_jsbeautify.svg","jsbeautifyrc":"file_type_jsbeautify.svg",".jsbeautify":"file_type_jsbeautify.svg","jsbeautify":"file_type_jsbeautify.svg","jsconfig.json":"file_type_light_jsconfig.svg",".jshintrc":"file_type_jshint.svg",".jshintignore":"file_type_jshint.svg","karma.conf.js":"file_type_karma.svg","karma.conf.coffee":"file_type_karma.svg","karma.conf.ts":"file_type_karma.svg",".kitchen.yml":"file_type_kitchenci.svg",".kiteignore":"file_type_light_kite.svg","layout.html":"file_type_layout.svg","layout.htm":"file_type_layout.svg","lerna.json":"file_type_light_lerna.svg","license":"file_type_license.svg","licence":"file_type_license.svg","license.md":"file_type_license.svg","licence.md":"file_type_license.svg","license.txt":"file_type_license.svg","licence.txt":"file_type_license.svg","include.xml":"file_type_lime.svg","manifest":"file_type_manifest.svg","manifest.bak":"file_type_manifest_bak.svg","manifest.skip":"file_type_manifest_skip.svg",".markdownlint.json":"file_type_markdownlint.svg",".hgignore":"file_type_mercurial.svg",".mtn-ignore":"file_type_monotone.svg",".node-version":"file_type_node.svg",".nvmrc":"file_type_node.svg",".npmignore":"file_type_npm.svg",".npmrc":"file_type_npm.svg","package.json":"file_type_npm.svg","package-lock.json":"file_type_npm.svg",".nycrc":"file_type_nyc.svg",".merlin":"file_type_ocaml.svg","paket.dependencies":"file_type_paket.svg","paket.lock":"file_type_paket.svg","paket.references":"file_type_paket.svg","paket.template":"file_type_paket.svg","paket.local":"file_type_paket.svg","phpunit":"file_type_phpunit.svg","phpunit.xml":"file_type_phpunit.svg","phpunit.xml.dist":"file_type_phpunit.svg",".postcssrc.js":"file_type_postcss.svg","postcss.config.js":"file_type_postcss.svg",".prettierrc":"file_type_light_prettier.svg","prettier.config.js":"file_type_light_prettier.svg","procfile":"file_type_procfile.svg","protractor.conf.js":"file_type_protractor.svg","protractor.conf.coffee":"file_type_protractor.svg","protractor.conf.ts":"file_type_protractor.svg",".jade-lintrc":"file_type_pug.svg",".pug-lintrc":"file_type_pug.svg",".jade-lint.json":"file_type_pug.svg",".pug-lintrc.js":"file_type_pug.svg",".pug-lintrc.json":"file_type_pug.svg","rakefile":"file_type_rake.svg","robots.txt":"file_type_robots.svg","rollup.config.js":"file_type_rollup.svg","rollup.config.ts":"file_type_rollup.svg",".rspec":"file_type_rspec.svg",".sequelizerc":"file_type_sequelize.svg",".snyk":"file_type_snyk.svg",".stylelintrc":"file_type_light_stylelint.svg","stylelint.config.js":"file_type_light_stylelint.svg",".stylelintignore":"file_type_light_stylelint.svg",".svnignore":"file_type_subversion.svg","package.pins":"file_type_swift.svg",".tfignore":"file_type_tfs.svg",".travis.yml":"file_type_travis.svg","tsconfig.json":"file_type_tsconfig.svg","tsconfig.app.json":"file_type_tsconfig.svg","tsconfig.spec.json":"file_type_tsconfig.svg","tsconfig.e2e.json":"file_type_tsconfig.svg","tslint.json":"file_type_tslint.svg","vagrantfile":"file_type_vagrant.svg",".vimrc":"file_type_vim.svg",".gvimrc":"file_type_vim.svg","vscodeignore.json":"file_type_vscode.svg","launch.json":"file_type_vscode.svg","tasks.json":"file_type_vscode.svg",".vscodeignore":"file_type_vscode.svg",".watchmanconfig":"file_type_watchmanconfig.svg","webpack.base.conf.coffee":"file_type_webpack.svg","webpack.base.conf.js":"file_type_webpack.svg","webpack.base.conf.ts":"file_type_webpack.svg","webpack.common.coffee":"file_type_webpack.svg","webpack.common.js":"file_type_webpack.svg","webpack.common.ts":"file_type_webpack.svg","webpack.config.coffee":"file_type_webpack.svg","webpack.config.base.coffee":"file_type_webpack.svg","webpack.config.common.coffee":"file_type_webpack.svg","webpack.config.dev.coffee":"file_type_webpack.svg","webpack.config.development.coffee":"file_type_webpack.svg","webpack.config.staging.coffee":"file_type_webpack.svg","webpack.config.test.coffee":"file_type_webpack.svg","webpack.config.prod.coffee":"file_type_webpack.svg","webpack.config.production.coffee":"file_type_webpack.svg","webpack.config.js":"file_type_webpack.svg","webpack.config.base.js":"file_type_webpack.svg","webpack.config.common.js":"file_type_webpack.svg","webpack.config.dev.js":"file_type_webpack.svg","webpack.config.development.js":"file_type_webpack.svg","webpack.config.staging.js":"file_type_webpack.svg","webpack.config.test.js":"file_type_webpack.svg","webpack.config.prod.js":"file_type_webpack.svg","webpack.config.production.js":"file_type_webpack.svg","webpack.config.ts":"file_type_webpack.svg","webpack.config.base.ts":"file_type_webpack.svg","webpack.config.common.ts":"file_type_webpack.svg","webpack.config.dev.ts":"file_type_webpack.svg","webpack.config.development.ts":"file_type_webpack.svg","webpack.config.staging.ts":"file_type_webpack.svg","webpack.config.test.ts":"file_type_webpack.svg","webpack.config.prod.ts":"file_type_webpack.svg","webpack.config.production.ts":"file_type_webpack.svg","webpack.config.babel.js":"file_type_webpack.svg","webpack.config.base.babel.js":"file_type_webpack.svg","webpack.config.common.babel.js":"file_type_webpack.svg","webpack.config.dev.babel.js":"file_type_webpack.svg","webpack.config.development.babel.js":"file_type_webpack.svg","webpack.config.staging.babel.js":"file_type_webpack.svg","webpack.config.test.babel.js":"file_type_webpack.svg","webpack.config.prod.babel.js":"file_type_webpack.svg","webpack.config.production.babel.js":"file_type_webpack.svg","webpack.dev.coffee":"file_type_webpack.svg","webpack.dev.js":"file_type_webpack.svg","webpack.dev.ts":"file_type_webpack.svg","webpack.dev.conf.coffee":"file_type_webpack.svg","webpack.dev.conf.js":"file_type_webpack.svg","webpack.dev.conf.ts":"file_type_webpack.svg","webpack.prod.coffee":"file_type_webpack.svg","webpack.prod.js":"file_type_webpack.svg","webpack.prod.ts":"file_type_webpack.svg","webpack.prod.conf.coffee":"file_type_webpack.svg","webpack.prod.conf.js":"file_type_webpack.svg","webpack.prod.conf.ts":"file_type_webpack.svg","webpack.mix.coffee":"file_type_webpack.svg","webpack.mix.js":"file_type_webpack.svg","webpack.mix.ts":"file_type_webpack.svg","webpack.test.conf.coffee":"file_type_webpack.svg","webpack.test.conf.js":"file_type_webpack.svg","webpack.test.conf.ts":"file_type_webpack.svg","wercker.yml":"file_type_wercker.svg","yarn.lock":"file_type_yarn.svg",".yarnrc":"file_type_yarn.svg",".yarnclean":"file_type_yarn.svg",".yarn-integrity":"file_type_yarn.svg",".yarn-metadata.json":"file_type_yarn.svg",".yarnignore":"file_type_yarn.svg",".yo-rc.json":"file_type_yeoman.svg"}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {"al":"file_type_al.svg","ansible":"file_type_ansible.svg","g4":"file_type_antlr.svg","any":"file_type_anyscript.svg","applescript":"file_type_applescript.svg","asp":"file_type_asp.svg","au3":"file_type_autoit.svg","avcs":"file_type_avro.svg","bat":"file_type_bat.svg","blade.php":"file_type_blade.svg","bolt":"file_type_bolt.svg","c":"file_type_c.svg","cabal":"file_type_cabal.svg","cake":"file_type_cake.svg","cfc":"file_type_cfc.svg","clojure":"file_type_clojure.svg","cmake":"file_type_cmake.svg","cbl":"file_type_cobol.svg","coffee":"file_type_coffeescript.svg","cpp":"file_type_cpp.svg","cr":"file_type_crystal.svg","cs":"file_type_csharp.svg","css":"file_type_css.svg","dal":"file_type_dal.svg","dart":"file_type_dartlang.svg","diff":"file_type_diff.svg","dockerfile":"file_type_docker.svg","dox":"file_type_doxygen.svg","edge":"file_type_edge.svg","ex":"file_type_elixir.svg","elm":"file_type_elm.svg","erb":"file_type_erb.svg","erl":"file_type_erlang.svg","f":"file_type_fortran.svg","fs":"file_type_fsharp.svg","gspec":"file_type_galen.svg","glsl":"file_type_glsl.svg","go":"file_type_go.svg","gql":"file_type_graphql.svg","groovy":"file_type_groovy.svg","haml":"file_type_haml.svg","hbs":"file_type_handlebars.svg","prg":"file_type_harbour.svg","hs":"file_type_haskell.svg","haxe":"file_type_haxe.svg","hlsl":"file_type_hlsl.svg","html":"file_type_html.svg","http":"file_type_http.svg","ini":"file_type_light_ini.svg","tex":"file_type_light_tex.svg","java":"file_type_java.svg","js":"file_type_light_js.svg","jsx":"file_type_reactjs.svg","jinja":"file_type_jinja.svg","json":"file_type_light_json.svg","jl":"file_type_julia.svg","ks":"file_type_kos.svg","kt":"file_type_kotlin.svg","lisp":"file_type_lisp.svg","less":"file_type_less.svg","lua":"file_type_lua.svg","mk":"file_type_makefile.svg","md":"file_type_markdown.svg","marko":"file_type_marko.svg","mat":"file_type_matlab.png","mjml":"file_type_mjml.svg","mson":"file_type_mson.svg","nim":"file_type_nim.svg","nsi":"file_type_nsi.svg","nunjucks":"file_type_nunjucks.svg","ml":"file_type_ocaml.svg","pas":"file_type_delphi.svg","pl":"file_type_perl.svg","pl6":"file_type_perl6.svg","php":"file_type_php.svg","txt":"file_type_text.svg","ddl":"file_type_plsql.svg","polymer":"file_type_polymer.svg","pcss":"file_type_postcss.svg","ps1":"file_type_powershell.svg","pro":"file_type_prolog.svg","properties":"file_type_light_config.svg","pp":"file_type_puppet.svg","purs":"file_type_light_purescript.svg","py":"file_type_python.svg","qvs":"file_type_qlikview.svg","r":"file_type_r.svg","rkt":"file_type_racket.svg","cshtml":"file_type_razor.svg","raml":"file_type_raml.svg","re":"file_type_reason.svg","rst":"file_type_rest.svg","tag":"file_type_riot.svg","robot":"file_type_robotframework.svg","rb":"file_type_ruby.svg","rs":"file_type_rust.svg","sbt":"file_type_sbt.svg","scala":"file_type_scala.svg","scss":"file_type_scss.svg","shader":"file_type_light_shaderlab.svg","sh":"file_type_shell.svg","slim":"file_type_slim.svg","tpl":"file_type_smarty.svg","sol":"file_type_light_solidity.svg","sqf":"file_type_sqf.svg","sql":"file_type_sql.svg","styl":"file_type_stylus.svg","swagger":"file_type_swagger.svg","swift":"file_type_swift.svg","tf":"file_type_terraform.svg","sty":"file_type_light_tex.svg","textile":"file_type_textile.svg","toml":"file_type_toml.svg","twig":"file_type_twig.svg","ts":"file_type_typescript.svg","tsx":"file_type_reactts.svg","vb":"file_type_vb.svg","cls":"file_type_vba.svg","wsf":"file_type_script.svg","vm":"file_type_velocity.svg","vhdl":"file_type_vhdl.svg","vim":"file_type_vim.svg","volt":"file_type_volt.svg","vue":"file_type_vue.svg","wl":"file_type_wolfram.svg","xml":"file_type_xml.svg","xsl":"file_type_xsl.svg","yaml":"file_type_light_yaml.svg","yang":"file_type_yang.svg"}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = {"_file":"default_file.svg","_folder":"default_folder.svg","_folder_open":"default_folder_opened.svg","_root_folder":"default_root_folder.svg","_root_folder_open":"default_root_folder_opened.svg","_file_light":"","_folder_light":"","_folder_light_open":"","_root_folder_light":"","_root_folder_light_open":"","_fd_aurelia":"folder_type_aurelia.svg","_fd_aurelia_open":"folder_type_aurelia_opened.svg","_fd_aws":"folder_type_aws.svg","_fd_aws_open":"folder_type_aws_opened.svg","_fd_binary":"folder_type_binary.svg","_fd_binary_open":"folder_type_binary_opened.svg","_fd_bower":"folder_type_bower.svg","_fd_bower_open":"folder_type_bower_opened.svg","_fd_cake":"folder_type_cake.svg","_fd_cake_open":"folder_type_cake_opened.svg","_fd_chef":"folder_type_chef.svg","_fd_chef_open":"folder_type_chef_opened.svg","_fd_circleci":"folder_type_circleci.svg","_fd_circleci_open":"folder_type_circleci_opened.svg","_fd_client":"folder_type_client.svg","_fd_client_open":"folder_type_client_opened.svg","_fd_composer":"folder_type_composer.svg","_fd_composer_open":"folder_type_composer_opened.svg","_fd_config":"folder_type_config.svg","_fd_config_open":"folder_type_config_opened.svg","_fd_css":"folder_type_css.svg","_fd_css_open":"folder_type_css_opened.svg","_fd_debian":"folder_type_debian.svg","_fd_debian_open":"folder_type_debian_opened.svg","_fd_dist":"folder_type_dist.svg","_fd_dist_open":"folder_type_dist_opened.svg","_fd_docker":"folder_type_docker.svg","_fd_docker_open":"folder_type_docker_opened.svg","_fd_docs":"folder_type_docs.svg","_fd_docs_open":"folder_type_docs_opened.svg","_fd_elasticbeanstalk":"folder_type_elasticbeanstalk.svg","_fd_elasticbeanstalk_open":"folder_type_elasticbeanstalk_opened.svg","_fd_flow":"folder_type_flow.svg","_fd_flow_open":"folder_type_flow_opened.svg","_fd_fonts":"folder_type_fonts.svg","_fd_fonts_open":"folder_type_fonts_opened.svg","_fd_light_fonts":"folder_type_light_fonts.svg","_fd_light_fonts_open":"folder_type_light_fonts_opened.svg","_fd_gcp":"folder_type_gcp.svg","_fd_gcp_open":"folder_type_gcp_opened.svg","_fd_git":"folder_type_git.svg","_fd_git_open":"folder_type_git_opened.svg","_fd_github":"folder_type_github.svg","_fd_github_open":"folder_type_github_opened.svg","_fd_gitlab":"folder_type_gitlab.svg","_fd_gitlab_open":"folder_type_gitlab_opened.svg","_fd_haxelib":"folder_type_haxelib.svg","_fd_haxelib_open":"folder_type_haxelib_opened.svg","_fd_idea":"folder_type_idea.svg","_fd_idea_open":"folder_type_idea_opened.svg","_fd_images":"folder_type_images.svg","_fd_images_open":"folder_type_images_opened.svg","_fd_include":"folder_type_include.svg","_fd_include_open":"folder_type_include_opened.svg","_fd_js":"folder_type_js.svg","_fd_js_open":"folder_type_js_opened.svg","_fd_kubernetes":"folder_type_kubernetes.svg","_fd_kubernetes_open":"folder_type_kubernetes_opened.svg","_fd_less":"folder_type_less.svg","_fd_less_open":"folder_type_less_opened.svg","_fd_library":"folder_type_library.svg","_fd_library_open":"folder_type_library_opened.svg","_fd_locale":"folder_type_locale.svg","_fd_locale_open":"folder_type_locale_opened.svg","_fd_log":"folder_type_log.svg","_fd_log_open":"folder_type_log_opened.svg","_fd_meteor":"folder_type_meteor.svg","_fd_meteor_open":"folder_type_meteor_opened.svg","_fd_light_meteor":"folder_type_light_meteor.svg","_fd_light_meteor_open":"folder_type_light_meteor_opened.svg","_fd_mjml":"folder_type_mjml.svg","_fd_mjml_open":"folder_type_mjml_opened.svg","_fd_mongodb":"folder_type_mongodb.svg","_fd_mongodb_open":"folder_type_mongodb_opened.svg","_fd_node":"folder_type_node.svg","_fd_node_open":"folder_type_node_opened.svg","_fd_light_node":"folder_type_light_node.svg","_fd_light_node_open":"folder_type_light_node_opened.svg","_fd_nuget":"folder_type_nuget.svg","_fd_nuget_open":"folder_type_nuget_opened.svg","_fd_package":"folder_type_package.svg","_fd_package_open":"folder_type_package_opened.svg","_fd_paket":"folder_type_paket.svg","_fd_paket_open":"folder_type_paket_opened.svg","_fd_php":"folder_type_php.svg","_fd_php_open":"folder_type_php_opened.svg","_fd_plugin":"folder_type_plugin.svg","_fd_plugin_open":"folder_type_plugin_opened.svg","_fd_private":"folder_type_private.svg","_fd_private_open":"folder_type_private_opened.svg","_fd_public":"folder_type_public.svg","_fd_public_open":"folder_type_public_opened.svg","_fd_ravendb":"folder_type_ravendb.svg","_fd_ravendb_open":"folder_type_ravendb_opened.svg","_fd_redis":"folder_type_redis.svg","_fd_redis_open":"folder_type_redis_opened.svg","_fd_sass":"folder_type_sass.svg","_fd_sass_open":"folder_type_sass_opened.svg","_fd_light_sass":"folder_type_light_sass.svg","_fd_light_sass_open":"folder_type_light_sass_opened.svg","_fd_script":"folder_type_script.svg","_fd_script_open":"folder_type_script_opened.svg","_fd_server":"folder_type_server.svg","_fd_server_open":"folder_type_server_opened.svg","_fd_src":"folder_type_src.svg","_fd_src_open":"folder_type_src_opened.svg","_fd_style":"folder_type_style.svg","_fd_style_open":"folder_type_style_opened.svg","_fd_test":"folder_type_test.svg","_fd_test_open":"folder_type_test_opened.svg","_fd_tools":"folder_type_tools.svg","_fd_tools_open":"folder_type_tools_opened.svg","_fd_typescript":"folder_type_typescript.svg","_fd_typescript_open":"folder_type_typescript_opened.svg","_fd_typings":"folder_type_typings.svg","_fd_typings_open":"folder_type_typings_opened.svg","_fd_vagrant":"folder_type_vagrant.svg","_fd_vagrant_open":"folder_type_vagrant_opened.svg","_fd_view":"folder_type_view.svg","_fd_view_open":"folder_type_view_opened.svg","_fd_vs":"folder_type_vs.svg","_fd_vs_open":"folder_type_vs_opened.svg","_fd_vscode":"folder_type_vscode.svg","_fd_vscode_open":"folder_type_vscode_opened.svg","_fd_vscode_test":"folder_type_vscode_test.svg","_fd_vscode_test_open":"folder_type_vscode_test_opened.svg","_fd_webpack":"folder_type_webpack.svg","_fd_webpack_open":"folder_type_webpack_opened.svg","_fd_www":"folder_type_www.svg","_fd_www_open":"folder_type_www_opened.svg","_f_access":"file_type_access.svg","_f_actionscript":"file_type_actionscript.svg","_f_ai":"file_type_ai.svg","_f_al":"file_type_al.svg","_f_angular":"file_type_angular.svg","_f_ansible":"file_type_ansible.svg","_f_antlr":"file_type_antlr.svg","_f_anyscript":"file_type_anyscript.svg","_f_apache":"file_type_apache.svg","_f_apib":"file_type_apib.svg","_f_applescript":"file_type_applescript.svg","_f_appveyor":"file_type_appveyor.svg","_f_arduino":"file_type_arduino.svg","_f_asp":"file_type_asp.svg","_f_aspx":"file_type_aspx.svg","_f_assembly":"file_type_assembly.svg","_f_audio":"file_type_audio.svg","_f_aurelia":"file_type_aurelia.svg","_f_autohotkey":"file_type_autohotkey.svg","_f_autoit":"file_type_autoit.svg","_f_avro":"file_type_avro.svg","_f_aws":"file_type_aws.svg","_f_babel":"file_type_babel.svg","_f_light_babel":"file_type_light_babel.svg","_f_bat":"file_type_bat.svg","_f_bazaar":"file_type_bazaar.svg","_f_binary":"file_type_binary.svg","_f_bithound":"file_type_bithound.svg","_f_blade":"file_type_blade.svg","_f_bolt":"file_type_bolt.svg","_f_bower":"file_type_bower.svg","_f_buckbuild":"file_type_buckbuild.svg","_f_bundler":"file_type_bundler.svg","_f_c":"file_type_c.svg","_f_c_al":"file_type_c_al.svg","_f_cabal":"file_type_cabal.svg","_f_cake":"file_type_cake.svg","_f_cakephp":"file_type_cakephp.svg","_f_cert":"file_type_cert.svg","_f_cf":"file_type_cf.svg","_f_cfc":"file_type_cfc.svg","_f_cfm":"file_type_cfm.svg","_f_cheader":"file_type_cheader.svg","_f_chef":"file_type_chef.svg","_f_circleci":"file_type_circleci.svg","_f_light_circleci":"file_type_light_circleci.svg","_f_class":"file_type_class.svg","_f_clojure":"file_type_clojure.svg","_f_cloudfoundry":"file_type_cloudfoundry.svg","_f_light_cloudfoundry":"file_type_light_cloudfoundry.svg","_f_cmake":"file_type_cmake.svg","_f_cobol":"file_type_cobol.svg","_f_codeclimate":"file_type_codeclimate.svg","_f_light_codeclimate":"file_type_light_codeclimate.svg","_f_codecov":"file_type_codecov.svg","_f_codekit":"file_type_codekit.svg","_f_coffeelint":"file_type_coffeelint.svg","_f_coffeescript":"file_type_coffeescript.svg","_f_compass":"file_type_compass.svg","_f_composer":"file_type_composer.svg","_f_config":"file_type_config.svg","_f_light_config":"file_type_light_config.svg","_f_coveralls":"file_type_coveralls.svg","_f_cpp":"file_type_cpp.svg","_f_cppheader":"file_type_cppheader.svg","_f_crowdin":"file_type_crowdin.svg","_f_crystal":"file_type_crystal.svg","_f_csharp":"file_type_csharp.svg","_f_csproj":"file_type_csproj.svg","_f_css":"file_type_css.svg","_f_csslint":"file_type_csslint.svg","_f_cssmap":"file_type_cssmap.svg","_f_cucumber":"file_type_cucumber.svg","_f_cvs":"file_type_cvs.svg","_f_dal":"file_type_dal.svg","_f_darcs":"file_type_darcs.svg","_f_dartlang":"file_type_dartlang.svg","_f_db":"file_type_db.svg","_f_light_db":"file_type_light_db.svg","_f_delphi":"file_type_delphi.svg","_f_dependencies":"file_type_dependencies.svg","_f_diff":"file_type_diff.svg","_f_dlang":"file_type_dlang.svg","_f_docker":"file_type_docker.svg","_f_docpad":"file_type_docpad.svg","_f_light_docpad":"file_type_light_docpad.svg","_f_doxygen":"file_type_doxygen.svg","_f_drone":"file_type_drone.svg","_f_light_drone":"file_type_light_drone.svg","_f_dylan":"file_type_dylan.svg","_f_edge":"file_type_edge.svg","_f_editorconfig":"file_type_editorconfig.svg","_f_ejs":"file_type_ejs.svg","_f_elasticbeanstalk":"file_type_elasticbeanstalk.svg","_f_elixir":"file_type_elixir.svg","_f_elm":"file_type_elm.svg","_f_emacs":"file_type_emacs.svg","_f_ember":"file_type_ember.svg","_f_ensime":"file_type_ensime.svg","_f_eps":"file_type_eps.svg","_f_erb":"file_type_erb.svg","_f_erlang":"file_type_erlang.svg","_f_eslint":"file_type_eslint.svg","_f_excel":"file_type_excel.svg","_f_favicon":"file_type_favicon.svg","_f_fbx":"file_type_fbx.svg","_f_firebase":"file_type_firebase.svg","_f_flash":"file_type_flash.svg","_f_floobits":"file_type_floobits.svg","_f_flow":"file_type_flow.svg","_f_font":"file_type_font.svg","_f_light_font":"file_type_light_font.svg","_f_fortran":"file_type_fortran.svg","_f_fossil":"file_type_fossil.svg","_f_freemarker":"file_type_freemarker.svg","_f_fsharp":"file_type_fsharp.svg","_f_fsproj":"file_type_fsproj.svg","_f_fusebox":"file_type_fusebox.svg","_f_galen":"file_type_galen.svg","_f_gamemaker":"file_type_gamemaker.svg","_f_gamemaker2":"file_type_gamemaker2.svg","_f_light_gamemaker2":"file_type_light_gamemaker2.svg","_f_gamemaker81":"file_type_gamemaker81.svg","_f_git":"file_type_git.svg","_f_gitlab":"file_type_gitlab.svg","_f_glsl":"file_type_glsl.svg","_f_go":"file_type_go.svg","_f_godot":"file_type_godot.svg","_f_gradle":"file_type_gradle.svg","_f_graphql":"file_type_graphql.svg","_f_graphviz":"file_type_graphviz.svg","_f_groovy":"file_type_groovy.svg","_f_grunt":"file_type_grunt.svg","_f_gulp":"file_type_gulp.svg","_f_haml":"file_type_haml.svg","_f_handlebars":"file_type_handlebars.svg","_f_harbour":"file_type_harbour.svg","_f_haskell":"file_type_haskell.svg","_f_haxe":"file_type_haxe.svg","_f_haxecheckstyle":"file_type_haxecheckstyle.svg","_f_haxedevelop":"file_type_haxedevelop.svg","_f_helix":"file_type_helix.svg","_f_hlsl":"file_type_hlsl.svg","_f_html":"file_type_html.svg","_f_htmlhint":"file_type_htmlhint.svg","_f_http":"file_type_http.svg","_f_idris":"file_type_idris.svg","_f_idrisbin":"file_type_idrisbin.svg","_f_idrispkg":"file_type_idrispkg.svg","_f_image":"file_type_image.svg","_f_infopath":"file_type_infopath.svg","_f_ini":"file_type_ini.svg","_f_light_ini":"file_type_light_ini.svg","_f_ionic":"file_type_ionic.svg","_f_jar":"file_type_jar.svg","_f_java":"file_type_java.svg","_f_jbuilder":"file_type_jbuilder.svg","_f_jenkins":"file_type_jenkins.svg","_f_jest":"file_type_jest.svg","_f_jinja":"file_type_jinja.svg","_f_jpm":"file_type_jpm.svg","_f_js":"file_type_js.svg","_f_light_js":"file_type_light_js.svg","_f_jsbeautify":"file_type_jsbeautify.svg","_f_jsconfig":"file_type_jsconfig.svg","_f_light_jsconfig":"file_type_light_jsconfig.svg","_f_jshint":"file_type_jshint.svg","_f_jsmap":"file_type_jsmap.svg","_f_light_jsmap":"file_type_light_jsmap.svg","_f_json":"file_type_json.svg","_f_light_json":"file_type_light_json.svg","_f_json5":"file_type_json5.svg","_f_light_json5":"file_type_light_json5.svg","_f_jsonld":"file_type_jsonld.svg","_f_light_jsonld":"file_type_light_jsonld.svg","_f_jsp":"file_type_jsp.svg","_f_julia":"file_type_julia.svg","_f_karma":"file_type_karma.svg","_f_key":"file_type_key.svg","_f_kitchenci":"file_type_kitchenci.svg","_f_kite":"file_type_kite.svg","_f_light_kite":"file_type_light_kite.svg","_f_kos":"file_type_kos.svg","_f_kotlin":"file_type_kotlin.svg","_f_layout":"file_type_layout.svg","_f_lerna":"file_type_lerna.svg","_f_light_lerna":"file_type_light_lerna.svg","_f_less":"file_type_less.svg","_f_license":"file_type_license.svg","_f_lime":"file_type_lime.svg","_f_liquid":"file_type_liquid.svg","_f_lisp":"file_type_lisp.svg","_f_locale":"file_type_locale.svg","_f_log":"file_type_log.svg","_f_lsl":"file_type_lsl.svg","_f_lua":"file_type_lua.svg","_f_lync":"file_type_lync.svg","_f_makefile":"file_type_makefile.svg","_f_manifest":"file_type_manifest.svg","_f_manifest_bak":"file_type_manifest_bak.svg","_f_manifest_skip":"file_type_manifest_skip.svg","_f_map":"file_type_map.svg","_f_markdown":"file_type_markdown.svg","_f_markdownlint":"file_type_markdownlint.svg","_f_marko":"file_type_marko.svg","_f_markojs":"file_type_markojs.svg","_f_matlab":"file_type_matlab.png","_f_mercurial":"file_type_mercurial.svg","_f_meteor":"file_type_meteor.svg","_f_mjml":"file_type_mjml.svg","_f_monotone":"file_type_monotone.svg","_f_mson":"file_type_mson.svg","_f_mustache":"file_type_mustache.svg","_f_light_mustache":"file_type_light_mustache.svg","_f_nim":"file_type_nim.svg","_f_njsproj":"file_type_njsproj.svg","_f_node":"file_type_node.svg","_f_npm":"file_type_npm.svg","_f_nsi":"file_type_nsi.svg","_f_nuget":"file_type_nuget.svg","_f_nunjucks":"file_type_nunjucks.svg","_f_nyc":"file_type_nyc.svg","_f_objectivec":"file_type_objectivec.svg","_f_objectivecpp":"file_type_objectivecpp.svg","_f_ocaml":"file_type_ocaml.svg","_f_onenote":"file_type_onenote.svg","_f_openHAB":"file_type_openHAB.svg","_f_opencl":"file_type_opencl.svg","_f_org":"file_type_org.svg","_f_outlook":"file_type_outlook.svg","_f_package":"file_type_package.svg","_f_paket":"file_type_paket.svg","_f_patch":"file_type_patch.svg","_f_pcl":"file_type_pcl.svg","_f_light_pcl":"file_type_light_pcl.svg","_f_pdf":"file_type_pdf.svg","_f_perl":"file_type_perl.svg","_f_perl6":"file_type_perl6.svg","_f_photoshop":"file_type_photoshop.svg","_f_php":"file_type_php.svg","_f_phpunit":"file_type_phpunit.svg","_f_plantuml":"file_type_plantuml.svg","_f_plsql":"file_type_plsql.svg","_f_plsql_package":"file_type_plsql_package.svg","_f_plsql_package_body":"file_type_plsql_package_body.svg","_f_plsql_package_header":"file_type_plsql_package_header.svg","_f_plsql_package_spec":"file_type_plsql_package_spec.svg","_f_poedit":"file_type_poedit.svg","_f_polymer":"file_type_polymer.svg","_f_postcss":"file_type_postcss.svg","_f_powerpoint":"file_type_powerpoint.svg","_f_powershell":"file_type_powershell.svg","_f_prettier":"file_type_prettier.svg","_f_light_prettier":"file_type_light_prettier.svg","_f_processinglang":"file_type_processinglang.svg","_f_procfile":"file_type_procfile.svg","_f_progress":"file_type_progress.svg","_f_prolog":"file_type_prolog.svg","_f_protobuf":"file_type_protobuf.svg","_f_protractor":"file_type_protractor.svg","_f_publisher":"file_type_publisher.svg","_f_pug":"file_type_pug.svg","_f_puppet":"file_type_puppet.svg","_f_purescript":"file_type_purescript.svg","_f_light_purescript":"file_type_light_purescript.svg","_f_python":"file_type_python.svg","_f_q":"file_type_q.svg","_f_qlikview":"file_type_qlikview.svg","_f_r":"file_type_r.svg","_f_racket":"file_type_racket.svg","_f_rails":"file_type_rails.svg","_f_rake":"file_type_rake.svg","_f_raml":"file_type_raml.svg","_f_razor":"file_type_razor.svg","_f_reactjs":"file_type_reactjs.svg","_f_reacttemplate":"file_type_reacttemplate.svg","_f_reactts":"file_type_reactts.svg","_f_reason":"file_type_reason.svg","_f_registry":"file_type_registry.svg","_f_rest":"file_type_rest.svg","_f_riot":"file_type_riot.svg","_f_robotframework":"file_type_robotframework.svg","_f_robots":"file_type_robots.svg","_f_rollup":"file_type_rollup.svg","_f_rspec":"file_type_rspec.svg","_f_ruby":"file_type_ruby.svg","_f_rust":"file_type_rust.svg","_f_saltstack":"file_type_saltstack.svg","_f_sass":"file_type_sass.svg","_f_sbt":"file_type_sbt.svg","_f_scala":"file_type_scala.svg","_f_script":"file_type_script.svg","_f_scss":"file_type_scss.svg","_f_sdlang":"file_type_sdlang.svg","_f_sequelize":"file_type_sequelize.svg","_f_shaderlab":"file_type_shaderlab.svg","_f_light_shaderlab":"file_type_light_shaderlab.svg","_f_shell":"file_type_shell.svg","_f_sketch":"file_type_sketch.svg","_f_slim":"file_type_slim.svg","_f_sln":"file_type_sln.svg","_f_smarty":"file_type_smarty.svg","_f_snyk":"file_type_snyk.svg","_f_solidity":"file_type_solidity.svg","_f_light_solidity":"file_type_light_solidity.svg","_f_source":"file_type_source.svg","_f_sqf":"file_type_sqf.svg","_f_sql":"file_type_sql.svg","_f_sqlite":"file_type_sqlite.svg","_f_sss":"file_type_sss.svg","_f_storyboard":"file_type_storyboard.svg","_f_storybook":"file_type_storybook.svg","_f_style":"file_type_style.svg","_f_stylelint":"file_type_stylelint.svg","_f_light_stylelint":"file_type_light_stylelint.svg","_f_stylus":"file_type_stylus.svg","_f_subversion":"file_type_subversion.svg","_f_svg":"file_type_svg.svg","_f_swagger":"file_type_swagger.svg","_f_swift":"file_type_swift.svg","_f_tcl":"file_type_tcl.svg","_f_terraform":"file_type_terraform.svg","_f_test":"file_type_test.svg","_f_testjs":"file_type_testjs.svg","_f_light_testjs":"file_type_light_testjs.svg","_f_testts":"file_type_testts.svg","_f_tex":"file_type_tex.svg","_f_light_tex":"file_type_light_tex.svg","_f_text":"file_type_text.svg","_f_textile":"file_type_textile.svg","_f_tfs":"file_type_tfs.svg","_f_todo":"file_type_todo.svg","_f_light_todo":"file_type_light_todo.svg","_f_toml":"file_type_toml.svg","_f_travis":"file_type_travis.svg","_f_tsconfig":"file_type_tsconfig.svg","_f_tslint":"file_type_tslint.svg","_f_twig":"file_type_twig.svg","_f_typescript":"file_type_typescript.svg","_f_typescriptdef":"file_type_typescriptdef.svg","_f_vagrant":"file_type_vagrant.svg","_f_vash":"file_type_vash.svg","_f_light_vash":"file_type_light_vash.svg","_f_vb":"file_type_vb.svg","_f_vba":"file_type_vba.svg","_f_vbhtml":"file_type_vbhtml.svg","_f_vbproj":"file_type_vbproj.svg","_f_vcxproj":"file_type_vcxproj.svg","_f_velocity":"file_type_velocity.svg","_f_vhdl":"file_type_vhdl.svg","_f_video":"file_type_video.svg","_f_view":"file_type_view.svg","_f_vim":"file_type_vim.svg","_f_volt":"file_type_volt.svg","_f_vscode":"file_type_vscode.svg","_f_vsix":"file_type_vsix.svg","_f_light_vsix":"file_type_light_vsix.svg","_f_vue":"file_type_vue.svg","_f_watchmanconfig":"file_type_watchmanconfig.svg","_f_webpack":"file_type_webpack.svg","_f_wercker":"file_type_wercker.svg","_f_wolfram":"file_type_wolfram.svg","_f_word":"file_type_word.svg","_f_wxml":"file_type_wxml.svg","_f_wxss":"file_type_wxss.svg","_f_xcode":"file_type_xcode.svg","_f_xib":"file_type_xib.svg","_f_xliff":"file_type_xliff.svg","_f_xml":"file_type_xml.svg","_f_xsl":"file_type_xsl.svg","_f_yaml":"file_type_yaml.svg","_f_light_yaml":"file_type_light_yaml.svg","_f_yang":"file_type_yang.svg","_f_yarn":"file_type_yarn.svg","_f_yeoman":"file_type_yeoman.svg","_f_zip":"file_type_zip.svg"}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// COPIED FROM https://github.com/sindresorhus/refined-github/blob/master/src/libs/page-detect.js
Object.defineProperty(exports, "__esModule", { value: true });
var select = __webpack_require__(9);
exports.isGist = function () { return location.hostname.startsWith('gist.') || location.pathname.startsWith('gist/'); };
exports.isDashboard = function () { return location.pathname === '/' || /^(\/orgs\/[^/]+)?\/dashboard/.test(location.pathname); };
exports.isTrending = function () { return location.pathname.startsWith('/trending'); };
// @todo Replace with DOM-based test because this is too generic #708
exports.isRepo = function () { return !exports.isGist() && !exports.isTrending() && /^\/[^/]+\/[^/]+/.test(location.pathname); };
exports.getRepoPath = function () { return location.pathname.replace(/^\/[^/]+\/[^/]+/, ''); };
exports.getRepoURL = function () {
    return location.pathname
        .slice(1)
        .split('/', 2)
        .join('/');
};
exports.isRepoRoot = function () {
    return exports.isRepo() && /^(\/?$|\/tree\/)/.test(exports.getRepoPath()) && select.exists('.repository-meta-content');
};
exports.isRepoTree = function () { return exports.isRepo() && /\/tree\//.test(exports.getRepoPath()); };
exports.isIssueSearch = function () { return location.pathname.startsWith('/issues'); };
exports.isIssueList = function () { return exports.isRepo() && /^\/issues\/?$/.test(exports.getRepoPath()); };
exports.isIssue = function () { return exports.isRepo() && /^\/issues\/\d+/.test(exports.getRepoPath()); };
exports.isPRSearch = function () { return location.pathname.startsWith('/pulls'); };
exports.isPRList = function () { return exports.isRepo() && /^\/pulls\/?$/.test(exports.getRepoPath()); };
exports.isPR = function () { return exports.isRepo() && /^\/pull\/\d+/.test(exports.getRepoPath()); };
exports.isPRFiles = function () { return exports.isRepo() && /^\/pull\/\d+\/files/.test(exports.getRepoPath()); };
exports.isPRCommit = function () { return exports.isRepo() && /^\/pull\/\d+\/commits\/[0-9a-f]{5,40}/.test(exports.getRepoPath()); };
exports.isHistoryForFile = function () { return exports.isRepo() && /^\/commits\/[0-9a-f]{5,40}\/.+/.test(exports.getRepoPath()); };
exports.isMilestoneList = function () { return exports.isRepo() && /^\/milestones\/?$/.test(exports.getRepoPath()); };
exports.isMilestone = function () { return exports.isRepo() && /^\/milestone\/\d+/.test(exports.getRepoPath()); };
exports.isLabelList = function () { return exports.isRepo() && /^\/labels\/?(((?=\?).*)|$)/.test(exports.getRepoPath()); };
exports.isLabel = function () { return exports.isRepo() && /^\/labels\/\w+/.test(exports.getRepoPath()); };
exports.isCommitList = function () { return exports.isRepo() && /^\/commits\//.test(exports.getRepoPath()); };
exports.isSingleCommit = function () { return exports.isRepo() && /^\/commit\/[0-9a-f]{5,40}/.test(exports.getRepoPath()); };
exports.isCommit = function () { return exports.isSingleCommit() || exports.isPRCommit() || (exports.isPRFiles() && select.exists('.full-commit')); };
exports.isCompare = function () { return exports.isRepo() && /^\/compare/.test(exports.getRepoPath()); };
exports.isQuickPR = function () { return exports.isCompare() && /[?&]quick_pull=1(&|$)/.test(location.search); };
exports.hasCode = function () { return exports.isRepo() && select.exists('.highlight'); };
exports.hasDiff = function () {
    return exports.isRepo() &&
        (exports.isSingleCommit() || exports.isPRCommit() || exports.isPRFiles() || exports.isCompare() || (exports.isPR() && select.exists('.diff-table')));
};
exports.isReleases = function () { return exports.isRepo() && /^\/(releases|tags)/.test(exports.getRepoPath()); };
exports.isBlame = function () { return exports.isRepo() && /^\/blame\//.test(exports.getRepoPath()); };
exports.isNotifications = function () { return location.pathname.startsWith('/notifications'); };
exports.isRepoSettings = function () { return exports.isRepo() && /^\/settings/.test(exports.getRepoPath()); };
exports.getOwnerAndRepo = function () {
    var _a = location.pathname.split('/'), ownerName = _a[1], repoName = _a[2];
    return {
        ownerName: ownerName,
        repoName: repoName
    };
};
exports.isSingleFile = function () {
    var _a = exports.getOwnerAndRepo(), ownerName = _a.ownerName, repoName = _a.repoName;
    var blobPattern = new RegExp("/" + ownerName + "/" + repoName + "/blob/");
    return exports.isRepo() && blobPattern.test(location.href);
};
exports.hasCommentForm = function () { return select.exists('.js-previewable-comment-form'); };


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @param {string} selector   One or more CSS selectors separated by commas
 * @param {Element} [parent]  The element to look inside of
 * @return {?Element}         The element found, if any
 */
function select(selector, parent) {
	return (parent || document).querySelector(selector);
}

/**
 * @param {string} selector   One or more CSS selectors separated by commas
 * @param {Element} [parent]  The element to look inside of
 * @return {boolean}          Whether it's been found
 */
select.exists = function (selector, parent) {
	return Boolean(select(selector, parent));
};

/**
 * @param {string} selector               One or more CSS selectors separated by commas
 * @param {Element|Element[]} [parent]    The element or list of elements to look inside of
 * @return {Element[]}                    An array of elements found
 */
select.all = function (selector, parent) {
	// Can be: select.all('selector') or select.all('selector', singleElementOrDocument)
	if (!parent || typeof parent.querySelectorAll === 'function') {
		return Array.apply(null, (parent || document).querySelectorAll(selector));
	}

	var current;
	var i;
	var ii;
	var all = [];
	for (i = 0; i < parent.length; i++) {
		current = parent[i].querySelectorAll(selector);
		for (ii = 0; ii < current.length; ii++) {
			if (all.indexOf(current[ii]) < 0) {
				all.push(current[ii]);
			}
		}
	}
	return all;
};

module.exports = select;


/***/ })
/******/ ]);
//# sourceMappingURL=content.js.map