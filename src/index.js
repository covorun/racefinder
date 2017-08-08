import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import ListPage from './components/ListPage'
import DetailPage from './components/DetailPage'
import CreatePage from './components/CreatePage'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {ApolloProvider, createNetworkInterface, ApolloClient} from 'react-apollo'



import { Navbar, Panel, Button } from 'react-bootstrap';

//import registerServiceWorker from './registerServiceWorker';
//ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();


const networkInterface = createNetworkInterface({
// __SIMPLE_API_ENDPOINT__ looks similar to: `https://api.graph.cool/simple/v1/<PROJECT_ID>`
  uri: 'https://api.graph.cool/simple/v1/cj62vxed80nvk0169kjy0pmng'
})

const client = new ApolloClient({networkInterface})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path='/' component={ListPage} />
        <Route path='/create' component={CreatePage} />
        <Route path='/race/:id' component={DetailPage} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
