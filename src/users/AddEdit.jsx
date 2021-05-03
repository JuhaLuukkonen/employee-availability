import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { userService, alertService } from '../_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        jobTitle: Yup.string()
            .required('Job title is required'),
        age: Yup.number()
            .required('Age is required'),
        availability: Yup.string()
            .required('Availability is required'),        
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, getValues, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createUser(data)
            : updateUser(id, data);
    }

    function createUser(data) {
        return userService.create(data)
            .then(() => {
                alertService.success('User added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateUser(id, data) {
        return userService.update(id, data)
            .then(() => {
                alertService.success('User updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    const [user, setUser] = useState({});    

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            userService.getById(id).then(user => {
                const fields = ['firstName', 'lastName', 'jobTitle', 'age', 'availability'];
                fields.forEach(field => setValue(field, user[field]));
                setUser(user);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Employee' : 'Edit Employee'}</h1>
            <div className="form-row">                
                <div className="form-group col-5">
                    <label>First Name</label>
                    <input name="firstName" type="text" ref={register} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.firstName?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Last Name</label>
                    <input name="lastName" type="text" ref={register} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-4">
                    <label>Job title</label>
                    <input name="jobTitle" type="text" ref={register} className={`form-control ${errors.jobTitle ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.jobTitle?.message}</div>
                </div>
                <div className="form-group col-4">
                    <label>Age</label>
                    <input name="age" type="number" ref={register} className={`form-control ${errors.age ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.age?.message}</div>
                </div>
                <div className="form-group col-2">
                    <label>Availability</label>
                    <select name="availability" ref={register} className={`form-control ${errors.availability ? 'is-invalid' : ''}`}>
                        <option value=""></option>
                        <option value="Available">Available</option>
                        <option value="Not Available">Not available</option>
                        <option value="Unknown">Unknown</option>
                    </select>
                    <div className="invalid-feedback">{errors.availability?.message}</div>
                </div>
            </div>                        
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export { AddEdit };