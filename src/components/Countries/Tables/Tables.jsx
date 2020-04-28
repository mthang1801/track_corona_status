import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import {getCountryData, getDefaultCountryData} from "../../../actions/corona";
import withWidth from '@material-ui/core/withWidth';
import styles from "./Tables.module.css";
const useStyles = makeStyles(theme => ({
  root: {
   width : "100%"
  },
  container: {
    [theme.breakpoints.up("xs")] : {
      maxHeight: 350,
    },
    [theme.breakpoints.up("sm")] : {
      maxHeight: 400,
    },
    [theme.breakpoints.up("md")] : {
      maxHeight: 450,
    },
    [theme.breakpoints.up("lg")] : {
      maxHeight: 500,
    },
    [theme.breakpoints.up("xl")] : {
      maxHeight: 600,
    }
  },
  input_root : {    
    padding: '0',
    margin : "1rem 0",
    marginLeft : "auto",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input : {
    [theme.breakpoints.up("xs")] : {
      width : "100%"
    },
    [theme.breakpoints.up("sm")] : {
      width : "60%"
    },
    [theme.breakpoints.up("md")] : {
      width : "40%",
      marginLeft : "auto"
    },
    [theme.breakpoints.up("lg")] : {
      width : "30%"
    },
    [theme.breakpoints.up("xl")] : {
      width : "25%"
    }
  }
}));

const displayCountryData = countries => {
  return countries.map(country => ({
    name : country.name,
    confirmed : country.latest_data.confirmed,
    deaths : country.latest_data.deaths,
    new_confirmed : country.today.confirmed,
    new_deaths : country.today.deaths,
    recovered : country.latest_data.recovered,
    active : country.latest_data.confirmed - country.latest_data.recovered - country.latest_data.deaths,
    critical : country.latest_data.critical,
    cases_per_one_mil : country.latest_data.calculated.cases_per_million_population,
    deaths_per_one_mil : country.latest_data.calculated.deaths_per_mllion_population
  }))
}

const Tables = ({countries, getCountryData, width, getDefaultCountryData}) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchResults, setSearchResults] = React.useState(displayCountryData([...countries]))
  const [search, setSearch] = React.useState("");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const TblRef = React.useRef(null);
  React.useEffect(()=>{    
    let results ;
    if(search.trim() === ""){
      results = displayCountryData([...countries])
    }else{
      results = displayCountryData([...countries]).filter( country => country.name.toLowerCase().indexOf(search.trim().toLowerCase()) !== -1 );      
    }   
    setSearchResults(results);
  }, [search])
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  let columns = [
    { id: "name", label: "Tên" },
    { id: "confirmed", label: "Số ca nhiễm", format : value => value.toLocaleString("en-us") },
    { id: "deaths", label: "Tử vong" , format : value => value.toLocaleString("en-us")},
    { id: "new_confirmed", label: "Ca nhiễm mới", format : value => value.toLocaleString("en-us") },
    { id: "new_deaths", label: "Ca tử vong mới", format : value => value.toLocaleString("en-us") },
    { id: "recovered", label: "Đã Hồi phục", format : value => value.toLocaleString("en-us") },
    { id: "active", label: "Số ca dương tính", format : value => value.toLocaleString("en-us") },
    { id: "critical", label: "Nghiêm trọng", format : value => value.toLocaleString("en-us") },
    { id: "cases_per_one_mil", label: "Tỉ lệ nhiễm/ 1Tr dân", format : value => value.toLocaleString("en-us") },
    { id: "deaths_per_one_mil", label: "Tỉ lệ tử vong/ 1Tr dân", format : value => value.toLocaleString("en-us") },
  ];
  
  if(width==="xs"){
    columns = columns.filter( ({id}) => id === "confirmed" || id === "name" || id==="deaths" || id === "recovered" );
  }
  if(width === "sm"){
    columns = columns.filter( ({id}) => id === "confirmed" || id === "name" || id==="deaths" || id === "recovered" || id==="critical" );
  }
  if(width === "md"){
    columns = columns.filter( ({id}) => id === "confirmed" || id === "name" || id==="deaths" || id === "recovered" || id==="active" || id ==="critical");
  }
  
  const handleClick = name => e => {
    let code = countries.find(country => country.name === name ).code;
    if(!code){
      getDefaultCountryData();
      window.scroll({
        top : 0,
        behavior : "smooth"
      })
      return;
    }
    getCountryData(code);
    window.scroll({
      top : 0,
      behavior : "smooth"
    })
 
  }

  const handleChange = e => {
    setSearch(e.target.value)
    setPage(0);
  }
  return (
    <div className={styles.container}>
      <form className={classes.input_root} noValidate autoComplete="off" onSubmit={e => e.preventDefault()}>
        <TextField  label="Tìm kiếm quốc gia" onChange={handleChange} variant="outlined" id="standard-size-small" size="small" classes={{ root : classes.input}}/>      
      </form>
     
      <Paper className={classes.root}>
        <TableContainer className={classes.container} ref={TblRef}>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                {columns.map((column) => {                  
                  return (
                    <TableCell
                    width={`100/${columns.length}%`}
                    key={column.id}               
                    align="center"               
                  >
                    {column.label}
                  </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name} style={{cursor: "pointer"}} onClick={handleClick(row.name)} className={styles.table_row}>
                    {columns.map((column) => {
                      const value = row[column.id];  
                      if(width === "xs"){
                        if(column.id === "deaths"){
                          return (                         
                            <TableCell key={column.id} align="center" style={{color: "rgba(255,0,0,.9)", fontWeight : 700}} >
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>                   
                          )
                        }
                        if(column.id === "confirmed"){
                          return (
                            <TableCell key={column.id} align="center" style={{color: "rgba(100,100,100,.8)", fontWeight : 700}} >
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell> 
                          )
                        }
                      }
                      if(column.id === "recovered"){
                        return (                         
                          <TableCell key={column.id} align="center" style={{color : "rgba(0,255,0, .9)", fontWeight: 600}} >
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>                          
                        )
                      }
                      if(column.id === "name"){                          
                        return (                         
                            <TableCell key={column.id} align="center" style={{textDecoration : "underline", color : "blue"}} >
                              {value === "World" ? "Thế giới" : value} 
                            </TableCell>                          
                        )
                      }                      
                      if(column.id === "new_confirmed"|| column.id === "new_deaths" ) {
                        if(value === 0){
                          return   <TableCell key={column.id} align="center" >
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        }
                        return (
                          <TableCell key={column.id} align="center" style={{color: "rgba(255,0,0,.9)", fontWeight : 700}} >
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      }          
                      return (
                        <TableCell key={column.id} align="center"  >
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={searchResults.length}
          rowsPerPage={rowsPerPage}
          page={page}          
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          style={{marginRight: "2rem"}}
          labelRowsPerPage="Số dòng"
        />
      </Paper>
    </div>
  )
}

Tables.propTypes = {
  countries : PropTypes.array.isRequired,
  getCountryData : PropTypes.func.isRequired,
  width : PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
  getDefaultCountryData : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  countries : state.corona.countries
})

export default withWidth()(connect(mapStateToProps, {getCountryData, getDefaultCountryData})(Tables))
