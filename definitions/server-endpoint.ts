import axios from 'axios';

export class ServerEndPoint {
  readonly _url: string;
  readonly _priority: number;
  private _available: boolean = false;

  constructor(url: string, priority: number) {
    this._url = url;
    this._priority = priority;
  }

  public get Url() {
    return this._url;
  }

  public get Priority() {
    return this._priority;
  }

  public get Available() {
    return this._available;
  }

  public async checkServerAvailability() {
    return axios
      .head(this._url, {
        timeout: 1000 * 5,
      })
      .then((_res) => {
        this._available = true;
      })
      .catch((_err) => {
        this._available = false;
      });
  }
}
