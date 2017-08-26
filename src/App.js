import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super();
    this.state = {
      filters: []
    }
  }

  handleFilterChange = (filter) => {
    this.setState({filters: filter})
  }


  componentDidMount() {
    this.$ = window.$
    var states = ['Health', 'Education', 'Economic'];
    var self = this
    var substringMatcher = function(strs) {
      return function findMatches(q, cb) {
        var substrRegex = new RegExp(q, 'i');
        var matches = states.filter(function (v) {return substrRegex.test(v)})
        self.handleFilterChange(matches)
      };
    };

    this.$('#Topic .typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'states',
      source: substringMatcher(states)
    });
  }

  render() {
    console.log(this.state.filters)
    return (
      <div className="App">
        <header className='Header'>
          <h1>ADEX</h1>
          <h3>Policy Comparison Engine</h3>
          <nav>
          </nav>
        </header>
        <div className='page'>
          <div id="layout" className="pure-g">
            <div className="description pure-u-1">
              <p>Select a policy topic to generate comparison</p>
            </div>
            <div className="sidebar pure-u-1 pure-u-md-1-4">
                <div className="header">
                    <div id="Country">
                      <input className="typeahead" type="text" placeholder="Kenya"/>
                    </div>
                    <div id="Topic">
                      <input className="typeahead" type="text" placeholder="Select a Topic"/>
                    </div>
                    {/*
                      <div id="Parties">
                        <input className="typeahead" type="text" placeholder="Select Parties"/>
                      </div>
                    */}
                </div>
            </div>
            <div className="content pure-u-1 pure-u-md-3-4">
                <div>
                    <div className="posts">
                        <h1 className="content-subhead">Political Parties</h1>
                        <section className="post"> 
                          <ul>
                            { 
                              this.props.data.map((datum, index) => {
                                if ( this.state.filters.length = 1 ){
                                  return (
                                    <li key={index}>
                                      <div>
                                        <p>{datum.PartyName}</p>
                                        <p>{datum.sections[this.state.filters[0]]}</p>
                                      </div>
                                    </li>
                                  )
                                }else{
                                  return (
                                    <li key={index}>
                                      <p>{datum.PartyName}</p>
                                    </li>
                                  )
                                }
                              })
                            }
                            
                          </ul>     
                        </section>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
