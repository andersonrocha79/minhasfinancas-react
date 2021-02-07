import React from 'react';
import formatter from 'currency-formatter';

export default props =>
{

    console.log("lancamentos recebidos table: ", props.lancamentos )

    const rows = props.lancamentos.map( lancamento =>
    {

        return (
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{ formatter.format(lancamento.valor, {locale:'pt-BR'}) }</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td></td>
            </tr>
        )
        
    })


    return (

        <table className="table table-hover">

            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>

            <tbody>
                {rows}
            </tbody>

        </table>

    )
}