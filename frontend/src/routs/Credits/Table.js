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
                    <tr key={item.id} onDoubleClick={() => history.push(`/update_credit/${item.id}`)}>
                        <td>{item.id}</td>
                        <td>{item.creditType.creditType}</td>
                        <td>{item.currency.currency}</td>
                        <td>{item.contractNumber}</td>
                        <td>{item.startDate}</td>
                        <td>{item.endDate}</td>
                        <td>{item.period}</td>
                        <td>{item.cash}</td>
                        <td>{item.percent}</td>
                        <td>{item.client}</td>
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