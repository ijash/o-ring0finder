import React from "react";
import { DataRepresentation } from "data";
import { useTranslation } from "react-i18next";
import SearchButton from "./searchButton";
import iconTokped from "assets/img/icon_tokped.png";
import { getSearchMethods } from "./searchMethods";

const SEARCH_CATEGORY = [
  { name: "Market Place", id: "marketPlace" },
  { name: "Web Search", id: "webSearch" },
  { name: "E-Commerce", id: "eCommerceWeb" },
] as const;

type SearchCategoryId = (typeof SEARCH_CATEGORY)[number]["id"];

export interface IFindProductProps {
  category: SearchCategoryId;
  id: string;
  name: string;
  url: string;
  icon?: string;
  region?: string;
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
