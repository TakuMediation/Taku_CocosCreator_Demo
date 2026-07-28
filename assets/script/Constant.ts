import { _decorator, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Constant')
export class Constant {
    public static APPID: string;
    public static APPKEY: string;
    public static DebugKEY: string;
    public static RewardedPlacementId: string;
    public static InterPlacementId: string;
    public static AutoRewardedPlacementId: string;
    public static AutoInterPlacementId: string;
    public static BannerPlacementId: string;
    public static NativePlacementId: string;
    public static SplashPlacementId: string;
    public static YourScenarioId: string;

    public static init() {
        if (sys.os === sys.OS.ANDROID) {
            Constant.APPID = 'a5aa1f9deda26d';
            Constant.APPKEY = '4f7b9ac17decb9babec83aac078742c7';
            Constant.DebugKEY = 'abbfb0a2699ff81561f6905a5c8585275fc166c4';
            Constant.RewardedPlacementId = 'b5b449fb3d89d7';
            Constant.InterPlacementId = 'b5baca53984692';
            Constant.BannerPlacementId = 'b5baca4f74c3d8';
            Constant.NativePlacementId = 'b5aa1fa2cae775';
            Constant.AutoRewardedPlacementId = 'b5b449fb3d89d7';
            Constant.AutoInterPlacementId = 'b5baca53984692';
            Constant.SplashPlacementId = 'b5bea7cc9a4497';
        } else if (sys.os === sys.OS.IOS) {
            Constant.APPID = 'a5b0e8491845b3';
            Constant.APPKEY = '7eae0567827cfe2b22874061763f30c9';
            Constant.DebugKEY = '99117a5bf26ca7a1923b3fed8e5371d3ab68c25c';
            Constant.RewardedPlacementId = 'b5b44a0f115321';
            Constant.InterPlacementId = 'b5bacad26a752a';
            Constant.BannerPlacementId = 'b5bacaccb61c29';
            Constant.NativePlacementId = 'b5b0f5663c6e4a';
            Constant.AutoRewardedPlacementId = 'b5fa2500639c86';
            Constant.AutoInterPlacementId = 'b5fa25016e80bd';
            Constant.SplashPlacementId = 'b5c22f0e5cc7a0';
        }
        Constant.YourScenarioId = 'your scenario id';
    }

    constructor() {
        Constant.init();
    }
}