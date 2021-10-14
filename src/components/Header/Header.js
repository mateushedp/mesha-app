import React from "react";
import moment from "moment";
import 'moment/locale/pt-br';
import { WbSunny } from "@material-ui/icons";
import "./Header.css"

function Header(props) {
  moment.locale('pt-br');
  const city = props.weatherData.city;
  const date = moment(props.weatherData.date).format('dddd, DD [de] MMMM [de] YYYY');
  const temp = Math.floor(props.weatherData.temperature);
  console.log(props);
  const min = Math.floor(props.weatherData.min);
  const max = Math.floor(props.weatherData.max);
  return (
    <header>
      <div className="weather-icon">
        <WbSunny style={{fontSize: '100px'}}/>
      </div>
      <div className="weather-description">
        <p>{date}</p>
        <p>{city}, Brasil</p>
      </div>
      <div className="weather-temperature">
        <p>{temp}º</p>
        <div className="min-max-temperature">
          <p style={{borderBottom: '2px solid white'}}>{min}º</p>
          <p>{max}º</p>
        </div>
      </div>
    </header>
  )
}

export default Header;