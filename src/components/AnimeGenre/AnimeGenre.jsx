import React ,{ useState } from 'react';
import { useParams , useRouteMatch} from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query';
import Skeleton from 'react-loading-skeleton';
import { Row , Col,Pagination } from 'antd';

import './style.css'
const fetchAnimeGenres = (id ,page ) =>{
    return axios.get(`https://api.aniapi.com/v1/anime?genres=${id}&nsfw=true&page=${page}`)
}

function AnimeGenre(props) {
    const params = useParams()
    console.log(params)
    const [page,setPage]= useState( 1)

    const id = params.id.replace(/\s/g, "%20");

    const {data , isFetching,isLoading} = useQuery(['fetchAnimeYears',id,page],()=>fetchAnimeGenres(id,page),{
        refetchOnWindowFocus:false,
    })
    console.log(id)
    console.log('data-genre',data)
    
    const onChange =  (value) =>{
        setPage(value)
        // localStorage.setItem('page-years',value)
    }
    if (isFetching || isLoading ){
        return (
            <div className="anime-wr">
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



    return (
        <div className="anime-wr">
            <div className="anime-content mr">
                <div className="anime-year-label">
                    ANIME  {id}
                </div>
                <Row className="anime-body" gutter={[20,20]}>
                    {   
                        data.data.status_code <400 &&
                        data?.data.data.documents.map(anime =>(
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
                <Pagination
                 defaultCurrent={page} 
                 total={data?.data.data.last_page || 10} 
                 pageSize={1} 
                 onChange={onChange} 
                 showSizeChanger
                 className="pagination"
                />
            </div>
        </div>
        );
    
}

export default AnimeGenre;