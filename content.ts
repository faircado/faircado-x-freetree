// @ts-strict

import { setupEmbeddedApp } from "./app-listeners";
import {
  BOOK_CATEGORY_SELECTORS,
  EMBEDDED_HEIGHT,
  EMBEDDED_VIEW,
  FAIRCADO_EMBEDDED_TAG,
  POPUP_WRAPPER_ID,
  RIGHT_COL,
  WEBAPP_ADDRESSES,
} from "./constants";
import {
  addQueryToUrl,
  getMachineKey,
  isInMainFrame,
  waitForDocumentToBeReady,
} from "./helpers";

const isAmazonProductPage = () =>
  window.location.host.startsWith("www.amazon.") &&
  window.location.pathname !== "/s";

const isEmbedded = () =>
  Boolean(document.getElementById(EMBEDDED_VIEW.WRAPPER_ID)) ||
  Boolean(document.getElementById(POPUP_WRAPPER_ID));

const isCategoryBook = () =>
  Boolean(document.querySelector(BOOK_CATEGORY_SELECTORS));

const createIframe = (machineKey: string) => {
  const iframe = document.createElement("iframe");
  iframe.id = EMBEDDED_VIEW.IFRAME_ID;
  iframe.src = addQueryToUrl(WEBAPP_ADDRESSES.LOCAL, {
    mk: machineKey,
    interactionOrigin: EMBEDDED_VIEW.INTERACTION_ORIGIN,
    host: "amazon",
    whiteLabel: "ecosia",
  });
  iframe.style.height = "100%";
  iframe.style.width = "100%";
  iframe.style.border = "none";
  iframe.style.boxSizing = "border-box";
  iframe.style.backgroundColor = "transparent";
  iframe.allow = "clipboard-read; clipboard-write";
  iframe.setAttribute("allowTransparency", "true");
  return iframe;
};

/**
 * This function will check if it needs to embed or not
 * looking into the current page checking urls and if the correct elements are available.
 */
const shouldEmbed = async () => {
  if (!isInMainFrame() || !isAmazonProductPage()) {
    return false;
  }
  await waitForDocumentToBeReady();
  if (
    !document.getElementById(RIGHT_COL) ||
    isEmbedded() ||
    !isCategoryBook()
  ) {
    return false;
  }
  return true;
};

const main = async () => {
  if (!(await shouldEmbed())) {
    return;
  }
  const rightCol = document.getElementById(RIGHT_COL)!;
  setupEmbeddedApp();
  const faircadoEmbeddedView = document.createElement(FAIRCADO_EMBEDDED_TAG);
  const embeddedIframe = createIframe(await getMachineKey());
  faircadoEmbeddedView.setAttribute("id", EMBEDDED_VIEW.WRAPPER_ID);
  faircadoEmbeddedView.style.display = "block";
  faircadoEmbeddedView.style.width = `${rightCol.clientWidth + 5}px`;
  faircadoEmbeddedView.style.height = EMBEDDED_HEIGHT.MAXIMIZED;
  faircadoEmbeddedView.style.marginBottom = "12px";
  faircadoEmbeddedView.style.zIndex = "1";
  faircadoEmbeddedView.style.left = "-5px";
  faircadoEmbeddedView.style.transition = "height 0.5s ease";
  faircadoEmbeddedView.append(embeddedIframe);
  rightCol.prepend(faircadoEmbeddedView);
};

main();
