import React from 'react'
import styles from  "./Spinner.module.css";
const Spinner = () => {
  return (
    <>
      <div class={styles.overlay}></div>
     <div class={styles.spinner}><div></div><div></div><div></div><div></div></div>
    </>
    
  )
}

export default Spinner
