export const API_ENDPOINT =
  process.env.VUE_APP_API_ENDPOINT || "http://45.119.83.216:8053"; //"http://ip10-1-240-4-brc4tjvr3m6ga967q0fg-8023.direct.play-with-von.vonx.io" //
export const SOCKET_ENDPOINT =
  process.env.VUE_APP_SOCKET_ENDPOINT || "http://45.119.83.216:8052"; //"http://ip10-1-240-4-brc4tjvr3m6ga967q0fg-8022.direct.play-with-von.vonx.io/" //
export const headers = {
  "Access-Control-Allow-Origin": "*",
  referrerPolicy: "no-referrer",
  "Cache-Control": "no-cache"
};
export const LEDGER_URL = "http://test.bcovrin.vonx.io";
