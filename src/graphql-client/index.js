import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { createHttpLink } from 'apollo-link-http';
import ApolloLinkTimeout from 'apollo-link-timeout';
import { connection, development } from '../helpers/api'
import { onError } from "apollo-link-error";


const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const timeoutLink = new ApolloLinkTimeout(10000)
const httpLink = new HttpLink({uri: `${connection.server.project_name}graphql`})
const timeoutHttpLink = timeoutLink.concat(httpLink)

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  link: new HttpLink({uri: `${connection.server.project_name}graphql`}),
  cache: new InMemoryCache(),
  defaultOptions,
});

export const mutationTopupTransfer = (token, tanggal_waktu, bank_asal, bank_tujuan, nama_pengirim, saldo_topup) => {
  token = '"' + token + '"'
  tanggal_waktu = '"' + tanggal_waktu + '"'
  bank_asal = '"' + bank_asal + '"'
  bank_tujuan = '"' + bank_tujuan + '"'
  nama_pengirim = '"' + nama_pengirim + '"'

  let mutation;

    mutation = gql `
      mutation {
        topupTransfer (
          token: ${token}
          tanggal_waktu: ${tanggal_waktu}
          bank_asal: ${bank_asal}
          bank_tujuan: ${bank_tujuan}
          nama_pengirim: ${nama_pengirim}
          saldo_topup: ${saldo_topup}
        ){
          nama_pengirim
        }
      }`;

  return client.mutate({ mutation: mutation })
}

export const queryTransaksi = (token) => {
  // console.log('queryTransaksi', token)
  token = '"' + token + '"'
  const query = gql `
    {
      listMyTransaksi (token: ${token}) {
        aplikasi {
          _id
          tanggal_ambil
          created_at
          kode_outlet {
            nama_outlet
          }
          transaksi_detail {
            nama_menu
            jam_ambil
            jumlah_pesan
            jumlah_ambil
            jumlah_kembali
            harga_beli
            jam_istirahat
          }
          saldo_akhir
        }
        kasir {
          _id
          tanggal_ambil
          created_at
          kode_outlet {
            nama_outlet
          }
          transaksi_detail {
            nama_menu
            jam_ambil
            jumlah_pesan
            jumlah_ambil
            jumlah_kembali
            harga_beli
            jam_istirahat
          }
          saldo_akhir
        }
        topup {
          _id
      		tanggal_waktu
          saldo_topup
          status
          saldo_akhir
        }

        pengembalian {
          tanggal_ambil
          created_at
          kode_outlet {
            nama_outlet
          }
          transaksi_detail {
            nama_menu
            jam_ambil
            jumlah_pesan
            jumlah_ambil
            jumlah_kembali
            harga_beli
            jam_istirahat
          }
          saldo_akhir
        }
      }
    }`;
    return client.query({ query: query })
}

export const queryProfile = (token) => {
  // console.log('queryProfile', token)
  token = '"' + token + '"'
  const query = gql `
    {
      pelangganProfile(token: ${token}){
        kode_pelanggan
        peran
        password
        foto_pelanggan
        nama_pelanggan
        saldo
        email
        alamat
        kelas
        username
        kode_sekolah {
          nama_sekolah
        }
        notifikasi {
          _id
          tanggal_waktu
          notifikasi
          baca
        }
      }
    }`;
    return client.query({ query: query })
}

