const express = require('express');
const router = express.Router();

// Mock database for domains
let domains = [];

// Create a domain
router.post('/domains', (req, res) => {
    const { name, serverId } = req.body;
    const newDomain = { id: domains.length + 1, name, serverId };
    domains.push(newDomain);
    res.status(201).json(newDomain);
});

// Update a domain
router.put('/domains/:id', (req, res) => {
    const { id } = req.params;
    const { name, serverId } = req.body;
    const domain = domains.find(d => d.id === parseInt(id));
    if (!domain) {
        return res.status(404).json({ message: 'Domain not found' });
    }
    if (name) domain.name = name;
    if (serverId) domain.serverId = serverId;
    res.json(domain);
});

// Delete a domain
router.delete('/domains/:id', (req, res) => {
    const { id } = req.params;
    domains = domains.filter(d => d.id !== parseInt(id));
    res.status(204).send();
});

// Link a domain to Pterodactyl server
router.post('/domains/link', (req, res) => {
    const { domainId, serverId } = req.body;
    const domain = domains.find(d => d.id === domainId);
    if (!domain) {
        return res.status(404).json({ message: 'Domain not found' });
    }
    domain.serverId = serverId;
    res.json(domain);
});

module.exports = router;