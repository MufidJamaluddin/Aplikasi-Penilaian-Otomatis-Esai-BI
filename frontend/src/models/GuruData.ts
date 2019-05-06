import API from "./api";
import DataGuru from './item_model';

/**
 * Data dari API (Backend di Server)
 */
interface JsonAPIGuru { list: Array<DataGuru>; }

/**
 * Mendapatkan Data Guru
 * dan Menampilkannya di View
 */
function initDataGuru()
{
    return API<JsonAPIGuru>('/api/guru')
    .then(value => {
        // Ambil list 
        console.log(value.list);
        return value.list;
    });
}

/**
 * Menginputkan Data Guru
 * @param data Data Guru Sekolah
 */
function inputDataGuru(data:DataGuru)
{
    console.log(JSON.stringify(data));

    return API<JsonAPIGuru>('/api/guru', { 
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
 * Mengubah Data Guru
 * @param data Data Guru Sekolah
 */
function updateDataGuru(idguru:string, data:any)
{
    console.log(JSON.stringify(data));

    return API<JsonAPIGuru>('/api/guru/' + idguru, { 
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
 * Menghapus Data Guru
 * @param data Data Guru Sekolah
 */
function hapusDataGuru(idguru:string)
{
    return API<JsonAPIGuru>('/api/guru/'+ idguru, { 
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

export { initDataGuru, inputDataGuru, updateDataGuru, hapusDataGuru }