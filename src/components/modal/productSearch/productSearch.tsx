import React from "react";
import { DataRepresentation } from "data";
import { useTranslation } from "react-i18next";
import SearchButton from "./searchButton";
import iconTokped from "assets/img/icon_tokped.png";

const SEARCH_CATEGORY = [
  { name: "Web Search", id: "webSearch" },
  { name: "Market Place", id: "marketPlace" },
  { name: "E-Commerce", id: "eCommerceWeb" },
] as const;

type SearchCategoryId = (typeof SEARCH_CATEGORY)[number]["id"];

interface IFindProductProps {
  category: SearchCategoryId;
  id: string;
  name: string;
  url: string;
  icon?: string;
  region?: string;
}

function getSearchMethods(d: DataRepresentation): IFindProductProps[] {
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
      id: "maestroSeal",
      icon: iconTokped,
      name: "Maestro Seal - Tokopedia",
      url: `https://www.tokopedia.com/maestroseal/product?q=oring%20${d.code}`,
      region: "id", // Region-specific method
    },
    {
      category: "marketPlace",
      id: "sindoSeal",
      icon: iconTokped,
      name: "Sindo Seal - Tokopedia",
      url: `https://www.tokopedia.com/sindoseal/product?q=oring%20${d.code}`,
      region: "id",
    },
    {
      category: "marketPlace",
      id: "alphaSeal",
      icon: iconTokped,
      name: "Alpha Seal - Tokopedia",
      url: `https://www.tokopedia.com/alphaseal?q=${d.code}`,
      region: "id",
    },
    {
      category: "marketPlace",
      id: "rajaseal1",
      icon: iconTokped,
      name: "Raja Seal - Tokopedia",
      url: `https://www.tokopedia.com/rajaseal/product?q=oring%20${d.code}`,
      region: "id",
    },
  ];
}

export function ProductSearch({ data }: { data: DataRepresentation }) {
  const { t, i18n } = useTranslation("global");
  const language = i18n.resolvedLanguage;

  // Group methods by category for efficient access
  const allMethods = getSearchMethods(data);
  const groupedMethods = allMethods.reduce<
    Record<SearchCategoryId, IFindProductProps[]>
  >((acc, method) => {
    acc[method.category] = acc[method.category] || [];
    acc[method.category].push(method);
    return acc;
  }, {} as Record<SearchCategoryId, IFindProductProps[]>);

  return (
    <div className="text-center">
      {SEARCH_CATEGORY.map(({ name, id }) => {
        const categoryMethods = groupedMethods[id] || [];

        // Filter methods based on region
        const validMethods = categoryMethods.filter(
          (method) => !method.region || method.region === language
        );

        if (!validMethods.length) return null;

        return (
          <div key={id}>
            <h5>{t(`modal.${id}`)}</h5>
            {validMethods.map((m) => (
              <SearchButton
                key={m.id}
                icon={m.icon}
                name={m.name}
                url={m.url}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
