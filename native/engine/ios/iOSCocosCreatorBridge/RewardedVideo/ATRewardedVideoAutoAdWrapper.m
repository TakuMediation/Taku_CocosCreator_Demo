//
//  ATRewardedVideoAutoAdWrapper.m
//  AnyThinkSDKDemo
//
//  Created by Martin Lau on 2020/4/16.
//  Copyright © 2020 AnyThink. All rights reserved.
//

#import "ATRewardedVideoAutoAdWrapper.h"
#import <AnyThinkSDK/AnyThinkSDK.h>


@interface ATRewardedVideoAutoAdWrapper()<ATAdLoadingDelegate,ATRewardedVideoDelegate>

@end

static NSString *const kDelegatesLoadedKey = @"RewardedVideoAutoAdLoaded";
static NSString *const kDelegatesLoadFailedKey = @"RewardedVideoAutoAdLoadFail";
static NSString *const kDelegatesVideoStartKey = @"RewardedVideoAutoAdPlayStart";
static NSString *const kDelegatesVideoEndKey = @"RewardedVideoAutoAdPlayEnd";
static NSString *const kDelegatesCloseKey = @"RewardedVideoAutoAdClose";
static NSString *const kDelegatesClickKey = @"RewardedVideoAutoAdClick";
static NSString *const kDelegatesRewardedKey = @"RewardedVideoAutoAdReward";
static NSString *const kDelegatesFailedToPlayKey = @"RewardedVideoAutoAdPlayFail";



static NSString *const kDelegatesAgainPlayStartCallbackKey = @"RewardedVideoAutoAdAgainPlayStart";
static NSString *const kDelegatesAgainPlayEndCallbackKey = @"RewardedVideoAutoAdAgainPlayEnd";
static NSString *const kDelegatesAgainPlayFailCallbackKey = @"RewardedVideoAutoAdAgainPlayFail";
static NSString *const kDelegatesAgainClickCallbackKey = @"RewardedVideoAutoAdAgainClick";
static NSString *const kDelegatesAgainRewardCallbackKey = @"RewardedVideoAutoAdAgainReward";


//static NSString *const kShowExtraSceneKey = @"scenario";
@implementation ATRewardedVideoAutoAdWrapper
+(instancetype) sharedWrapper {
    static ATRewardedVideoAutoAdWrapper *sharedWrapper = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedWrapper = [[ATRewardedVideoAutoAdWrapper alloc] init];
    });
    return sharedWrapper;
}

#pragma mark - auto
+(void) addAutoLoadAdPlacementID:(NSString*)placementID{
    
    if (placementID == nil) {
        return;
    }
    
    NSLog(@"ATRewardedVideoAutoAdWrapper:addAutoLoadAdPlacementID--%@",placementID);

    [ATRewardedVideoAutoAdManager sharedInstance].delegate = [ATRewardedVideoAutoAdWrapper sharedWrapper];
    
    
    NSArray *placementIDArray = [self jsonStrToArray:placementID];
    
    NSLog(@"ATRewardedVideoAutoAdWrapper:addAutoLoadAdPlacementID--%@---placementIDArray:%@",placementID,placementIDArray);

    [[ATRewardedVideoAutoAdManager sharedInstance] addAutoLoadAdPlacementIDArray:placementIDArray];
}

+(void) removeAutoLoadAdPlacementID:(NSString*)placementID{
    NSLog(@"ATRewardedVideoAutoAdWrapper:removeAutoLoadAdPlacementID--%@",placementID);
    
    if (placementID == nil) {
        return;
    }
    
    NSArray *placementIDArray = [self jsonStrToArray:placementID];
    
    [[ATRewardedVideoAutoAdManager sharedInstance] removeAutoLoadAdPlacementIDArray:placementIDArray];
}

+(BOOL) autoLoadRewardedVideoReadyForPlacementID:(NSString*)placementID {
    NSLog(@"ATRewardedVideoAutoAdWrapper:autoLoadRewardedVideoReadyForPlacementID--%@--%d",placementID,[[ATRewardedVideoAutoAdManager sharedInstance] autoLoadRewardedVideoReadyForPlacementID:placementID]);
    return [[ATRewardedVideoAutoAdManager sharedInstance] autoLoadRewardedVideoReadyForPlacementID:placementID];
}

+(NSString*) getAutoValidAdCaches{
//    NSArray *array = [[ATRewardedVideoAutoAdManager sharedInstance] checkValidAdCaches];
//    NSLog(@"Unity: getAutoValidAdCaches::array = %@", array);
//    return array.jsonFilterString_AnyThinkJS;
    return @"";
}

+(NSString*) checkAutoAdStatus:(NSString *)placementID {
    
    ATCheckLoadModel *checkLoadModel = [[ATRewardedVideoAutoAdManager sharedInstance] checkRewardedVideoLoadStatusForPlacementID:placementID];
    NSMutableDictionary *statusDict = [NSMutableDictionary dictionary];
    statusDict[@"isLoading"] = @(checkLoadModel.isLoading);
    statusDict[@"isReady"] = @(checkLoadModel.isReady);
    statusDict[@"adInfo"] = checkLoadModel.adOfferInfo;
    NSLog(@"ATRewardedVideoAutoAdWrapper::checkAutoAdStatus = %@", statusDict);
    return statusDict.jsonFilterLoadModelString_AnyThinkJS;
}

