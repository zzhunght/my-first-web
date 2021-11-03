import React from 'react';
import { Link } from 'react-router-dom'
import { Row , Col } from 'antd';

function Recently(props) {
    const recentlyList = JSON.parse(localStorage.getItem('recently')) || []
    const arr = []
   
    function unique(arr) {
        var newArr = []
        for (var i = 0; i < arr.length; i++) {
            if(i==0){
                newArr.push(arr[i],)
            }
            if(i!=0){
                if (!newArr.includes(arr[i])) {
                    let cloneArr = arr[i] //clone ra arr mới để so sánh
                    let a = false // biến thử xem có bằng nhau k?
                    for(let i= 0 ;i<newArr.length;i++){
                        if(newArr[i].data.id == cloneArr.data.id ){
                            a =true;
                            break;
                        }
                        else{
                            a = false;
                        }
                    }
                    if(!a){
                        newArr.push(cloneArr)
                    }
                }
            }
        }
        return newArr
    }
    const animeList = unique(recentlyList?.slice(0,8))
    // console.log('unique',unique(recentlyList))
    // console.log('recently-page', recentlyList)

    if(animeList.length > 0 ){
        return (
            <div className="anime-wr">
                <div className="anime-content">
                    <p className="title-new"> Đã xem gần đây  </p>
                    <Row className="anime-body" gutter={[20,20]}>
                        {
                            
                            animeList?.map(anime =>(
                                <Col key={anime.data.id} xs={12} sm={8} lg={6} xl={4} xxl={3} >
                                    <Link
                                    className="anime-item"  
                                    to={`/anime/${anime.data.id}`}
                                    >
                                        <div className="anime-item-img">
                                            <img src={anime.data.cover_image} alt="img" />
                                        </div>
                                        <p className="anime-item-name">
                                            {anime.data.titles.en || anime.titles.jp || anime.titles.it || 'No Name' }
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
    else {
        return (
            <>
            </>
        )
    }
}

export default Recently;