//
//  ATSplashAdWrapper.m
//  NewProject-mobile
//
//  Created by TopOn技术支持 on 2024/11/18.
//

#import "ATSplashAdWrapper.h"
#import <AnyThinkSDK/AnyThinkSDK.h>

// 展示场景ID
static NSString *const ATCocos_kSplashSceneIDKey = @"ATCocos_SplashSceneIDKey";
// 展示自定义透传字符串
static NSString *const ATCocos_kSplashCustomShowExtKey = @"ATCocos_SplashCustomShowExtKey";
// 底部图片在xcode xcassets文件中的名称
static NSString *const ATCocos_kSplashBottomImageNameInXcodeProjKey = @"ATCocos_SplashBottomImageNameInXcodeProjKey";
// 开屏横屏底部视图高度
static NSString *const ATCocos_kSplashBottomLandscapeHeight = @"ATCocos_SplashBottomLandscapeHeight";
// 开屏竖屏底部视图高度
static NSString *const ATCocos_kSplashBottomPortraitHeight = @"ATCocos_SplashBottomPortraitHeight";
// 开屏跳过时间，部分平台支持
static NSString *const ATCocos_kSplashExtraCountdownKey = @"ATCocos_SplashBottomPortraitHeight";

// 是否启用开发者自定义跳过按钮，传入了值就启用
static NSString *const ATCocos_kSplashCustomSkipButtonUseageKey = @"ATCocos_SplashCustomSkipButtonUseageKey";
// 自定义跳过按钮颜色，Hex字符串
static NSString *const ATCocos_kSplashCustomSkipButtonColorKey = @"ATCocos_SplashCustomSkipButtonColorKey";
// 自定义跳过按钮x位置
static NSString *const ATCocos_kSplashCustomSkipButtonPositionXKey = @"ATCocos_SplashCustomSkipButtonPositionXKey";
// 自定义跳过按钮y位置
static NSString *const ATCocos_kSplashCustomSkipButtonPositionYKey = @"ATCocos_kSplashCustomSkipButtonPositionKey";
// 自定义跳过按钮宽度
static NSString *const ATCocos_kSplashCustomSkipButtonWidthKey = @"ATCocos_SplashCustomSkipButtonWidthKey";
// 自定义跳过按钮高度
static NSString *const ATCocos_kSplashCustomSkipButtonHeightKey = @"ATCocos_SplashCustomSkipButtonHeightKey";
// 自定义跳过按钮字体颜色，Hex字符串
static NSString *const ATCocos_kSplashCustomSkipButtonTextColorKey = @"ATCocos_SplashCustomSkipButtonTextColorKey";
// 自定义跳过按钮字体大小
static NSString *const ATCocos_kSplashCustomSkipButtonFontKey = @"ATCocos_SplashCustomSkipButtonFontKey";
// 自定义跳过按钮圆角程度
static NSString *const ATCocos_kSplashCustomSkipButtonCornerRadiusKey = @"ATCocos_SplashCustomSkipButtonCornerRadiusKey";

static NSString *const kDelegatesLoadedKey = @"SplashLoaded";
static NSString *const kDelegatesLoadFailedKey = @"SplashLoadFail";
static NSString *const kDelegatesShowKey = @"SplashAdShow";
static NSString *const kDelegatesCloseKey = @"SplashClose";
static NSString *const kDelegatesClickKey = @"SplashClick";
static NSString *const kDelegatesLoadTimeoutKey = @"SplashLoadTimeout";
static NSString *const kDelegatesRevenueKey = @"SplashRevenue";

// 广告源-竞价
static NSString *const kDelegatesBiddingAttemptKey = @"SplashBiddingAttempt";
static NSString *const kDelegatesBiddingFilledKey = @"SplashBiddingFilled";
static NSString *const kDelegatesBiddingFailKey = @"SplashBiddingFail";
// 广告源-普通
static NSString *const kDelegatesAttempKey = @"SplashAttemp";
static NSString *const kDelegatesLoadFilledKey = @"SplashLoadFilled";
/** 广告源维度加载失败，与 kDelegatesLoadFailedKey（广告位维度）区分 */
static NSString *const kDelegatesAdSourceLoadFailKey = @"SplashAdSourceLoadFail";



@interface ATSplashAdWrapper() <ATSplashDelegate>
 

@end

@implementation ATSplashAdWrapper

