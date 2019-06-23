import API from "./api";
import DaftarNilaiUjian from './item_model';

import fetchDownload from 'fetch-download';

/**
 * Mendapatkan DaftarNilaiUjian
 * dan Menampilkannya di View
 */
function initDaftarnilaiujian(idmapel: string, idkelas: string)
{
    console.log({idmapel: idmapel, idkelas: idkelas});

    return API<DaftarNilaiUjian>('/api/daftarnilai', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({idmapel: idmapel, idkelas: idkelas})
    });
}

function downloadDaftarnilaiujian(idmapel: string, idkelas: string)
{
    fetchDownload(`/download/daftarnilai/${idmapel}/${idkelas}`).catch(err => {
        console.log(err);
    });
}

export { initDaftarnilaiujian, downloadDaftarnilaiujian };