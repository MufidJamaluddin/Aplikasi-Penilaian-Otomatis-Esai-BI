export default interface DataKelas { idkelas:string; namaKelas:string; }

export default interface DataMatapelajaran 
{ 
    idmapel: string; 
    namaMapel: string; 
    KKM: string; 
}

export default interface DataGuru 
{
    idguru: string;
    nip: string;
    nuptk: string;
    namaGuru: string;
    namaMapel: string;
    namaKelas: string;
    username?: string;
    password?: string;
    listpengampu?: Array<any>;
}

export default interface DataSiswa
{
    nis: string;
    nama: string;
    idkelas: string;
    password?: string;
    kelas:Partial<DataKelas>;
}

export default interface DataPelaksanaanUjian
{
    idkelas: string;
    idujian: string;
    waktu_mulai: string;
    status_pelaksanaan: string;
    status_penilaian?: string;
    progress_penilaian?: number;
}

export default interface DataUjian
{
    idujian: string;
    idguru: string;
    idmapel: string;
    namaUjian: string;
    namaMapel: string;
    pelaksanaan_ujian: Array<any>;
    listsoal: Array<any>;
    jumlahSoal: number;
    durasi: string;
    status_ujian: string;
}

export default interface DataSoal
{
    idujian: string;
    idsoal: string;
    soalEsai: string;
    skorMin: string;
    skorMax: string;
    kompetensiDasar: string;
    materiPokok: string;
}

export default interface DataJawabanUjian
{
    nis: string;
    idujian: string;
    idsoal: string;
    jawabanSiswa?: string;
}

export default interface DataPengampu
{
    idpengampu: string;
    idmapel: string;
    idkelas: string;
    idguru: string;
    
    namaKelas: string;
    namaGuru: string;
    namaMatapelajaran: string;
}

export default interface DataJawabanSoal
{
    idjawaban?: string;
    idsoal: string;
    nis : string;
    jawabanEsai : string;
}

export default interface DataNilai
{
    nis: string;
    idsujian: string;
    nilai: number;
}