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

    render()
    {

        const meses = this.service.obterListaMeses();

        const tipos = this.service.obterListaTipos();            

        return (

            <Card title="Cadastro de Lançamentos">

                <div className="row">

                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição:">
                            <input id="inputDescricao" type="text" className="form-control" />
                        </FormGroup>
                    </div>

                </div>                

                <div className="row">

                    <div className="col-md-6">

                        <FormGroup id="inputAno" label="Ano:">
                            <input id="inputAno" type="text" className="form-control" />
                        </FormGroup>

                    </div>

                    <div className="col-md-6">

                        <FormGroup id="inputMes" label="Mês:">
                            <SelectMenu 
                                id="inputMes"
                                className="form-control"
                                lista={meses}
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
                            />                                                        
                        </FormGroup>

                    </div>

                    <div className="col-md-4">

                        <FormGroup id="inputValor" label="Valor:">
                            <input id="inputValor" type="text" className="form-control" />
                        </FormGroup>

                    </div>

                    <div className="col-md-4">

                        <FormGroup id="inputStatus" label="Status:">
                            <input id="inputStatus" type="text" className="form-control" disabled />
                        </FormGroup>

                    </div>

                </div>

                <div className="row">

                    <div className="col-md-4">
                        <button className="btn btn-success" onClick={this.cadastrar}>Cadastrar</button>
                    </div>
 
                    <div className="col-md-4">
                        <button className="btn btn-danger" onClick={this.cancelar}>Cancelar</button>                   
                    </div>

                </div>                

            </Card>

        )

    }

}

export default withRouter(CadastroLancamentos);