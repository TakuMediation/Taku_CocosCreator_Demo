import { native } from 'cc';

import {ATiOSTS} from "./ATiOSTS";
const OC_RV_WRAPPER_CLASS = "ATRewardedVideoAutoAdWrapper";

export const ATiOSRewardedVideoAutoAdJS =  {

    setAdListener : function (listener) {
        ATiOSTS.printJsLog("ATiOSRewardedVideoAutoAdJS::setAdListener(" + listener + ")");
        native.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "setDelegates:", listener);
    },

    setAdExtraData : function (placementId, extra) {

        ATiOSTS.printJsLog("ATiOSRewardedVideoAutoAdJS::setAdExtraData(" + placementId + ", " + extra + ")");
        native.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "setAutoLocalExtra:customDataJSONString:", placementId, extra);
    },   
    
    addPlacementIds : function (placementId) {
        ATiOSTS.printJsLog("ATiOSRewardedVideoAutoAdJS::addPlacementIds(" + placementId + ")");
        native.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "addAutoLoadAdPlacementID:", placementId);
    },    

    removePlacementId : function (placementId) {
        ATiOSTS.printJsLog("ATiOSRewardedVideoAutoAdJS::removePlacementId(" + placementId + ")");
        native.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "removeAutoLoadAdPlacementID:", placementId);
    }, 

    hasAdReady : function (placementId) {
        ATiOSTS.printJsLog("ATiOSRewardedVideoAutoAdJS::hasAdReady(" + placementId + ")");
        return native.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "autoLoadRewardedVideoReadyForPlacementID:", placementId);
    }, 

    checkAdStatus : function (placementId) {
        ATiOSTS.printJsLog("ATiOSRewardedVideoAutoAdJS::hasAdReady(" + placementId + ")");
        return native.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "checkAutoAdStatus:", placementId);
    }, 
    
    entryAdScenario : function(placementId, scenario) {
        ATiOSTS.printJsLog("ATiOSInterstitialAutoAdJS::entryAdScenario(" + placementId  + ", " + scenario + ")");
        native.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "entryAutoAdScenarioWithPlacementID:scenarioID:", placementId, scenario);
    },

    showAd : function(placementId) {
        ATiOSTS.printJsLog("ATiOSRewardedVideoAutoAdJS::showAd(" + placementId + ")");
        native.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "showAutoRewardedVideoWithPlacementID:scenarioID:", placementId, null);   
    },

    showAdInScenario : function(placementId, scenario) {
        ATiOSTS.printJsLog("ATiOSRewardedVideoAutoAdJS::showAdInScenario(" + placementId  + ", " + scenario + ")");
        native.reflection.callStaticMethod(OC_RV_WRAPPER_CLASS, "showAutoRewardedVideoWithPlacementID:scenarioID:", placementId, scenario);
    } 

};

