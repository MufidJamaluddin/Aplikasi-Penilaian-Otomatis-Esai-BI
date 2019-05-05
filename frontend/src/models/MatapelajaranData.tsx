import API from "./api";
import DataMatapelajaran from './item_model';

/**
 * Data dari API (Backend di Server)
 */
interface JsonAPIMatapelajaran { list: Array<DataMatapelajaran>; }

/**
 * Mendapatkan Data Matapelajaran
 * dan Menampilkannya di View
 */
function initDataMatapelajaran()
{
    return API<JsonAPIMatapelajaran>('/api/matapelajaran')
    .then(value => {
        // Ambil list 
        console.log(value.list);
        return value.list;
    });
}

export { initDataMatapelajaran }