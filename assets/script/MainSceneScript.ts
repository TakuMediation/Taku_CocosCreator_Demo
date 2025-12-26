import {ATSDK} from "db://assets/script/AnyThinkAds/ATSDK";
import {ATBannerSDK} from "db://assets/script/AnyThinkAds/ATBanner";
import {ATRewardedVideoSDK} from "db://assets/script/AnyThinkAds/ATRewardedVideo";
import {AdViewProperty, ATNativeSDK} from "db://assets/script/AnyThinkAds/ATNative";
import {ATInterstitialSDK} from "db://assets/script/AnyThinkAds/ATInterstitial";
import {ATSplashSDK} from "db://assets/script/AnyThinkAds/ATSplash";
import {Constant} from "db://assets/script/Constant";
import * as cc from 'cc';
import {_decorator, Button, Component} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('MainSceneScript')
export class MainSceneScript extends Component {

    @property(Button)
    public btnRewarded: Button = null;
    @property(Button)
    public btnInter: Button = null;
    @property(Button)
    public btnBanner: Button = null;
    @property(Button)
    public btnNative: Button = null;
    @property(Button)
    public btnSplash: Button = null;

    private isBannerShow: boolean = true;

    private TAG: string = "anythink++++++++++ ";

    private SplashAdListener = {
        onSplashAdLoaded: (placementId: any) => {
            console.log("onSplashAdLoaded", placementId)
            this.setAdStatusText(this.btnSplash, "Ad is loaded");
            ATSplashSDK.showAd(Constant.SplashPlacementId);
        },

        onSplashAdLoadFail: (placementId: any, errorInfo: any) => {
            console.log("onSplashAdLoadFail", placementId, errorInfo)
            this.setAdStatusText(this.btnSplash, "Load failed");
        },

        onSplashAdShow: (placementId: any, callbackInfo: any) => {
            console.log("onSplashAdShow", placementId, callbackInfo)
        },

        onSplashAdClick: (placementId: any, callbackInfo: any) => {
            console.log("onSplashAdClick", placementId, callbackInfo)
        },

        onSplashAdClose: (placementId: any) => {
            console.log("onSplashAdClose", placementId)
        }
    };

    private NativeAdListener = {
        onNativeAdLoaded: (placementId: any) => {
            console.log("onNativeAdLoaded", placementId)
            this.setAdStatusText(this.btnNative, "Ad is loaded");
        },

        onNativeAdLoadFail: (placementId: any, errorInfo: any) => {
            console.log("onNativeAdLoadFail", placementId, errorInfo)
            this.setAdStatusText(this.btnNative, "Load failed");
        },

        onNativeAdShow: (placementId: any, callbackInfo: any) => {
            console.log("onNativeAdShow", placementId, callbackInfo)
        },

        onNativeAdClick: (placementId: any, callbackInfo: any) => {
            console.log("onNativeAdClick", placementId, callbackInfo)
        },

        onNativeAdVideoStart: (placementId: any) => {
            console.log("onNativeAdVideoStart", placementId)
        },

        onNativeAdVideoEnd: (placementId: any) => {
            console.log("onNativeAdVideoEnd", placementId)
        },

        onNativeAdCloseButtonTapped: (placementId: any, callbackInfo: any) => {
            console.log("onNativeAdCloseButtonTapped", placementId, callbackInfo)

            ATNativeSDK.removeAd(Constant.NativePlacementId);
        }
    };

    private BannerAdListener = {
        onBannerAdLoaded: (placementId: any) => {
            console.log("onBannerAdLoaded", placementId)
            this.setAdStatusText(this.btnBanner, "Ad is loaded");
        },

        onBannerAdLoadFail: (placementId: any, errorInfo: any) => {
            console.log("onBannerAdLoadFail", placementId, errorInfo)
            this.setAdStatusText(this.btnBanner, "Load failed");
        },

        onBannerAdShow: (placementId: any, callbackInfo: any) => {
            console.log("onBannerAdShow", placementId, callbackInfo)
        },

        onBannerAdClick: (placementId: any, callbackInfo: any) => {
            console.log("onBannerAdClick", placementId, callbackInfo)
        },

        onBannerAdAutoRefresh: (placementId: any, callbackInfo: any) => {
            console.log("onBannerAdAutoRefresh", placementId, callbackInfo)
        },

        onBannerAdAutoRefreshFail: (placementId: any, errorInfo: any) => {
            console.log("onBannerAdAutoRefreshFail", placementId, errorInfo)
        },

        onBannerAdCloseButtonTapped: (placementId: any, callbackInfo: any) => {
            console.log("onBannerAdCloseButtonTapped", placementId, callbackInfo)
        }
    };

