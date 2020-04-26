import * as types from "../actions/types";

const initialState = {
  new_update : null ,
  histories : [],  
  data_item : null, 
  countries : [] ,
  country : null ,
  home_country : null, //active at home page
  cities : [] , 
  city : null, 
  loading : true,
  error : null 
}

export default function(state=initialState, action){
  const {type, payload} = action;
  switch(type){
    case types.LOADED_DATA :
      return {
        ...state ,
        ...payload ,       
        loading: false
      };
    case types.DATA_ITEM : 
      return {
        ...state,
        data_item : payload ,
        loading :false
      };
    case types.DATA_HOME_COUNTRY :
      return {
        ...state ,
        loading : false,
        home_country : payload
      };
    case types.DATA_COUNTRY : 
    console.log(payload);
      return {
        ...state,
        loading : false ,
        country : payload
      };
    case types.CLEAR_COUNTRY : 
      return {
        ...state, 
        country : null ,
        loading: false 
      };
    case types.DEFAULT_DATA_COUNTRY : 
      let data = {...state.countries[0]};
      data.timeline = [...state.histories];
      return{
        ...state ,
        country : data,
        loading :false
      }
    case types.DATA_ERROR :    
      return{
        new_update : null ,
        history : [],
        countries : [] ,
        country : null ,
        home_country : null,
        cities : [] , 
        city : null,
        loading : false,
         error : {...payload }
      }
    default : return state ;
  }
}
