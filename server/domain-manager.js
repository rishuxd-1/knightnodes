'use strict';

const dns = require('dns');
const { URL } = require('url');

class DomainManager {
  constructor() {
    this.domains = new Map(); // Store domains and their associated servers
  }

  // Validate domain format
  validateDomain(domain) {
    const domainRegex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z]{2,})+$/;
    return domainRegex.test(domain);
  }

  // Configure DNS settings for a domain
  configureDNS(domain, records) {
    return new Promise((resolve, reject) => {
      dns.resolve(domain, (err, addresses) => {
        if (err) return reject(err);
        // Simulated DNS records configuration
        console.log(`Configuring DNS for ${domain}:`, records);
        resolve(`DNS records for ${domain} configured`);
      });
    });
  }

  // Link server to a custom domain
  linkDomainToServer(domain, serverId) {
    if (!this.validateDomain(domain)) {
      throw new Error('Invalid domain format');
    }
    this.domains.set(domain, serverId);
    console.log(`Linked ${domain} to server ${serverId}`);
  }

  // Get server by domain
  getServerByDomain(domain) {
    return this.domains.get(domain);
  }
}

module.exports = DomainManager;
