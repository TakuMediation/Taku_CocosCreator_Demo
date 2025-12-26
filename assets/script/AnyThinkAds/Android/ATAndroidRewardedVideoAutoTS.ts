import { native } from 'cc';

const classJavaName = "com/anythink/cocosjs/ATRewardedVideoAutoAdJSBridge";
export const ATAndroidRewardedVideoAutoAdTS = {
  
    setAdListener : function (listener: any) {
        console.log("anythink++++++++++ Android-setAdListener");
		native.reflection.callStaticMethod(classJavaName, "setAdListener", "(Ljava/lang/String;)V", listener);
    },

    addPlacementIds : function (placementIds: any) {
        console.log("anythink++++++++++ ATAndroidRewardedVideoAutoAdTS Android-addPlacementIds " + placementIds);
		native.reflection.callStaticMethod(classJavaName, "addPlacementIds", "(Ljava/lang/String;)V", placementIds);
    },

    removePlacementId : function (placementId: any) {
        console.log("anythink++++++++++ Android-removePlacementId");
		native.reflection.callStaticMethod(classJavaName, "removePlacementId", "(Ljava/lang/String;)V", placementId);
    },

    setAdExtraData : function (placementId: any, settings: any) {
        console.log("Android-setAdExtraData");
		native.reflection.callStaticMethod(classJavaName, "setAdExtraData", "(Ljava/lang/String;Ljava/lang/String;)V", placementId, settings);
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
        console.log("anythink++++++++++ Android-rvautoad_showAd:" + placementId);
		native.reflection.callStaticMethod(classJavaName, "show", "(Ljava/lang/String;)V", placementId);
    },

    showAdInScenario : function(placementId: string, scenario: string) {
        console.log("anythink++++++++++ Android-rvautoad_showAdInScenario:" + placementId + "---" + scenario);
		native.reflection.callStaticMethod(classJavaName, "show", "(Ljava/lang/String;Ljava/lang/String;)V", placementId, scenario);
    },

    entryAdScenario : function(placementId: string, scenario: string) {
         console.log("anythink++++++++++ Android-entryAdScenario:" + placementId + "---" + scenario);
		 native.reflection.callStaticMethod(classJavaName, "entryAdScenario", "(Ljava/lang/String;Ljava/lang/String;)V", placementId, scenario);
    }
  
};

