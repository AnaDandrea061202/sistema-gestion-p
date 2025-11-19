document.addEventListener('DOMContentLoaded', () => {
    // 1. Reemplaza 'form-crear-banco' con el ID real de tu formulario de creación
    const formCrearBanco = document.getElementById('form-crear-banco');
    
    // Asume que tienes un div para mostrar mensajes de error/éxito
    const mensajeDiv = document.getElementById('mensaje-banco'); 

    if (formCrearBanco) {
        formCrearBanco.addEventListener('submit', async function(event) {
            event.preventDefault();

            // CLAVE 1: Obtener el token de autenticación
            const authToken = localStorage.getItem('authToken');
            
            if (!authToken) {
                alert('Error: No estás autenticado. Por favor, inicia sesión de nuevo.');
                window.location.href = 'index.html'; // Redirigir al login
                return;
            }

            // Obtener los datos del formulario
            const nombreBanco = document.getElementById('nombre').value; // Reemplaza 'nombre-del-banco' con el ID real de tu input

            const datosBanco = {
                // CLAVE 2: Mapear al nombre que el backend espera (generalmente 'name')
                name: nombreBanco 
                // Añade otros campos si tu backend los requiere, ej:
                // code: document.getElementById('codigo-banco').value 
            };

            const ENDPOINT_URL = 'http://localhost:8000/api/v1/banks'; 

            try {
                const response = await fetch(ENDPOINT_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // CLAVE 3: Enviar el token en la cabecera Authorization
                        'Authorization': `Bearer ${authToken}` 
                    },
                    body: JSON.stringify(datosBanco),
                });

                const result = await response.json();

                if (response.status === 200 || response.status === 201) {
                    // ÉXITO
                    alert('Banco creado exitosamente.');
                    // Puedes redirigir o limpiar el formulario aquí
                    formCrearBanco.reset(); 
                } else if (response.status === 401 || response.status === 403) {
                    // ERROR DE AUTORIZACIÓN (Token no válido, expirado, o usuario sin permiso)
                    alert('Acceso denegado. No tienes permisos para crear bancos o tu sesión expiró.');
                } else if (response.status === 422) {
                    // ERROR DE VALIDACIÓN
                    let erroresLista = '';
                    for (const campo in result.errors) {
                        erroresLista += `\n- ${campo}: ${result.errors[campo].join(', ')}`;
                    }
                    alert(`Error de Validación al crear el banco: ${erroresLista}`);
                } else {
                    // OTRO ERROR DEL SERVIDOR (500)
                    alert(`Error del servidor ${response.status}: ${result.message || 'Fallo desconocido.'}`);
                    console.error('API Error:', result);
                }

            } catch (error) {
                console.error('Error de red:', error);
                alert('No se pudo establecer la conexión con la API de bancos.');
            }
        });
    }
});