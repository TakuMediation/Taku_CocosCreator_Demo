import {ATAndroidBannerTS} from "./Android/ATAndroidBannerTS";
import {ATiOSBannerTS} from "./iOS/ATiOSBannerTS";
import {sys} from 'cc';

const initPlatformBridge = function () {
    if (sys.os === sys.OS.IOS) {
        return ATiOSBannerTS;
    } else if (sys.os === sys.OS.ANDROID) {
        return ATAndroidBannerTS;
    }
};

const platformBridge = initPlatformBridge();


export const ATBannerSDK = {
    kATBannerAdLoadingExtraBannerAdSizeStruct: "banner_ad_size_struct",
    kATBannerAdShowingPositionTop: "top",
    kATBannerAdShowingPositionBottom: "bottom",

    kATBannerAdInlineAdaptiveWidth: "inline_adaptive_width",
    kATBannerAdInlineAdaptiveOrientation: "inline_adaptive_orientation",
    kATBannerAdInlineAdaptiveOrientationCurrent: 0,
    kATBannerAdInlineAdaptiveOrientationPortrait: 1,
    kATBannerAdInlineAdaptiveOrientationLandscape: 2,

    kATBannerAdAdaptiveWidth: "adaptive_width",
    kATBannerAdAdaptiveOrientation: "adaptive_orientation",
    kATBannerAdAdaptiveOrientationCurrent: 0,
    kATBannerAdAdaptiveOrientationPortrait: 1,
    kATBannerAdAdaptiveOrientationLandscape: 2,


    ATBannerListener: {
        developerCallback: null, onBannerAdLoaded: function (placementId: any) {
            if (this.developerCallback != null && this.developerCallback.onBannerAdLoaded != null) {
                this.developerCallback.onBannerAdLoaded(placementId);
            }
        },

        onBannerAdLoadFail: function (placementId: any, errorInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onBannerAdLoadFail != null) {
                this.developerCallback.onBannerAdLoadFail(placementId, errorInfo);
            }
        },

        onBannerAdShow: function (placementId: any, callbackInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onBannerAdShow != null) {
                this.developerCallback.onBannerAdShow(placementId, callbackInfo);
            }
        },

        onBannerAdClick: function (placementId: any, callbackInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onBannerAdClick != null) {
                this.developerCallback.onBannerAdClick(placementId, callbackInfo);
            }
        },

        onBannerAdAutoRefresh: function (placementId: any, callbackInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onBannerAdAutoRefresh != null) {
                this.developerCallback.onBannerAdAutoRefresh(placementId, callbackInfo);
            }
        },

        onBannerAdAutoRefreshFail: function (placementId: any, errorInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onBannerAdAutoRefreshFail != null) {
                this.developerCallback.onBannerAdAutoRefreshFail(placementId, errorInfo);
            }
        },

        onBannerAdCloseButtonTapped: function (placementId: any, callbackInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onBannerAdCloseButtonTapped != null) {
                this.developerCallback.onBannerAdCloseButtonTapped(placementId, callbackInfo);
            }
        },

        //added v5.8.10
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
        if (undefined != platformBridge) {
            if (settings.hasOwnProperty(ATBannerSDK.kATBannerAdLoadingExtraBannerAdSizeStruct)) {
                const loadAdSize = settings[ATBannerSDK.kATBannerAdLoadingExtraBannerAdSizeStruct];
                settings["width"] = loadAdSize["width"];
                settings["height"] = loadAdSize["height"];
            }
            platformBridge.loadBanner(placementId, JSON.stringify(settings));
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    setAdListener: function (listener: any) {
        const eventJSON = {};
        eventJSON[LoadedCallbackKey] = "ATBannerSDK.ATBannerListener.onBannerAdLoaded",
            eventJSON[LoadFailCallbackKey] = "ATBannerSDK.ATBannerListener.onBannerAdLoadFail",
            eventJSON[CloseCallbackKey] = "ATBannerSDK.ATBannerListener.onBannerAdCloseButtonTapped",
            eventJSON[ClickCallbackKey] = "ATBannerSDK.ATBannerListener.onBannerAdClick",
            eventJSON[ShowCallbackKey] = "ATBannerSDK.ATBannerListener.onBannerAdShow",
            eventJSON[RefreshCallbackKey] = "ATBannerSDK.ATBannerListener.onBannerAdAutoRefresh",
            eventJSON[RefreshFailCallbackKey] = "ATBannerSDK.ATBannerListener.onBannerAdAutoRefreshFail",

            //added v5.8.10
            eventJSON[BiddingAttempt] = "ATBannerSDK.ATBannerListener.onAdSourceBiddingAttempt",
            eventJSON[BiddingFilled] = "ATBannerSDK.ATBannerListener.onAdSourceBiddingFilled",
            eventJSON[BiddingFail] = "ATBannerSDK.ATBannerListener.onAdSourceBiddingFail",
            eventJSON[Attemp] = "ATBannerSDK.ATBannerListener.onAdSourceAttemp",
            eventJSON[LoadFilled] = "ATBannerSDK.ATBannerListener.onAdSourceLoadFilled",
            eventJSON[AdSourceLoadFailKey] = "ATBannerSDK.ATBannerListener.onAdSourceLoadFail"

        if (undefined != platformBridge) {
            platformBridge.setAdListener(JSON.stringify(eventJSON));
        } else {
            console.log("You must run on Android or iOS.");
        }

        this.ATBannerListener.developerCallback = listener;
    },

    hasAdReady: function (placementId: any) {
        if (undefined != platformBridge) {
            try {
                return platformBridge.hasAdReady(placementId);
            } catch (e) {
                console.error("anythink hasAdReady:  " + e.toString());
            }
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

    showAdInPosition: function (placementId: any, position: any) {
        if (undefined != platformBridge) {
            platformBridge.showAdInPosition(placementId, position);
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    showAdInPositionAndScenario: function (placementId: any, position: any, scenario: any) {
        if (undefined != platformBridge) {
            platformBridge.showAdInPositionAndScenario(placementId, position, scenario);
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    showAdInRectangle: function (placementId: any, showAdRect: any) {
        if (undefined != platformBridge) {
            platformBridge.showAdInRectangle(placementId, JSON.stringify(showAdRect));
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    showAdInRectangleAndScenario: function (placementId: any, showAdRect: any, scenario: any) {
        if (undefined != platformBridge) {
            platformBridge.showAdInRectangleAndScenario(placementId, JSON.stringify(showAdRect), scenario);
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    removeAd: function (placementId: any) {
        if (undefined != platformBridge) {
            platformBridge.removeAd(placementId);
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    reShowAd: function (placementId: any) {
        if (undefined != platformBridge) {
            platformBridge.reShowAd(placementId);
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    hideAd: function (placementId: any) {
        if (undefined != platformBridge) {
            platformBridge.hideAd(placementId);
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    createLoadAdSize: function (width: any, height: any) {
        const loadAdSize = {};
        loadAdSize["width"] = width;
        loadAdSize["height"] = height;
        return loadAdSize;
    },

    createShowAdRect: function (x: any, y: any, width: any, height: any) {
        const adRect = {};
        adRect["x"] = x;
        adRect["y"] = y;
        adRect["width"] = width;
        adRect["height"] = height;
        return adRect;
    },

    entryAdScenario: function (placementId: any, scenario: any) {
        if (undefined != platformBridge) {
            platformBridge.entryAdScenario(placementId, scenario);
        } else {
            console.log("You must run on Android or iOS.");
        }
    }


};

const LoadedCallbackKey = "BannerLoaded";
const LoadFailCallbackKey = "BannerLoadFail";
const CloseCallbackKey = "BannerCloseButtonTapped";
const ClickCallbackKey = "BannerClick";
const ShowCallbackKey = "BannerShow";
const RefreshCallbackKey = "BannerRefresh";
const RefreshFailCallbackKey = "BannerRefreshFail";

const BiddingAttempt = "BannerBiddingAttempt";
const BiddingFilled = "BannerBiddingFilled";
const BiddingFail = "BannerBiddingFail";
const Attemp = "BannerAttemp";
const LoadFilled = "BannerLoadFilled";
/** 广告源维度加载失败，与 LoadFailCallbackKey（广告位维度）区分，避免同 key 覆盖 */
const AdSourceLoadFailKey = "BannerAdSourceLoadFail";

window["ATBannerSDK"] = ATBannerSDK;