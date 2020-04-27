import * as types from "../actions/types";

const initialState = {
  home : true, 
  global :  false ,
  countries : false ,
  cities : false
}

export default function(state=initialState, action){
  const {type, payload} = action;
  switch(type){
    case types.HOME_PAGE : 
      return{
        home: true ,
        global :  false ,
        countries : false ,
        cities : false
      };
    case types.GLOBAL_PAGE : 
      return {
        home: false ,
        global :  true ,
        countries : false ,
        cities : false
      };
    case types.COUNTRIES_PAGE : 
      return {
        home: false ,
        global :  false ,
        countries : true ,
        cities : false
      };
    case types.CITIES_PAGE : 
      return {
        home: false ,
        global :  false ,
        countries : false ,
        cities : true
      };
    default : return state;
  }
}
