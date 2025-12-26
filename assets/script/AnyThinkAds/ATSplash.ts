import {ATAndroidSplashTS} from "./Android/ATAndroidSplashTS";
import {ATiOSSplashTS} from "./iOS/ATiOSSplashTS";
import {sys} from 'cc';

const initPlatformBridge = function () {
    if (sys.os === sys.OS.IOS) {
        return ATiOSSplashTS;
    } else if (sys.os === sys.OS.ANDROID) {
        return ATAndroidSplashTS;
    }
};

const platformBridge = initPlatformBridge();


export const ATSplashSDK = {

    ATSplashListener: {
        developerCallback: null,
        onSplashAdLoaded: function (placementId: any) {
            if (this.developerCallback != null && this.developerCallback.onSplashAdLoaded != null) {
                this.developerCallback.onSplashAdLoaded(placementId);
            }
        },

        onSplashAdLoadFail: function (placementId: any, errorInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onSplashAdLoadFail != null) {
                this.developerCallback.onSplashAdLoadFail(placementId, errorInfo);
            }
        },

        onSplashAdShow: function (placementId: any, callbackInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onSplashAdShow != null) {
                this.developerCallback.onSplashAdShow(placementId, callbackInfo);
            }
        },

        onSplashAdClose: function (placementId: any, callbackInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onSplashAdClose != null) {
                this.developerCallback.onSplashAdClose(placementId, callbackInfo);
            }
        },

        onSplashAdClick: function (placementId: any, callbackInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onSplashAdClick != null) {
                this.developerCallback.onSplashAdClick(placementId, callbackInfo);
            }
        },

        onAdSourceBiddingAttempt: function (placementId: any, callbackInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onAdSourceBiddingAttempt != null) {
                this.developerCallback.onAdSourceBiddingAttempt(placementId, callbackInfo);
            }
        }, onAdSourceBiddingFilled: function (placementId: any, callbackInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onAdSourceBiddingFilled != null) {
                this.developerCallback.onAdSourceBiddingFilled(placementId, callbackInfo);
            }
        }, onAdSourceBiddingFail: function (placementId: any, errorInfo: any, callbackInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onAdSourceBiddingFail != null) {
                this.developerCallback.onAdSourceBiddingFail(placementId, errorInfo, callbackInfo);
            }
        }, onAdSourceAttemp: function (placementId: any, callbackInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onAdSourceAttemp != null) {
                this.developerCallback.onAdSourceAttemp(placementId, callbackInfo);
            }
        }, onAdSourceLoadFilled: function (placementId: any, callbackInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onAdSourceLoadFilled != null) {
                this.developerCallback.onAdSourceLoadFilled(placementId, callbackInfo);
            }
        }, onAdSourceLoadFail: function (placementId: any, errorInfo: any, callbackInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onAdSourceLoadFail != null) {
                this.developerCallback.onAdSourceLoadFail(placementId, errorInfo, callbackInfo);
            }
        }
    },

    loadAd: function (placementId: any, settings = {}) {

        if (platformBridge != null) {
            platformBridge.loadSplash(placementId, JSON.stringify(settings));
        }
    },

    setAdListener: function (listener: any) {
        const eventJSON = {};
        eventJSON[LoadedCallbackKey] = " ATSplashSDK.ATSplashListener.onSplashAdLoaded", eventJSON[LoadFailCallbackKey] = " ATSplashSDK.ATSplashListener.onSplashAdLoadFail", eventJSON[CloseCallbackKey] = " ATSplashSDK.ATSplashListener.onSplashAdClose", eventJSON[ClickCallbackKey] = " ATSplashSDK.ATSplashListener.onSplashAdClick", eventJSON[ShowCallbackKey] = " ATSplashSDK.ATSplashListener.onSplashAdShow",

            eventJSON[BiddingAttempt] = " ATSplashSDK.ATSplashListener.onAdSourceBiddingAttempt", eventJSON[BiddingFilled] = " ATSplashSDK.ATSplashListener.onAdSourceBiddingFilled", eventJSON[BiddingFail] = " ATSplashSDK.ATSplashListener.onAdSourceBiddingFail", eventJSON[Attemp] = " ATSplashSDK.ATSplashListener.onAdSourceAttemp", eventJSON[LoadFilled] = " ATSplashSDK.ATSplashListener.onAdSourceLoadFilled", eventJSON[LoadFail] = " ATSplashSDK.ATSplashListener.onAdSourceLoadFail"

        if (undefined != platformBridge) {
            platformBridge.setAdListener(JSON.stringify(eventJSON));
        } else {
            console.log("You must run on Android or iOS.");
        }
        this.ATSplashListener.developerCallback = listener;
    },

    hasAdReady: function (placementId: any) {
        if (undefined != platformBridge) {
            return platformBridge.hasAdReady(placementId);
        } else {
            console.log("You must run on Android or iOS.");
        }
        return false;
    },

    checkAdStatus: function (placementId: any) {
        if (undefined != platformBridge) {
            return platformBridge.checkAdStatus(placementId);
        } else {
            console.log("You must run on Android or iOS.");
        }
        return "";
    },

    showAd: function (placementId: any) {
        if (undefined != platformBridge) {
            console.log(this.TAG+ "showSplashAd333");
            platformBridge.showAd(placementId);
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    showAdInScenario: function (placementId: any, scenario: any) {
        if (undefined != platformBridge) {
            platformBridge.showAdInScenario(placementId, scenario);
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    entryAdScenario: function (placementId: any, scenario: any) {
        if (undefined != platformBridge) {
            platformBridge.entryAdScenario(placementId, scenario);
        } else {
            console.log("You must run on Android or iOS.");
        }
    }
};

const LoadedCallbackKey = "SplashLoaded";
const LoadFailCallbackKey = "SplashLoadFail";
const CloseCallbackKey = "SplashClose";
const ClickCallbackKey = "SplashClick";
const ShowCallbackKey = "SplashAdShow";

const BiddingAttempt = "SplashBiddingAttempt";
const BiddingFilled = "SplashBiddingFilled";
const BiddingFail = "SplashBiddingFail";
const Attemp = "SplashAttemp";
const LoadFilled = "SplashLoadFilled";
const LoadFail = "SplashLoadFail";

window["ATSplashSDK"] = ATSplashSDK;