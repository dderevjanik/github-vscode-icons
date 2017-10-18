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
var PageDetect_1 = __webpack_require__(7);
var DEFAULT_ROOT_OPENED = 'default_root_folder_opened.svg';
var QUERY_NAVIGATION_ITEMS = '.file-wrap>table>tbody:last-child>tr.js-navigation-item';
var QUERY_PATH_SEGMENTS = 'js-path-segment';
var QUERY_LAST_PATH_SEGMENT = 'final-path';
/**
 * Show icon for path segments
 */
var showIconsForSegments = function () { return __awaiter(_this, void 0, void 0, function () {
    var aSegments, firstSegment, finalSegment, spanEl, iconPath, i, spanEl, aEl, iconPath;
    return __generator(this, function (_a) {
        aSegments = document.getElementsByClassName(QUERY_PATH_SEGMENTS);
        firstSegment = aSegments[0];
        finalSegment = document.getElementsByClassName(QUERY_LAST_PATH_SEGMENT)[0];
        // first segment has always root folder icon
        if (firstSegment) {
            spanEl = firstSegment.children[0];
            spanEl.innerHTML = "<img src=\"" + chrome.runtime.getURL('icons/' + DEFAULT_ROOT_OPENED) + "\" alt=\"icon\" height=\"16\"><span> " + spanEl.innerText + "</span>";
        }
        // check if final segment is file or folder
        if (finalSegment) {
            iconPath = window.location.href.includes('/blob/')
                ? Icons_1.getIconForFile(finalSegment.innerText)
                : Icons_1.getIconForOpenFolder(finalSegment.innerText);
            finalSegment.innerHTML = "<img src=\"" + chrome.runtime.getURL('icons/' + iconPath) + "\" alt=\"icon\" height=\"16\"><span> " + finalSegment.innerText + "</span>";
        }
        // segments between first and last are always folders
        for (i = 1; i < aSegments.length; i++) {
            spanEl = aSegments[i];
            aEl = spanEl.firstChild;
            iconPath = Icons_1.getIconForOpenFolder(aEl.innerText);
            aEl.innerHTML = "<img src=\"" + chrome.runtime.getURL('icons/' + iconPath) + "\" alt=\"icon\" height=\"16\"><span> " + aEl.innerText + "</span>";
        }
        return [2 /*return*/];
    });
}); };
/**
 * Show icons for repository files
 */
var showRepoTreeIcons = function () { return __awaiter(_this, void 0, void 0, function () {
    var trEls, i, trEl, iconEl, contentEl, filename, folderName, isFolder, iconPath;
    return __generator(this, function (_a) {
        trEls = document.querySelectorAll(QUERY_NAVIGATION_ITEMS);
        for (i = 0; i < trEls.length; i++) {
            trEl = trEls[i];
            iconEl = trEl.children[0];
            contentEl = trEl.children[1];
            filename = contentEl.firstElementChild
                .firstElementChild.innerText.toLowerCase();
            folderName = filename.split('/').shift();
            isFolder = contentEl.firstElementChild.firstElementChild.href.indexOf('/tree/') >
                0;
            iconPath = isFolder ? Icons_1.getIconForFolder(folderName) : Icons_1.getIconForFile(filename);
            iconEl.innerHTML = "<img src=\"" + chrome.runtime.getURL('icons/' + iconPath) + "\" alt=\"icon\">";
        }
        return [2 /*return*/];
    });
}); };
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
            fileInfo.firstElementChild.innerHTML = "<img src=\"" + chrome.runtime.getURL('icons/' + iconPath) + "\" alt=\"icon\" class=\"vscode-icon\">";
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
var fileExtensionsToIcon = __webpack_require__(3);
var fileNamesToIcon = __webpack_require__(4);
var languagesToIcon = __webpack_require__(5);
var iconsToPath = __webpack_require__(6);
exports.DEFAULT_FOLDER = 'default_folder.svg';
exports.DEFAULT_FOLDER_OPENED = 'default_folder_opened.svg';
exports.DEFAULT_FILE = 'default_file.svg';
/**
 * Get icon for a folder
 * @param folderName name of folder to find icon for
 * @return icon filename
 */
function getIconForFolder(folderName) {
    var iconKey = folderNamesToIcon[folderName];
    if (iconKey) {
        var iconPath = iconsToPath[iconKey];
        if (iconPath) {
            return iconPath;
        }
    }
    // if there's no icon for folder, use default one
    return exports.DEFAULT_FOLDER;
}
exports.getIconForFolder = getIconForFolder;
/**
 * Get icon for a file
 * @param fileName name of file to find icon for
 * @return icon filename
 */
