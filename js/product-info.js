var product = {};
var commentsArray = [];


function starScore(stars) {
    let number = parseInt(stars);
    let html = "";
    for (let i = 1; i <= number; i++) {
        html += '<i class="fa fa-star checked" aria-hidden="true"></i>';
        /*Agrega tantas estrellas naranjas como lo indique el parámetro, 
        en nuestro caso los parámetros que va a tomar la función son: comment.score y commentScore--> siempre están  entre 1 y 5 */
    }
    for (let j = number + 1; j <= 5; j++) {
        html += '<i class="fa fa-star " aria-hidden="true"></i>'
    }
    return html;
    /*En caso de que la cantidad de estrellas sea menor a 5 completa con estrellas negras hasta llegar a 5, de esta forma se muestran siempre 5 estrellas, donde las naranjas corresponden el puntaje*/


}


function showImagesGallery(array) {
    /*Agrega cada imagen a el html, el parámetro que toma para ejecutarse es el array: product.images , que contiene todas la imágenes del producto*/
    let htmlContentToAppend = "";


    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];


        if (i === 0) {
            htmlContentToAppend += `
            <div class="carousel-item active">
               <img src="` + imageSrc + `" class="d-block w-100" alt="...">
            </div>`
            document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;

        } else {
            htmlContentToAppend += `
            <div class="carousel-item ">
                <img src="` + imageSrc + `" class="d-block w-100" alt="...">
            </div>`

            document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;

        }

    }
};

function showComments() {
    /*Agrega cada comentario del array al html*/


    let htmlContentToAppend = "";
    for (let i = 0; i < commentsArray.length; i++) {
        let comment = commentsArray[i];
        htmlContentToAppend += `
        <div class="card w-auto" >
            <div class="card-body">
                <h5 class="card-title">${comment.user}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${comment.dateTime}</h6>
                <p class="card-text">${comment.description}</p>
                <p class="card-text" style="font-weight: bold;">Puntuación:</p>
                <p class="card-link mt-auto ">${starScore(comment.score)}</p>            
            </div>
        </div>
        `
    }

    document.getElementById("productComments").innerHTML += htmlContentToAppend;
};
showComments();


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productPriceHTML = document.getElementById("productPrice");
            let productSoldCountHTML = document.getElementById("soldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            var relatedProductsArray = product.relatedProducts; //Array con los indices de los productos relacionados [1,3]
            var productsArray = []; //Array donde seran cargados los productos desde PRODUCTS_URL

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productPriceHTML.innerHTML = product.cost + " " + product.currency; /* Muestra el precio y la moneda*/
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;


            showImagesGallery(product.images);



            getJSONData(PRODUCTS_URL).then(function(result) {
                if (result.status === "ok") {
                    productsArray = result.data;

                    //For que recorre el array de los elementos presentes en el array de productos relacionados
                    for (let i = 0; i < relatedProductsArray.length; i++) {
                        const relatedProd = relatedProductsArray[i];
                        console.log(relatedProd)

                        let htmlContentToAppend = "";
                        //For anidado que recorre el array de productos 
                        for (let j = 0; j < productsArray.length; j++) {
                            const prod = productsArray[j];
                            console.log(prod)
                            console.log(j === relatedProd)
                                //Si el indice j del producto coincide con un producto relacionado (1 o 3) se agrega al HTML
                            if (j === relatedProd) {
                                htmlContentToAppend += `
                                <div class="card" style="width: 18rem;">
                                <img src="${prod.imgSrc}" class="card-img-top" alt="...">
                                <div class="card-body">
                                  <p class="card-ext" style="font-weight: bold;">${prod.name}</p>
                                  <p class="card-text">${prod.description}</p>
                                  <p class="card-text">${prod.cost} ${prod.currency}</p>
                                  <p class="card-text"><small class="text-muted">${prod.soldCount} artículos vendidos.</small></p>
                                </div>
                              </div>`




                            }
                        }
                        document.getElementById("relatedProducts").innerHTML += htmlContentToAppend;
                    }
                }
            });



        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(result) {
        if (result.status === "ok") {
            commentsArray = result.data;
            /*Agrega los datos obtenidos al array commentsArray, luego ejecuta la función que agrega cada elemento al html*/
            showComments();


        }
    });

});

document.getElementById("addComment").addEventListener("click", function() {
    /*Función que permite agregar comentarios al clickear sobre el botón comentar de id "addComment"*/
    let htmltoappend = "";
    let texto = document.getElementById("text-area").value;
    let date = new Date();
    var fecha = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    /*La función .getmonth() devuelve un valor entre 0 y 11, con 0 correspondiente a enero 1 a febrero y así sucesivamente, por lo que es necesario aumentarle 1 para ubicar a los meses entre 1 y 12*/
    let commentScore = document.getElementById('scoreSelected').value;


    htmltoappend = `
    <div class="card w-auto">
        <div class="card-body">
            <h5 class="card-title">${localStorage.getItem("usuario-loggeado")}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${fecha}</h6>
            <p class="card-text">${texto}</p>
            <p class="card-text" style="font-weight: bold;">Puntuación:</p>
            <p class="card-link mt-auto ">${starScore(commentScore)}</p>            
        </div>
    </div>
    `;

    document.getElementById("productComments").innerHTML += htmltoappend;

});