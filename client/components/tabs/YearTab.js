 import React from 'react'
 import ReactDOM from 'react-dom'
 import {Link} from 'react-router-dom'
 import { Tab, Tabs } from 'react-bootstrap'

 class YearTab extends React.Component{
   constructor(){
     super();
     this.state = {
       year:2018
     }
   }

   render(){
     return(
       <div>
          <Link to= {{pathname:'/', search:'?year='+this.props.year }}
                style={{color:'black'}}>
          <p style={{fontSize:'16px'}}>{this.props.year}</p>
          </Link>
       </div>
     )
   }

 }

export default YearTab;
