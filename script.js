let SLOTS_PER_REEL = 6;
const SLOT_HEIGHT = 80;
let REEL_RADIUS = SLOT_HEIGHT / 2 / Math.tan(Math.PI / SLOTS_PER_REEL);
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function createSlots() {
  var slotAngle = 360 / SLOTS_PER_REEL;

  $('.slot').each(function (index) {
    var transform = 'rotateX(' + slotAngle * index + 'deg) translateZ(' + REEL_RADIUS + 'px)';

    this.style.transform = transform;
  });
}

function goToIndex(index, duration, callback = null) {
  var angle = 360 / SLOTS_PER_REEL * index;
  TweenMax.to('#ring', duration, {
    rotationX: '+=' + -angle,
    ease: Power0.easeNone,
    onComplete: () => {
      if (callback) {
        callback();
      }
    } });

}

function appendNewSlots(nbSlots) {
  var oldEls = $('#ring').find('.slot');

  // SLOTS_PER_REEL = nbSlots;
  // REEL_RADIUS = (SLOT_HEIGHT / 2) / Math.tan(Math.PI / SLOTS_PER_REEL)

  for (i = 0; i < nbSlots; i++) {
    var el = document.createElement('div');
    el.className = 'slot';

    $(el).append('<p>' + LETTERS[i] + '</p>');
    var transform = 'rotateX(' + 360 / SLOTS_PER_REEL * i + 'deg) translateZ(' + REEL_RADIUS + 'px)';

    el.style.transform = transform;

    $('#ring').append(el);

    $(oldEls).remove();
  }
}

function newSearch() {
  goToIndex(SLOTS_PER_REEL * 3, 1.5, () => {
    appendNewSlots(10);
    goToIndex(SLOTS_PER_REEL, 0.5);
  });
}

$(document).ready(function () {
  createSlots();

  setTimeout(() => {
    newSearch();
  }, 2000);
});