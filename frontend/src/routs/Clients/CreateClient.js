import {useEffect, useState} from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';

const requiredMsg = "Поле обязательно для ввода"

const NormolizedPassportNumber = value => {
    return value.match(/^[0-9]{0,7}$/g) ? value : value.slice(0, value.length - 1);
}

const NormolizedPassportNumberId = value => {
    if (value.length <= 7) {
        return value.match(/^[0-9]{0,7}$/g) ? value : value.slice(0, value.length - 1)
    } else if (value.length > 7 && value.length <= 9) {
        return value.match(/^[0-9]{0,7}[A-Z]{1,2}$/g) ? value : value.slice(0, value.length - 1)
    } else if (value.length > 9 && value.length <= 11){
        return value.match(/^[0-9]{0,7}[A-Z]{1,2}[0-9]{1,2}$/g) ? value : value.slice(0, value.length - 1)
    } else if (value.length > 11 && value.length <= 13){
        return value.match(/^[0-9]{0,7}[A-Z]{1,2}[0-9]{1,2}[A-Z]{1,2}$/g) ? value : value.slice(0, value.length - 1)
}   else {
        return value.match(/^[0-9]{0,7}[A-Z]{1,2}[0-9]{1,2}[A-Z]{1,2}\d{1}$/g) ? value : value.slice(0, value.length - 1)
    }
}

