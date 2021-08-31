document.getElementById("loginbutton").addEventListener("click", function() {
    // Se asigna una función al boton "Iniciar sesión" de id="loginbutton". La cual se ejecuta al hacer click sobre el mismo.



    let usuarioLoggeado = document.getElementById("usuario").value;
    let passLoggeada = document.getElementById("pass").value;

    console.log(usuarioLoggeado) //usado para comprobar que usuarioLoggeado haya recibido algún valor
    console.log(passLoggeada) // usado para comprobar que passLoggeada haya recibido algún valor

    if (usuarioLoggeado === "" || passLoggeada === "") {
        alert("ingrese usuario y contraseña")
        return;
    }
    /*Si el nombre o la contraseña son campos vacíos no permite seguir, se emite una alerta */

    localStorage.setItem("usuario-loggeado", usuarioLoggeado);
    /*Cuando el usuario y la contraseña son ingresados se define el item "usuario-loggeado"
      que aloja el valor ingresado en el campo de usuario */
    window.location.href = "index.html";
    // Redirecciona a "index.html"


});