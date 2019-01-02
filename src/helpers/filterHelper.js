// export function categoryFilter (category, data) {
//   if (category === 'Semua') {
//     return data
//   }
//   return data.filter((item) => item.category == category)
// }
export function dateFilter (data, dateNow) {
  let resultId = []
  let result = []
  for(let i = 0; i < data.length; i++) {
    let tanggalPenetapan = new Date(data[i].tanggal_penetapan)
      if (tanggalPenetapan <= new Date(dateNow)) {
        if (resultId.indexOf(data[i].kode_menu._id) == -1) {
          resultId.push(data[i].kode_menu._id)
          result.push(data[i])
        }
      }
  }
  return result
}

export function categoryFilter (category, data) {
  if (category === 'Semua') {
    return data
  }

  let kategori
  switch (category) {
    case 'Makanan':
      kategori = 1
      break
    case 'Minuman':
      kategori = 2
      break
    case 'Snack':
      kategori = 3
      break
  }

  return data.filter((item) => item.kode_menu.jenis_menu == kategori)
}

export function kantinFilter (kantin, data) {
  return data.filter(item => item.kode_outlet.nama_outlet.toLowerCase() === kantin.toLowerCase())
}
