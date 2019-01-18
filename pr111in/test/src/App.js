import React, { Component } from 'react';
import Projects from './Projects';
import AddProj from './AddProj'
import './App.css';
import uuid from 'uuid';

class App extends Component {
    constructor(){
      super();
      this.state={
        name:"debasis",
        projects:[]
      }

    }

    handleAddProject(newP){
      //console.log(newP)
      let current=this.state.projects;
      current.push(newP);
      this.setState({projects:current})
      
    }

    componentWillMount(){
      this.setState({projects:[         
      {
        id:uuid.v4(),
        title:"business site",
        category:"web development"
      },
      {
        id:uuid.v4(),
        title:"advertise",
        category:"business dev."
      },
      {
        id:uuid.v4(),
        title:"news",
        category:"web proj"
      }]})
    }

    handleDeleteProject(id){
      let current=this.state.projects;
      let index=current.findIndex(x=>x.id===id);
      current.splice(index,1);
      this.setState({projects:current})
    }
   

  render() {
    return (
      <div className="">
      <AddProj addProject={this.handleAddProject.bind(this)}/>
        my App
        <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)}/>
  
      
      </div>
    );
  }
}

export default App;
