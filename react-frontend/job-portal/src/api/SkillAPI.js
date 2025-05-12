import { API } from "../config"

export const getAllSkills = () => {
    return fetch(`${API}/api/skills`)
    .then(res=>res.json())
    .catch(error=>console.log(error))
}