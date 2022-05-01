import React from "react";
import styles from './Header.module.scss'
import general from '../../../styles/general.module.scss'
import logo_pic from '../../../assets/svg/yellow_face.svg'
import classNames from "classnames";

function Header() {
    return (
        <div>
        <div className="header">
            <div className="container">
            <div className={styles.hero_header}>
                <div className={styles.hero_header_logo}>
                    <img width='26px' height='26px' src={logo_pic} alt="logo" />
                    <span className={styles.hero_header_logo_text}>testtask</span>
                </div>
                <div className={styles.hero_header_btns}>
                    <span className={classNames(general.button)}> Users </span>
                    <span className={classNames(general.button, styles.sign_up_btn)}> SignUp </span>
                </div>
            </div>
            </div>
            </div>
            <div className={styles.hero_main_pic}>
                <div className={styles.hero_main_pic_content}>
                    <h2 className={styles.hero_main_header_text}>Test assignment for front-end developer</h2>
                    <p className={styles.hero_main_text}>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
                    <span className={classNames(general.button, styles.sign_up_btn)}> SignUp </span>
                </div>
            </div>
        </div>
        
    )
}

export default Header;