import React, { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import 'antd/dist/antd.css';
import './App.css';



import Navigation from './components/Nav/Navigation';
import Carousel from './components/Carousel/Carousel';
import Anime from './components/Anime/Anime';
import AnimeDetails from './components/AnimeDetails/AnimeDetails';
import Watch from './components/Watch/Watch';
import Search from './components/Search/Search';

const queryClient = new QueryClient();



function App() {
  // const [recentlylist,setRecentlylist] = useState(JSON.parse(localStorage.getItem('recently')) || {})
  
  // const setRecently = (data) =>{
  //   setRecentlylist(...recentlylist,data)
  //   localStorage.setItem('recently',JSON.stringify(recentlylist))
  //   console.log('recentlylist',recentlylist)
  // }

  
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Carousel />
            <Anime />
          </Route>
          <Route exact  path="/anime/:id">
            <AnimeDetails  />
          </Route>
          <Route exact path="/anime/:id/watch">
            <Watch />
          </Route>
          <Route exact path="/search/:value">
            <Search  />
          </Route>
        </Switch>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
