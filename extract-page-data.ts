// @ts-strict

import { DATA_SELECTORS } from "./constants";

const selectTextBySelector = (selector: string) =>
  Array.from(document.querySelector(selector)?.childNodes || [])
    .map((child) => child.textContent?.trim() || "")
    .filter((item) => item.length > 0)
    .join(" ") || undefined;

const selectTextByElement = (element: Element) =>
  [...element?.childNodes]
    .map((child) => child.textContent?.trim() || "")
    .filter((item) => item.length > 0)
    .join(" ");

const getTitle = () => selectTextBySelector(DATA_SELECTORS.title);
const getIsbn = () => selectTextBySelector(DATA_SELECTORS.isbn);
const getEdition = () => selectTextBySelector(DATA_SELECTORS.edition);
const getLanguage = () => selectTextBySelector(DATA_SELECTORS.language);
const getBreadcrumbs = () => selectTextBySelector(DATA_SELECTORS.breadcrumbs);
const getPrice = () => selectTextBySelector(DATA_SELECTORS.price);
const getFormat = () => document.querySelector(DATA_SELECTORS.format)?.id;
const getAuthors = () => {
  const authors = Array.from(document.querySelectorAll(DATA_SELECTORS.author));
  return authors.map((author) =>
    selectTextByElement(author).replace(
      /\s*\((author|autor|auteur|eser sahibi|مؤلف|作者)\)/gi,
      "",
    ),
  );
};
const getProductCategory = () =>
  document.querySelector(DATA_SELECTORS.productCategory)?.id;

export const extractPageData = () => {
  return {
    query: getTitle(),
    productCategory: getProductCategory(),
    isbn: getIsbn(),
    edition: getEdition(),
    language: getLanguage(),
    price: getPrice(),
    format: getFormat(),
    authors: getAuthors(),
    breadcrumgs: getBreadcrumbs(),
  };
};
