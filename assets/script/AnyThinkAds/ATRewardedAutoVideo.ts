import {ATAndroidRewardedVideoAutoAdTS} from "./Android/ATAndroidRewardedVideoAutoTS";
import {ATiOSRewardedVideoAutoAdJS} from "./iOS/ATiOSRewardedAutoVideoTS";
import {sys} from 'cc';

const initPlatformBridge = function () {
    if (sys.os === sys.OS.IOS) {
        return ATiOSRewardedVideoAutoAdJS;
    } else if (sys.os === sys.OS.ANDROID) {
        return ATAndroidRewardedVideoAutoAdTS;
    }
};

const platformBridge = initPlatformBridge();
export const ATRewardedVideoAutoAdSDK = {
    userIdKey: "userID", userDataKey: "media_ext",

    ATRewardedVideoListener: {
        developerCallback: null,

        onRewardedVideoAdLoaded: function (placementId: string) {
            if (this.developerCallback != null && this.developerCallback.onRewardedVideoAdLoaded != null) {
                this.developerCallback.onRewardedVideoAdLoaded(placementId);
            }
        }, onRewardedVideoAdFailed: function (placementId: string, errorInfo: string) {
            if (this.developerCallback != null && this.developerCallback.onRewardedVideoAdFailed != null) {
                this.developerCallback.onRewardedVideoAdFailed(placementId, errorInfo);
            }
        }, onRewardedVideoAdPlayStart: function (placementId: string, callbackInfo: string) {
            if (this.developerCallback != null && this.developerCallback.onRewardedVideoAdPlayStart != null) {
                this.developerCallback.onRewardedVideoAdPlayStart(placementId, callbackInfo);
            }
        }, onRewardedVideoAdPlayEnd: function (placementId: string, callbackInfo: string) {
            if (this.developerCallback != null && this.developerCallback.onRewardedVideoAdPlayEnd != null) {
                this.developerCallback.onRewardedVideoAdPlayEnd(placementId, callbackInfo);
            }
        }, onRewardedVideoAdPlayFailed: function (placementId: string, errorInfo: string, callbackInfo: string) {
            if (this.developerCallback != null && this.developerCallback.onRewardedVideoAdPlayFailed != null) {
                this.developerCallback.onRewardedVideoAdPlayFailed(placementId, errorInfo, callbackInfo);
            }
        }, onRewardedVideoAdClosed: function (placementId: string, callbackInfo: string) {
            if (this.developerCallback != null && this.developerCallback.onRewardedVideoAdClosed != null) {
                this.developerCallback.onRewardedVideoAdClosed(placementId, callbackInfo);
            }
        }, onRewardedVideoAdPlayClicked: function (placementId: string, callbackInfo: string) {
            if (this.developerCallback != null && this.developerCallback.onRewardedVideoAdPlayClicked != null) {
                this.developerCallback.onRewardedVideoAdPlayClicked(placementId, callbackInfo);
            }
        }, onReward: function (placementId: string, callbackInfo: string) {
            if (this.developerCallback != null && this.developerCallback.onReward != null) {
                this.developerCallback.onReward(placementId, callbackInfo);
            }
        }, onRewardedVideoAdAgainPlayStart: function (placementId: string, callbackInfo: string) {
            if (this.developerCallback != null && this.developerCallback.onRewardedVideoAdAgainPlayStart != null) {
                this.developerCallback.onRewardedVideoAdAgainPlayStart(placementId, callbackInfo);
            }
        }, onRewardedVideoAdAgainPlayEnd: function (placementId: string, callbackInfo: string) {
            if (this.developerCallback != null && this.developerCallback.onRewardedVideoAdAgainPlayEnd != null) {
                this.developerCallback.onRewardedVideoAdAgainPlayEnd(placementId, callbackInfo);
            }
        }, onRewardedVideoAdAgainPlayFailed: function (placementId: string, errorInfo: string, callbackInfo: string) {
            if (this.developerCallback != null && this.developerCallback.onRewardedVideoAdAgainPlayFailed != null) {
                this.developerCallback.onRewardedVideoAdAgainPlayFailed(placementId, errorInfo, callbackInfo);
            }
        }, onRewardedVideoAdAgainPlayClicked: function (placementId: string, callbackInfo: string) {
            if (this.developerCallback != null && this.developerCallback.onRewardedVideoAdAgainPlayClicked != null) {
                this.developerCallback.onRewardedVideoAdAgainPlayClicked(placementId, callbackInfo);
            }
        }, onAgainReward: function (placementId: string, callbackInfo: string) {
            if (this.developerCallback != null && this.developerCallback.onAgainReward != null) {
                this.developerCallback.onAgainReward(placementId, callbackInfo);
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
        eventJSON[LoadedCallbackKey] = "ATRewardedVideoAutoAdSDK.ATRewardedVideoListener.onRewardedVideoAdLoaded", eventJSON[LoadFailCallbackKey] = "ATRewardedVideoAutoAdSDK.ATRewardedVideoListener.onRewardedVideoAdFailed", eventJSON[PlayStartCallbackKey] = "ATRewardedVideoAutoAdSDK.ATRewardedVideoListener.onRewardedVideoAdPlayStart", eventJSON[PlayEndCallbackKey] = "ATRewardedVideoAutoAdSDK.ATRewardedVideoListener.onRewardedVideoAdPlayEnd", eventJSON[PlayFailCallbackKey] = "ATRewardedVideoAutoAdSDK.ATRewardedVideoListener.onRewardedVideoAdPlayFailed", eventJSON[CloseCallbackKey] = "ATRewardedVideoAutoAdSDK.ATRewardedVideoListener.onRewardedVideoAdClosed", eventJSON[ClickCallbackKey] = "ATRewardedVideoAutoAdSDK.ATRewardedVideoListener.onRewardedVideoAdPlayClicked", eventJSON[RewardCallbackKey] = "ATRewardedVideoAutoAdSDK.ATRewardedVideoListener.onReward", //playAgain listener
            eventJSON[AgainPlayStartCallbackKey] = "ATRewardedVideoAutoAdSDK.ATRewardedVideoListener.onRewardedVideoAdAgainPlayStart", eventJSON[AgainPlayEndCallbackKey] = "ATRewardedVideoAutoAdSDK.ATRewardedVideoListener.onRewardedVideoAdAgainPlayEnd", eventJSON[AgainPlayFailCallbackKey] = "ATRewardedVideoAutoAdSDK.ATRewardedVideoListener.onRewardedVideoAdAgainPlayFailed", eventJSON[AgainClickCallbackKey] = "ATRewardedVideoAutoAdSDK.ATRewardedVideoListener.onRewardedVideoAdAgainPlayClicked", eventJSON[AgainRewardCallbackKey] = "ATRewardedVideoAutoAdSDK.ATRewardedVideoListener.onAgainReward"

        if (undefined != platformBridge) {
            platformBridge.setAdListener(JSON.stringify(eventJSON));
        } else {
            console.log("You must run on Android or iOS.");
        }

        this.ATRewardedVideoListener.developerCallback = listener;
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

const LoadedCallbackKey = "RewardedVideoAutoAdLoaded";
const LoadFailCallbackKey = "RewardedVideoAutoAdLoadFail";
const PlayStartCallbackKey = "RewardedVideoAutoAdPlayStart";
const PlayEndCallbackKey = "RewardedVideoAutoAdPlayEnd";
const PlayFailCallbackKey = "RewardedVideoAutoAdPlayFail";
const CloseCallbackKey = "RewardedVideoAutoAdClose";
const ClickCallbackKey = "RewardedVideoAutoAdClick";
const RewardCallbackKey = "RewardedVideoAutoAdReward";

const AgainPlayStartCallbackKey = "RewardedVideoAutoAdAgainPlayStart";
const AgainPlayEndCallbackKey = "RewardedVideoAutoAdAgainPlayEnd";
const AgainPlayFailCallbackKey = "RewardedVideoAutoAdAgainPlayFail";
const AgainClickCallbackKey = "RewardedVideoAutoAdAgainClick";
const AgainRewardCallbackKey = "RewardedVideoAutoAdAgainReward";

window["ATRewardedVideoAutoAdSDK"] = ATRewardedVideoAutoAdSDK;