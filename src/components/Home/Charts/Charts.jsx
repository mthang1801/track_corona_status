import React from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Line, Bar, Pie} from "react-chartjs-2";
import styles from "./Charts.module.css";
import clsx from "clsx";
import CountUp from "react-countup";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Public from "@material-ui/icons/Public"
import Flag from "react-world-flags";
import {getHomeCountryData} from "../../../actions/corona";
import Spinner from "../../Layout/Spinner/Spinner";
import withWidth from "@material-ui/core/withWidth";
function TabPanel(props) {
  const { classes , children, value, index, ...other } = props;

    return (
      <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
     >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
    )
};
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    width : 75,
    minWidth :75
  },
}));

const Chart = ({corona : {histories, new_update, countries, home_country},getHomeCountryData, width}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {      
    async function fetchData(){     
      if(value === 0 ){
        await getHomeCountryData("GB");
      }else if(value === 6) {
        await getHomeCountryData("VN");
      }else{        
        await getHomeCountryData(countries[value].code);
      }      
    }
    fetchData();    
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const topCountries = [];
  for(let i = 1 ; i < 6 ; i++){
    topCountries.push(countries[i]);
  }

  const vn_region = countries.find(country => country.code === "VN");
  if(vn_region){
    topCountries.push(vn_region);
  }

  
  let ascendingTimeLine = [...home_country.timeline];
  ascendingTimeLine.reverse();
 
 
  const lineChartCountry = (  
    <div className={styles.line_chart}>
      <Line         
        options={{
          responsive : true ,
          maintainAspectRatio: false,
          scales :{
            xAxis : [{
              ticks : {
                fontSize : 10
              },             
              gridLineWidth: 0,
              labelMaxWidth : 5               
            }],
            yAxis : [{
              ticks : {
                fontSize : 10,                
              },
              font: function(context) {
                var width = context.chart.width;
                var size = Math.round(width / 32);

                return {
                    weight: 'bold',
                    size: size
                };
             },
              labelMaxWidth : 5, 
              gridLineWidth: 0,
            }]
          },
          elements : {
            point : {
              radius : 2
            }
          }
        }}
        data={{
          labels : ascendingTimeLine.map(({date}) => date),
          datasets: [
            {
              label: "Xác nhận" ,
              data : ascendingTimeLine.map(({confirmed}) => confirmed),              
              strokeColor : "rgba(80,80,80)",
              showLine: true,
              fill : "none",   
              pointBorderWidth: 1,                          
            },
            {
              label: "Hồi phục" ,
              data : ascendingTimeLine.map(({recovered}) => recovered),
              backgroundColor : "rgba(0,255,0,.8)",                 
            },
            {
              label : "Tử vong",
              data : ascendingTimeLine.map(({deaths}) => deaths),
              backgroundColor : "rgba(255, 0, 0)",                              
            },
          ]
        }}
      />   
    </div>
    
  )
  if(!home_country){
    return <Spinner/>
  }
  return (
   <React.Fragment>
    <h2 className={styles.title}>BIỂU ĐỒ DỊCH TRÊN TOÀN CẦU VÀ MỘT SỐ QUỐC GIA</h2>
    <div className={classes.root}>     
      <AppBar position="static" color="inherit">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"          
          aria-label="scrollable prevent tabs example"          
        >
          <Tab icon={<Public style={{color: "rgba(0,0,255,.8)"}}/>} aria-label="phone" {...a11yProps(0)} classes={{root :classes.tab}} />
          {topCountries.map( (country, index) => (
            <Tab key={country.code} icon={<Flag code={country.code} height={16}/>}  aria-label={country.name} {...a11yProps(index+1)} classes={{root :classes.tab}} />
          ))}              
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} classes={classes} >        
          {lineChartCountry}             
        </TabPanel>
      {topCountries.map( (country, index) => (
        <TabPanel key={index+1} value={value} index={index+1} classes={classes}>
          {lineChartCountry}
        </TabPanel>
      ))}      
      
    </div>
   </React.Fragment>
  )
}

Chart.propTypes = {
  corona : PropTypes.object.isRequired,
  page : PropTypes.object.isRequired,
  getHomeCountryData : PropTypes.func.isRequired,
  width : PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
}

const mapStateToProps = state =>({
  corona : state.corona,
  page : state.page
})
export default withWidth()(connect(mapStateToProps,{getHomeCountryData})(Chart));
