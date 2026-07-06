        // LÓGICA DE INTERFAZ: CONMUTACIÓN DE PANTALLAS

// Muestra el formulario de registro y oculta el de inicio de sesión
function mostrarRegistro() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("registroBox").style.display = "block";
    
    // Limpia los mensajes previos al cambiar de pantalla
    document.getElementById("mensajeLogin").innerHTML = "";
}

// Muestra el formulario de inicio de sesión y oculta el de registro
function mostrarLogin() {
    document.getElementById("registroBox").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
    
    // Limpia los mensajes previos al cambiar de pantalla
    document.getElementById("mensajeRegistro").innerHTML = "";
}

        //PROCESO DE REGISTRO DE USUARIOS
function registrar() {
    // Capturamos los datos ingresados eliminando espacios accidentales
    let usuario = document.getElementById("registroUsuario").value.trim();
    let password = document.getElementById("registroPassword").value;
    let mensaje = document.getElementById("mensajeRegistro");

    // Validación de campos vacíos
    if (usuario === "" || password === "") {
        mensaje.innerHTML = "⚠ Complete todos los campos";
        mensaje.style.color = "red";
        return; // Frena el proceso si falta información
    }

    //  Consultamos el almacenamiento local del navegador (LocalStorage)
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    //  Verificamos si el nombre de usuario ya está tomado por otra persona
    let existe = usuarios.find(u => u.usuario === usuario);

    if (existe) {
        mensaje.innerHTML = "⚠ Usuario existente";
        mensaje.style.color = "orange";
        return; // Frena el proceso si el nombre ya existe
    }
     
    // Agregamos el nuevo objeto de usuario al listado local
    usuarios.push({
        usuario: usuario,
        password: password
    });

    // Sincronizamos y guardamos la lista actualizada convirtiéndola a texto plano (JSON)
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // 7. Mostramos mensaje de éxito visual y limpiamos el formulario de registro
    mensaje.innerHTML = "✅ Usuario registrado correctamente";
    mensaje.style.color = "green";
    document.getElementById("formRegistro").reset(); // Truco limpio para borrar lo escrito

    //  Temporizador: Espera 1.5 segundos para que lean el mensaje y redirige al Login
    setTimeout(() => {
        mostrarLogin();
    }, 1500); 
}

    //PROCESO DE AUTENTICACIÓN / INICIO DE SESIÓN (LOGIN)
function login() {
    //  Capturamos las credenciales que el usuario intenta ingresar
    let usuario = document.getElementById("loginUsuario").value.trim();
    let password = document.getElementById("loginPassword").value;
    let mensaje = document.getElementById("mensajeLogin");

    //  Extraemos los registros guardados en la memoria del navegador
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscamos al usuario en la base de datos interna
    let encontrado = usuarios.find(u => u.usuario === usuario);

    //  Validación: El nombre ingresado no existe en el sistema
    if (!encontrado) {
        mensaje.innerHTML = "❌ Usuario no encontrado";
        mensaje.style.color = "red";
        return; // Frena el acceso
    }

    // Validación: El usuario existe pero la contraseña no coincide
    if (encontrado.password !== password) {
        mensaje.innerHTML = "❌ Usuario o contraseña incorrectos";
        mensaje.style.color = "red";
        return; // Frena el acceso
    }

    // Ocultamos toda la zona de autenticación trasera
    document.getElementById("authContainer").style.display = "none";

    //  Activamos y hacemos visible el panel de control del taller mecánico
    document.getElementById("dashboard").style.display = "block";

    // Inyectamos dinámicamente el nombre de la sesión activa en el Navbar
    document.getElementById("usuarioActivo").innerHTML = "👤 " + usuario;
}


 //CERRAR SESIÓN
function cerrarSesion() {
    // 1. Ocultamos el Panel del Taller
    document.getElementById("dashboard").style.display = "none";

    // 2. Volvemos a hacer visible la caja contenedora de accesos
    document.getElementById("authContainer").style.display = "flex";

    // 3. Reseteamos la vista por defecto en el Login
    mostrarLogin();

    // 4. Vaciamos los campos de texto del formulario y limpiamos las alertas viejas
    document.getElementById("formLogin").reset();
    document.getElementById("mensajeLogin").innerHTML = "";
}