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
    static __instance?: UjianViewModel;

    static getInstance() : UjianViewModel
    {
        if(isNullOrUndefined(this.__instance))
            this.__instance = new UjianViewModel();

        return this.__instance
    }

    /**
     * Mendapatkan Data Ujian Ujian
     * dan Menampilkannya di View
     */
    async initDataUjian()
    {
        const value = await API<JsonAPIUjian>('/api/ujianesai');
        // Ambil list 
        console.log(value.list);
        return value.list;
    }

    /**
     * Mendapatkan Data Ujian 
     */
    async getDataUjian(idujian:string)
    {
        const value = await API<JsonAPIResponseDataUjian>('/api/ujianesai/' + idujian);
        // Ambil list 
        console.log(value.data);
        return value.data;
    }

    /**
     * Mendapatkan Data Pengampu
     * dan Menampilkannya di View
     */
    async initDataPengampu()
    {
        const value = await API<JsonAPIPengampu>('/api/pengampu');
        // Ambil list 
        console.log(value.list);
        return value.list;
    }

    /**
     * Menginputkan Data Ujian
     * @param data Data Ujian Sekolah
     */
    async inputDataUjian(data:Partial<DataUjian>)
    {
        console.log(JSON.stringify(data));

        const value = await API<JsonAPIResponseTambahUjian>('/api/ujianesai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        // Ambil ID Ujian
        console.log(value.idujian);
        return value.idujian;
    }

    /**
     * Mengubah Data Ujian
     * @param data Data Ujian Sekolah
     */
    async updateDataUjian(idujian:string, data:Partial<DataUjian>)
    {
        console.log(JSON.stringify(data));

        const value = await API<JsonAPIUjian>('/api/ujianesai/' + idujian, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        // Ambil list 
        console.log(value.list);
        return value.list;
    }

    /**
     * Menghapus Data Ujian
     * @param data Data Ujian Sekolah
     */
    async hapusDataUjian(idujian:string)
    {
        const value = await API<JsonAPIUjian>('/api/ujianesai/' + idujian, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: "{}"
        });
        // Ambil list 
        console.log(value.list);
        return value.list;
    }

}