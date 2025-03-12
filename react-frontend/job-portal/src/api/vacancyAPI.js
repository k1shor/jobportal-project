import { API } from "../config"

export const getAllVacancies = () => {
    return fetch(`${API}/vacancy/getAllVacancies`)
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const getVacancyDetails = (id) => {
    return fetch(`${API}/vacancy/get-vacancy-details/${id}`)
        .then(response => response.json())
        .catch(error => console.log(error))
}

