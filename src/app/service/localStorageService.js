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

}

export default localStorageService;