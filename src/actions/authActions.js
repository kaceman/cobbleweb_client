import axios from 'axios';

export const register = (data) => (dispatch) => {
    const body = {};

    Object.keys(data).forEach((key) => {
        if (key !== 'avatar' && key !== 'photos') {
            body[key] = data[key];
        } else if (key === 'avatar') {
            body[key] = null;
        } else {
            body[key] = [];
        }
    });

    // Helper function to convert file to base64 and append to body object
    const readFileAndAppend = (file, fieldName, single= false) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const commaIndex = reader.result.indexOf(',');
                // Remove everything before the first comma (data:image/png;base64,)
                const base64Data = reader.result.substring(commaIndex + 1);
                if (single) {
                    body[fieldName] = base64Data;
                } else {
                    body[fieldName].push(base64Data);
                }
                resolve();
            };
            reader.readAsDataURL(file);
        });
    };

    // Convert avatar file to base64 and append to FormData
    const avatarPromise = data.avatar && data.avatar[0] ? readFileAndAppend(data.avatar[0], 'avatar', true) : Promise.resolve();

    // Convert each photo file to base64 and append to FormData
    const photosPromises = data.photos ? Object.values(data.photos).map((photo) => readFileAndAppend(photo, 'photos')) : [];

    // Wait for all promises to resolve
    Promise.all([avatarPromise, ...photosPromises]).then(() => {
        // Perform the POST request using Axios
        axios.post('http://localhost:8000/api/users/register', body)
            .then((response) => {
                dispatch(setRegisterSuccess());
                dispatch(setMessages([response.data.message]));
            })
            .catch((error) => {
                if (error.response.data.errors && error.response.data.errors.length > 0) {
                    dispatch(setError(error.response.data.errors));
                }
            });
    });

};

export const login = (data) => (dispatch) => {
    // Perform the POST request using Axios
    axios.post('http://localhost:8000/api/users/login', data)
        .then((response) => {
            const token = response.data.token;
            // Store the token in the session storage
            sessionStorage.setItem('authToken', token);
            dispatch(setLoginSuccess());
        })
        .catch((error) => {
            if (error.response.data.errors && error.response.data.errors.length > 0) {
                dispatch(setError(error.response.data.errors));
            }
        });

};

export const setError = (errors) => ({
    type: 'FAILURE',
    payload: errors,
});

export const setMessages = (messages) => ({
    type: 'MESSAGE',
    payload: messages,
});

export const setLoginSuccess = (success = true) => ({
    type: 'LOGIN_SUCCESS',
    payload: success,
});

export const setRegisterSuccess = (success = true) => ({
    type: 'REGISTER_SUCCESS',
    payload: success,
});