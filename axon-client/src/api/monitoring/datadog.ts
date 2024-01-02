import { datadogRum } from "@datadog/browser-rum";

export const datadog = () => {
  console.log("datadog session recording started");
  datadogRum.init({
    applicationId: "5242bc47-de38-4662-aaaf-fd107ec6f67a",
    clientToken: "pub1633a2106f5b2eab7e5dd1c4e278b309",
    site: "datadoghq.eu",
    service: "axon",
    env: "<ENV_NAME>",
    version: "1.0.0",
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: "mask-user-input",
  });

  datadogRum.startSessionReplayRecording();
};
