import { Period } from "ecoledirecte.js";

export function getCurrentPeriod(_periods: Period[]): Period {
  for (const _period of _periods) {
    const todaysDate = Date.now();
    if (
      _period.start.getTime() <= todaysDate &&
      _period.end.getTime() >= todaysDate
    ) {
      return _period;
    }
  }
  throw new Error("Current period not found");
}

export default getCurrentPeriod;