    private RewardedVideoListener = {
        onRewardedVideoAdLoaded: (placementId: any) => {
            console.log("onRewardedVideoAdLoaded", placementId)
            this.setAdStatusText(this.btnRewarded, "Ad is loaded");
        },

        onRewardedVideoAdFailed: (placementId: any, errorInfo: any) => {
            console.log("onRewardedVideoAdFailed", placementId, errorInfo)
            this.setAdStatusText(this.btnRewarded, "Load failed");
        },

        onRewardedVideoAdPlayStart: (placementId: any, callbackInfo: any) => {
            console.log("onRewardedVideoAdPlayStart", placementId, callbackInfo)
        },

        onRewardedVideoAdPlayEnd: (placementId: any, callbackInfo: any) => {
            console.log("onRewardedVideoAdPlayEnd", placementId, callbackInfo)
        },

        onRewardedVideoAdPlayFailed: (placementId: any, errorInfo: any, callbackInfo: any) => {
            console.log("onRewardedVideoAdPlayFailed", placementId, callbackInfo, errorInfo)
        },

        onRewardedVideoAdClosed: (placementId: any, callbackInfo: any) => {
            console.log("onRewardedVideoAdClosed", placementId, callbackInfo)
        },

        onRewardedVideoAdPlayClicked: (placementId: any, callbackInfo: any) => {
            console.log("onRewardedVideoAdPlayClicked", placementId)
        },

        onReward: (placementId: any, callbackInfo: any) => {
            console.log("onReward", placementId, callbackInfo)
        }
    };

    private InterstitialListener = {
        onInterstitialAdLoaded: (placementId: any) => {
            console.log("onInterstitialAdLoaded", placementId);
            this.setAdStatusText(this.btnInter, "Ad is loaded");
        },

        onInterstitialAdLoadFail: (placementId: any, errorInfo: any) => {
            console.log("onInterstitialAdLoadFail", placementId, errorInfo);
            this.setAdStatusText(this.btnInter, "Load failed");
        },

        onInterstitialAdShow: (placementId: any, callbackInfo: any) => {
            console.log("onInterstitialAdShow", placementId, callbackInfo);
        },

        onInterstitialAdStartPlayingVideo: (placementId: any, callbackInfo: any) => {
            console.log("onInterstitialAdStartPlayingVideo", placementId, callbackInfo);
        },

        onInterstitialAdEndPlayingVideo: (placementId: any, callbackInfo: any) => {
            console.log("onInterstitialAdEndPlayingVideo", placementId, callbackInfo);
        },

        onInterstitialAdFailedToPlayVideo: (placementId: any, errorInfo: any) => {
            console.log("onInterstitialAdFailedToPlayVideo", placementId, errorInfo);
        },

        onInterstitialAdFailedToShow: (placementId: any, errorInfo: any, callbackInfo: any) => {
            console.log("onInterstitialAdFailedToShow", placementId, callbackInfo, errorInfo);
        },

        onInterstitialAdClose: (placementId: any, callbackInfo: any) => {
            console.log("onInterstitialAdClose", placementId, callbackInfo);
        },

        onInterstitialAdClick: (placementId: any, callbackInfo: any) => {
            console.log("onInterstitialAdClick", placementId, callbackInfo);
        }
    };

    start() {
        Constant.init();
        this.initSDK();
        this.initListener();
        this.initAD();
    }

    public showRewardedAd(): void {
        ATRewardedVideoSDK.entryAdScenario(Constant.RewardedPlacementId, Constant.YourScenarioId);
        if (ATRewardedVideoSDK.hasAdReady(Constant.RewardedPlacementId)) {
            ATRewardedVideoSDK.showAdInScenario(Constant.RewardedPlacementId, Constant.YourScenarioId);
        } else {
            ATRewardedVideoSDK.loadAd(Constant.RewardedPlacementId);
            this.setAdStatusText(this.btnRewarded, "Ad is loading...");
        }
    }

