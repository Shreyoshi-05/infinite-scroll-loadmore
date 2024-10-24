import React, { useEffect, useState } from "react";
import "./Scroll.css";

const Scroll = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  async function fetchData(url) {
    try {
      const res = await fetch(url);
      const gdata = await res.json();
      setData((prevData) => [...prevData, ...gdata]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData(
      `https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`
    );
  }, [page]);

  function handleScroll() {
    if (
      document.documentElement.scrollTop + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up the event listener
    };
  }, []);

  if (loading && data.length === 0)
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );

  return (
    <div className="scroll_page">
      <h1>Infinite Scrolling</h1>

      <div className="box_container">
        {data.length > 0 &&
          data.map((item, idx) => {
            return (
              <div className="box" key={idx}>
                <span>{item.id}</span>
                <h4>{item.body}</h4>
                <p>{item.title}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Scroll;
