// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import fsPromises from "fs/promises";
import path from "path";
import { Articles } from "../../../typings";

const fetchOneArticle = async (articleId: string) => {
  const filePath = path.join(process.cwd(), "./data/articles/english.json");
  const jsonData: any = await fsPromises.readFile(filePath);
  const articles: Articles[] = JSON.parse(jsonData);
  return articles.find((article) => article.id == articleId);
};

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { articleId }: any = req.query;
  const article: any = await fetchOneArticle(articleId);

  res.json(article);
}



// export default function handler(req, res) {
//   res.status(200).json({ message: 'Hello from Next.js!' })
// }

// 'use strict';

// const fs = require('fs');

// fs.readFile('student.json', (err, data) => {
//     if (err) throw err;
//     let student = JSON.parse(data);
//     console.log(student);
// });

// console.log('This is after the read call');

// Fetching data from the JSON file
// import fsPromises from 'fs/promises';
// import path from 'path'
// export async function getStaticProps() {
//   const filePath = path.join(process.cwd(), 'data.json');
//   const jsonData = await fsPromises.readFile(filePath);
//   const objectData = JSON.parse(jsonData);

//   return {
//     props: objectData
//   }
// }
