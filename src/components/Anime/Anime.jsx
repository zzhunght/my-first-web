import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query';
import Skeleton from 'react-loading-skeleton';
import { Row , Col,Pagination } from 'antd';

import './style.css'


function Anime(props) {
    const [page,setPage]= useState(localStorage.getItem('page') || 1)


    const onChange =  (value) =>{
        setPage(value)
        localStorage.setItem('page',value)
    }
    const fetchAnime = async (page) =>{
        const response = await fetch('https://api.aniapi.com/v1/anime?nsfw=true&page=' + page)
        return response.json()
    
    }
    useEffect(()=>{
        window.scrollTo(0,0)
    },[page])
    const { data,status } = useQuery(['fetchanime',page],()=>fetchAnime(page))
    if (status == 'loading'){
        return (
            <div className="anime-wr">
                <div className="anime-content">
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
    
    
    if (status == 'success'){
        return (
        <div className="anime-wr">
            <div className="anime-content">
                <p className="title-new"> ANIME MỚI </p>
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
                <Pagination
                 defaultCurrent={page} 
                 total={100} 
                 pageSize={1} 
                 onChange={onChange} 
                 showSizeChanger
                 className="pagination"
                />
            </div>
        </div>
        );
    }
    
}

export default Anime;