import { API } from "../config"

export const getAllApplications = (token) => {
    return fetch(`${API}/application/getallapplicaitons`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .catch(error => console.log(error))
}

export const getMyApplications = (token) => {
    return fetch(`${API}/application/getmyapplications`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .catch(error => console.log(error))
}

export const applyNow = (vacancyId, token) => {
    return fetch(`${API}/application/applyjob`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            vacancyId
        })
    })
        .then(res => res.json())
        .catch(error => console.log(error))
}

export const getApplicationStatus = (vacancyid, token) => {
    return fetch(`${API}/application/getapplicationstatus/${vacancyid}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .catch(error => console.log(error))
}