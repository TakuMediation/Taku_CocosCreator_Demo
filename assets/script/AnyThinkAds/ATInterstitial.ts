import {ATAndroidInterstitialTS} from "./Android/ATAndroidInterstitialTS";
import {ATiOSInterstitialTS} from "./iOS/ATiOSInterstitialTS";
import {sys} from 'cc';

const initPlatformBridge = function () {
    if (sys.os === sys.OS.IOS) {
        return ATiOSInterstitialTS;
    } else if (sys.os === sys.OS.ANDROID) {
        return ATAndroidInterstitialTS;
    }
};

const platformBridge = initPlatformBridge();


export const ATInterstitialSDK = {

    UseInterstitialAsInterstitial: "UseInterstitialAsInterstitial",

    ATInterstitialListener: {
        developerCallback: null, onInterstitialAdLoaded: function (placementId: any) {
            if (this.developerCallback != null && this.developerCallback.onInterstitialAdLoaded != null) {
                this.developerCallback.onInterstitialAdLoaded(placementId);
            }
        },

        onInterstitialAdLoadFail: function (placementId: any, errorInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onInterstitialAdLoadFail != null) {
                this.developerCallback.onInterstitialAdLoadFail(placementId, errorInfo);
            }
        },

        onInterstitialAdShow: function (placementId: any, callbackInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onInterstitialAdShow != null) {
                this.developerCallback.onInterstitialAdShow(placementId, callbackInfo);
            }
        },

        onInterstitialAdStartPlayingVideo: function (placementId: any, callbackInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onInterstitialAdStartPlayingVideo != null) {
                this.developerCallback.onInterstitialAdStartPlayingVideo(placementId, callbackInfo);
            }
        },

        onInterstitialAdEndPlayingVideo: function (placementId: any, callbackInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onInterstitialAdEndPlayingVideo != null) {
                this.developerCallback.onInterstitialAdEndPlayingVideo(placementId, callbackInfo);
            }
        },

        onInterstitialAdFailedToPlayVideo: function (placementId: any, errorInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onInterstitialAdFailedToPlayVideo != null) {
                this.developerCallback.onInterstitialAdFailedToPlayVideo(placementId, errorInfo);
            }
        },

        onInterstitialAdFailedToShow: function (placementId: any, errorInfo: any, callbackInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onInterstitialAdFailedToShow != null) {
                this.developerCallback.onInterstitialAdFailedToShow(placementId, errorInfo, callbackInfo);
            }
        },

        onInterstitialAdClose: function (placementId: any, callbackInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onInterstitialAdClose != null) {
                this.developerCallback.onInterstitialAdClose(placementId, callbackInfo);
            }
        },

        onInterstitialAdClick: function (placementId: any, callbackInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onInterstitialAdClick != null) {
                this.developerCallback.onInterstitialAdClick(placementId, callbackInfo);
            }
        }, //added v5.8.10
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
            platformBridge.loadInterstitial(placementId, JSON.stringify(settings));
        }
    },

    setAdListener: function (listener: any) {
        const eventJSON = {};
        eventJSON[LoadedCallbackKey] = "ATInterstitialSDK.ATInterstitialListener.onInterstitialAdLoaded", eventJSON[LoadFailCallbackKey] = "ATInterstitialSDK.ATInterstitialListener.onInterstitialAdLoadFail", eventJSON[PlayStartCallbackKey] = "ATInterstitialSDK.ATInterstitialListener.onInterstitialAdStartPlayingVideo", eventJSON[PlayEndCallbackKey] = "ATInterstitialSDK.ATInterstitialListener.onInterstitialAdEndPlayingVideo", eventJSON[PlayFailCallbackKey] = "ATInterstitialSDK.ATInterstitialListener.onInterstitialAdFailedToPlayVideo", eventJSON[CloseCallbackKey] = "ATInterstitialSDK.ATInterstitialListener.onInterstitialAdClose", eventJSON[ClickCallbackKey] = "ATInterstitialSDK.ATInterstitialListener.onInterstitialAdClick", eventJSON[ShowCallbackKey] = "ATInterstitialSDK.ATInterstitialListener.onInterstitialAdShow", eventJSON[ShowFailCallbackKey] = "ATInterstitialSDK.ATInterstitialListener.onInterstitialAdFailedToShow", //added v5.8.10
            eventJSON[BiddingAttempt] = "ATInterstitialSDK.ATInterstitialListener.onAdSourceBiddingAttempt", eventJSON[BiddingFilled] = "ATInterstitialSDK.ATInterstitialListener.onAdSourceBiddingFilled", eventJSON[BiddingFail] = "ATInterstitialSDK.ATInterstitialListener.onAdSourceBiddingFail", eventJSON[Attemp] = "ATInterstitialSDK.ATInterstitialListener.onAdSourceAttemp", eventJSON[LoadFilled] = "ATInterstitialSDK.ATInterstitialListener.onAdSourceLoadFilled", eventJSON[LoadFail] = "ATInterstitialSDK.ATInterstitialListener.onAdSourceLoadFail"

        if (undefined != platformBridge) {
            platformBridge.setAdListener(JSON.stringify(eventJSON));
        } else {
            console.log("You must run on Android or iOS.");
        }

        this.ATInterstitialListener.developerCallback = listener;
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

const LoadedCallbackKey = "InterstitialLoaded";
const LoadFailCallbackKey = "InterstitialLoadFail";
const PlayStartCallbackKey = "InterstitialPlayStart";
const PlayEndCallbackKey = "InterstitialPlayEnd";
const PlayFailCallbackKey = "InterstitialPlayFail";
const CloseCallbackKey = "InterstitialClose";
const ClickCallbackKey = "InterstitialClick";
const ShowCallbackKey = "InterstitialAdShow";
const ShowFailCallbackKey = "InterstitialAdShowFail";

const BiddingAttempt = "InterstitialBiddingAttempt";
const BiddingFilled = "InterstitialBiddingFilled";
const BiddingFail = "InterstitialBiddingFail";
const Attemp = "InterstitialAttemp";
const LoadFilled = "InterstitialLoadFilled";
const LoadFail = "InterstitialLoadFail";

window["ATInterstitialSDK"] = ATInterstitialSDK;