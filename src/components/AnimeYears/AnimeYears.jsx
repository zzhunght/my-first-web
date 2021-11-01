import React ,{ useState } from 'react';
import { useParams , useRouteMatch} from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query';
import Skeleton from 'react-loading-skeleton';
import { Row , Col,Pagination } from 'antd';

import './style.css'

const fetchAnimeYears = (id,page) =>{
    return axios.get(`https://api.aniapi.com/v1/anime?year=${id}&page=${page}&nsfw=true`)
}

function AnimeYears(props) {
    const params = useParams()
    console.log(params)
    const [page,setPage]= useState(localStorage.getItem('page-years') || 1)

    const id = params.id
    const {data , isFetching,isSucess,isLoading} = useQuery(['fetchAnimeYears',id,page],()=>fetchAnimeYears(id,page),{
        refetchOnWindowFocus:false,
    })
    console.log(id)
    
    const onChange =  (value) =>{
        setPage(value)
        localStorage.setItem('page-years',value)
    }
    if (isFetching || isLoading ){
        return (
            <div className="anime-wr">
                <div className="anime-content  mr">
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
                    ANIME NĂM {id}
                </div>
                <Row className="anime-body" gutter={[20,20]}>
                    {
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

export default AnimeYears;