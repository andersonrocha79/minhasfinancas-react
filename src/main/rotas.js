import React from 'react';
import { Route, Redirect, Switch, HashRouter } from 'react-router-dom';

import Home from '../views/home';
import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuario';
import ConsultaLancamentos from '../views/lancamentos/consultaLancamentos';
import CadastroLancamentos from '../views/lancamentos/cadastroLancamentos';

import { AuthConsumer } from '../main/ProvedorAutenticacao';

function RotaAutenticada( { component : Component, isUsuarioAutenticado, ...props } )
{
    return (

        <Route  {...props} 
            render = { (componentProps) =>
            {
                if (isUsuarioAutenticado)
                {
                    return (
                        <Component {...componentProps} />
                    )
                }
                else
                {
                    return (
                        <Redirect to=
                            { 
                                {
                                    pathname: '/login', 
                                    state: { from: componentProps.location}
                                } 
                            }
                        />
                    )
                }
            } } 
        />

    )
}

function Rotas(props)
{

    return (

        <HashRouter>

            <Switch>

                <Route 
                    path="/" 
                    component={Login}
                />

                <Route 
                    path="/login" 
                    component={Login}
                />

                <Route 
                    path="/cadastro-usuarios" 
                    component={CadastroUsuario} 
                />

                <RotaAutenticada
                    path="/home" 
                    component={Home} 
                    isUsuarioAutenticado={props.isUsuarioAutenticado}
                />

                <RotaAutenticada
                    path="/consulta-lancamentos" 
                    component={ConsultaLancamentos} 
                    isUsuarioAutenticado={props.isUsuarioAutenticado}
                />      

                <RotaAutenticada
                    path="/cadastro-lancamentos/:id?" 
                    component={CadastroLancamentos} 
                    isUsuarioAutenticado={props.isUsuarioAutenticado}
                />                             

            </Switch>

        </HashRouter>

    )

}

export default () =>
{
    return (
        <AuthConsumer>
            {
                (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} /> ) 
            }
        </AuthConsumer>
    )
} 