    public showInterstitialAd(): void {
        ATInterstitialSDK.entryAdScenario(Constant.InterPlacementId, Constant.YourScenarioId);
        if (ATInterstitialSDK.hasAdReady(Constant.InterPlacementId)) {
            ATInterstitialSDK.showAdInScenario(Constant.InterPlacementId, Constant.YourScenarioId);
        } else {
            ATInterstitialSDK.loadAd(Constant.InterPlacementId);
            this.setAdStatusText(this.btnInter, "Ad is loading...");
        }
    }

    public showBannerAd(): void {
        let label = this.btnBanner.node.getChildByName("Label").getComponent(cc.Label);
        ATBannerSDK.entryAdScenario(Constant.BannerPlacementId, Constant.YourScenarioId);
        if (this.isBannerShow && ATBannerSDK.hasAdReady(Constant.BannerPlacementId)) {
            ATBannerSDK.showAdInPositionAndScenario(Constant.BannerPlacementId, ATBannerSDK.kATBannerAdShowingPositionBottom, Constant.YourScenarioId);
            this.isBannerShow = false;
            label.string = "Remove Banner Ad";
        } else {
            this.isBannerShow = true;
            label.string = "Show Banner Ad";
            ATBannerSDK.removeAd(Constant.BannerPlacementId);

            const setting = {};
            setting[ATBannerSDK.kATBannerAdLoadingExtraBannerAdSizeStruct] = ATBannerSDK.createLoadAdSize(cc.screen.windowSize.width, 300);
            setting[ATBannerSDK.kATBannerAdAdaptiveWidth] = cc.screen.windowSize.width;
            setting[ATBannerSDK.kATBannerAdAdaptiveOrientation] = ATBannerSDK.kATBannerAdAdaptiveOrientationPortrait;
            ATBannerSDK.loadAd(Constant.BannerPlacementId, setting);

            this.setAdStatusText(this.btnBanner, "Ad is loading...");
        }
    }

    public showNativeAd(): void {
        ATNativeSDK.entryAdScenario(Constant.NativePlacementId, Constant.YourScenarioId);
        if (ATNativeSDK.hasAdReady(Constant.NativePlacementId)) {

            const windowSize = cc.screen.windowSize;
            const windowWidth = windowSize.width;
            const windowHeight = windowSize.height;
            const padding = windowSize.width / 35;

            const parentWidth = windowWidth;
            const parentHeight = windowWidth * 4 / 5;
            const appIconSize = windowWidth / 7;


            const nativeAdViewProperty = new AdViewProperty();
            nativeAdViewProperty.parent = nativeAdViewProperty.createItemViewProperty(0, windowHeight - parentHeight, parentWidth, parentHeight, "#ffffff", "", 0);

            nativeAdViewProperty.appIcon = nativeAdViewProperty.createItemViewProperty(0, parentHeight - appIconSize, appIconSize, appIconSize, "", "", 0);
            nativeAdViewProperty.cta = nativeAdViewProperty.createItemViewProperty(parentWidth - appIconSize * 2, parentHeight - appIconSize, appIconSize * 2, appIconSize, "#2095F1", "#ffffff", appIconSize / 3);

            nativeAdViewProperty.mainImage = nativeAdViewProperty.createItemViewProperty(padding, padding, parentWidth - 2 * padding, parentHeight - appIconSize - 2 * padding, "#ffffff", "#ffffff", 14);

            nativeAdViewProperty.title = nativeAdViewProperty.createItemViewProperty(appIconSize + padding, parentHeight - appIconSize, parentWidth - 3 * appIconSize - 2 * padding, appIconSize / 2, "", "#000000", appIconSize / 3);
            nativeAdViewProperty.desc = nativeAdViewProperty.createItemViewProperty(appIconSize + padding, parentHeight - appIconSize / 2, parentWidth - 3 * appIconSize - 2 * padding, appIconSize / 2, "#ffffff", "#000000", appIconSize / 4);
            // nativeAdViewProperty.adLogo = nativeAdViewProperty.createItemViewProperty(0,0,0,0,"#ffffff","#ffffff",14);
            // nativeAdViewProperty.rating = nativeAdViewProperty.createItemViewProperty(0,0,0,0,"#ffffff","#ffffff",14);
            nativeAdViewProperty.dislike = nativeAdViewProperty.createItemViewProperty(parentWidth - appIconSize / 2, 0, appIconSize / 2, appIconSize / 2, "#00ffffff", "#ffffff", 14);
            nativeAdViewProperty.elements = nativeAdViewProperty.createItemViewProperty(0, parentHeight - appIconSize / 2, parentWidth, appIconSize / 2, "#7f000000", "#ffffff", 14)

            ATNativeSDK.showAdInScenario(Constant.NativePlacementId, nativeAdViewProperty, Constant.YourScenarioId);
        } else {
            ATNativeSDK.loadAd(Constant.NativePlacementId);
            this.setAdStatusText(this.btnNative, "Ad is loading...");
        }
    }

