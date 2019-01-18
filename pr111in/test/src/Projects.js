import React, { Component } from 'react';
import ProjectItem from './ProjectItem';


class Projects extends Component {
  deleteProject(id){
    this.props.onDelete(id)
  }

  
  render() {
    let projectItems;
    if(this.props.projects){
      projectItems=this.props.projects.map(proj=>{
        //console.log(proj)
        return(
          <ProjectItem onDelete={this.deleteProject.bind(this)} key ={proj.title} singleProj ={proj}/>
        );
      })
    }
  
    return (
      <div className="Projects">
         {projectItems} 
      </div>
    );
  }
}

export default Projects;
