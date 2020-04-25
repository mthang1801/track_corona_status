import * as types from "./types";

export const changePage = url  => dispatch => {    
 let type = "";
  
  switch(url){
    case "global" : type = types.GLOBAL_PAGE ; break;
    default : type =  types.HOME_PAGE;
  }
  console.log(type);
  dispatch({
    type : type    
  })
}
