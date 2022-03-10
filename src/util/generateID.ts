import { serviceName } from "..";

export function formatID(serviceName: serviceName, id: string): string {
  switch (serviceName) {
    case "ecoledirecte":
      return `ED-${id}`;
    case "pronote":
      return `PR-${id}`;
    default:
      throw new Error(`Unknown serviceName: ${serviceName}`);
  }
}
