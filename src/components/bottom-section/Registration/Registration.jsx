import React from "react";
import PropTypes from "prop-types";
import Form from "../Form/Form";
import styles from './Registration.module.scss'
import general from '../../../styles/general.module.scss'

function Registration (props) { 
    const { userPositions, setUserCards } = props;
    

    return (
        <div className={styles.reg_section}>
            <h2 className={general.section_header} > Working with POST request </h2>
            <Form userPositions={userPositions} setUserCards={setUserCards} />
        </div>
    )
}

Registration.defaultProps = {
    userPositions: [],
  };

Registration.propTypes = {
    userPositions: PropTypes.array,
    setUserCards: PropTypes.func.isRequired,
  };


export default Registration;