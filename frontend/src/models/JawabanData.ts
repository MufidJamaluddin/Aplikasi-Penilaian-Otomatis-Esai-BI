import API from "./api";
import DataJawabanSoal from './item_model';

interface JsonAPIJawaban{ idjawaban:string; }
interface JsonAPIDataJawaban { data: DataJawabanSoal; }

/**
 * Mendapatkan Data Jawaban
 * @param data Data Jawaban
 */
function initDataJawaban(idsoal:string)
{
    return API<JsonAPIDataJawaban>('/api/jawaban/'+ idsoal).then(value => {
        console.log(value);
        return value.data;
    });
}

/**
 * Menginputkan Data Jawaban
 * @param data Data Jawaban
 */
function inputDataJawaban(data:any)
{
    console.log(JSON.stringify(data));

    return API<JsonAPIJawaban>('/api/jawaban', { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(value => {
        console.log(value.idjawaban);
        return value.idjawaban;
    });
}

/**
 * 
 * @param idjawaban 
 * @param data 
 */
function updateDataJawaban(idjawaban: string, data:any)
{
    console.log(JSON.stringify(data));

    return API<JsonAPIJawaban>('/api/jawaban/'+ idjawaban,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
}

export {initDataJawaban, inputDataJawaban, updateDataJawaban }