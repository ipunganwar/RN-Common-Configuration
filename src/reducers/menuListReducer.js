const defaultState = {
  menuList: { listMyKantin: [], menuBySekolah: []}
}


const MenuList = (state=defaultState, action) => {
  switch (action.type) {
    case 'SetMenuList':
      var data = {...state, menuList: action.payload.listMenuBySekolah}
      return data
    case 'SetAllMenu':
      var listMyKantin = [...action.payload.listMyKantin]
      var menuBySekolah = [...action.payload.listMenuBySekolah]
      var data = {...state, menuList: {listMyKantin: listMyKantin, menuBySekolah: menuBySekolah} }
      return data
    default :
      return state
  }
}

export default MenuList
