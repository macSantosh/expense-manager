import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import AddExpense from './AddExpense';
import DeleteExpense from './DeleteExpense'
import YearTab from './tabs/YearTab'
import {Tabs, Tab} from 'react-bootstrap'

export default class App extends React.Component {

  constructor(){
    super();
    this.state = {
      selectedMonth: 'jan',
      selectedYear:2018,
      data:[]
    }

    this.getData = this.getData.bind(this);
    this.delete = this.delete.bind(this);
  //  this.onTabSelectHandler = this.onTabSelectHandler.bind(this);
  }


delete(ev){
  console.log("in delete handler :"+ ev.target.name);
    axios.get('/delete?id='+ev.target.name).then(function(res){
        console.log(" expesnse deleted "+ res.data);
    });
    this.getData(this, this.state.selectedYear);
}

onTabSelectHandler(year){
  this.setState({selectedYear:year});
}


componentDidUpdate(prevProps, prevState, prevContext){
  //should not set state in this method as it will rerender the component
  //this.getData(this, '2018');
}

 componentWillReceiveProps(nextProps) {
  //this method will soon deprecte,this method needed to reload the App after adding expense
   console.log("in componentWillReceiveProps menthod");
   if(nextProps.history.location.search){
      var search = nextProps.history.location.search;
      search = search.substring(1);
      var searchObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
      this.setState({selectedYear: searchObj.year});
      this.getData(this, searchObj.year);
      console.log(" componentWillReceiveProps : year "+ searchObj.year + ' '+ this.state.selectedYear);
   }else{
    this.getData(this, 2018);
  }
 }
componentWillUnmount(){
    console.log("in componenet will Unmount menthod");
}
componentDidMount(){ //try removing this method
    this.getData(this, this.state.selectedYear);
}

getData(ev, year){
    axios.get('/getAll?month=All&year='+year)
      .then(function(res){
        ev.setState({
          selectedYear:parseInt(year),
          data: res.data,
        });

      });
  }

  render() {
    return (
      <div className="table-responsive">

        <Tabs id='yearTabs' activeKey={this.state.selectedYear} onSelect={this.onTabSelectHandler} >
          <Tab eventKey={2018} title={<YearTab year='2018'/>}> </Tab>
          <Tab eventKey={2017} title={<YearTab year='2017'/>}></Tab>
          <Tab eventKey={2016} title={<YearTab year='2016'/>}></Tab>
        </Tabs>
        <br/>
        <AddExpense/>
        <table className="table table-hover table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th className='small-col' scope="col">#</th>
              <th className='desc-col' scope="col">Description</th>
              <th className='button-col' scope="col">Amount</th>
              <th className='button-col' scope="col">Month</th>
              <th className='button-col' scope="col">Year</th>
              <th className='button-col' scope="col">Action</th>
              <th className='button-col' scope="col">Delete</th>
            </tr>
          </thead>
              <tbody>
                {
                  this.state.data.map((exp)=>{   //have to => to resolve $this varibale inside the map function
                    return (<tr key={exp._id}>
                              <td className='counterCell'></td>
                              <td className='desc-col'>{exp.description}</td>
                              <td className='button-col'>{exp.amount}</td>
                              <td className='button-col'>{exp.month}</td>
                              <td className='button-col'>{exp.year}</td>
                              <td className='button-col'>
                                <button className="add btn btn-danger" name={exp._id} onClick={this.delete}> Delete</button>
                              </td>
                              <td className='button-col'><DeleteExpense id={exp._id}/></td>
                            </tr>)
                  })
                }
               </tbody>
            </table>
      </div>
    );
  }
}

//export default App;
