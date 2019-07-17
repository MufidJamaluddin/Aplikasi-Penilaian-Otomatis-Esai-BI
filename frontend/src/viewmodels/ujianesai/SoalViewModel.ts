import API from "../../models/api";
import DataSoal from '../../models';
import { isNullOrUndefined } from "util";

/**
 * Data dari API (Backend di Server)
 */
interface JsonAPISoal { data: DataSoal; }
interface JsonAPIListSoal { list: Array<DataSoal>; }

/**
 * Kelas untuk menngelola data Soal
 */
export class SoalViewModel
{
    /**
     * Mendapatkan Data Soal
     * dan Menampilkannya di View
     */
    initDataSoal(idujian: string)
    {
        return API<JsonAPIListSoal>('/api/soalujian/' + idujian)
        .then(value => {
            return value.list;
        })
    }

    /**
     * fix Mengubah Data Soal
     * @param idsoal ID Soal
     * @param data Data Soal Ujian Sekolah
     */
    updateDataSoal(idsoal:string, data:Partial<DataSoal>)
    {
        return API<JsonAPISoal>('/api/soal/' + idsoal, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(value => {
            return value.data;
        });
    }

}