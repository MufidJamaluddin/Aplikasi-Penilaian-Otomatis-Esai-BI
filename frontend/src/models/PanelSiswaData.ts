import API from "./api";
import DataSiswa from './item_model';

/**
 * Data dari API (Backend di Server)
 */
interface JsonAPIPanelSiswa { data:DataSiswa; }

/**
 * Mendapatkan Data Siswa Saat Ini
 * dan Menampilkannya di View
 */
function initPanelSiswa()
{
    return API<JsonAPIPanelSiswa>('/api/panelsiswa')
    .then(value => {
        // Ambil Data 
        console.log(value.data);
        return value.data;
    });
}

export { initPanelSiswa }