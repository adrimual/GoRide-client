import axios from 'axios';

export default class PersonService {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:4000/api/',
            withCredentials: true
        })
    }

    editPersonProfile = (id, updatedUser) => this.service.post(`person/profile/edit/${id}`, updatedUser)

}