import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams ,useRouteMatch } from 'react-router-dom';
import { Row, Col} from 'antd';
import { Link } from 'react-router-dom';
import Skeleton  from 'react-loading-skeleton'
import './style.css'

function Search({}) {
    let param = useRouteMatch();
    const keyword = param.params.value.replace(/\s/g, "%20")

    const fetchAnimeSearch = async (keyword) =>{
        const response = await fetch('https://api.aniapi.com/v1/anime?title='+ keyword +'&nsfw=true')
        return response.json()
    
    }
    const {data,status} = useQuery(['fetchAnimeSearch',keyword],()=>fetchAnimeSearch(keyword))
    useEffect(()=>{
        window.scrollTo(0,0)
        
        
    },[keyword])
    if (status === 'loading'){
        return (
            <div className="anime-wr ">
                <div className="anime-content mr">
                <Row className="anime-body"  gutter={[20,20]}>
                <Col xs={12} sm={3} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>
                <Col xs={12} sm={3} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>
                <Col xs={12} sm={3} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>
                <Col xs={12} sm={3} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>

                <Col xs={12} sm={3} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>
                <Col xs={12} sm={3} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>
                <Col xs={12} sm={3} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>
                <Col xs={12} sm={3} className="anime-item-skeleton"><Skeleton style={{height:'100%'}} /></Col>
                
                </Row>
                </div>
            </div>
        )
    }
    
    
    if (status === 'success'){
        console.log(data)
        if(data.status_code === 404){
            return (
                <div className="search-error">
                    <h1 className="search-error" style={{color:'#fff'}}>
                        Không Tìm Thấy phim
                    </h1>
                    
                </div> 
            )
        }

        if(data.status_code === 200){
            return (
            <div className="anime-wr search">
                <div className="anime-content mr">
                    <Row className="anime-body" gutter={[20,20]}>
                        {
                            data &&
                            data.data.documents.length >0 &&
                            data.data.documents.map(anime =>(
                                <Col key={anime.id} xs={12} sm={8} lg={6} xl={4} xxl={3} >
                                    <Link
                                    className="anime-item"  
                                    to={`/anime/${anime.id}`}
                                    >
                                        <div className="anime-item-img">
                                            <img src={anime.cover_image} alt="img" />
                                        </div>
                                        <p className="anime-item-name">
                                            {anime.titles.en}
                                        </p>
                                    </Link>
                                </Col>        
                            ))
                        }
                    </Row>
                    
                </div>
            </div>
            );
        }
    }
    return (
        <h1>kksks</h1>
    )
}

export default Search;