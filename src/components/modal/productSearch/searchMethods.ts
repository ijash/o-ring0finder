import { DataRepresentation } from "data";
import iconTokped from "assets/img/icon_tokped.png";
import iconShopee from "assets/img/icon_shopee.png";
import { IFindProductProps } from "./productSearch";

export function getSearchMethods(d: DataRepresentation): IFindProductProps[] {
  return [
    {
      category: "webSearch",
      id: "google",
      name: "Google",
      url: `https://www.google.com/search?q=oring+${d.standard}+${d.code}`,
    },
    {
      category: "webSearch",
      id: "bing",
      name: "Bing",
      url: `https://www.bing.com/search?q=oring+${d.standard}+${d.code}`,
    },
    {
      category: "marketPlace",
      id: "maestroSealTokped",
      icon: iconTokped,
      name: "Maestro Seal - Tokopedia",
      url: `https://www.tokopedia.com/maestroseal/product?q=oring%20${d.code}`,
      region: "id",
    },
    {
      category: "marketPlace",
      id: "sindoSealTokped",
      icon: iconTokped,
      name: "Sindo Seal - Tokopedia",
      url: `https://www.tokopedia.com/sindoseal/product?q=oring%20${d.code}`,
      region: "id",
    },
    {
      category: "marketPlace",
      id: "alphaSealTokped",
      icon: iconTokped,
      name: "Alpha Seal - Tokopedia",
      url: `https://www.tokopedia.com/alphaseal?q=${d.code}`,
      region: "id",
    },
    {
      category: "marketPlace",
      id: "rajaseal1Tokped",
      icon: iconTokped,
      name: "Raja Seal - Tokopedia",
      url: `https://www.tokopedia.com/rajaseal/product?q=oring%20${d.code}`,
      region: "id",
    },
    {
      category: "marketPlace",
      id: "sindoSealShopee",
      icon: iconShopee,
      name: "Sindo Seal - Shopee",
      url: `https://shopee.co.id/search?keyword=oring%20${d.code}&shop=601563864`,
      region: "id",
    },
    {
      category: "marketPlace",
      id: "maestroSealShopee",
      icon: iconShopee,
      name: "Maestro Seal - Shopee",
      url: `https://shopee.co.id/search?keyword=oring%20${d.code}&shop=385941495`,
      region: "id",
    },
    {
      category: "eCommerceWeb",
      id: "marcoRubber",
      name: "Marco Rubber",
      url: `https://www.marcorubber.com/search-results?search=${d.code}`,
    },
  ];
}
