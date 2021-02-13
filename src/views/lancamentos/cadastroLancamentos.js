import React from 'react';
import { withRouter } from 'react-router-dom';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';

import LancamentoService from '../../app/service/lancamentoService';
import LocalStorageService from '../../app/service/localStorageService';

import * as messages from '../../components/toastr';


class CadastroLancamentos extends React.Component
{

    state =
    {
        id: null,
        descricao: '',
        valor: '',        
        mes: '',        
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando : false
    }
    
    constructor()
    {
        super();
        this.service = new LancamentoService();
    }

    componentDidMount()
    {

        const params = this.props.match.params;
        console.log('params: ', params);

        if (params.id)
        {
            this.service
                .obterPorId(params.id)
                .then(response =>
                {
                    this.setState({...response.data, atualizando : true});
                })
                .catch( erro =>
                {
                    messages.mensagemErro(erro.response.data);
                })  
        }

    }

    handleChange = (e) =>
    {
        const value = e.target.value;
        const name  = e.target.name;
        this.setState({[name] : value}); 
    }

    cancelar =() =>
    {
        this.props.history.push("/consulta-lancamentos");        
    }

    submit = () =>
    {        

        const usuarioLogado = LocalStorageService.obterItem("_usuario_logado");

        // captura algumas propriedades do 'state'
        const { descricao, valor, mes, ano, tipo } = this.state;

        const lancamento = 
        {
            descricao,
            valor,
            mes,
            ano,
            tipo,
            usuario : usuarioLogado.id
        }

        console.log('registro gravado: ', lancamento);
        
        try 
        {
            this.service.validar(lancamento);            
        } 
        catch (error) 
        {
            const mensagens = error.mensagens;
            mensagens.forEach(msg =>
            {
                messages.mensagemErro(msg);
            });
            return false;            
        }

        this.service
            .salvar(lancamento)
            .then(response =>
            {
                this.props.history.push("/consulta-lancamentos");
                messages.mensagemSucesso("Lançamento incluído com sucesso.");  
            })
            .catch( error =>
            {
               messages.mensagemErro("Falha ao tentar incluir este lançamento.\n" + error.response.data);
            });  
    }

    atualizar = () =>
    {

        // captura algumas propriedades do 'state'
        const { descricao, valor, mes, ano, tipo, status, id, usuario } = this.state;

        const lancamento = 
        {
            descricao,
            valor,
            mes,
            ano,
            tipo,
            status, 
            id,
            usuario
        }

        console.log('registro gravado: ', lancamento);

        this.service
            .atualizar(lancamento)
            .then(response =>
            {
                this.props.history.push("/consulta-lancamentos");
                messages.mensagemSucesso("Lançamento atualizado com sucesso.");  
            })
            .catch( error =>
            {
               messages.mensagemErro("Falha ao tentar atualizar este lançamento.\n" + error.response.data);
            });          
    }

    render()
    {

        const meses = this.service.obterListaMeses();

        const tipos = this.service.obterListaTipos();            

        return (

            <Card title={ this.state.atualizando ? "Atualização de Lançamento" : "Cadastro de Lançamento"} >

                <div className="row">

                    <div className="col-md-12">
                        <FormGroup  id="inputDescricao" label="Descrição:">
                            <input  id="inputDescricao" 
                                    type="text" 
                                    name="descricao"
                                    value={this.state.descricao}
                                    onChange={this.handleChange}
                                    className="form-control" />
                        </FormGroup>
                    </div>

                </div>                

                <div className="row">

                    <div className="col-md-6">

                        <FormGroup  id="inputAno" label="Ano:">
                            <input  id="inputAno" 
                                    type="text" 
                                    name="ano"
                                    value={this.state.ano}
                                    onChange={this.handleChange}
                                    className="form-control" />
                        </FormGroup>

                    </div>

                    <div className="col-md-6">

                        <FormGroup  id="inputMes" label="Mês:">
                            <SelectMenu 
                                id="inputMes"
                                className="form-control"
                                lista={meses}
                                name="mes"
                                value={this.state.mes}
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                    </div>

                </div>

                <div className="row">

                    <div className="col-md-4">

                        <FormGroup id="inputTipo" label="Tipo:">
                            <SelectMenu 
                                id="inputTipo"
                                className="form-control"
                                lista={tipos}
                                name="tipo"
                                value={this.state.tipo}
                                onChange={this.handleChange}
                            />                                                        
                        </FormGroup>

                    </div>

                    <div className="col-md-4">

                        <FormGroup  id="inputValor" label="Valor:">
                            <input  id="inputValor" 
                                    type="text" 
                                    className="form-control" 
                                    name="valor"
                                    value={this.state.valor}
                                    onChange={this.handleChange}
                                    />
                        </FormGroup>

                    </div>

                    <div className="col-md-4">

                        <FormGroup  id="inputStatus" label="Status:">
                            <input  id="inputStatus" 
                                    type="text" 
                                    className="form-control" 
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.handleChange}
                                    disabled />
                        </FormGroup>

                    </div>

                </div>

                <div className="row">

                    {this.state.atualizando ?
                        (
                            <div className="col-md-4">
                                <button className="btn btn-primary" 
                                        onClick={this.atualizar}>
                                        <i className="pi pi-refresh"></i>
                                        Atualizar
                                </button>
                            </div>    
                        )
                        :
                        (

                            <div className="col-md-4">
                                <button className="btn btn-success" 
                                        onClick={this.submit}>
                                        <i className="pi pi-save"></i>
                                        Cadastrar
                                </button>
                            </div>    
                        )

                    } 

                    <div className="col-md-4">
                        <button className="btn btn-danger" 
                                onClick={this.cancelar}>
                                <i className="pi pi-times"></i>
                                Cancelar
                        </button>                   
                    </div>

                </div>                

            </Card>

        )

    }

}

export default withRouter(CadastroLancamentos);