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

        const { nome, email, senha, senhaConfirmacao } = this.state;
        
        const usuario = 
        {
            nome,
            email,
            senha,
            senhaConfirmacao
        }

        try 
        {
            this.service.validar(usuario);            
        } 
        catch (error) 
        {
            const mensagens = error.mensagens;
            mensagens.forEach(msg =>
            {
                mensagemErro(msg);
            });
            return false;            
        }        

        this.service
            .salvar(usuario)
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

                                <button className="btn btn-success" 
                                        onClick={this.cadastrar}>
                                        <i className="pi pi-save"></i>
                                        Cadastrar
                                </button>

                                <button className="btn btn-danger" 
                                        onClick={this.cancelar}>
                                        <i className="pi pi-times"></i>
                                        Cancelar
                                </button>
                                    
                            </fieldset>

                        </div>

                    </div>

                </div>

            </Card>

        )

    }

}

export default withRouter(CadastroUsuario);