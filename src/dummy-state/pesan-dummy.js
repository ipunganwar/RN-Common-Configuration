import { listMyOrders, jadwal } from './beranda-dummy'
import { dummySetSaldo } from './profile-dummy'
import { SetOrders, SetEditedOrders } from '../actions/editOrderMenu'
import { SetProfile } from '../actions/profileAction'
import { SetResetOrder } from '../actions/orderMenu'

const listMyKantin =
[
      {
        "nama_outlet": "Kantin Aneka Rasa",
        "kode_outlet": "00002SE000001001",
        "no_telepon": "021831832",
        "nama_pemilik": "Ibu Ungu 1",
        "foto_pemilik": "https://static.viva.co.id/thumbs2/2017/03/16/58ca1966c2425-kulineran-ke-mangga-dua-mampir-ke-kantin-yang-dandanan-pemiliknya-cetar-membahana_663_382.jpg",
        "saldo": 3102750,
        "status": 0,
        "kode_kantin": {
          "_id": "00002",
          "tanggal_register": "Tue Mar 20 2018 08:04:41 GMT+0000 (UTC)",
          "nama_kantin": "Ibu Ungu Team",
          "no_telepon": "021831831",
          "foto_kantin": "ibu_kantin1"
        }
      },
      {
        "nama_outlet": "Kantin bersih sehat",
        "kode_outlet": "00002SE000001002",
        "no_telepon": "021831832",
        "nama_pemilik": "Ibu Ungu 2",
        "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
        "saldo": 2961600,
        "status": 0,
        "kode_kantin": {
          "_id": "00002",
          "tanggal_register": "Tue Mar 20 2018 08:04:41 GMT+0000 (UTC)",
          "nama_kantin": "Ibu Ungu Team",
          "no_telepon": "021831831",
          "foto_kantin": "ibu_kantin2"
        }
      },
      {
        "nama_outlet": "Kantin Ayam Top",
        "kode_outlet": "00002SE000001003",
        "no_telepon": "021831832",
        "nama_pemilik": "Ibu Ungu 3",
        "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
        "saldo": 2961600,
        "status": 0,
        "kode_kantin": {
          "_id": "00002",
          "tanggal_register": "Tue Mar 20 2018 08:04:41 GMT+0000 (UTC)",
          "nama_kantin": "Ibu Ungu Team",
          "no_telepon": "021831831",
          "foto_kantin": "ibu_kantin3"
        }
      },
    ]

