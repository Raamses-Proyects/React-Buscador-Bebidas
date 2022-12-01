export function sincronizarStorage(nombre, array) {
    localStorage.setItem(nombre, JSON.stringify(array))
}