import { native } from 'cc';

const classJavaName = "com/anythink/cocosjs/ATRewardedVideoJSBridge";
export const ATAndroidRewardedVideoJS = {
  
    loadRewardedVideo : function (placementId: any, settings: any) {
        console.log("Android-loadRewardedVideo");
		native.reflection.callStaticMethod(classJavaName, "load", "(Ljava/lang/String;Ljava/lang/String;)V", placementId, settings);
    },

    setAdListener : function (listener: any) {
        console.log("Android-setAdListener");
		native.reflection.callStaticMethod(classJavaName, "setAdListener", "(Ljava/lang/String;)V", listener);
    },

    hasAdReady : function (placementId: any) {
        console.log("Android-hasAdReady");
        return native.reflection.callStaticMethod(classJavaName, "isAdReady", "(Ljava/lang/String;)Z", placementId);
    },

    checkAdStatus : function(placementId: string) {
        console.log("Android-checkAdStatus:" + placementId);
        return native.reflection.callStaticMethod(classJavaName, "checkAdStatus", "(Ljava/lang/String;)Ljava/lang/String;", placementId);
    },

    showAd : function(placementId: string) {
        console.log("Android-rv_showAd:" + placementId);
		native.reflection.callStaticMethod(classJavaName, "show", "(Ljava/lang/String;)V", placementId);
    },

    showAdInScenario : function(placementId: string, scenario: string) {
        console.log("Android-rv_showAdInScenario:" + placementId + "---" + scenario);
		native.reflection.callStaticMethod(classJavaName, "show", "(Ljava/lang/String;Ljava/lang/String;)V", placementId, scenario);
    },

    entryAdScenario : function(placementId: string, scenario: string) {
         console.log("Android-entryAdScenario:" + placementId + "---" + scenario);
		 native.reflection.callStaticMethod(classJavaName, "entryAdScenario", "(Ljava/lang/String;Ljava/lang/String;)V", placementId, scenario);
    }
  
};
