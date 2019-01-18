import React, { Component } from 'react';
import './GitApi.css';
import { FormControl,FormGroup,ControlLabel } from 'react-bootstrap';
class data extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search:'',
      data:[], //gets the response from github
      star:[],  //store stars reting for all repositories

      
    };
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleSubmit1=this.handleSubmit1.bind(this);

  }

  async handleSubmit1(){
    var res=await fetch('https://v28sqz0yxj.execute-api.us-east-2.amazonaws.com/prod/worldresource',{
      headers: {
        'x-api-key':'F4i8LzbBC2aobfnj8AemaY06tJdEdXG9Sp3ncwEh'
      }
    })
    var data= await res.json()
    console.log(data)
  }
  


  async handleSubmit(){
    var res= await fetch('https://v28sqz0yxj.execute-api.us-east-2.amazonaws.com/prod/worldresource', {
      method: 'POST',
      headers: {
        //'x-api-key':'F4i8LzbBC2aobfnj8AemaY06tJdEdXG9Sp3ncwEh',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
        name:"mikel",
        val:42
        }
      
      )
    })
    const content = await res.json();
    console.log(content);
  }

         

  
  render(){   
    
    return(
      <div><p>Please open console</p><br/>
            <FormGroup >
            <ControlLabel>Enter Github Username  &nbsp;&nbsp;&nbsp;</ControlLabel>
                <FormControl
                    type='text'
                    alignItems='center'
                    placeholder=''
                    onChange = {(event) => this.setState({search: event.target.value })} />
             </FormGroup><br/>
    
                <button onClick={this.handleSubmit} style={{borderBottomLeftRadius:0,borderTopLeftRadius:0}}>
                post Result</button>     
                <button onClick={this.handleSubmit1} style={{borderBottomLeftRadius:0,borderTopLeftRadius:0}}>
                get Result</button>            
      </div>
    );
  }}
export default data;
  