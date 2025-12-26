import { native } from 'cc';

const classJavaName = "com/anythink/cocosjs/ATBannerJSBridge";
export const ATAndroidBannerTS = {

    loadBanner: function (placementId: any, settings: string) {
        console.log("Android-loadBanner:" + settings);
        native.reflection.callStaticMethod(classJavaName, "load", "(Ljava/lang/String;Ljava/lang/String;)V", placementId, settings);
    },

    setAdListener: function (listener: any) {
        console.log("Android-setAdListener");
        native.reflection.callStaticMethod(classJavaName, "setAdListener", "(Ljava/lang/String;)V", listener);
    },

    hasAdReady: function (placementId: any) {
        console.log("Android-hasAdReady");
        return native.reflection.callStaticMethod(classJavaName, "isAdReady", "(Ljava/lang/String;)Z", placementId);
    },

    checkAdStatus: function (placementId: string) {
        console.log("Android-checkAdStatus:" + placementId);
        return native.reflection.callStaticMethod(classJavaName, "checkAdStatus", "(Ljava/lang/String;)Ljava/lang/String;", placementId);
    },

    showAdInPosition: function (placementId: any, position: any) {
        console.log("Android-showAdInPosistion");
        try {
            native.reflection.callStaticMethod(classJavaName, "showWithPosition", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", placementId, position, "");
        } catch (e) {
            console.error("anythink  showAdInPosition:  " + e.toString());
        }
    },

    showAdInPositionAndScenario: function (placementId: any, position: any, scenario: any) {
        console.log("Android-showAdInPositionAndScenario");
        native.reflection.callStaticMethod(classJavaName, "showWithPosition", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", placementId, position, scenario);
    },

    showAdInRectangle: function (placementId: any, showAdRect: any) {
        console.log("Android-showAdInRectangle");
        native.reflection.callStaticMethod(classJavaName, "showWithRect", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", placementId, showAdRect, "");
    },

    showAdInRectangleAndScenario: function (placementId: any, showAdRect: any, scenario: any) {
        console.log("Android-showAdInRectangleAndScenario");
        native.reflection.callStaticMethod(classJavaName, "showWithRect", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", placementId, showAdRect, scenario);
    },

    removeAd: function (placementId: any) {
        console.log("Android-removeAd");
        native.reflection.callStaticMethod(classJavaName, "remove", "(Ljava/lang/String;)V", placementId);
    },

    reShowAd: function (placementId: any) {
        console.log("Android-reShowAd");
        native.reflection.callStaticMethod(classJavaName, "reshow", "(Ljava/lang/String;)V", placementId);
    },

    hideAd: function (placementId: any) {
        console.log("Android-hideAd");
        native.reflection.callStaticMethod(classJavaName, "hide", "(Ljava/lang/String;)V", placementId);
    },

    entryAdScenario: function (placementId: string, scenario: string) {
        console.log("Android-entryAdScenario:" + placementId + "---" + scenario);
        native.reflection.callStaticMethod(classJavaName, "entryAdScenario", "(Ljava/lang/String;Ljava/lang/String;)V", placementId, scenario);
    }

};

