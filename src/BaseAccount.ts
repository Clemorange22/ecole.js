import { serviceName } from "./services";
import { Session } from "./Session";
import { Feature } from "./features";

export class BaseAccount {
  _session: Session;

  serviceName: serviceName;

  public features: Feature[] = [];
  constructor(session: Session, serviceName: serviceName) {
    this._session = session;
    this.serviceName = serviceName;
  }

  /**
   * hasFeature
   */
  public hasFeature(feature: Feature) {
    return this.features.includes(feature);
  }
}
