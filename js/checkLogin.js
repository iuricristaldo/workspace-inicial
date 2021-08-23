//Obtengo el objeto usuario-loggeado de la session y valido que efectivamente haya un usuario loggeado

if (sessionStorage.getItem("usuario-loggeado") === null) {
    window.location.href = "login.html";
    console.log(sessionStorage.getItem("usuario-loggeado"));
}