export const readNotification = (token, lastNotification) => {
  token = '"' + token + '"'
  lastNotification = lastNotification.replace(/"/g, '###');
  lastNotification = '"' + lastNotification + '"'
  let mutation;
  mutation = gql `
    mutation {
      readNotification (
        token: ${token}
        lastNotification: ${lastNotification}
      ){
        peran
      }
    }`;
  return client.mutate({ mutation: mutation })
}

export const mutationProfile = (token, alamat, email, password) => {

  token = '"' + token + '"'
  alamat = '"' + alamat + '"'
  email = '"' + email + '"'
  let mutation;

  if(password != '123456') {
    password = '"' + password + '"'
    mutation = gql `
      mutation {
        editProfilePelanggan (
          token: ${token}
          alamat: ${alamat}
          email: ${email}
          password: ${password}
        ){
          peran
        }
      }`;

  } else {
    mutation = gql `
      mutation {
        editProfilePelanggan (
          token: ${token}
          alamat: ${alamat}
          email: ${email}
        ){
          peran
        }
      }`;
  }

  return client.mutate({ mutation: mutation })
}

export const queryBeranda = (token) => {
  token = '"' + token + '"'
  const query = gql `
  {
    pelangganProfile(token: ${token}){
      kode_pelanggan
      peran
      password
      foto_pelanggan
      nama_pelanggan
      saldo
      email
      alamat
      kelas
      username
      kode_sekolah {
        nama_sekolah
      }
      notifikasi {
        _id
        tanggal_waktu
        notifikasi
        baca
      }
    }

    jadwal(token: ${token}){
      tanggal_tutup
      date
      day
      month
      year
      active
    }

    listMyOrders(token: ${token}){
      _id
      tanggal_ambil
      kode_outlet {
        kode_outlet
      }
      transaksi_detail {
        _id
        kode_outlet
        kode_transaksi
        nama_menu
        jam_istirahat
        jam_ambil
        jumlah_pesan
        jumlah_ambil
        jumlah_kembali
        harga_beli
        kode_menu {
          _id
          foto_menu
        }
      }
    }
  }`;
    return client.query({ query: query})
}

export const queryMyOrder = (token) => {
  // console.log('queryMyOrder', token)
  token = '"' + token + '"'
  const query = gql`
    {
      listMyOrders(token: ${token}){
          _id
          tanggal_ambil
          created_at
          kode_outlet {
            kode_outlet
          }
          transaksi_detail {
            kode_transaksi
            nama_menu
            jam_istirahat
            jam_ambil
            jumlah_pesan
            jumlah_ambil
            jumlah_kembali
            harga_beli
            kode_menu {
              _id
              foto_menu
            }
          }
        }

        pelangganProfile(token: ${token}){
          kode_pelanggan
          peran
          password
          foto_pelanggan
          nama_pelanggan
          saldo
          email
          alamat
          kelas
          username
          kode_sekolah {
            nama_sekolah
          }
          notifikasi {
            _id
            tanggal_waktu
            notifikasi
            baca
          }
        }
      }`;
      return client.query({ query: query})
}

export const queryKantinDanMenu = (token) => {
    // console.log('queryKantinDanMenu', token)
  token = '"' + token + '"'
  const query = gql`
  {
    listMyKantin(token: ${token}){
      nama_outlet
      kode_outlet
      no_telepon
      nama_pemilik
      foto_pemilik
      saldo
      status
      kode_kantin {
        _id
        tanggal_register
        nama_kantin
        no_telepon
        foto_kantin
      }
    }

    listMenuBySekolah(token: ${token}){
      _id
      tanggal_penetapan
      istirahat1
      istirahat2
      istirahat3
      senin
      selasa
      rabu
      kamis
      jumat
      sabtu
      minggu
      kode_menu {
        _id
        kode_kantin
        jenis_menu
        nama_menu
        foto_menu
        deskripsi
        tingkat_pedas
        zat_besi
        protein
        karbohidrat
        kkal
        kolesterol
        lemak
        b1
        harga{
          harga
          tanggal_penetapan
        }
        bahan {
          kode_bahan
          nama_bahan
          icon_bahan
        }
      }
      kode_outlet {
        kode_outlet
        nama_outlet
        no_telepon
        foto_pemilik
        nama_pemilik
        alamat_pemilik
        email_pemilik
        saldo
        status
        kode_perangkat
      }
    }
  }`;
  return client.query({ query: query})
}
