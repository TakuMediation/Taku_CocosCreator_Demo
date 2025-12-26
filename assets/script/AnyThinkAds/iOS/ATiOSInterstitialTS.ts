import { native } from 'cc';

import {ATiOSTS} from "./ATiOSTS";
const OC_WRAPPER_CLASS = "ATInterstitialAdWrapper";
export const ATiOSInterstitialTS =  {
    loadInterstitial : function (placementId, extra) {
        ATiOSTS.printJsLog("ATiOSInterstitialJS::loadInterstitial(" + placementId + ", " + extra + ")");
        native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "loadInterstitialWithPlacementID:extra:", placementId, extra);
    },

    setAdListener : function (listener) {
        ATiOSTS.printJsLog("ATiOSInterstitialJS::setAdListener(" + listener + ")");
        native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "setDelegates:", listener);
    },

    hasAdReady : function (placementId) {
        ATiOSTS.printJsLog("ATiOSInterstitialJS::hasAdReady(" + placementId + ")");
        return native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "interstitialReadyForPlacementID:", placementId);
    },

    checkAdStatus : function (placementId) {
        ATiOSTS.printJsLog("ATiOSInterstitialJS::checkAdStatus(" + placementId + ")");
        return native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "checkAdStatus:", placementId);
    },

    showAd : function(placementId) {
        ATiOSTS.printJsLog("ATiOSInterstitialJS::showAd(" + placementId + ")");
        return native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "showInterstitialWithPlacementID:scene:", placementId, null);
        
    },

    showAdInScenario : function(placementId, scenario) {
        ATiOSTS.printJsLog("ATiOSInterstitialJS::showAd(" + placementId  + ", " + scenario + ")");
        return native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "showInterstitialWithPlacementID:scene:", placementId, scenario);
    },

    entryAdScenario : function(placementId, scenario) {
        ATiOSTS.printJsLog("ATiOSInterstitialJS::entryAdScenario(" + placementId  + ", " + scenario + ")");
        return native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "entryAdScenarioWithPlacementID:scene:", placementId, scenario);
    } 
  
};

