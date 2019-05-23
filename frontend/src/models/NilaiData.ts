import API from "./api";
import DataNilai from './item_model';
import DataUjian from './item_model';

/**
 * Data dari API (Backend di Server)
 */
interface JsonAPIDaftarNilai { 
    list_nilai: Array<DataNilai>;
    list_kelas: Array<string>;
    ujian: DataUjian;
}

/**
 * Mendapatkan DaftarNilaiUjian
 * dan Menampilkannya di View
 */
function initDaftarnilaiujian(idujian: string)
{
    return API<JsonAPIDaftarNilai>('/api/daftarnilai/' + idujian);
}

export { initDaftarnilaiujian };
