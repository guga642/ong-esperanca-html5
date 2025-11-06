export const templates = {
    home: `
        <section class="hero">
            <h1>Bem-vindo à ONG Esperança</h1>
            <p>Transformando vidas através da solidariedade</p>
            <button data-route="/cadastro" class="btn-primary">Junte-se a nós</button>
        </section>
    `,
    
    cadastro: `
        <section class="form-section">
            <h2>Cadastro de Voluntários</h2>
            <form id="cadastroForm" class="form-advanced">
                <div class="form-group">
                    <label for="nome">Nome Completo</label>
                    <input type="text" id="nome" name="nome" required>
                    <span class="error-message" id="nomeError"></span>
                </div>
                
                <div class="form-group">
                    <label for="email">E-mail</label>
                    <input type="email" id="email" name="email" required>
                    <span class="error-message" id="emailError"></span>
                </div>
                
                <div class="form-group">
                    <label for="telefone">Telefone</label>
                    <input type="tel" id="telefone" name="telefone">
                    <span class="error-message" id="telefoneError"></span>
                </div>
                
                <button type="submit" class="btn-primary">Cadastrar</button>
            </form>
        </section>
    `,
    
    projetos: `
        <section class="projects-grid">
            <h2>Nossos Projetos</h2>
            <div class="grid" id="projectsContainer">
            </div>
        </section>
    `
};