function getIconForFile(fileName) {
    // match by exact FileName
    var iconKeyFromFileName = folderNamesToIcon[fileName];
    if (iconKeyFromFileName) {
        var iconPath = iconsToPath[iconKeyFromFileName];
        return iconPath;
    }
    // match by File Extension
    var fileExtension = fileName.split('.').pop();
    var iconKeyFromFileExt = fileExtensionsToIcon[fileExtension];
    if (iconKeyFromFileExt) {
        var iconPath = iconsToPath[iconKeyFromFileExt];
        return iconPath;
    }
    // match by language
    var iconKeyFromLang = languagesToIcon[fileExtension];
    if (iconKeyFromLang) {
        var iconPath = iconsToPath[iconKeyFromLang];
        return iconPath;
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

module.exports = {"aurelia_project":"_fd_aurelia","aws":"_fd_aws",".aws":"_fd_aws","bin":"_fd_binary",".bin":"_fd_binary","bower_components":"_fd_bower","cake":"_fd_cake",".cake":"_fd_cake","chef":"_fd_chef",".chef":"_fd_chef",".circleci":"_fd_circleci","client":"_fd_client","composer":"_fd_composer",".composer":"_fd_composer","config":"_fd_config",".config":"_fd_config","ini":"_fd_config",".ini":"_fd_config","initializers":"_fd_config",".initializers":"_fd_config","css":"_fd_css","_css":"_fd_css","debian":"_fd_debian","dist":"_fd_dist","out":"_fd_dist","export":"_fd_dist","build":"_fd_dist","release":"_fd_dist","docker":"_fd_docker",".docker":"_fd_docker","docs":"_fd_docs","doc":"_fd_docs",".elasticbeanstalk":"_fd_elasticbeanstalk",".ebextensions":"_fd_elasticbeanstalk","flow":"_fd_flow","fonts":"_fd_light_fonts","font":"_fd_light_fonts","fnt":"_fd_light_fonts","gcp":"_fd_gcp",".gcp":"_fd_gcp",".git":"_fd_git","submodules":"_fd_git",".submodules":"_fd_git",".github":"_fd_github",".gitlab":"_fd_gitlab","haxelib":"_fd_haxelib",".idea":"_fd_idea","images":"_fd_images","image":"_fd_images","img":"_fd_images","icons":"_fd_images","icon":"_fd_images","ico":"_fd_images","include":"_fd_include","includes":"_fd_include","incl":"_fd_include","js":"_fd_js","kubernetes":"_fd_kubernetes","k8s":"_fd_kubernetes","kube":"_fd_kubernetes","kuber":"_fd_kubernetes","less":"_fd_less","_less":"_fd_less","lib":"_fd_library",".lib":"_fd_library","locale":"_fd_locale","locales":"_fd_locale","i18n":"_fd_locale","g11n":"_fd_locale","log":"_fd_log","logs":"_fd_log",".meteor":"_fd_light_meteor","mjml":"_fd_mjml",".mjml":"_fd_mjml","mongodb":"_fd_mongodb","node_modules":"_fd_light_node",".nuget":"_fd_nuget","package":"_fd_package","packages":"_fd_package",".package":"_fd_package",".packages":"_fd_package",".paket":"_fd_paket","php":"_fd_php","plugin":"_fd_plugin",".plugin":"_fd_plugin","plugins":"_fd_plugin",".plugins":"_fd_plugin","private":"_fd_private",".private":"_fd_private","public":"_fd_public",".public":"_fd_public","ravendb":"_fd_ravendb","redis":"_fd_redis","sass":"_fd_light_sass","scss":"_fd_light_sass","_sass":"_fd_light_sass","_scss":"_fd_light_sass","script":"_fd_script","scripts":"_fd_script","server":"_fd_server","src":"_fd_src","source":"_fd_src","sources":"_fd_src","style":"_fd_style","styles":"_fd_style","tests":"_fd_test",".tests":"_fd_test","test":"_fd_test",".test":"_fd_test","__tests__":"_fd_test","__test__":"_fd_test","spec":"_fd_test",".spec":"_fd_test","specs":"_fd_test",".specs":"_fd_test","tools":"_fd_tools",".tools":"_fd_tools","util":"_fd_tools","utils":"_fd_tools","typescript":"_fd_typescript","ts":"_fd_typescript","typings":"_fd_typings","vagrant":"_fd_vagrant",".vagrant":"_fd_vagrant","html":"_fd_view","view":"_fd_view","views":"_fd_view",".vs":"_fd_vs",".vscode":"_fd_vscode",".vscode-test":"_fd_vscode_test","webpack":"_fd_webpack","www":"_fd_www","wwwroot":"_fd_www"}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {"accdb":"_f_access","accdt":"_f_access","mdb":"_f_access","accda":"_f_access","accdc":"_f_access","accde":"_f_access","accdp":"_f_access","accdr":"_f_access","accdu":"_f_access","ade":"_f_access","adp":"_f_access","laccdb":"_f_access","ldb":"_f_access","mam":"_f_access","maq":"_f_access","mdw":"_f_access","ai":"_f_ai","ino":"_f_arduino","pde":"_f_arduino","aspx":"_f_aspx","ascx":"_f_aspx","aac":"_f_audio","act":"_f_audio","aiff":"_f_audio","amr":"_f_audio","ape":"_f_audio","au":"_f_audio","dct":"_f_audio","dss":"_f_audio","dvf":"_f_audio","flac":"_f_audio","gsm":"_f_audio","iklax":"_f_audio","ivs":"_f_audio","m4a":"_f_audio","m4b":"_f_audio","m4p":"_f_audio","mmf":"_f_audio","mogg":"_f_audio","mp3":"_f_audio","mpc":"_f_audio","msv":"_f_audio","oga":"_f_audio","ogg":"_f_audio","opus":"_f_audio","ra":"_f_audio","raw":"_f_audio","tta":"_f_audio","vox":"_f_audio","wav":"_f_audio","wma":"_f_audio","a":"_f_binary","app":"_f_binary","bin":"_f_binary","cmo":"_f_binary","cmx":"_f_binary","cma":"_f_binary","cmxa":"_f_binary","cmi":"_f_binary","dll":"_f_binary","exe":"_f_binary","hl":"_f_binary","ilk":"_f_binary","lib":"_f_binary","n":"_f_binary","ndll":"_f_binary","o":"_f_binary","obj":"_f_binary","pyc":"_f_binary","pyd":"_f_binary","pyo":"_f_binary","pdb":"_f_binary","scpt":"_f_binary","scptd":"_f_binary","so":"_f_binary","csr":"_f_cert","crt":"_f_cert","cer":"_f_cert","der":"_f_cert","pfx":"_f_cert","p12":"_f_cert","p7b":"_f_cert","p7r":"_f_cert","src":"_f_cert","crl":"_f_cert","sst":"_f_cert","stl":"_f_cert","lucee":"_f_cf","h":"_f_cheader","class":"_f_class","cjm":"_f_clojure","cljc":"_f_clojure","kit":"_f_codekit","env":"_f_light_config","hpp":"_f_cppheader","csx":"_f_csharp","csproj":"_f_csproj","css.map":"_f_cssmap","db":"_f_light_db","eco":"_f_light_docpad","ejs":"_f_ejs","el":"_f_emacs","elc":"_f_emacs","ensime":"_f_ensime","eps":"_f_eps","xls":"_f_excel","xlsx":"_f_excel","xlsm":"_f_excel","ods":"_f_excel","fbx":"_f_fbx","swf":"_f_flash","swc":"_f_flash","js.flow":"_f_flow","woff":"_f_light_font","woff2":"_f_light_font","ttf":"_f_light_font","otf":"_f_light_font","eot":"_f_light_font","pfa":"_f_light_font","pfb":"_f_light_font","sfd":"_f_light_font","fsproj":"_f_fsproj","gmx":"_f_gamemaker","yy":"_f_light_gamemaker2","yyp":"_f_light_gamemaker2","gradle":"_f_gradle","hxproj":"_f_haxedevelop","idr":"_f_idris","lidr":"_f_idris","ibc":"_f_idrisbin","ipkg":"_f_idrispkg","jpeg":"_f_image","jpg":"_f_image","gif":"_f_image","png":"_f_image","bmp":"_f_image","tiff":"_f_image","ico":"_f_image","infopathxml":"_f_infopath","xsn":"_f_infopath","xsf":"_f_infopath","xtp2":"_f_infopath","jar":"_f_jar","jbuilder":"_f_jbuilder","js.map":"_f_light_jsmap","json5":"_f_light_json5","jsonld":"_f_light_jsonld","json-ld":"_f_light_jsonld","jsp":"_f_jsp","key":"_f_key","pem":"_f_key","ks":"_f_kos","master":"_f_layout","layout.html":"_f_layout","layout.htm":"_f_layout","enc":"_f_license","hxp":"_f_lime","liquid":"_f_liquid","log":"_f_log","lsl":"_f_lsl","crec":"_f_lync","ocrec":"_f_lync","makefile":"_f_makefile","map":"_f_map","mdown":"_f_markdown","markdown":"_f_markdown","marko.js":"_f_markojs","fig":"_f_matlab","mex":"_f_matlab","mexn":"_f_matlab","mexrs6":"_f_matlab","mn":"_f_matlab","mum":"_f_matlab","mx":"_f_matlab","mx3":"_f_matlab","rwd":"_f_matlab","slx":"_f_matlab","slddc":"_f_matlab","smv":"_f_matlab","tikz":"_f_matlab","xvc":"_f_matlab","mustache":"_f_light_mustache","mst":"_f_light_mustache","njsproj":"_f_njsproj","nupkg":"_f_nuget","nuspec":"_f_nuget","psmdcp":"_f_nuget","nunj":"_f_nunjucks","njs":"_f_nunjucks","one":"_f_onenote","onepkg":"_f_onenote","onetoc":"_f_onenote","onetoc2":"_f_onenote","sig":"_f_onenote","cl":"_f_opencl","opencl":"_f_opencl","org":"_f_org","pst":"_f_outlook","bcmx":"_f_outlook","otm":"_f_outlook","msg":"_f_outlook","oft":"_f_outlook","pkg":"_f_package","patch":"_f_patch","pcd":"_f_light_pcl","pdf":"_f_pdf","psd":"_f_photoshop","php1":"_f_php","php2":"_f_php","php3":"_f_php","php4":"_f_php","php5":"_f_php","php6":"_f_php","phps":"_f_php","phpsa":"_f_php","phpt":"_f_php","phtml":"_f_php","phar":"_f_php","pu":"_f_plantuml","plantuml":"_f_plantuml","iuml":"_f_plantuml","puml":"_f_plantuml","pck":"_f_plsql_package","pkb":"_f_plsql_package_body","pkh":"_f_plsql_package_header","pks":"_f_plsql_package_spec","po":"_f_poedit","mo":"_f_poedit","pot":"_f_powerpoint","potx":"_f_powerpoint","potm":"_f_powerpoint","pps":"_f_powerpoint","ppsx":"_f_powerpoint","ppsm":"_f_powerpoint","ppt":"_f_powerpoint","pptx":"_f_powerpoint","pptm":"_f_powerpoint","pa":"_f_powerpoint","ppa":"_f_powerpoint","ppam":"_f_powerpoint","sldm":"_f_powerpoint","sldx":"_f_powerpoint","pro":"_f_prolog","P":"_f_prolog","pub":"_f_publisher","puz":"_f_publisher","q":"_f_q","qvd":"_f_qlikview","qvw":"_f_qlikview","rake":"_f_rake","rt":"_f_reacttemplate","reg":"_f_registry","sls":"_f_saltstack","sass":"_f_sass","scssm":"_f_scss","fish":"_f_shell","sketch":"_f_sketch","sln":"_f_sln","sqlite":"_f_sqlite","sqlite3":"_f_sqlite","db3":"_f_sqlite","sss":"_f_sss","storyboard":"_f_storyboard","story.js":"_f_storybook","stories.js":"_f_storybook","svg":"_f_svg","tcl":"_f_tcl","exp":"_f_tcl","tfstate":"_f_terraform","tst":"_f_test","test.js":"_f_light_testjs","spec.js":"_f_light_testjs","test.jsx":"_f_light_testjs","spec.jsx":"_f_light_testjs","test.ts":"_f_testts","test.tsx":"_f_testts","spec.ts":"_f_testts","spec.tsx":"_f_testts","texi":"_f_light_tex","csv":"_f_text","todo":"_f_light_todo","d.ts":"_f_typescriptdef","vash":"_f_light_vash","vbhtml":"_f_vbhtml","vbproj":"_f_vbproj","vcxproj":"_f_vcxproj","3g2":"_f_video","3gp":"_f_video","asf":"_f_video","amv":"_f_video","avi":"_f_video","divx":"_f_video","qt":"_f_video","f4a":"_f_video","f4b":"_f_video","f4p":"_f_video","f4v":"_f_video","flv":"_f_video","m2v":"_f_video","m4v":"_f_video","mkv":"_f_video","mk3d":"_f_video","mov":"_f_video","mp2":"_f_video","mp4":"_f_video","mpe":"_f_video","mpeg":"_f_video","mpeg2":"_f_video","mpg":"_f_video","mpv":"_f_video","nsv":"_f_video","ogv":"_f_video","rm":"_f_video","rmvb":"_f_video","svi":"_f_video","vob":"_f_video","webm":"_f_video","wmv":"_f_video","vsix":"_f_light_vsix","doc":"_f_word","docx":"_f_word","docm":"_f_word","dot":"_f_word","dotx":"_f_word","dotm":"_f_word","wll":"_f_word","wxml":"_f_wxml","wxss":"_f_wxss","xcodeproj":"_f_xcode","xib":"_f_xib","xliff":"_f_xliff","xlf":"_f_xliff","pex":"_f_xml","tmlanguage":"_f_xml","yml":"_f_light_yaml","zip":"_f_zip","rar":"_f_zip","7z":"_f_zip","tar":"_f_zip","gz":"_f_zip","bzip2":"_f_zip","xz":"_f_zip","bz2":"_f_zip"}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {".angular-cli.json":"_f_angular","angular-cli.json":"_f_angular","appveyor.yml":"_f_appveyor",".appveyor.yml":"_f_appveyor","aurelia.json":"_f_aurelia",".babelrc":"_f_light_babel","babelrc.js":"_f_light_babel",".bzrignore":"_f_bazaar",".bithoundrc":"_f_bithound",".bowerrc":"_f_bower","bower.json":"_f_bower",".buckconfig":"_f_buckbuild","gemfile":"_f_bundler","gemfile.lock":"_f_bundler","chefignore":"_f_chef","berksfile":"_f_chef","berksfile.lock":"_f_chef","policyfile":"_f_chef","circle.yml":"_f_light_circleci",".cfignore":"_f_light_cloudfoundry",".codeclimate.yml":"_f_light_codeclimate","codecov.yml":"_f_codecov",".codecov.yml":"_f_codecov","config.codekit":"_f_codekit","config.codekit2":"_f_codekit","config.codekit3":"_f_codekit","coffeelint.json":"_f_coffeelint",".coffeelintignore":"_f_coffeelint","composer.json":"_f_composer","composer.lock":"_f_composer",".env.example":"_f_light_config",".coveralls.yml":"_f_coveralls","crowdin.yml":"_f_crowdin",".csslintrc":"_f_csslint",".cvsignore":"_f_cvs",".boringignore":"_f_darcs","dependencies.yml":"_f_dependencies",".dockerignore":"_f_docker","docker-compose.yml":"_f_docker","docker-compose.ci-build.yml":"_f_docker","docker-compose.override.yml":"_f_docker","docker-compose.vs.debug.yml":"_f_docker","docker-compose.vs.release.yml":"_f_docker","docker-cloud.yml":"_f_docker",".drone.yml":"_f_light_drone",".drone.yml.sig":"_f_light_drone",".editorconfig":"_f_editorconfig","elm-package.json":"_f_elm",".ember-cli":"_f_ember","emakefile":"_f_erlang",".emakerfile":"_f_erlang",".eslintrc":"_f_eslint",".eslintignore":"_f_eslint",".eslintcache":"_f_eslint",".eslintrc.js":"_f_eslint",".eslintrc.json":"_f_eslint",".eslintrc.yaml":"_f_eslint",".eslintrc.yml":"_f_eslint","favicon.ico":"_f_favicon",".firebaserc":"_f_firebase",".flooignore":"_f_floobits",".flowconfig":"_f_flow","ignore-glob":"_f_fossil","fuse.js":"_f_fusebox",".gitattributes":"_f_git",".gitconfig":"_f_git",".gitignore":"_f_git",".gitmodules":"_f_git",".gitkeep":"_f_git",".gitlab-ci.yml":"_f_gitlab",".gqlconfig":"_f_graphql","gruntfile.coffee":"_f_grunt","gruntfile.babel.coffee":"_f_grunt","gruntfile.js":"_f_grunt","gruntfile.babel.js":"_f_grunt","gruntfile.ts":"_f_grunt","gruntfile.babel.ts":"_f_grunt","gulpfile.coffee":"_f_gulp","gulpfile.babel.coffee":"_f_gulp","gulpfile.js":"_f_gulp","gulpfile.babel.js":"_f_gulp","gulpfile.ts":"_f_gulp","gulpfile.babel.ts":"_f_gulp","haxelib.json":"_f_haxe","checkstyle.json":"_f_haxecheckstyle",".p4ignore":"_f_helix",".htmlhintrc":"_f_htmlhint","ionic.project":"_f_ionic","ionic.config.json":"_f_ionic","jenkinsfile":"_f_jenkins","jest.config.js":"_f_jest","jest.json":"_f_jest","jest.config.json":"_f_jest",".jestrc":"_f_jest",".jpmignore":"_f_jpm",".jsbeautifyrc":"_f_jsbeautify","jsbeautifyrc":"_f_jsbeautify",".jsbeautify":"_f_jsbeautify","jsbeautify":"_f_jsbeautify","jsconfig.json":"_f_light_jsconfig",".jshintrc":"_f_jshint",".jshintignore":"_f_jshint","karma.conf.js":"_f_karma","karma.conf.coffee":"_f_karma","karma.conf.ts":"_f_karma",".kitchen.yml":"_f_kitchenci",".kiteignore":"_f_light_kite","layout.html":"_f_layout","layout.htm":"_f_layout","lerna.json":"_f_light_lerna","license":"_f_license","licence":"_f_license","license.md":"_f_license","licence.md":"_f_license","license.txt":"_f_license","licence.txt":"_f_license","include.xml":"_f_lime","manifest":"_f_manifest","manifest.bak":"_f_manifest_bak","manifest.skip":"_f_manifest_skip",".markdownlint.json":"_f_markdownlint",".hgignore":"_f_mercurial",".mtn-ignore":"_f_monotone",".node-version":"_f_node",".nvmrc":"_f_node",".npmignore":"_f_npm",".npmrc":"_f_npm","package.json":"_f_npm","package-lock.json":"_f_npm",".nycrc":"_f_nyc",".merlin":"_f_ocaml","paket.dependencies":"_f_paket","paket.lock":"_f_paket","paket.references":"_f_paket","paket.template":"_f_paket","paket.local":"_f_paket","phpunit":"_f_phpunit","phpunit.xml":"_f_phpunit","phpunit.xml.dist":"_f_phpunit",".postcssrc.js":"_f_postcss","postcss.config.js":"_f_postcss",".prettierrc":"_f_light_prettier","prettier.config.js":"_f_light_prettier","procfile":"_f_procfile","protractor.conf.js":"_f_protractor","protractor.conf.coffee":"_f_protractor","protractor.conf.ts":"_f_protractor",".jade-lintrc":"_f_pug",".pug-lintrc":"_f_pug",".jade-lint.json":"_f_pug",".pug-lintrc.js":"_f_pug",".pug-lintrc.json":"_f_pug","rakefile":"_f_rake","robots.txt":"_f_robots","rollup.config.js":"_f_rollup","rollup.config.ts":"_f_rollup",".rspec":"_f_rspec",".sequelizerc":"_f_sequelize",".snyk":"_f_snyk",".stylelintrc":"_f_light_stylelint","stylelint.config.js":"_f_light_stylelint",".stylelintignore":"_f_light_stylelint",".svnignore":"_f_subversion","package.pins":"_f_swift",".tfignore":"_f_tfs",".travis.yml":"_f_travis","tsconfig.json":"_f_tsconfig","tsconfig.app.json":"_f_tsconfig","tsconfig.spec.json":"_f_tsconfig","tsconfig.e2e.json":"_f_tsconfig","tslint.json":"_f_tslint","vagrantfile":"_f_vagrant",".vimrc":"_f_vim",".gvimrc":"_f_vim","vscodeignore.json":"_f_vscode","launch.json":"_f_vscode","tasks.json":"_f_vscode",".vscodeignore":"_f_vscode",".watchmanconfig":"_f_watchmanconfig","webpack.base.conf.coffee":"_f_webpack","webpack.base.conf.js":"_f_webpack","webpack.base.conf.ts":"_f_webpack","webpack.common.coffee":"_f_webpack","webpack.common.js":"_f_webpack","webpack.common.ts":"_f_webpack","webpack.config.coffee":"_f_webpack","webpack.config.base.coffee":"_f_webpack","webpack.config.common.coffee":"_f_webpack","webpack.config.dev.coffee":"_f_webpack","webpack.config.development.coffee":"_f_webpack","webpack.config.staging.coffee":"_f_webpack","webpack.config.test.coffee":"_f_webpack","webpack.config.prod.coffee":"_f_webpack","webpack.config.production.coffee":"_f_webpack","webpack.config.js":"_f_webpack","webpack.config.base.js":"_f_webpack","webpack.config.common.js":"_f_webpack","webpack.config.dev.js":"_f_webpack","webpack.config.development.js":"_f_webpack","webpack.config.staging.js":"_f_webpack","webpack.config.test.js":"_f_webpack","webpack.config.prod.js":"_f_webpack","webpack.config.production.js":"_f_webpack","webpack.config.ts":"_f_webpack","webpack.config.base.ts":"_f_webpack","webpack.config.common.ts":"_f_webpack","webpack.config.dev.ts":"_f_webpack","webpack.config.development.ts":"_f_webpack","webpack.config.staging.ts":"_f_webpack","webpack.config.test.ts":"_f_webpack","webpack.config.prod.ts":"_f_webpack","webpack.config.production.ts":"_f_webpack","webpack.config.babel.js":"_f_webpack","webpack.config.base.babel.js":"_f_webpack","webpack.config.common.babel.js":"_f_webpack","webpack.config.dev.babel.js":"_f_webpack","webpack.config.development.babel.js":"_f_webpack","webpack.config.staging.babel.js":"_f_webpack","webpack.config.test.babel.js":"_f_webpack","webpack.config.prod.babel.js":"_f_webpack","webpack.config.production.babel.js":"_f_webpack","webpack.dev.coffee":"_f_webpack","webpack.dev.js":"_f_webpack","webpack.dev.ts":"_f_webpack","webpack.dev.conf.coffee":"_f_webpack","webpack.dev.conf.js":"_f_webpack","webpack.dev.conf.ts":"_f_webpack","webpack.prod.coffee":"_f_webpack","webpack.prod.js":"_f_webpack","webpack.prod.ts":"_f_webpack","webpack.prod.conf.coffee":"_f_webpack","webpack.prod.conf.js":"_f_webpack","webpack.prod.conf.ts":"_f_webpack","webpack.mix.coffee":"_f_webpack","webpack.mix.js":"_f_webpack","webpack.mix.ts":"_f_webpack","webpack.test.conf.coffee":"_f_webpack","webpack.test.conf.js":"_f_webpack","webpack.test.conf.ts":"_f_webpack","wercker.yml":"_f_wercker","yarn.lock":"_f_yarn",".yarnrc":"_f_yarn",".yarnclean":"_f_yarn",".yarn-integrity":"_f_yarn",".yarn-metadata.json":"_f_yarn",".yarnignore":"_f_yarn",".yo-rc.json":"_f_yeoman"}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {"al":"_f_al","ansible":"_f_ansible","g4":"_f_antlr","any":"_f_anyscript","applescript":"_f_applescript","asp":"_f_asp","au3":"_f_autoit","avcs":"_f_avro","bat":"_f_bat","blade.php":"_f_blade","bolt":"_f_bolt","c":"_f_c","cabal":"_f_cabal","cake":"_f_cake","cfc":"_f_cfc","clojure":"_f_clojure","cmake":"_f_cmake","cbl":"_f_cobol","coffee":"_f_coffeescript","cpp":"_f_cpp","cr":"_f_crystal","cs":"_f_csharp","css":"_f_css","dal":"_f_dal","dart":"_f_dartlang","diff":"_f_diff","dockerfile":"_f_docker","dox":"_f_doxygen","edge":"_f_edge","ex":"_f_elixir","elm":"_f_elm","erb":"_f_erb","erl":"_f_erlang","f":"_f_fortran","fs":"_f_fsharp","gspec":"_f_galen","glsl":"_f_glsl","go":"_f_go","gql":"_f_graphql","groovy":"_f_groovy","haml":"_f_haml","hbs":"_f_handlebars","prg":"_f_harbour","hs":"_f_haskell","haxe":"_f_haxe","hlsl":"_f_hlsl","html":"_f_html","http":"_f_http","ini":"_f_light_ini","tex":"_f_light_tex","java":"_f_java","js":"_f_light_js","jsx":"_f_reactjs","jinja":"_f_jinja","json":"_f_light_json","jl":"_f_julia","ks":"_f_kos","kt":"_f_kotlin","lisp":"_f_lisp","less":"_f_less","lua":"_f_lua","mk":"_f_makefile","md":"_f_markdown","marko":"_f_marko","mat":"_f_matlab","mjml":"_f_mjml","mson":"_f_mson","nim":"_f_nim","nsi":"_f_nsi","nunjucks":"_f_nunjucks","ml":"_f_ocaml","pas":"_f_delphi","pl":"_f_perl","pl6":"_f_perl6","php":"_f_php","txt":"_f_text","ddl":"_f_plsql","polymer":"_f_polymer","pcss":"_f_postcss","ps1":"_f_powershell","pro":"_f_prolog","properties":"_f_light_config","pp":"_f_puppet","purs":"_f_light_purescript","py":"_f_python","qvs":"_f_qlikview","r":"_f_r","rkt":"_f_racket","cshtml":"_f_razor","raml":"_f_raml","re":"_f_reason","rst":"_f_rest","tag":"_f_riot","robot":"_f_robotframework","rb":"_f_ruby","rs":"_f_rust","sbt":"_f_sbt","scala":"_f_scala","scss":"_f_scss","shader":"_f_light_shaderlab","sh":"_f_shell","slim":"_f_slim","tpl":"_f_smarty","sol":"_f_light_solidity","sqf":"_f_sqf","sql":"_f_sql","styl":"_f_stylus","swagger":"_f_swagger","swift":"_f_swift","tf":"_f_terraform","sty":"_f_light_tex","textile":"_f_textile","toml":"_f_toml","twig":"_f_twig","ts":"_f_typescript","tsx":"_f_reactts","vb":"_f_vb","cls":"_f_vba","wsf":"_f_script","vm":"_f_velocity","vhdl":"_f_vhdl","vim":"_f_vim","volt":"_f_volt","vue":"_f_vue","wl":"_f_wolfram","xml":"_f_xml","xsl":"_f_xsl","yaml":"_f_light_yaml","yang":"_f_yang"}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {"_file":"default_file.svg","_folder":"default_folder.svg","_folder_open":"default_folder_opened.svg","_root_folder":"default_root_folder.svg","_root_folder_open":"default_root_folder_opened.svg","_file_light":"","_folder_light":"","_folder_light_open":"","_root_folder_light":"","_root_folder_light_open":"","_fd_aurelia":"folder_type_aurelia.svg","_fd_aurelia_open":"folder_type_aurelia_opened.svg","_fd_aws":"folder_type_aws.svg","_fd_aws_open":"folder_type_aws_opened.svg","_fd_binary":"folder_type_binary.svg","_fd_binary_open":"folder_type_binary_opened.svg","_fd_bower":"folder_type_bower.svg","_fd_bower_open":"folder_type_bower_opened.svg","_fd_cake":"folder_type_cake.svg","_fd_cake_open":"folder_type_cake_opened.svg","_fd_chef":"folder_type_chef.svg","_fd_chef_open":"folder_type_chef_opened.svg","_fd_circleci":"folder_type_circleci.svg","_fd_circleci_open":"folder_type_circleci_opened.svg","_fd_client":"folder_type_client.svg","_fd_client_open":"folder_type_client_opened.svg","_fd_composer":"folder_type_composer.svg","_fd_composer_open":"folder_type_composer_opened.svg","_fd_config":"folder_type_config.svg","_fd_config_open":"folder_type_config_opened.svg","_fd_css":"folder_type_css.svg","_fd_css_open":"folder_type_css_opened.svg","_fd_debian":"folder_type_debian.svg","_fd_debian_open":"folder_type_debian_opened.svg","_fd_dist":"folder_type_dist.svg","_fd_dist_open":"folder_type_dist_opened.svg","_fd_docker":"folder_type_docker.svg","_fd_docker_open":"folder_type_docker_opened.svg","_fd_docs":"folder_type_docs.svg","_fd_docs_open":"folder_type_docs_opened.svg","_fd_elasticbeanstalk":"folder_type_elasticbeanstalk.svg","_fd_elasticbeanstalk_open":"folder_type_elasticbeanstalk_opened.svg","_fd_flow":"folder_type_flow.svg","_fd_flow_open":"folder_type_flow_opened.svg","_fd_fonts":"folder_type_fonts.svg","_fd_fonts_open":"folder_type_fonts_opened.svg","_fd_light_fonts":"folder_type_light_fonts.svg","_fd_light_fonts_open":"folder_type_light_fonts_opened.svg","_fd_gcp":"folder_type_gcp.svg","_fd_gcp_open":"folder_type_gcp_opened.svg","_fd_git":"folder_type_git.svg","_fd_git_open":"folder_type_git_opened.svg","_fd_github":"folder_type_github.svg","_fd_github_open":"folder_type_github_opened.svg","_fd_gitlab":"folder_type_gitlab.svg","_fd_gitlab_open":"folder_type_gitlab_opened.svg","_fd_haxelib":"folder_type_haxelib.svg","_fd_haxelib_open":"folder_type_haxelib_opened.svg","_fd_idea":"folder_type_idea.svg","_fd_idea_open":"folder_type_idea_opened.svg","_fd_images":"folder_type_images.svg","_fd_images_open":"folder_type_images_opened.svg","_fd_include":"folder_type_include.svg","_fd_include_open":"folder_type_include_opened.svg","_fd_js":"folder_type_js.svg","_fd_js_open":"folder_type_js_opened.svg","_fd_kubernetes":"folder_type_kubernetes.svg","_fd_kubernetes_open":"folder_type_kubernetes_opened.svg","_fd_less":"folder_type_less.svg","_fd_less_open":"folder_type_less_opened.svg","_fd_library":"folder_type_library.svg","_fd_library_open":"folder_type_library_opened.svg","_fd_locale":"folder_type_locale.svg","_fd_locale_open":"folder_type_locale_opened.svg","_fd_log":"folder_type_log.svg","_fd_log_open":"folder_type_log_opened.svg","_fd_meteor":"folder_type_meteor.svg","_fd_meteor_open":"folder_type_meteor_opened.svg","_fd_light_meteor":"folder_type_light_meteor.svg","_fd_light_meteor_open":"folder_type_light_meteor_opened.svg","_fd_mjml":"folder_type_mjml.svg","_fd_mjml_open":"folder_type_mjml_opened.svg","_fd_mongodb":"folder_type_mongodb.svg","_fd_mongodb_open":"folder_type_mongodb_opened.svg","_fd_node":"folder_type_node.svg","_fd_node_open":"folder_type_node_opened.svg","_fd_light_node":"folder_type_light_node.svg","_fd_light_node_open":"folder_type_light_node_opened.svg","_fd_nuget":"folder_type_nuget.svg","_fd_nuget_open":"folder_type_nuget_opened.svg","_fd_package":"folder_type_package.svg","_fd_package_open":"folder_type_package_opened.svg","_fd_paket":"folder_type_paket.svg","_fd_paket_open":"folder_type_paket_opened.svg","_fd_php":"folder_type_php.svg","_fd_php_open":"folder_type_php_opened.svg","_fd_plugin":"folder_type_plugin.svg","_fd_plugin_open":"folder_type_plugin_opened.svg","_fd_private":"folder_type_private.svg","_fd_private_open":"folder_type_private_opened.svg","_fd_public":"folder_type_public.svg","_fd_public_open":"folder_type_public_opened.svg","_fd_ravendb":"folder_type_ravendb.svg","_fd_ravendb_open":"folder_type_ravendb_opened.svg","_fd_redis":"folder_type_redis.svg","_fd_redis_open":"folder_type_redis_opened.svg","_fd_sass":"folder_type_sass.svg","_fd_sass_open":"folder_type_sass_opened.svg","_fd_light_sass":"folder_type_light_sass.svg","_fd_light_sass_open":"folder_type_light_sass_opened.svg","_fd_script":"folder_type_script.svg","_fd_script_open":"folder_type_script_opened.svg","_fd_server":"folder_type_server.svg","_fd_server_open":"folder_type_server_opened.svg","_fd_src":"folder_type_src.svg","_fd_src_open":"folder_type_src_opened.svg","_fd_style":"folder_type_style.svg","_fd_style_open":"folder_type_style_opened.svg","_fd_test":"folder_type_test.svg","_fd_test_open":"folder_type_test_opened.svg","_fd_tools":"folder_type_tools.svg","_fd_tools_open":"folder_type_tools_opened.svg","_fd_typescript":"folder_type_typescript.svg","_fd_typescript_open":"folder_type_typescript_opened.svg","_fd_typings":"folder_type_typings.svg","_fd_typings_open":"folder_type_typings_opened.svg","_fd_vagrant":"folder_type_vagrant.svg","_fd_vagrant_open":"folder_type_vagrant_opened.svg","_fd_view":"folder_type_view.svg","_fd_view_open":"folder_type_view_opened.svg","_fd_vs":"folder_type_vs.svg","_fd_vs_open":"folder_type_vs_opened.svg","_fd_vscode":"folder_type_vscode.svg","_fd_vscode_open":"folder_type_vscode_opened.svg","_fd_vscode_test":"folder_type_vscode_test.svg","_fd_vscode_test_open":"folder_type_vscode_test_opened.svg","_fd_webpack":"folder_type_webpack.svg","_fd_webpack_open":"folder_type_webpack_opened.svg","_fd_www":"folder_type_www.svg","_fd_www_open":"folder_type_www_opened.svg","_f_access":"file_type_access.svg","_f_actionscript":"file_type_actionscript.svg","_f_ai":"file_type_ai.svg","_f_al":"file_type_al.svg","_f_angular":"file_type_angular.svg","_f_ansible":"file_type_ansible.svg","_f_antlr":"file_type_antlr.svg","_f_anyscript":"file_type_anyscript.svg","_f_apache":"file_type_apache.svg","_f_apib":"file_type_apib.svg","_f_applescript":"file_type_applescript.svg","_f_appveyor":"file_type_appveyor.svg","_f_arduino":"file_type_arduino.svg","_f_asp":"file_type_asp.svg","_f_aspx":"file_type_aspx.svg","_f_assembly":"file_type_assembly.svg","_f_audio":"file_type_audio.svg","_f_aurelia":"file_type_aurelia.svg","_f_autohotkey":"file_type_autohotkey.svg","_f_autoit":"file_type_autoit.svg","_f_avro":"file_type_avro.svg","_f_aws":"file_type_aws.svg","_f_babel":"file_type_babel.svg","_f_light_babel":"file_type_light_babel.svg","_f_bat":"file_type_bat.svg","_f_bazaar":"file_type_bazaar.svg","_f_binary":"file_type_binary.svg","_f_bithound":"file_type_bithound.svg","_f_blade":"file_type_blade.svg","_f_bolt":"file_type_bolt.svg","_f_bower":"file_type_bower.svg","_f_buckbuild":"file_type_buckbuild.svg","_f_bundler":"file_type_bundler.svg","_f_c":"file_type_c.svg","_f_c_al":"file_type_c_al.svg","_f_cabal":"file_type_cabal.svg","_f_cake":"file_type_cake.svg","_f_cakephp":"file_type_cakephp.svg","_f_cert":"file_type_cert.svg","_f_cf":"file_type_cf.svg","_f_cfc":"file_type_cfc.svg","_f_cfm":"file_type_cfm.svg","_f_cheader":"file_type_cheader.svg","_f_chef":"file_type_chef.svg","_f_circleci":"file_type_circleci.svg","_f_light_circleci":"file_type_light_circleci.svg","_f_class":"file_type_class.svg","_f_clojure":"file_type_clojure.svg","_f_cloudfoundry":"file_type_cloudfoundry.svg","_f_light_cloudfoundry":"file_type_light_cloudfoundry.svg","_f_cmake":"file_type_cmake.svg","_f_cobol":"file_type_cobol.svg","_f_codeclimate":"file_type_codeclimate.svg","_f_light_codeclimate":"file_type_light_codeclimate.svg","_f_codecov":"file_type_codecov.svg","_f_codekit":"file_type_codekit.svg","_f_coffeelint":"file_type_coffeelint.svg","_f_coffeescript":"file_type_coffeescript.svg","_f_compass":"file_type_compass.svg","_f_composer":"file_type_composer.svg","_f_config":"file_type_config.svg","_f_light_config":"file_type_light_config.svg","_f_coveralls":"file_type_coveralls.svg","_f_cpp":"file_type_cpp.svg","_f_cppheader":"file_type_cppheader.svg","_f_crowdin":"file_type_crowdin.svg","_f_crystal":"file_type_crystal.svg","_f_csharp":"file_type_csharp.svg","_f_csproj":"file_type_csproj.svg","_f_css":"file_type_css.svg","_f_csslint":"file_type_csslint.svg","_f_cssmap":"file_type_cssmap.svg","_f_cucumber":"file_type_cucumber.svg","_f_cvs":"file_type_cvs.svg","_f_dal":"file_type_dal.svg","_f_darcs":"file_type_darcs.svg","_f_dartlang":"file_type_dartlang.svg","_f_db":"file_type_db.svg","_f_light_db":"file_type_light_db.svg","_f_delphi":"file_type_delphi.svg","_f_dependencies":"file_type_dependencies.svg","_f_diff":"file_type_diff.svg","_f_dlang":"file_type_dlang.svg","_f_docker":"file_type_docker.svg","_f_docpad":"file_type_docpad.svg","_f_light_docpad":"file_type_light_docpad.svg","_f_doxygen":"file_type_doxygen.svg","_f_drone":"file_type_drone.svg","_f_light_drone":"file_type_light_drone.svg","_f_dylan":"file_type_dylan.svg","_f_edge":"file_type_edge.svg","_f_editorconfig":"file_type_editorconfig.svg","_f_ejs":"file_type_ejs.svg","_f_elasticbeanstalk":"file_type_elasticbeanstalk.svg","_f_elixir":"file_type_elixir.svg","_f_elm":"file_type_elm.svg","_f_emacs":"file_type_emacs.svg","_f_ember":"file_type_ember.svg","_f_ensime":"file_type_ensime.svg","_f_eps":"file_type_eps.svg","_f_erb":"file_type_erb.svg","_f_erlang":"file_type_erlang.svg","_f_eslint":"file_type_eslint.svg","_f_excel":"file_type_excel.svg","_f_favicon":"file_type_favicon.svg","_f_fbx":"file_type_fbx.svg","_f_firebase":"file_type_firebase.svg","_f_flash":"file_type_flash.svg","_f_floobits":"file_type_floobits.svg","_f_flow":"file_type_flow.svg","_f_font":"file_type_font.svg","_f_light_font":"file_type_light_font.svg","_f_fortran":"file_type_fortran.svg","_f_fossil":"file_type_fossil.svg","_f_freemarker":"file_type_freemarker.svg","_f_fsharp":"file_type_fsharp.svg","_f_fsproj":"file_type_fsproj.svg","_f_fusebox":"file_type_fusebox.svg","_f_galen":"file_type_galen.svg","_f_gamemaker":"file_type_gamemaker.svg","_f_gamemaker2":"file_type_gamemaker2.svg","_f_light_gamemaker2":"file_type_light_gamemaker2.svg","_f_gamemaker81":"file_type_gamemaker81.svg","_f_git":"file_type_git.svg","_f_gitlab":"file_type_gitlab.svg","_f_glsl":"file_type_glsl.svg","_f_go":"file_type_go.svg","_f_godot":"file_type_godot.svg","_f_gradle":"file_type_gradle.svg","_f_graphql":"file_type_graphql.svg","_f_graphviz":"file_type_graphviz.svg","_f_groovy":"file_type_groovy.svg","_f_grunt":"file_type_grunt.svg","_f_gulp":"file_type_gulp.svg","_f_haml":"file_type_haml.svg","_f_handlebars":"file_type_handlebars.svg","_f_harbour":"file_type_harbour.svg","_f_haskell":"file_type_haskell.svg","_f_haxe":"file_type_haxe.svg","_f_haxecheckstyle":"file_type_haxecheckstyle.svg","_f_haxedevelop":"file_type_haxedevelop.svg","_f_helix":"file_type_helix.svg","_f_hlsl":"file_type_hlsl.svg","_f_html":"file_type_html.svg","_f_htmlhint":"file_type_htmlhint.svg","_f_http":"file_type_http.svg","_f_idris":"file_type_idris.svg","_f_idrisbin":"file_type_idrisbin.svg","_f_idrispkg":"file_type_idrispkg.svg","_f_image":"file_type_image.svg","_f_infopath":"file_type_infopath.svg","_f_ini":"file_type_ini.svg","_f_light_ini":"file_type_light_ini.svg","_f_ionic":"file_type_ionic.svg","_f_jar":"file_type_jar.svg","_f_java":"file_type_java.svg","_f_jbuilder":"file_type_jbuilder.svg","_f_jenkins":"file_type_jenkins.svg","_f_jest":"file_type_jest.svg","_f_jinja":"file_type_jinja.svg","_f_jpm":"file_type_jpm.svg","_f_js":"file_type_js.svg","_f_light_js":"file_type_light_js.svg","_f_jsbeautify":"file_type_jsbeautify.svg","_f_jsconfig":"file_type_jsconfig.svg","_f_light_jsconfig":"file_type_light_jsconfig.svg","_f_jshint":"file_type_jshint.svg","_f_jsmap":"file_type_jsmap.svg","_f_light_jsmap":"file_type_light_jsmap.svg","_f_json":"file_type_json.svg","_f_light_json":"file_type_light_json.svg","_f_json5":"file_type_json5.svg","_f_light_json5":"file_type_light_json5.svg","_f_jsonld":"file_type_jsonld.svg","_f_light_jsonld":"file_type_light_jsonld.svg","_f_jsp":"file_type_jsp.svg","_f_julia":"file_type_julia.svg","_f_karma":"file_type_karma.svg","_f_key":"file_type_key.svg","_f_kitchenci":"file_type_kitchenci.svg","_f_kite":"file_type_kite.svg","_f_light_kite":"file_type_light_kite.svg","_f_kos":"file_type_kos.svg","_f_kotlin":"file_type_kotlin.svg","_f_layout":"file_type_layout.svg","_f_lerna":"file_type_lerna.svg","_f_light_lerna":"file_type_light_lerna.svg","_f_less":"file_type_less.svg","_f_license":"file_type_license.svg","_f_lime":"file_type_lime.svg","_f_liquid":"file_type_liquid.svg","_f_lisp":"file_type_lisp.svg","_f_locale":"file_type_locale.svg","_f_log":"file_type_log.svg","_f_lsl":"file_type_lsl.svg","_f_lua":"file_type_lua.svg","_f_lync":"file_type_lync.svg","_f_makefile":"file_type_makefile.svg","_f_manifest":"file_type_manifest.svg","_f_manifest_bak":"file_type_manifest_bak.svg","_f_manifest_skip":"file_type_manifest_skip.svg","_f_map":"file_type_map.svg","_f_markdown":"file_type_markdown.svg","_f_markdownlint":"file_type_markdownlint.svg","_f_marko":"file_type_marko.svg","_f_markojs":"file_type_markojs.svg","_f_matlab":"file_type_matlab.png","_f_mercurial":"file_type_mercurial.svg","_f_meteor":"file_type_meteor.svg","_f_mjml":"file_type_mjml.svg","_f_monotone":"file_type_monotone.svg","_f_mson":"file_type_mson.svg","_f_mustache":"file_type_mustache.svg","_f_light_mustache":"file_type_light_mustache.svg","_f_nim":"file_type_nim.svg","_f_njsproj":"file_type_njsproj.svg","_f_node":"file_type_node.svg","_f_npm":"file_type_npm.svg","_f_nsi":"file_type_nsi.svg","_f_nuget":"file_type_nuget.svg","_f_nunjucks":"file_type_nunjucks.svg","_f_nyc":"file_type_nyc.svg","_f_objectivec":"file_type_objectivec.svg","_f_objectivecpp":"file_type_objectivecpp.svg","_f_ocaml":"file_type_ocaml.svg","_f_onenote":"file_type_onenote.svg","_f_openHAB":"file_type_openHAB.svg","_f_opencl":"file_type_opencl.svg","_f_org":"file_type_org.svg","_f_outlook":"file_type_outlook.svg","_f_package":"file_type_package.svg","_f_paket":"file_type_paket.svg","_f_patch":"file_type_patch.svg","_f_pcl":"file_type_pcl.svg","_f_light_pcl":"file_type_light_pcl.svg","_f_pdf":"file_type_pdf.svg","_f_perl":"file_type_perl.svg","_f_perl6":"file_type_perl6.svg","_f_photoshop":"file_type_photoshop.svg","_f_php":"file_type_php.svg","_f_phpunit":"file_type_phpunit.svg","_f_plantuml":"file_type_plantuml.svg","_f_plsql":"file_type_plsql.svg","_f_plsql_package":"file_type_plsql_package.svg","_f_plsql_package_body":"file_type_plsql_package_body.svg","_f_plsql_package_header":"file_type_plsql_package_header.svg","_f_plsql_package_spec":"file_type_plsql_package_spec.svg","_f_poedit":"file_type_poedit.svg","_f_polymer":"file_type_polymer.svg","_f_postcss":"file_type_postcss.svg","_f_powerpoint":"file_type_powerpoint.svg","_f_powershell":"file_type_powershell.svg","_f_prettier":"file_type_prettier.svg","_f_light_prettier":"file_type_light_prettier.svg","_f_processinglang":"file_type_processinglang.svg","_f_procfile":"file_type_procfile.svg","_f_progress":"file_type_progress.svg","_f_prolog":"file_type_prolog.svg","_f_protobuf":"file_type_protobuf.svg","_f_protractor":"file_type_protractor.svg","_f_publisher":"file_type_publisher.svg","_f_pug":"file_type_pug.svg","_f_puppet":"file_type_puppet.svg","_f_purescript":"file_type_purescript.svg","_f_light_purescript":"file_type_light_purescript.svg","_f_python":"file_type_python.svg","_f_q":"file_type_q.svg","_f_qlikview":"file_type_qlikview.svg","_f_r":"file_type_r.svg","_f_racket":"file_type_racket.svg","_f_rails":"file_type_rails.svg","_f_rake":"file_type_rake.svg","_f_raml":"file_type_raml.svg","_f_razor":"file_type_razor.svg","_f_reactjs":"file_type_reactjs.svg","_f_reacttemplate":"file_type_reacttemplate.svg","_f_reactts":"file_type_reactts.svg","_f_reason":"file_type_reason.svg","_f_registry":"file_type_registry.svg","_f_rest":"file_type_rest.svg","_f_riot":"file_type_riot.svg","_f_robotframework":"file_type_robotframework.svg","_f_robots":"file_type_robots.svg","_f_rollup":"file_type_rollup.svg","_f_rspec":"file_type_rspec.svg","_f_ruby":"file_type_ruby.svg","_f_rust":"file_type_rust.svg","_f_saltstack":"file_type_saltstack.svg","_f_sass":"file_type_sass.svg","_f_sbt":"file_type_sbt.svg","_f_scala":"file_type_scala.svg","_f_script":"file_type_script.svg","_f_scss":"file_type_scss.svg","_f_sdlang":"file_type_sdlang.svg","_f_sequelize":"file_type_sequelize.svg","_f_shaderlab":"file_type_shaderlab.svg","_f_light_shaderlab":"file_type_light_shaderlab.svg","_f_shell":"file_type_shell.svg","_f_sketch":"file_type_sketch.svg","_f_slim":"file_type_slim.svg","_f_sln":"file_type_sln.svg","_f_smarty":"file_type_smarty.svg","_f_snyk":"file_type_snyk.svg","_f_solidity":"file_type_solidity.svg","_f_light_solidity":"file_type_light_solidity.svg","_f_source":"file_type_source.svg","_f_sqf":"file_type_sqf.svg","_f_sql":"file_type_sql.svg","_f_sqlite":"file_type_sqlite.svg","_f_sss":"file_type_sss.svg","_f_storyboard":"file_type_storyboard.svg","_f_storybook":"file_type_storybook.svg","_f_style":"file_type_style.svg","_f_stylelint":"file_type_stylelint.svg","_f_light_stylelint":"file_type_light_stylelint.svg","_f_stylus":"file_type_stylus.svg","_f_subversion":"file_type_subversion.svg","_f_svg":"file_type_svg.svg","_f_swagger":"file_type_swagger.svg","_f_swift":"file_type_swift.svg","_f_tcl":"file_type_tcl.svg","_f_terraform":"file_type_terraform.svg","_f_test":"file_type_test.svg","_f_testjs":"file_type_testjs.svg","_f_light_testjs":"file_type_light_testjs.svg","_f_testts":"file_type_testts.svg","_f_tex":"file_type_tex.svg","_f_light_tex":"file_type_light_tex.svg","_f_text":"file_type_text.svg","_f_textile":"file_type_textile.svg","_f_tfs":"file_type_tfs.svg","_f_todo":"file_type_todo.svg","_f_light_todo":"file_type_light_todo.svg","_f_toml":"file_type_toml.svg","_f_travis":"file_type_travis.svg","_f_tsconfig":"file_type_tsconfig.svg","_f_tslint":"file_type_tslint.svg","_f_twig":"file_type_twig.svg","_f_typescript":"file_type_typescript.svg","_f_typescriptdef":"file_type_typescriptdef.svg","_f_vagrant":"file_type_vagrant.svg","_f_vash":"file_type_vash.svg","_f_light_vash":"file_type_light_vash.svg","_f_vb":"file_type_vb.svg","_f_vba":"file_type_vba.svg","_f_vbhtml":"file_type_vbhtml.svg","_f_vbproj":"file_type_vbproj.svg","_f_vcxproj":"file_type_vcxproj.svg","_f_velocity":"file_type_velocity.svg","_f_vhdl":"file_type_vhdl.svg","_f_video":"file_type_video.svg","_f_view":"file_type_view.svg","_f_vim":"file_type_vim.svg","_f_volt":"file_type_volt.svg","_f_vscode":"file_type_vscode.svg","_f_vsix":"file_type_vsix.svg","_f_light_vsix":"file_type_light_vsix.svg","_f_vue":"file_type_vue.svg","_f_watchmanconfig":"file_type_watchmanconfig.svg","_f_webpack":"file_type_webpack.svg","_f_wercker":"file_type_wercker.svg","_f_wolfram":"file_type_wolfram.svg","_f_word":"file_type_word.svg","_f_wxml":"file_type_wxml.svg","_f_wxss":"file_type_wxss.svg","_f_xcode":"file_type_xcode.svg","_f_xib":"file_type_xib.svg","_f_xliff":"file_type_xliff.svg","_f_xml":"file_type_xml.svg","_f_xsl":"file_type_xsl.svg","_f_yaml":"file_type_yaml.svg","_f_light_yaml":"file_type_light_yaml.svg","_f_yang":"file_type_yang.svg","_f_yarn":"file_type_yarn.svg","_f_yeoman":"file_type_yeoman.svg","_f_zip":"file_type_zip.svg"}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// COPIED FROM https://github.com/sindresorhus/refined-github/blob/master/src/libs/page-detect.js
Object.defineProperty(exports, "__esModule", { value: true });
var select = __webpack_require__(8);
exports.isGist = function () {
    return location.hostname.startsWith('gist.') || location.pathname.startsWith('gist/');
};
exports.isDashboard = function () {
    return location.pathname === '/' || /^(\/orgs\/[^/]+)?\/dashboard/.test(location.pathname);
};
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
exports.isPRCommit = function () {
    return exports.isRepo() && /^\/pull\/\d+\/commits\/[0-9a-f]{5,40}/.test(exports.getRepoPath());
};
exports.isHistoryForFile = function () {
    return exports.isRepo() && /^\/commits\/[0-9a-f]{5,40}\/.+/.test(exports.getRepoPath());
};
exports.isMilestoneList = function () { return exports.isRepo() && /^\/milestones\/?$/.test(exports.getRepoPath()); };
exports.isMilestone = function () { return exports.isRepo() && /^\/milestone\/\d+/.test(exports.getRepoPath()); };
exports.isLabelList = function () { return exports.isRepo() && /^\/labels\/?(((?=\?).*)|$)/.test(exports.getRepoPath()); };
exports.isLabel = function () { return exports.isRepo() && /^\/labels\/\w+/.test(exports.getRepoPath()); };
exports.isCommitList = function () { return exports.isRepo() && /^\/commits\//.test(exports.getRepoPath()); };
exports.isSingleCommit = function () { return exports.isRepo() && /^\/commit\/[0-9a-f]{5,40}/.test(exports.getRepoPath()); };
exports.isCommit = function () {
    return exports.isSingleCommit() || exports.isPRCommit() || (exports.isPRFiles() && select.exists('.full-commit'));
};
exports.isCompare = function () { return exports.isRepo() && /^\/compare/.test(exports.getRepoPath()); };
exports.isQuickPR = function () { return exports.isCompare() && /[?&]quick_pull=1(&|$)/.test(location.search); };
exports.hasCode = function () { return exports.isRepo() && select.exists('.highlight'); };
exports.hasDiff = function () {
    return exports.isRepo() &&
        (exports.isSingleCommit() ||
            exports.isPRCommit() ||
            exports.isPRFiles() ||
            exports.isCompare() ||
            (exports.isPR() && select.exists('.diff-table')));
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
/* 8 */
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