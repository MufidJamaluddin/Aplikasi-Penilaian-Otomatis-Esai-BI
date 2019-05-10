import API from "./api";
import DataSoal from './item_model';

/**
 * Data dari API (Backend di Server)
 */
interface JsonAPISoal { data: DataSoal; }
interface JsonAPIListSoal { list: Array<DataSoal>; }

/**
 * Mendapatkan Data Soal
 * dan Menampilkannya di View
 */
function initDataSoal(idujian: string)
{
    return API<JsonAPIListSoal>('/api/soalujian/' + idujian).then(value => { 
        console.log(value.list);
        return value.list 
    });
}

/**
 * fix Mengubah Data Soal
 * @param idsoal ID Soal
 * @param data Data Soal Ujian Sekolah
 */
function updateDataSoal(idsoal:string, data:Partial<DataSoal>)
{
    console.log(JSON.stringify(data));

    return API<JsonAPISoal>('/api/soal/' + idsoal, { 
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(value => { return value.data });
}

export { initDataSoal, updateDataSoal }