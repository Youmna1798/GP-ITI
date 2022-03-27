import axios from 'axios';
import * as actionTypes from './actionTypes';


// login success and fail

export const authLoginSuccess = (token) => {
    return{
        type:actionTypes.AUTH_LOGIN_SUCCESS,
        token:token,
    }
}

export const authLoginFail = (error) => {
    return{
        type:actionTypes.AUTH_LOGIN_FAIL,
        errorLogin:error
    }
}

// signup success and fail

export const authSignUpSuccess = (email) => {
    return{
        type:actionTypes.AUTH_SIGNUP_SUCCESS,
        email:email,
    }
}

export const authSignUpFail = (error) => {
    return{
        type:actionTypes.AUTH_SIGNUP_FAIL,
        errorSignup:error
    }
}

// change password success and fail

export const authChangePasswordSucess = (status) => {
    return{
        type:actionTypes.AUTH_CHANGE_PASSWORD_SUCCESS,
        ChangePassword:status,
    }
}

export const authChangePasswordFail = (error) => {
    return{
        type:actionTypes.AUTH_CHANGE_PASSWORD_FAIL,
        errorChangePassword:error
    }
}


// forgot password success and fail

export const authForgotPasswordSucess = (status) => {
    return{
        type:actionTypes.AUTH_FORGOT_PASSWORD_SUCCESS,
        ForgotPassword:status,
    }
}

export const authForgotPasswordFail = (error) => {
    return{
        type:actionTypes.AUTH_FORGOT_PASSWORD_FAIL,
        errorForgotPassword:error
    }
}

// reset password success and fail


export const authRestPasswordSucess = (status) => {
    return{
        type:actionTypes.AUTH_PASSWORD_REST_SUCCESS,
        RestPassword:status,
        
    }
}

export const authRestPasswordFail = (error,message) => {
    return{
        type:actionTypes.AUTH_PASSWORD_REST_FAIL,
        errorRestPassword:error,
        errorRestPasswordMessage:message
        
    }
}

// load user profile success and fail

export const loadUserProfileSuccess = (Name,email,address,phone_number) => {
    return{
        type:actionTypes.LOAD_USER_PROFILE_SUCCESS,
        userName:Name,
        userEmail:email,
        userAddress:address,
        userPhoneNumber:phone_number,
    }
}

export const loadUserProfileFail = (error) => {
    return{
        type:actionTypes.LOAD_USER_PROFILE_FAIL,
        errorLoadProfile:error
    }
}


// update user profile success and fail

export const updateUserProfileSuccess = (Name,email,address,phone_number, status) => {
    return{
        type:actionTypes.UPDATE_USER_PROFILE_SUCCESS,
        Name:Name,
        Email:email,
        Address:address,
        PhoneNumber:phone_number,
        UpdateProfile:status
    }
}

export const updateUserProfileFail = (error) => {
    return{
        type:actionTypes.UPDATE_USER_PROFILE_FAIL,
        errorUpdateProfile:error
    }
}


// logout

export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('id');
    localStorage.removeItem('cart');
    localStorage.removeItem('Wishlist');
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}


// for token expiration Time

export const checkAuthTimeout = expirationTime =>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

// login (fetch data from backend) 

export const authLogin = (email,password) => {
    return dispatch =>{
        axios.post('http://127.0.0.1:8000/api/login/',{
            email:email,
            password:password
        })
        .then(res=>{
            const id = res.data.user.id;
            const token = res.data.token;
            const expirationDate = new Date(new Date().getTime() +  604800*1000)
            localStorage.setItem('token',token);
            localStorage.setItem('id',id);
            localStorage.setItem('expirationDate',expirationDate);
            dispatch(authLoginSuccess(token));
            dispatch(checkAuthTimeout(604800));
        })
        .catch(err =>{
            dispatch(authLoginFail(err))
        })
    }
}

// Signup (fetch data from backend) 

export const authSignup = (Name,email,password,password2) => {
    return dispatch =>{
        axios.post('http://127.0.0.1:8000/api/register/',{
            Name:Name,
            email:email,
            password:password,
            password2:password2,
        }).then(res=>{
            const email = res.data.user.email;
            dispatch(authSignUpSuccess(email));
        })
        .catch(err =>{
            dispatch(authSignUpFail(err))
        })
    }
}


// Change password (fetch data from backend) 

export const authChangePassword = (old_password , new_password) => {
    return dispatch =>{
        const config={
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }
        }
        axios.put('http://127.0.0.1:8000/api/change-password/',{
            old_password:old_password,
            new_password:new_password,
        },config).then(res=>{
            const status = res.data.status;
            dispatch(authChangePasswordSucess(status));
        })
        .catch(err =>{
            dispatch(authChangePasswordFail(err))
        })
    }
}

// Forgot password (fetch data from backend) 

export const authForgotPassword = (email) => {
    return dispatch =>{
        axios.post('http://127.0.0.1:8000/api/password_reset/',{
            email:email,
        }).then(res=>{
            const status = res.data.status;
            dispatch(authForgotPasswordSucess(status));
        })
        .catch(err =>{
            dispatch(authForgotPasswordFail(err))
        })
    }
}

// reset password (fetch data from backend) 

export const authRestPassword = (token ,password) => {
    return dispatch =>{
        axios.post('http://127.0.0.1:8000/api/password_reset/confirm/',{
            token:token,
            password:password
        }).then(res=>{
            const status = res.data.status;
            dispatch(authRestPasswordSucess(status));
        })
        .catch(err =>{
            let message =err.response.data.password
            dispatch(authRestPasswordFail(err,message))
        })
    }
}



// load user profile (fetch data from backend) 

export const loadUserProfile = () => {
    return dispatch =>{
        const id =localStorage.getItem('id')
        const config={
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }
        }
        axios.get(`http://127.0.0.1:8000/api/user/${id}/profile`,config)
        .then(res=>{
           const Name=res.data.Name
           const email=res.data.email
           const address=res.data.address
           const phone_number=res.data.phone_number;
          dispatch(loadUserProfileSuccess(Name,email,address,phone_number));
        })
        .catch(err =>{
            dispatch(loadUserProfileFail(err))
        })
    }
}


// update user profile (fetch data from backend) 

export const updateUserProfile = (Name,email,address,phone_number) => {
    return dispatch =>{
        const id =localStorage.getItem('id')
        const config={
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }
        }
        axios.put(`http://127.0.0.1:8000/api/user/${id}/Editprofile`,{
            Name:Name,
            email:email,
            address:address,
            phone_number:phone_number
        },config)
        .then(res=>{
            const status = res.data.message;
            dispatch(updateUserProfileSuccess(Name,email,address,phone_number,status));
        })
        .catch(err =>{
            dispatch(updateUserProfileFail(err))
        })
    }
}


export const authCheckState = () =>{
    return dispatch => {
        const token = localStorage.getItem('token');
        if(token === undefined ){
            dispatch(logout());
        }else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate <= new Date()){
                dispatch(logout());
            }else {
                dispatch(authLoginSuccess(token));
                dispatch(checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime())
                     / 1000 ));
            }
        }
    }
}



