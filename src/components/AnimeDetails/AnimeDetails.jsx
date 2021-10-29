import React, { useEffect } from 'react';
import { useParams ,useRouteMatch } from 'react-router-dom';
import axios from 'axios'
import { CaretRightOutlined } from '@ant-design/icons'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Skeleton } from 'react-loading-skeleton';
import './style.css'


const fetchAnimeDetails = async (id) =>{
    return axios.get(`https://api.aniapi.com/v1/anime/${id}`)

}
const fetchEpisodeList = async (id) =>{
    return axios.get(`https://api.aniapi.com/v1/episode?anime_id=${id}&locale=it&page=1`)
}


function AnimeDetails({}) {


    let param = useRouteMatch();
    const id = param.params.id;

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

   
   
    const { data: anime ,status } = useQuery(['fetchanimeDetails',id],()=>fetchAnimeDetails(id))
    
    const anime_id = anime?.data.data.id 

    const { data:episode } = useQuery(['fetchEpisodeList',id],()=>fetchEpisodeList(anime_id),{
        enabled:!!anime_id
    })

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
      
        const handelSaveFilm = () =>{
            const recently = JSON.parse(localStorage.getItem('recently'))
            console.log('rêcntly',recently)
            if(recently){
                
                const clonerecently =[anime.data,...recently]
                console.log('new arr',clonerecently)
                localStorage.setItem('recently',JSON.stringify(clonerecently))
            }
            else {
                const recentlist =[anime.data]
                localStorage.setItem('recently',JSON.stringify(recentlist))
            }
            
           
        }
    
    
    return (
        <div className="anime-detail">
            <div className="anime-details-bg">
                <img src={anime.data.data.banner_image} className="bg-dt"  alt=''/>  
            </div>
            <div className="anime-detail-content">
                <div className="anime-details-img">
                    <img src={anime.data.data.cover_image}  alt='' className="cv-img" /> 
                </div>
                <div className="anime-details-info">
                    {
                        episode?.data.status_code !== 404 ? 
                            <Link className="watch-now" to={`/anime/${anime.data.data.id}/watch`}  onClick = {handelSaveFilm}>
                                <CaretRightOutlined /> Xem Ngay
                             </Link> :
                             <div className="watch-now no-video">
                                
                                Chưa Xem Được

                             </div>
                    }
                    
                    <div className="des">
                        <p className="title">{anime.data.data.titles.en ? anime.data.data.titles.en : anime.data.data.titles.jp}</p>
                        <p className="genre">Thể Loại:{anime.data.data.genres.slice(0,5).map(genre=><span key={genre}>{genre} </span>)} </p>
                        <p className="descriptions">{anime.data.data.descriptions.en ? anime.data.data.descriptions.en : 'No Descriptions' }</p>
                    </div>
                </div>
            </div>
        </div>
    );
    }
}

export default AnimeDetails;