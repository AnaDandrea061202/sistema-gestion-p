
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');


loginForm.addEventListener('submit', async (e) => {
    
    e.preventDefault(); 

    
    const email = emailInput.value;
    const password = passwordInput.value;

    console.log('Intentando iniciar sesión con:', email);

    try {
        
        // CORRECCIÓN CLAVE: Cambiado de 127.0.0.1 a localhost por si la red local lo requiere
        const response = await fetch('http://localhost:8000/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        
        if (response.ok) {
            
            const data = await response.json();
            
            
            console.log('Login exitoso. Token recibido.');
            
            
            localStorage.setItem('authToken', data.token); 
            
            
            const userRole = data.user.rol; 

            
            if (userRole === 'administrador') {
                window.location.href = '/dasboard.web.html';
            } else {
                window.location.href = '/dasboard.web.html';
            }

        } else {
            
            const errorData = await response.json();
            alert('Error en login: ' + (errorData.message || 'Credenciales incorrectas.'));
        }
    } catch (error) {
        
        console.error('Error de conexión:', error);
        alert('No se pudo conectar con el servidor');
    }
});