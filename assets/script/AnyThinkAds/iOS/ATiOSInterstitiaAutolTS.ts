import { native } from 'cc';

import {ATiOSTS} from "./ATiOSTS";
const OC_WRAPPER_CLASS = "ATInterstitialAutoAdWrapper";
export const ATiOSInterstitialAutoAdTS  = {

    setAdListener : function (listener) {
        ATiOSTS.printJsLog("ATiOSInterstitialAutoAdJS::setAdListener(" + listener + ")");
        native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "setDelegates:", listener);
    },

    setAdExtraData : function (placementId, extra) {
        
        ATiOSTS.printJsLog("ATiOSInterstitialAutoAdJS::setAdExtraData(" + placementId + ", " + extra + ")");
        native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "setAutoLocalExtra:customDataJSONString:", placementId, extra);
    },   
    
    addPlacementIds : function (placementId) {
        ATiOSTS.printJsLog("ATiOSInterstitialAutoAdJS::addPlacementIds(" + placementId + ")");
        native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "addAutoLoadAdPlacementID:", placementId);
    },    

    removePlacementId : function (placementId) {
        ATiOSTS.printJsLog("ATiOSInterstitialAutoAdJS::removePlacementId(" + placementId + ")");
        native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "removeAutoLoadAdPlacementID:", placementId);
    }, 

    hasAdReady : function (placementId) {
        ATiOSTS.printJsLog("ATiOSInterstitialAutoAdJS::hasAdReady(" + placementId + ")");
        return native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "autoLoadInterstitialAdReadyForPlacementID:", placementId);
    }, 

    checkAdStatus : function (placementId) {
        ATiOSTS.printJsLog("ATiOSInterstitialAutoAdJS::hasAdReady(" + placementId + ")");
        return native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "checkAutoAdStatus:",placementId);
    }, 

    entryAdScenario : function(placementId, scenario) {
        ATiOSTS.printJsLog("ATiOSInterstitialAutoAdJS::entryAdScenario(" + placementId  + ", " + scenario + ")");
        native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "entryAutoAdScenarioWithPlacementID:scenarioID:", placementId, scenario);
    },


    showAd : function(placementId) {
        ATiOSTS.printJsLog("ATiOSInterstitialAutoAdJS::showAd(" + placementId + ")");
        native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "showAutoInterstitialAdWithPlacementID:scenarioID:", placementId, null);   
    },

    showAdInScenario : function(placementId, scenario) {
        ATiOSTS.printJsLog("ATiOSInterstitialAutoAdJS::showAdInScenario(" + placementId  + ", " + scenario + ")");
        native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "showAutoInterstitialAdWithPlacementID:scenarioID:", placementId, scenario);
    },

};
