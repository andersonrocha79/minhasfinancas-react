import ApiService from "../apiService";
import ErroValidacao from '../exception/ErroValidacao';

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

    validar(usuario)
    {

        const erros = [];

        if (!usuario.nome || usuario.nome.trim() === "")
        {
            erros.push("O nome deve ser informado.");
        }

        if (!usuario.email || usuario.email.trim() === "")
        {
            erros.push("O e-mail deve ser informado.");
        }
        else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) // regex
        {
            erros.push("O e-mail informado é inválido.");
        }

        if (!usuario.senha || usuario.senha.trim() === "")
        {
            erros.push("A senha deve ser informada.");
        }

        if (!usuario.senhaConfirmacao || usuario.senhaConfirmacao.trim() === "")
        {
            erros.push("A confirmação da senha deve ser informada.");
        }

        if (usuario.senha !== usuario.senhaConfirmacao)
        {
            erros.push("As senhas informadas não conferem.");
        }

        if (erros && erros.length > 0)
        {
            throw new ErroValidacao(erros);
        }

    }

}

export default UsuarioService;