
const reducer = (state, action) => {
    switch (action.type) {
        case 'GETUSERDATA':
            return {
                ...state,
                email: action.payload.email,
                name: action.payload.name,
                uid: action.payload.uid,
                userType: action.payload.userType,
                userProfile: action.payload.profile ? action.payload.profile : null
            }
        case 'POSTUSERPROFILE':
            console.log('data', action.payload)
            return {
                ...state,
                userProfile: action.payload.profile
            }
        case 'STUDENTPROFILE':
            console.log('data', action.payload)
            return {
                ...state,
                studentProfiles: action.payload
            }
        case 'COMPANYPROFILE':
            console.log('data', action.payload)
            return {
                ...state,
                companyProfiles: action.payload
            }
        case 'ADDJOBPOST':
            console.log('data', action.payload)
            return {
                ...state,
                companyVacancies: action.payload
            }
        default:
            return state;
    }

}


export default reducer;