export const API_ENDPOINT =
  process.env.VUE_APP_API_ENDPOINT || "http://45.119.83.216:8033"; //"http://ip10-1-240-4-brc4tjvr3m6ga967q0fg-8023.direct.play-with-von.vonx.io" //
export const SOCKET_ENDPOINT =
  process.env.VUE_APP_SOCKET_ENDPOINT || "http://45.119.83.216:8032"; //"http://ip10-1-240-4-brc4tjvr3m6ga967q0fg-8022.direct.play-with-von.vonx.io/" //
export const headers = {
  "Access-Control-Allow-Origin": "*",
  referrerPolicy: "no-referrer",
  "Cache-Control": "no-cache"
};
export const LEDGER_URL = process.env.VUE_APP_LEDGER_URL || "http://test.bcovrin.vonx.io";

export const UIT_CRED_DEF_ID = process.env.VUE_APP_UIT_CRED_DEF_ID || "8sgkDDRm9K3Nbf894vt8Fk:3:CL:26707:UIT-University_default";
