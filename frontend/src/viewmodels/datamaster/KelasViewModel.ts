import API from "../../models/api";
import DataKelas from '../../models';
import { isNullOrUndefined } from "util";

/**
 * Data dari API (Backend di Server)
 */
interface JsonAPIKelas { list: Array<DataKelas>; }

/**
 * Kelas untuk mendapatkan data guru
 */
export class KelasViewModel
{
    static __instance?: KelasViewModel;

    static getInstance() : KelasViewModel
    {
        if(isNullOrUndefined(this.__instance))
            this.__instance = new KelasViewModel();

        return this.__instance
    }

    /**
     * Mendapatkan Data Kelas
     * dan Menampilkannya di View
     */
    async initDatakelas()
    {
        const value = await API<JsonAPIKelas>('/api/kelas');
        // Ambil list 
        console.log(value.list);
        return value.list;
    }

    /**
     * Menginputkan Data Kelas
     * @param data Data Kelas Sekolah
     */
    async inputDatakelas(data:any)
    {
        console.log(JSON.stringify(data));

        const value = await API<JsonAPIKelas>('/api/kelas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        // Ambil list 
        console.log(value.list);
        return value.list;
    }

    /**
     * Mengubah Data Kelas
     * @param data Data Kelas Sekolah
     */
    async updateKelas(idkelas:string, data:any)
    {
        console.log(JSON.stringify(data));

        const value = await API<JsonAPIKelas>('/api/kelas/' + idkelas, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        // Ambil list 
        console.log(value.list);
        return value.list;
    }

    /**
     * Menghapus Data Kelas
     * @param data Data Kelas Sekolah
     */
    async hapusKelas(idkelas:string)
    {
        const value = await API<JsonAPIKelas>('/api/kelas/' + idkelas, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: "{}"
        });
        // Ambil list 
        console.log(value.list);
        return value.list;
    }

}