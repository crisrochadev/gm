window.addEventListener('scroll', function () {
    var menu = document.getElementById('main_header_content');
    var mainCta = document.querySelector('.main_cta');
    var rect = mainCta.getBoundingClientRect();
    
    if (rect.top <= 0) {
      menu.classList.add('scroll');
    } else {
      menu.classList.remove('scroll');
    }
  });