import { store, router } from './main.js';

const originalFetch = window.fetch;

window.fetch = function(url, options) {

    return originalFetch(url, options)
        .then(response => {
            if (response.status === 401) {
                store.commit('removeToken');
                // router.push({ name: 'SignIn' });
            }
            return response;
        })
        .catch(error => {
            console.error('Error during request:', error);
            throw error;
        });
};
