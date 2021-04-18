import Table from './Table';
import {Loader} from '../../common/Loader/Loader';
import { Link } from 'react-router-dom';

import { Component } from 'react';
import Swal from 'sweetalert2';

class Credits extends Component {
    state ={
        isLoading: true,
        data: [],
        columns: [
            "ID",
            "Тип депозита",
            "Валюта",
            "Номер договора",
            "Начало кредитной программы",
            "Окончание кредитной программы",
            "Срок договора",
            "Сумма",
            "Процент",
            "Идент. клиента"]
        
    }
  

  async componentDidMount() {
    const response = await fetch(`http://127.0.0.1:8000/api/credit`)
    const data = await response.json()
    this.setState({
      isLoading:false,
      data: data})
  }

  deleteRow = (id, index) => {

        Swal.fire({
            title: `Удалить кредит № ${id}?`,
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
                  `Кредит № ${id} удалён.`,
                  'success'
                )
                this.state.data.splice(index, 1);
                this.setState(this.state.data);
            } else {
              Swal.fire(
                'Ошибка!',
                `Кредит № ${id}  не удалён.`,
                'error'
              )
            }
          } 
          })
    }

  deleteInDB(id) {
    return fetch(`http://127.0.0.1:8000/api/credit/${id}/`, {method: 'DELETE'})
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
        <h1 className="page-header">Кредиты</h1>
        
        <Table data={this.state.data} columns={this.state.columns} deleteRow={this.deleteRow}/>
        <div className="align-right">
            <Link className="btn btn-outline-primary" to="/create_credit">Добавить кредит</Link>
            
        </div>
        </div> )
      )
  }
}


export default Credits;