// ==UserScript==
// @name         Anti-superscript drop out
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  quick userscript that makes it so plus and minus don't drop you out of superscripts
// @author       Naitronbomb
// @match        https://www.desmos.com/calculator*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=desmos.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
	let oldGetMathquillConfig = Calc.controller.getMathquillConfig;
	Calc.controller.getMathquillConfig = (e) => {
		let config = oldGetMathquillConfig.call(Calc.controller, e);
		config.charsThatBreakOutOfSupSub = '=<>';
		return config;
	};
	document.querySelectorAll(".dcg-math-field").forEach(field => field._mqMathFieldInstance.config(Calc.controller.getMathquillConfig({})));
})();
