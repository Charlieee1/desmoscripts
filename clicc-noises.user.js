// ==UserScript==
// @name         Clicc noises
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  a script to make clicc noises every time you type something
// @author       ronwnor
// @match        https://www.desmos.com/calculator*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=desmos.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
	  let ctx = new AudioContext(), buf;

    fetch("https://gist.githubusercontent.com/ronwnor/8d6de91e461c6182ee11c2f7035a7659/raw/0f6d9a6413210ad3131fad5be4f7099d28b439fe/clicc.ogg")
        .then(res => res.arrayBuffer())
        .then(arr => ctx.decodeAudioData(arr))
        .then(dec => buf = dec);
    
    onkeydown = (e) => {
        with(ctx.createBufferSource()){
            buffer = buf;
            connect(ctx.destination);
            start();
        }
    }
})();
