
import React from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'
import {Link} from 'react-router-dom'

class DeleteExpense extends React.Component {
  constructor(){
    super();
    this.state= {
      returnMessage : '',
      id : ''
    };
    this.delete = this.delete.bind(this);
  }

  componentDidMount(){
    this.setState({id:this.props.id});
  }

  delete(){
    //console.log('DeleteExpense: deleting expense of id: '+ this.state.id);
    var thiss = this;
    axios.get('\delete?id='+thiss.state.id).then(function(res){
      thiss.setState({returnMessage: res.data});
    });
  }

  render(){
    return(
      <div>
        <button className='btn btn-danger btn-small' onClick={this.delete}>
          <Link to='/' style={{textDecoration:'none', color:'white'}}><span>delete</span> </Link>
        </button>
      </div>
    );
  }
}

export default DeleteExpense;
