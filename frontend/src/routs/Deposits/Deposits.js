import Table from './Table';
import {Loader} from '../../common/Loader/Loader';
import { Link } from 'react-router-dom';
import {apiUrl} from '../../Constanst';
import { Component } from 'react';
import Swal from 'sweetalert2';

class Deposits extends Component {
    state ={
        isLoading: true,
        data: [],
        columns: [
            "ID",
            "Тип депозита",
            "Валюта",
            "Номер договора",
            "Начало депозитной программы",
            "Окончание депозитной программы",
            "Срок договора",
            "Сумма",
            "Процент",
            "Идент. клиента"]
        
    }
  

  async componentDidMount() {
    const response = await fetch(`${apiUrl}/deposit`)
    const data = await response.json()
    console.log(data)
    this.setState({
      isLoading:false,
      data: data})
  }

  deleteRow = (id, index) => {

        Swal.fire({
            title: `Удалить депозит № ${id}?`,
            text: "У вас не будет возможности отменить это действие.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Да, удалить',
            cancelButtonText: 'Отменить'
          }).then((result) => {
            if (result.isConfirmed) {
              const isDeleted = this.deleteInDB(id)
              if (isDeleted) {
                Swal.fire(
                  'Удалено!',
                  `Депозит № ${id} удалён.`,
                  'success'
                )
                this.state.data.splice(index, 1);
                this.setState(this.state.data);
            } else {
              Swal.fire(
                'Ошибка!',
                `Депозит № ${id}  не удалён.`,
                'error'
              )
            }
          } 
          })
    }

  deleteInDB(id) {
    return fetch(`${apiUrl}/deposit/${id}/`, {method: 'DELETE'})
    .then((response) => {
      if (!response.ok) {
        return false;
      } else{
        return true;
      }
    })
    }

    render () {
      
      return (
        
        this.state.isLoading ? <Loader /> : ( 
        <div className="Clients">
        <h1 className="page-header">Депозиты</h1>
        
        <Table data={this.state.data} columns={this.state.columns} deleteRow={this.deleteRow}/>
        <div className="align-right">
            <Link className="btn btn-outline-primary" to="/create_deposit">Добавить депозит</Link>
            
        </div>
        </div> )
      )
  }
}


export default Deposits;