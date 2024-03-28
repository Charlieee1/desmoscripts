// ==UserScript==
// @name         Full keyboard input for Desmos
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  TamperMonkey userscript for listening to all keyboard inputs in Desmos.
// @author       Charlieee1
// @match        https://www.desmos.com/calculator*
// @match        https://www.desmos.com/geometry*
// @match        https://www.desmos.com/3d*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=desmos.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function getKeysPressed(exp) {
        let list = exp.latex.split("=")[1].slice(6, -7).split(",");
        if (list[0] == "") {
            return [];
        }
        return list.map(Number);
    }
    function setKeysPressed(exp, keyCodes) {
        Calc.setExpression({
            id: exp.id,
            latex: "K_{eys}=\\left[" + keyCodes.toString() + "\\right]"
        });
    }

	window.addEventListener('keydown', function(e) {
		const exp = Calc.getExpressions().find(function(exp) {return exp.latex && exp.latex.startsWith('K_{eys}=\\left[');});
		if (exp) {
            let keyCodes = getKeysPressed(exp);
            if (!keyCodes.includes(e.keyCode)) {
                keyCodes.push(e.keyCode);
            }
            setKeysPressed(exp, keyCodes);
		}
	});

	window.addEventListener('keyup', function(e) {
		const exp = Calc.getExpressions().find(function(exp) {return exp.latex && exp.latex.startsWith('K_{eys}=\\left[');});
		if (exp) {
            let keyCodes = getKeysPressed(exp);
            if (keyCodes.includes(e.keyCode)) {
                keyCodes.splice(keyCodes.indexOf(e.keyCode), 1); // https://www.geeksforgeeks.org/remove-elements-from-a-javascript-array/#
                setKeysPressed(exp, keyCodes);
            }
		}
	});
    console.log("Listening for all keyboard inputs!");
})();
