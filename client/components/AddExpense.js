          import React from 'react';
          import ReactDOM from 'react-dom'
          import axios from 'axios';
          import Modal from 'react-modal';
          import App from './App';
          import {Link} from 'react-router-dom'


          class AddExpense extends React.Component{
            constructor(){
              super();
              this.state = {
                year:'',
                month:'',
                amount:'',
                desc:'',
                isModalOpen:false,
                serverResponse:'',
                hasError:false,
                errorClass:""
              };
              this.onHandleTextChange = this.onHandleTextChange.bind(this);
              this.openModal = this.openModal.bind(this);
              this.closeModal = this.closeModal.bind(this);
              this.onClick = this.onClick.bind(this);
            }

            //need this method if componenet  failed to display
          componentDidCatch(error, info) {
                // Display fallback UI
                this.setState({ hasError: true });
                // You can also log the error to an error reporting service
                //logErrorToMyService(error, info);
          }

          openModal(){
            this.setState({isModalOpen:true,serverResponse:''});
          }

          closeModal(){
            this.setState({isModalOpen:false});
          }

          //need this method to set the base of the Modal. -DEPRECATED
          componentWillMount(){
           Modal.setAppElement('body');
          }

          onClick(){
            //we need to saperate the insertExpense method, as $this operator loose its context inside the axios.then
            this.insertExpense(this);
          }

          insertExpense(thisObjectReference){
            //add the expense here,call insert data call here
            axios.post('/insert', { // we may need json.stringfy sometime to send this data
              amount:thisObjectReference.state.amount,
              desc:thisObjectReference.state.desc,
              year:thisObjectReference.state.year,
              month:thisObjectReference.state.month
            }).then(function(res){
              console.log(res.data);
              thisObjectReference.setState({serverResponse:res.data});
            });
          }

          onHandleTextChange(ev){
            //console.log("event: "+ ev);
            //console.log("target : "+ ev.target);
            //update the state to set the amount and desc
            if(ev.target.name == 'amount'){
              this.setState({amount: ev.target.value, errorClass:''});
              if(isNaN(ev.target.value)){
                this.setState({errorClass:"error"});
              }
            }else if (ev.target.name == 'desc') {
              this.setState({desc: ev.target.value});
            }else if (ev.target.name == 'year') {
              this.setState({year: ev.target.value});
            }else if (ev.target.name == 'month') {
              this.setState({month: ev.target.value});
            }
          }

          render(){
            if(this.state.hasError){
              return(  <label htmlFor="hasError" className="col-sm-4 col-form-label"> Error Occurred </label>);
            }else{
              if(this.state.serverResponse != ''){
                return(
                  <div>
                      <button className="add btn btn-success" onClick={this.openModal}>Add Expense 1</button>
                      <Modal className="Modal" contentLabel="Add Expense" isOpen={this.state.isModalOpen} onRequestClose={this.closeModal}>

                        <label htmlFor="serverResponse"  name='serverResponse'>{this.state.serverResponse}</label>
                        <Link to='/' ><button type="submit" className="close_addExpense btn btn-secondary" onClick={this.closeModal}>Close</button></Link>
                      </Modal>
                  </div>
                );
              }else{
                return(

                      <div>
                        <button className="add btn btn-success" onClick={this.openModal}>Add Expense 2</button>
                        <Modal className="Modal" contentLabel="Add Expense" isOpen={this.state.isModalOpen} onRequestClose={this.closeModal}>
                          <div className="addForm">
                            <div className="form-group row">
                              <label htmlFor="amount" className="col-sm-4 col-form-label">Amount</label>
                              <div className="col-sm-6">
                                <input type='text' name='amount' className ={'form-control ' + this.state.errorClass} value={this.state.amount} onChange={this.onHandleTextChange}/>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="desc" className="col-sm-4 col-form-label">Description</label>
                              <div className="col-sm-6">
                                <input type='text' name='desc' className='form-control' value={this.state.desc} onChange={this.onHandleTextChange}/>
                              </div>
                            </div>
                            <div className ="form-group row">
                              <label htmlFor="month" className="col-sm-4 col-form-label">Month </label>
                              <div className="col-sm-6">
                                <input type='text' name='month' className = 'form-control' value={this.state.month} onChange={this.onHandleTextChange}/>
                              </div>
                            </div>
                            <div className ="form-group row">
                              <label htmlFor="year" className="col-sm-4 col-form-label">Year </label>
                              <div className="col-sm-6">
                                <input type='text' name='year' className = 'form-control' value={this.state.year} onChange={this.onHandleTextChange}/>
                              </div>
                              </div>
                            <div>
                              <Link to='/' ><button type="submit" className="close_addExpense btn btn-primary" onClick={this.closeModal}>Cancel</button></Link>
                              <button type="submit" className="submit_addExpense btn btn-primary" onClick={this.onClick}>Add Expense</button>
                            </div>

                          </div>

                        </Modal>

                      </div>
                    );
                  }
              }
            }

          }


          export default AddExpense;
