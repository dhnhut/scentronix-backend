export class ServerEndPoint {
  readonly url: string;
  readonly priority: number;
  private _available: boolean = false;

  constructor(url: string, priority: number) {
    this.url = url;
    this.priority = priority;
    this.checkServerAvailability();
  }

  public get available() {
    return this._available;
  }

  private checkServerAvailability() {
    this._available = true;
  }
}
