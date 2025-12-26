import { native } from 'cc';

const classJavaName = "com/anythink/cocosjs/ATSplashBridge";
export const ATAndroidSplashTS = {

    loadSplash : function (placementId: any, settings: any) {
        console.log("anythink++++++++++ Android-loadSplash");
        native.reflection.callStaticMethod(classJavaName, "load", "(Ljava/lang/String;Ljava/lang/String;)V", placementId, settings);
    },

    setAdListener : function (listener: any) {
        console.log("anythink++++++++++ Android-setAdListener");
        native.reflection.callStaticMethod(classJavaName, "setAdListener", "(Ljava/lang/String;)V", listener);
    },

    hasAdReady : function (placementId: any) {
        console.log("anythink++++++++++ Android-hasAdReady");
        return native.reflection.callStaticMethod(classJavaName, "isAdReady", "(Ljava/lang/String;)Z", placementId);
    },

    checkAdStatus : function(placementId: string) {
        console.log("anythink++++++++++ Android-checkAdStatus:" + placementId);
        return native.reflection.callStaticMethod(classJavaName, "checkAdStatus", "(Ljava/lang/String;)Ljava/lang/String;", placementId);
    },

    showAd : function(placementId: string) {
        console.log("anythink++++++++++ Android-showAd:" + placementId);
        native.reflection.callStaticMethod(classJavaName, "show", "(Ljava/lang/String;)V", placementId);
    },

    showAdInScenario : function(placementId: string, scenario: string) {
        console.log("anythink++++++++++ Android-showAdInScenario:" + placementId + "---" + scenario);
        native.reflection.callStaticMethod(classJavaName, "show", "(Ljava/lang/String;Ljava/lang/String;)V", placementId, scenario);
    },

    entryAdScenario : function(placementId: string, scenario: string) {
        console.log("anythink++++++++++ Android-entryAdScenario:" + placementId + "---" + scenario);
        native.reflection.callStaticMethod(classJavaName, "entryAdScenario", "(Ljava/lang/String;Ljava/lang/String;)V", placementId, scenario);
    }

};

