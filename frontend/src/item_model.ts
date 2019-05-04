export default interface DataKelas { idkelas:string; namaKelas:string; }

export default interface DataMatapelajaran 
{ 
    idmapel?: string; 
    namaMapel: string; 
    KKM: string; 
}

export default interface DataGuru 
{
    idguru?: string;
    nip?: string;
    nuptk?: string;
    namaGuru: string;
    namaMapel: string;
    namaKelas: string;
    username?: string;
    password?: string;
}

export default interface DataSiswa
{
    nis: string;
    namaSiswa: string;
    namaKelas: string;
    password?: string;
}

export default interface DataUjian
{
    idujian?: string;
    namaUjian: string;
    namaMapel: string;
    listKelas: Array<DataKelas>;
    jumlahSoal: number;
    durasi: number;
}

export default interface DataSoal
{
    idujian?: string;
    idsoal?: string;
    soalEsai: string;
    skorMin: string;
    skorMax: string;
    kompetensiDasar?: string;
    materiPokok?: string;
}

export default interface DataPelaksanaanUjian
{
    nis: string;
    idujian?: string;
    idsoal?: string;
    jawabanSiswa?: string;
}