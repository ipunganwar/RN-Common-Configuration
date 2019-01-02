export const dateOnly = (date) => {
  let returnedDate = 0
  switch (date) {
    case 'Januari':
        returnedDate = 1
      break;
    case 'Februari':
        returnedDate = 2
      break;
    case 'Maret':
        returnedDate = 3
      break;
    case 'April':
        returnedDate = 4
      break;
    case 'Mei':
        returnedDate = 5
      break;
    case 'Juni':
        returnedDate = 6
      break;
    case 'Juli':
        returnedDate = 7
      break;
    case 'Agustus':
        returnedDate = 8
      break;
    case 'September':
        returnedDate = 9
      break;
    case 'Oktober':
        returnedDate = 10
      break;
    case 'November':
        returnedDate = 11
      break;
    case 'Desember':
        returnedDate = 12
      break;
    default:
  }

  return returnedDate
}

export function dateConverterHelper(date) {
  let returnedDate = ''
  let datify = new Date(date)
  switch (datify.getDay()) {
    case 0:
        returnedDate+='Minggu, '
      break;
    case 1:
        returnedDate+='Senin, '
      break;
    case 2:
        returnedDate+='Selasa, '
      break;
    case 3:
        returnedDate+='Rabu, '
      break;
    case 4:
        returnedDate+='Kamis, '
      break;
    case 5:
        returnedDate+='Jumat, '
      break;
    case 6:
        returnedDate+='Sabtu, '
      break;
    default:
  }
  returnedDate += datify.getDate().toString()
  switch (datify.getMonth()) {
    case 0:
        returnedDate+=' Jan '
      break;
    case 1:
        returnedDate+=' Feb '
      break;
    case 2:
        returnedDate+=' Mar '
      break;
    case 3:
        returnedDate+=' Apr '
      break;
    case 4:
        returnedDate+=' Mei '
      break;
    case 5:
        returnedDate+=' Jun '
      break;
    case 6:
        returnedDate+=' Jul '
      break;
    case 7:
        returnedDate+=' Ags '
      break;
    case 8:
        returnedDate+=' Sep '
      break;
    case 9:
        returnedDate+=' Okt '
      break;
    case 10:
        returnedDate+=' Nov '
      break;
    case 11:
        returnedDate+=' Des '
      break;
    default:
  }
  returnedDate+=datify.getFullYear()
  return returnedDate
}