+ (instancetype)sharedWrapper {
    static ATSplashAdWrapper *sharedWrapper = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedWrapper = [[ATSplashAdWrapper alloc] init];
    });
    return sharedWrapper;
}

+ (void)loadSplashWithPlacementID:(NSString *)placementID extra:(NSString *)extraJsonStr {
    NSLog(@"ATSplashAdWrapper::loadSplashWithPlacementID:%@ extra:%@", placementID, extraJsonStr);
    NSDictionary *extra = nil;
    UIImageView * bottomImageView = nil;
    if (extraJsonStr != nil) {
        NSDictionary *extraDict = [NSJSONSerialization JSONObjectWithString:extraJsonStr options:NSJSONReadingAllowFragments error:nil];
        NSLog(@"loadSplashWithPlacementID extraDict = %@", extraDict);
         
        id btmImgName = extraDict[ATCocos_kSplashBottomImageNameInXcodeProjKey];
        if ([btmImgName isKindOfClass:[NSString class]] && btmImgName != nil) {
            // 根据图片名称创建底部视图
            NSString * landH = extraDict[ATCocos_kSplashBottomLandscapeHeight];
            NSString * portraitH = extraDict[ATCocos_kSplashBottomPortraitHeight];
            
            UIInterfaceOrientation deviceOrientaion = [self currentInterfaceOrientation];
            BOOL landscape = UIInterfaceOrientationIsLandscape(deviceOrientaion);
            bottomImageView = [[UIImageView alloc] initWithFrame:CGRectMake(.0f, .0f, landscape ? [landH floatValue] : UIScreen.mainScreen.bounds.size.width, landscape ? UIScreen.mainScreen.bounds.size.height : [portraitH floatValue])];
            bottomImageView.image = [UIImage imageNamed:btmImgName];
        }
    }
    NSLog(@"loadSplashExtra = %@", extra);
    [[ATAdManager sharedManager] loadADWithPlacementID:placementID
                                                 extra:[extra isKindOfClass:[NSDictionary class]] ? extra : nil
                                              delegate:[ATSplashAdWrapper sharedWrapper]
                                         containerView:bottomImageView];
}
 
+ (BOOL)splashReadyForPlacementID:(NSString*)placementID {
    NSLog(@"ATSplashAdWrapper::splashReadyForPlacementID:%@", placementID);
    return [[ATAdManager sharedManager] splashReadyForPlacementID:placementID];
}

+ (void)entryAdScenarioWithPlacementID:(NSString*)placementID scenarioID:(NSString*)scenarioID{
    NSLog(@"Cocos: ATSplashAdWrapper 🔥🔥entryAdScenarioWithPlacementID::array = %@ scenarioID:%@", placementID,scenarioID);
    [[ATAdManager sharedManager] entrySplashScenarioWithPlacementID:placementID scene:scenarioID];
}

+ (NSString *)checkAdStatus:(NSString *)placementID {
    ATCheckLoadModel *checkLoadModel = [[ATAdManager sharedManager] checkSplashLoadStatusForPlacementID:placementID];
    NSMutableDictionary *statusDict = [NSMutableDictionary dictionary];
    statusDict[@"isLoading"] = @(checkLoadModel.isLoading);
    statusDict[@"isReady"] = @(checkLoadModel.isReady);
    statusDict[@"adInfo"] = checkLoadModel.adOfferInfo;
    NSLog(@"ATSplashAdWrapper::statusDict = %@", statusDict);
    return statusDict.jsonFilterLoadModelString_AnyThinkJS;
}

+ (void)showSplashWithPlacementID:(NSString *)placementID scene:(NSString *)scene {
    NSLog(@"ATSplashAdWrapper::showSplashWithPlacementID:%@ scene:%@", placementID, scene);
    ATShowConfig *showConfig = [[ATShowConfig alloc] initWithScene:scene showCustomExt:@""];
    [[ATAdManager sharedManager] showSplashWithPlacementID:placementID config:showConfig window:[UIApplication sharedApplication].keyWindow inViewController:[UIApplication sharedApplication].delegate.window.rootViewController extra:nil delegate:[ATSplashAdWrapper sharedWrapper]];
}

