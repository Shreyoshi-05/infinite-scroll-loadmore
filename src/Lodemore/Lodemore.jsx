import React, { useEffect, useState } from 'react'
import '../scroll/Scroll.css'

const Scroll = () => {

  // https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`

  const [data , setData] = useState([])
  const [loding , setLoding] = useState(true)
  const [limit , setLimit] = useState(9)


  async function fetchData(url){
    try{
      const res = await fetch(url)
      const gdata = await res.json();
      setData(gdata);
      setLoding(false)

    }catch(err){
      console.log(err);
      setLoding(false)
    }
  }
  

  useEffect(()=>{
    fetchData(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)
  },[limit])

  function handelmore(){
    setLimit(limit+6);
  }
  
    
  // async function getHight(){
  //     // console.log(document.documentElement.scrollHeight)
  //     // console.log(document.documentElement.scrollTop)
  //     // console.log(window.innerHeight)

  //     const full = document.documentElement.scrollHeight;
  //     const scrolled = document.documentElement.scrollTop;
  //     const view = window.innerHeight;

  //   try{
  //     if((document.documentElement.scrollTop + window.innerHeight) >= document.documentElement.scrollHeight){
  //       setPage(pre => pre + 1);
  //     }

  //   }catch(err){
  //     console.log(err)
  //   }
  // }


  // useEffect(()=>{
  //   window.addEventListener('scroll',getHight)
  // },[])

  return (
    <div className='scroll_page'>
    
        <h1>Infinite Scrolling</h1>
        
        <div className="box_container">
        {
          data.length > 0 && data.map((item , idx)=>{
            return(
              <div className="box" key={idx}>
                <span>{item.id}</span>
                <h4>{item.body}</h4>
                <p>{item.title}</p>

              </div>
            )
          })
        }
        </div>

        <button onClick={handelmore}>load more</button>

    </div>
  )
}

export default Scroll
