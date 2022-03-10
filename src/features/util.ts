import { Feature } from ".";

/**
 * @param featureList List of features
 * @param feature The feature to check if it is in the list
 */
export function verifyFeature(featureList: Feature[], feature: Feature): void {
  if (!featureList.includes(feature)) {
    throw new Error(`Feature ${feature} is not enabled on this account`);
  }
}
