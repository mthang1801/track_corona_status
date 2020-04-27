import React from 'react'
import styles from "./Footer.module.css";
import qrcodeImage from "../../../My_Social_Media_Page.png";
const Footer = () => {
  return (
    <div className={styles.footer}>      
      <div className={styles.left_side}>
        <p className={styles.main_content}><i className="fas fa-globe"></i>&nbsp;Website tra cứu diễn biến dịch CoronaVirus</p>
        <p className={styles.sub_content}><i className="fas fa-database"></i>&nbsp;Dữ liệu tra cứu <a href="https://about-corona.net/documentation" target="_blank">tại đây</a></p>
        <p className={styles.author}><i className="fas fa-id-card"></i>&nbsp;Bản quyền thuộc về @MVT</p>
        <p><i className="fas fa-graduation-cap"></i> About author : <a href="https://github.com/mthang1801" target="_blank" className={styles.link}>
          <img src={qrcodeImage} ></img>
        </a></p>
      </div>
      <div className={styles.right_side}>
        <p className={styles.social_fb}>Follow me at: <a href="https://www.facebook.com/maivanthang95" target="_blank"><i className="fab fa-facebook-square fa-lg" aria-hidden="true"></i></a></p>
        <p className={styles.social_github}>Visit my projects at: <a href="https://github.com/mthang1801"><i className="fab fa-github-square fa-lg"></i></a> </p>
        <p className={styles.send_mail}>Mọi ý kiến đóng góp vui lòng gửi <a href="mailto:mthang1801@gmail.com?subject=Feedback&body=" target="popup" onClick="window.open('http://kanishkkunal.in','popup','width=600,height=600');return false;">tại đây</a></p>
      </div>
    </div>
  )
}

export default Footer
