const initialState = {
    // Other auth-related properties...
    errors: [],
    messages: [],
    registerSuccess: null,
    loginSuccess: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'REGISTER_SUCCESS':
            return {
                ...state,
                registerSuccess: action.payload,
            };

        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loginSuccess: action.payload,
            };

        case 'FAILURE':
            return {
                ...state,
                errors: action.payload,
            };

        case 'MESSAGE':
            return {
                ...state,
                messages: action.payload,
            };

        default:
            return state;
    }
};

export default authReducer;