import ApiService from "../apiService";

class UsuarioService extends ApiService
{

    constructor()
    {
        super("/api/usuarios");
    } 

    autenticar(credenciais)
    {
        return this.post("/autenticar", credenciais);
    }

    obterSaldoUsuario(id)
    {
        return this.get(`/${id}/saldo`)
    }

    salvar(usuario)
    {
        return this.post("/", usuario);
    }

}

export default UsuarioService;