    public showSplashAd(): void {
        ATSplashSDK.entryAdScenario(Constant.SplashPlacementId, Constant.YourScenarioId);
        if (ATSplashSDK.hasAdReady(Constant.SplashPlacementId)) {
            ATSplashSDK.showAd(Constant.SplashPlacementId);
        } else {
            ATSplashSDK.loadAd(Constant.SplashPlacementId);
            this.setAdStatusText(this.btnSplash, "Ad is loading...");
        }
    }

    public showDebuggerUI() {
        ATSDK.showDebuggerUI(Constant.DebugKEY);
    }

    public gotoAutoLoad(): void {
        cc.director.loadScene("AutoLoadAds");
    }

    private initSDK() {
        ATSDK.setChannel("Cocos_test_channel");
        ATSDK.setSubChannel("Cocos_test_subChannel");

        const customMap = {
            "appCustomKey1": "appCustomValue1",
            "appCustomKey2": "appCustomValue2"
        };
        ATSDK.initCustomMap(customMap);

        const customPlacementId = "";

        const placementCustomMap = {
            "placementCustomKey1": "placementCustomValue1",
            "placementCustomKey2": "placementCustomValue2"
        };
        ATSDK.setPlacementCustomMap(customPlacementId, placementCustomMap);

        ATSDK.setLogDebug(true);

        // ----------------------- GDPR start------------------------------
        /*ATSDK.getUserLocation(function (userLocation: string | number) {

            if (userLocation === ATSDK.kATUserLocationInEU) {
                if (ATSDK.getGDPRLevel() === ATSDK.UNKNOWN) {
                    ATSDK.showGDPRConsent(function () {
                        console.log("initSDK:  " + Constant.APPID + "     " + Constant.APPKEY);
                        ATSDK.initSDK(Constant.APPID, Constant.APPKEY);
                    });
                }
            }
        });*/
        // ----------------------- GDPR end------------------------------

        console.log("initSDK:  " + Constant.APPID + "     " + Constant.APPKEY);
        ATSDK.initSDK(Constant.APPID, Constant.APPKEY);
    }

    private initAD() {
        ATInterstitialSDK.loadAd(Constant.InterPlacementId);

        const setting = {};
        setting[ATBannerSDK.kATBannerAdLoadingExtraBannerAdSizeStruct] = ATBannerSDK.createLoadAdSize(cc.screen.windowSize.width, 300);
        setting[ATBannerSDK.kATBannerAdAdaptiveWidth] = cc.screen.windowSize.width;
        setting[ATBannerSDK.kATBannerAdAdaptiveOrientation] = ATBannerSDK.kATBannerAdAdaptiveOrientationPortrait;
        ATBannerSDK.loadAd(Constant.BannerPlacementId, setting);

        ATRewardedVideoSDK.loadAd(Constant.RewardedPlacementId);
        // 加载原生广告时需要传入广告展示的宽高
        // 特别说明：如果是原生模板广告，传入的size跟后面展示的 nativeAdViewProperty.parent = size最好要一致，不然可能出现裁剪或显示不全的问题。
        ATNativeSDK.loadAd(Constant.NativePlacementId, ATNativeSDK.createLoadAdSize(cc.screen.windowSize.width, cc.screen.windowSize.width * 4/5));
        ATSplashSDK.loadAd(Constant.SplashPlacementId);
    }

    private initListener = () => {
        ATBannerSDK.setAdListener(this.BannerAdListener);
        ATNativeSDK.setAdListener(this.NativeAdListener);
        ATRewardedVideoSDK.setAdListener(this.RewardedVideoListener);
        ATInterstitialSDK.setAdListener(this.InterstitialListener);
        ATSplashSDK.setAdListener(this.SplashAdListener);
    }

    private setAdStatusText(btn: Button, text: string) {
        let label = btn.node.getChildByName("Label-status").getComponent(cc.Label);
        if (label) {
            label.string = text;
        }
    }


}


