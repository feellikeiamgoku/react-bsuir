import {useEffect, useState} from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import {apiUrl} from '../../Constanst';

const requiredMsg = "Поле обязательно для ввода"


export function CreateDeposit(props) {
    const [clientsState, setClients] = useState([]);

    useEffect(() => {
        const resp =  fetch(`${apiUrl}/client`)
        resp.then(response => response.json()
            .then( data => setClients(data)))
    }, [])


    const [depositsState, setDeposits] = useState([]);

    useEffect(() => {
        const resp =  fetch(`${apiUrl}/deposit_type`)
        resp.then(response => response.json()
            .then( data => setDeposits(data)))
    }, [])

    const [currencyState, setCurrency] = useState([]);

    useEffect(() => {
        const resp =  fetch(`${apiUrl}/currency`)
        resp.then(response => response.json()
            .then( data => setCurrency(data)))
    }, [])

    const [contractNumber, setContractNumber] = useState("");

    useEffect(() => {
        const resp =  fetch(`${apiUrl}/unique_deposit_contract`)
        resp.then(response => response.json()
            .then( data => setContractNumber(data.unique)))
    }, [])

    const { register, handleSubmit, watch, formState: { errors }, getValues } = useForm();


    const onSubmit = data => {
        data.contractNumber = contractNumber;
        fetch(`${apiUrl}/deposit/`, {
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
            pattern: {
                value: /[0-9]+/i,
                message: requiredMsg
            }
        },
        currency: {
            pattern: {
                value: /[0-9]+/i,
                message: requiredMsg
            }
        },
        depositType: {
            pattern: {
                value: /[0-9]+/i,
                message: requiredMsg
            }
        },
        startDate: {
            required: requiredMsg,
            validate: {
                dateCompare: date => (date < getValues().endDate) || "Стартовая дата должна быть меньше даты окончания"
            }
        },
        endDate: {
            required: requiredMsg,
        },
        cash: {
            required: requiredMsg,
            min: {
                value: 1000,
                message: "Минимальный cумма вклада - 1000 денежных единиц"
            }
        },
        period: {
            required: requiredMsg,
            min: {
                value: 6,
                message: "Минимальный срок вклада - 6 месяцев"
            },
            max: {
                value: 60,
                message: "Максимальный срок вклада - 60 месяцев"
            }
        },
        percent: {
            required: requiredMsg,
            min: {
                value: 1,
                message: "Минимальный процент вклада - 1%"
            },
            max: {
                value: 15,
                message: "Максимальный процент вклада - 15%"
            }
        }
}


    return (
            <form className="shadow p-3 mb-5 bg-white rounded" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="page-header">Добавить Депозит</h1>

                <div className="form-row mt-5">
                   <div className="col-md-4">
                   <select className="custom-select mr-sm-2" {...register("client", creationOptions.client)}>
                                <option disabled selected value> -- Выбрать клиента -- </option>
                                {clientsState.map(client => <option key={client.id} value={client.id}>{client.firstName} {client.lastName}</option>)}
                            </select>
                            {errors.client && <span className="form-error">{errors.client.message}</span>}
                   </div>

                   <div className="col-md-4">
                   <select className="custom-select mr-sm-2" {...register("depositType", creationOptions.depositType)}>
                                <option disabled selected value> -- Выбрать тип депозита -- </option>
                                {depositsState.map(depositType => <option key={depositType.id} value={depositType.id}>{depositType.depositType}</option>)}
                            </select>
                            {errors.depositType && <span className="form-error">{errors.depositType.message}</span>}
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
                            {...register("startDate", creationOptions.startDate)} />
                            {errors.startDate && <span className="form-error">{errors.startDate.message}</span>}
                        </div>
                    <div className="col-md">
                            <label>Окончание депозитной программы</label>
                            <input type="date" className="form-control"
                            {...register("endDate", creationOptions.endDate)} />
                            {errors.endDate && <span className="form-error">{errors.endDate.message}</span>}

                        </div>
                   </div>
                <div className="form-row mt-5">
                    <div className="col-md-4">
                            <label>Сумма</label>
                            <input type="number" className="form-control"
                            {...register("cash", creationOptions.cash)} />
                            {errors.cash && <span className="form-error">{errors.cash.message}</span>}

                        </div>
                    <div className="col-md-4">
                            <label>Период</label>
                            <input type="number" className="form-control"
                            {...register("period", creationOptions.period)} />
                            {errors.period && <span className="form-error">{errors.period.message}</span>}
                        </div>
                        <div className="col-md-3">
                            <label>Процент</label>
                            <input type="number" className="form-control"
                            {...register("percent", creationOptions.percent)} />
                            {errors.percent && <span className="form-error">{errors.percent.message}</span>}
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