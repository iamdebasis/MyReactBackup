import React, { Component } from 'react';
import './ProjectItem.css'

class ProjectItem extends Component {

delete(id){
  console.log(id)
  this.props.onDelete(id)

}

  render() {

    return (
      <div>
      <div className="outLine">
        <div className="imgSt">
          <img className="img2" src="https://m.media-amazon.com/images/M/MV5BNjE5MzYwMzYxMF5BMl5BanBnXkFtZTcwOTk4MTk0OQ@@._V1_UX182_CR0,0,182,268_AL_.jpg" alt="Pineapple" width="120" height="170"/>
        </div>

        <div className="content"> 
          {this.props.singleProj.title}<br/><br/>
          {this.props.singleProj.category} <br/><br/>
          Year of release:      <br/><br/>
          Plot:                  <br/><br/>

          
        </div>
      </div>  <br/><br/>
      </div>
    );
  }
}

export default ProjectItem;
