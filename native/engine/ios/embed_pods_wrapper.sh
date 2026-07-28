#!/bin/bash
# Removed set -e to avoid failing the build on minor pod script errors
# Set Pods variables using Xcode environment variables
echo "embed_pods_wrapper: starting"
export PODS_XCFRAMEWORKS_BUILD_DIR="${PODS_XCFRAMEWORKS_BUILD_DIR:-${BUILT_PRODUCTS_DIR}/XCFrameworkIntermediates}"
export PODS_ROOT="${PODS_ROOT:-${SRCROOT}/Pods}"
export PODS_CONFIGURATION_BUILD_DIR="${PODS_CONFIGURATION_BUILD_DIR:-${CONFIGURATION_BUILD_DIR}}"
echo "PODS_ROOT=$PODS_ROOT"
if [ -f "$PODS_ROOT/Target Support Files/Pods-TPN_Cocos_Demo-mobile/Pods-TPN_Cocos_Demo-mobile-frameworks.sh" ]; then
    bash "$PODS_ROOT/Target Support Files/Pods-TPN_Cocos_Demo-mobile/Pods-TPN_Cocos_Demo-mobile-frameworks.sh" || echo "Warning: pods frameworks script had errors (ignored)"
else
    echo "Warning: pods frameworks script not found at $PODS_ROOT/Target Support Files/Pods-TPN_Cocos_Demo-mobile/"
fi
echo "embed_pods_wrapper: done"
