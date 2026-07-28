import {ATAndroidRewardedVideoJS} from "./Android/ATAndroidRewardedVideoTS";
import {ATiOSRewardedVideoTS} from "./iOS/ATiOSRewardedVideoTS";
import {ATSDK} from "./ATSDK";
import { _decorator, sys } from 'cc';

var initPlatformBridge = function () {
    if (sys.os === sys.OS.IOS) {
        return ATiOSRewardedVideoTS;
    } else if (sys.os === sys.OS.ANDROID) {
        return ATAndroidRewardedVideoJS;
    }
};

const platformBridge = initPlatformBridge();


export const ATRewardedVideoSDK =  {
    userIdKey: "userID",
    userDataKey: "media_ext",

    ATRewardedVideoListener: {
        developerCallback: null,

        onRewardedVideoAdLoaded: function (placementId: string) {
            ATSDK.printLog("ATRewardedVideoSDK.ATRewardedVideoListener.onRewardedVideoAdLoaded(" + placementId + ")");
            if (this.developerCallback != null && this.developerCallback.onRewardedVideoAdLoaded != null) {
                this.developerCallback.onRewardedVideoAdLoaded(placementId);
            }
        },
        onRewardedVideoAdFailed: function (placementId: string, errorInfo: string) {
            ATSDK.printLog("ATRewardedVideoSDK.ATRewardedVideoListener.onRewardedVideoAdFailed(" + placementId + ", " + errorInfo + ")");
            if (this.developerCallback != null && this.developerCallback.onRewardedVideoAdFailed != null) {
                this.developerCallback.onRewardedVideoAdFailed(placementId, errorInfo);
            }
        },
        onRewardedVideoAdPlayStart: function (placementId: string, callbackInfo: string) {
            ATSDK.printLog("ATRewardedVideoSDK.ATRewardedVideoListener.onRewardedVideoAdPlayStart(" + placementId + ", " + callbackInfo + ")");
            if (this.developerCallback != null && this.developerCallback.onRewardedVideoAdPlayStart != null) {
                this.developerCallback.onRewardedVideoAdPlayStart(placementId, callbackInfo);
            }
        },
        onRewardedVideoAdPlayEnd: function (placementId: string, callbackInfo: string) {
            ATSDK.printLog("ATRewardedVideoSDK.ATRewardedVideoListener.onRewardedVideoAdPlayEnd(" + placementId + ", " + callbackInfo + ")");
            if (this.developerCallback != null && this.developerCallback.onRewardedVideoAdPlayEnd != null) {
                this.developerCallback.onRewardedVideoAdPlayEnd(placementId, callbackInfo);
            }
        },
        onRewardedVideoAdPlayFailed: function (placementId: string, errorInfo: string, callbackInfo: string) {
            ATSDK.printLog("ATRewardedVideoSDK.ATRewardedVideoListener.onRewardedVideoAdPlayFailed(" + placementId + ", " + errorInfo + ", " + callbackInfo + ")");
            if (this.developerCallback != null && this.developerCallback.onRewardedVideoAdPlayFailed != null) {
                this.developerCallback.onRewardedVideoAdPlayFailed(placementId, errorInfo, callbackInfo);
            }
        },
        onRewardedVideoAdClosed: function (placementId: string, callbackInfo: string) {
            ATSDK.printLog("ATRewardedVideoSDK.ATRewardedVideoListener.onRewardedVideoAdClosed(" + placementId + ", " + callbackInfo + ")");
            if (this.developerCallback != null && this.developerCallback.onRewardedVideoAdClosed != null) {
                this.developerCallback.onRewardedVideoAdClosed(placementId, callbackInfo);
            }
        },
        onRewardedVideoAdPlayClicked: function (placementId: string, callbackInfo: string) {
            ATSDK.printLog("ATRewardedVideoSDK.ATRewardedVideoListener.onRewardedVideoAdPlayClicked(" + placementId + ", " + callbackInfo + ")");
            if (this.developerCallback != null && this.developerCallback.onRewardedVideoAdPlayClicked != null) {
                this.developerCallback.onRewardedVideoAdPlayClicked(placementId, callbackInfo);
            }
        },
        onReward: function (placementId: string, callbackInfo: string) {
            ATSDK.printLog("ATRewardedVideoSDK.ATRewardedVideoListener.onReward(" + placementId + ", " + callbackInfo + ")");
            if (this.developerCallback != null && this.developerCallback.onReward != null) {
                this.developerCallback.onReward(placementId, callbackInfo);
            }
        },
        //added v5.8.10
        onAdSourceBiddingAttempt: function (placementId: string, callbackInfo: string) {
            ATSDK.printLog("ATRewardedVideoSDK.ATRewardedVideoListener.onAdSourceBiddingAttempt(" + placementId + ", " + callbackInfo + ")");
            if (this.developerCallback != null && this.developerCallback.onAdSourceBiddingAttempt != null) {
                this.developerCallback.onAdSourceBiddingAttempt(placementId, callbackInfo);
            }
        },
        onAdSourceBiddingFilled: function (placementId: string, callbackInfo: string) {
            ATSDK.printLog("ATRewardedVideoSDK.ATRewardedVideoListener.onAdSourceBiddingFilled(" + placementId + ", " + callbackInfo + ")");
            if (this.developerCallback != null && this.developerCallback.onAdSourceBiddingFilled != null) {
                this.developerCallback.onAdSourceBiddingFilled(placementId, callbackInfo);
            }
        },
        onAdSourceBiddingFail: function (placementId: string, errorInfo: string, callbackInfo: string) {
            ATSDK.printLog("ATRewardedVideoSDK.ATRewardedVideoListener.onAdSourceBiddingFail(" + placementId + ", " + errorInfo + ", " + callbackInfo + ")");
            if (this.developerCallback != null && this.developerCallback.onAdSourceBiddingFail != null) {
                this.developerCallback.onAdSourceBiddingFail(placementId, errorInfo, callbackInfo);
            }
        },
        onAdSourceAttemp: function (placementId: string, callbackInfo: string) {
            ATSDK.printLog("ATRewardedVideoSDK.ATRewardedVideoListener.onAdSourceAttemp(" + placementId + ", " + callbackInfo + ")");
            if (this.developerCallback != null && this.developerCallback.onAdSourceAttemp != null) {
                this.developerCallback.onAdSourceAttemp(placementId, callbackInfo);
            }
        },
        onAdSourceLoadFilled: function (placementId: string, callbackInfo: string) {
            ATSDK.printLog("ATRewardedVideoSDK.ATRewardedVideoListener.onAdSourceLoadFilled(" + placementId + ", " + callbackInfo + ")");
            if (this.developerCallback != null && this.developerCallback.onAdSourceLoadFilled != null) {
                this.developerCallback.onAdSourceLoadFilled(placementId, callbackInfo);
            }
        },
        onAdSourceLoadFail: function (placementId: string, errorInfo: string, callbackInfo: string) {
            ATSDK.printLog("ATRewardedVideoSDK.ATRewardedVideoListener.onAdSourceLoadFail(" + placementId + ", " + errorInfo + ", " + callbackInfo + ")");
            if (this.developerCallback != null && this.developerCallback.onAdSourceLoadFail != null) {
                this.developerCallback.onAdSourceLoadFail(placementId, errorInfo, callbackInfo);
            }
        },
        onRewardedVideoAdAgainPlayStart: function (placementId: string, callbackInfo: string) {
            ATSDK.printLog("ATRewardedVideoSDK.ATRewardedVideoListener.onRewardedVideoAdAgainPlayStart(" + placementId + ", " + callbackInfo + ")");
            if (this.developerCallback != null && this.developerCallback.onRewardedVideoAdAgainPlayStart != null) {
                this.developerCallback.onRewardedVideoAdAgainPlayStart(placementId, callbackInfo);
            }
        },
        onRewardedVideoAdAgainPlayEnd: function (placementId: string, callbackInfo: string) {
            ATSDK.printLog("ATRewardedVideoSDK.ATRewardedVideoListener.onRewardedVideoAdAgainPlayEnd(" + placementId + ", " + callbackInfo + ")");
            if (this.developerCallback != null && this.developerCallback.onRewardedVideoAdAgainPlayEnd != null) {
                this.developerCallback.onRewardedVideoAdAgainPlayEnd(placementId, callbackInfo);
            }
        },
        onRewardedVideoAdAgainPlayFailed: function (placementId: string, errorInfo: string, callbackInfo: string) {
            ATSDK.printLog("ATRewardedVideoSDK.ATRewardedVideoListener.onRewardedVideoAdAgainPlayFailed(" + placementId + ", " + errorInfo + ", " + callbackInfo + ")");
            if (this.developerCallback != null && this.developerCallback.onRewardedVideoAdAgainPlayFailed != null) {
                this.developerCallback.onRewardedVideoAdAgainPlayFailed(placementId, errorInfo, callbackInfo);
            }
        },
        onRewardedVideoAdAgainPlayClicked: function (placementId: string, callbackInfo: string) {
            ATSDK.printLog("ATRewardedVideoSDK.ATRewardedVideoListener.onRewardedVideoAdAgainPlayClicked(" + placementId + ", " + callbackInfo + ")");
            if (this.developerCallback != null && this.developerCallback.onRewardedVideoAdAgainPlayClicked != null) {
                this.developerCallback.onRewardedVideoAdAgainPlayClicked(placementId, callbackInfo);
            }
        },
        onAgainReward: function (placementId: string, callbackInfo: string) {
            ATSDK.printLog("ATRewardedVideoSDK.ATRewardedVideoListener.onAgainReward(" + placementId + ", " + callbackInfo + ")");
            if (this.developerCallback != null && this.developerCallback.onAgainReward != null) {
                this.developerCallback.onAgainReward(placementId, callbackInfo);
            }
        }
    },

    loadAd: function (placementId: any, settings = {}) {

        if (undefined != platformBridge) {
            platformBridge.loadRewardedVideo(placementId, JSON.stringify(settings));
        }
    },

    setAdListener: function (listener: any) {
        const eventJSON = {};
        eventJSON[LoadedCallbackKey] = "ATRewardedVideoSDK.ATRewardedVideoListener.onRewardedVideoAdLoaded",
            eventJSON[LoadFailCallbackKey] = "ATRewardedVideoSDK.ATRewardedVideoListener.onRewardedVideoAdFailed",
            eventJSON[PlayStartCallbackKey] = "ATRewardedVideoSDK.ATRewardedVideoListener.onRewardedVideoAdPlayStart",
            eventJSON[PlayEndCallbackKey] = "ATRewardedVideoSDK.ATRewardedVideoListener.onRewardedVideoAdPlayEnd",
            eventJSON[PlayFailCallbackKey] = "ATRewardedVideoSDK.ATRewardedVideoListener.onRewardedVideoAdPlayFailed",
            eventJSON[CloseCallbackKey] = "ATRewardedVideoSDK.ATRewardedVideoListener.onRewardedVideoAdClosed",
            eventJSON[ClickCallbackKey] = "ATRewardedVideoSDK.ATRewardedVideoListener.onRewardedVideoAdPlayClicked",
            eventJSON[RewardCallbackKey] = "ATRewardedVideoSDK.ATRewardedVideoListener.onReward",
            //added v5.8.10
            eventJSON[BiddingAttempt] = "ATRewardedVideoSDK.ATRewardedVideoListener.onAdSourceBiddingAttempt",
            eventJSON[BiddingFilled] = "ATRewardedVideoSDK.ATRewardedVideoListener.onAdSourceBiddingFilled",
            eventJSON[BiddingFail] = "ATRewardedVideoSDK.ATRewardedVideoListener.onAdSourceBiddingFail",
            eventJSON[Attemp] = "ATRewardedVideoSDK.ATRewardedVideoListener.onAdSourceAttemp",
            eventJSON[LoadFilled] = "ATRewardedVideoSDK.ATRewardedVideoListener.onAdSourceLoadFilled",
            eventJSON[AdSourceLoadFailKey] = "ATRewardedVideoSDK.ATRewardedVideoListener.onAdSourceLoadFail",
            //added v5.8.10 playAgain listener
            eventJSON[AgainPlayStartCallbackKey] = "ATRewardedVideoSDK.ATRewardedVideoListener.onRewardedVideoAdAgainPlayStart",
            eventJSON[AgainPlayEndCallbackKey] = "ATRewardedVideoSDK.ATRewardedVideoListener.onRewardedVideoAdAgainPlayEnd",
            eventJSON[AgainPlayFailCallbackKey] = "ATRewardedVideoSDK.ATRewardedVideoListener.onRewardedVideoAdAgainPlayFailed",
            eventJSON[AgainClickCallbackKey] = "ATRewardedVideoSDK.ATRewardedVideoListener.onRewardedVideoAdAgainPlayClicked",
            eventJSON[AgainRewardCallbackKey] = "ATRewardedVideoSDK.ATRewardedVideoListener.onAgainReward"

        if (undefined != platformBridge) {
            platformBridge.setAdListener(JSON.stringify(eventJSON));
        }

        this.ATRewardedVideoListener.developerCallback = listener;
    },

    hasAdReady: function (placementId: any) {
        if (undefined != platformBridge) {
            return platformBridge.hasAdReady(placementId);
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

const LoadedCallbackKey = "RewardedVideoLoaded";
const LoadFailCallbackKey = "RewardedVideoLoadFail";
const PlayStartCallbackKey = "RewardedVideoPlayStart";
const PlayEndCallbackKey = "RewardedVideoPlayEnd";
const PlayFailCallbackKey = "RewardedVideoPlayFail";
const CloseCallbackKey = "RewardedVideoClose";
const ClickCallbackKey = "RewardedVideoClick";
const RewardCallbackKey = "RewardedVideoReward";

const BiddingAttempt = "RewardedVideoBiddingAttempt";
const BiddingFilled = "RewardedVideoBiddingFilled";
const BiddingFail = "RewardedVideoBiddingFail";
const Attemp = "RewardedVideoAttemp";
const LoadFilled = "RewardedVideoLoadFilled";
/** 广告源维度加载失败，与 LoadFailCallbackKey（广告位维度）区分，避免同 key 覆盖 */
const AdSourceLoadFailKey = "RewardedVideoAdSourceLoadFail";

const AgainPlayStartCallbackKey = "RewardedVideoAgainPlayStart";
const AgainPlayEndCallbackKey = "RewardedVideoAgainPlayEnd";
const AgainPlayFailCallbackKey = "RewardedVideoAgainPlayFail";
const AgainClickCallbackKey = "RewardedVideoAgainClick";
const AgainRewardCallbackKey = "RewardedVideoAgainReward";

window["ATRewardedVideoSDK"] = ATRewardedVideoSDK;