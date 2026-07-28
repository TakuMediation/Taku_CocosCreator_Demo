//
//  ATInterstitialAutoAdWrapper.m
//  AnyThinkSDKDemo
//
//  Created by Martin Lau on 2020/4/16.
//  Copyright © 2020 AnyThink. All rights reserved.
//

#import "ATInterstitialAutoAdWrapper.h"
#import <AnyThinkSDK/AnyThinkSDK.h>


@interface ATInterstitialAutoAdWrapper()<ATAdLoadingDelegate,ATInterstitialDelegate>

@end

static NSString *const kDelegatesLoadedKey = @"InterstitialAutoAdLoaded";
static NSString *const kDelegatesLoadFailedKey = @"InterstitialAutoAdLoadFail";
static NSString *const kDelegatesShowKey = @"InterstitialAdShow";
static NSString *const kDelegatesVideoStartKey = @"InterstitialAutoAdPlayStart";
static NSString *const kDelegatesVideoEndKey = @"InterstitialAutoAdPlayEnd";
static NSString *const kDelegatesCloseKey = @"InterstitialAutoAdClose";
static NSString *const kDelegatesClickKey = @"InterstitialAutoAdClick";
static NSString *const kDelegatesFailedToPlayKey = @"InterstitialAutoAdPlayFail";
static NSString *const kDelegatesFailedToShowKey = @"InterstitialAutoAdAdShow";


@implementation ATInterstitialAutoAdWrapper
+(instancetype) sharedWrapper {
    static ATInterstitialAutoAdWrapper *sharedWrapper = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedWrapper = [[ATInterstitialAutoAdWrapper alloc] init];
    });
    return sharedWrapper;
}

#pragma mark - auto

+(void) addAutoLoadAdPlacementID:(NSString*)placementID{
    
    
    if (placementID == nil) {
        return;
    }
    
    
    [ATInterstitialAutoAdManager sharedInstance].delegate = [ATInterstitialAutoAdWrapper sharedWrapper];
    
    NSArray *placementIDArray = [self jsonStrToArray:placementID];
    
    NSLog(@"ATInterstitialAutoAdWrapper:addAutoLoadAdPlacementID--%@---placementIDArray:%@",placementID,placementIDArray);
    
    [[ATInterstitialAutoAdManager sharedInstance] addAutoLoadAdPlacementIDArray:placementIDArray];
}

+(void) removeAutoLoadAdPlacementID:(NSString*)placementID{
    
    if (placementID == nil) {
        return;
    }
    
    NSArray *placementIDArray = [self jsonStrToArray:placementID];
    NSLog(@"ATInterstitialAutoAdWrapper:removeAutoLoadAdPlacementID--%@---placementIDArray:%@",placementID,placementIDArray);
    
    [[ATInterstitialAutoAdManager sharedInstance] removeAutoLoadAdPlacementIDArray:placementIDArray];
}

+(BOOL) autoLoadInterstitialAdReadyForPlacementID:(NSString*)placementID {
    NSLog(@"ATInterstitialAutoAdWrapper: autoLoadInterstitialAdReadyForPlacementID--%@---%d",placementID,[[ATInterstitialAutoAdManager sharedInstance] autoLoadInterstitialReadyForPlacementID:placementID]);
    return [[ATInterstitialAutoAdManager sharedInstance] autoLoadInterstitialReadyForPlacementID:placementID];
}

+(NSString*) checkAutoAdStatus:(NSString *)placementID {
    
    ATCheckLoadModel *checkLoadModel = [[ATInterstitialAutoAdManager sharedInstance] checkInterstitialLoadStatusForPlacementID:placementID];
    NSMutableDictionary *statusDict = [NSMutableDictionary dictionary];
    statusDict[@"isLoading"] = @(checkLoadModel.isLoading);
    statusDict[@"isReady"] = @(checkLoadModel.isReady);
    statusDict[@"adInfo"] = checkLoadModel.adOfferInfo;
    NSLog(@"ATInterstitialAutoAdWrapper::checkAutoAdStatus statusDict = %@", statusDict);
    return statusDict.jsonFilterLoadModelString_AnyThinkJS;
}

+(NSString*) getAutoValidAdCaches{
//    NSArray *array = [[ATInterstitialAutoAdManager sharedInstance] checkValidAdCaches];
//    NSLog(@"Unity: getAutoValidAdCaches::array = %@", array);
//    return array.jsonString;
    
    return @"";
}

