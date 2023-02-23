import Link from "next/link";
// import React from "react";
// import { Todo } from "../../typings";
import fsPromises from "fs/promises";
import path from "path";
// pages/index.js
import Head from "next/head";

const fetchJSON = async () => {
  const filePath = path.join(process.cwd(), "./data/articles/english.json");
  const jsonData = await fsPromises.readFile(filePath);
  console.log(jsonData);
  
  //   @ts-ignore
  const objectData = JSON.parse(jsonData);

  return objectData;
};

export default async function ArticlesList() {
  const articles = await fetchJSON();
  //   console.log(articles);

  return (
    <div style={{ padding: 30 }}>
      <Head>
        <title>Sling Academy</title>
      </Head>
      <div >
        {articles.map((article: any) => (
          //   <div key={article.id} style={{ border: "solid" }}>
          <Link href= {`/articles/${article.id}`} key={article.id} className="border-8 border-black-500 p-2 flex">
            <h2 className="p-3">{article.title}</h2>
            <p>{article.content.slice(0, 100)}...</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Fetching data from the JSON file
// import Link from "next/link";

// export async function getStaticProps() {
//   const filePath = path.join(process.cwd(), "./data/articles/english.json");
// //   print(filePath)
//   const jsonData = await fsPromises.readFile(filePath);
//   const data = JSON.parse(jsonData);
// //   console.log(data);

//   return {
//     props: data,
//   };
// }