+ (void)showSplashWithPlacementID:(NSString *)placementID showExtra:(NSString *)extraJsonStr {
    NSLog(@"ATSplashAdWrapper::showSplashWithPlacementID:%@ showExtra:%@", placementID, extraJsonStr);
    ATShowConfig *showConfig = nil;
    
    NSMutableDictionary *mutableDict = [NSMutableDictionary dictionary];
    
    if (extraJsonStr != nil) {
         
        NSDictionary *extraDict = [NSJSONSerialization JSONObjectWithString:extraJsonStr options:NSJSONReadingAllowFragments error:nil];
        NSLog(@"showSplashWithPlacementID extraDict = %@", extraDict);
        
        if (extraDict[ATCocos_kSplashCustomSkipButtonUseageKey]) {
            
            UIButton * skipButton = [UIButton buttonWithType:UIButtonTypeCustom];
            
            skipButton.backgroundColor = [UIColor colorWithHexString:extraDict[ATCocos_kSplashCustomSkipButtonColorKey]];
            
            if ([self checkSplashCustomButtonValues:extraDict]) {
                skipButton.frame = CGRectMake([extraDict[ATCocos_kSplashCustomSkipButtonPositionXKey] floatValue], [extraDict[ATCocos_kSplashCustomSkipButtonPositionYKey] floatValue], [extraDict[ATCocos_kSplashCustomSkipButtonWidthKey] floatValue], [extraDict[ATCocos_kSplashCustomSkipButtonHeightKey] floatValue]);
            }else {
                //使用默认位置
                skipButton.frame = CGRectMake([UIScreen mainScreen].bounds.size.width - 80 - 20, 50, 80, 21);
            }
            
            if (extraDict[ATCocos_kSplashCustomSkipButtonCornerRadiusKey]) {
                skipButton.layer.cornerRadius = [extraDict[ATCocos_kSplashCustomSkipButtonCornerRadiusKey] floatValue];
            }else {
                skipButton.layer.cornerRadius = 10.5;
            }
            if (extraDict[ATCocos_kSplashCustomSkipButtonTextColorKey]) {
                skipButton.titleLabel.textColor = [UIColor colorWithHexString:extraDict[ATCocos_kSplashCustomSkipButtonTextColorKey]];
            }else {
                skipButton.titleLabel.textColor = [UIColor grayColor];
            }
            if (extraDict[ATCocos_kSplashCustomSkipButtonFontKey]) {
                skipButton.titleLabel.font = [UIFont systemFontOfSize:[extraDict[ATCocos_kSplashCustomSkipButtonFontKey] floatValue]];
            }else {
                skipButton.titleLabel.font = [UIFont systemFontOfSize:14];
            }
        }
        NSString * sceneID = extraDict[ATCocos_kSplashSceneIDKey];
        NSString * showCustomExt = extraDict[ATCocos_kSplashCustomShowExtKey];
        showConfig = [[ATShowConfig alloc] initWithScene:sceneID showCustomExt:showCustomExt];
    }
    
    [[ATAdManager sharedManager] showSplashWithPlacementID:placementID config:showConfig window:[UIApplication sharedApplication].keyWindow inViewController:[UIApplication sharedApplication].delegate.window.rootViewController extra:mutableDict delegate:[ATSplashAdWrapper sharedWrapper]];
}

#pragma mark - 广告源 级别回调
- (void)didStartLoadingADSourceWithPlacementID:(NSString *)placementID extra:(NSDictionary*)extra {
    NSLog(@"ATSplashAdWrapper::didStartLoadingADSourceWithPlacementID:%@---extra:%@", placementID,extra);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesAttempKey], placementID, [extra jsonFilterString_AnyThinkJS]]];
    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesAttempKey], placementID, [extra jsonFilterString_AnyThinkJS]]];
        });
    }
}

- (void)didFinishLoadingADSourceWithPlacementID:(NSString *)placementID extra:(NSDictionary*)extra {
    NSLog(@"ATSplashAdWrapper::didFinishLoadingADSourceWithPlacementID:%@---extra:%@", placementID,extra);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesLoadFilledKey], placementID, [extra jsonFilterString_AnyThinkJS]]];
    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesLoadFilledKey], placementID, [extra jsonFilterLoadModelString_AnyThinkJS]]];
        });
    }
}

