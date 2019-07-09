import API from "../../models/api";
import DataSiswa from '../../models';
import { isNullOrUndefined } from "util";

/**
 * Data dari API (Backend di Server)
 */
interface JsonAPIPanelSiswa { data:DataSiswa; }

/**
 * Kelas untuk menngelola data PanelSiswa
 */
export class PanelSiswaViewModel
{
    static __instance?: PanelSiswaViewModel;

    static getInstance() : PanelSiswaViewModel
    {
        if(isNullOrUndefined(this.__instance))
            this.__instance = new PanelSiswaViewModel();

        return this.__instance
    }


    /**
     * Mendapatkan Data Siswa Saat Ini
     * dan Menampilkannya di View
     */
    initPanelSiswa()
    {
        return API<JsonAPIPanelSiswa>('/api/panelsiswa')
        .then(value => {
            // Ambil Data 
            console.log(value.data);
            return value.data;
        });
    }

}