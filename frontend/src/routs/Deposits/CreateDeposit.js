import {useEffect, useState} from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';

const requiredMsg = "Поле обязательно для ввода"


export function CreateDeposit(props) {
    const [clientsState, setClients] = useState([]);

    useEffect(() => {
        const resp =  fetch(`http://127.0.0.1:8000/api/client`)
        resp.then(response => response.json()
            .then( data => setClients(data)))
    }, [])


    const [depositsState, setDeposits] = useState([]);

    useEffect(() => {
        const resp =  fetch(`http://127.0.0.1:8000/api/deposit_type`)
        resp.then(response => response.json()
            .then( data => setDeposits(data)))
    }, [])

    const [currencyState, setCurrency] = useState([]);

    useEffect(() => {
        const resp =  fetch(`http://127.0.0.1:8000/api/currency`)
        resp.then(response => response.json()
            .then( data => setCurrency(data)))
    }, [])

    const [contractNumber, setContractNumber] = useState("");

    useEffect(() => {
        const resp =  fetch(`http://127.0.0.1:8000/api/unique_deposit_contract`)
        resp.then(response => response.json()
            .then( data => setContractNumber(data.unique)))
    }, [])

    const { register, handleSubmit, watch, formState: { errors } } = useForm();


    const onSubmit = data => {
        data.contractNumber = contractNumber;
        fetch('http://127.0.0.1:8000/api/deposit/', {
            method: 'POST', 
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)}).then(
                (resp => {
                    if (resp.ok){
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Депозит добавлен',
                            showConfirmButton: false,
                            timer: 1500
                          });
                    props.history.push('/deposits')
                    } else {
                        resp.json().then(data => {
                            let message = ""
                            for (const key in data) {
                                message += `${data[key]}<br>`
                                console.log(`${key}: ${data[key]}`);
                            }
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: "Ошибка...",
                                html: message,
                                showConfirmButton: false,
                                timer: 3000
                              });
                        })
                    }
                })
            )
    }

    const creationOptions = {
        client: {
            required: requiredMsg
        },
        currency: {
            required: requiredMsg
        },
        depositType: {
            required: requiredMsg
        }
}


    return (
            <form className="shadow p-3 mb-5 bg-white rounded" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="page-header">Добавить Депозит</h1>

                <div className="form-row mt-5">
                   <div className="col-md-4">
                   <select className="custom-select mr-sm-2" {...register("client", creationOptions.client)}>
                                <option disabled selected value> -- Выбрать клиента -- </option>
                                {clientsState.map(client => <option key={client.id} value={client.id}>Клиент № {client.id}</option>)}
                            </select>
                            {errors.client && <span className="form-error">{errors.client.message}</span>}
                   </div>

                   <div className="col-md-4">
                   <select className="custom-select mr-sm-2" {...register("depositType", creationOptions.deposit_type)}>
                                <option disabled selected value> -- Выбрать тип депозита -- </option>
                                {depositsState.map(depositType => <option key={depositType.id} value={depositType.id}>{depositType.depositType}</option>)}
                            </select>
                            {errors.deposit_type && <span className="form-error">{errors.deposit_type.message}</span>}
                   </div>
                   <div className="col-md-4">
                   <select className="custom-select mr-sm-2" {...register("currency", creationOptions.currency)}>
                                <option disabled selected value> -- Выбрать валюту -- </option>
                                {currencyState.map(currency => <option key={currency.id} value={currency.id}>{currency.currency}</option>)}
                            </select>
                            {errors.currency && <span className="form-error">{errors.currency.message}</span>}
                   </div>
                </div>
                <div className="form-row mt-5">
                    <div className="col-md-6">
                            <label>Начало депозитной программы</label>
                            <input type="date" className="form-control"
                            {...register("startDate")} />
                        </div>
                    <div className="col-md">
                            <label>Окончание депозитной программы</label>
                            <input type="date" className="form-control"
                            {...register("endDate")} />
                        </div>
                   </div>
                <div className="form-row mt-5">
                    <div className="col-md-5">
                            <label>Сумма</label>
                            <input type="number" className="form-control"
                            {...register("cash")} />
                        </div>
                    <div className="col-md-5">
                            <label>Период</label>
                            <input type="number" className="form-control"
                            {...register("period")} />
                        </div>
                        <div className="col-md">
                            <label>Процент</label>
                            <input type="number" className="form-control"
                            {...register("percent")} />
                        </div>
                        <div className="col-md">
                            <label>Номер договора</label>
                            <input type="text" className="form-control" placeholder={contractNumber} disabled
                            {...register("contractNumber")} />
                        </div>
                   </div>
                <div className="align-right mt-5">
                    <input className="btn btn-outline-primary" type="submit" value="Добавить" />
                </div>
          </form>
        )
    }