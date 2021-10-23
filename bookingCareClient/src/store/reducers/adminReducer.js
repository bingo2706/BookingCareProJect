import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTimes: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state }
            copyState.genders = action.data
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_FAILED:
            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data
            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = []
            return {
                ...state,

            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data
            return {
                ...state,

            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = []
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.data
            return {
                ...state,

            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.users = []
            return {
                ...state,

            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.data
            return {
                ...state,

            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = []
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.data
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = []
            return {
                ...state,

            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS:
            state.allScheduleTimes = action.data
            return {
                ...state,

            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILED:
            state.allScheduleTimes = []
            return {
                ...state,

            }
        default:
            return state;
    }
}

export default adminReducer;