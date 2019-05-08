import API from "./api";
import DataUjian from './item_model';

/**
 * Data dari API (Backend di Server)
 */
interface JsonAPIUjian { list: Array<DataUjian>; }

/**
 * Mendapatkan Data Ujian Ujian
 * dan Menampilkannya di View
 */
function initDataUjian()
{
    return API<JsonAPIUjian>('/api/ujianesai')
    .then(value => {
        // Ambil list 
        console.log(value.list);
        return value.list;
    });
}

/**
 * Menginputkan Data Ujian
 * @param data Data Ujian Sekolah
 */
function inputDataUjian(data:Partial<DataUjian>)
{
    console.log(JSON.stringify(data));

    return API<JsonAPIUjian>('/api/ujianesai', { 
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
 * Mengubah Data Ujian
 * @param data Data Ujian Sekolah
 */
function updateDataUjian(idujian:string, data:Partial<DataUjian>)
{
    console.log(JSON.stringify(data));

    return API<JsonAPIUjian>('/api/ujianesai/' + idujian, { 
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
 * Menghapus Data Ujian
 * @param data Data Ujian Sekolah
 */
function hapusDataUjian(idujian:string)
{
    return API<JsonAPIUjian>('/api/ujianesai/'+ idujian, { 
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

export { initDataUjian, inputDataUjian, updateDataUjian, hapusDataUjian }