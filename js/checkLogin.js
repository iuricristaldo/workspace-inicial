//Obtengo el objeto usuario-loggeado de la session y valido que efectivamente haya un usuario loggeado

if (localStorage.getItem("usuario-loggeado") === null) {
    window.location.href = "login.html"; // redirecciona hacia login.html si el valor de la clave "usuario-loggeado" es null
    console.log(localStorage.getItem("usuario-loggeado")); //console.log() usado para probar si el item se guardo en localStorage

}

document.getElementById("logout").addEventListener('click', function(e) {

    localStorage.removeItem("usuario-loggeado");
    window.location.href = "login.html";
    /* - Elimina el item "usuario-loggeado" que aloja el nombre de usuario ingresado en login.
         Se ejecuta al hacer click en el botón "Cerrar sesion" de id="logout"
       - Luego redirecciona hacia el login */
});