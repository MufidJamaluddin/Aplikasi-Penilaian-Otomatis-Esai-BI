import API from "./api";
import DataJawabanSoal from './item_model';

interface JawabanResult { list: Array<DataJawabanSoal> }

function initDataJawaban(idujian: string, idkelas: string, idsoal: string)
{
    return API<JawabanResult>('/api/penilaianmanual/'+idujian+'/'+idkelas+'/'+idsoal)
    .then(value => {
        // Ambil list 
        return value.list;
    });
}

function nilaiManual(idjawaban: string, skorAngka: string)
{
    return API<{}>('/api/penilaianmanual', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({idjawaban: idjawaban, skorAngka: skorAngka})
    });
}

function akhiriPenilaianManual(idujian: string, idkelas: string)
{
    return API<{}>('/api/penilaianmanual/'+idujian+'/'+idkelas, {
        method: 'POST'
    });
}

function nilaiOtomatis(idujian: string|number)
{
    return API<{}>('/api/penilaianotomatis/'+idujian, {
        method: 'POST'
    });
}

export {
    initDataJawaban,
    nilaiManual, 
    akhiriPenilaianManual,
    nilaiOtomatis
}