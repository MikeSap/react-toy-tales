import React, { Component } from 'react';

class ToyForm extends Component {
 state = {
   name: "",
   image:"",
   likes: 0
 }

 handleChange = event => {
   this.setState({
     ...this.state, 
     [event.target.name] : event.target.value
   })
 }
  handleSubmit = (event) => {
    event.preventDefault()
    let newToy = {...this.state}
    this.props.addToy(newToy)

  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a toy!</h3>
          <input onChange = {this.handleChange} type="text" name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input onChange = {this.handleChange} type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
