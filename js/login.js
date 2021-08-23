document.getElementById("loginbutton").addEventListener("click", function() {
    // hice click en el boton
    //Controlo nombre pass


    let usuarioLoggeado = document.getElementById("usuario").value;
    let passLoggeada = document.getElementById("pass").value;

    console.log(usuarioLoggeado)
    console.log(passLoggeada)

    if (usuarioLoggeado === "" || passLoggeada === "") {
        alert("ingrese usuario y contraseña")
        return;
    }

    sessionStorage.setItem("usuario-loggeado", usuarioLoggeado);
    window.location.replace("index.html");

});