import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://hobby-ccnghkgpoeaggbkelaglbopl.dbs.graphenedb.com:24786", neo4j.auth.basic("covorun_admin", "b.RwpLn7gZ8wVc.UY8lBZCBHXX8oWxz"));
var session = driver.session();
session
    .run("CREATE (n:Person {name:'Bob'}) RETURN n.name")
    .then(function(result) {
        result.records.forEach(function(record) {
            console.log(record)
        });

        session.close();
    })
    .catch(function(error) {
        console.log(error);
    });


class App extends Component {
  render() {
    return (
        <div className="App">
          <div className="App-header">
            Nothing to see here.. but check the console?
          </div>
        </div>
    );
  }
}

export default App;
