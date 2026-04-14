// Pterodactyl API client

const axios = require('axios');

class PterodactylClient {
    constructor(apiUrl, apiKey) {
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
    }

    async request(endpoint, method = 'GET', data = null) {
        try {
            const response = await axios({
                method,
                url: `${this.apiUrl}${endpoint}`,
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
                data,
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response ? error.response.data : error.message);
        }
    }

    // Add methods for Pterodactyl API actions here
}

module.exports = PterodactylClient;