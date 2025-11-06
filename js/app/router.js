export default class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = '';
    }

    addRoute(path, template) {
        this.routes[path] = template;
    }

    loadRoute() {
        const path = window.location.hash.slice(1) || '/';
        this.currentRoute = path;
        
        const template = this.routes[path] || this.routes['/'];
        if (template) {
            this.renderTemplate(template);
        }
    }

    renderTemplate(template) {
        const app = document.getElementById('app');
        if (app) {
            app.innerHTML = template;
        }
    }

    init() {
        window.addEventListener('hashchange', () => this.loadRoute());
        this.loadRoute();
        
        const links = document.querySelectorAll('[data-route]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const route = link.getAttribute('data-route');
                window.location.hash = route;
            });
        });
    }
}
