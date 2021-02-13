class localStorageService
{

    static adicionarItem(chave, valor)
    {
        const texto = JSON.stringify(valor);        
        localStorage.setItem(chave, texto);
    }

    static obterItem(chave)
    {
        return  JSON.parse(localStorage.getItem(chave));
    }

    static removerItem(chave)
    {
        localStorage.removeItem(chave);
    }

}

export default localStorageService;