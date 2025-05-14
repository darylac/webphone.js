<script lang="ts">
    import { WebPhoneSvelte } from "$lib/webphone_svelte";

    let remoteAudioElement = document.createElement("audio");
    document.body.appendChild(remoteAudioElement);

    let phoneState: string = "idle";
    let phone = new WebPhoneSvelte({
        mediaConfig: {
            remoteAudioElement: remoteAudioElement,
        },
        eventSubscription: {
            onConnectionEvent: (e) => {
                console.log("connection event");
                console.log(e);
            },
            onCallEvent: (e) => {
                console.log("call event");
                console.log(e);
                switch (e.event_name) {
                    case "answered":
                        phoneState = "answered";
                        break;
                    case "hangup":
                        phoneState = "idle";
                        break;
                }
            },
        },
    });
    let call = phone.callList;

    async function initiateCall() {
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
                name: "1002",
                password: "eggeeg2f2e",
            },
        });
        await phone.makeCall("7003", { audio: remoteAudioElement, video: undefined });
    }
</script>

<div>
    {#if phoneState == "idle"}
        <button
            on:click={async () => {
                await initiateCall();
            }}>Start call</button
        >
    {:else if phoneState == "answered" && $call.length > 0 && $call[0].state.value == "call"}
        <div>
            <button on:click={() => phone.toggleMute($call[0], "audio")}>
                {#if phone.isMuted($call[0], "audio")}
                    Unmute
                {:else}
                    Mute
                {/if}
            </button>
            <button on:click={async () => await phone.hangupCall($call[0])}
                ><i class="fa-solid fa-phone-slash"></i> Hangup</button
            >
        </div>
    {/if}
</div>
