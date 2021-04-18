import React from 'react';
import { homePhoneMask } from '../../Constanst';


export const FormInput = ({inputName, label, register, errors, validators, ...other}) => {
    return (
    <>
        <label>{label}</label>
        <input className="form-control"  {...register(inputName, validators)} {...other}/> 
        {errors  && <span className="form-error">{errors.message}</span>} 
    </>
    )
}