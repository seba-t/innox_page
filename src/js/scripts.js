(function() {
const navOnScroll = function() {
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    let sections = document.querySelectorAll('section');
    sections = Array.from(sections);
    sections.forEach(function(section) {
      const sectionRect = section.getBoundingClientRect();
      if ((scrollPosition + 100) >= sectionRect.top + scrollPosition && scrollPosition <=sectionRect.bottom + scrollPosition) {
        const nav = document.querySelector('.nav__list');
        let links = nav.querySelectorAll('a');
        links = Array.from(links);
        links.forEach(function(link) {
          const linkHref = link.getAttribute('href');
          const sectionId = '#' + section.id;
          if (linkHref == sectionId) {
            link.classList.add('nav__link--active');
          } else {
            link.classList.remove('nav__link--active');
          }
        });
      }
    });
  });
}

const menuScroll = function() {
  const scroll = new SmoothScroll('a[href*="#"]', {
    header: '.header',
    speed: 1000,
    before: function() {
      const checkbox = document.querySelector('#menuCheckbox');
      checkbox.checked = false;
    }
  });
}

const navBackground = function() {
  window.addEventListener('scroll', function() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 800) {
      const topOffset = window.pageYOffset;
      const header = document.querySelector('.header');
      if (topOffset >= 100) {
        header.classList.add('header--scroll')
      } else {
        header.classList.remove('header--scroll')
      }
    }
  });
}

const worksSelect = function() {
  const nav = document.querySelector('.works .nav');
  nav.addEventListener('click', function(e) {
    e.preventDefault();
    const tagClicked = e.target.innerHTML.split(' ').join('').toLowerCase()
    let worksGallery = document.querySelectorAll('.works .gallery__item');
    worksGallery = Array.from(worksGallery);
    worksGallery.forEach(function(worksGalleryItem) {
      if (tagClicked === 'all') {
        worksGalleryItem.classList.remove('isHidden');
      } else if (worksGalleryItem.dataset.tag === tagClicked) {
        worksGalleryItem.classList.remove('isHidden');
      } else {
        worksGalleryItem.classList.add('isHidden');
      }
    });
  });
}

const galleryItemIsActive = function() {
  let galleryItems = document.querySelectorAll('.gallery__item:not(.gallery__item--join)');
  galleryItems = Array.from(galleryItems);
  galleryItems.forEach(function(galleryItem, index) {
    galleryItem.addEventListener('click', function(e) {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 600) {
        if (galleryItem.classList.contains('isActive')) {
          if (e.target.tagName === 'BUTTON' || e.target.tagName === 'LI' || e.target.tagName === 'I') {
            return false
          } else {
            galleryItem.classList.remove('isActive')
          }
        } else {
          galleryItem.classList.add('isActive')
          galleryItems.forEach(function(galleryItemRemove, indexRemove) {
            if (indexRemove !== index) {
              galleryItemRemove.classList.remove('isActive')
            }
          });
        }
      }
    });
  });
}

const heroCarousel = function() {
  const slider = tns({
    container: '#heroCarousel',
    items: 1,
    autoplay: true,
    autoplayTimeout: 3000,
    speed: 700,
    controls: false,
    nav: false,
    autoplayButtonOutput: false,
    autoHeight: true
  });
  document.querySelector('#heroCarouselPrevBtn').addEventListener('click', function() {
    slider.goTo('prev');
  });
  document.querySelector('#heroCarouselNextBtn').addEventListener('click', function() {
    slider.goTo('next');
  });
}

const clientsCarousel = function() {
  const slider = tns({
    container: '#clientsCarousel',
    autoplay: true,
    autoplayTimeout: 3000,
    controls: false,
    nav: false,
    autoplayButtonOutput: false,
    freezable: false,
    responsive: {
        0:{
            items: 1
        },
        601:{
            items: 2
        },
        901:{
            items: 4,
        }
      },
    speed: 700,
    gutter: 100
  });
  document.querySelector('#clientsCarouselPrevBtn').addEventListener('click', function() {
    slider.goTo('prev');
  });
  document.querySelector('#clientsCarouselNextBtn').addEventListener('click', function() {
    slider.goTo('next');
  });
}

const inputHasValue = function() {
  const getSiblings = function(elem) {
    let siblings = [];
    let sibling = elem.parentNode.firstChild;
    for (; sibling; sibling = sibling.nextSibling) {
      if (sibling.nodeType !== 1 || sibling === elem) continue;
      siblings.push(sibling);
    }
    return siblings;
  };
  let inputs = document.querySelectorAll('input:not(#menuCheckbox):not(.button), textarea');
  inputs = Array.from(inputs);
  inputs.forEach(function(input) {
    input.addEventListener('keyup', function() {
      const inputValue = input.value;
      const inputSiblings = getSiblings(input);
      if (inputValue.length > 0) {
        inputSiblings.forEach(function(sibling) {
          sibling.classList.add('hasText');
        });
      } else {
        inputSiblings.forEach(function(sibling) {
          sibling.classList.remove('hasText');
        });
      }
    });
  });
}

const formValidate = function() {
  const constraints = {
    name: {
      presence: {
        message: '^Please provide username'
      },
      length: {
        minimum: 3,
        message: '^Username is too short(min.3)'
      },
    },
    email: {
      presence: {
        message: '^Please provide email address'
      },
      email: {
        message: '^Email is in wrong format'
      }
    }
  };

  document.querySelector('#contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    handleFormSubmit(this);
  });

  function handleFormSubmit(form){
    const values = validate.collectFormValues(form);
    const errors = validate(values, constraints);
    showErrors(form, errors || {});
    if(!errors) {
      return
    }
  };

  function showErrors(form, errors) {
    const inputs = form.querySelectorAll('input[name]');
    inputs.forEach(function(input) {
      showErrorForInput(input, errors && errors[input.name])
    });
  };

  function showErrorForInput(input, errors) {
    const formItem = clostestParent(input.parentNode, 'form__item');
    const messages = formItem.querySelector('.error-message');
    resetFormItem(formItem);
    if (errors) {
      formItem.classList.add('has-error');
      errors.forEach(function(error) {
        addError(messages, error);
      });
    }
  };

  function clostestParent(child,className) {
    if (!child || child == document) {
      return null
    }
    if (child.classList.contains(className)) {
      return child;
    } else {
      return clostestParent(child.parentNode, className);
    }
  };

  function resetFormItem(formItem) {
    formItem.classList.remove('has-error');
    formItem.classList.remove('has-success');
    const oldMessages = formItem.querySelectorAll('.help-block.error');
    oldMessages.forEach(function(el) {
      el.parentNode.removeChild(el);
    });
  };

  function addError(messages, error) {
    const block = document.createElement('p');
    block.classList.add('help-block');
    block.classList.add('error');
    block.innerHTML = error;
    messages.appendChild(block);
  };
}

  const init = function() {
      navOnScroll();
      menuScroll();
      navBackground();
      worksSelect();
      galleryItemIsActive();
      heroCarousel();
      clientsCarousel();
      formValidate();
      inputHasValue();
  }
    init();
})();


function googleMap() {
 const options = {
   zoom: 12,
   center: {
     lat: 52.31425,
     lng: 4.942861
   }
 }
 const map = new google.maps.Map(document.querySelector('#map'), options);
 const marker = new google.maps.Marker ({
   position: {
     lat: 52.31425,
     lng: 4.942861
   },
   map: map
 });
}
