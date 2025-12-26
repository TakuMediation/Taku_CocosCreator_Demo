import {ATAndroidTS} from "./Android/ATAndroidTS"
import {ATiOSTS} from "./iOS/ATiOSTS";
import {sys} from 'cc';

let isDebugLog = false;

const initPlatformBridge = function () {
    if (sys.os === sys.OS.IOS) {
        return ATiOSTS;
    } else if (sys.os === sys.OS.ANDROID) {
        return ATAndroidTS;
    }
};

const platformBridge = initPlatformBridge();

export const ATSDK = {

    kATUserLocationUnknown: 0,
    kATUserLocationInEU: 1,
    kATUserLocationOutOfEU: 2,

    PERSONALIZED: 0,
    NONPERSONALIZED: 1,
    UNKNOWN: 2,

    //for android and ios
    OS_VERSION_NAME: "os_vn",
    OS_VERSION_CODE: "os_vc",
    APP_PACKAGE_NAME: "package_name",
    APP_VERSION_NAME: "app_vn",
    APP_VERSION_CODE: "app_vc",

    BRAND: "brand",
    MODEL: "model",
    DEVICE_SCREEN_SIZE: "screen",
    MNC: "mnc",
    MCC: "mcc",

    LANGUAGE: "language",
    TIMEZONE: "timezone",
    USER_AGENT: "ua",
    ORIENTATION: "orient",
    NETWORK_TYPE: "network_type",

    //for android
    INSTALLER: "it_src",
    ANDROID_ID: "android_id",
    GAID: "gaid",
    MAC: "mac",
    IMEI: "imei",
    OAID: "oaid",

    //for ios
    IDFA: "idfa",
    IDFV: "idfv",

    ATSDKListener: {
        userLocationCallback: null,
        getUserLocationCallback: function (userLocation: any) {
            if (undefined != this.userLocationCallback) {
                this.userLocationCallback(userLocation);
            }
        },

        gdprCallback: null,
        getGDPRCallback: function () {
            if (undefined != this.gdprCallback) {
                this.gdprCallback();
            }
        }
    },

    initSDK: function (appId: any, appKey: any) {

        if (undefined != platformBridge) {
            platformBridge.initSDK(appId, appKey);
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    initCustomMap: function (customMap: any) {
        if (undefined != platformBridge) {
            if (undefined != customMap) {
                platformBridge.initCustomMap(JSON.stringify(customMap));
            }
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    setPlacementCustomMap: function (placmentId: any, customMap: any) {
        if (undefined != platformBridge) {
            if (undefined != customMap) {
                platformBridge.setPlacementCustomMap(placmentId, JSON.stringify(customMap));
            }
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    setGDPRLevel: function (level: any) {
        if (undefined != platformBridge) {
            platformBridge.setGDPRLevel(level);
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    getGDPRLevel: function () {
        if (undefined != platformBridge) {
            return platformBridge.getGDPRLevel();
        } else {
            console.log("You must run on Android or iOS.");
        }
        return this.UNKNOWN;
    },

    getUserLocation: function (userLocationCallback: any) {
        this.ATSDKListener.userLocationCallback = userLocationCallback;
        if (undefined != platformBridge) {
            platformBridge.getUserLocation(GetUserLocationJsCallback);
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    showGDPRAuth: function () {
        if (undefined != platformBridge) {
            platformBridge.showGDPRAuth();
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    setLogDebug: function (debug: boolean) {
        isDebugLog = debug;
        if (undefined != platformBridge) {
            platformBridge.setLogDebug(debug);
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    printLog: function (msg: any) {
        if (undefined != msg && isDebugLog) {
            if (undefined != platformBridge) {
                platformBridge.printJsLog(msg);
            } else {
                console.log("You must run on Android or iOS.");
            }

        }
    },

    printLogWithParams: function (tag: string, methodName: string, placementId: string, callbackInfo: string, errorInfo: string) {
        this.printLog(tag + "::" + methodName + "()" + "\nplacementId=" + placementId + "\ncallbackInfo=" + callbackInfo + "\nerrorInfo=" + errorInfo);
    },

    deniedUploadDeviceInfo: function (deniedInfo: string | any[]) {
        if (undefined != platformBridge) {

            if (deniedInfo != null) {
                const length = deniedInfo.length;
                let deniedInfoString = "";
                for (let i = 0; i < length; i++) {
                    const info = deniedInfo[i];
                    if (i == 0) {
                        deniedInfoString = info;
                    } else {
                        deniedInfoString = deniedInfoString + "," + info;
                    }
                }

                console.log("test__" + deniedInfoString)

                platformBridge.deniedUploadDeviceInfo(deniedInfoString);
            }

        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    setChannel: function (channel: any) {
        if (undefined != platformBridge) {
            platformBridge.setChannel(channel);
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    setSubChannel: function (subChannel: any) {
        if (undefined != platformBridge) {
            platformBridge.setSubChannel(subChannel);
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    showGDPRConsent: function (getGDPRCallback: any) {
        this.ATSDKListener.gdprCallback = getGDPRCallback;
        if (undefined != platformBridge) {
            platformBridge.showGDPRConsent(GetGDPRCallback);
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    showDebuggerUI: function (debugKey: any) {
        if (undefined != platformBridge) {
            platformBridge.showDebuggerUI(debugKey);
        }
    }

};

const GetUserLocationJsCallback = "ATSDK.ATSDKListener.getUserLocationCallback";
const GetGDPRCallback = "ATSDK.ATSDKListener.getGDPRCallback";

window["ATSDK"] = ATSDK;
