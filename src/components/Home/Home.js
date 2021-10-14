import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import SuggestedPlaylist from '../SuggestedPlaylist/SuggestedPlaylist';
import Lists from '../Lists/Lists';
import './Home.css'

function Home() {
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState();
  const [temp, setTemp] = useState(0);
  const [randomTracks, setRandomTracks] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [currentData, setCurrentData] = useState({});
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENTID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENTSECRET;

  async function getWeather() {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = process.env.REACT_APP_OPENWEATHER_APIKEY;
        
        const weather = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        console.log(weather)
        const obj = {};
        obj.date = new Date(weather.data.dt * 1000);
        obj.city = weather.data.name;
        obj.temperature = weather.data.main.temp;
        obj.min =  weather.data.main.temp_min;
        obj.max =  weather.data.main.temp_max;


        if(Object.keys(weatherData).length === 0){
          setWeatherData(obj);
        }

        setTemp(weather.data.main.temp);
      })
    }
  }

  function defineGenre(temp) {
    if(temp > 32) {
      setGenre('rock');
    }
    if (temp <= 32 && temp > 24) {
      setGenre('pop');
    }
    if (temp <= 24 && temp > 16) {
      setGenre('classical');
    } 
    if (temp <= 16) {
      setGenre('hiphop');
    }
  }

  function callSpotify() {
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {
      const token = tokenResponse.data.access_token;
      axios(`https://api.spotify.com/v1/browse/categories/${genre}/playlists?offset=0&limit=20&country=BR&locale=pt_BR`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
      })
      .then(genres => {
        const playlistRef = genres.data.playlists.items[0].href;
        axios(playlistRef, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + token}
        })
        .then(playlist => {
          const playlistArray = playlist.data.tracks.items;
          const shuffled = playlistArray.sort(() => 0.5 - Math.random()).slice(0, 10);
          setRandomTracks(shuffled);
          setLoading(false);
        })

      })
    })
  }

  function handleData(){
    const data = [];
    for(let item of randomTracks) {
      const obj = {};
      obj.name = item.track.name
      obj.artist = item.track.artists[0].name;
      data.push(obj);
    }
    console.log(data);
    setCurrentData({
      ...weatherData,
      genre,
      tracks: data});
  }

  useEffect(() => {
    getWeather();
    if(temp) {
      setLoading(true);
      defineGenre(temp);
    }
    if(genre) {
      callSpotify();
    }
  }, [genre, temp]);

  useEffect(() => {
    if(Object.keys(currentData).length !== 0){
      localStorage.setItem(`Playlist ${localStorage.length + 1}`, JSON.stringify(currentData));
    }

  }, [currentData]);

  return (
    <Box className='main-box'sx={{
      display: 'flex',
      justifyContent: 'center',
      minHeight: '100vh'
    }}>
      <Paper variant='outlined'>
        <Header
          weatherData={weatherData}
        />
          <main>
            <Router>
              <Switch>
                <Route render={() =>
                  <Lists 
                    handleData={handleData}
                    callSpotify={callSpotify}
                    setLoading={setLoading}
                  />
                } path="/lists" ></Route>
                <Route render={() => 
                  <SuggestedPlaylist
                    handleData={handleData}
                    callSpotify={callSpotify}
                    setLoading={setLoading}
                    loading={loading}
                    genre={genre}
                    randomTracks={randomTracks}
                  />} path="/" ></Route>
              </Switch>
            </Router>
          </main>
      </Paper>
    </Box>
  );
}

export default Home;
