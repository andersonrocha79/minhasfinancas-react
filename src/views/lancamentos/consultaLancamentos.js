import React from 'react';
import { withRouter } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import LancamentosTable from './lancamentosTable';

import LancamentoService from '../../app/service/lancamentoService';
import LocalStorageService from '../../app/service/localStorageService';

import * as messages from '../../components/toastr';

class ConsultaLancamentos extends React.Component
{

    state =
    {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: [],
        showConfirmDialog : false,
        lancamentoDeletar: {}
    }

    constructor()
    {
        super();
        this.service = new LancamentoService();
    }

    editar = (id) =>
    {
        this.props.history.push(`/cadastro-lancamentos/${id}`);
    }

    abrirConfirmacao = (lancamento) =>
    {
        this.setState({showConfirmDialog : true, lancamentoDeletar: lancamento})
    }

    cancelarExclusao = () =>
    {
        this.setState({showConfirmDialog : false, lancamentoDeletar: {} });
    }    

    alterarStatus = (lancamento, status) =>
    {

        console.log('lancamento alterado: ', lancamento)
        this.service
            .alterarStatus(lancamento.id, status)
            .then( response =>
            {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento);
                if (index !== -1)
                {
                    lancamento['status'] = status;
                    lancamentos[index]   = lancamento;
                    this.setState({lancamentos : lancamentos});
                }
                messages.mensagemSucesso("Status atualizado com sucesso");
            })
            .catch( error =>
            {
                messages.mensagemErro("Erro ao tentar alterar o status do lançamento.");
            });            
    }

    deletar = () =>
    {

        this.service
            .deletar(this.state.lancamentoDeletar.id)
            .then(response =>
            {
                // exclui o lançamento no array
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamentoDeletar);
                lancamentos.splice(index, 1);
                this.setState(lancamentos);
                messages.mensagemSucesso("Lançamento excluído com sucesso.");  
            })
            .catch( error =>
            {
               messages.mensagemErro("Erro ao tentar excluir o lançamento.");
            });
    }



    buscar = () =>
    {

        console.log("buscando lançamentos...");

        if (!this.state.ano)
        {
            messages.mensagemAlerta("O ano deve ser informado.");
            return;
        }

        const usuarioLogado = LocalStorageService.obterItem("_usuario_logado");

        if (!usuarioLogado)
        {
            messages.mensagemErro("usuário não está logado.");
            this.props.history.push("/login");
            return;
        }
        
        const lancamentoFiltro =
        {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
            .consultar(lancamentoFiltro)
            .then( response =>
            {
                const lista = response.data;
                if (lista.length < 1)
                {
                    messages.mensagemAlerta("Nenhum resultado encontrado!");
                }
                console.log("lancamentos", lista);
                this.setState({lancamentos : lista});
            })
            .catch( erro =>
            {
                messages.mensagemErro(erro);
            })

    }

    preparaFormularioCadastro = () =>
    {
        this.props.history.push("/cadastro-lancamentos");        
    }

    render()
    {

        const meses = this.service.obterListaMeses();

        const tipos = this.service.obterListaTipos();

        const confirmDialogFooter = (name) => 
        {
            return (
                <div>
                    <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar}  />
                    <Button label="Desistir"  icon="pi pi-times" className="p-button-text" onClick={this.cancelarExclusao} autoFocus />
                </div>
            );
        }
    
   
        return (

            <Card title="Consulta de Lançamentos">
                
                <div className="row">

                    <div className="col-md-6">

                        <div className="bs-component">

                            <FormGroup
                                htmlFor="inputMes" label="Mês:">
                                <SelectMenu 
                                    id="inputMes"
                                    value={this.state.mes}
                                    onChange={e => this.setState({mes : e.target.value})}
                                    className="form-control"
                                    lista={meses}
                                />
                            </FormGroup>

                            <FormGroup
                                htmlFor="inputAno" label="Ano:">
                                <input  type="text"
                                        id="inputAno"  
                                        name="ano"
                                        value={this.state.ano}
                                        onChange={e => this.setState({ano : e.target.value})}
                                        placeholder="informe o ano para pesquisa"
                                        className="form-control"/>
                            </FormGroup>                                

                        </div>

                    </div>

                    <div className="col-md-6">

                        <div className="bs-component">

                            <FormGroup
                                htmlFor="inputTipo" label="Tipo de Lançamento:">
                                <SelectMenu 
                                    id="inputTipo"
                                    value={this.state.tipo}
                                    onChange={e => this.setState({tipo : e.target.value})}
                                    className="form-control"
                                    lista={tipos}
                                />
                            </FormGroup>

                            <FormGroup
                                htmlFor="inputDescricao" label="Descrição:">
                                <input  type="text"
                                        id="inputDescricao"  
                                        name="descricao"
                                        value={this.state.descricao}
                                        onChange={e => this.setState({descricao : e.target.value})}
                                        placeholder="informe a descrição para pesquisa"
                                        className="form-control"/>
                            </FormGroup>

                        </div>

                    </div>

                </div>

                <div className="row">

                    <div className="col-md-12">

                        <button className="btn btn-success" 
                                onClick={this.buscar}>
                                <i className="pi pi-search"></i>
                                 Buscar
                        </button>

                        <button className="btn btn-danger" 
                                onClick={this.preparaFormularioCadastro}>
                                <i className="pi pi-plus"></i>
                                 Cadastrar
                        </button>                   

                    </div>                    

                </div>

                <br/>

                <div className="row">

                    <div className="col-md-12">

                        <div className="bs-component">

                            <LancamentosTable
                                lancamentos={this.state.lancamentos}
                                deleteAction={this.abrirConfirmacao}
                                editarAction={this.editar}
                                alterarStatus={this.alterarStatus}
                            />

                        </div>

                    </div>

                </div>

                <div>

                    <Dialog 
                        header="Confirmação" 
                        visible={this.state.showConfirmDialog} 
                        style={{ width: '30vw' }}
                        modal={true}
                        footer={confirmDialogFooter}
                        onHide={() => this.setState({showConfirmDialog: false})}>
                        <p>Confirma a exclusão definitiva deste lançamento ?</p>
                    </Dialog>                    

                </div>

            </Card>


        )
    }

}

export default withRouter(ConsultaLancamentos);