+(void) setAutoLocalExtra:(NSString*)placementID customDataJSONString:(NSString*)customDataJSONString{
    NSLog(@"ATRewardedVideoAutoAdWrapper:setAutoLocalExtra::placementID = %@ customDataJSONString: %@", placementID,customDataJSONString);

    if ([customDataJSONString isKindOfClass:[NSString class]]) {
        NSMutableDictionary *extra = nil;

        NSDictionary *extraDict = [NSJSONSerialization JSONObjectWithData:[customDataJSONString dataUsingEncoding:NSUTF8StringEncoding] options:NSJSONReadingAllowFragments error:nil];
        
    
        if ([extraDict isKindOfClass:[NSDictionary class]]) {
                extra = [[NSMutableDictionary alloc] initWithDictionary:extraDict];
        
            
            if (![extra[kATAdLoadingExtraMediaExtraKey] isKindOfClass:[NSString class]]) {
                [extra removeObjectForKey:kATAdLoadingExtraMediaExtraKey];
            }
        };
        
        [[ATRewardedVideoAutoAdManager sharedInstance] setLocalExtra:[extra isKindOfClass:[NSMutableDictionary class]] ? extra : nil placementID:placementID];
    }
}

+(void) entryAutoAdScenarioWithPlacementID:(NSString*)placementID scenarioID:(NSString*)scenarioID{
    NSLog(@"ATRewardedVideoAutoAdWrapper:entryAdScenarioWithPlacementID::array = %@ scenarioID:%@", placementID,scenarioID);

    [[ATRewardedVideoAutoAdManager sharedInstance] entryAdScenarioWithPlacementID:placementID scenarioID:scenarioID];
}

+(void) showAutoRewardedVideoWithPlacementID:(NSString*)placementID scenarioID:(NSString*)scenarioID {
    
    NSLog(@"ATRewardedVideoAutoAdWrapper:showAutoRewardedVideoWithPlacementID = %@,scenarioID = %@", placementID,scenarioID);

    [[ATRewardedVideoAutoAdManager sharedInstance] showAutoLoadRewardedVideoWithPlacementID:placementID scene:scenarioID inViewController:[UIApplication sharedApplication].delegate.window.rootViewController delegate:[ATRewardedVideoAutoAdWrapper sharedWrapper]];
}

#pragma mark - delegates

-(void) didFinishLoadingADWithPlacementID:(NSString *)placementID {
    NSLog(@"ATRewardedVideoAutoAdWrapper::didFinishLoadingADWithPlacementID:%@", placementID);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@')", self.delegates[kDelegatesLoadedKey], placementID]];

    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@')", self.delegates[kDelegatesLoadedKey], placementID]];

        });
    }

}

-(void) didFailToLoadADWithPlacementID:(NSString*)placementID error:(NSError*)error {
    NSLog(@"ATRewardedVideoAutoAdWrapper::didFailToLoadADWithPlacementID:%@ error:%@", placementID, error);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesLoadFailedKey], placementID, error]];

    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesLoadFailedKey], placementID, error]];

        });
    }

}

-(void) rewardedVideoDidStartPlayingForPlacementID:(NSString*)placementID extra:(NSDictionary *)extra {
    NSLog(@"ATRewardedVideoAutoAdWrapper::rewardedVideoDidStartPlayingForPlacementID:%@ extra:%@", placementID, extra);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesVideoStartKey], placementID, [extra jsonFilterString_AnyThinkJS]]];

    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesVideoStartKey], placementID, [extra jsonFilterString_AnyThinkJS]]];

        });
    }

}

-(void) rewardedVideoDidEndPlayingForPlacementID:(NSString*)placementID extra:(NSDictionary *)extra {
    NSLog(@"ATRewardedVideoAutoAdWrapper::rewardedVideoDidEndPlayingForPlacementID:%@ extra:%@", placementID, extra);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesVideoEndKey], placementID, [extra jsonFilterString_AnyThinkJS]]];

    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesVideoEndKey], placementID, [extra jsonFilterString_AnyThinkJS]]];

        });
    }

}

-(void) rewardedVideoDidFailToPlayForPlacementID:(NSString*)placementID error:(NSError*)error extra:(NSDictionary *)extra {
    NSLog(@"ATRewardedVideoAutoAdWrapper::rewardedVideoDidFailToPlayForPlacementID:%@ error:%@ extra:%@", placementID, error, extra);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@', '%@')", self.delegates[kDelegatesFailedToPlayKey], placementID, error.userInfo[NSLocalizedDescriptionKey], [extra jsonFilterString_AnyThinkJS]]];

    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@', '%@')", self.delegates[kDelegatesFailedToPlayKey], placementID, error.userInfo[NSLocalizedDescriptionKey], [extra jsonFilterString_AnyThinkJS]]];

        });
    }

}

