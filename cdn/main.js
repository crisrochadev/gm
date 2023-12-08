/**
 * SWIPPER
 */
$(function loadImg() {
  for (let i = 1; i <= 28; i++) {
    let url = `./cdn/img/project/${i}.jpg`;
   
    let img = new Image();
    img.src = url;
    img.alt = "Serviço realizado por metalúrgica GM - Rio Negrinho";
    img.title = "Serviço realizado por metalúrgica GM - Rio Negrinho";

    let article = document.createElement("article");
    article.classList.add('swiper-slide');
    article.appendChild(img);
    article.addEventListener("click", () => zoomImage(url));

    $(".swiper-wrapper").append(article);
  }
  let swiper = new Swiper(".mySwiper", {
  
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints:{
      640:{
        slidesPerView: 3,
        grid: {
          rows: 2,
        },
      }
    }
  });
  
});







const clientNumber = '5547992746144';
// const clientNumber = '5547992321879';

$(function () {
  $(".main_header_content_menu_mobile_obj").on("click", function () {
    $(".main_header_content_menu_mobile_sub").toggleClass("ds_none");
    $(this).toggleClass("main_header_content_menu_mobile_obj_active");
  });
});

window.addEventListener("scroll", function () {
  var menu = document.getElementById("main_header");
  var logo = document.getElementById("logo");
  var mainCta = document.querySelector(".main_cta");
  var rect = mainCta.getBoundingClientRect();

  if (rect.top < -(rect.height - 100)) {
    menu.classList.add("scroll");
    logo.src = "./cdn/img/logo_white.png";
  } else {
    menu.classList.remove("scroll");
    logo.src = "./cdn/img/logo.png";
  }
});

function zoomImage(url) {
  $("#zoom_image img").attr("src", url);
  $("#zoom_image").show();
}
$("#zoom_image button").on("click", function () {
  $("#zoom_image").hide();
});
$(document).on("click", function (event) {
  // Verifica se o clique não ocorreu dentro de um elemento img ou #zoom_image
  if (!$(event.target).is("img") && $(event.target).is("#zoom_image")) {
    $("#zoom_image").hide();
  }
});



function sendMessage(e, position = '') {
  // Obtém o valor do campo de telefone
  let phoneValue = $("#phone"+position).val();
  let nameValue = $("#name"+position).val();

  // Remove caracteres não numéricos
  let numericValue = phoneValue.replace(/\D/g, "");

  // Verifica se o número de telefone tem 11 dígitos
  if (numericValue.length !== 11 || nameValue === '') {
    let msg = "";
    if(numericValue.length !== 11){
      msg = msg + "O número de telefone deve ter 11 dígitos. "
    }
    if(nameValue === ''){
      msg = msg + "Por favor digite seu nome "
    }
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: msg,
    });
  } else {
    let text = `
      Olá me chamo ${nameValue}, e gostaria de pedir um orçamento!
    `
    // text = text.replace(/ /g, "$20");
    let url = `https://wa.me/${clientNumber}?text=${text}`;
    let timerInterval;
    let link = document.createElement('a');
    link.setAttribute("target", "_blank")
    link.href = url;
    $("#btn_send").append(link);
    Swal.fire({
      title: "Vamos enviar sua mensagem!",
      html: "Aguarde, estamos te direcionando! <b></b>",
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        link.click();
        Swal.close()
      }
    });
  }

  // Aqui você pode continuar com o restante do código para enviar a mensagem ou realizar outras ações
}

function sendMessage2(e){
  sendMessage(e,2)
}
$("#phone").on("input", function (e) {
  // Obtém o valor do campo de entrada
  let inputValue = $(this).val();

  // Remove caracteres não numéricos
  let numericValue = inputValue.replace(/\D/g, "");

  // Limita o número de caracteres a 11
  numericValue = numericValue.substring(0, 11);

  // Formata o número como (##) ####-####
  let formattedValue = "";
  for (let i = 0; i < numericValue.length; i++) {
    if (i === 0) {
      formattedValue += "(";
    } else if (i === 2) {
      formattedValue += ") ";
    } else if (i === 7) {
      formattedValue += "-";
    }
    formattedValue += numericValue[i];
  }

  // Atualiza o valor do campo de entrada
  $(this).val(formattedValue);
});

$("#phone2").on("input", function (e) {
  // Obtém o valor do campo de entrada
  let inputValue = $(this).val();

  // Remove caracteres não numéricos
  let numericValue = inputValue.replace(/\D/g, "");

  // Limita o número de caracteres a 11
  numericValue = numericValue.substring(0, 11);

  // Formata o número como (##) ####-####
  let formattedValue = "";
  for (let i = 0; i < numericValue.length; i++) {
    if (i === 0) {
      formattedValue += "(";
    } else if (i === 2) {
      formattedValue += ") ";
    } else if (i === 7) {
      formattedValue += "-";
    }
    formattedValue += numericValue[i];
  }

  // Atualiza o valor do campo de entrada
  $(this).val(formattedValue);
});
let totalheight = 0;
let isAtTop = true;

function getmoreimage() {
  let $imgsContainer = $("#services");
  let height = $imgsContainer.height();
  let containerHeight = $imgsContainer[0].scrollHeight;

  totalheight = totalheight + height;

  // Verificar se atingiu o fim do scroll antes do início da animação
  if (totalheight >= (containerHeight - 400)) {
    isAtTop = false;
    $("#icon_more").removeClass('icon-plus').addClass('icon-arrow-up2');
  } else {
    isAtTop = true;
    $("#icon_more").addClass('icon-plus').removeClass('icon-arrow-up2');
  }

  // Ao clicar no ícone alterado, executar a rolagem
  $("#icon_more").off("click").on("click", function() {
    if (!isAtTop) {
      totalheight = 0;
      $imgsContainer.scrollTop(0);
      isAtTop = true;
    }
  });

  // Se não estiver no topo, não iniciar a animação
  if (!isAtTop) {
    return;
  }

  // Iniciar a animação
  $imgsContainer.animate({
    scrollTop: totalheight
  }, 800);
}
