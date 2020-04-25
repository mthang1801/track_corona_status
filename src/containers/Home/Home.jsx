import React , {useEffect} from 'react'
import {Header, Navbar, CardsHome, Chart} from "../../components/Home";
import {Spinner} from "../../components";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {changePage} from "../../actions/page";
import {withRouter} from "react-router-dom";
const Home = ({corona : {loading}, history,changePage}) => {
  useEffect(() => {      
    changePage("/");
  }, [])
  if(loading){
    return <Spinner/>
  }
  return (
    <div className="container">      
      <Header/>
      <Navbar/>
      <CardsHome/>
      <Chart/>
    </div>
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
