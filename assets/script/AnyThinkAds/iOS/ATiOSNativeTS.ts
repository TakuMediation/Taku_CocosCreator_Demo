import { native } from 'cc';

import {ATiOSTS} from "./ATiOSTS";
const OC_WRAPPER_CLASS = "ATNativeAdWrapper";

export const ATiOSNativeTS = {
    loadNative : function(placementId, settings) {
        ATiOSTS.printJsLog("ATiOSBannerJS::loadNative(" + placementId + ", " + settings + ")");
        native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "loadNativeWithPlacementID:extra:", placementId, settings);
    },

    setAdListener : function (listener) {
        ATiOSTS.printJsLog("ATiOSNativeJS::setAdListener(" + listener + ")");
        native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "setDelegates:", listener);
    },
  
    hasAdReady : function(placementId) {
        ATiOSTS.printJsLog("ATiOSNativeJS::hasAdReady(" + placementId + ")");
        return native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "nativeReadyForPlacementID:", placementId);
    },

    checkAdStatus : function(placementId) {
        ATiOSTS.printJsLog("ATiOSNativeJS::checkAdStatus(" + placementId + ")");
        return native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "nativeCheckAdStatusForPlacementID:", placementId);
    },

    showAd : function(placementId, adViewProperty) { 
        ATiOSTS.printJsLog("ATiOSNativeJS::showAd(" + placementId + ", " + adViewProperty + ")");
        native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "showNativeWithPlacementID:scene:metrics:", placementId, null, adViewProperty);
    },

    showAdInScenario : function(placementId, adViewProperty, scenario) { 
        ATiOSTS.printJsLog("ATiOSNativeJS::showAdInScenario(" + placementId + ", " + adViewProperty + ", " + scenario + ")");
        native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "showNativeWithPlacementID:scene:metrics:", placementId, scenario, adViewProperty);
    },

    removeAd : function(placementId) {
        ATiOSTS.printJsLog("ATiOSNativeJS::removeAd(" + placementId + ")");
        native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "removeNativeWithPlacementID:", placementId);
    },
    entryAdScenario : function(placementId, scenario) {
        ATiOSTS.printJsLog("ATiOSInterstitialJS::entryAdScenario(" + placementId  + ", " + scenario + ")");
        return native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "entryAdScenarioWithPlacementID:scene:", placementId, scenario);
    }
};


