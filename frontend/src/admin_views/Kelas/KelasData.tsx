import API from "../../ApiResource";
import DataKelas from '../../item_model';

/**
 * Data dari API (Backend di Server)
 */
interface JsonAPIKelas { list: Array<DataKelas>; }

/**
 * Mendapatkan Data Kelas
 * dan Menampilkannya di View
 */
function initDatakelas()
{
    return API<JsonAPIKelas>('/api/kelas')
    .then(value => {
        // Ambil list 
        console.log(value.list);
        return value.list;
    });
}

/**
 * Menginputkan Data Kelas
 * @param data Data Kelas Sekolah
 */
function inputDatakelas(data:any)
{
    console.log(JSON.stringify(data));

    return API<JsonAPIKelas>('/api/kelas', { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(value => {
        // Ambil list 
        console.log(value.list);
        return value.list;
    });
}

/**
 * Mengubah Data Kelas
 * @param data Data Kelas Sekolah
 */
function updateKelas(idkelas:string, data:any)
{
    console.log(JSON.stringify(data));

    return API<JsonAPIKelas>('/api/kelas/'+idkelas, { 
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(value => {
        // Ambil list 
        console.log(value.list);
        return value.list;
    });
}

/**
 * Menghapus Data Kelas
 * @param data Data Kelas Sekolah
 */
function hapusKelas(idkelas:string)
{
    return API<JsonAPIKelas>('/api/kelas/'+idkelas, { 
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: "{}"
    })
    .then(value => {
        // Ambil list 
        console.log(value.list);
        return value.list;
    });
}

export { initDatakelas, inputDatakelas, updateKelas, hapusKelas }