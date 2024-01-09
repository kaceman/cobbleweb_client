import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { register } from '../actions/authActions';

const Register = () => {
    const dispatch = useDispatch();
    const errors = useSelector((state) => state.auth.errors);

    const { register: registerForm, handleSubmit } = useForm();

    const renderInput = (label, name, type = 'text', isMultiple = false) => (
        <div className="mb-4">
            <label className="block text-gray-700">{label}:</label>
            {isMultiple ? (
                <input className="form-input mt-1 block w-full" type={type} {...registerForm(name)} multiple />
            ) : (
                <input className="form-input mt-1 block w-full border" type={type} {...registerForm(name)} />
            )}
        </div>
    );

    const onSubmit = (data) => {
        dispatch(register(data));
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-8 bg-white shadow-md rounded-md">
            <h2 className="text-4xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
                {renderInput('First Name', 'firstName')}
                {renderInput('Last Name', 'lastName')}
                {renderInput('Email', 'email')}
                {renderInput('Password', 'password', 'password')}
                {renderInput('Avatar', 'avatar', 'file')}
                {renderInput('Photos', 'photos', 'file', true)}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Register</button>
                {errors.length > 0 && (
                    <div className="text-red-500 mt-4">
                        {errors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </form>
            <a href="/login" className="text-blue-500 underline">Already have an account?</a>
        </div>
    );
};

export default Register;