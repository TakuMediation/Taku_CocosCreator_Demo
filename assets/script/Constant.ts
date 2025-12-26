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
            Constant.APPID = 'a62b013be01931';
            Constant.APPKEY = 'c3d0d2a9a9d451b07e62b509659f7c97';
            Constant.DebugKEY = 'ca1122ad6236476c3becda427059750dbe22ab0b';
            Constant.RewardedPlacementId = 'b62ecb800e1f84';
            Constant.InterPlacementId = 'b62b028b61c800';
            Constant.BannerPlacementId = 'b62b01a36e4572';
            Constant.NativePlacementId = 'b6305efb12d408';
            Constant.AutoRewardedPlacementId = 'b62ecb800e1f84';
            Constant.AutoInterPlacementId = 'b62b028b61c800';
            Constant.SplashPlacementId = 'b62b0272f8762f';
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