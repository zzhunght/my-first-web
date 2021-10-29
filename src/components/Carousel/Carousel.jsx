import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Skeleton from 'react-loading-skeleton';
import Slider from "react-slick";
import { Link } from 'react-router-dom'

import "./style.css";

const fetchAnimeCarousel = async () =>{
    const response = await fetch('https://api.aniapi.com/v1/anime')
    return response.json()

}
// const fetchRandomAnime = async () =>{
//   const response = await fetch('https://api.aniapi.com/v1/random/anime/20')
//   return response.json()
// }




function Carousel(props) {

  const settings = {
    autoplay:true,
    dots: true,
    infinite: true,
    autoplaySpeed: 4000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
  };
    
    const { data,isFetching,isError,isSuccess } = useQuery('fetchanimeCarousel',fetchAnimeCarousel,{
      refetchOnWindowFocus:false
    })
    // const { data:random} = useQuery('fetchRandomAnime',fetchRandomAnime)
    console.log(data)
    
    console.log(isFetching,isError,isSuccess)
    if(isFetching){

      return(
        <div className="carousel">
          <Skeleton  className="carousel-slide"/>
        </div>
      )
    }

    if(isSuccess){

      return (
          
        <div className="carousel">
            <Slider {...settings}>
                { data &&
                    data.data.documents.length >0 &&
                    data.data.documents.splice(0,20).map(anime =>(
                        <Link
                         to={`/anime/${anime.id}`}
                         className="carousel-slide" 
                         key={anime.id}
                        >
                            <img src={anime.banner_image}  className="carousel-slide-img"/>
                            <div className="anime-info">
                              {anime.titles.en}
                            </div>
                        </Link>
                    ))
                  
                }
            </Slider>
        </div>
        
      );

    }
}

export default Carousel;