import React, { Component } from 'react';

import { FormGroup,FormControl } from 'react-bootstrap';

import 'react-toastify/dist/ReactToastify.css';
import './DispMovies.css'

class ElasticSearch extends Component {

    constructor(){
        super();
       this.state={
            src:'',
            resEla:[]
        }
    this.handleSubmit=this.handleSubmit.bind(this)  
    }
    async handleSubmit(){
        
        var res1=await fetch('https://search-testcluster-qpthliyirmqkhwgbotzutrrrle.us-east-1.es.amazonaws.com/movi-db/movies/_search', {
        method:'POST',   
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },   
        body: JSON.stringify(
            {
                "query" : {
                    "match" : {
                        "title":this.state.src
                    }
                  }
                }
        )
        })
        var data= await res1.json()
        this.setState({resEla:data})
        console.log(this.state.resEla.hits)
        

    }


  render() {


    return (  
    <div>     
        <div style={{display:'flex'}}>      
        <div style={{fontSize:'18px'}}>Search movies:</div>  
        <FormGroup controlId='src'>
            <FormControl
            type='text'
            placeholder='Enter Query'
            onChange={({ target }) => { this.setState({src:target.value}) }} />
        </FormGroup> 
        <div>
        <input type="button" value="submit"onClick={this.handleSubmit} />
        </div> 
        </div>  
      </div>
    );
  }
}

export default ElasticSearch;
