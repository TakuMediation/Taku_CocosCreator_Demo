#import "ATUtilities.h"
#import <objc/runtime.h>

@implementation ATUtilities

+ (id)sharedInstance {
    return nil;
}

// Forward all unknown class method calls gracefully
+ (id)forwardingTargetForSelector:(SEL)aSelector {
    return nil;
}

+ (NSMethodSignature *)methodSignatureForSelector:(SEL)aSelector {
    return [NSMethodSignature signatureWithObjCTypes:"@@:"];
}

+ (void)forwardInvocation:(NSInvocation *)anInvocation {
    NSLog(@"[ATUtilities] ignoring class method: %@", NSStringFromSelector(anInvocation.selector));
}

+ (BOOL)resolveClassMethod:(SEL)sel {
    return YES;
}

// Forward all unknown instance method calls gracefully
- (id)forwardingTargetForSelector:(SEL)aSelector {
    return nil;
}

- (NSMethodSignature *)methodSignatureForSelector:(SEL)aSelector {
    return [NSMethodSignature signatureWithObjCTypes:"@@:"];
}

- (void)forwardInvocation:(NSInvocation *)anInvocation {
    NSLog(@"[ATUtilities] ignoring instance method: %@", NSStringFromSelector(anInvocation.selector));
}

@end
