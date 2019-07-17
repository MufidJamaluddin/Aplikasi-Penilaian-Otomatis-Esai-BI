import API from "../../models/api";
import DataUjian from '../../models';
import DataPengampu from '../../models';
import { isNullOrUndefined } from "util";

/**
 * Data dari API (Backend di Server)
 */
interface JsonAPIUjian { list: Array<DataUjian>; }
interface JsonAPIResponseDataUjian { data: DataUjian; }
interface JsonAPIResponseTambahUjian { idujian: string; }
interface JsonAPIPengampu { list: Array<DataPengampu>; }

/**
 * Kelas untuk menngelola data Ujian
 */
export class UjianViewModel
{
    /**
     * Mendapatkan Data Ujian Ujian
     * dan Menampilkannya di View
     */
    initDataUjian()
    {
       return API<JsonAPIUjian>('/api/ujianesai')
       .then(value => {
            // Ambil list 
            console.log(value.list);
            return value.list;
       })
    }

    /**
     * Mendapatkan Data Ujian 
     */
    getDataUjian(idujian:string)
    {
        return API<JsonAPIResponseDataUjian>('/api/ujianesai/' + idujian)
        .then(value => {
            // Ambil list 
            console.log(value.data);
            return value.data;
        })
    }

    /**
     * Mendapatkan Data Pengampu
     * dan Menampilkannya di View
     */
    initDataPengampu()
    {
        return API<JsonAPIPengampu>('/api/pengampu')
        .then(value => {
            // Ambil list 
            console.log(value.list);
            return value.list;
        })
    }

    /**
     * Menginputkan Data Ujian
     * @param data Data Ujian Sekolah
     */
    inputDataUjian(data:Partial<DataUjian>)
    {
        console.log(JSON.stringify(data));

        return API<JsonAPIResponseTambahUjian>('/api/ujianesai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(value => {
            // Ambil ID Ujian
            console.log(value.idujian);
            return value.idujian;
        })
    }

    /**
     * Mengubah Data Ujian
     * @param data Data Ujian Sekolah
     */
    updateDataUjian(idujian:string, data:Partial<DataUjian>)
    {
        console.log(JSON.stringify(data))

        return  API<JsonAPIUjian>('/api/ujianesai/' + idujian, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(value => {
            // Ambil list 
            console.log(value.list);
            return value.list;
        })
    }

    /**
     * Menghapus Data Ujian
     * @param data Data Ujian Sekolah
     */
    hapusDataUjian(idujian:string)
    {
        return API<JsonAPIUjian>('/api/ujianesai/' + idujian, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: "{}"
        })
        .then(value => {
            // Ambil list 
            console.log(value.list);
            return value.list;
        })
    }

}