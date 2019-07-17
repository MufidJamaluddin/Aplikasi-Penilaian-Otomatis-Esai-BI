import API from "../../models/api";
import DaftarNilaiUjian from '../../models';

import fetchDownload from 'fetch-download';
import { isNullOrUndefined } from "util";

/**
 * Kelas untuk menngelola data DaftarNilai
 */
export class DaftarNilaiViewModel
{
    /**
     * Mendapatkan DaftarNilaiUjian
     * dan Menampilkannya di View
     */
    initDaftarnilaiujian(idmapel: string, idkelas: string)
    {
        console.log({idmapel: idmapel, idkelas: idkelas});

        return API<DaftarNilaiUjian>('/api/daftarnilai', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({idmapel: idmapel, idkelas: idkelas})
        });
    }

    downloadDaftarnilaiujian(idmapel: string, idkelas: string)
    {
        fetchDownload(`/download/daftarnilai/${idmapel}/${idkelas}`).catch(err => {
            console.log(err);
        });
    }
}