class WebPhone {
  calls: Call[];

  constructor(configuration: Configuration);

  protected pushToCallList(calls: Call[], call: Call | undefined): Call[];
  protected updateCallList(calls: Call[], call: Call | undefined): Call[];
  protected cleanUp(calls: Call[], call: string | Call): Call[];

  register(config: RegisterConfig): Promise<void>;
  unregister(): Promise<void>;

  makeCall(address: string): Promise<void>; // dial a new call, values: 1001, 1002, ...
  acceptCall(call: Call): Promise<void>; // accept incoming call
  declineCall(call: Call): Promise<void>; // used for declining incoming call
  hangupCall(call: Call): Promise<void>;

  isHeld(call: Call): boolean;
  isMuted(call: Call): boolean;

  mute(call: Call): void;
  unmute(call: Call): void;
  toggleMute(call: Call): void;

  hold(call: Call): Promise<void>;
  unhold(call: Call): Promise<void>;
  toggleHold(call: Call): Promise<void>;
}

interface RegisterConfig {
  server: ServerConfig;
  user: UserConfig;
}

interface ServerConfig {
  host: string;
  port: string;
  iceServers?: string[];
}

interface UserConfig {
  name: string;
  password: string;
}

interface Configuration {
  mediaConfig: MediaConfig;
  eventSubscription?: EventSubscription;
}

interface MediaConfig {
  remoteAudioElement: HTMLAudioElement;
}

interface EventSubscription {
  onConnectionEvent(e: ConnectionEvent): void;
  onCallEvent(e: CallEvent): void;
}

interface ConnectionEvent {
  event_name: string; // registered, unregistered, connected, disconnected
}

interface CallEvent {
  event_name: string; // incoming_call, answered, call_hold, hangup
  call_id: string; // unique ID for a call session
  held?: boolean; // this key will only exist in event_name: call_hold
}

interface Call {
  id: string;
  type: string; // incoming, outgoing
  state: PhoneState;
  remoteDisplayName: string;
}

interface PhoneState {
  value: string;
  // there are other fields in this type but can be ignored
}
