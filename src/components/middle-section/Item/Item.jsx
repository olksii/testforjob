import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from './Item.module.scss'



const Item = (props) => {
    const { photo, name, email, position, phone } = props;
    

    return (
        <div className={styles.card}>
            <img  className={styles.card_photo} width='70px' height='70px' src={photo} alt={name} />
            <p className={classNames(styles.card_name, styles.card_text)}>{ name }</p>
            <div>
                <p className={styles.card_text}>{position}</p>
                <p className={styles.card_text}>{email}</p>
                <p className={styles.card_text}>{phone}</p>
            </div>
            
        </div>
    )
}

Item.propTypes = {
    photo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  };

export default Item;