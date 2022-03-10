import { Account } from "./Account";
import {
  service,
  getService,
  ServiceLoginOptions,
  serviceName,
} from "./services";

export class Session {
  private _service: service;
  readonly serviceLoginOptions: ServiceLoginOptions;

  readonly serviceName: serviceName;

  constructor(
    /**
     * @param serviceLoginOptions The options to use to login to the service. Different for each service
     */
    serviceLoginOptions: ServiceLoginOptions
  ) {
    this.serviceLoginOptions = serviceLoginOptions;
    this._service = getService(serviceLoginOptions);
    this.serviceName = this._service.name;
  }

  async login(): Promise<Account> {
    return await this._service.login(this);
  }
}
