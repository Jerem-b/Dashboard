import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: true,
    timeout: 1000,
});

async function APIregister(username, password) {
    const response = await api.post('/auth/register', {
        username,
        password,
    });
    return response.data;
}

async function APIlogin(username, password) {
    const response = await api.post('/auth/login', {
        username,
        password,
    });
    return response.data;
}

async function APIgetUser() {
    const response = await api.get('/auth/user')
    return response.data
}

async function APIaddNewService(name) {
    const response = await api.post('/service', { name })
    return response.data
}

async function APIaddNewWidget(widget, serviceId) {
    const response = await api.post('/service/widget', { widget, serviceId })
    return response.data
}

async function APIdeleteService(id) {
    const response = await api.delete(`/service/${id}`)
    return response.data
}

async function APIdeleteWidget(widgetId, serviceId) {
    const response = await api.delete(`/service/${serviceId}/${widgetId}`)
    return response.data
}

async function APIgetWidget(widgetId, serviceId) {
    const response = await api.get(`/service/${serviceId}/${widgetId}`)
    return response.data
}

async function APIupdateWidget(widgetId, serviceId, widget) {
    const response = await api.put(`/service/${serviceId}/${widgetId}`, widget)
    return response.data
}

export {
    APIregister,
    APIlogin,
    APIgetUser,
    APIaddNewService,
    APIaddNewWidget,
    APIdeleteService,
    APIdeleteWidget,
    APIgetWidget,
    APIupdateWidget,
}