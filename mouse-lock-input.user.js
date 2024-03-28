// ==UserScript==
// @name         Mouse lock for desmos
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  TamperMonkey userscript for locking position of mouse on desmos graph and updating graph expressions when mouse moves
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
    window.setTimeout(function() {
        window.setTimeout(function() {
            var grapher = document.getElementsByClassName("dcg-grapher")[0];
            var limit = 1; // Limit for the min and max for M_XDELTA and M_YDELTA

            // Pointer lock taken from https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API
            grapher.addEventListener("click", async () => {
                let expTemp = Calc.getState().expressions.list.find(function(exp) {return exp.text && exp.text == "use mouselock";});
                if (expTemp) {
                    await grapher.requestPointerLock({
                        unadjustedMovement: true,
                    });
                    setGraphPos(0, 0);
                }

                expTemp = Calc.getExpressions().find(function(exp) {return exp.latex && exp.latex.startsWith("M_{ouselockLimit}=");});
                if (expTemp) {
                    limit = Number(expTemp.latex.split("=")[1]);
                }
            });

            function setGraphPos(x, y) {
                let exp = Calc.getExpressions().find(function(exp) {return exp.latex && exp.latex.startsWith('M_{XDELTA}');});
                if (exp) {
                    Calc.setExpression({
                        id: exp.id,
                        latex: 'M_{XDELTA}=' + x
                    });
                }
                exp = Calc.getExpressions().find(function(exp) {return exp.latex && exp.latex.startsWith('M_{YDELTA}');});
                if (exp) {
                    Calc.setExpression({
                        id: exp.id,
                        latex: 'M_{YDELTA}=' + y
                    });
                }
            }

            // Some of this code is also taken from https://github.com/mdn/dom-examples/blob/main/pointer-lock/app.js
            grapher.addEventListener("mousemove", function(event) {
                var grapher = document.getElementsByClassName("dcg-grapher")[0];
                var rect = grapher.getBoundingClientRect();
                var x = 2 * (event.movementX) / rect.width;
                var y = 2 * -(event.movementY) / rect.height;
                let exp = Calc.getExpressions().find(function(exp) {return exp.latex && exp.latex.startsWith('M_{XDELTA}');});
                if (exp) {
                    Calc.setExpression({
                        id: exp.id,
                        latex: 'M_{XDELTA}=' + ((x + Number(exp.latex.split("=")[1]) + 3 * limit) % (2 * limit) - limit)
                    });
                }
                exp = Calc.getExpressions().find(function(exp) {return exp.latex && exp.latex.startsWith('M_{YDELTA}');});
                if (exp) {
                    Calc.setExpression({
                        id: exp.id,
                        latex: 'M_{YDELTA}=' + ((y + Number(exp.latex.split("=")[1]) + 3 * limit) % (2 * limit) - limit)
                    });
                }
            });

            console.log("Mouse lock loaded!");
        }, 2000);
    }, 0);
})();
