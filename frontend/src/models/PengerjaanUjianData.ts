import API from "./api";
import DataUjian from './item_model';
import DataPelaksanaanUjian from './item_model';
import DataSoal from "./item_model";

/**
 * Data dari API (Backend di Server)
 */
interface JsonAPIPengerjaan { 
    data_ujian: DataUjian; 
    data_pelaksanaan: DataPelaksanaanUjian; 
    list_soal: Array<DataSoal>;
}

/**
 * Mendapatkan Data Ujian Ujian
 * dan Menampilkannya di View
 */
function initDataPengerjaan()
{
    return API<JsonAPIPengerjaan>('/api/pelaksanaan/');
}

export { initDataPengerjaan }