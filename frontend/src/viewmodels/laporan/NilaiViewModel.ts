import API from "../../models/api";
import DaftarSkorUjian from '../../models';
import { isNullOrUndefined } from "util";

/**
 * Kelas untuk menngelola data Nilai
 */
export class NilaiViewModel
{
    static __instance?: NilaiViewModel;

    static getInstance() : NilaiViewModel
    {
        if(isNullOrUndefined(this.__instance))
            this.__instance = new NilaiViewModel();

        return this.__instance
    }

    /**
     * Mendapatkan NilaiUjian
     * dan Menampilkannya di View
     */
    initNilaiujian(idujian: string, idkelas: string)
    {
        return API<DaftarSkorUjian>(`/api/nilaiujian/${idujian}/${idkelas}`);
    }

}