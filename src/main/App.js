import React from 'react';

// utilizando o tema do 'bootswatch'
// https://bootswatch.com/
// yarn add bootswatch
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise
// https://codeseven.github.io/toastr/demo.html


import 'toastr/build/toastr.min.js';

import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css';
import 'toastr/build/toastr.css';

import Rotas from './rotas';
import Navbar from '../components/navbar';

class App extends React.Component {

    render() 
    {

        return (


            <div>

                <Navbar />

                <div className="container">

                    <Rotas />

                </div>

            </div>

        );

    }

}

export default App;