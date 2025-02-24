import { STORAGE_KEY } from "./constants";

export function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16),
  );
}

export function addQueryToUrl(url: string, query: Record<string, string>) {
  const urlObj = new URL(url);

  Object.entries(query).forEach(([key, value]) => {
    urlObj.searchParams.set(key, value);
  });

  return urlObj.toString();
}

export async function getMachineKey(): Promise<string> {
  const machineKey = await chrome.storage.sync.get(STORAGE_KEY.MACHINE_KEY);
  if (typeof machineKey === "undefined") {
    const machineKey = uuidv4();
    await chrome.storage.sync.set({ machineKey });
    return machineKey;
  }
  return machineKey[STORAGE_KEY.MACHINE_KEY] as string;
}

export const waitForDocumentToBeReady = () => {
  return new Promise<boolean>((resolve) => {
    const interval = setInterval(() => {
      if (document.readyState !== "loading") {
        clearInterval(interval);
        resolve(true);
        return;
      }
    }, 10);
  });
};

export function isInMainFrame() {
  try {
    let inMainFrame = false;
    if (window.self === window.top) {
      inMainFrame = true;
    } else if (
      window.top?.innerHeight === window.self.innerHeight &&
      window.top.innerWidth === window.self.innerWidth
    ) {
      inMainFrame = true;
    }

    return inMainFrame;
  } catch (error) {
    return false;
  }
}

export const getPreferredLanguage = () => {
  if (navigator.language.startsWith("en")) {
    return "en";
  }
  // default to german
  return "de";
};
