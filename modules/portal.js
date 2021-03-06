MODULES["portal"] = {};
MODULES["portal"].timeout = 5000;
MODULES["portal"].bufferExceedFactor = 5;
var portalzone = getPageSetting('CustomAutoPortal');
var zonePostpone = 0;

function autoPortal() {
    if (!game.global.portalActive) return;
    switch (autoTrimpSettings.AutoPortal.selected) {
        case "Helium Per Hour":
            var OKtoPortal = false;
            if (!game.global.runningChallengeSquared) {
                var minZone = getPageSetting('HeHrDontPortalBefore');
                game.stats.bestHeliumHourThisRun.evaluate();
                var bestHeHr = game.stats.bestHeliumHourThisRun.storedValue;
                var bestHeHrZone = game.stats.bestHeliumHourThisRun.atZone;
                var myHeliumHr = game.stats.heliumHour.value();
                var heliumHrBuffer = Math.abs(getPageSetting('HeliumHrBuffer'));
                if (!aWholeNewWorld)
                    heliumHrBuffer *= MODULES["portal"].bufferExceedFactor;
                var bufferExceeded = myHeliumHr < bestHeHr * (1 - (heliumHrBuffer / 100));
                if (bufferExceeded && game.global.world >= minZone) {
                    OKtoPortal = true;
                    if (aWholeNewWorld)
                        zonePostpone = 0;
                }
                if (heliumHrBuffer == 0 && !aWholeNewWorld)
                    OKtoPortal = false;
                if (OKtoPortal && zonePostpone == 0) {
                    zonePostpone += 1;
                    debug("My HeliumHr was: " + myHeliumHr + " & the Best HeliumHr was: " + bestHeHr + " at zone: " + bestHeHrZone, "portal");
                    cancelTooltip();
                    tooltip('confirm', null, 'update', '<b>Auto Portaling NOW!</b><p>Hit Delay Portal to WAIT 1 more zone.', 'zonePostpone+=1', '<b>NOTICE: Auto-Portaling in 5 seconds....</b>', 'Delay Portal');
                    setTimeout(cancelTooltip, MODULES["portal"].timeout);
                    setTimeout(function() {
                        if (zonePostpone >= 2)
                            return;
                        if (autoTrimpSettings.HeliumHourChallenge.selected != 'None')
                            doPortal(autoTrimpSettings.HeliumHourChallenge.selected);
                        else
                            doPortal();
                    }, MODULES["portal"].timeout + 100);
                }
            }
            break;
        case "Custom":
            var portalzone = getPageSetting('CustomAutoPortal');
            if (game.global.world > portalzone) {
                if (autoTrimpSettings.HeliumHourChallenge.selected != 'None')
                    doPortal(autoTrimpSettings.HeliumHourChallenge.selected);
                else
                    doPortal();
            }
            break;
        case "Balance":
        case "Decay":
        case "Electricity":
        case "Life":
        case "Crushed":
        case "Nom":
        case "Toxicity":
            if (getPageSetting('MaxTox'))
                settingChanged("MaxTox");
        case "Watch":
        case "Lead":
        case "Corrupted":
            if (!game.global.challengeActive) {
                doPortal(autoTrimpSettings.AutoPortal.selected);
            }
            break;
        default:
            break;
    }
}

