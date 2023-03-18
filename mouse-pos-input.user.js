// ==UserScript==
// @name         Mouse position input for Desmos
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  TamperMonkey userscript for detecting the position of mouse cursor on graph.
// @author       Charlieee1
// @match        https://www.desmos.com/calculator*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=desmos.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.setTimeout(function() {
        window.setTimeout(function() {
            var grapher = document.getElementsByClassName("dcg-grapher")[0];
            grapher.addEventListener("mousemove", function(event) {
                var grapher = document.getElementsByClassName("dcg-grapher")[0];
                var rect = grapher.getBoundingClientRect();
                var x = (event.clientX - rect.left) / rect.width * 2 - 1;
                var y = -(event.clientY - rect.top) / rect.height * 2 + 1;
                let exp = Calc.getExpressions().find(function(exp) {return exp.latex && exp.latex.includes('M_{X}');});
                if (exp) {
                    Calc.setExpression({
                        id: exp.id,
                        latex: 'M_{X}=' + x
                    });
                }
                exp = Calc.getExpressions().find(function(exp) {return exp.latex && exp.latex.includes('M_{Y}');});
                if (exp) {
                    Calc.setExpression({
                        id: exp.id,
                        latex: 'M_{Y}=' + y
                    });
                }
                // console.log("Mouse position relative to grapher element: (" + x + ", " + y + ")");
            });
            console.log("Listening for mouse movements!");
        }, 2000);
    }, 0);
})();
