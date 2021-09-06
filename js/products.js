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

    } else if (criteria === ORDER_BY_SOLD_COUNT) {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);
            console.log(aCount)
            console.log(bCount)

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });

    } else if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function(a, b) {

            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });

    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function(a, b) {


            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });

    }

    return result;
}

function showProductsList() {
    //Agrega cada objeto de la lista JSON al DOM
    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];


        const searchString = searchBar.value.toLowerCase();

        if (((minPrice == undefined) || (minPrice != undefined && product.cost >= minPrice)) && //
            ((maxPrice == undefined) || (maxPrice != undefined && product.cost <= maxPrice)) &&
            (product.name.toLowerCase().includes(searchString) || product.description.toLowerCase().includes(searchString) || searchString === "")) {


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

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

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
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function() {
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("sortDescPrice").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortAscPrice").addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function() {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (minPrice) >= 0) {
            minPrice = (minPrice);
        } else {
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (maxPrice) >= 0) {
            maxPrice = (maxPrice);
        } else {
            maxPrice = undefined;
        }

        showProductsList();
    });

    searchBar.addEventListener('keyup', function(e) {
        //Cuando tecleo búsqueda se ejecuta la función showProductsList(), al mismo tiempo se aplica el filtro de busqueda
        showProductsList();

    });

});