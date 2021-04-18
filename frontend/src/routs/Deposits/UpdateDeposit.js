import {useEffect, useState} from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import {Loader} from '../../common/Loader/Loader'
const requiredMsg = "Поле обязательно для ввода"


export function UpdateDeposit(props) {
    const [curClient, setCurClient] = useState(0);
    const [curDepType, setCurDepType] = useState(0);
    const [curCurrency, setCurCurrency] = useState(0);

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

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const resp = fetch(`http://127.0.0.1:8000/api/deposit/${props.match.params.id}`)
        resp.then(response => response.json()
            .then(data => { reset({
                contractNumber: data.contractNumber,
                startDate: data.startDate,
                endDate: data.endDate,
                period: data.period,
                cash: data.cash,
                percent: data.percent
            })
            setContractNumber(contractNumber);
            setCurClient(data.client && data.client);
            setCurCurrency(data.currency && data.currency.id);
            setCurDepType(data.depositType && data.depositType.id)
            setIsLoading(false);
            }))
    }, [])

    const onSubmit = data => {
        data.client = curClient;
        fetch(`http://127.0.0.1:8000/api/deposit/${props.match.params.id}/`, {
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
            required: requiredMsg
        },
        depositType: {
            required: requiredMsg
        }
}


    return (
            isLoading ? <Loader/> : 
            (<form className="shadow p-3 mb-5 bg-white rounded" onSubmit={handleSubmit(onSubmit)}>
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
          </form>)
        )
    }