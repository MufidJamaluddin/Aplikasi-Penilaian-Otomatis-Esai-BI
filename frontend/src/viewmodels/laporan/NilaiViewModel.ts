import API from "../../models/api";
import DaftarSkorUjian from '../../models';
import { isNullOrUndefined } from "util";

import fetchDownload from 'fetch-download';

/**
 * Kelas untuk menngelola data Nilai
 */
export class NilaiViewModel
{
    /**
     * Mendapatkan NilaiUjian
     * dan Menampilkannya di View
     */
    initNilaiujian(idujian: string, idkelas: string)
    {
        return API<DaftarSkorUjian>(`/api/nilaiujian/${idujian}/${idkelas}`);
    }

    downloadNilaiujian(idujian: string, idkelas: string)
    {
        fetchDownload(`/download/nilaiujian/${idujian}/${idkelas}`).catch(err => {
            console.log(err);
        });
    }
}