import React from "react";
import ArticlesList from "./ArticlesList";

export default function LayoutArticles({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* @ts-ignore */}
      {/* <ArticlesList /> */}
      <div>{children}</div>
    </div>
  );
}
