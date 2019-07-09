import API from "../../models/api";
import DataJawabanSoal from '../../models';
import { isNullOrUndefined } from "util";

interface JawabanResult { list: Array<DataJawabanSoal> }

/**
 * Kelas untuk menngelola data Penilaian
 */
export class PenilaianViewModel
{
    static __instance?: PenilaianViewModel;

    static getInstance() : PenilaianViewModel
    {
        if(isNullOrUndefined(this.__instance))
            this.__instance = new PenilaianViewModel();

        return this.__instance
    }

    async initDataJawaban(idujian: string, idkelas: string, idsoal: string)
    {
        const value = await API<JawabanResult>('/api/penilaianmanual/' + idujian + '/' + idkelas + '/' + idsoal);
        // Ambil list 
        return value.list;
    }

    nilaiManual(idjawaban: string, skorAngka: string)
    {
        return API<{}>('/api/penilaianmanual', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({idjawaban: idjawaban, skorAngka: skorAngka})
        });
    }

    akhiriPenilaianManual(idujian: string, idkelas: string)
    {
        return API<{}>('/api/penilaianmanual/'+idujian+'/'+idkelas, {
            method: 'POST'
        });
    }

    nilaiOtomatis(idujian: string|number)
    {
        return API<{}>('/api/penilaianotomatis/'+idujian, {
            method: 'POST'
        });
    }

}