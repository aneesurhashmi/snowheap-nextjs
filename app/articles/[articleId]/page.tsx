"use client";

import React, { useEffect, useState } from "react";
import { Articles } from "../../../typings";
import Loading from "./loading";
// import fsPromises from "fs/promises";
// import path from "path";
// import Loading from "../../search/[searchTerm]/loading";

// type PageProps = {
//   params: {
//     articleId: string;
//   };
// };

// toggle ability to try to server-side render a page (that is not cached, and then to cache it)
// export const dynamicParams = true; // default true

// const fetchOneArticle = async (articleId: string) => {
//   const filePath = path.join(process.cwd(), "./data/articles/english.json");
//   console.log(filePath);
//   const jsonData: any = await fsPromises.readFile(filePath);
//   const articles: Articles[] = JSON.parse(jsonData);
//   return articles.find((article) => article.id == articleId);
// };
// export default  function MyArticle() {

export default function MyArticle({ params: { articleId } }: PageProps) {
  console.log(articleId);

  const [article, setArticle] = useState({
    id: "12",
    img: "123",
    content: "123123",
    title: "abc",
  });
  const [preference, setPreference] = useState("full");

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    // setPreference(e.target.value);
    if (e.target.value == "summary") {
      console.log("I will give u the summary");
    } else {
      console.log("I will give u full text");

    }
  };

  // @ts-ignore
  useEffect(() => {
    fetch(`http://localhost:3000/api/article/${articleId}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return !article.id ? (
    <Loading />
  ) : (
    <div className="p-10border-2 m-2 shadow-lg">
      {/* <UserPreference handleChange={handleChange} /> */}
      <div>
        <select onChange={handleChange}>
          <option defaultValue={"full"} value="full">
            Full Article
          </option>
          <option value="summary">Summary</option>
        </select>
      </div>
      <p>{article.title}</p>
      <img src={article.img} />
      <p className=" bg-green-300 ">{article.content}</p>
    </div>
  );
}

// // for static rendering
// export async function generateStaticParams() {
//   const filePath = path.join(process.cwd(), "./data/articles/english.json");
//   console.log(filePath);
//   const jsonData = await fsPromises.readFile(filePath);
//   console.log(filePath);

//   //   @ts-ignore
//   const articles: Articles[] = JSON.parse(jsonData);
//   return articles.map((article) => ({
//     articleId: article.id.toString(),
//   }));
// }
