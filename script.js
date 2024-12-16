let SLOTS_PER_REEL = 10; // 슬롯 개수 (0~9)
const SLOT_HEIGHT = 80;
let REEL_RADIUS = SLOT_HEIGHT / 2 / Math.tan(Math.PI / SLOTS_PER_REEL);
const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

let isRolling = true; // 슬롯이 현재 롤링 중인지 여부

function createSlots() {
  let slotAngle = 360 / SLOTS_PER_REEL;

  $('.slot').each(function (index) {
    let transform = 'rotateX(' + slotAngle * index + 'deg) translateZ(' + REEL_RADIUS + 'px)';
    this.style.transform = transform;
  });
}

function startRolling() {
  // 무한 롤링 효과
  if (isRolling) {
    TweenMax.to('#ring', 1, {
      rotationX: '+=360',
      ease: Power0.easeNone,
      onComplete: startRolling // 재귀적으로 반복 호출
    });
  }
}

function stopRolling() {
  let targetIndex = Math.floor(Math.random() * SLOTS_PER_REEL); // 랜덤으로 멈출 위치
  let finalAngle = 360 / SLOTS_PER_REEL * targetIndex;

  // 천천히 멈추는 애니메이션
  TweenMax.to('#ring', 3, {
    rotationX: '+=' + (1080 + finalAngle), // 3회전 후 정확한 위치에서 멈춤
    ease: Power4.easeOut,
    onComplete: () => {
      isRolling = false; // 롤링 상태 종료
    }
  });
}

$(document).ready(function () {
  createSlots();
  startRolling();

  $(document).on('keydown', function (event) {
    if (event.key === 'Enter' && isRolling) {
      stopRolling(); // 슬롯 머신 멈추기
    }
  });
});
