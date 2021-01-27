import React from 'react';

// utilizando o tema do 'bootswatch'
// https://bootswatch.com/
// yarn add bootswatch
import 'bootswatch/dist/flatly/bootstrap.css';
import './custom.css';

import Login from './views/login';

class App extends React.Component {

    render() {

        return (

            <div>

                <Login />

            </div>

        );

    }

}

export default App;