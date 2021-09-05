const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url) {
    var result = {};
    showSpinner();
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            result.status = 'ok';
            result.data = response;
            hideSpinner();
            return result;
        })
        .catch(function(error) {
            result.status = 'error';
            result.data = error;
            hideSpinner();
            return result;
        });
}



//Obtengo el objeto usuario-loggeado de la session y valido que efectivamente haya un usuario loggeado

if (localStorage.getItem("usuario-loggeado") === null) {
    window.location.href = "login.html"; // redirecciona hacia login.html si el valor de la clave "usuario-loggeado" es null


}

document.getElementById("logout").addEventListener('click', function(e) {

    localStorage.removeItem("usuario-loggeado");
    window.location.href = "login.html";
    /* - Elimina el item "usuario-loggeado" que aloja el nombre de usuario ingresado en login.
         Se ejecuta al hacer click en el botón "Cerrar sesion" de id="logout"
       - Luego redirecciona hacia el login */
});

document.addEventListener('DOMContentLoaded', function(e) {
    let usuario = localStorage.getItem("usuario-loggeado")
    document.getElementById("loggeduser").innerHTML = usuario
        // Muestra el nombre de usuario ingresado a la derecha de "Mi carrito"
});



document.addEventListener('DOMcontentloaded', function() {

    //Obtengo el objeto usuario-loggeado de la session y valido que efectivamente haya un usuario loggeado

    if (localStorage.getItem("usuario-loggeado") === null) {
        window.location.href = "login.html"; // redirecciona hacia login.html si el valor de la clave "usuario-loggeado" es null
    }

    document.getElementById("logout").addEventListener('click', function(e) {

        localStorage.removeItem("usuario-loggeado");
        window.location.href = "login.html";
        /* - Elimina el item "usuario-loggeado" que aloja el nombre de usuario ingresado en login.
             Se ejecuta al hacer click en el botón "Cerrar sesion" de id="logout"
           - Luego redirecciona hacia el login */
    });

    document.addEventListener('DOMContentLoaded', function(e) {
        let usuario = localStorage.getItem("usuario-loggeado")
        document.getElementById("loggeduser").innerHTML = usuario
            // Muestra el nombre de usuario ingresado a la derecha de "Mi carrito"
    });

});