function dailyAutoPortal() {
    if (!game.global.portalActive) return;
    if (getPageSetting('AutoPortalDaily') == 1) {
        var OKtoPortal = false;
        if (!game.global.runningChallengeSquared) {
            var minZone = getPageSetting('dHeHrDontPortalBefore');
            game.stats.bestHeliumHourThisRun.evaluate();
            var bestHeHr = game.stats.bestHeliumHourThisRun.storedValue;
            var bestHeHrZone = game.stats.bestHeliumHourThisRun.atZone;
            var myHeliumHr = game.stats.heliumHour.value();
            var heliumHrBuffer = Math.abs(getPageSetting('dHeliumHrBuffer'));
            if (!aWholeNewWorld) {
                heliumHrBuffer *= MODULES["portal"].bufferExceedFactor;
                var bufferExceeded = myHeliumHr < bestHeHr * (1 - (heliumHrBuffer / 100));
                if (bufferExceeded && game.global.world >= minZone) {
                    OKtoPortal = true;
                    if (aWholeNewWorld)
                        zonePostpone = 0;
                }
                if (heliumHrBuffer == 0 && !aWholeNewWorld)
                    OKtoPortal = false;
                if (OKtoPortal && zonePostpone == 0) {
                    zonePostpone += 1;
                    debug("My HeliumHr was: " + myHeliumHr + " & the Best HeliumHr was: " + bestHeHr + " at zone: " + bestHeHrZone, "portal");
                    cancelTooltip();
                    tooltip('confirm', null, 'update', '<b>Auto Portaling NOW!</b><p>Hit Delay Portal to WAIT 1 more zone.', 'zonePostpone+=1', '<b>NOTICE: Auto-Portaling in 5 seconds....</b>', 'Delay Portal');
                    setTimeout(cancelTooltip, MODULES["portal"].timeout);
                    setTimeout(function() {
                        if (zonePostpone >= 2)
                            return;
                        if (OKtoPortal) {
                            abandonDaily();
                            document.getElementById('finishDailyBtnContainer').style.display = 'none';
                        }
                        if (autoTrimpSettings.dHeliumHourChallenge.selected != 'None')
                            doPortal(autoTrimpSettings.dHeliumHourChallenge.selected);
                        else
                            doPortal();
                    }, MODULES["portal"].timeout + 100);
                }
            }
        }
    }
    if (getPageSetting('AutoPortalDaily') == 2) {
        var portalzone = getPageSetting('dCustomAutoPortal');
        if (game.global.world > portalzone) {
            abandonDaily();
            document.getElementById('finishDailyBtnContainer').style.display = 'none';
            if (autoTrimpSettings.dHeliumHourChallenge.selected != 'None')
                doPortal(autoTrimpSettings.dHeliumHourChallenge.selected);
            else
                doPortal();
        }
    }
}

function c2runner() {

//var badPercents = ["None"];

var c2listp={Size:{number:1,percentzone:(100*(game.c2.Size/(game.global.highestLevelCleared+1)))},Slow:{number:2,percentzone:(100*(game.c2.Slow/(game.global.highestLevelCleared+1)))},Watch:{number:3,percentzone:(100*(game.c2.Watch/(game.global.highestLevelCleared+1)))},Discipline:{number:4,percentzone:(100*(game.c2.Discipline/(game.global.highestLevelCleared+1)))},Balance:{number:5,percentzone:(100*(game.c2.Balance/(game.global.highestLevelCleared+1)))},Meditate:{number:6,percentzone:(100*(game.c2.Meditate/(game.global.highestLevelCleared+1)))},Metal:{number:7,percentzone:(100*(game.c2.Metal/(game.global.highestLevelCleared+1)))},Lead:{number:8,percentzone:(100*(game.c2.Lead/(game.global.highestLevelCleared+1)))},Nom:{number:9,percentzone:(100*(game.c2.Nom/(game.global.highestLevelCleared+1)))},Electricity:{number:10,percentzone:(100*(game.c2.Electricity/(game.global.highestLevelCleared+1)))},Toxicity:{number:11,percentzone:(100*(game.c2.Toxicity/(game.global.highestLevelCleared+1)))}};
    /*for (var what in c2listp) {
        if (c2listp[what].percentzone < 99) {
            badPercents.push(what);
        }
    }*/
    if (!game.global.portalActive) return;
    if (getPageSetting('c2runnerstart') == true && getPageSetting('c2runnerportal') > 0) {
        if ((game.global.world > getPageSetting('c2runnerportal')) || !game.global.runningChallengeSquared) {
            if (c2listp.Size.percentzone < 50) {
                toggleChallengeSquared();
                selectChallenge("Size");
                pushData();
                activateClicked();
                activatePortal();
                lastHeliumZone = 0; zonePostpone = 0;
                debug("C2 Runner: Running C2 Challenge Size");
                return;
            }
            if (c2listp.Slow.percentzone < 99) {
                toggleChallengeSquared();
                selectChallenge("Slow");
                pushData();
                activateClicked();
                activatePortal();
                lastHeliumZone = 0; zonePostpone = 0;
                debug("C2 Runner: Running C2 Challenge Slow");
                return;
            }
            if (c2listp.Watch.percentzone < 85) {
                toggleChallengeSquared();
                selectChallenge("Watch");
                pushData();
                activateClicked();
                activatePortal();
                lastHeliumZone = 0; zonePostpone = 0;
                debug("C2 Runner: Running C2 Challenge Watch");
                return;
            }
            if (c2listp.Discipline.percentzone < 85) {
                toggleChallengeSquared();
                selectChallenge("Discipline");
                pushData();
                activateClicked();
                activatePortal();
                lastHeliumZone = 0; zonePostpone = 0;
                return;
            }
            if (c2listp.Balance.percentzone < 85) {
                toggleChallengeSquared();
                selectChallenge("Balance");
                pushData();
                activateClicked();
                activatePortal();
                lastHeliumZone = 0; zonePostpone = 0;
                return;
            }
            if (c2listp.Meditate.percentzone < 85) {
                toggleChallengeSquared();
                selectChallenge("Meditate");
                pushData();
                activateClicked();
                activatePortal();
                lastHeliumZone = 0; zonePostpone = 0;
                return;
            }
            if (c2listp.Metal.percentzone < 85) {
                toggleChallengeSquared();
                selectChallenge("Metal");
                pushData();
                activateClicked();
                activatePortal();
                lastHeliumZone = 0; zonePostpone = 0;
            }
            if (c2listp.Lead.percentzone < 85) {
                toggleChallengeSquared();
                selectChallenge("Lead");
                pushData();
                activateClicked();
                activatePortal();
                lastHeliumZone = 0; zonePostpone = 0;
                return;
            }
            if (c2listp.Nom.percentzone < 85) {
                toggleChallengeSquared();
                selectChallenge("Nom");
                pushData();
                activateClicked();
                activatePortal();
                lastHeliumZone = 0; zonePostpone = 0;
                return;
            }
            if (c2listp.Electricity.percentzone < 85) {
                toggleChallengeSquared();
                selectChallenge("Electricity");
                pushData();
                activateClicked();
                activatePortal();
                lastHeliumZone = 0; zonePostpone = 0;
                return;
            }
            if (c2listp.Toxicty.percentzone < 85) {
                toggleChallengeSquared();
                selectChallenge("Toxicty");
                pushData();
                activateClicked();
                activatePortal();
                lastHeliumZone = 0; zonePostpone = 0;
                return;
            }
            if (autoTrimpSettings.HeliumHourChallenge.selected != 'None'){debug("All C2s are above thresh-hold! Portalling into filler. ");doPortal(autoTrimpSettings.HeliumHourChallenge.selected);}
            else {debug("All C2s are above thresh-hold! Portalling into filler. ");doPortal();}
        }
    }
}

