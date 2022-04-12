import React from "react";
import PropTypes from "prop-types";
import styles from './ItemsContainer.module.scss'
import Item from "../Item/Item";

function ItemsContainer(props){

    const { items } = props;

    return (
        
        <div className={styles.main_section_cards}>
            {items && items.map(item => <Item key={item.id} {...item} />)}
        </div>
           
    )
}
ItemsContainer.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
export default ItemsContainer;