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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
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
  }
}));

const Chart = ({corona : {histories, new_update, countries}}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const topCountries = [];
  for(let i = 0 ; i < 5 ; i++){
    topCountries.push(countries[i]);
  }
  const vn_region = countries.find(country => country.code === "VN");
  if(vn_region){
    topCountries.push(vn_region);
  }

  console.log(topCountries);
  return (
   <React.Fragment>
    <div className={classes.root}>     
      <AppBar position="static" color="inherit">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
          color
        >
          <Tab icon={<Public/>} aria-label="phone" {...a11yProps(0)} classes={{root :classes.tab}} />
          {topCountries.map( (country, index) => (
            <Tab key={country.code} icon={<Flag code={country.code} height={16}/>}  aria-label={country.name} {...a11yProps(index+1)} classes={{root :classes.tab}} />
          ))}        
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
      
    </div>
   </React.Fragment>
  )
}

Chart.propTypes = {
  corona : PropTypes.object.isRequired,
  page : PropTypes.object.isRequired
}

const mapStateToProps = state =>({
  corona : state.corona,
  page : state.page
})
export default connect(mapStateToProps)(Chart);
