import React from 'react';
import { useHistory } from "react-router-dom";


const Table = (props) => {
    const history = useHistory();

    return (
        <div className="table-responsive shadow p-3 mb-5 bg-white rounded">
        <table className="table-style table table-hover table-bordered">
            <thead className="">
                <tr>
                    { props.columns.map((columnName, index) => (
                        <th key={index}>{columnName}</th>
                    )) }
                    <th key="delete">Удалить</th>
                </tr>
            </thead>
            <tbody>
                { props.data.map((item, index) =>(
                    <tr key={item.id} onDoubleClick={() => history.push(`/update_client/${item.id}`)}>
                        <td>{item.id}</td>
                        <td>{item.lastName}</td>
                        <td>{item.firstName}</td>
                        <td>{item.surname}</td>
                        <td>{item.birthDate}</td>
                        <td>{item.passportSeries}</td>
                        <td>{item.passportNumber}</td>
                        <td>{item.given}</td>
                        <td>{item.givenDate}</td>
                        <td>{item.passportNumberId}</td>
                        <td>{item.birthPlace}</td>
                        <td>{item.city.city}</td>
                        <td>{item.address}</td>
                        <td>{item.homePhone ? item.homePhone : "-"}</td>
                        <td>{item.mobilePhone ? item.mobilePhone : "-"}</td>
                        <td>{item.email ? item.email: "-"}</td>
                        <td>{item.job ? item.job : "-"}</td>
                        <td>{item.position ? item.position : "-"}</td>
                        <td>{item.status.status}</td>
                        <td>{item.citizenship.citizenship}</td>
                        <td>{item.disability.disability}</td>
                        <td>{item.income > 0 ? item.income : "-"}</td>
                        <td>{item.retirement ? "Да" : "Нет"}</td>
                        <td>{item.military ? "Да" : "Нет"}</td>
                        <td>
                            <button className="btn btn-outline-danger" onClick= {() => props.deleteRow(item.id , index)}>Удалить</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}

export default Table;