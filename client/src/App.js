import React, { Component } from 'react';
import axios from 'axios'
import {saveAs} from 'file-saver'
import './App.css';

class App extends Component {

state = {
  name: '' ,
  bmi: 0,
  weight:0,
  height: 0 ,

}


handleChange = ({target:{value, name}}) => {
  this.setState({[name]: value})

}

createAndDownloadPDF = () => {
  axios.post('/create-pdf', this.state).then(()=> axios.get('/fetch-pdf', {responseType: 'blob'}))
  .then((res)=>{
      const pdfBlob = new Blob([res.data],{type: 'applicatiob/pdf'})
      saveAs(pdfBlob,'newPDF.pdf')
  })
}
render(){

  return (
    <div className="App">
      <h1>BMI Calculator</h1><br/><br/>
      <img width='100px' src ='https://cdn2.iconfinder.com/data/icons/fitness-8/512/fitness-color-16-512.png'></img><br/><br/><br/><br/>

        <input  type = 'text' placeholder = "Name" name = 'name' onChange = {this.handleChange}></input><br/><br/>
        <input  type = 'number' placeholder = "Weight (kg)" name = 'weight' onChange = {this.handleChange}></input><br/><br/>
        <input  type = 'number' placeholder = "Height (cm)" name = 'height' onChange = {this.handleChange}></input><br/><br/><br/>
        <button onClick= {this.createAndDownloadPDF}>Download PDF</button>
    </div>
  );
}
}
export default App;
