// ==UserScript==
// @name         AutoTrimps-Aer
// @version      .999a-Aer
// @namespace    https://github.com/aeriousOH/AutoTrimps
// @updateURL    https://github.com/aeriousOH/AutoTrimps/.user.js
// @description  Automate all the trimps!
// @author       zininzinin, spindrjr, Ishkaru, genBTC, Zeker0, Aerious
// @include      *trimps.github.io*
// @include      *kongregate.com/games/GreenSatellite/trimps
// @connect      *github.com/aeriousOH/AutoTrimps/*
// @connect      *trimps.github.io*
// @connect      self
// @grant        none
// ==/UserScript==

var script = document.createElement('script');
script.id = 'AutoTrimps-Aer';
//This can be edited to point to your own Github Repository URL.
script.src = 'https://github.com/aeriousOH/AutoTrimps/AutoTrimps2.js';
//script.setAttribute('crossorigin',"use-credentials");
script.setAttribute('crossorigin',"anonymous");
document.head.appendChild(script);
