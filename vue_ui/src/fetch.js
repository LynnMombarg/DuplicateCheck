import { store, router } from './main.js';

const originalFetch = window.fetch;

window.fetch = function(url, options) {
    url = url.startsWith('http') ? url : `http://localhost:8001/${url}`;
    if (store.state.token) {
        options = options || {};
        options.headers = options.headers || {};
        options.headers.Authorization = `Bearer ${store.state.token}`;
    }
    return originalFetch(url, options)
        .then(response => {
            if (response.status === 401) {
                store.commit('removeToken');
                router.push({ name: 'SignIn' });
            }
            return response;
        })
        .catch(error => {
            console.error('Error during request:', error);
            throw error;
        });
};
