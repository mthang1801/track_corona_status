import React, {useEffect} from 'react'
import clsx from "clsx";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import styles from "./Global.module.css";
import {changePage} from "../../actions/page";
import Spinner from "../../components/Layout/Spinner/Spinner";
import {Header, CardDetails, Tables} from "../../components/Global";
import {getDataItem}  from "../../actions/corona";
import {Link, withRouter} from "react-router-dom";

const Global = ({corona : {new_update, histories, data_item}, changePage, getDataItem, location}) => {  
  useEffect(() => {    
    console.log(location);
    getDataItem(histories[0])   
  }, [histories]);

  useEffect(()=>{
    document.title = "Toàn cầu";
  },[location.pathname]);

  if(!data_item){
    return <Spinner/>
  }
  return (
    <React.Fragment>    
      <div style={{margin:"2rem"}}>
        <Header />
        <CardDetails/>
        <Tables />        
        <Link to="/"><i className="fas fa-arrow-left"></i> Trở về trang chủ</Link>
        <div style={{float : "right"}}>
          <Link to="/countries">Xem chi tiết từng quốc gia <i className="fas fa-arrow-right"></i></Link>
        </div>
      </div>
    </React.Fragment>
  )
}

Global.propTypes = {
  corona : PropTypes.object.isRequired,  
  changePage : PropTypes.func.isRequired,  
}

const mapStateToProps = state => ({
  corona : state.corona,
  page : state.page
})
export default connect(mapStateToProps, {changePage, getDataItem})(withRouter(Global));
