import React, {Component} from 'react';

import PRIMARY_LOGO from 'images/earth.png';

import 'css/App.css';

class App extends Component {

    render () {

        return (
            <div className="page">
                <img src={PRIMARY_LOGO}/>
                <h1>Hello World!</h1>
            </div>
        );

    }

}

export default App;