function doPortal(challenge) {
    if(!game.global.portalActive) return;
    if (getPageSetting('spendmagmite')==1) autoMagmiteSpender();
    if (getPageSetting('AutoHeirloomsNew')==0);
      else if (getPageSetting('AutoHeirloomsNew')==1) autoHeirlooms();
      else if (getPageSetting('AutoHeirloomsNew')==2) autoHeirlooms2();
    if (getPageSetting('AutoUpgradeHeirlooms') && !heirloomsShown) autoNull();
    portalClicked();
    if (getPageSetting('AutoAllocatePerks')==1 && (typeof MODULES["perks"] !== 'undefined' || typeof AutoPerks !== 'undefined'))
        AutoPerks.clickAllocate();
    if (getPageSetting('AutoStartDaily')) {
        selectChallenge('Daily');
        checkCompleteDailies();
        var lastUndone = -7;
        while (++lastUndone <= 0) {
            var done = (game.global.recentDailies.indexOf(getDailyTimeString(lastUndone)) != -1);
            if (!done)
                break;
        }
        if (lastUndone == 1) { // None
            debug("All available Dailies already completed.", "portal");
            selectChallenge(challenge || 0);
        } else {
            getDailyChallenge(lastUndone);
            debug("Portaling into Daily for: " + getDailyTimeString(lastUndone, true) + " now!", "portal");
        }
    }
    else if(challenge) {
        selectChallenge(challenge);
    }
    pushData();
    activateClicked();
    activatePortal();
    lastHeliumZone = 0; zonePostpone = 0;
    MODULES.maps.enoughDamageCutoff = 4;
}

function finishChallengeSquared(){var a=getPageSetting("FinishC2");game.global.world>=a&&(abandonChallenge(),debug("Finished challenge2 because we are on zone "+game.global.world,"other","oil"))}
function findOutCurrentPortalLevel(){var a=-1,b=!1,d=getPageSetting("AutoPortal");switch(d){case"Off":break;case"Custom":"Daily"!=game.global.challengeActive&&(a=getPageSetting("CustomAutoPortal")+1),"Daily"==game.global.challengeActive&&(a=getPageSetting("Dailyportal")+1),b=!("Lead"!=getPageSetting("HeliumHourChallenge"));break;default:var e={Balance:41,Decay:56,Electricity:82,Crushed:126,Nom:146,Toxicity:166,Lead:181,Watch:181,Corrupted:191}[d];e&&(a=e);}return{level:a,lead:b}}
