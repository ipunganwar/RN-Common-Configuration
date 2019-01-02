const pelangganProfile = {
      kode_pelanggan: "0023012222",
      peran: 1,
      password: "767c49350d3a75dab2bd0925b30e48a66d606f6901949be4ab975c1d00a2936d",
      foto_pelanggan: "https://www.wowkeren.com/images/news/00114553.jpg",
      nama_pelanggan: "Afifah Fatimah",
      saldo: 420000,
      email: "afifah98@gmail.com",
      alamat: "Jl. Tebet Barat III No. D, RT.7/RW.2, Tebet Barat, Tebet, Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12810",
      kelas: "XI",
      username: "afifah98@gmail.com",
      kode_sekolah: {
        nama_sekolah: "SMAN 26 Jakarta"
      }
  }

  export function dummyQueryProfile() {
    let data =
    {
      data: {
        pelangganProfile: pelangganProfile,
      }
    }

    return data
  }

export function dummySetSaldo(total) {
  pelangganProfile.saldo -= total
  return pelangganProfile
}
