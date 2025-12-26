import { native } from 'cc';

const classJavaName = "com/anythink/cocosjs/ATJSBridge";

export const ATAndroidTS = {
    printJsLog : function(msg: any) {
        if (undefined != msg) {
            native.reflection.callStaticMethod("android/util/Log", "i", "(Ljava/lang/String;Ljava/lang/String;)I", "AT-Cocos-JS", msg);
        }
    },

    initSDK : function(appid: any, appkey: any) {
        native.reflection.callStaticMethod(classJavaName, "initSDK", "(Ljava/lang/String;Ljava/lang/String;)V", appid, appkey);
    },

    initCustomMap : function(customMap: any) {
        native.reflection.callStaticMethod(classJavaName, "initCustomMap", "(Ljava/lang/String;)V", customMap);
    },

    setPlacementCustomMap : function(placmentId: any, customMap: any) {
        native.reflection.callStaticMethod(classJavaName, "setPlacementCustomMap", "(Ljava/lang/String;Ljava/lang/String;)V", placmentId, customMap);
    },

    setGDPRLevel : function(level: any) {
        native.reflection.callStaticMethod(classJavaName, "setGDPRLevel", "(I)V", level);
    },

    getGDPRLevel : function() {
        return native.reflection.callStaticMethod(classJavaName, "getGDPRLevel", "()I");
    },

    getUserLocation : function(callbackMethod: any) {
        native.reflection.callStaticMethod(classJavaName, "getUserLocation", "(Ljava/lang/String;)V", callbackMethod);
    },

    showGDPRAuth : function () {
        native.reflection.callStaticMethod(classJavaName, "showGDPRAuth", "()V");
    },

    setLogDebug : function (debug: any) {
        native.reflection.callStaticMethod(classJavaName, "setLogDebug", "(Z)V", debug);
    },

    deniedUploadDeviceInfo : function (deniedInfo: any) {
        native.reflection.callStaticMethod(classJavaName, "deniedUploadDeviceInfo", "(Ljava/lang/String;)V", deniedInfo);
    },

    setChannel : function(channel: any) {
        native.reflection.callStaticMethod(classJavaName, "setChannel", "(Ljava/lang/String;)V", channel);
    },

    setSubChannel : function(subChannel: any) {
        native.reflection.callStaticMethod(classJavaName, "setSubChannel", "(Ljava/lang/String;)V", subChannel);
    },

    showGDPRConsent : function(callbackMethod: any) {
        native.reflection.callStaticMethod(classJavaName, "showGDPRConsent", "(Ljava/lang/String;)V", callbackMethod);
    },

    showDebuggerUI : function (debugKey: any) {
        try {
            native.reflection.callStaticMethod(classJavaName, "showDebuggerUI", "(Ljava/lang/String;)V", debugKey);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error('unknown error', error);
            }
        }
    }
  
};
