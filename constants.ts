export const BOOK_CATEGORY_SELECTORS =
  "#tmm-grid-swatch-KINDLE,#tmm-grid-swatch-PAPERBACK,#tmm-grid-swatch-HARDCOVER,#tmm-grid-swatch-AUDIOBOOK,#tmm-grid-swatch-AUDIO_DOWNLOAD";

export const EMBEDDED_VIEW = {
  IFRAME_ID: "faircado-embedded-iframe",
  WRAPPER_ID: "faircado-embedded-iframe-wrapper",
  INTERACTION_ORIGIN: "extension_embedded",
} as const;

export const POPUP_WRAPPER_ID = "faircado-iframe-wrapper";

export const RIGHT_COL = "rightCol";

export const EMBEDDED_HEIGHT = {
  MINIMIZED: "60px",
  MAXIMIZED: "480px",
};

export const STORAGE_KEY = {
  MACHINE_KEY: "machineKey",
} as const;

export const FAIRCADO_EMBEDDED_TAG = "faircado-embedded-view";

export const MESSAGE_TYPES = {
  setFilter: "setFilter",
  embeddedAppReady: "embeddedAppReady",
  toggleEmbeddedAccordion: "toggleEmbeddedAccordion",
  initializeAppSettings: "initializeAppSettings",
  closeEmbeddedView: "closeEmbeddedView",
} as const;

export const DATA_SELECTORS = {
  title:
    "#search h1 h2 span.a-color-state.a-text-bold,#productTitle,#bond-title-desktop",
  isbn: "#rpi-attribute-book_details-isbn13 div:last-of-type span",
  edition: "#rpi-attribute-book_details-edition div:last-of-type span",
  language:
    "#rpi-attribute-language div:last-of-type span,#rpi-attribute-audiobook_details-language div:last-of-type span",
  breadcrumbs: "#wayfinding-breadcrumbs_feature_div",
  format: ".swatchElement.selected",
  author: "#bylineInfo .author",
  price: "span#tp_price_block_total_price_ww.a-price span.a-price-whole",
  productCategory:
    "#tmm-grid-swatch-KINDLE,#tmm-grid-swatch-PAPERBACK,#tmm-grid-swatch-HARDCOVER,#tmm-grid-swatch-AUDIOBOOK,#tmm-grid-swatch-AUDIO_DOWNLOAD",
};

export const WEBAPP_ADDRESSES = {
  LOCAL: "https://local.faircado.com",
  STAGING: "https://extension.staging.faircado.com/",
  PRODUCTION: "https://extension-v3-8.faircado.com",
};
