import { API } from "../config"

export const register = (user) => {
    console.log(API)
    return fetch(`${API}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const login = (user) => {
    return fetch(`${API}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}


export const forgetPassword = (username) => {
    return fetch(`${API}/forgetpassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username })
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log("Error: ", error);
        })
}

// verify the token from gmail password reset link
export const verifyTokenForResetPassword = (token) => {
    return fetch(`${API}/verify-password-reset-token/${token}`, {
        method: "GET",
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log("Error:", error)
        })
}

// change the password of user
export const changePassword = (password, token) => {
    return fetch(`${API}/change-password/${token}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(password)
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log("Error: ", error);
        })
}


export const authenticate = (data) => {
    localStorage.setItem('jwt', JSON.stringify(data))
}


export const verifyEmail = (token) => {
    return fetch(`${API}/verify-email/${token}`, {
        method: "GET",

    })
        .then(data => {

            return data.json()

        })
        .catch(error => {
            console.log("error while sending the request: ", error)
        })
}


export const isAuthenticated = () => {
    return localStorage.getItem('jwt') ? JSON.parse(localStorage.getItem('jwt')) : false
}

// get profile information
export const getProfile = (token, id) => {
    return fetch(`${API}/get-profile/${id}`, {
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then(response => response.json())
        .catch(error => console.log("Error: " + error))
}

export const profileInfo = (token) => {
    return fetch(`${API}/profile-info`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

    })
        .then(res => res.json())
        .catch(err => console.log(err));
}