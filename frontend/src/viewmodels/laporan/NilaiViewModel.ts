import API from "../../models/api";
import DaftarSkorUjian from '../../models';
import { isNullOrUndefined } from "util";

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

}