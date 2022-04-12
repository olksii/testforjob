import classNames from "classnames";
import React from "react";
import styles from './Item.module.scss'



const Item = (props) => {
    const { id, photo, name, email, position, phone } = props;

    return (
        <div className={styles.card}>
            <img  className={styles.card_photo} src={photo} alt={name} />
            <p className={classNames(styles.card_name, styles.card_text)}>{ name }</p>
            <div>
                <p className={styles.card_text}>{position}</p>
                <p className={styles.card_text}>{email}</p>
                <p className={styles.card_text}>{phone}</p>
            </div>
            
        </div>
    )
}

export default Item;