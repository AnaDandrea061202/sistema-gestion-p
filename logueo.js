// logueo.js

// ⭐ DATOS FIJOS PARA LOGIN INSTANTÁNEO ⭐
const EMAIL_CORRECTO = 'carlos@gmail.com';
const CLAVE_CORRECTA = '12345678';
const DASHBOARD_URL = './dasboard.web.html'; // URL de destino

const loginForm = document.getElementById('login-form'); 

if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value; 

        // 1. VALIDACIÓN
        if (email === EMAIL_CORRECTO && password === CLAVE_CORRECTA) {
            
            console.log('Login OK. Redirigiendo.');
            localStorage.setItem('authToken', 'success'); 
            
            // ⭐ REDIRECCIÓN INSTANTÁNEA (SIN setTimeout) ⭐
            window.location.href = DASHBOARD_URL; 
            
        } else {
            // Mostrar error si las credenciales fijas no coinciden
            alert('Error: Usa el usuario: prueba@ok.com y clave: 123');
        }
    });
}