import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart';
import axios from 'axios';
import logo from './logo.svg';

class App extends Component {
  constructor(){
    super();
    this.state = {
      chartData: {},
    }
  }

  async componentDidMount (){
    //this.getChartData();
    let self = this;
    await axios.get('http://localhost:3000/api/get-all-leads')
    .then((res) => {
      console.log(res.data.data);
      console.log(res.data.count);
      self.setState({

        chartData: {
          labels: res.data.data,
          // labels: [ 'N/A',
          // 'GoOverseas.com',
          // 'ESLCafe-25042018',
          // 'mailshake_cvlibrary' ],
          datasets:[
            {
              label:'Leads In',
              data: res.data.count,
              //data: [1,2,3,4],
              backgroundColor:[
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
              ]
            }
          ]
        }
      });
      console.log('inside setstate',self.state.chartData );
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getChartData(){
    let self = this;
    axios.get('http://localhost:3000/api/get-all-leads')
    .then((res) => {
      console.log(res.data.data);
      self.setState({
        chartData: {
          labels: [res.data.data],
          datasets:[
            {
              label:'Leads In',
              data: [res.data.count],
              backgroundColor:[
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
              ]
            }
          ]
        }
      });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  componentWillReceiveProps() {
    this.getChartData();
  }

  render() {
    console.log('render method', this.state.chartData);
    if(! this.state.chartData.datasets)
      {return (
        <div>
        <h2>Please wait while your Analytics load...</h2>
        </div>
      )}
    else {
      return (
        <div className="App">
          
          <Chart chartData={this.state.chartData}  legendPosition="bottom"/>
        </div>
      );
    }
  }
}

export default App;