cmake_minimum_required(VERSION 3.8)

set(CMAKE_SYSTEM_NAME iOS)
set(APP_NAME "TPN_Cocos_Demo"  CACHE STRING "Project Name")

project(${APP_NAME} CXX)
 
set(CC_PROJECT_DIR ${CMAKE_CURRENT_LIST_DIR})
set(CC_UI_RESOURCES)
set(CC_PROJ_SOURCES)
set(CC_ASSET_FILES)
set(CC_COMMON_SOURCES)
set(CC_ALL_SOURCES)
set(PROJ_SOURCES)
set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} -ObjC")

include(${CC_PROJECT_DIR}/../common/CMakeLists.txt)
set(EXECUTABLE_NAME ${APP_NAME}-mobile)

# Include Pods framework list (generated from xcconfig)
include(${CC_PROJECT_DIR}/PodsFrameworks.cmake OPTIONAL)

list(APPEND PROJ_SOURCES
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Splash/ATSplashAdWrapper.h
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Splash/ATSplashAdWrapper.m
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Banner/ATBannerAdWrapper.h
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Banner/ATBannerAdWrapper.m
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/RewardedVideo/ATRewardedVideoAutoAdWrapper.h
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/RewardedVideo/ATRewardedVideoAutoAdWrapper.m
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/RewardedVideo/ATRewardedVideoWrapper.h
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/RewardedVideo/ATRewardedVideoWrapper.m
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Interstitial/ATInterstitialAdWrapper.h
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Interstitial/ATInterstitialAdWrapper.m
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Interstitial/ATInterstitialAutoAdWrapper.h
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Interstitial/ATInterstitialAutoAdWrapper.m
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Native/ATNativeAdWrapper.h
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Native/ATNativeAdWrapper.m
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Native/ATNativeSelfRenderView.h
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Native/ATNativeSelfRenderView.m
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Core/ATAdWrapper.h
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Core/ATAdWrapper.m
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Core/ATJSBridge.h
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Core/ATJSBridge.mm
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Core/ATSDKManager.h
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Core/ATSDKManager.m
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Core/ATUtilities.h
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Core/ATUtilities.m
)

set(BRIDGE_SOURCES
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Splash/ATSplashAdWrapper.m
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Banner/ATBannerAdWrapper.m
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/RewardedVideo/ATRewardedVideoAutoAdWrapper.m
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/RewardedVideo/ATRewardedVideoWrapper.m
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Interstitial/ATInterstitialAdWrapper.m
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Interstitial/ATInterstitialAutoAdWrapper.m
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Native/ATNativeAdWrapper.m
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Native/ATNativeSelfRenderView.m
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Core/ATAdWrapper.m
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Core/ATSDKManager.m
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Core/ATUtilities.m
)
set_source_files_properties(${BRIDGE_SOURCES} PROPERTIES COMPILE_FLAGS "-fobjc-arc")
cc_ios_before_target(${EXECUTABLE_NAME})
add_executable(${EXECUTABLE_NAME} ${CC_ALL_SOURCES} ${PROJ_SOURCES})
source_group(TREE ${CMAKE_CURRENT_LIST_DIR} PREFIX "Source Files" FILES ${PROJ_SOURCES})
target_link_libraries(${EXECUTABLE_NAME}
    "-framework AnyThinkSDK"
    ${TPN_FRAMEWORKS}
)
include_directories(
    ${CMAKE_CURRENT_LIST_DIR}/bridge_ios/Core
    ${CMAKE_CURRENT_BINARY_DIR}/Pods/Masonry
)
cc_ios_after_target(${EXECUTABLE_NAME})

# Embed Pods frameworks (copies them to app bundle)
configure_file("${CMAKE_CURRENT_LIST_DIR}/Podfile" "${CMAKE_CURRENT_BINARY_DIR}/Podfile" COPYONLY)

# Embed Pods frameworks
add_custom_command(TARGET ${EXECUTABLE_NAME} POST_BUILD
    COMMAND bash "${CMAKE_CURRENT_LIST_DIR}/embed_pods_wrapper.sh"
    COMMENT "Embedding Pods frameworks"
)
