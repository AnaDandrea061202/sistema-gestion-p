function getUsers() {
    // Intenta obtener los usuarios, si no hay, devuelve un array vacío
    return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUsers(users) {
    // Guarda el array de usuarios en el almacenamiento local
    localStorage.setItem('users', JSON.stringify(users));
}