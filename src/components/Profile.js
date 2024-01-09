import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { setMessages } from '../actions/authActions';
import { useDispatch } from 'react-redux';

const Profile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                // Retrieve the token from sessionStorage
                const authToken = sessionStorage.getItem('authToken');

                // Check if the token is present
                if (authToken) {
                    // Make a request to the /api/users/me endpoint with the token in the headers
                    const response = await axios.get('http://localhost:8000/api/users/me', {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    });

                    // Set the user info in the state
                    setUserInfo(response.data);
                } else {
                    // Handle the case where the token is not present
                    console.error('No authToken found');
                    navigate('/login');
                }
            } catch (error) {
                // Handle any errors
                console.error('Failed to fetch user info', error);
                dispatch(setMessages(['Session expired']));
                navigate('/login');
            }
        };

        // Call the function to fetch user info
        fetchUserInfo();
    }, []); // The empty dependency array ensures that the effect runs only once after the initial render

    // Slick carousel settings
    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-8 bg-white shadow-md rounded-md">
            <h2 className="text-4xl font-bold mb-4">Profile</h2>
            {userInfo && (
                <div>
                    <div className="mb-4 text-center">
                        <img
                            src={userInfo.avatar}
                            alt="Avatar"
                            className="w-20 h-20 object-cover rounded-full mx-auto"
                        />
                    </div>
                    <p>Email: {userInfo.email}</p>
                    <p>Name: {userInfo.fullName}</p>

                    {/* Slick carousel for photos */}
                    {userInfo.photos && userInfo.photos.length > 0 && (
                        <div className="mt-4">
                            <Slider {...carouselSettings}>
                                {userInfo.photos.map((photo, index) => (
                                    <div key={index}>
                                        <img src={photo} alt={`Photo ${index + 1}`} className="w-full" />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Profile;
