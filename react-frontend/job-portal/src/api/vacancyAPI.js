import { API } from "../config"

export const getAllVacancies = () => {
    return fetch(`${API}/vacancy/getAllVacancies`)
        .then(response => response.json())
        .catch(error => console.log(error))
}