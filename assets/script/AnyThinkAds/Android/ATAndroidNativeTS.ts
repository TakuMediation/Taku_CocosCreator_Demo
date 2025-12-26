import { native } from 'cc';

const classJavaName = "com/anythink/cocosjs/ATNativeJSBridge";
export const ATAndroidNativeTS = {
  
    loadNative : function (placementId: any, settings: any) {
        console.log("Android-loadNative");
		native.reflection.callStaticMethod(classJavaName, "load", "(Ljava/lang/String;Ljava/lang/String;)V", placementId, settings);
    },

    setAdListener : function (listener: any) {
        console.log("Android-setAdListener");
		native.reflection.callStaticMethod(classJavaName, "setAdListener", "(Ljava/lang/String;)V", listener);
    },

    hasAdReady : function (placementId: any) {
         console.log("Android-hasAdReady");
        return native.reflection.callStaticMethod(classJavaName, "isAdReady", "(Ljava/lang/String;)Z", placementId);;
    },

    checkAdStatus : function(placementId: string) {
        console.log("Android-checkAdStatus:" + placementId);
        return native.reflection.callStaticMethod(classJavaName, "checkAdStatus", "(Ljava/lang/String;)Ljava/lang/String;", placementId);
    },

    showAd : function(placementId: any, adViewProperty: any) {
        console.log("Android-showAd");
		native.reflection.callStaticMethod(classJavaName, "show", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", placementId, adViewProperty, "");
    },

    showAdInScenario : function(placementId: any, adViewProperty: any, scenario: any) {
        console.log("Android-showAdInScenario");
        native.reflection.callStaticMethod(classJavaName, "show", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", placementId, adViewProperty, scenario);
    },

    removeAd : function(placementId: any) {
         console.log("Android-removeAd");
		 native.reflection.callStaticMethod(classJavaName, "remove", "(Ljava/lang/String;)V", placementId);
    },

    entryAdScenario : function(placementId: string, scenario: string) {
         console.log("Android-entryAdScenario:" + placementId + "---" + scenario);
		 native.reflection.callStaticMethod(classJavaName, "entryAdScenario", "(Ljava/lang/String;Ljava/lang/String;)V", placementId, scenario);
    }
  
};

