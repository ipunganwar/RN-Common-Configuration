const pelangganProfile = {
      kode_pelanggan: "0023012222",
      peran: 1,
      password: "767c49350d3a75dab2bd0925b30e48a66d606f6901949be4ab975c1d00a2936d",
      foto_pelanggan: "profile_image",
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

export const jadwal = [
      {
        tanggal_tutup: "Mon May 14 2018 07:24:00 GMT+0700 (WIB)",
        day: "Senin ",
        active: true,
        month: "Mei",
        date: "14",
        year: "2018"
      },
      {
        tanggal_tutup: "Tue May 15 2018 07:24:00 GMT+0700 (WIB)",
        day: "Selasa ",
        active: true,
        month: "Mei",
        date: "15",
        year: "2018"
      },
      {
        tanggal_tutup: "Wed May 16 2018 07:24:00 GMT+0700 (WIB)",
        day: "Rabu ",
        active: true,
        month: "Mei",
        date: "16",
        year: "2018"
      },
      {
        tanggal_tutup: "Thu May 17 2018 07:24:00 GMT+0700 (WIB)",
        day: "Kamis ",
        active: true,
        month: "Mei",
        date: "17",
        year: "2018"
      },
      {
        tanggal_tutup: "Fri May 18 2018 07:24:00 GMT+0700 (WIB)",
        day: "Jumat ",
        active: true,
        month: "Mei",
        date: "18",
        year: "2018"
      },
      {
        tanggal_tutup: "Sat May 19 2018 07:24:00 GMT+0700 (WIB)",
        day: "Sabtu ",
        active: false,
        month: "Mei",
        date: "19",
        year: "2018"
      }
    ]

const tes = {
  status: 200,
  listMyOrders: listMyOrders
}

export const listMyOrders = [
  {
    "_id": "1804000020000027",
    "tanggal_ambil": "Mon May 14 2018 07:24:00 GMT+0700 (WIB)",
    "kode_outlet": {
      "kode_outlet": "00002SE000001001"
    },
    "transaksi_detail": [
      {
        "nama_menu": "Gado Gado",
        "jam_istirahat": 1,
        "jam_ambil": null,
        "jumlah_pesan": 1,
        "jumlah_ambil": 0,
        "jumlah_kembali": 0,
        "harga_beli": 8000,
        "kode_menu": {
          "_id": "00002001",
          "foto_menu": "gado"
        }
      },
      {
        "nama_menu": "Goreng Pisang",
        "jam_istirahat": 1,
        "jam_ambil": null,
        "jumlah_pesan": 3,
        "jumlah_ambil": 0,
        "jumlah_kembali": 0,
        "harga_beli": 3000,
        "kode_menu": {
          "_id": "00002002",
          "foto_menu": "pisang_goreng"
        }
      },
      {
        "nama_menu": "Es Teh Manis",
        "jam_istirahat": 1,
        "jam_ambil": null,
        "jumlah_pesan": 1,
        "jumlah_ambil": 0,
        "jumlah_kembali": 0,
        "harga_beli": 3000,
        "kode_menu": {
          "_id": "00001007",
          "foto_menu": "es_teh"
        }
      },
      {
        "nama_menu": "Nasi Goreng",
        "jam_istirahat": 2,
        "jam_ambil": null,
        "jumlah_pesan": 1,
        "jumlah_ambil": 0,
        "jumlah_kembali": 0,
        "harga_beli": 12000,
        "kode_menu": {
          "_id": "00001004",
          "foto_menu": "nasgor"
        }
      },
      {
        "nama_menu": "Aqua Botol",
        "jam_istirahat": 2,
        "jam_ambil": null,
        "jumlah_pesan": 1,
        "jumlah_ambil": 0,
        "jumlah_kembali": 0,
        "harga_beli": 5000,
        "kode_menu": {
          "_id": "00002009",
          "foto_menu": "aqua_botol"
        }
      },
    ]
  },
  {
    "_id": "1804000020000027",
    "tanggal_ambil": "Tue May 15 2018 07:24:00 GMT+0700 (WIB)",
    "kode_outlet": {
      "kode_outlet": "00002SE000001001"
    },
    "transaksi_detail": [
      {
        "nama_menu": "Soto ayam",
        "jam_istirahat": 1,
        "jam_ambil": null,
        "jumlah_pesan": 1,
        "jumlah_ambil": 0,
        "jumlah_kembali": 0,
        "harga_beli": 10000,
        "kode_menu": {
          "_id": "00003003",
          "foto_menu": "soto_ayam"
        }
      },
      {
        "nama_menu": "Es Jeruk",
        "jam_istirahat": 1,
        "jam_ambil": null,
        "jumlah_pesan": 1,
        "jumlah_ambil": 0,
        "jumlah_kembali": 0,
        "harga_beli": 3000,
        "kode_menu": {
          "_id": "00001008",
          "foto_menu": "es_jeruk"
        }
      },
      {
        "nama_menu": "Nasi Goreng",
        "jam_istirahat": 2,
        "jam_ambil": null,
        "jumlah_pesan": 1,
        "jumlah_ambil": 0,
        "jumlah_kembali": 0,
        "harga_beli": 12000,
        "kode_menu": {
          "_id": "00001004",
          "foto_menu": "nasgor"
        }
      },
      {
        "nama_menu": "Risoles",
        "jam_istirahat": 2,
        "jam_ambil": null,
        "jumlah_pesan": 5,
        "jumlah_ambil": 0,
        "jumlah_kembali": 0,
        "harga_beli": 10000,
        "kode_menu": {
          "_id": "00002007",
          "foto_menu": "risoles"
        }
      },
      {
        "nama_menu": "Aqua Botol",
        "jam_istirahat": 2,
        "jam_ambil": null,
        "jumlah_pesan": 1,
        "jumlah_ambil": 0,
        "jumlah_kembali": 0,
        "harga_beli": 5000,
        "kode_menu": {
          "_id": "00002009",
          "foto_menu": "aqua_botol"
        }
      },
      {
        "nama_menu": "Bakso Malang",
        "jam_istirahat": 3,
        "jam_ambil": null,
        "jumlah_pesan": 1,
        "jumlah_ambil": 0,
        "jumlah_kembali": 0,
        "harga_beli": 7000,
        "kode_menu": {
          "_id": "00003005",
          "foto_menu": "bakso"
        }
      },
      {
        "nama_menu": "Es Teh Manis",
        "jam_istirahat": 1,
        "jam_ambil": null,
        "jumlah_pesan": 1,
        "jumlah_ambil": 0,
        "jumlah_kembali": 0,
        "harga_beli": 3000,
        "kode_menu": {
          "_id": "00001007",
          "foto_menu": "es_teh"
        }
      },
    ]
},




  {
    "_id": "1804000020000027",
    "tanggal_ambil": "Wed May 16 2018 07:24:00 GMT+0700 (WIB)",
    "kode_outlet": {
      "kode_outlet": "00002SE000001001"
    },
    "transaksi_detail": [
      {
        "nama_menu": "Mie Ayam",
        "jam_istirahat": 1,
        "jam_ambil": null,
        "jumlah_pesan": 1,
        "jumlah_ambil": 0,
        "jumlah_kembali": 0,
        "harga_beli": 15000,
        "kode_menu": {
          "_id": "00002013",
          "foto_menu": "mie_ayam"
        }
      },
      {
        "nama_menu": "Es Teh Manis",
        "jam_istirahat": 1,
        "jam_ambil": null,
        "jumlah_pesan": 1,
        "jumlah_ambil": 0,
        "jumlah_kembali": 0,
        "harga_beli": 3000,
        "kode_menu": {
          "_id": "00001007",
          "foto_menu": "es_teh"
        }
      },
      {
        "nama_menu": "Nasi Goreng",
        "jam_istirahat": 2,
        "jam_ambil": null,
        "jumlah_pesan": 1,
        "jumlah_ambil": 0,
        "jumlah_kembali": 0,
        "harga_beli": 12000,
        "kode_menu": {
          "_id": "00001004",
          "foto_menu": "nasgor"
        }
      },
      {
        "nama_menu": "Aqua Botol",
        "jam_istirahat": 2,
        "jam_ambil": null,
        "jumlah_pesan": 1,
        "jumlah_ambil": 0,
        "jumlah_kembali": 0,
        "harga_beli": 5000,
        "kode_menu": {
          "_id": "00002009",
          "foto_menu": "aqua_botol"
        }
      },
      {
        "nama_menu": "Sop Daging",
        "jam_istirahat": 3,
        "jam_ambil": null,
        "jumlah_pesan": 1,
        "jumlah_ambil": 0,
        "jumlah_kembali": 0,
        "harga_beli": 10000,
        "kode_menu": {
          "_id": "00002004",
          "foto_menu": "sop_daging"
        }
      },
      {
        "nama_menu": "Aqua Botol",
        "jam_istirahat": 3,
        "jam_ambil": null,
        "jumlah_pesan": 1,
        "jumlah_ambil": 0,
        "jumlah_kembali": 0,
        "harga_beli": 5000,
        "kode_menu": {
          "_id": "00002009",
          "foto_menu": "aqua_botol"
        }
      },
    ]
  },
  {
    "_id": "1804000020000027",
    "tanggal_ambil": "Thu May 17 2018 07:24:00 GMT+0700 (WIB)",
    "kode_outlet": {
      "kode_outlet": "00002SE000001001"
    },
    "transaksi_detail": [
      {
        "nama_menu": "Siomay Ayam",
        "jam_istirahat": 2,
        "jam_ambil": null,
        "jumlah_pesan": 1,
        "jumlah_ambil": 0,
        "jumlah_kembali": 0,
        "harga_beli": 8000,
        "kode_menu": {
          "_id": "00002100",
          "foto_menu": "siomay"
        }
      },
      {
        "nama_menu": "Teh Botol",
        "jam_istirahat": 2,
        "jam_ambil": null,
        "jumlah_pesan": 1,
        "jumlah_ambil": 0,
        "jumlah_kembali": 0,
        "harga_beli": 5000,
        "kode_menu": {
          "_id": "00003007",
          "foto_menu": "teh_botol"
        }
      },
      {
        "nama_menu": "Pecel",
        "jam_istirahat": 3,
        "jam_ambil": null,
        "jumlah_pesan": 1,
        "jumlah_ambil": 0,
        "jumlah_kembali": 0,
        "harga_beli": 8000,
        "kode_menu": {
          "_id": "00002021",
          "foto_menu": "pecel"
        }
      },
      {
        "nama_menu": "Aqua Botol",
        "jam_istirahat": 3,
        "jam_ambil": null,
        "jumlah_pesan": 1,
        "jumlah_ambil": 0,
        "jumlah_kembali": 0,
        "harga_beli": 5000,
        "kode_menu": {
          "_id": "00002009",
          "foto_menu": "aqua_botol"
        }
      },
    ]
  }
]

export function dummyQueryBeranda(token) {
  let data =
  {
    data: {
      pelangganProfile: pelangganProfile,
      listMyOrders: listMyOrders,
      jadwal: jadwal
    },
    loading: false
  }
  return data
}
