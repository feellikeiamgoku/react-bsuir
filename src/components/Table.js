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
                </tr>
            </thead>
            <tbody>
                { props.data.map((item, index) =>(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
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