import axios from "axios"
const instance = axios.create({
    baseURL: 'https://pixabay.com/api/',
})

export const searchPosts = (q,page=1) => {
    return instance.get('/', {
        params: {
            q,
            page,
            key: '32912944-93cdab2aa4fbc744087ce255b',
            image_type: 'photo',
            orientation: 'horizontal',
            per_page:12,
        }
    })
}