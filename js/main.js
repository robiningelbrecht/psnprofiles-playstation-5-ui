// Init clock.
document.querySelector('.time').innerHTML = moment().format('H:mm');

setInterval(() => {
  document.querySelector('.time').innerHTML = moment().format('H:mm');
}, 60000);

// Init Flickity.
let flkty_el = document.querySelector('.js-flickity')
let flkty = new Flickity(flkty_el, {
  contain: false,
  pageDots: false,
  prevNextButtons: false,
  percentPosition: false,
  imagesLoaded: true,
  cellAlign: 'left',
  draggable: true,
});
// Explicitly select first slide to trigger select event.
flkty.select(0);
// Focus Flickity on page load, to make sure arrow keys work.
flkty_el.focus();

// Init background.
let body = document.querySelector('body');
body.style.backgroundImage = 'url(' + flkty.cells[0].element.dataset.background + ')';

let slide_positions = flkty.cells.map((slide) => {
  return parseInt(slide.element.style.left, 10);
});

flkty.on('select', function (index) {
  // Set background.
  body.style.backgroundImage = 'url(' + flkty.cells[index].element.dataset.background + ')';

  // Reset positions of all slides to original.
  flkty.cells.forEach((slide, slide_index) => {
    let left = slide_positions[slide_index];
    slide.element.style.left = (left) + "px"
  })

  // Move all slides right to the selected one, 75px to the right.
  flkty.cells.slice(index + 1).forEach((slide, slide_index) => {
    let left = slide_positions[slide_index + index + 1];
    slide.element.style.left = (left + 75) + "px"
  })
});

// Event listener to slide to Flickity index on click.
document.querySelectorAll('.js-flickity .slide').forEach((cell, index) => {
  cell.addEventListener('click', () => {
    flkty.select(index);
  });
});

// Event listener to make sure Flickity is always focused to allow to use arrow keys.
document.querySelectorAll('*').forEach((el) => {
  el.addEventListener('click', () => {
    flkty_el.focus();
  });
});