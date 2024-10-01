// // Arquivo o qual fica o nosso JavaScript
// let textoOriginal = document.getElementById("titulo").textContent;

// document
//   .getElementById("botao-trocar-texto")
//   .addEventListener("click", function () {
//     let titutlo = document.getElementById("titulo");
//     debugger;

//     if (titutlo.textContent === "Texto trocado!") {
//       titutlo.textContent = textoOriginal;
//     } else {
//       textoOriginal = titutlo.textContent;
//       titutlo.textContent = "Texto trocado!";
//     }
//   });

$(document).ready(function () {
  $("#botao-trocar-texto").on("click", function () {
    let titulo = document.getElementById("titulo");

    if (titulo.textContent === "texto trocado!") {
      titulo.textContent = textoOriginal;
    } else {
      textoOriginal = titulo.textContent;
      titulo.textContent = "texto trocado!";
    }
  });
});

let CorAtualBranca = true

// atribui função trocar a cor
$("#botao-trocar-cor").on("click", function (){
if(CorAtualBranca){
    $("body").css("background-color", "blue")
}else{
    $("body").css("background-color", "white")
}

CorAtualBranca =!CorAtualBranca
})


//pegar input e trocar o texto 

$("#botao-alterar-texto").on("click", function(){
let novoTexto = $("#input-novo-texto").val()

if(novoTexto){
    $("#titulo").text(novoTexto)
}else{
    alert("Por favor, insira um texto.")
}

})