import React from 'react';
import ToyCard from './ToyCard'  

const ToyContainer = (props) => {

    const toyMap = (toys) => {
      return toys.map(toy => {
        return <ToyCard key={toy.id} toy={toy} handleLikes={props.handleLikes} donateToy={props.donateToy}/>
      })
    }
  
    return(
      <div id="toy-collection">
        {toyMap(props.toys)}
      </div>
    );
  }

export default ToyContainer;
