import React, { useEffect } from 'react';
import { useParams ,useRouteMatch } from 'react-router-dom';
import { CaretRightOutlined } from '@ant-design/icons'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Skeleton } from 'react-loading-skeleton';
import './style.css'

function AnimeDetails({}) {

    let param = useRouteMatch();
    const id = param.params.id;

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    const fetchAnimeDetails = async () =>{
        const response = await fetch(`https://api.aniapi.com/v1/anime/${id}`)
        return response.json()
    
    }
    const { data,status } = useQuery('fetchanimeDetails',fetchAnimeDetails)
    
    if(status == 'loading'){
        return(
            <h1>loading</h1>
        //     <div className="anime-detail">
        //     <div className="anime-details-bg">
        //         <Skeleton className="bg-dt"/>  
        //     </div>
        //     <div className="anime-detail-content">
        //         <div className="anime-details-img">
        //             <Skeleton className="cv-img" /> 
        //         </div>
        //         <div className="anime-details-info">
        //             <Link className="watch-now">
        //              <CaretRightOutlined /> Watch Now
        //             </Link>
        //             <div className="des">
        //                 <Skeleton className="title"/>
        //                 <Skeleton className="genre"/>
        //                 <Skeleton className="descriptions"/>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        )
    }
    if (status == 'success'){
      
    
    
    return (
        <div className="anime-detail">
            <div className="anime-details-bg">
                <img src={data.data.banner_image} className="bg-dt"  alt=''/>  
            </div>
            <div className="anime-detail-content">
                <div className="anime-details-img">
                    <img src={data.data.cover_image}  alt='' className="cv-img" /> 
                </div>
                <div className="anime-details-info">
                    <Link className="watch-now" to={`/anime/${data.data.id}/watch`} >
                     <CaretRightOutlined /> Watch Now
                    </Link>
                    <div className="des">
                        <p className="title">{data.data.titles.en ? data.data.titles.en : data.data.titles.jp}</p>
                        <p className="genre">Genre:{data.data.genres.slice(0,5).map(genre=><span key={genre}>{genre} </span>)} </p>
                        <p className="descriptions">{data.data.descriptions.en ? data.data.descriptions.en : 'No Descriptions' }</p>
                    </div>
                </div>
            </div>
        </div>
    );
    }
}

export default AnimeDetails;