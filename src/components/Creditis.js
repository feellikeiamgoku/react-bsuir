import Table from './Table';
import Loader from './Loader/Loader';

import { Component } from 'react';

class Credits extends Component{
    state ={
        isLoading: true,
        data: [],
        columns: ["ID", "Имя", "Фамилия"]
    }

  async componentDidMount() {
    // const response = await fetch(` http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
    // const data = await response.json()
    setTimeout(() => {
        const data = [
            {
                id: 1,
                firstName: "Alex",
                lastName: "Bokhan",
                email: "abokhan@emaol.com",
                phone: "804u540t45454"
            },
            {
                id: 2,
                firstName: "Alex",
                lastName: "Bokhan",
                email: "abokhan@emaol.com",
                phone: "804u540t45454"
            },
            {
                id: 3,
                firstName: "Alex",
                lastName: "Bokhan",
                email: "abokhan@emaol.com",
                phone: "804u540t45454"
            },
            {
                id: 4,
                firstName: "Alex",
                lastName: "Bokhan",
                email: "abokhan@emaol.com",
                phone: "804u540t45454"
            }
           ]
           this.setState({
               isLoading:false,
               data: data
           });
    }, 250)
    // const data = [
    //  {
    //      id: 1,
    //      firstName: "Alex",
    //      lastName: "Bokhan",
    //      email: "abokhan@emaol.com",
    //      phone: "804u540t45454"
    //  }
    // ]
    // this.setState({
    //     isLoading:false,
    //     data: data
    // });
  }
    deleteRow = (id, index) => {
        this.state.data.splice(index, 1);
        this.setState(this.state.data);
    }

    render () {
      return (
        <div className="Credits">
            <h1 className="page-header">Кредиты</h1>
        {  
            this.state.isLoading 
            ? <Loader />
            : <Table data={this.state.data} columns={this.state.columns} deleteRow={this.deleteRow}/>
        }
        </div>
      )
  }
}

export default Credits;