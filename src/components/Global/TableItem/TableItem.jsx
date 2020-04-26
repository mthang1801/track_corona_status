import React from 'react'
import withWidth from "@material-ui/core/withWidth";
import Moment from "react-moment";
import PropTypes from "prop-types";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {v4 as uuid} from "uuid";
import {getDataItem} from "../../../actions/corona";
import {connect} from "react-redux";
import styles from "./TableItem.module.css";
import CountUp from 'react-countup';
const TableItem = ({labels, row, width, getDataItem}) => {
  const handleClick = e => {
    getDataItem(row);
    window.scroll({
      top : 0,
      behavior : "smooth"
    })
  }
  return (
    <TableRow hover tabIndex={-1} onClick={handleClick} className={styles.row} style={{cursor: "pointer"}}>
      {labels.map( label => {
        const value = row[label];
        if(label==="active" && width === "md"){
          return null
        }
        if(["active", "new_confirmed", "new_recovered", "new_deaths"].indexOf(label) !== -1 ){
          if(["sm", "xs"].indexOf(width) !== -1){                     
            return null;
          }
        }
        return(
          <TableCell key={uuid()} align="center"  >
            {typeof value === "number" ? value.toLocaleString("en-US") : <Moment format="DD-MM-YYYY">{value}</Moment> }
          </TableCell>
        )
      })} 
    </TableRow>
  )
}

TableItem.propTypes = {
  width : PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
  getDataItem : PropTypes.func.isRequired
}

export default withWidth()(connect(null,{getDataItem})(TableItem));
