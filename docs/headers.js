// ==UserScript==
// @name         U校园网课助手【全网唯一免费/最全u校园题库】
// @namespace    http://tampermonkey.net/
// @description  显示U校园题目答案；自动答题；不支持班级测试、单元测试；刷时长；开放自定义参数
// @version      1.2.0
// @author       rui & dan
// @license      GPL-3.0
// @compatible   Chrome
// @run-at       document-end
// @match        *://ucontent.unipus.cn/_pc_default/pc.html?*
// @match        *://ucontent.unipus.cn/_utalk_default/pc.html?*
// @match        *://uexercise.unipus.cn/uexercise*
// @match        *://u.unipus.cn/user/student/homework*
// @match        *://sso.unipus.cn/sso/login*
// @match        *://u.unipus.cn/*
// @match        *://ucamapi.unipus.cn/*
// @connect      localhost
// @connect      mz.3ds2.top
// @connect      47.97.90.127
// @connect      u.unipus.cn
// @connect      ucamapi.unipus.cn
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @require      https://cdn.jsdelivr.net/npm/vue/dist/vue.js
// @require      https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js
// ==/UserScript==

