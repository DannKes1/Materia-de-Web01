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

//$(document).ready(function () {
//$("#botao-trocar-texto").on("click", function () {
// let titulo = document.getElementById("titulo");

//  if (titulo.textContent === "texto trocado!") {
//  titulo.textContent = textoOriginal;
// } else {
//   textoOriginal = titulo.textContent;
//    titulo.textContent = "texto trocado!";
//   }
// });
//});

//let CorAtualBranca = true;

// atribui função trocar a cor
//$("#botao-trocar-cor").on("click", function () {
// if (CorAtualBranca) {
//  $("body").css("background-color", "blue");
//} else {
//  $("body").css("background-color", "white");
//}

//  CorAtualBranca = !CorAtualBranca;
//})

//pegar input e trocar o texto

$("#botao-somar-numeros").on("click", function () {
  let num1 = parseFloat($("#input-num1").val());
  let num2 = parseFloat($("#input-num2").val());
  let somar = num1 + num2;

// Verificar se ambos os números são válidos
if (!isNaN(num1) && !isNaN(num2)) {
  let somar = num1 + num2;
  $("#titulo").text(somar);
} else {
  alert("Por favor, preencha os campos numéricos corretamente.");
}
});