const listMenuBySekolah =
[
      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00002001",
          "kode_kantin": "00001",
          "jenis_menu": 1,
          "nama_menu": "Gado Gado",
          "foto_menu": "gado",
          "deskripsi": "Gado-gado adalah salah satu makanan yang berasal dari Betawi yang berupa sayur-sayuran yang direbus dan dicampur jadi satu, dengan bumbu kacang atau saus dari kacang tanah dan yang dihaluskan disertai irisan telur dan pada umumnya banyak yang menambahkan kentang rebus yang sudah dihaluskan untuk saus gado gado kentang rebus dimasak bersamaan dengan bumbu kacang kemudian di atasnya ditaburi bawang goreng.",
          "tingkat_pedas": 0,
          "zat_besi": 2.08,
          "protein": 6.7,
          "karbohidrat": 24.6,
          "kkal": 203,
          "kolesterol": 0,
          "lemak": 8.7,
          "b1": 0,
          "harga": [
            {
              "harga": 8000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
            {
              "kode_bahan": "0003",
              "nama_bahan": "Bawang Merah",
              "icon_bahan": "bawang_merah"
            },
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00001SE000001002",
          "nama_outlet": "Kantin Aneka Rasa",
          "no_telepon": "021831832",
          "foto_pemilik": "ibu_kantin2",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00002100",
          "kode_kantin": "00001",
          "jenis_menu": 1,
          "nama_menu": "Siomay Ayam",
          "foto_menu": "siomay",
          "deskripsi": "Siomai adalah salah satu jenis dim sum. Dalam bahasa Mandarin, makanan ini disebut shaomai, sementara dalam bahasa Kanton disebut siu maai. Dalam dialek Beijing, makanan ini juga ditulis sebagai 燒麥, dan juga dibaca shaomai. Kulit siomai adalah serupa dengan kulit pangsit. Makanan ini konon berasal dari Mongolia Dalam",
          "tingkat_pedas": 0,
          "zat_besi": 2.41,
          "protein": 7.5,
          "karbohidrat": 24.4,
          "kkal": 162,
          "kolesterol": 0,
          "lemak": 8.7,
          "b1": 0,
          "harga": [
            {
              "harga": 8000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
            {
              "kode_bahan": "0001",
              "nama_bahan": "Daging Ayam",
              "icon_bahan": "ayam"
            },
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00001SE000001002",
          "nama_outlet": "Kantin Aneka Rasa",
          "no_telepon": "021831832",
          "foto_pemilik": "ibu_kantin2",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00001003",
          "kode_kantin": "00001",
          "jenis_menu": 1,
          "nama_menu": "Bakso Urat Pedas",
          "foto_menu": "bakso_pedas",
          "deskripsi": "Bakso atau baso adalah jenis bola daging yang lazim ditemukan pada masakan Indonesia.",
          "tingkat_pedas": 2,
          "zat_besi": 6.75,
          "protein": 10.3,
          "karbohidrat": 23.1,
          "kkal": 190,
          "kolesterol": 0,
          "lemak": 6.3,
          "b1": 0,
          "harga": [
            {
              "harga": 10000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
            {
              "kode_bahan": "0001",
              "nama_bahan": "Daging Sapi",
              "icon_bahan": "daging_sapi"
            },
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00001SE000001002",
          "nama_outlet": "Kantin Aneka Rasa",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00001004",
          "kode_kantin": "00001",
          "jenis_menu": 1,
          "nama_menu": "Nasi Goreng",
          "foto_menu": "nasgor",
          "deskripsi": "Nasi goreng adalah sebuah hidangan nasi yang telah digoreng dalam sebuah wajan atau penggorengan dan biasanya dicampur dengan bahan-bahan lainnya seperti telur, sayur-sayuran, makanan laut, atau daging.",
          "tingkat_pedas": 0,
          "zat_besi": 0.9,
          "protein": 6.4,
          "karbohidrat": 0,
          "kkal": 198,
          "kolesterol": 0,
          "lemak": 0,
          "b1": 0.03,
          "harga": [
            {
              "harga": 12000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
            {
              "kode_bahan": "0001",
              "nama_bahan": "Telur",
              "icon_bahan": "telur"
            },
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00001SE000001002",
          "nama_outlet": "Kantin Aneka Rasa",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00001005",
          "kode_kantin": "00001",
          "jenis_menu": 3,
          "nama_menu": "Gorengan",
          "foto_menu": "gorengan",
          "deskripsi": "Gorengan atau Goreng tepung adalah berbagai jenis makanan yang dicelup adonan tepung dan kemudian digoreng rendam dalam minyak goreng panas yang banyak.",
          "tingkat_pedas": 0,
          "zat_besi": 5.2,
          "protein": 40.3,
          "karbohidrat": 11.5,
          "kkal": 542,
          "kolesterol": 0,
          "lemak": 42.4,
          "b1": 0.1,
          "harga": [
            {
              "harga": 1000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
            {
              "kode_bahan": "0001",
              "nama_bahan": "Tepung",
              "icon_bahan": "tepung"
            },
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00001SE000001002",
          "nama_outlet": "Kantin Aneka Rasa",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00001006",
          "kode_kantin": "00001",
          "jenis_menu": 3,
          "nama_menu": "Risoles",
          "foto_menu": "risoles",
          "deskripsi": "Risoles (bahasa Belanda: rissole) adalah pastri berisi daging, biasanya daging cincang, dan sayuran yang dibungkus dadar, dan digoreng setelah dilapisi tepung panir dan kocokan telur ayam. Hidangan ini juga dapat dipanggang di dalam oven, dan disajikan sebagai hors-d'oeuvre atau entrée ringan.",
          "tingkat_pedas": 0,
          "zat_besi": 3.2,
          "protein": 30.3,
          "karbohidrat": 1.5,
          "kkal": 32,
          "kolesterol": 0,
          "lemak": 12.4,
          "b1": 0.1,
          "harga": [
            {
              "harga": 1000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
            {
              "kode_bahan": "0001",
              "nama_bahan": "Tepung",
              "icon_bahan": "tepung"
            },
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00001SE000001002",
          "nama_outlet": "Kantin Aneka Rasa",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00001007",
          "kode_kantin": "00001",
          "jenis_menu": 2,
          "nama_menu": "Es Teh Manis",
          "foto_menu": "es_teh",
          "deskripsi": "Teh manis adalah minuman yang terbuat dari larutan teh yang diberi pemanis, biasanya gula tebu, sebelum minuman ini siap disajikan. Untuk konteks Indonesia, teh manis yang diberi es biasa disebut es teh.",
          "tingkat_pedas": 0,
          "zat_besi": 0,
          "protein": 0,
          "karbohidrat": 0,
          "kkal": 100,
          "kolesterol": 0,
          "lemak": 0,
          "b1": 0,
          "harga": [
            {
              "harga": 3000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
            {
              "kode_bahan": "0001",
              "nama_bahan": "Teh",
              "icon_bahan": "teh"
            },
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00001SE000001002",
          "nama_outlet": "Kantin Aneka Rasa",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00001008",
          "kode_kantin": "00001",
          "jenis_menu": 2,
          "nama_menu": "Es Jeruk",
          "foto_menu": "es_jeruk",
          "deskripsi": "Es jeruk adalah salah satu minuman yang murah meriah, bergizi, simple, juga nikmat. Oleh sebab itu es jeruk sering kali menjadi minuman langgalan untuk orang-orang. ",
          "tingkat_pedas": 0,
          "zat_besi": 0,
          "protein": 0,
          "karbohidrat": 0,
          "kkal": 100,
          "kolesterol": 0,
          "lemak": 0,
          "b1": 0,
          "harga": [
            {
              "harga": 3000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
            {
              "kode_bahan": "0001",
              "nama_bahan": "Jeruk",
              "icon_bahan": "jeruk"
            },
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00001SE000001002",
          "nama_outlet": "Kantin Aneka Rasa",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00001009",
          "kode_kantin": "00001",
          "jenis_menu": 2,
          "nama_menu": "Aqua Botol",
          "foto_menu": "aqua_botol",
          "deskripsi": "Aqua adalah sebuah merek air minum dalam kemasan (AMDK) yang diproduksi oleh PT Aqua Golden Mississippi Tbk di Indonesia sejak tahun 1973. Selain di Indonesia, Aqua juga dijual di Malaysia, Singapura, dan Brunei.",
          "tingkat_pedas": 0,
          "zat_besi": 0,
          "protein": 0,
          "karbohidrat": 0,
          "kkal": 100,
          "kolesterol": 0,
          "lemak": 0,
          "b1": 0,
          "harga": [
            {
              "harga": 5000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00001SE000001002",
          "nama_outlet": "Kantin Aneka Rasa",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00002010",
          "kode_kantin": "00002",
          "jenis_menu": 1,
          "nama_menu": "Siomay Ayam",
          "foto_menu": "siomay",
          "deskripsi": "Siomai adalah salah satu jenis dim sum. Dalam bahasa Mandarin, makanan ini disebut shaomai, sementara dalam bahasa Kanton disebut siu maai. Dalam dialek Beijing, makanan ini juga ditulis sebagai 燒麥, dan juga dibaca shaomai. Kulit siomai adalah serupa dengan kulit pangsit. Makanan ini konon berasal dari Mongolia Dalam",
          "tingkat_pedas": 0,
          "zat_besi": 2.41,
          "protein": 7.5,
          "karbohidrat": 24.4,
          "kkal": 162,
          "kolesterol": 0,
          "lemak": 8.7,
          "b1": 0,
          "harga": [
            {
              "harga": 8000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
            {
              "kode_bahan": "0001",
              "nama_bahan": "Daging Ayam",
              "icon_bahan": "ayam"
            },
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00002SE000001002",
          "nama_outlet": "Kantin Bersih Sehat",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00002002",
          "kode_kantin": "00002",
          "jenis_menu": 1,
          "nama_menu": "Nasi Gila",
          "foto_menu": "nasi_gila",
          "deskripsi": " Nasi Gila adalah resep masakan sederhana khas Jakarta yang cocok disantap pada saat berbuka puasa dengan keluarga di rumah.",
          "tingkat_pedas": 0,
          "zat_besi": 0.9,
          "protein": 6.4,
          "karbohidrat": 0,
          "kkal": 198,
          "kolesterol": 0,
          "lemak": 0,
          "b1": 0.03,
          "harga": [
            {
              "harga": 10000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
            {
              "kode_bahan": "0001",
              "nama_bahan": "Daging Ayam",
              "icon_bahan": "ayam"
            },
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00002SE000001002",
          "nama_outlet": "Kantin Bersih Sehat",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00002003",
          "kode_kantin": "00002",
          "jenis_menu": 1,
          "nama_menu": "Mie Ayam",
          "foto_menu": "mie_ayam",
          "deskripsi": "Mi ayam atau bakmi ayam adalah masakan Indonesia yang terbuat dari mi kuning direbus mendidih kemudian ditaburi saos kecap khusus beserta daging ayam dan sayuran. Mi Ayam terkadang ditambahi dengan bakso, pangsit dan jamur.",
          "tingkat_pedas": 0,
          "zat_besi": 1,
          "protein": 5.4,
          "karbohidrat": 0,
          "kkal": 220,
          "kolesterol": 1,
          "lemak": 2.1,
          "b1": 0,
          "harga": [
            {
              "harga": 15000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
            {
              "kode_bahan": "0001",
              "nama_bahan": "Daging Ayam",
              "icon_bahan": "ayam"
            },
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00002SE000001002",
          "nama_outlet": "Kantin Bersih Sehat",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00002004",
          "kode_kantin": "00002",
          "jenis_menu": 1,
          "nama_menu": "Sop Daging",
          "foto_menu": "sop_daging",
          "deskripsi": "Daging sapi diolah jadi sop dengan bumbu rempah yang kuat, dijamin sedapnya bikin nagih.",
          "tingkat_pedas": 0,
          "zat_besi": 1.1,
          "protein": 4.4,
          "karbohidrat": 10,
          "kkal": 230,
          "kolesterol": 1.3,
          "lemak": 3.1,
          "b1": 0,
          "harga": [
            {
              "harga": 10000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
            {
              "kode_bahan": "0001",
              "nama_bahan": "Daging Sapi",
              "icon_bahan": "daging_sapi"
            },
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00002SE000001002",
          "nama_outlet": "Kantin Bersih Sehat",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00002005",
          "kode_kantin": "00002",
          "jenis_menu": 1,
          "nama_menu": "Sayur Asem",
          "foto_menu": "sayur_asem",
          "deskripsi": "Rasa masakan yang manis dan asam ini sangatlah menyegarkan dan cocok jika dipadukan dengan lauk kering lainnya seperti ikan goreng dan lalapan. ",
          "tingkat_pedas": 0,
          "zat_besi": 1.1,
          "protein": 2.4,
          "karbohidrat": 9,
          "kkal": 110,
          "kolesterol": 0.3,
          "lemak": 0.1,
          "b1": 0,
          "harga": [
            {
              "harga": 6000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
            {
              "kode_bahan": "0003",
              "nama_bahan": "Bawang Merah",
              "icon_bahan": "bawang_merah"
            },
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00002SE000001002",
          "nama_outlet": "Kantin Bersih Sehat",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00002006",
          "kode_kantin": "00002",
          "jenis_menu": 3,
          "nama_menu": "Gorengan",
          "foto_menu": "gorengan",
          "deskripsi": "Gorengan atau Goreng tepung adalah berbagai jenis makanan yang dicelup adonan tepung dan kemudian digoreng rendam dalam minyak goreng panas yang banyak.",
          "tingkat_pedas": 0,
          "zat_besi": 5.2,
          "protein": 40.3,
          "karbohidrat": 11.5,
          "kkal": 542,
          "kolesterol": 0,
          "lemak": 42.4,
          "b1": 0.1,
          "harga": [
            {
              "harga": 1000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
            {
              "kode_bahan": "0001",
              "nama_bahan": "Tepung",
              "icon_bahan": "tepung"
            },
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00002SE000001002",
          "nama_outlet": "Kantin Bersih Sehat",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00002007",
          "kode_kantin": "00002",
          "jenis_menu": 3,
          "nama_menu": "Risoles",
          "foto_menu": "risoles",
          "deskripsi": "Risoles (bahasa Belanda: rissole) adalah pastri berisi daging, biasanya daging cincang, dan sayuran yang dibungkus dadar, dan digoreng setelah dilapisi tepung panir dan kocokan telur ayam. Hidangan ini juga dapat dipanggang di dalam oven, dan disajikan sebagai hors-d'oeuvre atau entrée ringan.",
          "tingkat_pedas": 0,
          "zat_besi": 3.2,
          "protein": 30.3,
          "karbohidrat": 1.5,
          "kkal": 32,
          "kolesterol": 0,
          "lemak": 12.4,
          "b1": 0.1,
          "harga": [
            {
              "harga": 1000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
            {
              "kode_bahan": "0001",
              "nama_bahan": "Tepung",
              "icon_bahan": "tepung"
            },
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00002SE000001002",
          "nama_outlet": "Kantin Bersih Sehat",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00002008",
          "kode_kantin": "00002",
          "jenis_menu": 2,
          "nama_menu": "Teh Botol",
          "foto_menu": "teh_botol",
          "deskripsi": "Teh Botol Sosro adalah merek teh beraroma melati yang dipasarkan oleh PT. Sinar Sosro. Teh Botol Sosro sangat populer di Indonesia dan kini juga dijual di berbagai negara di luar Indonesia.",
          "tingkat_pedas": 0,
          "zat_besi": 0.2,
          "protein": 0,
          "karbohidrat": 1.5,
          "kkal": 0.1,
          "kolesterol": 0,
          "lemak": 11.4,
          "b1": 0.1,
          "harga": [
            {
              "harga": 1000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
            {
              "kode_bahan": "0001",
              "nama_bahan": "Tepung",
              "icon_bahan": "tepung"
            },
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00002SE000001002",
          "nama_outlet": "Kantin Bersih Sehat",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00002009",
          "kode_kantin": "00002",
          "jenis_menu": 2,
          "nama_menu": "Aqua Botol",
          "foto_menu": "aqua_botol",
          "deskripsi": "VIT Air Mineral Botol 600 ml merupakan Air mineral yang terbuat dari mata air langsung Spesifikasi Manufacture ID : UNSPSC : 50202306 Isi : 600 ml ",
          "tingkat_pedas": 0,
          "zat_besi": 0,
          "protein": 0,
          "karbohidrat": 0,
          "kkal": 100,
          "kolesterol": 0,
          "lemak": 0,
          "b1": 0,
          "harga": [
            {
              "harga": 3000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00002SE000001002",
          "nama_outlet": "Kantin Bersih Sehat",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00002010",
          "kode_kantin": "00002",
          "jenis_menu": 2,
          "nama_menu": "Jus Jeruk",
          "foto_menu": "jus_jeruk",
          "deskripsi": "Jus jeruk adalah salah satu jus buah yang tidak hanya lezat tetapi juga menyediakan serangkaian manfaat kesehatan. Karena kandungan zat gizinya sangat banyak",
          "tingkat_pedas": 0,
          "zat_besi": 0,
          "protein": 0,
          "karbohidrat": 0,
          "kkal": 100,
          "kolesterol": 0,
          "lemak": 0,
          "b1": 0,
          "harga": [
            {
              "harga": 6000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
            {
              "kode_bahan": "0001",
              "nama_bahan": "Jeruk",
              "icon_bahan": "jeruk"
            },
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00002SE000001002",
          "nama_outlet": "Kantin Bersih Sehat",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00003001",
          "kode_kantin": "00003",
          "jenis_menu": 1,
          "nama_menu": "Pecel Ayam",
          "foto_menu": "pecel_ayam",
          "deskripsi": "Pecak ayam (atau lebih dikenal pecel ayam) di Indonesia adalah nama sebuah makanan khas Jawa Tengah yang terdiri dari ayam goreng dan sambal (bumbu) pecak.",
          "tingkat_pedas": 1,
          "zat_besi": 1.2,
          "protein": 3.4,
          "karbohidrat": 5.1,
          "kkal": 330,
          "kolesterol": 0,
          "lemak": 0.4,
          "b1": 0.1,
          "harga": [
            {
              "harga": 13000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
            {
              "kode_bahan": "0001",
              "nama_bahan": "Daging Ayam",
              "icon_bahan": "ayam"
            },
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00003SE000001002",
          "nama_outlet": "Kantin Ayam Top",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00003002",
          "kode_kantin": "00003",
          "jenis_menu": 1,
          "nama_menu": "Sate Ayam",
          "foto_menu": "sate_ayam",
          "deskripsi": "Sate Ayam adalah makanan khas Indonesia yang berupa sejenis sup ayam dengan kuah yang berwarna kekuningan",
          "tingkat_pedas": 0,
          "zat_besi": 1.2,
          "protein": 3.4,
          "karbohidrat": 5.1,
          "kkal": 330,
          "kolesterol": 0,
          "lemak": 0.4,
          "b1": 0.1,
          "harga": [
            {
              "harga": 15000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
            {
              "kode_bahan": "0001",
              "nama_bahan": "Daging Ayam",
              "icon_bahan": "ayam"
            },
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00003SE000001002",
          "nama_outlet": "Kantin Ayam Top",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00003003",
          "kode_kantin": "00003",
          "jenis_menu": 1,
          "nama_menu": "Soto Ayam",
          "foto_menu": "soto_ayam",
          "deskripsi": "Sate Ayam adalah makanan khas Indonesia. Sate Ayam dibuat dari daging ayam. Pada umumnya sate ayam dimasak dengan cara dipanggang dengan menggunakan arang dan disajikan dengan pilihan bumbu kacang atau bumbu kecap.",
          "tingkat_pedas": 0,
          "zat_besi": 1.2,
          "protein": 3.4,
          "karbohidrat": 5.1,
          "kkal": 330,
          "kolesterol": 0,
          "lemak": 0.4,
          "b1": 0.1,
          "harga": [
            {
              "harga": 15000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
            {
              "kode_bahan": "0001",
              "nama_bahan": "Daging Ayam",
              "icon_bahan": "ayam"
            },
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00003SE000001002",
          "nama_outlet": "Kantin Ayam Top",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00003004",
          "kode_kantin": "00003",
          "jenis_menu": 1,
          "nama_menu": "Batagor",
          "foto_menu": "batagor",
          "deskripsi": "Batagor (akronim dari bakso tahu goreng) adalah jajanan khas Bandung yang mengadaptasi gaya Tionghoa-Indonesia dan kini sudah dikenal hampir di seluruh wilayah Indonesia.",
          "tingkat_pedas": 0,
          "zat_besi": 1.2,
          "protein": 3.4,
          "karbohidrat": 5.1,
          "kkal": 330,
          "kolesterol": 0,
          "lemak": 0.4,
          "b1": 0.1,
          "harga": [
            {
              "harga": 8000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
            {
              "kode_bahan": "0001",
              "nama_bahan": "Tepung",
              "icon_bahan": "tepung"
            },
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00003SE000001002",
          "nama_outlet": "Kantin Ayam Top",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00003005",
          "kode_kantin": "00003",
          "jenis_menu": 1,
          "nama_menu": "Bakso Malang",
          "foto_menu": "bakso",
          "deskripsi": "Di luar kota Malang, Bakso Malang disebut dengan nama Bakwan Malang. Berbeda dengan bakso pada umumnya yang biasanya berisi campuran bakso halus atau.",
          "tingkat_pedas": 0,
          "zat_besi": 1.2,
          "protein": 3.4,
          "karbohidrat": 5.1,
          "kkal": 330,
          "kolesterol": 0,
          "lemak": 0.4,
          "b1": 0.1,
          "harga": [
            {
              "harga": 10000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
            {
              "kode_bahan": "0001",
              "nama_bahan": "Tepung",
              "icon_bahan": "tepung"
            },
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00003SE000001002",
          "nama_outlet": "Kantin Ayam Top",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00003006",
          "kode_kantin": "00003",
          "jenis_menu": 1,
          "nama_menu": "Nasi Putih",
          "foto_menu": "nasi_putih",
          "deskripsi": "Warna nasi yang telah masak (tanak) berbeda-beda tergantung dari jenis beras yang digunakan. Pada umumnya, warna nasi adalah putih bila beras yang digunakan berwarna putih",
          "tingkat_pedas": 0,
          "zat_besi": 1.2,
          "protein": 3.4,
          "karbohidrat": 5.1,
          "kkal": 330,
          "kolesterol": 0,
          "lemak": 0.4,
          "b1": 0.1,
          "harga": [
            {
              "harga": 6000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00003SE000001002",
          "nama_outlet": "Kantin Ayam Top",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },

      {
        "_id": "5ad071f4756d813c3ccb9d96",
        "tanggal_penetapan": "Tue Apr 17 2018 17:00:00 GMT+0000 (UTC)",
        "istirahat1": true,
        "istirahat2": true,
        "istirahat3": true,
        "senin": true,
        "selasa": true,
        "rabu": true,
        "kamis": true,
        "jumat": true,
        "sabtu": false,
        "minggu": false,
        "kode_menu": {
          "_id": "00003007",
          "kode_kantin": "00003",
          "jenis_menu": 2,
          "nama_menu": "Teh Botol",
          "foto_menu": "teh_botol",
          "deskripsi": "Teh Botol Sosro adalah merek teh beraroma melati yang dipasarkan oleh PT. Sinar Sosro. Teh Botol Sosro sangat populer di Indonesia dan kini juga dijual di berbagai negara di luar Indonesia.",
          "tingkat_pedas": 0,
          "zat_besi": 0,
          "protein": 0,
          "karbohidrat": 0,
          "kkal": 0,
          "kolesterol": 0,
          "lemak": 0,
          "b1": 0,
          "harga": [
            {
              "harga": 5000,
              "tanggal_penetapan": "Thu Apr 12 2018 00:00:00 GMT+0000 (UTC)"
            }
          ],
          "bahan": [
          ]
        },
        "kode_outlet": {
          "kode_outlet": "00003SE000001002",
          "nama_outlet": "Kantin Ayam Top",
          "no_telepon": "021831832",
          "foto_pemilik": "https://wiwinhendriani.files.wordpress.com/2017/08/ungu.jpg",
          "nama_pemilik": "Ibu Ungu 2",
          "alamat_pemilik": "Jl. Ini jalan apa ya namanya",
          "email_pemilik": "ibuungu2@gmail.com",
          "saldo": 2961600,
          "status": 0,
          "kode_perangkat": "BKMCDKFC"
        }
      },
    ]

export function dummyQueryKantinDanMenu(token) {
  let data = {
    data: {
      listMyKantin: listMyKantin,
      listMenuBySekolah: listMenuBySekolah
    }
  }
  return data
}

export function HelperDummy (item, indexTanggal, istirahat) {
    let currentDate = jadwal.slice(1, 6)
    let orders = listMyOrders.slice()
    let indexAda = -1
    for (let i = 0; i < listMyOrders.length; i++) {
      let dateOrder = new Date(orders[i].tanggal_ambil)
      let dateCalendarAktif = new Date(currentDate[indexTanggal].tanggal_tutup)
      if (dateOrder.getDate() == dateCalendarAktif.getDate() && dateOrder.getMonth() == dateCalendarAktif.getMonth() && dateOrder.getYear() == dateCalendarAktif.getYear()) {
        indexAda = i
      }
    }

      switch(istirahat) {
      case 0:
      let menus = orders[indexAda].transaksi_detail.find(function(menu) {
        return menu.kode_menu._id == item.kode_menu._id
      })
      if (typeof menus == 'undefined') {
            let tambah = {
              nama_menu: item.kode_menu.nama_menu,
              harga_beli: item.kode_menu.harga_terbaru,
              jam_ambil: null,
              jam_istirahat: 1,
              jumlah_ambil: 0,
              jumlah_pesan: 1,
              jumlah_kembali: 0,
              kode_menu: item.kode_menu,
            }
            orders[indexAda].transaksi_detail.push(tambah)
      }
        break;
    }
    return orders

}









const orderBaru = [
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
          "foto_menu": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Gado-gado_in_Jakarta.JPG/1200px-Gado-gado_in_Jakarta.JPG"
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
          "foto_menu": "https://www.indoindians.com/wp-content/uploads/2017/07/All-about-Pisang-Goreng-1.jpg"
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
          "foto_menu": "https://cdn.yukepo.com/content-images/main-images/2016/12/28/main_image_3789.png"
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
          "foto_menu": "http://www.shrinkingsingle.com/wp-content/uploads/2014/12/nasi-goreng-2.jpg"
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
          "foto_menu": "http://cdn7.1cak.com/posts/cdd66d05115161bd783b502833741148_t.jpg"
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
          "foto_menu": "http://www.dapurkobe.co.id/wp-content/uploads/soto-ayam-panggang.jpg"
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
          "foto_menu": "https://i.ytimg.com/vi/9HdUe5w5FVU/hqdefault.jpg"
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
          "foto_menu": "http://www.shrinkingsingle.com/wp-content/uploads/2014/12/nasi-goreng-2.jpg"
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
          "foto_menu": "http://d2ddnehiv0ezsr.cloudfront.net/media/article_image/cover/original/27743-ingin-camilan-tampil-modern-mari-membuat-risoles-ikan-nan-praktis.jpg"
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
          "foto_menu": "http://cdn7.1cak.com/posts/cdd66d05115161bd783b502833741148_t.jpg"
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
          "foto_menu": "https://inspiratorfreak.com/wp-content/uploads/2017/01/bakso1.jpg"
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
          "foto_menu": "https://cdn.yukepo.com/content-images/main-images/2016/12/28/main_image_3789.png"
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
          "foto_menu": "http://www.tokomesin.com/wp-content/uploads/2017/09/mie-ayam-kampung.jpg"
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
          "foto_menu": "https://cdn.yukepo.com/content-images/main-images/2016/12/28/main_image_3789.png"
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
          "foto_menu": "http://www.shrinkingsingle.com/wp-content/uploads/2014/12/nasi-goreng-2.jpg"
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
          "foto_menu": "http://cdn7.1cak.com/posts/cdd66d05115161bd783b502833741148_t.jpg"
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
          "foto_menu": "http://d2ddnehiv0ezsr.cloudfront.net/media/article_image/cover/original/26640-tips-memasak-sop-daging-sapi-ekonomis-tapi-tetap-sedap-kaldunya.JPG"
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
          "foto_menu": "http://cdn7.1cak.com/posts/cdd66d05115161bd783b502833741148_t.jpg"
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
          "foto_menu": "https://img-global.cpcdn.com/003_recipes/74a0767197aa5bee/1200x630cq70/photo.jpg"
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
          "foto_menu": "https://s3-media1.fl.yelpcdn.com/bphoto/hldiQq9eTGY_GLhocuMETQ/o.jpg"
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
          "foto_menu": "https://cdn.idntimes.com/content-images/community/2017/10/3-nasi-pecel-yu-sri-4a66482d53bb8e2d7c50e4672070637f_420x280.JPG"
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
          "foto_menu": "http://cdn7.1cak.com/posts/cdd66d05115161bd783b502833741148_t.jpg"
        }
      },
    ]
  }
]


export function SetNewOrderMenuDummy (item, total) {
  console.log('SetNewOrderMenuDummy')

  orderBaru.splice(0, orderBaru.length)
  for (var i = 0; i < item.length; i++) {
    orderBaru.push(Object.assign({}, JSON.parse(JSON.stringify(item[i]))))
  }

  let setSaldo = {pelangganProfile: dummySetSaldo(total)}

  return (dispatch, state) => {
    dispatch(SetProfile(setSaldo))
    dispatch(SetOrders(orderBaru))
    dispatch(SetResetOrder())
    return dispatch(SetEditedOrders(orderBaru))
  }
}
