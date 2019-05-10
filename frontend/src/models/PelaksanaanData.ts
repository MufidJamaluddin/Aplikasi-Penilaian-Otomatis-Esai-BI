import API from "./api";
import DataUjian from './item_model';

/**
 * Data dari API (Backend di Server)
 */
interface JsonAPIPelaksanaan { data: DataUjian; }

/**
 * Mendapatkan Data Ujian Ujian
 * dan Menampilkannya di View
 */
function initDataPelaksanaan(idujian: string)
{
    return API<JsonAPIPelaksanaan>('/api/pelaksanaan/'+idujian)
    .then(value => {
        // Ambil list 
        console.log(value.data);
        return value.data;
    });
}

/**
 * Menginputkan Data Ujian
 * @param data Data Ujian Sekolah
 */
function mulaiUjian(idujian: string, idkelas:string)
{
    console.log(idkelas);

    return API<JsonAPIPelaksanaan>('/api/pelaksanaan/'+idujian+'/'+idkelas, { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: '{}'
    })
    .then(value => {
        // Ambil ID Ujian
        console.log(value.data);
        return value.data;
    });
}

export { initDataPelaksanaan, mulaiUjian }