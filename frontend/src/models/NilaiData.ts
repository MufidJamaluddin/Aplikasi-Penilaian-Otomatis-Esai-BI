import API from "./api";
import DataNilai from './item_model';

/**
 * Data dari API (Backend di Server)
 */
interface JsonAPIDaftarNilai { list: Array<DataNilai>; }

/**
 * Mendapatkan DaftarNilaiUjian
 * dan Menampilkannya di View
 */
function initDaftarnilaiujian()
{
    return API<JsonAPIDaftarNilai>('/api/matapelajaran')
    .then(value => {
        // Ambil list 
        console.log(value.list);
        return value.list;
    });
}





export { initDaftarnilaiujian}