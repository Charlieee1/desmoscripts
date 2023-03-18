// ==UserScript==
// @name         Keyboard input for Desmos
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  TamperMonkey userscript for listening to keyboard inputs in Desmos. 
// @author       Charlieee1
// @match        https://www.desmos.com/calculator*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=desmos.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    console.log("Listening for keyboard inputs!");
	window.addEventListener('keydown', function(e) {
		const exp = Calc.getExpressions().find(function(exp) {return exp.latex && exp.latex.includes('K_{' + e.key + '}');});
		if (exp) {
			Calc.setExpression({
				id: exp.id,
				latex: 'K_{' + e.key + '}=1'
			});
		}
	});

	window.addEventListener('keyup', function(e) {
		const exp = Calc.getExpressions().find(function(exp) {return exp.latex && exp.latex.includes('K_{' + e.key + '}');});
		if (exp) {
			Calc.setExpression({
				id: exp.id,
				latex: 'K_{' + e.key + '}=0'
			});
		}
	});
})();
