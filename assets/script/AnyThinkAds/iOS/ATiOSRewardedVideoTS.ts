import { native } from 'cc';
import {ATiOSTS} from "./ATiOSTS";

const OC_RV_WRAPPER_CLASS = "ATRewardedVideoWrapper";
export const ATiOSRewardedVideoTS = {
    loadRewardedVideo : function (placementId, extra) {
        ATiOSTS.printJsLog("ATiOSRewardedVideoJS::loadRewardedVideo(" + placementId + ", " + extra + ")");
        native.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "loadRewardedVideoWithPlacementID:extra:", placementId, extra);
    },

    setAdListener : function (listener) {
        ATiOSTS.printJsLog("ATiOSRewardedVideoJS::setAdListener(" + listener + ")");
        native.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "setDelegates:", listener);
    },

    hasAdReady : function (placementId) {
        ATiOSTS.printJsLog("ATiOSRewardedVideoJS::hasAdReady(" + placementId + ")");
        return native.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "rewardedVideoReadyForPlacementID:", placementId);
    },

    checkAdStatus : function (placementId) {
        ATiOSTS.printJsLog("ATiOSRewardedVideoJS::checkAdStatus(" + placementId + ")");
        return native.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "checkAdStatus:", placementId);
    },

    showAd : function(placementId) {
        ATiOSTS.printJsLog("ATiOSRewardedVideoJS::showAd(" + placementId + ")");
        return native.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "showRewardedVideoWithPlacementID:scene:", placementId, null);
        
    },

    showAdInScenario : function(placementId, scenario) {
        ATiOSTS.printJsLog("ATiOSRewardedVideoJS::showAdInScenario(" + placementId  + ", " + scenario + ")");
        return native.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "showRewardedVideoWithPlacementID:scene:", placementId, scenario);
    },

    entryAdScenario : function(placementId, scenario) {
        ATiOSTS.printJsLog("ATiOSInterstitialJS::entryAdScenario(" + placementId  + ", " + scenario + ")");
        return native.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "entryAdScenarioWithPlacementID:scene:", placementId, scenario);
    }
  
};

