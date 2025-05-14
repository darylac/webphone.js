## Webphone.js

WebPhone library helps you build soft phones for the web.

It uses SIP over websocket for signalling and WebRTC for media transmission.

###  Vanilla JS Example
You can use the `webphone.iife.js` from the `dist` folder, if you are using this library directly in the static HTML file.

```html
<div>
    <button id="start-call-btn">Start Call</button>
    <button id="end-call-btn">End Call</button>
</div>
```
```javascript
<script src="js/webphone.iife.js"></script>
<script>
    const remoteAudioElement = document.createElement("audio");
    document.body.appendChild(remoteAudioElement);

    const startCallBtn = document.getElementById("start-call-btn");
    const endCallBtn = document.getElementById("end-call-btn");

    const phone = new Phone.WebPhone({
        mediaConfig: {
            remoteAudioElement: remoteAudioElement,
            eventSubscription: {
                onConnectionEvent: (e) => {
                    console.log("connection event");
                    console.log(e);
                },
                onCallEvent: (e) => {
                    console.log("call event");
                    console.log(e);
                },
            },
        },
    });

    startCallBtn.addEventListener("click", async () => {
        try {
            await startCall();
        } catch (error) {
            endCallBtn.click();
            return;
        }
        startCallBtn.style.display = "none";
        endCallBtn.style.display = "inline-block";
    });

    endCallBtn.addEventListener("click", async () => {
        await endCall();
        startCallBtn.style.display = "inline-block";
        endCallBtn.style.display = "none";
    });

    async function startCall() {
        await phone.register({
            server: {
                host: "demoserver.xyz.com",
                port: 7443,
                iceServers: [
                    {
                        urls: "turn:127.0.0.1:3478",
                        username: "bob",
                        credential: "rjghr23fj",
                    },
                ],
            },
            user: {
                name: "bob-4395594",
                password: "df3kgjj3tj",
            },
        });

        if (phone.calls.length == 0) {
            await phone.makeCall("alice-548482", { audio: remoteAudioElement, video: undefined });
        }
    }

    async function endCall() {
        if (phone.calls) {
            for (const call of phone.calls) {
                await phone.hangupCall(call);
            }
        }
    }
</script>
```

### Type Definitions

#### Configuration
```typescript
interface RegisterConfig {
  server: ServerConfig
  user: UserConfig
}

interface ServerConfig {
  host: string
  port: string
  iceServers?: string[]
}

interface UserConfig {
  name: string
  password: string
}

interface Configuration {
    mediaConfig: MediaConfig
    eventSubscription?: EventSubscription
}

interface MediaConfig {
    remoteAudioElement: HTMLAudioElement
}

interface EventSubscription {
    onConnectionEvent(e: ConnectionEvent): void
    onCallEvent(e: CallEvent): void
}

interface ConnectionEvent {
  event_name: string // registered, unregistered, connected, disconnected
}

interface CallEvent {
  event_name: string // incoming_call, answered, call_hold, hangup
  call_id: string // unique ID for a call session
  held?: boolean // this key will only exist in event_name: call_hold
}
```

#### Constructor
```typescript
WebPhone(configuration: Configuration)
```

#### Data
```typescript
calls: Call[]
```

#### Methods
```typescript
register(config: RegisterConfig): Promise<void>
unregister(): Promise<void>

makeCall(address: string): Promise<void> // dial a new call, values: 1001, 1002, ...
acceptCall(call: Call): Promise<void> // accept incoming call
declineCall(call: Call): Promise<void> // used for declining incoming call
hangupCall(call: Call): Promise<void>

isHeld(call:Call): boolean
isMuted(call:Call): boolean

mute(call: Call): void
unmute(call: Call): void
toggleMute(call: Call): void

hold(call: Call): Promise<void>
unhold(call: Call): Promise<void>
toggleHold(call: Call): Promise<void>
```

#### Call
```typescript
interface Call {
  id: string,
  type: string // incoming, outgoing
  state: PhoneState
  remoteDisplayName: string
}

interface PhoneState {
  value: string
  // there are other fields in this type but can be ignored
}
/*
The call state value can be accessed by 'call.state.value' which is a string.
Possible values are
 - ringing : when the call is ringing either incoming / outgoing
 - call : when the call is in answered state
 - hangup: when the call hangs up
 */
```
