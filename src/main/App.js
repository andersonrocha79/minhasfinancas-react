import React from 'react';

// utilizando o tema do 'bootswatch'
// https://bootswatch.com/
// yarn add bootswatch
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise
// https://codeseven.github.io/toastr/demo.html
// https://www.primefaces.org/primereact/
// https://reactstrap.github.io/
// http://react-materialize.github.io/react-materialize/?path=/story/react-materialize--welcome
// https://primefaces.org/primereact/showcase/#/calendar


import 'toastr/build/toastr.min.js';

import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css';
import 'toastr/build/toastr.css';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Rotas from './rotas';
import Navbar from '../components/navbar';
import ProvedorAutenticacao from './ProvedorAutenticacao';

class App extends React.Component 
{

    render() 
    {

        return (

            <ProvedorAutenticacao>
        
                <Navbar />

                <div className="container">

                    <Rotas />

                </div>

            </ProvedorAutenticacao>

        );

    }

}

export default App;