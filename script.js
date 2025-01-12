// 행성 클릭 시 애니메이션 후 페이지 이동
document.getElementById('planet').addEventListener('click', function() {
  // 행성 크기 확장 애니메이션 시작
  document.getElementById('planet').style.transition = "transform 1s ease"; // 애니메이션을 부드럽게 하기 위해 transition 추가
  document.getElementById('planet').style.transform = 'scale(10)'; // 행성 크기 확대
  
  // 애니메이션 후 페이지 이동
  setTimeout(function() {
    window.location.href = 'creatures.html'; // creatures.html로 페이지 이동
  }, 1000); // 애니메이션이 1초 후 끝나면 페이지 이동
});

document.addEventListener("DOMContentLoaded", function() {
  // 전체 creature 요소들을 선택
  const creatures = document.querySelectorAll('.creature');

  // 각 creature 요소에 draggable 속성 및 ondragstart 이벤트 추가
  creatures.forEach(item => {
    item.setAttribute('draggable', 'true');
    item.addEventListener('dragstart', startDrag);
  });
});

let draggedItem = null;

// 드래그 시작 시 호출되는 함수
function startDrag(event) {
  draggedItem = event.target;  // 드래그된 요소를 추적
  event.dataTransfer.setData("text", event.target.id);  // 드래그 아이템의 ID 설정
}

// 드래그된 요소를 드롭할 수 있도록 설정
function allowDrop(event) {
  event.preventDefault();  // 기본 드롭 동작을 방지
}

// 드래그된 아이템을 드롭할 때 호출되는 함수
function drop(event) {
  event.preventDefault();  // 기본 동작 방지

  const dropZone = event.target;

  // 드롭할 수 있는 영역에 요소가 드래그되었을 때, 해당 요소의 자식으로 추가
  if (dropZone.classList.contains("creature") && draggedItem !== dropZone) {
    const temp = dropZone.innerHTML;
    dropZone.innerHTML = draggedItem.innerHTML;
    draggedItem.innerHTML = temp;
  }
}
