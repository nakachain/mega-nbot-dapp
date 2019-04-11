export const resolveLocation = (location) => {
  switch (location) {
    case '/': return 'Home'
    case '/ans': return 'Address Name Service'
    case '/mega-nbot': return 'MegaNBOT'
    default: return ''
  }
}
