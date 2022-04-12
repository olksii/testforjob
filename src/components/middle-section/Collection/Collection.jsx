import React, { useState } from "react";
import PropTypes from "prop-types";
import {getProfiles } from "../../../axios/axios";
import ItemsContainer from "../ItemsContainer/ItemsContainer";
import styles from './Collection.module.scss'
import general from '../../../styles/general.module.scss'

function Collection(props) {
    const { userCards, setUserCards } = props;
    
    const [nextUrl, setNextUrl] = useState("/api/v1/users?offset=6&count=6");

    const showMoreCards = () => {
        getProfiles(nextUrl)
            .then((response) => {
                setNextUrl(response.data.links.next_url)
                let newArray = [...userCards, ...response.data.users]
                setUserCards(newArray)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <section className={styles.main_section}>
            <h2 className={general.section_header}>
                Working with GET request
            </h2>
            <ItemsContainer items={userCards} />
            <div className={styles.main_section_button} >
                {nextUrl ? <span className={(general.button_showmore)} onClick={() => { showMoreCards() }}>Show more</span> : ""}
            </div>
        </section>
    )
}

Collection.propTypes = {
    userCards: PropTypes.array.isRequired,
    setUserCards: PropTypes.func.isRequired,
  };

export default Collection;