export const dom = {
    create(element, attributes = {}, children = []) {
        const el = document.createElement(element);
        
        Object.keys(attributes).forEach(key => {
            el.setAttribute(key, attributes[key]);
        });
        
        children.forEach(child => {
            if (typeof child === 'string') {
                el.appendChild(document.createTextNode(child));
            } else {
                el.appendChild(child);
            }
        });
        
        return el;
    },

    find(selector) {
        return document.querySelector(selector);
    },

    findAll(selector) {
        return document.querySelectorAll(selector);
    }
};

export const http = {
    async get(url) {
        const response = await fetch(url);
        return response.text();
    },

    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
};
