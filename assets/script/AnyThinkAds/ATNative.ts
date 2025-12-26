import {ATiOSNativeTS} from "./iOS/ATiOSNativeTS"
import {ATAndroidNativeTS} from "./Android/ATAndroidNativeTS"
import {Component, sys} from 'cc';

const initPlatformBridge = function () {
    if (sys.os === sys.OS.IOS) {
        return ATiOSNativeTS;
    } else if (sys.os === sys.OS.ANDROID) {
        return ATAndroidNativeTS;
    }
};

const platformBridge = initPlatformBridge();


export const ATNativeSDK = {
    ATNativeListener: {
        developerCallback: null, onNativeAdLoaded: function (placementId: any) {
            if (this.developerCallback != null && this.developerCallback.onNativeAdLoaded != null) {
                this.developerCallback.onNativeAdLoaded(placementId);
            }
        },

        onNativeAdLoadFail: function (placementId: any, errorInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onNativeAdLoadFail != null) {
                this.developerCallback.onNativeAdLoadFail(placementId, errorInfo);
            }
        },

        onNativeAdShow: function (placementId: any, callbackInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onNativeAdShow != null) {
                this.developerCallback.onNativeAdShow(placementId, callbackInfo);
            }
        },

        onNativeAdClick: function (placementId: any, callbackInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onNativeAdClick != null) {
                this.developerCallback.onNativeAdClick(placementId, callbackInfo);
            }
        },

        onNativeAdVideoStart: function (placementId: any) {
            if (this.developerCallback != null && this.developerCallback.onNativeAdVideoStart != null) {
                this.developerCallback.onNativeAdVideoStart(placementId,);
            }
        },

        onNativeAdVideoEnd: function (placementId: any) {
            if (this.developerCallback != null && this.developerCallback.onNativeAdVideoEnd != null) {
                this.developerCallback.onNativeAdVideoEnd(placementId);
            }
        },

        onNativeAdCloseButtonTapped: function (placementId: any, callbackInfo: any) {
            if (this.developerCallback != null && this.developerCallback.onNativeAdCloseButtonTapped != null) {
                this.developerCallback.onNativeAdCloseButtonTapped(placementId, callbackInfo);
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

        if (undefined != platformBridge) {
            platformBridge.loadNative(placementId, JSON.stringify(settings));
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    setAdListener: function (listener: any) {
        const eventJSON = {};
        eventJSON[LoadedCallbackKey] = "ATNative.ATNativeListener.onNativeAdLoaded", eventJSON[LoadFailCallbackKey] = "ATNative.ATNativeListener.onNativeAdLoadFail", eventJSON[CloseCallbackKey] = "ATNative.ATNativeListener.onNativeAdCloseButtonTapped", eventJSON[ClickCallbackKey] = "ATNative.ATNativeListener.onNativeAdClick", eventJSON[ShowCallbackKey] = "ATNative.ATNativeListener.onNativeAdShow", eventJSON[VideoStartKey] = "ATNative.ATNativeListener.onNativeAdVideoStart", eventJSON[VideoEndKey] = "ATNative.ATNativeListener.onNativeAdVideoEnd", //added v5.8.10
            eventJSON[BiddingAttempt] = "ATNative.ATNativeListener.onAdSourceBiddingAttempt", eventJSON[BiddingFilled] = "ATNative.ATNativeListener.onAdSourceBiddingFilled", eventJSON[BiddingFail] = "ATNative.ATNativeListener.onAdSourceBiddingFail", eventJSON[Attemp] = "ATNative.ATNativeListener.onAdSourceAttemp", eventJSON[LoadFilled] = "ATNative.ATNativeListener.onAdSourceLoadFilled", eventJSON[LoadFail] = "ATNative.ATNativeListener.onAdSourceLoadFail"

        if (undefined != platformBridge) {
            platformBridge.setAdListener(JSON.stringify(eventJSON));
        } else {
            console.log("You must run on Android or iOS.");
        }

        this.ATNativeListener.developerCallback = listener;
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

    showAd: function (placementId: any, adViewProperty: { getAdViewProperty: () => any; }) {
        if (undefined != platformBridge) {
            platformBridge.showAd(placementId, JSON.stringify(adViewProperty.getAdViewProperty()));
        } else {
            console.log("You must run on Android or iOS.");
        }
    },

    showAdInScenario: function (placementId: any, adViewProperty: { getAdViewProperty: () => any; }, scenario: any) {
        if (undefined != platformBridge) {
            platformBridge.showAdInScenario(placementId, JSON.stringify(adViewProperty.getAdViewProperty()), scenario);
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
    },

    removeAd: function (placementId: any) {
        if (undefined != platformBridge) {
            platformBridge.removeAd(placementId);
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

};

export class AdViewProperty extends Component {

    parent = null
    appIcon = null
    mainImage = null
    title = null
    desc = null
    adLogo = null
    cta = null
    rating = null
    dislike = null
    elements = null

    createItemViewProperty(x: number, y: number, width: number, height: number, backgroundColor: string, textColor: string, textSize: number, isCustomClick = false) {
        const itemProperty = {};
        itemProperty["x"] = x;
        itemProperty["y"] = y;
        itemProperty["width"] = width;
        itemProperty["height"] = height;
        itemProperty["backgroundColor"] = backgroundColor;
        itemProperty["textColor"] = textColor;
        itemProperty["textSize"] = textSize;
        itemProperty["isCustomClick"] = isCustomClick;

        return itemProperty;
    }

    getAdViewProperty() {
        const nativeViewProperty = {};

        if (this.parent != null) {
            nativeViewProperty["parent"] = this.parent;
        }

        if (this.appIcon != null) {
            nativeViewProperty["icon"] = this.appIcon;
        }

        if (this.mainImage != null) {
            nativeViewProperty["mainImage"] = this.mainImage;
        }

        if (this.title != null) {
            nativeViewProperty["title"] = this.title;
        }

        if (this.desc != null) {
            nativeViewProperty["desc"] = this.desc;
        }

        if (this.adLogo != null) {
            nativeViewProperty["adLogo"] = this.adLogo;
        }

        if (this.cta != null) {
            nativeViewProperty["cta"] = this.cta;
        }

        if (this.rating != null) {
            nativeViewProperty["rating"] = this.rating;
        }

        if (this.dislike != null) {
            nativeViewProperty["dislike"] = this.dislike;
        }

        if (this.elements != null) {
            nativeViewProperty["elements"] = this.elements
        }

        return nativeViewProperty;
    }
}

const LoadedCallbackKey = "NativeLoaded";
const LoadFailCallbackKey = "NativeLoadFail";
const CloseCallbackKey = "NativeCloseButtonTapped";
const ClickCallbackKey = "NativeClick";
const ShowCallbackKey = "NativeShow";
const VideoStartKey = "NativeVideoStart";
const VideoEndKey = "NativeVideoEnd";
const BiddingAttempt = "NativeBiddingAttempt";
const BiddingFilled = "NativeBiddingFilled";
const BiddingFail = "NativeBiddingFail";
const Attemp = "NativeAttemp";
const LoadFilled = "NativeLoadFilled";
const LoadFail = "NativeLoadFail";
window["ATNative"] = ATNativeSDK;