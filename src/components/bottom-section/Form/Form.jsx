import React, {useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import styles from './Form.module.scss';
import general from '../../../styles/general.module.scss'
import Modal from "../MainModal/Modal";
import { getProfiles, getToken, sendRegData } from "../../../axios/axios";
import classNames from "classnames";


function FormReg(props) {

    const { userPositions, setUserCards } = props


    const [photoName, setPhotoName] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [regError, setRegError] = useState(false);
    const [regErrorName, setRegErrorName] = useState('')
    const [regSuccess, setRegSuccess] = useState(false)
    const emailCharacters = /^(?!\.)("([^"\r\\]|\\["\r\\])*"|([-a-z0-9!#$%&'*+/=?^_`{|}~]|(?<!\.)\.)*)(?<!\.)@[a-z0-9][\w\.-]*[a-z0-9]\.[a-z][a-z\.]*[a-z]$/

    const initialValues = {
        name: "",
        email: "",
        phone: "",
        photo: undefined,
    };

    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .required("Name is required")
            .min(2, "At least 2 symbols")
            .max(60, "60 characters max")
            .matches(/^[aA-zZ\s]+$/, "Only Latin characters"),
        email: yup
            .string()
            .required("Email is required")
            .min(2, "At least 2 symbols")
            .max(100, "100 characters max")
            .matches(emailCharacters, "Matches to RFC2822"),
        phone: yup
            .string()
            .required("Phone is required")
            .matches(/^[\+]{0,1}380([0-9]{9})$/, "Wrong phone number"),
    });
    const refreshUsers = () => {
        getProfiles()
        .then(({ data }) => {
            setUserCards(data.users)
        })
        .catch((error) => {
            console.log(error)
        })  
    }
    const completeReg = ()=>{
        setRegSuccess(true)
        setTimeout(() => {
            setRegSuccess(false);
          }, 1000);
    }
    const handleSubmit = (data, acions) => {
        const regData = { ...data, photo: photo }
        getToken()
            .then(({ data }) => {

                let formData = new FormData();
    
                for (let key in regData){
                    formData.append(key, regData[key])
                }
                
                createNewUser(formData, data);
            })
            .catch((error) => { console.log(error) })

        const createNewUser = function (formData, { token }) {
            let config = {
                headers: {
                    Token: token,
                    'Content-Type': 'multipart/form-data'
                }
            }
            sendRegData( formData, config)
                .then((resp) => {
                    acions.resetForm()
                    setPhotoName(null)
                    refreshUsers()
                    completeReg()
                })
                .catch((err) => {
                    setRegError(true)
                    setRegErrorName(err.response.data.message)
                })
        }
       
    }
    const handleChange = (event) => {
        const image = event.target.files[0];
        if (image.size > 5000000) {
            setRegError(true)
            setRegErrorName('Max size is 5Mb')
        } else if (!image.name.match(/\.(jpg|jpeg)$/)) {
            setRegError(true)
            setRegErrorName('Wrong image format')
        } else {
            setPhotoName(image.name)
            setPhoto(image)
        }
    }

    return (
        <div className={styles.modal}>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                validateOnBlur
                photo
            >
                {({ errors, touched, isValid, dirty }) => {
                    return (
                        <Form className={styles.form}>
                             <label className={styles.form_label} htmlFor="name">
                                <Field
                                    className={styles.form_input}
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                />
                                <p className={styles.form_input_error}>
                                    {touched.name && errors.name && errors.name}
                                </p>
                            </label>
                            <label className={styles.form_label} htmlFor="email">
                                <Field
                                    className={styles.form_input}
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                />
                                <p className={styles.form_input_error}>
                                    {touched.email && errors.email && errors.email}
                                </p>
                            </label>

                            <label className={styles.form_label} htmlFor="phone">
                                {" "}
                                <Field
                                    className={styles.form_input}
                                    type="text"
                                    name="phone"
                                    format="(###) ### ## ##"
                                    placeholder="Phone "

                                />
                                <p className={styles.form_input_error}> {touched.phone && errors.phone && errors.phone}</p>
                                +38 (xxx)xxx-xx-xx

                            </label>
                            <p className={styles.form_text}>Select your position</p>

                            {userPositions ?
                                <div className={styles.form_label_radio_group} role="group">
                                    <label className={styles.form_text}>
                                        <Field className={styles.form_radio} type="radio" name="position_id" value='0' checked />
                                        {userPositions[0].name}
                                    </label>
                                    <label className={styles.form_text}>
                                        <Field className={styles.form_radio} type="radio" name="position_id" value='1' />
                                        {userPositions[1].name}
                                    </label>
                                    <label className={styles.form_text}>
                                        <Field className={styles.form_radio} type="radio" name="position_id" value='2' />
                                        {userPositions[2].name}
                                    </label>
                                    <label className={styles.form_text}>
                                        <Field className={styles.form_radio} type="radio" name="position_id" value='3' />
                                        {userPositions[3].name}
                                    </label>
                                </div> : ""}

                            <div className={styles.form_input_file_block}>
                                <label className={styles.form_input_label}>
                                    Upload
                                    <input name='photo' className={styles.form_input_file} type="file" onChange={handleChange} />
                                </label>
                                <span className={styles.form_input_label_upload} > {photoName ? photoName : 'Upload your photo'} </span>
                            </div>
                            <p className={styles.form_input_error}> {touched.photo && !photo && "Photo is required"} </p>

                            <div className={styles.form_bottom}>
                                <button className={classNames(styles.submit_btn, general.button)} disabled={!photo || !dirty || !isValid} type="submit">
                                    Submit
                                </button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
            {regError ? <Modal modalType='errorReg' regErrorName={regErrorName} setRegError={setRegError} /> : ""}
            {regSuccess ? <Modal modalType='successReg' /> : ""}
        </div>
    )

}
FormReg.defaultProps = {
    userPositions:[],
  };

  FormReg.propTypes = {
    userPositions: PropTypes.array,
    setUserCards: PropTypes.func.isRequired,
  };


export default FormReg;