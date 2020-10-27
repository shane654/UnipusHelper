// ==UserScript==
// @name         Unipus网课助手(原U艹)
// @description  显示U校园题目答案；自动答题；不支持班级测试、单元测试；刷时长；开放自定义参数
// @version      0.0.1
// @author       SSmJaE
// @license      GPL-3.0
// @compatible   chrome
// @match        https://ucontent.unipus.cn/_pc_default/pc.html?*
// @match        https://uexercise.unipus.cn/uexercise/api/v2/enter_unit_test?exerciseId=*
// @match        https://uexercise.unipus.cn/uexercise/api/v1/enter_check_student_exam_detail?*
// @run-at       document-end
// @connect      localhost
// @connect      47.97.90.127
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @require      https://cdn.jsdelivr.net/npm/vue/dist/vue.js
// @require      https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js
// ==/UserScript==
// @require      https://cdn.jsdelivr.net/npm/crypto-js@4.0.0/index.min.js
