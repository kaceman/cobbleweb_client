const initialState = {
    // Other auth-related properties...
    errors: [],
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'REGISTER_FAILURE':
            return {
                ...state,
                errors: action.payload,
            };

        default:
            return state;
    }
};

export default authReducer;