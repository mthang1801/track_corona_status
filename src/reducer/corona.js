import * as types from "../actions/types";

const initialState = {
  new_update : null ,
  histories : [],
  data_item : null, 
  countries : [] ,
  country : null ,
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
      }
    case types.DATA_ERROR :    
      return{
        new_update : null ,
        history : [],
        countries : [] ,
        country : null ,
        cities : [] , 
        city : null,
        loading : false,
         error : {...payload }
      }
    default : return state ;
  }
}
