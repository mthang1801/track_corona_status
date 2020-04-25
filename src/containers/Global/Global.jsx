import React, {useEffect} from 'react'
import clsx from "clsx";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import styles from "./Global.module.css";
import {changePage} from "../../actions/page";
import {Tables, Chart, CardDetails, Spinner} from "../../components";
import {getDataItem}  from "../../actions/corona";

const Global = ({corona : {new_update, histories, data_item}, changePage, getDataItem}) => {  
  useEffect(() => {
    changePage("global");
    getDataItem(histories[0])   
  }, [histories]);
  
  if(!data_item){
    return <Spinner/>
  }
  return (
    <>    
      <div style={{margin:"1rem 2rem"}}>
        <h1 className={styles.header}>DIỄN BIẾN DỊCH VIRUS CORONA TRÊN TOÀN CẦU</h1>
        <CardDetails/>
        <Tables />
      </div>
    </>
  )
}

Global.propTypes = {
  corona : PropTypes.object.isRequired,  
  changePage : PropTypes.func.isRequired,  
}

const mapStateToProps = state => ({
  corona : state.corona
})
export default connect(mapStateToProps, {changePage, getDataItem})(withRouter(Global));