+(void) setAutoLocalExtra:(NSString*)placementID customDataJSONString:(NSString*)customDataJSONString{
    
    
    NSLog(@"ATInterstitialAutoAdWrapper::setAutoLocalExtra = %@ customDataJSONString = %@", placementID,customDataJSONString);

    NSDictionary *extra = nil;

    if ([customDataJSONString isKindOfClass:[NSString class]]) {
        
        NSDictionary *extraDict = [NSJSONSerialization JSONObjectWithData:[customDataJSONString dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingAllowFragments error:nil];
        
        if ([extraDict isKindOfClass:[NSDictionary class]]) {
            
            if (extraDict[kLoadUseRVAsInterstitialKey] != nil) {
                extra = @{
                    kATInterstitialExtraUsesRewardedVideo:@([extraDict[kLoadUseRVAsInterstitialKey] boolValue])
                };
            }
            
            [[ATInterstitialAutoAdManager sharedInstance] setLocalExtra:[extra isKindOfClass:[NSDictionary class]] ? extra : nil placementID:placementID];
        };
    }
}

+(void) entryAutoAdScenarioWithPlacementID:(NSString*)placementID scenarioID:(NSString*)scenarioID{
    NSLog(@"ATInterstitialAutoAdWrapper::entryAutoAdScenarioWithPlacementID = %@ scenarioID = %@", placementID,scenarioID);

    [[ATInterstitialAutoAdManager sharedInstance] entryAdScenarioWithPlacementID:placementID scenarioID:scenarioID];
}

+(void) showAutoInterstitialAdWithPlacementID:(NSString*)placementID scenarioID:(NSString*)scenarioID {
    
    NSLog(@"ATInterstitialAutoAdWrapper::showAutoInterstitialAdWithPlacementID = %@ scenarioID = %@", placementID,scenarioID);
    
    [[ATInterstitialAutoAdManager sharedInstance] showAutoLoadInterstitialWithPlacementID:placementID scene:scenarioID inViewController:[UIApplication sharedApplication].delegate.window.rootViewController delegate:[ATInterstitialAutoAdWrapper sharedWrapper]];
}


#pragma mark - delegates
-(void) didFinishLoadingADWithPlacementID:(NSString *)placementID {
    NSLog(@"ATInterstitialAutoAdWrapper::didFinishLoadingADWithPlacementID:%@", placementID);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@')", self.delegates[kDelegatesLoadedKey], placementID]];

    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@')", self.delegates[kDelegatesLoadedKey], placementID]];

        });
    }

}

-(void) didFailToLoadADWithPlacementID:(NSString*)placementID error:(NSError*)error {
    NSLog(@"ATInterstitialAutoAdWrapper::didFailToLoadADWithPlacementID:%@ error:%@", placementID, error);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesLoadFailedKey], placementID, error]];

    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesLoadFailedKey], placementID, error]];

        });
    }

}

-(void) interstitialDidShowForPlacementID:(NSString *)placementID extra:(NSDictionary *)extra {
    NSLog(@"ATInterstitialAutoAdWrapper::interstitialDidShowForPlacementID:%@ extra:%@", placementID, extra);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesShowKey], placementID, [extra jsonFilterString_AnyThinkJS]]];

    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesShowKey], placementID, [extra jsonFilterString_AnyThinkJS]]];

        });
    }

}

-(void) interstitialFailedToShowForPlacementID:(NSString*)placementID error:(NSError*)error extra:(NSDictionary *)extra {
   
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@', '%@')", self.delegates[kDelegatesLoadFailedKey], placementID, error.userInfo[NSLocalizedDescriptionKey], [extra jsonFilterString_AnyThinkJS]]];

    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@', '%@')", self.delegates[kDelegatesFailedToShowKey], placementID, error.userInfo[NSLocalizedDescriptionKey], [extra jsonFilterString_AnyThinkJS]]];

        });
    }

}

-(void) interstitialDidFailToPlayVideoForPlacementID:(NSString*)placementID error:(NSError*)error extra:(NSDictionary*)extra {
    NSLog(@"ATInterstitialAutoAdWrapper::interstitialDidFailToPlayVideoForPlacementID:%@ error:%@ extra:%@", placementID, error, extra);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@', '%@')", self.delegates[kDelegatesFailedToPlayKey], placementID, error.userInfo[NSLocalizedDescriptionKey], [extra jsonFilterString_AnyThinkJS]]];

    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@', '%@')", self.delegates[kDelegatesFailedToPlayKey], placementID, error.userInfo[NSLocalizedDescriptionKey], [extra jsonFilterString_AnyThinkJS]]];

        });
    }

}

-(void) interstitialDidStartPlayingVideoForPlacementID:(NSString*)placementID extra:(NSDictionary *)extra {
    NSLog(@"ATInterstitialAutoAdWrapper::interstitialDidStartPlayingVideoForPlacementID:%@ extra:%@", placementID, extra);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesVideoStartKey], placementID, [extra jsonFilterString_AnyThinkJS]]];

    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesVideoStartKey], placementID, [extra jsonFilterString_AnyThinkJS]]];

        });
    }

}

-(void) interstitialDidEndPlayingVideoForPlacementID:(NSString*)placementID extra:(NSDictionary *)extra {
    NSLog(@"ATInterstitialAutoAdWrapper::interstitialDidEndPlayingVideoForPlacementID:%@ extra:%@", placementID, extra);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesVideoEndKey], placementID, [extra jsonFilterString_AnyThinkJS]]];

    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesVideoEndKey], placementID, [extra jsonFilterString_AnyThinkJS]]];
        });
    }

}

-(void) interstitialDidCloseForPlacementID:(NSString*)placementID extra:(NSDictionary *)extra {
    NSLog(@"ATInterstitialAutoAdWrapper::interstitialDidCloseForPlacementID:%@ extra:%@", placementID, extra);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesCloseKey], placementID, [extra jsonFilterString_AnyThinkJS]]];
    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesCloseKey], placementID, [extra jsonFilterString_AnyThinkJS]]];
        });
    }
}

-(void) interstitialDidClickForPlacementID:(NSString*)placementID extra:(NSDictionary *)extra {
    NSLog(@"ATInterstitialAutoAdWrapper::interstitialDidClickForPlacementID:%@ extra:%@", placementID, extra);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesClickKey], placementID, [extra jsonFilterString_AnyThinkJS]]];

    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesClickKey], placementID, [extra jsonFilterString_AnyThinkJS]]];
        });
    }

    
}


@end
