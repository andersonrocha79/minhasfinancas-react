import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService';
import localStorageService from '../app/service/localStorageService';
import { mensagemErro } from '../components/toastr';

class Login extends React.Component 
{

    state = 
    {
        email: '',
        senha: ''
    }

    constructor()
    {
        super();
        this.service = new UsuarioService();
    }

    // modelo 1 (asincrono)
    entrar = () =>
    {
        console.log('login');
        this.service.autenticar(
                    {
                        email: this.state.email,
                        senha: this.state.senha
                    }).then( response =>
                    {

                        console.log('sucesso', response);

                        // grava o usuário logado no 'localStorage'
                        localStorageService.adicionarItem("_usuario_logado", response.data);

                        // login efetuado com sucesso
                        this.props.history.push("/home"); 

                    }).catch( erro =>
                    {

                        console.log('falha no login: ', erro.response.data);
                        mensagemErro(erro.response.data);

                    });

    }

    // modelo 2 (sincrono)
    /*
    entrar2 = async () =>
    {
        
        try
        {

            const response = await axios.post( 'http://localhost:8080/api/usuarios/autenticar', 
            {
                email: this.state.email,
                senha: this.state.senha
            });

            console.log("resposta: ", response);
            console.log("requisição encerrada");

             // login efetuado com sucesso
             if (response.status === 200)
             {
                this.props.history.push("/home");
             }

        }
        catch (erro)
        {
            console.log(erro.response);
            this.setState({mensagemErro : erro.response.data})
        }

    }    
    */

    prepareCadastrar = () =>
    {
        this.props.history.push('/cadastro-usuarios')
    }

    render() 
    {

        return (

            <div className="row" >

                <div className="col-md-6" style={{position: 'relative', left: '300px'}}>

                    <div className="bs-docs-section">

                        <Card title="Login">
                            
                            <div className="row">

                                <div className="col-lg-12">

                                    <div className="bs-component">

                                        <fieldset>

                                            <FormGroup label="e-mail:" htmlFor="exampleInputEmail1">

                                                <input  type="email" 
                                                        value={this.state.email}
                                                        onChange={e => this.setState({email: e.target.value})}
                                                        className="form-control" 
                                                        id="exampleInputEmail1" 
                                                        aria-describedby="emailHelp" 
                                                        placeholder="Digite o e-mail"/>

                                            </FormGroup>

                                            <FormGroup label="Senha:" htmlFor="exampleInputPassword1">

                                                <input  type="password" 
                                                        value={this.state.senha}
                                                        onChange={e => this.setState({senha: e.target.value})}
                                                        className="form-control" 
                                                        id="exampleInputPassword1" 
                                                        placeholder="Password"/>

                                            </FormGroup>

                                            <button className="btn btn-success" onClick={this.entrar}>Entrar</button>

                                            <button className="btn btn-danger" onClick={this.prepareCadastrar}>Cadastrar</button>
                                                
                                        </fieldset>

                                    </div>

                                </div>

                            </div>

                        </Card>

                    </div>

                </div>

            </div>

        )

    }

}

export default withRouter( Login )