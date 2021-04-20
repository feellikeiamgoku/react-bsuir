import {useEffect, useState} from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import {Loader} from '../../common/Loader/Loader'
import {apiUrl} from '../../Constanst';
import NotFound from '../../common/Errors/NotFound'

const requiredMsg = "Поле обязательно для ввода"


export function UpdateDeposit(props) {
    const [curClient, setCurClient] = useState(0);
    const [curDepType, setCurDepType] = useState(0);
    const [curCurrency, setCurCurrency] = useState(0);

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

    const { register, handleSubmit, watch, formState: { errors }, reset, getValues } = useForm();
    
    const [isLoading, setIsLoading] = useState(true);
    const [errorState, setErrorState] = useState(false);

    useEffect(() => {
        const resp = fetch(`${apiUrl}/deposit/${props.match.params.id}`)
        resp.then(response => {
            if (response.ok) {
                response.json()
                .then(data => { reset({
                    contractNumber: data.contractNumber,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    period: data.period,
                    cash: data.cash,
                    percent: data.percent
                })
                setContractNumber(data.contractNumber);
                setCurClient(data.client && data.client);
                setCurCurrency(data.currency && data.currency.id);
                setCurDepType(data.depositType && data.depositType.id)
                setIsLoading(false);
            })} else {
                setIsLoading(false);
                setErrorState(true);
            }
            })
        }, [])

    const onSubmit = data => {
        data.client = curClient;
        fetch(`${apiUrl}/deposit/${props.match.params.id}/`, {
            method: 'PATCH', 
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
                            title: 'Депозит обнавлён',
                            showConfirmButton: false,
                            timer: 1500
                          });
                    props.history.push('/deposits')
                    } else {
                        resp.json().then(data => {
                            let message = ""
                            for (const key in data) {
                                message += `${data[key]}<br>`
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
            isLoading ? <Loader/> : 
            ( errorState ? <NotFound></NotFound> : (
            <form className="shadow p-3 mb-5 bg-white rounded" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="page-header">Обновить Депозит № {props.match.params.id}</h1>

                <div className="form-row mt-5">
                   <div className="col-md-4">
                   <select className="custom-select mr-sm-2"  value={curClient} {...register("client", creationOptions.client)}
                   onChange={e => setCurClient(e.target.value)}>
                                <option disabled> -- Выбрать клиента -- </option>
                                {clientsState.map(client => <option key={client.id} value={client.id}>Клиент № {client.id}</option>)}
                            </select>
                            {errors.client && <span className="form-error">{errors.client.message}</span>}
                   </div>

                   <div className="col-md-4">
                   <select className="custom-select mr-sm-2" {...register("depositType", creationOptions.depositType)} value={curDepType}
                   onChange={e => setCurDepType(e.target.value)}>
                                <option disabled > -- Выбрать тип депозита -- </option>
                                {depositsState.map(depositType => <option key={depositType.id} value={depositType.id}>{depositType.depositType}</option>)}
                            </select>
                            {errors.depositType && <span className="form-error">{errors.depositType.message}</span>}
                   </div>
                   <div className="col-md-4">
                   <select className="custom-select mr-sm-2" {...register("currency", creationOptions.currency)} value={curCurrency}
                   onChange={ e => setCurCurrency(e.target.value)}>
                                <option disabled> -- Выбрать валюту -- </option>
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
                    <input className="btn btn-outline-primary" type="submit" value="Обновить" />
                </div>
          </form>))
        )
    }