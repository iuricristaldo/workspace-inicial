const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_SOLD_COUNT = "relevancia";
const ORDER_ASC_BY_PRICE = "Menor-a-Mayor"
const ORDER_DESC_BY_PRICE = "Mayor-a-Menor"
const searchBar = document.getElementById("searchbar");

var currentProductsArray = [];
var currentSortCriteria = undefined;
var minPrice = undefined;
var maxPrice = undefined;

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function(a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function(a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        });

    } else if (criteria === ORDER_BY_SOLD_COUNT) { // Ordena a los productos según relevancia, De más vendidos a menos vendidos
        result = array.sort(function(a, b) {

            if (a.soldCount > b.soldCount) { return -1; } // Si el "producto a" tiene mayor cantidad de artículos vendidos que el "producto b",  "producto a" se ubica antes en la lista 
            if (a.soldCount < b.soldCount) { return 1; } // Si el "producto a" tiene menor cantidad de artículos vendidos que el "producto b",  "producto b" se ubica antes en la lista 
            return 0;
        });

    } else if (criteria === ORDER_ASC_BY_PRICE) { //ordena de menor precio a mayor precio a los productos.
        result = array.sort(function(a, b) {

            if (a.cost < b.cost) { return -1; } //Si el costo del "producto a" es menor al del "producto b", ubica al "producto a" antes en la lista.
            if (a.cost > b.cost) { return 1; } //Si el costo del "producto a" es mayor al del "producto b", ubica al "producto b" antes en la lista.
            return 0; //si ambos costos son iguales no se efectuan cambios en el orden
        });

    } else if (criteria === ORDER_DESC_BY_PRICE) { //ordena de mayor precio a menor precio a los productos
        result = array.sort(function(a, b) {


            if (a.cost > b.cost) { return -1; } //Si el costo del "producto a" es mayor al del "producto b", ubica al "producto a" antes en la lista.
            if (a.cost < b.cost) { return 1; } //Si el costo del "producto a" es menor al del" producto b", ubica al "producto b" antes en la lista.
            return 0; //si ambos costos son iguales no se efectuan cambios en el orden
        });

    }

    return result;
}

function showProductsList() {
    //Agrega cada objeto de la lista JSON al DOM
    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];


        const searchString = searchBar.value.toLowerCase(); //convierte el valor ingresado en la barra de búsqueda a minúscula


        if (((minPrice == undefined) || (minPrice != undefined && product.cost >= minPrice)) && //Carga los elementos cuyo precio es >= minPrice, por defecto, o si no hay valor asignado no se filtra por precio mínimo
            ((maxPrice == undefined) || (maxPrice != undefined && product.cost <= maxPrice)) && //Carga los elementos cuyo precio es <= maxnPrice, por defecto, o si no hay valor asignado no se filtra por precio máximo
            (product.name.toLowerCase().includes(searchString) || product.description.toLowerCase().includes(searchString) || searchString === "")) {
            /* - product.name.toLowerCase() convierte el contenido de product.name a minúscula, si el string que ingresamos esta contenido en el nombre es filtrado 
               - product.description.toLowerCase() convierte el contenido deproduct.description a minúscula, si el string que ingresamos esta contenido en la descripción es filtrado
               - si el string es vacío se muestran todos los productos.
               El filtro se ejecuta mediante eventos de tecleo "keyup" .
             */

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` + product.name + `</h4>

                            <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                        <p class="mb-1">` + product.cost + "  " + product.currency + `</p>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("products-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray) { //función que toma como parámetro la lista de productos y un críterio de ordenamiento y devuelve la lista ordenada.
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray); //si la lista está definida le asigna un críterio de ordenamiento y la muestra. Por defecto está asignado ORDER_ASC_BY_NAME

    //Muestro los productos ordenados
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data); //por defecto le asigna el método de orden ORDER_ASC_BY_NAME cuando se cargan los datos de JSON a la página
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_NAME); //Al clickear sobre el botón "A-Z", el parámetro currentSortCriteria de la función sortAndShowProducts() pasa a ser ORDER_ASC_BY_NAME. Se ordenan alfabéticamente los productos presentes en la lista.
    });

    document.getElementById("sortDesc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_NAME); //Al clickear sobre el botón "Z-A", el parámetro currentSortCriteria de la función sortAndShowProducts() pasa a ser ORDER_DESC_BY_NAME. Se ordenan de la Z a la A los productos presentes en la lista.
    });

    document.getElementById("sortByCount").addEventListener("click", function() {
        sortAndShowProducts(ORDER_BY_SOLD_COUNT); //Al clickear el botón "Relevancia", el criterio de ordenamiento pasa a ser ORDER_BY_SOLD_COUNT.
    });

    document.getElementById("sortDescPrice").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_PRICE); //Al hacer click sobre el botón "Mayor Precio" de id="sortDescPrice" se establece el criterio de ordenamiento ORDER_DESC_BY_PRICE, que ordena de mayor a menor precio los artículos. 
    });

    document.getElementById("sortAscPrice").addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_PRICE); //Al hacer click sobre el botón "Menor Precio" de id="sortDescPrice" se establece el criterio de ordenamiento ORDER_ASC_BY_PRICE, que ordena de menor precio los artículos.
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterPriceMin").value = ""; // Establezco el valor "" al campo donde va el valor minimo
        document.getElementById("rangeFilterPriceMax").value = ""; // Establezco el valor "" al campo donde va el valor máximo

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList(); //Muestro la lista sin filtrar por precios
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function() {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minPrice = document.getElementById("rangeFilterPriceMin").value; //Obtengo el valor del campo de id="rangeFilterPriceMin"
        maxPrice = document.getElementById("rangeFilterPriceMax").value; //Obtengo valor del campo de id="rangeFilterPriceMax"

        if ((minPrice != undefined) && (minPrice != "") && (minPrice) >= 0) { //Si el valor ingresado en el campo de id="rangeFilterPriceMin" está definido y es >= que 0, minPrice toma ese valor
            minPrice = (minPrice);
        } else {
            minPrice = undefined; //sino minPrice queda indefinido
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (maxPrice) >= 0) { //Si el valor ingresado en el campo de id="rangeFilterPriceMax" está definido y es >= que 0, minPrice toma ese valor
            maxPrice = (maxPrice);
        } else {
            maxPrice = undefined; //sino maxPrice queda indefinido
        }

        showProductsList(); //Se muestra la lista una vez aplicados los filtros cuando hago click en el botón Filtrar de id="rangeFilterPrice"
    });

    searchBar.addEventListener('keyup', function(e) {
        //Cuando tecleo búsqueda se ejecuta la función showProductsList(), al mismo tiempo se aplica el filtro de busqueda
        showProductsList();

    });

});