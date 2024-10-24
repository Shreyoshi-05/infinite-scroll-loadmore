import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [firstIds , setFirstId] = useState([])
  const [objData , setObjdata] = useState([])

  async function fetchUrl(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  function getJobtitle(title){
    const arr = title.split(/\((YC [^)]+)/);
    if(arr.length > 2){
      const p1 = arr[0];
      const p2 = arr[1];
      return `${p1} ${p2}`
    }
    return N/A;
  }

  function getJobInfo(title){
    const arr = title.split(/\((YC [^)]+)/);
    if(arr.length > 2){
      return arr[2];
    }
    return N/A;
  }

  function getTime(time){
    const now = new Date();
    const date = now.toLocaleDateString();
    return date;
  }

  async function fetchdatafrmId(firstIds){
    const apiCall = firstIds.map((item , i)=>{
      const url = `https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`
      return fetchUrl(url);
    })
    const results = await Promise.all(apiCall);
    // console.log(results)

    if(results.length){
      const newArr = results.map((item)=>{
        let obj = {
          jobTitle:getJobtitle(item.title),
          jobInfo:getJobInfo(item.title),
          date:getTime(item.time),
          url:item.url,
        }
        return obj;
      })
      let copy = [...objData];
      copy = [...copy,...newArr]
      setObjdata(copy)
    }
  }
  console.log(objData);

  async function fetchData() {
    const data = await fetchUrl(
      "https://hacker-news.firebaseio.com/v0/jobstories.json"
    );
    const firstnine = data.splice(0,9);
    setFirstId(firstnine);
    fetchdatafrmId(firstIds);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handelLoadMore(){}

  if(!objData)return<><h1>Loding...</h1></>

  return <>
  <div className="page">
    <h1>Job Board</h1>
    <div className="card_container">
      {
        objData && objData.map((item, i)=>{
          return(
            <a className="card">
              <h3>{item.jobTitle}</h3>
              <p>{item.jobInfo}</p>
              <h4>{item.date}</h4>
            </a>
          )
        })
      }
    </div>
    <button onClick={handelLoadMore}>Load more</button>
  </div>
  </>;
}

export default App;
