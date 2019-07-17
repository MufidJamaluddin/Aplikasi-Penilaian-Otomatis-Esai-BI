import API from "../../models/api";
import DataUjian from '../../models';
import { isNullOrUndefined } from "util";

/**
 * Data dari API (Backend di Server)
 */
interface JsonAPIPelaksanaan { data: DataUjian; }

/**
 * Kelas untuk menngelola data Pelaksanaan
 */
export class PelaksanaanViewModel
{
    /**
     * Mendapatkan Data Ujian Ujian
     * dan Menampilkannya di View
     */
    initDataPelaksanaan(idujian: string)
    {
        return API<JsonAPIPelaksanaan>('/api/pelaksanaan/' + idujian)
        .then(value => {
            return value.data;
        });
    }

    /**
     * Menginputkan Data Ujian
     * @param data Data Ujian Sekolah
     */
    mulaiUjian(idujian: string, idkelas:string)
    {
        return API<JsonAPIPelaksanaan>('/api/pelaksanaan/' + idujian + '/' + idkelas, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{}'
        })
        .then(value => {
            return value.data;
        })
    }

}