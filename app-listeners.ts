import { EMBEDDED_HEIGHT, EMBEDDED_VIEW, MESSAGE_TYPES } from "./constants";
import { extractPageData } from "./extract-page-data";
import { getPreferredLanguage } from "./helpers";

let isEmbeddedAppReadyToRecieveMessages = false;
const toEmbeddedAppMessageBuffer: object[] = [];

const toggleEmbeddedView = (isExpanded: boolean) => {
  const faircadoEmbeddedWrapper = document.getElementById(
    EMBEDDED_VIEW.WRAPPER_ID
  );
  if (!faircadoEmbeddedWrapper) return;
  const newHeight = isExpanded
    ? EMBEDDED_HEIGHT.MAXIMIZED
    : EMBEDDED_HEIGHT.MINIMIZED;
  faircadoEmbeddedWrapper.style.height = newHeight;
};

/**
 * Extracts required data for amazon book pages and sends it to the embedded app
 * Also sets users preferred language
 */
export const setupEmbeddedApp = () => {
  toEmbeddedAppMessageBuffer.push({
    type: MESSAGE_TYPES.initializeAppSettings,
    userSettings: {
      language: getPreferredLanguage(),
    },
  });
  toEmbeddedAppMessageBuffer.push({
    type: MESSAGE_TYPES.setFilter,
    productUrl: document.URL.toString(),
    source: new URL(document.URL.toString()).host,
    ...extractPageData(),
  });
  startListeningToMessagesFromEmbeddedApp();
};

function sendMessagesToEmbeddedAppFromBuffer() {
  if (!isEmbeddedAppReadyToRecieveMessages) {
    return;
  }

  while (toEmbeddedAppMessageBuffer.length > 0) {
    const message = toEmbeddedAppMessageBuffer.shift();
    const embeddedIframe = document.getElementById(
      EMBEDDED_VIEW.IFRAME_ID
    ) as HTMLIFrameElement;
    if (embeddedIframe) {
      embeddedIframe.contentWindow?.postMessage(message, "*");
    }
  }
}

function startListeningToMessagesFromEmbeddedApp() {
  window.addEventListener("message", function (event) {
    switch (event.data.type) {
      case MESSAGE_TYPES.embeddedAppReady:
        isEmbeddedAppReadyToRecieveMessages = true;
        sendMessagesToEmbeddedAppFromBuffer();
        break;
      case MESSAGE_TYPES.toggleEmbeddedAccordion:
        toggleEmbeddedView(event.data.isExpanded);
        break;
    }
  });
}
