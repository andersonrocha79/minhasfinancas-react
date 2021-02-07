import React from 'react';

import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService';
import { mensagemErro, mensagemSucesso } from '../components/toastr';

class CadastroUsuario extends React.Component
{

    state = 
    {
        nome : '',
        email: '',
        senha: '',
        senhaConfirmacao: ''
    }

    constructor()
    {
        super();
        this.service = new UsuarioService();
    }

    cadastrar = () =>
    {

        console.log("registro: ", this.state);

        const msgs = this.validar();

        if (msgs && msgs.length > 0)
        {
            msgs.forEach( (msg, index) =>
            {
                mensagemErro(msg);
            });
            return false;
        }

        const usuarioDTO = 
        {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }

        this.service.salvar(usuarioDTO)
            .then(response =>
            {
                mensagemSucesso("Usuário cadastrado com sucesso.\nFaça o login para acessar o sistema.");
                this.props.history.push("/login");
            })
            .catch( erro =>
            {
               mensagemErro(erro.response.data);
            });

    }

    cancelar = () =>
    {
        this.props.history.push("/login")
    }

    validar()
    {

        const msgs = [];

        if (!this.state.nome || this.state.nome.trim() === "")
        {
            msgs.push("O nome deve ser informado.");
        }

        if (!this.state.email || this.state.email.trim() === "")
        {
            msgs.push("O e-mail deve ser informado.");
        }
        else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) // regex
        {
            msgs.push("O e-mail informado é inválido.");
        }

        if (!this.state.senha || this.state.senha.trim() === "")
        {
            msgs.push("A senha deve ser informada.");
        }

        if (!this.state.senhaConfirmacao || this.state.senhaConfirmacao.trim() === "")
        {
            msgs.push("A confirmação da senha deve ser informada.");
        }

        if (this.state.senha !== this.state.senhaConfirmacao)
        {
            msgs.push("As senhas informadas não conferem.");
        }

        return msgs;

    }

    render()
    {

        return (

            <Card title="Cadastro de Usuário">
                
                <div className="row">

                    <div className="col-lg-12">

                        <div className="bs-component">

                            <fieldset>

                                <FormGroup label="Nome:" htmlFor="inputNome">

                                    <input  type="text"
                                            id="inputNome"  
                                            name="nome"
                                            value={this.state.nome}
                                            onChange={e => this.setState({nome: e.target.value})}
                                            className="form-control"/>

                                </FormGroup>                                    

                                <FormGroup label="e-mail:" htmlFor="inputEmail">

                                    <input  type="email" 
                                            id="inputEmail"
                                            name="email"
                                            value={this.state.email}
                                            onChange={e => this.setState({email: e.target.value})}
                                            className="form-control"                                                 
                                            aria-describedby="emailHelp"/>

                                </FormGroup>

                                <FormGroup label="Senha:" htmlFor="inputSenha">

                                    <input  type="password" 
                                            id="inputSenha" 
                                            name="senha"
                                            value={this.state.senha}
                                            onChange={e => this.setState({senha: e.target.value})}
                                            className="form-control"                                                 
                                            placeholder="Password"/>

                                </FormGroup>

                                <FormGroup label="Confirmação de Senha:" htmlFor="inputSenhaConfirmacao">

                                    <input  type="password" 
                                            id="inputSenhaConfirmacao" 
                                            name="senhaConfirmacao"
                                            value={this.state.senhaConfirmacao}
                                            onChange={e => this.setState({senhaConfirmacao: e.target.value})}
                                            className="form-control"                                                 
                                            placeholder="Password"/>

                                </FormGroup>

                                <button className="btn btn-success" onClick={this.cadastrar}>Cadastrar</button>

                                <button className="btn btn-danger" onClick={this.cancelar}>Cancelar</button>
                                    
                            </fieldset>

                        </div>

                    </div>

                </div>

            </Card>

        )

    }

}

export default withRouter(CadastroUsuario);