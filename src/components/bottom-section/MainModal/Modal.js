import React from "react";
import PropTypes from 'prop-types'
import './Modal.scss'
import successImg from "../../../assets/svg/success-svgrepo-com.svg"

function Modal(props)  { 

    const {modalType, regErrorName='', setRegError } = props

    let modalHeaderText;
    let modalMainText;
    let modalButtons;

  
    if(modalType === 'errorReg'){
        modalHeaderText = 'Error!'
        modalMainText = regErrorName
        modalButtons  = 
        <div className='modal_buttons_div'>
            <button type='button' className="modal_btn modal_btn--no" onClick={()=>setRegError(false)}>Ok</button>
        </div>  
    }
    else if(modalType === 'successReg'){
        modalHeaderText = 'Success!'
        modalMainText = "Welcome"
        modalButtons  = 
        <div className='modal_buttons_div'>
             <img alt="success" width="40px" src={successImg} />
        </div>
    }
    return(
        <div className = "modal active"  >
            <div className="modalContent">
                <div className="modalContentHeader" >
                    <header className='modalHeader'> {modalHeaderText} </header>
                </div>
                <p className='mainText'>{modalMainText}</p>
                {modalButtons}
            </div>
        </div>
    )

    
}



export default Modal;