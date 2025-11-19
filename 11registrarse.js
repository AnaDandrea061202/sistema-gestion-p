/// registro.js

document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const clave = document.getElementById('clave').value;
    const confirmarClave = document.getElementById('confirmar_clave').value;
    const mensajeDiv = document.getElementById('mensajeRegistro');
    
   
    mensajeDiv.textContent = '';
    mensajeDiv.style.backgroundColor = 'transparent';

   
    if (clave !== confirmarClave) {
        mensajeDiv.textContent = 'Error: Las contraseñas no coinciden.';
        mensajeDiv.style.backgroundColor = '#f8d7da'; 
        return;
    }

    const userData = {
        nombre: document.getElementById('nombre').value,
        email: email,
        banco: document.getElementById('banco').value,
        clave: clave
    };


    
   
    const simulacion = 'exito'; 

    const respuestaMock = {
        exito: { status: 200, mensaje: "¡Registro exitoso! Redirigiendo..." }, 
        error: { status: 409, mensaje: "El correo electrónico o cédula ya se encuentran registrados." }
    };

    const resultado = simulacion === 'exito' ? respuestaMock.exito : respuestaMock.error;

   
    setTimeout(() => {
        if (resultado.status === 200) {
            mensajeDiv.textContent = resultado.mensaje;
            mensajeDiv.style.backgroundColor = '#d4edda'; 
            
           
            window.location.href = 'index.html';
            
        } else {
            mensajeDiv.textContent = `Error ${resultado.status}: ${resultado.mensaje}`;
            mensajeDiv.style.backgroundColor = '#f8d7da';
        }
    }, 300);
   
});