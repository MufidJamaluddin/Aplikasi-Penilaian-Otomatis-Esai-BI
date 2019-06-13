import API from "./api";
import DataJawabanSoal from './item_model';

interface JawabanResult { list: DataJawabanSoal }

function initDataJawaban(idujian: any, idkelas: any)
{
    return API<JawabanResult>('api/penilaianmanual/' + idujian + '/' + idkelas)
    .then(value => {
        // Ambil list 
        //console.log(value.list);
        return value.list;
    });
}

function nilaiManual(data: any)
{

}

function nilaiOtomatis(idujian: string|number)
{

}

export {
    initDataJawaban,
    nilaiManual, 
    nilaiOtomatis
}