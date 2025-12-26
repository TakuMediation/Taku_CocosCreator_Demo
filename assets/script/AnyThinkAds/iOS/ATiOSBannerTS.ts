import { native } from 'cc';

import {ATiOSTS} from "./ATiOSTS";
const OC_WRAPPER_CLASS = "ATBannerAdWrapper";
export const ATiOSBannerTS = {
    loadBanner: function(placementId, extra) {
        ATiOSTS.printJsLog("ATiOSBannerJS::loadBanner(" + placementId + ", " + extra + ")");
        native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "loadBannerWithPlacementID:extra:", placementId, extra);
    },

    setAdListener : function (listener) {
        ATiOSTS.printJsLog("ATiOSBannerJS::setAdListener(" + listener + ")");
        native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "setDelegates:", listener);
    },
  
    hasAdReady : function(placementId) {
        ATiOSTS.printJsLog("ATiOSBannerJS::hasAdReady(" + placementId + ")");
        return native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "bannerReadyForPlacementID:", placementId);
    },

    checkAdStatus : function(placementId) {
        ATiOSTS.printJsLog("ATiOSBannerJS::checkAdStatus(" + placementId + ")");
        return native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "bannerCheckAdStatusForPlacementID:", placementId);
    },

    showAdInPosition : function(placementId, position) { 
        ATiOSTS.printJsLog("ATiOSBannerJS::showAdInPosition(" + placementId + ", " + position + ")");
        native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "showBannerWithPlacementID:scene:position:", placementId, null, position);
    },

    showAdInPositionAndScenario : function(placementId, position, scenario) { 
        ATiOSTS.printJsLog("ATiOSBannerJS::showAdInPositionAndScenario(" + placementId + ", " + position + ", " + scenario + ")");
        native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "showBannerWithPlacementID:scene:position:", placementId, scenario, position);
    },

    showAdInRectangle : function(placementId, showAdRect) {
        ATiOSTS.printJsLog("ATiOSBannerJS::showAdInRectangle(" + placementId + ", " + showAdRect + ")");
        native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "showBannerWithPlacementID:scene:rect:", placementId, null, showAdRect);
    },

    showAdInRectangleAndScenario : function(placementId, showAdRect, scenario) {
        ATiOSTS.printJsLog("ATiOSBannerJS::showAdInRectangleAndScenario(" + placementId + ", " + showAdRect + ", " + scenario + ")");
        native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "showBannerWithPlacementID:scene:rect:", placementId, scenario, showAdRect);
    },

    removeAd : function(placementId) {
        ATiOSTS.printJsLog("ATiOSBannerJS::removeAd(" + placementId + ")");
        native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "removeAd:", placementId);
    },

    reShowAd : function(placementId) {
        ATiOSTS.printJsLog("ATiOSBannerJS::reShowAd(" + placementId + ")");
        native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "reShowAd:", placementId);
    },

    hideAd : function(placementId) {
        ATiOSTS.printJsLog("ATiOSBannerJS::hideAd(" + placementId + ")");
        native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "hideAd:", placementId);
    },

    entryAdScenario: function (placementId, scenario) {
        // cc.log("Android-entryAdScenario:" + placementId + "---" + scenario);
        // native.reflection.callStaticMethod(classJavaName, "entryAdScenario", "(Ljava/lang/String;Ljava/lang/String;)V", placementId, scenario);
    }
};

