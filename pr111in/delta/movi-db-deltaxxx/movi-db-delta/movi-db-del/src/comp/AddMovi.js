import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uuid from 'uuid';
import './AddMovi.css';
import DispMovies from'./DispMovies'
import ElasticSearch from './ElasticSearch'

class AddMovi extends Component {

    constructor(){
        super();
        this.state={
            DbData:[],
            data:false, 
            id:'',
            title:'',
            genre:'',
            year:'',
            plot:'',
            actors:'',
            producer:'',
            director:''
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    

 
    async componentWillMount(){
        
        const response=await fetch('https://x92ndbeg2m.execute-api.us-east-2.amazonaws.com/prod/myresource')
        
        const data=await response.json();
        this.setState({DbData:data})
        //console.log(this.state.DbData)
       
        this.setState({data:true})
    }

    async deleteMovie(title){
        //console.log(title)
        //make delete request ......
        var res= await fetch('https://x92ndbeg2m.execute-api.us-east-2.amazonaws.com/prod/myresource', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-api-key':'F4i8LzbBC2aobfnj8AemaY06tJdEdXG9Sp3ncwEh'
                  },
                  body: JSON.stringify(
                    {
                    title:title,
                    }
                  
                  )
                })
                var data= await res.json()
                console.log(data)
                //after deleting  data we are making the get api call again to update content
                const response=await fetch('https://x92ndbeg2m.execute-api.us-east-2.amazonaws.com/prod/myresource')
                 data=await response.json();
                this.setState({DbData:data})
    }


     handleSubmit(e){
        if(this.refs.title.value===''){
            alert('title is required')
        }else{
            this.setState({
                id:uuid.v4(),
                title:this.refs.title.value,
                genre:this.refs.genre.value,
                year:this.refs.year.value,
                plot:this.refs.plot.value,
                actors:this.refs.actors.value,
                producer:this.refs.producer.value,
                director:this.refs.director.value,
            },async function(){     //this is callback function
                //console.log(this.state)
                //making api call to dynamodb
                var res= await fetch('https://x92ndbeg2m.execute-api.us-east-2.amazonaws.com/prod/myresource', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(
                    {
                    id:this.state.id,
                    title:this.state.title,
                    genre:this.state.genre,
                    year:this.state.year,
                    plot:this.state.plot,
                    actors:this.state.actors,
                    producer:this.state.producer,
                    director:this.state.director,
                    }
                  
                  )
                })
                var data= await res.json()
                if(data.errorMessage){
                toast(data.errorMessage)   //use toast to display msg.
                }
                else
                toast(data)
                
                //after inserting new data we are making the get api call again to update content in the UI
                const response=await fetch('https://x92ndbeg2m.execute-api.us-east-2.amazonaws.com/prod/myresource')
                const data=await response.json();
                this.setState({DbData:data})


                //making api call to ElasticSearch domain to insert this data
                var res1=await fetch('https://search-testcluster-qpthliyirmqkhwgbotzutrrrle.us-east-1.es.amazonaws.com/movi-db/movies', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(
                        {
                            id:this.state.id,
                            title:this.state.title,
                            genre:this.state.genre,
                            year:this.state.year,
                            plot:this.state.plot,
                            actors:this.state.actors,
                            producer:this.state.producer,
                            director:this.state.director,
                            }
                      )
                })
                var data= await res1.json()
                //console.log(data)
         
                })                
                }
        
        e.preventDefault();
        
    }




  render() {
    //console.log(this.state.DbData)
    return (
      <div >
        <div>    
          <ToastContainer />
        </div>
        <ElasticSearch/>

        <h1>Add a Movie</h1> 
        <form onSubmit={this.handleSubmit} className="outline">
            <div>
                <label>Title:</label>
                <input type="text" ref="title" style={{marginLeft:360}} />
            </div><br/>
            <div>
                <label>Genre:</label>
                <input type="text" ref="genre" style={{marginLeft:350}}/>
            </div><br/>
            <div>
                <label>Year of Release:</label>
                <input type="text" ref="year" style={{marginLeft:282}}/>
            </div><br/>
            <div>
                <label>Plot</label>
                <input type="text" ref="plot" style={{marginLeft:367}}/>
            </div><br/>
            <div>
                <label>Enter Actor names( enter comma seperated values)</label>
                <input type="text" ref="actors" style={{marginLeft:28}}/>
            </div><br/>
            <div>
                <label>Enter Director name</label>
                <input type="text" ref="director" style={{marginLeft:250}}/>
            </div><br/>   
            <div>
                <label>Enter producer name</label>
                <input type="text" ref="producer" style={{marginLeft:245}}/>
            </div><br/>   
            <div>
                <input type="submit" value="submit" style={{marginLeft:100}}/>
            </div>
        </form><br/><br/>


        { this.state.data ?
        <div style={{display: 'flex'}}>
       <DispMovies db={this.state.DbData.Items} onDelete={this.deleteMovie.bind(this)}/>
       </div>
       :
       <div>Loading movi list......!!!!</div>}
      </div>
    );
  }
}

export default AddMovi;
