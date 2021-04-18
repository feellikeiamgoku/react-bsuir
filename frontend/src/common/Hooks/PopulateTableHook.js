import {useEffect, useState} from 'react';
import Swal from 'sweetalert2';


const PopulateTable = (endpoint, setIsLoading) => {
    const baseUrl = "http://127.0.0.1:8000/api/"

    const [tableData, setData] = useState([]);

    useEffect(() => {
        async function fetchData () {
            const response = await fetch(baseUrl + endpoint);
            if (response.ok) {
                const data = await response.json();
                setData(data);
                setIsLoading(false);
            }
        }
        fetchData();
    },[])

    const deleteRow = async (id, index) => {

        Swal.fire({
            title: `Удалить запись № ${id}?`,
            text: "У вас не будет возможности отменить это действие.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Да, удалить',
            cancelButtonText: 'Отменить'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const isDeleted = await deleteInDB(id)
                if (isDeleted) {
                    Swal.fire('Удалено!', `Запись № ${id} удалёна.`, 'success')
                    await setData(tableData => tableData.splice(index, 1));
                } else {
                    Swal.fire('Ошибка!', `Клиент № ${id}  не удалён.`, 'error')
                }
            }
        })
    }

    const deleteInDB = async (id) => {
        const response = await fetch(`${baseUrl}${endpoint}/${id}/`, { method: 'DELETE' });
        if (!response.ok) {
            return false;
        } else {
            return true;
        }
    }
    
    return {tableData, deleteRow};
}


export default PopulateTable;