-(void) rewardedVideoDidCloseForPlacementID:(NSString*)placementID rewarded:(BOOL)rewarded extra:(NSDictionary *)extra {
    NSLog(@"ATRewardedVideoAutoAdWrapper::rewardedVideoDidCloseForPlacementID:%@ rewarded:%@ extra:%@", placementID, rewarded ? @"1" : @"0", extra);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesCloseKey], placementID, [extra jsonFilterString_AnyThinkJS]]];
    } else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesCloseKey], placementID, [extra jsonFilterString_AnyThinkJS]]];
        });
    }
}

-(void) rewardedVideoDidClickForPlacementID:(NSString*)placementID extra:(NSDictionary *)extra {
    NSLog(@"ATRewardedVideoAutoAdWrapper::rewardedVideoDidClickForPlacementID:%@ extra:%@", placementID, extra);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesClickKey], placementID, [extra jsonFilterString_AnyThinkJS]]];

    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesClickKey], placementID, [extra jsonFilterString_AnyThinkJS]]];

        });
    }

}

-(void) rewardedVideoDidRewardSuccessForPlacemenID:(NSString*)placementID extra:(NSDictionary*)extra {
    NSLog(@"ATRewardedVideoAutoAdWrapper::rewardedVideoDidRewardSuccessForPlacemenID:%@ extra:%@", placementID, extra);
    
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesRewardedKey], placementID, [extra jsonFilterString_AnyThinkJS]]];

    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesRewardedKey], placementID, [extra jsonFilterString_AnyThinkJS]]];

        });
    }
    
}


-(void) rewardedVideoAgainDidStartPlayingForPlacementID:(NSString*)placementID extra:(NSDictionary*)extra{
    NSLog(@"ATRewardedVideoAutoAdWrapper::rewardedVideoAgainDidStartPlayingForPlacementID:%@ extra:%@", placementID, extra);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesAgainPlayStartCallbackKey], placementID, [extra jsonFilterString_AnyThinkJS]]];

    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesAgainPlayStartCallbackKey], placementID, [extra jsonFilterString_AnyThinkJS]]];

        });
    }

}

-(void) rewardedVideoAgainDidEndPlayingForPlacementID:(NSString*)placementID extra:(NSDictionary*)extra{
    NSLog(@"ATRewardedVideoAutoAdWrapper::rewardedVideoAgainDidEndPlayingForPlacementID:%@ extra:%@", placementID, extra);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesAgainPlayEndCallbackKey], placementID, [extra jsonFilterString_AnyThinkJS]]];

    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesAgainPlayEndCallbackKey], placementID, [extra jsonFilterString_AnyThinkJS]]];

        });
    }

}

-(void) rewardedVideoAgainDidFailToPlayForPlacementID:(NSString*)placementID error:(NSError*)error extra:(NSDictionary*)extra{
    
    NSLog(@"ATRewardedVideoAutoAdWrapper::rewardedVideoAgainDidFailToPlayForPlacementID:%@ extra:%@ error:%@", placementID, extra,error);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@', '%@')", self.delegates[kDelegatesAgainPlayFailCallbackKey], placementID, error.userInfo[NSLocalizedDescriptionKey], [extra jsonFilterString_AnyThinkJS]]];

    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@', '%@')", self.delegates[kDelegatesAgainPlayFailCallbackKey], placementID, error.userInfo[NSLocalizedDescriptionKey], [extra jsonFilterString_AnyThinkJS]]];

        });
    }


}

-(void) rewardedVideoAgainDidClickForPlacementID:(NSString*)placementID extra:(NSDictionary*)extra{
    NSLog(@"ATRewardedVideoAutoAdWrapper::rewardedVideoAgainDidClickForPlacementID:%@ extra:%@", placementID, extra);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesAgainClickCallbackKey], placementID, [extra jsonFilterString_AnyThinkJS]]];

    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesAgainClickCallbackKey], placementID, [extra jsonFilterString_AnyThinkJS]]];

        });
    }
}

-(void) rewardedVideoAgainDidRewardSuccessForPlacemenID:(NSString*)placementID extra:(NSDictionary*)extra{
    NSLog(@"ATRewardedVideoAutoAdWrapper::rewardedVideoAgainDidRewardSuccessForPlacemenID:%@ extra:%@", placementID, extra);
    if ([NSThread isMainThread]) {
        [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesAgainRewardCallbackKey], placementID, [extra jsonFilterString_AnyThinkJS]]];

    }else {
        dispatch_async(dispatch_get_main_queue(), ^{
            [ATJSBridge callJSMethodWithString:[NSString stringWithFormat:@"%@('%@', '%@')", self.delegates[kDelegatesAgainRewardCallbackKey], placementID, [extra jsonFilterString_AnyThinkJS]]];

        });
    }
}


@end
