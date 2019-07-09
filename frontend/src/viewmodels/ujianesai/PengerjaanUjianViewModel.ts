import API from "../../models/api";
import DataUjian from '../../models';
import DataPelaksanaanUjian from '../../models';
import DataSoal from "../../models";
import { isNullOrUndefined } from "util";

/**
 * Data dari API (Backend di Server)
 */
interface JsonAPIPengerjaan { 
    data_ujian: DataUjian; 
    data_pelaksanaan: DataPelaksanaanUjian; 
    list_soal: Array<DataSoal>;
}

/**
 * Kelas untuk menngelola data Pengerjaan
 */
export class PengerjaanUjianViewModel
{
    static __instance?: PengerjaanUjianViewModel;

    static getInstance() : PengerjaanUjianViewModel
    {
        if(isNullOrUndefined(this.__instance))
            this.__instance = new PengerjaanUjianViewModel();

        return this.__instance
    }

    /**
     * Mendapatkan Data Ujian Ujian
     * dan Menampilkannya di View
     */
    initDataPengerjaan()
    {
        return API<JsonAPIPengerjaan>('/api/pengerjaanujian');
    }

}