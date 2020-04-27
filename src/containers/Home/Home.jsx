import React , {useEffect} from 'react'
import {Header, Navbar, CardsHome, Charts, StatisticCards} from "../../components/Home";
import {Spinner} from "../../components";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {changePage} from "../../actions/page";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import styles from "./Home.module.css";
import Footer from "../../components/Layout/Footer/Footer";

const Home = ({corona : {loading, home_country}, location,changePage}) => {
  useEffect(() => {         
    changePage("/");
  },[location]);

  useEffect(()=>{
    document.title = "Trang chủ"
  },[location.pathname]);

  if(loading || !home_country){
    return <Spinner/>
  }
  return (
    <React.Fragment>
      <Header/>
      <div className="container">              
        <Navbar/>
        <CardsHome/>
        <StatisticCards/>
        <Charts/>
        <Link to="/countries" className={styles.link}>Xem thêm các quốc gia</Link>        
      </div>
      <Footer />
    </React.Fragment>
  )
}

Home.propTypes = {
  corona : PropTypes.object.isRequired,
  changePage : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  corona : state.corona
})

export default connect(mapStateToProps, {changePage})(withRouter(Home));