- (void)didFailToLoadADSourceWithPlacementID:(NSString*)placementID extra:(NSDictionary*)extra error:(NSError*)error {
    NSLog(@"ATSplashAdWrapper::didFailToLoadADSourceWithPlacementID:%@---error:%@", placementID,error);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@', '%@')", self.delegates[kDelegatesAdSourceLoadFailKey], placementID, error.userInfo[NSLocalizedDescriptionKey], [extra jsonFilterLoadModelString_AnyThinkJS]]];
    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@', '%@')", self.delegates[kDelegatesAdSourceLoadFailKey], placementID, error.userInfo[NSLocalizedDescriptionKey], [extra jsonFilterLoadModelString_AnyThinkJS]]];

        });
    }
}

// bidding
- (void)didStartBiddingADSourceWithPlacementID:(NSString *)placementID extra:(NSDictionary*)extra {
    NSLog(@"ATSplashAdWrapper::didStartBiddingADSourceWithPlacementID:%@---extra:%@", placementID,extra);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesBiddingAttemptKey], placementID, [extra jsonFilterLoadModelString_AnyThinkJS]]];

    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesBiddingAttemptKey], placementID, [extra jsonFilterLoadModelString_AnyThinkJS]]];
        });
    }
}

- (void)didFinishBiddingADSourceWithPlacementID:(NSString *)placementID extra:(NSDictionary*)extra {
    NSLog(@"ATSplashAdWrapper::didFinishBiddingADSourceWithPlacementID:%@--extra:%@", placementID,extra);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesBiddingFilledKey], placementID, [extra jsonFilterLoadModelString_AnyThinkJS]]];
    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesBiddingFilledKey], placementID, [extra jsonFilterLoadModelString_AnyThinkJS]]];
        });
    }
}

- (void)didFailBiddingADSourceWithPlacementID:(NSString*)placementID extra:(NSDictionary*)extra error:(NSError*)error {
    NSLog(@"ATSplashAdWrapper::didFailBiddingADSourceWithPlacementID:%@--error:%@", placementID,error);
     
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@', '%@')", self.delegates[kDelegatesBiddingFailKey], placementID, error.userInfo[NSLocalizedDescriptionKey], [extra jsonFilterLoadModelString_AnyThinkJS]]];
    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@', '%@')", self.delegates[kDelegatesBiddingFailKey], placementID, error.userInfo[NSLocalizedDescriptionKey], [extra jsonFilterLoadModelString_AnyThinkJS]]];

        });
    }
}

#pragma mark - 广告位 级别回调
- (void)didFinishLoadingSplashADWithPlacementID:(NSString *)placementID isTimeout:(BOOL)isTimeout {
    NSLog(@"didFinishLoadingSplashADWithPlacementID:isTimeout:%d",isTimeout);
    
    if ([NSThread isMainThread]) {
        if (isTimeout) {
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@')", self.delegates[kDelegatesLoadTimeoutKey], placementID]];
        }else {
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@')", self.delegates[kDelegatesLoadedKey], placementID]];
        }
    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            if (isTimeout) {
                [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@')", self.delegates[kDelegatesLoadTimeoutKey], placementID]];
            }else {
                [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@')", self.delegates[kDelegatesLoadedKey], placementID]];
            }
        });
    }
}

- (void)didTimeoutLoadingSplashADWithPlacementID:(NSString *)placementID {
    NSLog(@"didTimeoutLoadingSplashADWithPlacementID:%@",placementID);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@')", self.delegates[kDelegatesLoadTimeoutKey], placementID]];
    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@')", self.delegates[kDelegatesLoadTimeoutKey], placementID]];
        });
    }
}

- (void)didFailToLoadADWithPlacementID:(NSString *)placementID error:(NSError *)error {
    NSLog(@"ATSplashAdWrapper::didFailToLoadADWithPlacementID--error:%@",error);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesLoadFailedKey], placementID,error.userInfo[NSLocalizedDescriptionKey]]];
    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesLoadFailedKey], placementID,error.userInfo[NSLocalizedDescriptionKey]]];
        });
    }
}

- (void)didFinishLoadingADWithPlacementID:(NSString *)placementID {
    NSLog(@"ATSplashAdWrapper::didFinishLoadingADWithPlacementID:%@",placementID);
}

- (void)didRevenueForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra { 
    NSLog(@"ATSplashAdWrapper::didFinishLoadingADWithPlacementID:%@ with extra: %@", placementID,extra);
//    if ([NSThread isMainThread]) {
//        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesRevenueKey], placementID,[extra jsonFilterLoadModelString_AnyThinkJS]]];
//    }else {
//        dispatch_async(dispatch_get_main_queue(), ^{
//            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesRevenueKey], placementID,[extra jsonFilterLoadModelString_AnyThinkJS]]];
//        });
//    }
}

- (void)splashDeepLinkOrJumpForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra result:(BOOL)success {
    NSLog(@"ATSplashAdWrapper::splashDeepLinkOrJumpForPlacementID:placementID:%@ with extra: %@, success:%@", placementID,extra, success ? @"YES" : @"NO");
}

- (void)splashDidClickForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    NSLog(@"ATSplashAdWrapper::splashDidClickForPlacementID:%@ extra:%@",placementID,extra);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesClickKey], placementID,[extra jsonFilterString_AnyThinkJS]]];
    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesClickKey], placementID,[extra jsonFilterString_AnyThinkJS]]];
        });
    }
}

- (void)splashWillCloseForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    NSLog(@"ATSplashAdWrapper::splashWillCloseForPlacementID:%@ extra:%@",placementID,extra);
}

- (void)splashDidCloseForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    NSLog(@"ATSplashAdWrapper::splashDidCloseForPlacementID:%@ extra:%@",placementID,extra);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesCloseKey], placementID,[extra jsonFilterString_AnyThinkJS]]];
    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesCloseKey], placementID,[extra jsonFilterString_AnyThinkJS]]];
        });
    }
}

- (void)splashDidShowForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    NSLog(@"ATSplashAdWrapper::splashDidShowForPlacementID:%@ extra:%@",placementID,extra);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesShowKey], placementID,[extra jsonFilterString_AnyThinkJS]]];
    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesShowKey], placementID,[extra jsonFilterString_AnyThinkJS]]];
        });
    }
}

- (void)splashZoomOutViewDidClickForPlacementID:(NSString*)placementID extra:(NSDictionary *) extra {
    NSLog(@"ATSplashAdWrapper::splashZoomOutViewDidClickForPlacementID:%@ extra:%@",placementID,extra);
}

- (void)splashZoomOutViewDidCloseForPlacementID:(NSString*)placementID extra:(NSDictionary *)extra {
    NSLog(@"ATSplashAdWrapper::splashZoomOutViewDidCloseForPlacementID:%@ extra:%@",placementID,extra);
}

- (void)splashDetailDidClosedForPlacementID:(NSString*)placementID extra:(NSDictionary *) extra {
    NSLog(@"ATSplashAdWrapper::splashDetailDidClosedForPlacementID:%@ extra:%@",placementID,extra);
}

- (void)splashDidShowFailedForPlacementID:(NSString*)placementID error:(NSError *)error extra:(NSDictionary *)extra {
    NSLog(@"ATSplashAdWrapper::splashDidShowFailedForPlacementID:%@ error:%@ extra:%@",placementID,error,extra);
}

- (void)splashCountdownTime:(NSInteger)countdown forPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    NSLog(@"ATSplashAdWrapper::splashCountdownTime:%ld forPlacementID:%@",countdown,placementID);
}

- (void)splashDetailWillShowForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    NSLog(@"ATSplashAdWrapper::splashDetailWillShowForPlacementID:%@ extra:%@",placementID,extra);
}

#pragma mark - Tools
/// 创建开屏底部视图，判断屏幕方向
+ (UIInterfaceOrientation)currentInterfaceOrientation {
    if (@available(iOS 13.0, *)) {
        UIWindow *firstWindow = [[[UIApplication sharedApplication] windows] firstObject];
        if (firstWindow == nil) { return UIInterfaceOrientationUnknown; }
        
        UIWindowScene *windowScene = firstWindow.windowScene;
        if (windowScene == nil){ return UIInterfaceOrientationUnknown; }
        
        return windowScene.interfaceOrientation;
    } else {
        return UIApplication.sharedApplication.statusBarOrientation;
    }
}

+ (BOOL)checkSplashCustomButtonValues:(NSDictionary *)extraDict {
    // 定义所需检查的所有键
    NSArray *requiredKeys = @[
        ATCocos_kSplashCustomSkipButtonPositionXKey,
        ATCocos_kSplashCustomSkipButtonPositionYKey,
        ATCocos_kSplashCustomSkipButtonWidthKey,
        ATCocos_kSplashCustomSkipButtonHeightKey
    ];
    
    // 检查每个键是否存在且值不为nil
    for (NSString *key in requiredKeys) {
        if (![extraDict objectForKey:key]) {
            return NO;
        }
    }
    return YES;
}

@end
