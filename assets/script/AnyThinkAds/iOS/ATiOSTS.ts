import { native } from 'cc';

const OC_ATSDK_MANAGER_CLASS = "ATSDKManager";
const OC_BIRDGE_CLASS = "ATJSBridge";

export const ATiOSTS = {
    initSDK : function(appid, appkey) {
    	this.printJsLog("ATiOSJS::initSDK(" + appid + "," + appkey + ")");
        native.reflection.callStaticMethod(OC_ATSDK_MANAGER_CLASS, "startWithAppID:appKey:", appid, appkey);
    },

    initCustomMap : function(customMap) {
        this.printJsLog("ATiOSJS::initCustomMap(" + customMap + ")");
        native.reflection.callStaticMethod(OC_ATSDK_MANAGER_CLASS, "setCustomData:", customMap);
    },

    setPlacementCustomMap : function(placmentId, customMap) {
        this.printJsLog("ATiOSJS::setPlacementCustomMap(" + placmentId + ", " + customMap + ")");
        native.reflection.callStaticMethod(OC_ATSDK_MANAGER_CLASS, "setCustomData:forPlacementID:", customMap, placmentId);
    },

    setGDPRLevel : function(level) {
        this.printJsLog("ATiOSJS::setGDPRLevel(" + level + ")");
        native.reflection.callStaticMethod(OC_ATSDK_MANAGER_CLASS, "setDataConsent:", level);
    },

    getGDPRLevel : function() {
        this.printJsLog("ATiOSJS::getGDPRLevel()");
        return native.reflection.callStaticMethod(OC_ATSDK_MANAGER_CLASS, "dataConsent", "()I");
    },

    getUserLocation : function(callbackMethod) {
        this.printJsLog("ATiOSJS::getUserLocation(" + callbackMethod + ")");
        native.reflection.callStaticMethod(OC_ATSDK_MANAGER_CLASS, "getUserLocationWithCallback:", callbackMethod);
    },

    showGDPRAuth : function () {
        this.printJsLog("ATiOSJS::showGDPRAuth()");
        native.reflection.callStaticMethod(OC_ATSDK_MANAGER_CLASS, "presentDataConsentDialog", "()I");
    },
    
    setLogDebug : function (debug) {
        this.printJsLog("ATiOSJS::setLogDebug(" + debug + ")");
        native.reflection.callStaticMethod(OC_ATSDK_MANAGER_CLASS, "setDebugLog:", debug);
    },
    
    printJsLog : function(msg) {
        console.log(msg);
        if (undefined != msg && msg != null) {
            native.reflection.callStaticMethod(OC_BIRDGE_CLASS, "log:", msg);
        }
    },

    deniedUploadDeviceInfo : function (deniedInfo) {
        this.printJsLog("ATiOSJS::deniedUploadDeviceInfo(" + deniedInfo + ")");
        native.reflection.callStaticMethod(OC_ATSDK_MANAGER_CLASS, "deniedUploadDeviceInfo:", deniedInfo);
    },

    showGDPRConsent : function(callbackMethod) {
        // native.reflection.callStaticMethod(classJavaName, "showGDPRConsentDialog", "(Ljava/lang/String;)V", callbackMethod);
    },

    showDebuggerUI : function (debugKey) {
        native.reflection.callStaticMethod(OC_ATSDK_MANAGER_CLASS, "showDebuggerUIWithDebugKey:", debugKey);
    },

    setChannel : function(channel: any) {
        // native.reflection.callStaticMethod(classJavaName, "setChannel", "(I)V", channel);
    },

    setSubChannel : function(subChannel: any) {
        // native.reflection.callStaticMethod(classJavaName, "setSubChannel", "(I)V", subChannel);
    }
  
};

