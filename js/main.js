import Router from './app/router.js';
import FormValidator from './app/formValidator.js';
import { templates } from './app/templates.js';

document.addEventListener('DOMContentLoaded', () => {
    const router = new Router();
    const formValidator = new FormValidator();
    
    router.addRoute('/', templates.home);
    router.addRoute('/cadastro', templates.cadastro);
    router.addRoute('/projetos', templates.projetos);
    
    router.init();
    formValidator.init();
});
