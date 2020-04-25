import * as types from "../actions/types";

const initialState = {
  home : true, 
  global :  false ,
  country : false ,
  city : false
}

export default function(state=initialState, action){
  const {type, payload} = action;
  switch(type){
    case types.HOME_PAGE : 
      return{
        home: true ,
        global :  false ,
        country : false ,
        city : false
      };
    case types.GLOBAL_PAGE : 
      return {
        home: false ,
        global :  true ,
        country : false ,
        city : false
      };
    case types.COUNTRY_PAGE : 
      return {
        home: false ,
        global :  false ,
        country : true ,
        city : false
      };
    case types.CITY_PAGE : 
      return {
        home: false ,
        global :  false ,
        country : false ,
        city : true
      };
    default : return state;
  }
}
