import React, { Component } from 'react';
import ProjectItem from './ProjectItem';
import uuid from 'uuid';

class AddProj extends Component {

    constructor(){
        super();
        this.state={
            newProject:{}
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    static defaultProps={
        categories:['web design','web development','Mobile development']
    }

    handleSubmit(e){
        if(this.refs.title.value==''){
            alert('title is required')
        }else{
            this.setState({newProject:{
                id:uuid.v4(),
                title:this.refs.title.value,
                category:this.refs.cat.value,
            }},function(){
                //console.log(this.state)
                this.props.addProject(this.state.newProject);
            })
        }
        e.preventDefault();
    }




  render() {
      let categoryOptions=this.props.categories.map(cat=>{
          return <option key={cat} value={cat}>{cat}</option>
      })
    return (
      <div >
        <h1>Add Project</h1> 
        <form onSubmit={this.handleSubmit}>
            <div>
                <label>Title</label>
                <input type="text" ref="title"/>
            </div>
            <div>
                <label>Category</label>
                <select ref="cat">
                    {categoryOptions}
                </select>
            </div>
            <div>
                <input type="submit" value="submit"/>
            </div>
        </form><br/><br/>
      </div>
    );
  }
}

export default AddProj;
