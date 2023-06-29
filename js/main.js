function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// set video image youtube
let reviewsSlideFrames = document.querySelectorAll('.shadow');
reviewsSlideFrames.forEach(figure => {
  let frameId = figure.dataset.src.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop();
  let imageReview = document.createElement('img');

  imageReview.src = `//img.youtube.com/vi/${frameId}/0.jpg`
  figure.appendChild(imageReview)

  figure.addEventListener('click', function(){
    window.open(
      figure.dataset.src,
      '_blank'
    );
    
  })
})

window.onload = function () {
  // js animations svg
  let rellax = new Rellax('.rellax');

  // image parallax hero block
  parallaxMouse({ elements: '.hero-image-block', moveFactor: 10, wrap: '.hero', perspective: '100px' })

  // logo animation 
  document.querySelectorAll('.logo-line').forEach(line => {
    line.style.animation = `one 40s linear forwards`
  })

  // line hero animation
  document.querySelector('.tr').style.animation = `moveApart 2s ease-in`;

  // characters on title animation
  let title = document.querySelector('.hero-title');
  let textTitle = document.querySelector('.hero-title').textContent;

  title.innerHTML = ``;

  textTitle.split('').forEach((char, index) => {
    let newchar = document.createElement('b');
    newchar.innerText = char;
    newchar.style.animation = `navLinksFade .5s ease forwards ${index / 50 + 0.4}s`
    title.appendChild(newchar)
  })

  // character on description hero animation
  let description = document.querySelectorAll('.hero-description')[1];
  let contentDescription = description.textContent.split('')
  description.innerHTML = ``

  async function addChars(descriptionHtml, content) {
    for (let i = 0; i < content.length; i++) {
      descriptionHtml.innerHTML += content[i]
      await sleep(i);
    }
  }

  addChars(description, contentDescription);

  // on click on li clicked on a inside
  document.querySelectorAll('.navbar-item').forEach(li => {
    li.addEventListener('click', function (e) {
      document.location = li.querySelector('.navbar-item-link').href
    })
  })

  // burger menu
  function burgerToggle() {
    let burger = document.querySelector('.burger'),
      navbarList = document.querySelector('.navbar-list'),
      navbarLinks = navbarList.querySelectorAll('.navbar-item');

    navbarLinks.forEach(link => {
      link.addEventListener('click', function(){
        document.documentElement.classList.remove('hidden')
      })
    })

    burger.addEventListener('click', function () {

      burger.classList.toggle('burger-toggle')
      navbarList.classList.toggle('navbar-active')
      document.documentElement.classList.toggle('hidden')

      navbarLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = ``
        } else {
          link.style.animation = `navLinksFade .5s ease forwards ${index / 7 + 0.4}s`
        }
      })
    })
  }

  burgerToggle()

  // plan section
  let planWrapper = document.querySelector('.plan-wrapper'),
    cards = planWrapper.querySelectorAll('.plan-card');

  planWrapper.innerHTML = ``

  Array.from(cards).slice(0, 6).forEach(card => {
    planWrapper.appendChild(card)
  })
  document.querySelector('.plan-button').addEventListener('click', function () {
    Array.from(cards).slice(6, cards.length + 1).forEach(card => {
      planWrapper.appendChild(card)
    })
    document.querySelector('.plan-button').remove()
  })

  // skills block
  const myTags = [
    'JavaScript', 'CSS', 'HTML',
    'Gulp', 'Webpack', 'React',
    'Api', 'Async', 'git',
    'Figma', 'React native', 'flex',
    'grid', 'bs', 'smartgrid',
    'ajax', 'TypeScript', 'SSR'
  ];

  let tagCloud = TagCloud('.skills-content', myTags, {
    radius: 300,
    maxSpeed: 'fast',
    initSpeed: 'slow',
    direction: 135,
    keep: true
  });

  document.querySelector('.skills-description').innerHTML += myTags.join(', ')

  // about block title animation
  let aboutTitle = document.querySelector('.about-text__title'),
    aboutTitleText = document.querySelector('.about-text__title').textContent;

  aboutTitle.innerText = ''

  aboutTitleText.split("").forEach(char => {
    let charSpan = document.createElement('span');
    charSpan.classList.add('about-char')
    charSpan.innerText = char
    if (char == ' ') {
      charSpan.style.marginRight = '10px'
    } else {
      charSpan.style.marginRight = '2px'
    }
    aboutTitle.appendChild(charSpan)
  })

  // about block timer
  let aboutItems = document.querySelectorAll('.about-text__item');
  let timerAboutDelay = 1800;

  function timerAboutText() {
    for (let index = 0; index < aboutItems.length; index++) {
      (function (i) {
        setTimeout(function () {
          // reset classes
          aboutItems.forEach(element => {
            element.classList.remove('about-text__item-active')
          });
          aboutItems[index].classList.add('about-text__item-active')
        }, i * timerAboutDelay)
      }(index))
    }
  }

  timerAboutText();
  (function () {
    setInterval(function () {
      timerAboutText()
    }, timerAboutDelay * aboutItems.length)
  }())

  // form sender

  const TOKEN   = '6100694283:AAFR4nnwi-4Yi46_526W3p_jl_kyKiDPzTk',
        CHAT_ID = '-1001973253736',
        URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  document.querySelector('.form-block').addEventListener('submit', function(e){
    e.preventDefault();

    axios.post(URI_API, {
      chat_id: CHAT_ID,
      parse_mode: 'html',
      text: `
        <b>Имя: ${this.name.value}</b>\n
        <b>Telegram: ${this.tg.value}</b>\n
        <b>Email: ${this.email.value}</b>\n
        <b>Опыт: ${this.exp.value}</b>\n
      `
    })
    .then((res) => {
      document.querySelector('.modal-wrapper').classList.add('open')
      this.name.value = ''
      this.tg.value = ''
      this.email.value = ''
      this.exp.value = ''
    })
    .catch((err) => {
      console.warn(err)
      alert('Что-то пошло не так, попробуйте ещё раз. Или напишите мне в телеграм @syr1tsa')
    })
    .finally(() => {
    })
  })

  document.querySelector('.btn-close ').addEventListener('click', function(e){
    e.preventDefault()
    document.querySelector('.modal-wrapper').classList.remove('open')
  })
}
