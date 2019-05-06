import API from "./api";
import DataMatapelajaran from './item_model';

/**
 * Data dari API (Backend di Server)
 */
interface JsonAPIMatapelajaran { list: Array<DataMatapelajaran>; }

/**
 * Mendapatkan Data Mata Pelajaran
 * dan Menampilkannya di View
 */
function initDatamatapelajaran()
{
    return API<JsonAPIMatapelajaran>('/api/matapelajaran')
    .then(value => {
        // Ambil list 
        console.log(value.list);
        return value.list;
    });
}

/**
 * Menginputkan Data Mata Pelajaran
 * @param data Data Mata Pelajaran Sekolah
 */
function inputDatamatapelajaran(data:any)
{
    console.log(JSON.stringify(data));

    return API<JsonAPIMatapelajaran>('/api/matapelajaran', { 
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
 * Mengubah Data Mata Pelajaran
 * @param data Data Mata Pelajaran Sekolah
 */
function updateMatapelajaran(idmapel:string, data:any)
{
    console.log(JSON.stringify(data));

    return API<JsonAPIMatapelajaran>('/api/matapelajaran/'+idmapel, { 
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
 * Menghapus Data Mata Pelajaran
 * @param data Data Mata Pelajaran Sekolah
 */
function hapusMatapelajaran(idmapel:string)
{
    return API<JsonAPIMatapelajaran>('/api/matapelajaran/'+idmapel, { 
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

export { initDatamatapelajaran, inputDatamatapelajaran, updateMatapelajaran, hapusMatapelajaran }