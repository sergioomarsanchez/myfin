import {useEffect, useState} from 'react'
import style from '../../styles/News.module.css'
import axios from 'axios'
import Image from 'next/image'




function News({ apiKey }) {
  const [articles, setArticles] = useState([])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://seeking-alpha.p.rapidapi.com/news/v2/list',
      params: {category: 'market-news::all', size: '10', number: '1'},
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'seeking-alpha.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      setArticles(response.data['data']);
    }).catch(function (error) {
      console.error(error);
    });
  }, [])
  


  return (
    <div className={style.container}>
      <h2 className={style.pageTitle}>Lastest 10 market News</h2>
      <div className={style.articlesContainer}>
        {
          articles.length?
          articles.map(article=>{
            return <div className={style.article} key={article.id} >
              <div className={style.title}>{article.attributes.title}</div>
              <div className={style.content} dangerouslySetInnerHTML={{ __html:article.attributes.content}}></div>
              <div className={style.imageContainer}>{article.attributes.gettyImageUrl&&<Image className={style.image} src={article.attributes.gettyImageUrl} alt='Article image' width={700} height={500}/>}</div>
              <div className={style.line}/>
            </div>
          })
          :<div className={style.ldsripple}><div></div><div></div></div>
        }
      </div>
      
    </div>
  )
}

export async function getServerSideProps(){
  const APYKEY= process.env.APIKEY
  return{
    props:{
      apiKey: APYKEY
    }
  }
}


export default News