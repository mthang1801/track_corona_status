import * as types from "./types";
import axios from "axios";
import _ from "lodash";

const url = "https://covid19.mathdro.id/api";
const url_history = "https://corona-api.com";
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
    countries = _.sortBy(countries, (country => -country.latest_data.confirmed))
    dispatch({
      type : types.LOADED_DATA,
      payload : {new_update, histories : histories , countries}
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
