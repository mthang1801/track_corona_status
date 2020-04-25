import React from 'react'
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
import withWidth from '@material-ui/core/withWidth';
import PropTypes from "prop-types";
import {TableItem} from "../../components";
import styles from "./Tables.module.css";
const useStyles = makeStyles({
  root: {
    width: '100%',   
  },
  container: {
    maxHeight: 500,
  },
});

const Tables = ({corona : {histories} , width}) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);  
  const [labels, setLabels]= React.useState(["date", "confirmed", "recovered", "deaths", "active", "new_confirmed", "new_recovered","new_deaths" ])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);    
  };

  const labels_vi = labels.map( item => {
    switch(item){
      case "date" : return "Thời gian" ; 
      case "confirmed" : return "Tổng số ca nhiễm" ;
      case "recovered" : return "Tổng số  hồi phục";
      case "deaths" : return "Tổng số  tử vong"; 
      case "active" : return "Số ca dương tính hiện tại";
      case "new_confirmed" : return "Ca nhiễm trong ngày";
      case "new_recovered" : return "Hồi phục trong ngày";
      case "new_deaths" : return "Tử vong trong ngày";
      default : return null ;
    }
  })
  console.log(labels_vi);
  return (
    <Paper className={classes.root}>
    <TableContainer className={classes.container}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead >
          <TableRow>
            {labels.map((label, index) => {
              if(label === "active" && width==="md"){
                return null ;
              }
              if(["active", "new_confirmed", "new_recovered", "new_deaths"].indexOf(label) !== -1 ){
                if(["sm", "xs"].indexOf(width) !== -1){                     
                  return null;
                }
              }
              return (
                <TableCell
                  width={`100/${labels.length}%`}
                  align="center"
                  key={label}  
                  className={`styles.${label}`}                                                        
                >
                  {labels_vi[index]}
                </TableCell>
              )
              })}              
          </TableRow>
        </TableHead>
        <TableBody>
          {histories.slice(page* rowsPerPage, page*rowsPerPage+ rowsPerPage).map( (row,index) => (        
              <TableItem key={index} labels={labels} row={row} />
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[10, 25, 50, 100]}
      component="div"
      count={histories.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  </Paper>  
  )
}

Tables.propTypes = {
  corona : PropTypes.object.isRequired,
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
}

const mapStateToProps = state => ({
  corona : state.corona
})

export default withWidth()(connect(mapStateToProps)(Tables))
