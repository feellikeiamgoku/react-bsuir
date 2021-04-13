import Table from './Table';
import Loader from './Loader/Loader';
import { Link } from 'react-router-dom';

import { Component } from 'react';
import Swal from 'sweetalert2';

class Clients extends Component {
    state ={
        isLoading: true,
        data: [],
        columns: [
        "ID", "Фамилия","Имя", 
        "Отчество", "Дата рождения",
        "Серия паспорта", 
        "№ паспорта", 
        "Кем выдан",
        "Дата выдачи", 
        "Идент. номер", 
        "Место рождения",
        "Город факт. проживания", 
        "Адрес факт. проживания",
        "Телефон дом.", 
       "Телефон моб", 
        "E-mail", 
        "Место работы",
        "Должность", 
        "Семейное положение", 
        "Гражданство", 
        "Инвалидность",
        "Ежемесячный доход",
        "Пенсионер",
        "Военнообязанный"]
    }
  

  async componentDidMount() {
    const response = await fetch(`http://127.0.0.1:8000/api/client`)
    const data = await response.json()
    console.log(data)
    this.setState({
      isLoading:false,
      data: data})
  }

  deleteRow = (id, index) => {

        Swal.fire({
            title: `Удалить клиента № ${id}?`,
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
                  `Клиент № ${id} удалён.`,
                  'success'
                )
                this.state.data.splice(index, 1);
                this.setState(this.state.data);
            } else {
              Swal.fire(
                'Ошибка!',
                `Клиент № ${id}  не удалён.`,
                'error'
              )
            }
          } 
          })
    }

  deleteInDB(id) {
    return fetch(`http://127.0.0.1:8000/api/client/${id}/`, {method: 'DELETE'})
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
        <h1 className="page-header">Клиенты</h1>
        
        <Table data={this.state.data} columns={this.state.columns} deleteRow={this.deleteRow}/>
        <div className="align-right">
            <Link className="btn btn-outline-primary" to="/create_client">Добавить клиента</Link>
            
        </div>
        </div> )
      )
  }
}

export default Clients;