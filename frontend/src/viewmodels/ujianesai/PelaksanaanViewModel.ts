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
    static __instance?: PelaksanaanViewModel;

    static getInstance() : PelaksanaanViewModel
    {
        if(isNullOrUndefined(this.__instance))
            this.__instance = new PelaksanaanViewModel();

        return this.__instance
    }

    /**
     * Mendapatkan Data Ujian Ujian
     * dan Menampilkannya di View
     */
    async initDataPelaksanaan(idujian: string)
    {
        const value = await API<JsonAPIPelaksanaan>('/api/pelaksanaan/' + idujian);
        // Ambil list 
        console.log(value.data);
        return value.data;
    }

    /**
     * Menginputkan Data Ujian
     * @param data Data Ujian Sekolah
     */
    async mulaiUjian(idujian: string, idkelas:string)
    {
        console.log(idkelas);

        const value = await API<JsonAPIPelaksanaan>('/api/pelaksanaan/' + idujian + '/' + idkelas, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{}'
        });
        // Ambil ID Ujian
        console.log(value.data);
        return value.data;
    }

}