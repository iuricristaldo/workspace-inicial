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

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
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

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productPriceHTML.innerHTML = product.cost + " " + product.currency; /* Muestra el precio y la moneda dentro del tag asignado*/
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;

            showImagesGallery(product.images);
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
    /*Función que permite agregar comentarios al clickear sobre el botón comentar*/
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