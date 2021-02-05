class localStorageService
{

    static adicionarItem(chave, valor)
    {
        localStorage.addItem(chave, JSON.stringify(valor));
    }

    static obterItem(chave)
    {
        return  JSON.parse(localStorage.getItem(chave));
    }

}

export default localStorageService;