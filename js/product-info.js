var product = {};
var commentsArray = [];


function starScore(stars) {
    let number = parseInt(stars);
    let html = "";
    for (let i = 1; i <= number; i++) {
        html += '<i class="fa fa-star checked" aria-hidden="true"></i>';

    }
    for (let j = number + 1; j <= 5; j++) {
        html += '<i class="fa fa-star " aria-hidden="true"></i>'
    }
    return html;



}


function showImagesGallery(array) {

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
            productPriceHTML.innerHTML = product.cost + " " + product.currency;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;

            showImagesGallery(product.images);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(result) {
        if (result.status === "ok") {
            commentsArray = result.data;
            showComments();


        }
    });

});

document.getElementById("addComment").addEventListener("click", function() {
    let htmltoappend = "";
    let texto = document.getElementById("text-area").value;
    let date = new Date();
    var fecha = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
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