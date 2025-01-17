/**
 * Created by rohittalwar on 13/04/16.
 */

import Axios, * as axios from "axios";
import { NetworkInterface } from "./Protocols";

export class MyNetworkClient implements NetworkInterface {
  isReactive: boolean = false;

  private headers: any = {};
  private config: any = {};

  constructor() {}

  setHttpHeaders(headersMap: any) {
    for (let key in headersMap) {
      this.headers[key] = headersMap[key];
    }
  }

  setDefaults(config: any){
    let defaultConfig = {
      validateStatus: function (status: any) {
        return true; // default
      },
      timeout: 20000
    };
    let headers = this.headers;
    this.config = {...defaultConfig, ...config, headers};
  }

  private _net(): axios.AxiosInstance {
    this.config.headers = this.headers;
    return Axios.create(this.config);
  }

  private async getDataFromCache(url: string, params?: Object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.networkGET(url, params).then(resolve, reject);
    });
  }
  private async networkGET(url: string, params?: Object): Promise<any> {
    return this._net().get(url, { params });
  }
  async get(url: string, params?: Object): Promise<any> {
    return this.getDataFromCache(url, params);
  }

  async post(url: string, params?: Object): Promise<any> {
    return this._net().post(url, params);
  }

  async put(url: string, params?: Object): Promise<any> {
    return this._net().put(url, params);
  }

  async delete(url: string, params?: Object): Promise<any> {
    return this._net().put(url, params);
  }
}

export class NetworkFactory {
  static createSimpleClient(): NetworkInterface {
    return NetworkFactory._createSimpleClient();
  }

  private static _createSimpleClient(token?: string): NetworkInterface {
    let net = new MyNetworkClient();
    return net;
  }
}
