// ==UserScript==
// @name         strictIntersection
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  no description provided
// @author       Naitronbomb
// @match        https://www.desmos.com/geometry*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=desmos.com
// @grant        none
// ==/UserScript==

(function() {
  let oldConf = Calc.controller.getMathquillConfig;

  Calc.controller.getMathquillConfig = (e) => {
      let conf = oldConf.call(Calc.controller, e);
      conf.autoOperatorNames += " strictintersection";
      return conf;
  }
})();
