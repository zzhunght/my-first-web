import React, { useState } from 'react';
import logo from '../../img/lg.png'
import { SearchOutlined } from '@ant-design/icons'
import { Input, Space } from 'antd';
import './style.css';
import { Link } from 'react-router-dom';



function Navigation({handelsearchData}) {
    const [value,setValue] = useState('')
    const onSearch = e => {
    
        const newValue = value.replace(/\s/g, "%20")
        handelsearchData(newValue)
    };

    return (
        <div className="navigation">
            <div className="navigation-content">
                <div className="logo-wr">
                    <Link to="/" style={{textDecoration:'none',color:"#fff"}}>Anime</Link>
                </div>
                <div className="search-box" >
                   <input type="text"  placeholder="tên phim" className="input" onChange={e => setValue(e.target.value.replace(/\s/g, "%20"))}/>
                   <button className="search-box-button" type="submit">
                       <Link to={`/search/${value}`} className="search-box-btn">
                            <SearchOutlined />
                       </Link>
                   </button>
                </div>                    
                
            </div>
        </div>
    );
}

export default Navigation;