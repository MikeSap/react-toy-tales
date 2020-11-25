import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    toys: [],
    display: false
  }

  handleLikes = (toy) => {

    let toyId = toy.id
    const reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(toy)
    }

    fetch(`http://localhost:3000/toys/${toyId}`, reqObj)
    .then(res => res.json())
    .then(updatedToy =>{
      const updatedToys = [...this.state.toys]
      this.setState({
       toys: updatedToys.map(toy => {
          return toy.id === updatedToy.id ?  {...toy, ...updatedToy} : toy
       })
      })
    })
  }


  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }


  addToy = (newToy) =>{

    const reqObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newToy)
      
    }
    fetch('http://localhost:3000/toys', reqObj)
    .then(resp => resp.json())
    .then(updatedToy => {
      let updatedToys = [...this.state.toys, updatedToy]
      this.setState({
        toys: updatedToys,
        display: false
      })
    })
  }
     
  donateToy = (toyId) => {
      const reqObj = {
        method: 'DELETE'
      }
  
      fetch(`http://localhost:3000/toys/${toyId}`, reqObj)
      .then(resp => resp.json())
      .then (alert("Toy has been deleted."))

      this.setState({
        toys: this.state.toys.filter(toy => toy.id !== toyId)
      })
  }
  
  
  


  componentDidMount(){
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then (toys => 
      this.setState({
        toys: toys
      })
    )
  }
 
  


  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addToy={this.addToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} donateToy={this.donateToy} handleLikes={this.handleLikes}/>
      </>
    );
  }

}

export default App;
