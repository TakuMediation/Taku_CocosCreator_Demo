import {ATRewardedVideoAutoAdSDK} from "db://assets/script/AnyThinkAds/ATRewardedAutoVideo";
import {ATInterstitialAutoAdSDK} from "db://assets/script/AnyThinkAds/ATInterstitialAuto";
import {Constant} from "db://assets/script/Constant";

import * as cc from 'cc';
import {_decorator, Button, Component} from 'cc';

const {ccclass, property} = _decorator;

@ccclass('AutoLoadAdsSceneScript')
export class AutoLoadAdsSceneScript extends Component {

    @property(Button)
    public btnRewarded: Button = null;
    @property(Button)
    public btnInter: Button = null;

    private TAG: string = "anythink++++++++++ ";

    private AutoRewardedVideoListener = {
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

    private AutoInterstitialListener = {
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
        console.log("auto start");
        this.initListener();
        this.loadAd();
    }

    public gotoMain(): void {
        this.onDestroy();
        cc.director.loadScene("Main");
    }

    onDestroy() {
        ATRewardedVideoAutoAdSDK.removePlacementId(Constant.AutoRewardedPlacementId);
        ATInterstitialAutoAdSDK.removePlacementId(Constant.AutoInterPlacementId);
    }

    public showAutoRewardedAds(): void {
        ATRewardedVideoAutoAdSDK.entryAdScenario(Constant.AutoRewardedPlacementId, Constant.YourScenarioId)
        if (ATRewardedVideoAutoAdSDK.hasAdReady(Constant.AutoRewardedPlacementId)) {
            ATRewardedVideoAutoAdSDK.showAdInScenario(Constant.AutoRewardedPlacementId, Constant.YourScenarioId);
        }
    }

    public showAutoInterstitialAds(): void {
        ATInterstitialAutoAdSDK.entryAdScenario(Constant.AutoInterPlacementId, Constant.YourScenarioId);
        if (ATInterstitialAutoAdSDK.hasAdReady(Constant.AutoInterPlacementId)) {
            ATInterstitialAutoAdSDK.showAdInScenario(Constant.AutoInterPlacementId, Constant.YourScenarioId);
        }
    }

    private initListener() {
        console.log("auto initListener");
        ATRewardedVideoAutoAdSDK.setAdListener(this.AutoRewardedVideoListener);
        ATInterstitialAutoAdSDK.setAdListener(this.AutoInterstitialListener);
    }

    private loadAd() {
        console.log("auto loadAd");
        let rewardedIds: string[] = [Constant.AutoRewardedPlacementId];
        let InterstitialIds: string[] = [Constant.AutoInterPlacementId];
        ATRewardedVideoAutoAdSDK.addPlacementIds(rewardedIds);
        ATInterstitialAutoAdSDK.addPlacementIds(InterstitialIds);
    }

    private setAdStatusText(btn: Button, text: string) {
        let label = btn.node.getChildByName("Label-status").getComponent(cc.Label);
        if (label) {
            label.string = text;
        }
    }
}


