import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {login, setError, setLoginSuccess} from '../actions/authActions';
import {Link, useNavigate} from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const errors = useSelector((state) => state.auth.errors);
    const loginSuccess = useSelector((state) => state.auth.loginSuccess);
    const navigate = useNavigate();

    const { register: loginForm, handleSubmit } = useForm();

    const renderInput = (label, name, type = 'text') => (
        <div className="mb-4">
            <label className="block text-gray-700">{label}:</label>
                <input className="form-input mt-1 block w-full border" type={type} {...loginForm(name)} />
        </div>
    );

    const onSubmit = async (data) => {
        dispatch(setError([]));
        dispatch(login(data));
    };

    useEffect(() => {
        if (loginSuccess) {
            navigate('/profile');
            dispatch(setError([]));
            dispatch(setLoginSuccess(false));
        }
    }, [loginSuccess, navigate, dispatch]);

    return (
        <div className="max-w-md mx-auto mt-8 p-8 bg-white shadow-md rounded-md">
            <h2 className="text-4xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
                {renderInput('Email', 'username')}
                {renderInput('Password', 'password', 'password')}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Login</button>
                {errors.length > 0 && (
                    <div className="text-red-500 mt-4">
                        {errors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </form>
            <Link to="/register" className="text-blue-500 underline">Don't have an account? Register here</Link>
        </div>
    );
};

export default Login;