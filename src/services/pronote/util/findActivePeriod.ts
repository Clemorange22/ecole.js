import { PronotePeriod as _PronotePeriod } from "pronote-api";

export function findActivePeriod(_periods: _PronotePeriod[]) {
  const now = Date.now();
  return _periods.find((_period) => {
    return (
      !(_period.type == "year") &&
      _period.from.getTime() < now &&
      now < _period.to.getTime()
    );
  })?.name;
}
