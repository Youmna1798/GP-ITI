import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const initialstate = {
    token:null,
    email:null,
    ForgotPassword:null,
    RestPassword:null,
    ChangePassword:null,
    UpdateProfile:null,
    errorLogin:null,
    errorSignup:null,
    errorForgotPassword:null,
    errorRestPassword:null,
    errorRestPasswordMessage:null,
    errorChangePassword:null,
    errorUpdateProfile:null,
    userName:"",
    userEmail:"",
    userAddress:"",
    userPhoneNumber:"",
}


// login success and fail

const authLoginSuccess = (state ,action)=>{
    return updateObject(state,{
        token:action.token,
        errorLogin:null,
    })
}

const authLoginFail = (state ,action)=>{
    return updateObject(state,{
        errorLogin:action.errorLogin,
    })
}

// signup success and fail

const authSignUpSuccess = (state ,action)=>{
    return updateObject(state,{
        email:action.email,
        errorSignup:null,
    })
}

const authSignUpFail = (state ,action)=>{
    return updateObject(state,{
        errorSignup:action.errorSignup,
    })
}

// Change password success and fail

const authChangePasswordSucess = (state ,action)=>{
    return updateObject(state,{
        ChangePassword:action.ChangePassword,
        errorChangePassword:null,
    })
}

const authChangePasswordFail = (state ,action)=>{
    return updateObject(state,{
        errorChangePassword:action.errorChangePassword,
    })
}
// forgot password success and fail

const authForgotPasswordSucess = (state ,action)=>{
    return updateObject(state,{
        ForgotPassword:action.ForgotPassword,
        errorForgotPassword:null,
    })
}

const authForgotPasswordFail = (state ,action)=>{
    return updateObject(state,{
        errorForgotPassword:action.errorForgotPassword,
    })
}

// reset password success and fail

const authRestPasswordSucess = (state ,action)=>{
    return updateObject(state,{
        RestPassword:action.RestPassword,
        errorRestPassword:null,
        
    })
}

const authRestPasswordFail = (state ,action)=>{
    return updateObject(state,{
        errorRestPassword:action.errorRestPassword,
        errorRestPasswordMessage:action.errorRestPasswordMessage,
        
    })
}

// logout

const authLogout = (state ,action)=>{
    return updateObject(state,{
        token:null
    });
}



// load user profile success and fail

const loadUserProfileSuccess = (state ,action)=>{
    return updateObject(state,{
        userName:action.userName,
        userEmail:action.userEmail,
        userAddress:action.userAddress,
        userPhoneNumber:action.userPhoneNumber,
    })
}

const loadUserProfileFail = (state ,action)=>{
    return updateObject(state,{
        errorLogin:action.errorLogin,
    })
}

// update user profile success and fail

const updateUserProfileSuccess = (state ,action)=>{
    return updateObject(state,{
        UpdateProfile:action.UpdateProfile,
    })
}

const updateUserProfileFail = (state ,action)=>{
    return updateObject(state,{
     errorUpdateProfile:action.errorUpdateProfile,
    })
}




// reducers actiontypes
const reducer =(state=initialstate,action) =>{
    switch(action.type){
      
        case actionTypes.AUTH_LOGIN_SUCCESS: return authLoginSuccess(state,action)
        case actionTypes.AUTH_SIGNUP_SUCCESS: return authSignUpSuccess(state,action)
        case actionTypes.AUTH_LOGIN_FAIL: return authLoginFail(state,action)
        case actionTypes.AUTH_SIGNUP_FAIL: return authSignUpFail(state,action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state,action)
        case actionTypes.AUTH_FORGOT_PASSWORD_SUCCESS: return authForgotPasswordSucess(state,action)
        case actionTypes.AUTH_FORGOT_PASSWORD_FAIL: return authForgotPasswordFail(state,action)
        case actionTypes.AUTH_PASSWORD_REST_SUCCESS: return authRestPasswordSucess(state,action)
        case actionTypes.AUTH_PASSWORD_REST_FAIL: return authRestPasswordFail(state,action)
        case actionTypes.AUTH_CHANGE_PASSWORD_SUCCESS: return authChangePasswordSucess(state,action)
        case actionTypes.AUTH_CHANGE_PASSWORD_FAIL: return authChangePasswordFail(state,action)
        case actionTypes.LOAD_USER_PROFILE_SUCCESS: return loadUserProfileSuccess(state,action)
        case actionTypes.LOAD_USER_PROFILE_FAIL: return loadUserProfileFail(state,action)
        case actionTypes.UPDATE_USER_PROFILE_SUCCESS: return updateUserProfileSuccess(state,action)
        case actionTypes.UPDATE_USER_PROFILE_FAIL: return updateUserProfileFail(state,action)
        default:
            return state;
    }
}

export default reducer;