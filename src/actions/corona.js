import * as types from "./types";
import axios from "axios";
import _ from "lodash";

const url_history = "https://corona-api.com";
const url_countries = "https://corona-api.com/countries/"
const url_population = "https://world-population.p.rapidapi.com/worldpopulation";
export const loadData = () =>  async dispatch => {
  try {   
    
    //get history     
    let res = await axios.get(`${url_history}/timeline`);  
    let histories = res.data.data.map( data => ({
      confirmed : data.confirmed,
      recovered : data.recovered,
      deaths    : data.deaths,
      active    : data.active,
      new_confirmed : data.new_confirmed,
      new_deaths : data.new_deaths,
      new_recovered : data.new_recovered,
      date : data.date
    }))  
    
    //get countries
    res = await axios.get(`${url_history}/countries`);
    let countries = res.data.data;
    
    let totalCritical = _.sumBy(countries, (country => country.latest_data.critical));
    let totalActive = _.sumBy(countries, (({latest_data}) => latest_data.confirmed - latest_data.recovered -latest_data.deaths));
    let confirmed = _.sumBy(countries, (({latest_data}) => latest_data.confirmed));
    let recovered = _.sumBy(countries, (({latest_data}) => latest_data.recovered));
    let deaths = _.sumBy(countries, (({latest_data}) => latest_data.deaths));
    
    //get new update
    let new_update ={} ;
    new_update.totalActive = totalActive;
    new_update.totalCritical = totalCritical;
    new_update.confirmed = confirmed;
    new_update.recovered = recovered;
    new_update.deaths = deaths;
    new_update.date = histories[0].date;

    //Sort number of confirmed by country
    countries = _.sortBy(countries, (country => -country.latest_data.confirmed));
    countries = countries.map( country => {
      country.latest_data.calculated.deaths_per_mllion_population = Math.round(country.latest_data.deaths / country.population * 1000000);
      return country;
    })
  
    //get population
    let config = {
      headers : {
        "x-rapidapi-host": "world-population.p.rapidapi.com",
        "x-rapidapi-key": "ccc2cdf0f3msh4d43c21dd521c22p113ff2jsnf92455d7ae64"
      }
    }
    res = await axios.get(url_population, config);
    let world_population = res.data.body.world_population;
    let world = {
      name : "World",
      population : world_population,
      updated_at : countries[0].updated_at,
      today : {
        deaths : _.sumBy(countries , country => country.today.deaths),
        confirmed : _.sumBy(countries, country => country.today.confirmed)
      },
      latest_data : {
        deaths :  _.sumBy(countries , country => country.latest_data.deaths),
        confirmed :  _.sumBy(countries , country => country.latest_data.confirmed),
        recovered :  _.sumBy(countries , country => country.latest_data.recovered),
        critical :  _.sumBy(countries , country => country.latest_data.critical),        
      }
    };
    world.latest_data.calculated = {
      death_rate : world.latest_data.deaths / world.latest_data.confirmed,
      recovery_rate : world.latest_data.recovered / world.latest_data.recovered,
      cases_per_million_population :Math.round( world.latest_data.confirmed / world.population * 1000000),
      deaths_per_mllion_population : Math.round(world.latest_data.deaths / world.population * 1000000)
    }
    countries.unshift(world);
    dispatch({
      type : types.LOADED_DATA,
      payload : {new_update, histories : histories , countries , home_country : {timeline : histories}}
    })
  } catch (error) {    
    dispatch({
      type : types.DATA_ERROR,
      payload : {msg : error.response.statusText, status : error.response.status}
    })
  }
}

export const getDataItem = data => dispatch => {
  dispatch({
    type : types.DATA_ITEM,
    payload : data
  })
}

export const getHomeCountryData = countryCode => async dispatch => {
  let url = "";
  switch(countryCode){
    case "GB" : url = `${url_history}/timeline`; break;
    case "VN" : url = `${url_countries}/VN` ; break;
    default : url = `${url_countries}/${countryCode}`;
  }
  
  try {
    let res = await axios.get(url);   
    if(countryCode === "GB"){
      dispatch({
        type : types.DATA_HOME_COUNTRY,
        payload : {timeline : res.data.data}
      })
    }else{
      dispatch({
        type : types.DATA_HOME_COUNTRY,
        payload : res.data.data
      })
    }
  } catch (error) {
    dispatch({
      type : types.DATA_ERROR,
      payload : {msg : error.response.statusText, status : error.response.status}
    })
  }
}

export const clearCountry = () => dispatch => {  
  dispatch({
    type : types.CLEAR_COUNTRY
  })
}

export const loadHomePage = () => dispatch => {
  dispatch({
    type : types.LOAD_HOME
  })
}

export const getCountryData = code => async dispatch => {
  
  try {
    let res = await axios.get(`${url_history}/countries/${code}`);
    if(code){
      dispatch({
        type : types.DATA_COUNTRY,
        payload : res.data.data
      })
      return;
    }
    dispatch({
      type : types.DATA_COUNTRY
    })
   
  } catch (error) {
    dispatch({
      type : types.DATA_ERROR,
      payload : {msg : error.response.statusText, status : error.response.status}
    })
  }
}

export const  getDefaultCountryData = () => dispatch => {
  dispatch({
    type : types.DEFAULT_DATA_COUNTRY
  })
}
