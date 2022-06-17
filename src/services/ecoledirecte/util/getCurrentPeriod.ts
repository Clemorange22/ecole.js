import { Period } from "ecoledirecte.js";

export function getCurrentPeriod(_periods: Period[]): Period | undefined {
  for (const _period of _periods) {
    const todaysDate = Date.now();
    if (
      _period.start.getTime() <= todaysDate &&
      _period.end.getTime() >= todaysDate
    ) {
      return _period;
    }
  }
  return undefined;
}

export default getCurrentPeriod;
