import React from 'react';

// componente funcional
/*
function App() 
{

    return (

        <div className="App">

            <div>
                hello world anderson!
            </div>

        </div>

    );

}
*/


// componente de classe
class App extends React.Component
{

    state = 
    {
        numero1 : "",
        numero2 : "",
        resultado: ""
    }

    somar = () =>
    {
        const resultado = parseInt(this.state.numero1) + parseInt(this.state.numero2);
        this.setState({resultado: resultado})
    }

    render()
    {

        return (

            <div className="App">
    
                <div>

                    <label>Número 1:</label>

                    <input type="text" 
                           value={this.state.numero1} 
                           onChange=
                           { 
                               (e) => this.setState({numero1: e.target.value}) 
                           } 
                    />

                    <br />

                    <label>Número 2:</label>

                    <input type="text" 
                           value={this.state.numero2} 
                           onChange=
                           { 
                               (e) => this.setState({numero2: e.target.value}) 
                           } 
                    />

                    <br />

                    <button onClick={this.somar}>
                    Somar        
                    </button>

                    <br />

                    <p>O resultado é: {this.state.resultado}</p>

                </div>
    
            </div>
    
        );

    }

}

export default App;
