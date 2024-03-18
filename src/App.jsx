import { useEffect, useState } from 'react'
import { Pagination,Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './App.css'

function App() {
  const [page , setPage] = useState(1)
  const [currentPage , setCurrentPage] = useState(1)
  const [category , setCategory] = useState("general")
  const [apiData , setApiData] = useState()
  const [country , setCountry] = useState("tr")

  async function getData() {

    

    const API_KEY = "3UVIrRG4FduFygQQf5KhyV:70VEydu95EgDAqBCMHXGY0";
  
    const response = await fetch(`https://api.collectapi.com/news/getNews?country=${country}&tag=${category}&apiKey=${API_KEY}&paging=${page}`);
    const data = await response.json();
    setApiData(data)
    console.log(data);
  }
  
  useEffect(() => {
    getData()
  },[page,category,country])
  return (
    <div className="container">
        <div className="newsContainer">
          <div className="newsHeader">
            <div className="category">
              <button onClick={() => {setCategory("technology")}}>Teknoloji</button>
              <button onClick={() => {setCategory("science")}}>Bilim</button>
              <button onClick={() => {setCategory("sport")}}>Spor</button>
              <button onClick={() => {setCategory("economy")}}>Ekonomi</button>
              <button onClick={() => {setCategory("general")}}>Genel</button>
            </div>
            <img className='logo' src="../src/img/Black & White Minimalist Business Logo (1)-Photoroom.png-Photoroom.png" alt="logo" />
            <div className="country">
              <button onClick={() => {setCountry("tr")}}>Türkiye</button>
              <button onClick={() => {setCountry("de")}}>Almanya</button>
            </div>
          </div>
          <div className="allNews">
            {apiData ? (apiData.result.map((x,i) => {
              return(
            <div className='news' id={i} key={i}>
                <div className="singleHeader">
                  <h3>{x.name}</h3>
                </div>
                <img className='newsImage' src={x.image} alt="" />
                <div className="description">
                  <h5>{x.description}</h5>
                </div>
                <button style={{outline:"none"}} onClick={() => window.location.href = `${x.url}`}>Haberi Görüntüle</button>
            </div>)
            })):
              "Yükleniyor..."
          }
          </div>
          <div className="pagination">
           <Pagination onChange={(e) => setPage(e)}  defaultCurrent={1} total={50} />
          </div>
        </div>
    </div>
  )
}

export default App
