import {ATiOSTS} from "./ATiOSTS";
import { native } from 'cc';

const OC_WRAPPER_CLASS = "ATSplashAdWrapper";

export const ATiOSSplashTS =  {
   loadSplash : function (placementId, extra) {
       ATiOSTS.printJsLog("ATiOSSplashJS::loadSplash(" + placementId + ", " + extra + ")");
       native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "loadSplashWithPlacementID:extra:", placementId, extra);
   },

   setAdListener : function (listener) {
       ATiOSTS.printJsLog("ATiOSSplashJS::setAdListener(" + listener + ")");
       native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "setDelegates:", listener);
   },

   hasAdReady : function (placementId) {
       ATiOSTS.printJsLog("ATiOSSplashJS::hasAdReady(" + placementId + ")");
       return native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "splashReadyForPlacementID:", placementId);
   },

   checkAdStatus : function (placementId) {
       ATiOSTS.printJsLog("ATiOSSplashJS::checkAdStatus(" + placementId + ")");
       return native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "checkAdStatus:", placementId);
   },

   showAd : function(placementId) {
       ATiOSTS.printJsLog("ATiOSSplashJS::showAd(" + placementId + ")");
       return native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "showSplashWithPlacementID:scene:", placementId, null);
   },

   showAdWithExtra : function(placementId, showExtra) {
       ATiOSTS.printJsLog("ATiOSSplashJS::showAd(" + placementId + " , " + showExtra + ")");
       return native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "showSplashWithPlacementID:showExtra:", placementId, showExtra);
   },

   showAdInScenario : function(placementId, scenario) {
       ATiOSTS.printJsLog("ATiOSSplashJS::showAd(" + placementId  + ", " + scenario + ")");
       return native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "showSplashWithPlacementID:scene:", placementId, scenario);
   },

   entryAdScenario : function(placementId, scenario) {
       ATiOSTS.printJsLog("ATiOSSplashJS::entryAdScenario(" + placementId  + ", " + scenario + ")");
       return native.reflection.callStaticMethod(OC_WRAPPER_CLASS, "entryAdScenarioWithPlacementID:scene:", placementId, scenario);
   } 
 
};