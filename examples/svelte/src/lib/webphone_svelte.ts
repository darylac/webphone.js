import { writable, type Writable } from "svelte/store";
import { WebPhone } from "./webphone.mjs";

class WebPhoneSvelte extends WebPhone {
  public callList: Writable<Call[]>;

  constructor(configuration: Configuration) {
    super(configuration);
    this.callList = writable([]);
  }

  public pushToCallList(calls: Call[], call: Call | undefined) {
    const newCalls = super.pushToCallList(calls, call);
    if (call) {
      this.callList.set(newCalls as Call[]);
    }
    return newCalls;
  }

  public updateCallList(calls: Call[], call: Call | undefined) {
    const newCalls = super.updateCallList(calls, call);
    this.callList.set(newCalls);
    return newCalls;
  }

  public cleanUp(calls: Call[], call: string | Call) {
    const newCalls = super.cleanUp(calls, call);
    this.callList.set(newCalls as Call[]);
    return newCalls;
  }
}

export { WebPhoneSvelte };
