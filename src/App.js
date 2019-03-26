import React, { Component } from 'react';
import './App.scss';
import { getPersons } from './services/personService';
class App extends Component {
  constructor (props){
    super (props);
    
    this.state={
      results: this.getSavedData()


    }
  }

  getSavedData (){
    const blackData = localStorage.getItem('blackData');
    if (blackData !== null) {
      return JSON.parse(blackData);
    } else {
      this.getBlackCriaturas();
      return [];
    }
  }

  saveData (data) {
    localStorage.setItem('blackData', JSON.stringify(data));
  }

  getBlackCriaturas (){
    getPersons()
    .then (data => {
      const cleanData = data.results.map((item, index) => {return {...item, id:index}});
      this.setState({
        results: cleanData
      });
      this.saveData(cleanData);
    }
  )}

  render() {
    return (
      <div className="app">
      <h1 className="app__title">Lista negra de empleados</h1>
        <ul className="app__list">
        {this.state.results.map(item => {
          return (
            <li className="app__list-item" key={item.id}>
              <div className="person">
                <h2 className="person__name">{`${item.name.first} ${item.name.last}`}</h2>
                <img src={item.picture.medium} alt={`${item.name.first} ${item.name.last}`} className="person__image" />
                <div className="person__age">{item.dob.age}</div>
                <div className="person__city">{item.location.city}</div>
              </div>
            </li>
          )
        })}
        </ul>
      </div>
    );
  }
}

export default App;
