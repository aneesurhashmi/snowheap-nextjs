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
    imgCaption: ""
  });
  const [preference, setPreference] = useState("full");
  const [loading, setloading] = useState(false);

  const get_summary = async (payload: string) => {
    setloading(true)
    const endpoint: string = 'http://127.0.0.1:5000/summarize'
    try {
      const fetchResponse = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },

        // body: JSON.stringify({ "query": "https://fujifilm-x.com/wp-content/uploads/2021/01/gfx100s_sample_04_thum-1.jpg:article:On a night fraught with tension, Italy clinched its first major title for 15 years with a penalty shootout win over England in the Euro 2020 final.Luke Shaw's goal inside the opening two minutes gave England a lead it looked like it would hold onto all night, before a goalmouth scramble midway through the second half allowed Leonardo Bonucci to poke home an equalizer for Italy.For the remainder of the match it felt as though extra-time and penalties were inevitable, as neither side seemed willing or brave enough to commit enough men forward to really trouble the opposing defenders.England had suffered innumerable heartbreaks on penalties over the years and this time it was Italy's turn to inflict yet more pain on beleaguered English fans as Marcus Rashford, Jadon Sancho and Bukayo Saka all missed from the spot" })
        body: JSON.stringify({ "query": payload })
      });
      // return fetchResponse
      const data: string = await fetchResponse.text();
      setloading(false)

      return data;
      // return "AS"
    } catch (e) {
      setloading(false)
      return e;
    }
  }


  const handle_cache = (text_len: string,) => {
    if (sessionStorage.getItem(`${article.id}_${text_len}`)) {
      console.log("available in ss");
      setArticle(JSON.parse(sessionStorage.getItem(`${article.id}_${text_len}`)))
    }
    else {
      console.log("fetching");
      fetch_article()
    }
  }

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPreference(e.target.id)
    if (e.target.id == "summary") {
      // setPreference(e.target.value)
      if (sessionStorage.getItem(`${article.id}_summary`)) {
        setArticle(JSON.parse(sessionStorage.getItem(`${article.id}_summary`)))
        return ""
      }

      const payload = `${article.img}:article:${article.content.split("\n").join("")}`
      const mySummary: string = await get_summary(payload)
      // console.log(mySummary);
      // console.log(mySummary.length);
      const myres = mySummary.split("summary:")
      const articleSummary = myres[1]
      const imgCaption = myres[0]
      setArticle({ ...article, content: articleSummary, imgCaption })
      sessionStorage.setItem(`${article.id}_summary`, JSON.stringify({ ...article, content: articleSummary, imgCaption }))
    } else {

      handle_cache("full")
    }
  };

  const fetch_article = () => {

    fetch(`http://localhost:3000/api/article/${articleId}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        sessionStorage.setItem(`${data.id}_full`, JSON.stringify(data))

      })
      .catch((err) => {
        console.log(err);
      });
  }
  // @ts-ignore
  useEffect(() => {
    // fetch_article()
    handle_cache("full")
  }, []);

  return !article.id ? (
    <Loading />
  ) : (
    <div className="p-10border-2 m-2 shadow-lg">
      {!loading ? (<>
        {preference == "full" ? (<>
          <button id="summary" onClick={handleChange}
            style={{ border: "solid black 2px", padding: "2px", backgroundColor: '#14ded0' }}>
            Read Summary
          </button>

          <h1 style={{ fontSize: "30px", textAlign: "center", fontWeight: "bold" }}>{article.title}</h1>
          <hr />
          <br />
          <div >
            <img src={article.img} style={{
            }} />

          </div>
          <h2 style={{ fontSize: "20px", textAlign: "center", }}>Full Article:</h2>
          <p className="p-10 bg-blue-300 ">{article.content}</p>
        </>
        ) : (<>

          <div>
            <button id="full" onClick={handleChange}
              style={{ border: "solid black 2px", padding: "2px", backgroundColor: '#14ded0' }}>
              Read Full Article
            </button>
          </div>
          <h1 style={{ fontSize: "30px", textAlign: "center", fontWeight: "bold" }}>{article.title}</h1>
          <hr />
          <br />
          <h2 style={{ fontSize: "20px", textAlign: "center", }}>Caption for the article image:</h2>
          <p className="p-10 bg-blue-300 ">{article.imgCaption}</p>
          <h2 style={{ fontSize: "20px", textAlign: "center", }}>Summary:</h2>
          <p className="p-10 bg-blue-300 ">{article.content}</p>
        </>
        )}</>) : <Loading />}

    </div>
  );
}

