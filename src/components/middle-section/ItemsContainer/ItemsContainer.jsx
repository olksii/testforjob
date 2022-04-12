import React, { useEffect } from "react";
import styles from './ItemsContainer.module.scss'
import Item from "../Item/Item";

function ItemsContainer(props){

    const { items } = props;
    // useEffect(() => {
    //     getProfiles()
    //     .then((response) =>{
    //         console.log(response)})
    //       .catch((error)=>{
    //           console.log(error)
    //       })
    //   }, [])


    return (
        
        <div className={styles.main_section_cards}>
            {items && items.map(item => <Item key={item.id} {...item} />)}
        </div>
           
    )
}

export default ItemsContainer;