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
    static __instance?: SoalViewModel;

    static getInstance() : SoalViewModel
    {
        if(isNullOrUndefined(this.__instance))
            this.__instance = new SoalViewModel();

        return this.__instance
    }

    /**
     * Mendapatkan Data Soal
     * dan Menampilkannya di View
     */
    async initDataSoal(idujian: string)
    {
        const value = await API<JsonAPIListSoal>('/api/soalujian/' + idujian);
        console.log(value.list);
        return value.list;
    }

    /**
     * fix Mengubah Data Soal
     * @param idsoal ID Soal
     * @param data Data Soal Ujian Sekolah
     */
    async updateDataSoal(idsoal:string, data:Partial<DataSoal>)
    {
        console.log(JSON.stringify(data));

        const value = await API<JsonAPISoal>('/api/soal/' + idsoal, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return value.data;
    }

}