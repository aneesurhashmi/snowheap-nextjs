import type { NextApiRequest, NextApiResponse } from "next";

import fsPromises from "fs/promises";
import path from "path";
import { Articles } from "../../typings";

const fetchOneArticle = async (articleId: string) => {
  const filePath = path.join(process.cwd(), "./data/articles/english.json");
  console.log(filePath);
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
  console.log(req.query)
  const { articleId }: any = req.query;
  const article: any = await fetchOneArticle(articleId);
  res.json(JSON.stringify(article));
}
