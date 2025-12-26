import {ATAndroidInterstitialAutoAdTS} from "./Android/ATAndroidInterstitialAutoTS";
import {ATiOSInterstitialAutoAdTS} from "./iOS/ATiOSInterstitiaAutolTS";
import {sys} from 'cc';

const initPlatformBridge = function () {
    if (sys.os === sys.OS.IOS) {
        return ATiOSInterstitialAutoAdTS;
    } else if (sys.os === sys.OS.ANDROID) {
        return ATAndroidInterstitialAutoAdTS;
    }
};

const platformBridge = initPlatformBridge();


export const ATInterstitialAutoAdSDK = {

    UseInterstitialAsInterstitial: "UseInterstitialAsInterstitial",
    UseRewardedVideoAsInterstitial: "UseRewardedVideoAsInterstitial",
    ATInterstitialListener: {
        developerCallback: null,

        onInterstitialAdLoaded: function (placementId: any) {
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
        }
    },

    setAdExtraData: function (placementId: any, settings = {}) {

        if (undefined != platformBridge) {
            platformBridge.setAdExtraData(placementId, JSON.stringify(settings));
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    addPlacementIds: function (placementIds: string[]) {

        if (undefined != platformBridge) {
            platformBridge.addPlacementIds(JSON.stringify(placementIds));
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    removePlacementId: function (placementIds: any) {

        if (undefined != platformBridge) {
            platformBridge.removePlacementId(JSON.stringify(placementIds));
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    setAdListener: function (listener: any) {
        const eventJSON = {};
        eventJSON[LoadedCallbackKey] = "ATInterstitialAutoAdSDK.ATInterstitialListener.onInterstitialAdLoaded";
        eventJSON[LoadFailCallbackKey] = "ATInterstitialAutoAdSDK.ATInterstitialListener.onInterstitialAdLoadFail";
        eventJSON[PlayStartCallbackKey] = "ATInterstitialAutoAdSDK.ATInterstitialListener.onInterstitialAdStartPlayingVideo";
        eventJSON[PlayEndCallbackKey] = "ATInterstitialAutoAdSDK.ATInterstitialListener.onInterstitialAdEndPlayingVideo";
        eventJSON[PlayFailCallbackKey] = "ATInterstitialAutoAdSDK.ATInterstitialListener.onInterstitialAdFailedToPlayVideo";
        eventJSON[CloseCallbackKey] = "ATInterstitialAutoAdSDK.ATInterstitialListener.onInterstitialAdClose";
        eventJSON[ClickCallbackKey] = "ATInterstitialAutoAdSDK.ATInterstitialListener.onInterstitialAdClick";
        eventJSON[ShowCallbackKey] = "ATInterstitialAutoAdSDK.ATInterstitialListener.onInterstitialAdShow";
        eventJSON[ShowFailCallbackKey] = "ATInterstitialAutoAdSDK.ATInterstitialListener.onInterstitialAdFailedToShow";

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

const LoadedCallbackKey = "InterstitialAutoAdLoaded";
const LoadFailCallbackKey = "InterstitialAutoAdLoadFail";
const PlayStartCallbackKey = "InterstitialAutoAdPlayStart";
const PlayEndCallbackKey = "InterstitialAutoAdPlayEnd";
const PlayFailCallbackKey = "InterstitialAutoAdPlayFail";
const CloseCallbackKey = "InterstitialAutoAdClose";
const ClickCallbackKey = "InterstitialAutoAdClick";
const ShowCallbackKey = "InterstitialAutoAdAdShow";
const ShowFailCallbackKey = "InterstitialAutoAdShowFail";

window["ATInterstitialAutoAdSDK"] = ATInterstitialAutoAdSDK;