export function CreateClient(props) {
    const [cityState, setCity] = useState([]);

    useEffect(() => {
        const resp =  fetch(`http://127.0.0.1:8000/api/city`)
        resp.then(response => response.json()
            .then( data => setCity(data)))
    }, [])

    const [familyState, setFamily] = useState([]);

    useEffect(() => {
        const resp =  fetch(`http://127.0.0.1:8000/api/family`)
        resp.then(response => response.json()
            .then( data => setFamily(data)))
    }, [])

    const [citizenshipState, setCinizenship] = useState([]);

    useEffect(() => {
        const resp =  fetch(`http://127.0.0.1:8000/api/citizenship`)
        resp.then(response => response.json()
            .then( data => setCinizenship(data)))
    }, [])

    const [disabilityState, setDisability] = useState([]);

    useEffect(() => {
        const resp =  fetch(`http://127.0.0.1:8000/api/disability`)
        resp.then(response => response.json()
            .then( data => setDisability(data)))
    }, [])

    const PopulateHomePhone = (value) => {
        const mask = /^8 \(([0-9]{1,4})?\)\s([0-9]{1,7})?$/
        if (value.match(mask)) {
            states.homePhoneState = value;
            return value
        } else {
            return states.homePhoneState;
        }
    }


    const PopulateMobilePhone = (value) => {
        const mask = /^\+375 \(([0-9]{1,2})?\)\s([0-9]{1,7})?$/
        if (value.match(mask)) {
            states.mobilePhoneState = value;
            return value
        } else {
            return states.mobilePhoneState;
        }
    }


    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const states = {homePhoneState: "8 () ", mobilePhoneState: "+375 () "}

    const [retirementState, setRetirementState] = useState(false);
    const [militaryState, setMilitaryState] = useState(false);


    const onSubmit = data => {
        if (data.income === '') {
            data.income = 0;
        }
        if (data.mobilePhone === '+375 () '){
            data.mobilePhone = null
        }
        if (data.homePhone === '8 () '){
            data.homePhone = null
        }
        if (data.email === '') {
            data.email = null
        }
        fetch('http://127.0.0.1:8000/api/client/', {
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
                            title: 'Клиент добавлен',
                            showConfirmButton: false,
                            timer: 1500
                          });
                    props.history.push('/clients')
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
        firstName : {
            required: requiredMsg,
            pattern: {
                value: /^[А-Я]{1}[а-я]+$/g,
                message: "Введите корректное имя киррилицей"
            }
        },
        lastName: {
            required: requiredMsg,
            pattern: {
                value: /^[А-Я]{1}[а-я]+$/g,
                message: "Введите корректную фамилию киррилицей"
            }
        },
        surname: {
            required: requiredMsg,
            pattern: {
                value: /^[А-Я]{1}[а-я]+$/g,
                message: "Введите корректное отчество киррилицей"
            }},
        birthDate: {required: requiredMsg,
            validate: {
                validateBirthDay: value => {
                    const date = new Date(value)
                    const ageDifMs = Date.now() - date.getTime();
                    const ageDate = new Date(ageDifMs); 
                    return Math.abs(ageDate.getUTCFullYear() - 1970) >= 18 || "Только с 18 лет.";
                }
            }
            },
        passportSeries: {
            required: requiredMsg,
            pattern: {
                value: /^[A-Z]{2}$/g,
                message: "Введите корректную серию паспорта"
            }
        },
        passportNumber: {
            required: requiredMsg,
            pattern: {
                value: /^[0-9]{7}$/g,
                message: "Введите корректный номер паспорта"
            }
        },
        passportNumberId: {
            required: requiredMsg,
            pattern: {
                value: /^[0-9]{7}[A-Z]{2}[0-9]{2}[A-Z]{2}\d{1}$/g,
                message: "Введите корректный идентефикационный номер"
            }
        },
        given: {
            required: requiredMsg
        },
        givenDate: {
            required: requiredMsg,
            validate: {
                validGivenDate: value => {
                    const date = new Date(value);
                    return date < Date.now() || "Неверная дата"
                }
            }
        },
        birthPlace: {
            required: requiredMsg
        },
        city: {
            required: requiredMsg,
            pattern: {
                value: /[0-9]+/g,
                message: requiredMsg
            }
        },
        address: {
            required: requiredMsg
        },
        homePhone: {
            pattern: {
                value: /^(8 \(([0-9]{2,4})?\)\s([0-9]{7})?)$|^(8 \(\)\s)$/,
                message: "Введите корректный номер телефона"
            }
        },
        mobilePhone: {
            pattern: {
                value: /^\+375 \(([0-9]{2})?\)\s([0-9]{7})?$|(^\+375 \(\)\s)$/,
                message: "Введите корректный номер телефона"
            }
        },
        status: {
            pattern: {
                value: /[0-9]+/i,
                message: requiredMsg
            }
        },
        citizenship: {
            pattern: {
                value: /[0-9]+/g,
                message: requiredMsg
            }
        },
        disability: {
            pattern: {
                value: /[0-9]+/g,
                message: requiredMsg
            }
        }
}


    return (
            <form className="shadow p-3 mb-5 bg-white rounded" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="page-header">Добавить Клиента</h1>

                <div className="form-row mt-5">
                    <div className="col-md-4">
                        <label>Имя</label>
                        <input type="text" className="form-control" placeholder="Диана" 
                        {...register("firstName", creationOptions.firstName)}/>  
                        {errors.firstName && <span className="form-error">{errors.firstName.message}</span>}
                    </div>
                    <div className="col-md-3">
                        <label>Фамилия</label>
                        <input type="text" className="form-control" placeholder="Шабловская"
                        {...register("lastName", creationOptions.lastName)}/>
                        {errors.lastName && <span className="form-error">{errors.lastName.message}</span>}
                    </div>
                    <div className="col-md-3">
                        <label>Отчество</label>
                        <input type="text" className="form-control" placeholder="Юрьевна"
                        {...register("surname", creationOptions.surname)} />
                        {errors.surname && <span className="form-error">{errors.surname.message}</span>}

                    </div>
                    <div className="col">
                        <label>Дата рождения</label>
                        <input type="date" className="form-control" placeholder="Юрьевна"
                        {...register("birthDate", creationOptions.birthDate)}/>
                        {errors.birthDate && <span className="form-error">{errors.birthDate.message}</span>}
                    </div>
                </div>
                <div className="form-row mt-4">
                <div className="col-md-3">
                        <label>Cерия</label>
                        <input type="text" className="form-control" placeholder="MC"
                        {...register("passportSeries", creationOptions.passportSeries)}/>
                        {errors.passportSeries && <span className="form-error">{errors.passportSeries.message}</span>}
                    </div>
                    <div className="col-md-3">
                        <label>№ паспорта</label>
                        <input type="text" className="form-control" placeholder="0000000"
                        {...register("passportNumber", creationOptions.passportNumber)}
                        onChange={event => {
                            const {value} = event.target
                            event.target.value = NormolizedPassportNumber(value)
                        }} />  
                        {errors.passportNumber && <span className="form-error">{errors.passportNumber.message}</span>}
                    </div>
                    <div className="col-md-6">
                        <label>Идент. номер</label>
                        <input type="text" className="form-control" placeholder="0000000АО00РB0" 
                        {...register("passportNumberId", creationOptions.passportNumberId)}
                        onChange={event => {
                            const {value} = event.target
                            event.target.value = NormolizedPassportNumberId(value)
                        }} />  
                        {errors.passportNumberId && <span className="form-error">{errors.passportNumberId.message}</span>}
                    </div>
                </div>
                <div className="form-row mt-4">
                <div className="col-md-9">
                        <label>Выдан</label>
                        <input type="text" className="form-control" placeholder="Минский РОВД" 
                        {...register("given", creationOptions.given)}/>
                        {errors.given && <span className="form-error">{errors.given.message}</span>}
                    </div>
                    <div className="col-md-3">
                        <label>Дата выдачи</label>
                        <input type="date" className="form-control"
                        {...register("givenDate", creationOptions.givenDate)}/>
                        {errors.givenDate && <span className="form-error">{errors.givenDate.message}</span>}
                    </div>
                </div>
                <div className="form-row mt-4">
                    <div className="col">
                            <label>Место рождения</label>
                            <input type="text" className="form-control" placeholder=""
                            {...register("birthPlace", creationOptions.birthPlace)}/>
                            {errors.birthPlace && <span className="form-error">{errors.birthPlace.message}</span>}
                    </div>
                </div>
                <div className="form-row mt-4">
                    <div className="col">
                            <label>Город проживания</label>
                            <select className="custom-select mr-sm-2"
                            {...register("city", creationOptions.city)}>
                                <option disabled selected value> -- Выберете город -- </option>
                                {cityState.map(city => <option key={city.id} value={city.id}>{city.city}</option>)}
                            </select>
                            {errors.city && <span className="form-error">{errors.city.message}</span>}
                    </div>
                </div>
                <div className="form-row mt-4">
                    <label>Адрес факт проживания</label>
                    <input type="text" className="form-control" placeholder="" 
                        {...register("address", creationOptions.address)} />  
                        {errors.city && <span className="form-error">{errors.city.message}</span>}
                </div>

                <div className="form-row mt-4">
                    <div className="col">
                        <label>Телефон домашний</label>
                        <input type="text" className="form-control"
                        {...register("homePhone", creationOptions.homePhone)}
                        defaultValue="8 () "
                        onChange={event => {
                            const {value} = event.target
                            event.target.value = PopulateHomePhone(value)}}/>  
                        {errors.homePhone && <span className="form-error">{errors.homePhone.message}</span>}
                    </div>
                    <div className="col">
                        <label>Телефон мобильный</label>
                        <input type="text" className="form-control"
                        defaultValue="+375 () "
                        {...register("mobilePhone", creationOptions.mobilePhone)}
                        onChange={event => {
                            const {value} = event.target
                            event.target.value = PopulateMobilePhone(value)}}/>  
                        {errors.mobilePhone && <span className="form-error">{errors.mobilePhone.message}</span>}
                    </div>
                    <div className="col">
                        <label>Email</label>
                        <input type="text" className="form-control" placeholder=""
                        {...register("email")} />  
                    </div>
                </div>
                <div className="form-row mt-4">
                <div className="col-md-7">
                        <label>Место работы</label>
                        <input type="text" className="form-control"
                        {...register("job")} />
                    </div>
                    <div className="col-md-5">
                        <label>Должность</label>
                        <input type="text" className="form-control"
                        {...register("position")}/>
                    </div>
                </div>
                <div className="form-row mt-4">
                    <label>Ежемесячный доход</label>
                    <input type="number" className="form-control" placeholder="0.00" min={0}
                    {...register("income")}/>  
                </div>
                <div className="form-row mt-4">
                        <label>Семейное положение</label>
                            <select  className="custom-select mr-sm-2"  {...register("status", creationOptions.status)}>
                                <option disabled selected value> -- Выберете семейное положение -- </option>
                                {familyState.map(family => <option key={family.id} value={family.id}>{family.status}</option>)}
                            </select>
                        {errors.status && <span className="form-error">{errors.status.message}</span>}

                </div>
                <div className="form-row mt-4">
                        <label>Гражданство</label>
                            <select className="custom-select mr-sm-2" {...register("citizenship", creationOptions.citizenship)}>
                                <option disabled selected value> -- Выберете гражданство -- </option>
                                {citizenshipState.map(citizenship => <option key={citizenship.id} value={citizenship.id}>{citizenship.citizenship}</option>)}

                            </select>
                        {errors.citizenship && <span className="form-error">{errors.citizenship.message}</span>}

                </div>
                <div className="form-row mt-4">
                        <label>Инвалидность</label>
                            <select className="custom-select mr-sm-2" {...register("disability", creationOptions.disability)}>
                                <option disabled selected value> -- Выберете необходимое -- </option>
                                {disabilityState.map(disability => <option key={disability.id} value={disability.id}>{disability.disability}</option>)}

                            </select>
                        {errors.disability && <span className="form-error">{errors.disability.message}</span>}

                </div>
                <div className="form-group mt-4">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" disabled={militaryState}  onClick={e => {
                                            setRetirementState(!retirementState)
                                            setMilitaryState(false)}}
                        {...register("retirement")}/>
                        <label className="form-check-label">
                            Пенсионер
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox"  onClick={e => {
                                            setMilitaryState(!militaryState)
                                            setRetirementState(false)}}
                                            disabled={retirementState}
                        {...register("military")}/>
                        <label className="form-check-label" >
                            Военнообязанный
                        </label>
                    </div>
                </div>
                <div className="align-right">
                <input className="btn btn-outline-primary" type="submit" value="Добавить" />
                </div>
          </form>
        )
    }