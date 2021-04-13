import React from 'react';


const Table = (props) => {

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
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.lastName}</td>
                        <td>{item.firstName}</td>
                        <td>{item.surname}</td>
                        <td>{item.birthDate}</td>
                        <td>{item.passport.passportSeries}</td>
                        <td>{item.passport.passportNumber}</td>
                        <td>{item.passport.given}</td>
                        <td>{item.passport.givenDate}</td>
                        <td>{item.passport.passportNumberId}</td>
                        <td>{item.birthPlace}</td>
                        <td>{item.city.city}</td>
                        <td>{item.address}</td>
                        <td>{item.homePhone}</td>
                        <td>{item.mobilePhone}</td>
                        <td>{item.email}</td>
                        <td>{item.job}</td>
                        <td>{item.position}</td>
                        <td>{item.status.status}</td>
                        <td>{item.citizenship.citizenship}</td>
                        <td>{item.disability.disability}</td>
                        <td>{item.income}</td>
                        <td>{item.retirement}</td>
                        <td>{item.military}</td>
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