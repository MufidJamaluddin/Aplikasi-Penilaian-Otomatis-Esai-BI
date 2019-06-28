import API from "./api";
import DaftarSkorUjian from './item_model';

/**
 * Mendapatkan DaftarNilaiUjian
 * dan Menampilkannya di View
 */
function initNilaiujian(idujian: string, idkelas: string)
{
    return API<DaftarSkorUjian>(`/api/nilaiujian/${idujian}/${idkelas}`);
}

export { initNilaiujian };