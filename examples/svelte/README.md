## WebPhone for Svelte

### Steps that were followed to integrate Webphone.js into svelte framework

1. Copy the `webphone.mjs` and `webphone.d.ts` from `dist` folder to `examples/svelte/src/lib` folder.
2. Create `webphone_svelte.ts` in `examples/svelte/src/lib` which inherits the `WebPhone` class into `WebPhoneSvelte` and override 3 methods
`pushToCallList`, `updateCallList` and `cleanUp`. These 3 functions manage the call state. When the call is initiated, the push function adds the
call to the list and when some state changes, it calls update and when the call hangs up it calls the clean up function.
You need to store the same copy of the state and manipulate it in svelte store which gives reactive state change rendering within svelte. Refer to the implementation for more details. The overriden functions are not directly called by the user but will be internally called and the respective state will get updated.
3. Initialize `WebPhoneSvelte` object in `examples/svelte/src/routes/+page.svelte` and use the API according to the TS definition file.
