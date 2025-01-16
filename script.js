let activeBox = null; // 현재 열려있는 박스를 추적

function showRandomBox(event, creatureId) {
  // 이미 열려있는 박스가 있으면 제거
  if (activeBox) {
    activeBox.remove();
    activeBox = null;
    return;
  }

  // 새 박스 생성
  const box = document.createElement('div');
  box.style.position = 'absolute';
  box.style.backgroundColor = 'black';
  box.style.color = 'white';
  box.style.padding = '15px';
  box.style.borderRadius = '5px';
  box.style.wordWrap = 'break-word';
  box.style.lineHeight = '1.6';
  box.style.fontSize = '14px';
  box.style.zIndex = '1000';

  // 생물 정보 가져오기
  const creatureData = getCreatureData(creatureId);
  box.innerText = creatureData;

  // 텍스트 크기에 맞춰 박스 크기 설정
  box.style.minWidth = '150px';
  box.style.maxWidth = '300px'; // 최대 너비 제한
  box.style.height = 'auto';

  // 클릭 위치 가져오기
  const mouseX = event.pageX;
  const mouseY = event.pageY;
  const viewportWidth = window.innerWidth;

  // 설명 박스가 오른쪽 화면 밖으로 나가지 않게 조정
  if (mouseX + 300 > viewportWidth) {
    box.style.left = `${mouseX - 310}px`; // 화면을 벗어나면 왼쪽으로 이동
  } else {
    box.style.left = `${mouseX}px`; // 기본 위치
  }

  // 박스가 화면 아래로 나가지 않게 조정
  const viewportHeight = window.innerHeight;
  const boxHeight = 150; // 예상 박스 높이
  if (mouseY + boxHeight > viewportHeight) {
    box.style.top = `${mouseY - boxHeight}px`; // 아래로 벗어나면 위로 이동
  } else {
    box.style.top = `${mouseY}px`; // 기본 위치
  }

  // 박스를 body에 추가
  document.body.appendChild(box);

  // 현재 박스를 activeBox로 저장
  activeBox = box;
}
// 생물 설명을 JSON에서 가져오는 함수 (예시 데이터)
function getCreatureData(creatureId) {
  const creatureInfo = {
    'creature1': '일리바르는 뚜렷한 팔다리 없이 흐르게 나타나는 4개의 가지를 가진 생물이다. 이 가지들은 유연하게 움직이며, 공중의 바람에 따라 흔들린다. 일리바르는 특유의 발광 능력을 지니고 있어 어두운 환경에서 은은한 빛을 발산하며, 이를 통해 다른 생물들과 교감을 한다.',
    'creature2': '스피라는 뤼게 대륙의 드넓은 초원에서 발견되는 독특한 풍기류 생물이다. 이 생물은 나선형으로 회전하며 공중을 떠다니는 모습을 보이며, 바람에 따라 유영한다. 스피라는 고지대의 강한 바람이 부는 지역을 선호하며, 기온과 바람의 흐름에 따라 빠르게 경로를 변경할 수 있다. 스피라는 대기 중 기체를 흡수해 생존하며, 번식 시 포자를 방출해 바람에 실려 멀리 퍼진다.',
    'creature3': '소라바는 뤼게 대륙의 초원에서 서식하고 있다. 이 생물은 지구의 소라와 비슷한 형태를 하고 있으며, 말랑말랑하고 투명한 몸 아래에는 다리들이 불규칙하게 달려 있다. 이 다리들은 바람에 따라 유연하게 흔들리며 나아간다. 만약 다리가 잘려도 5초 이내에 재빠르게 재생된다.',
    'creature4': '하트 스피어는 뤼게 대륙의 넓은 초원에서 살아가는 풍기류 생물로, 바람을 통해 에너지를 얻는 독특한 생명체다. 이들은 대체로 구형의 몸체를 가지고 있으며, 다채로운 색상의 반투명한 껍질로 덮여 있다. 이 껍질은 바람의 방향에 따라 빛을 반사하여 주변 환경과 조화를 이루며 변색된다. ',
    'creature5': '에어블룸은 뤼게 대륙의 넓은 초원에서 발견되는 독특한 풍기류 식물이다. 이 식물은 강한 바람이 부는 고지대에서 홀로 생존하며, 가지들은 마치 날개처럼 작용하여 바람의 흐름을 이용해 균형을 잡고 유연하게 이동한다. 에어블룸은 일반적인 지구의 식물과 달리 광합성을 하지 않으며, 공기 중의 산소를 흡수하여 에너지를 생성하는 독특한 생리학적 구조를 가지고 있다.',
    'creature6': '블로스파는 바람이 강하게 부는 뤼게  대륙의 평원이나 산악지대에 서식하는 생물이다. 중심에서 여러 개의 팔과 다리가 뻗어 나와 있으며, 각 끝은 부채 모양의 촉수로 이루어져 있다. 이 촉수는 바람의 방향을 감지하고 이동 방향을 조절하는 역할을 한다. 촉수에는 미세한 감각 세포가 있어 공기의 흐름을 느끼고 필요에 따라 모양을 바꿔 추진력을 얻는다. ',
    'creature7': '크렌트는 뤼게 대륙의 산악 지역과 협곡에서 서식하는 풍기류 생물이다. 크렌트는 긴 몸체와 깃털 같은 돌기를 가진 형태로, 주로 공기 중에 떠다니며 서식한다. 주변의 기압 변화나 바람 소리를 감지해 이를 반향하는 능력을 가지고 있다.',
    'creature8': '네벨리안은 타원형의 몸체를 가진 생물로, 양 옆에 각각 3개의 다리가 달려 있다. 온몸이 부드러운 털로 덮여 있어 매우 유연하게 움직일 수 있으며, 종종 나무 사이에서 둥둥 떠다니는 모습을 자주 보인다.',
    'creature9': '라이안 대륙에서 발견되는 네모리는 독특한 생태적 특성을 지닌 풍기류 생물이다. 양 옆이 울퉁불퉁하고 중간에 구멍이 뚫린 사각형의 이 식물은 작고 무리지어 생활하며, 주로 공중에서 떠다니는 특징을 가지고 있다. 꽃을 피우지 않으며, 생명 주기가 독특하여 죽은 후 다시 태어나 영생하는 특성을 지닌다.',
    'creature10': '이 생물의 이름은 갈꼬리로 라이안 대륙의 어두운 숲 속에서 주로 서식하며, 갈고리 같은 형태의 몸의 특성을 살려 나무나 덩굴에 매달려 생활한다. 머리와 꼬리의 구분이 힘들며 암광류 생물의 특성상 어두운 곳에 서식하기 때문에 시력이 아주 나쁘다. 때문에 갈고리같은 몸을 사용해 미세한 진동을 감지하며, 먹이를 찾고 위협을 피한다.',
    'creature11': '라이트로는 뤼게 대륙의 지하에 서식하는 암광류 생물이다. 이 생물은 가운데 동그란 몸체를 가지고 있으며, 세 개의 매우 긴 꼬불꼬불한 다리를 지니고 있다. 이러한 다리는 유연하게 움직여 주변 지형을 탐색하고, 이동할 때는 마치 춤추듯이 흔들리며 보이는 특징이 있다. 라이트로는 자체적으로 빛을 생성할 수 있는 능력을 가지고 있으며, 몸체의 일부에서 나오는 발광 물질 덕분에 어두운 환경에서도 주변을 환하게 밝힐 수 있다.',
    'creature12': '가르슈는 부기아 대륙의 얼음 동굴에서 서식하는 암광류 생물로, 차가운 환경에 완벽히 적응해 있다. 이 생물은 두 개의 얇은 다리를 가지고 있으며, 몸통은 길쭉하다. 가르슈의 외모는 마치 상어를 연상시키는 형태로, 빛나고 날카로운 이빨이 온 몸에 나있어 위압감을 준다. 그들은 강력한 턱을 지니고 있어 먹이를 쉽게 잡아먹을 수 있다.',
    'creature13': '겔리프는 어두운 라이안 대륙의 깊은 숲속에서 서식하는 생물이다. 이 생물은 지구의 인간처럼 두 발로 서 있을 수 있지만, 시력이 좋지 않아 주변을 거의 보지 못한다. 대신 겔리프는 발달한 후각과 청각을 통해 환경을 인식하며, 이를 통해 생존한다.',
    'creature14': '루미플랜트는 부기아 대륙의 얼음 동굴과 라이안 대륙의 어두운 숲에서 자생하는 신비로운 식물이다. 이 식물은 두 개의 더듬이를 가지고 있으며, 하나는 큰 나선형으로 말려져 있다. 이들은 빛을 발산하여 주변 생물들을 유인하는 독특한 특성을 지니고 있다. 빛에 이끌린 생물들은 루미플랜트의 주변으로 가까이 다가오고, 그 순간 나선형으로 말린 더듬이가 신속하게 펼쳐지며 먹이를 감싼다.',
    'creature15': '트리보아는 라이안 대륙의 깊고 어두운 동굴에 서식하는 생물이다. 이 생물은 지구의 뱀처럼 생긴 머리를 가지고 있으며, 세 개의 불가사의한 꼬리로 먹이를 포획한다. 트리보아는 머리로는 음식을 섭취하지 않고, 독성이 있는 꼬리로 먹이를 잡아 당겨 먹는다. 입이 3개이지만 소화기관은 하나이기 때문에 소화를 하지 못해 죽는 경우가 많다.',
    'creature16': '스파이크루는 라이안 대륙의 어두운 곳에서 서식하는 작은 생물이다. 이 생물은 민달팽이처럼 둥글고 부드러운 몸체를 가지고 있으며, 등에는 독이 있는 날카로운 가시가 나 있어 외부의 위협으로부터 자신을 보호한다. 귀는 지구의 토끼처럼 길고 두 개가 달려 있어 소리와 진동을 감지하는 데 도움을 준다.',
    'creature17': '미디니아는 암광류 생물 중 하나로, M자 모양의 독특한 형태를 지니고 있다. 이 생물은 꿈틀꿈틀거리며 매우 빠른 속도로 기어 다니고, 주변을 탐색한다. 자신의 몸에서 발산되는 빛을 통해 생존하며, 다른 암광류 생물들의 빛을 받아 에너지원으로 변환하는 능력을 가지고 있다.',
    'creature18': '루미나이트는 어두운 라이안 대륙의 깊은 숲속에 서식하는 독특한 생물이다. 머리는 화려한 꽃 모양으로 되어 있어 어두운 환경에서도 눈에 띄며, 다양한 색상으로 빛나는 꽃잎이 특징이다. 줄기 같은 유연한 몸체 아래에는 두 개의 가느다란 다리가 달려 있어 부드럽게 기어 다니며, 이 다리는 매우 민감하게 반응해 주변의 지형을 탐색하는 데 도움을 준다.',
    'creature19': '머셜은 뤼게 대륙의 전기 폭풍이 자주 발생하는 초원 지대에서 서식하는 자전류 생물로, 이곳의 강한 자기장과 전기 에너지를 흡수하며 살아간다. 이 생물은 저승사자를 연상케 하는 독특한 외형을 지니고 있는데, 머리는 버섯처럼 생겼고, 해파리 같은 몸통에 흐물흐물한 네 개의 긴 다리가 늘어져 있다.',
    'creature20': '스파르크론은 멘티라 행성에서 독특한 전기 에너지를 활용하는 자전류 생물이다. 몸체의 구조는 마치 번개가 갈라지는 형상을 하고 있으며, 체내에서 생성된 전기를 방출하거나 흡수하는 능력을 가지고 있다.',
    'creature21': '볼티서펜트는 뤼게 대륙의 번개가 자주 치는 평원에서 발견되는 자전류 생물로, 멘티라 행성에서 가장 강력한 전기 방출 능력을 지닌 생물 중 하나다. 긴 뱀과 닮은 몸통을 지닌 볼티서펜트는 머리가 도마뱀처럼 생겼고, 목 부분은 가느다란 선들이 얽혀 있어 마치 전류가 흐르는 것처럼 빛을 발한다. ',
    'creature22': '카일로리는 자전류 생물 중 하나로, 뤼게대륙의 초원에서 서식한다. 이 생물은 지구의 가오리와 유사하게 생겼지만 몸통과 꼬리 배치가 반대이다. 꼬리 부분은 넓고 울퉁불퉁한 형태를 가지고 있고 머리는 매우 길고 날카로워, 칼과 비슷한 정도이다. ',
    'creature23': '스파키 맨트레는 긴 목에 털뭉치를 올려놓은 듯한 머리를 가진 자전류 생물이다. 이 생물은 부기아 대륙의 얼음 동굴에서 주로 서식한다. 네 개의 짧은 다리가 나란히 배열되어 있어 이동 속도는 느리지만, 머리에서 방출하는 전기력은 매우 강력하다. ',
    'creature24': '비틀 클라운은 뤼게 대륙의 초원에서 발견되는 자전류 생물이다. 이들은 지구의 사슴벌레를 펼쳐놓은 듯한 생김새를 가지고 있으며, 몸 전체에 뿔 끝마다 동그란 구조가 있어 전류를 방출하고 감지하는 능력을 지닌다. 이 뿔들은 상대의 전기 신호를 탐지하는 센서 역할을 한다. ',
    'creature25': '톱해머는 부기아 대륙의 거친 번개 평야 지대에 서식하는 자전류 생물로, 지구의 망치상어와 같은 독특한 머리 모양을 가지고 있다. 머리 양쪽으로 넓게 퍼진 부분에서 전류를 방출해 천적이나 먹잇감을 공격하는 능력이 뛰어나며, 이 전기 방출은 방어 수단이자 자신감을 표현하는 방식이기도 하다. 팔이 길게 뻗어 있지만 별다른 기능을 하지 않아 점차 짧아지는 방향으로 진화하고 있으며, 이 팔은 일부 행동이나 균형을 잡는 용도로만 간혹 쓰인다. ',
    'creature26': '플라즈미언은 부기아 대륙의 험난한 암반 지형에서 서식하는 자전류 생물로, 이들은 독특하게 짝을 이루어 생활한다. 얼굴이 없는 매끈한 몸통에 네 개의 다리가 달려 있고, 꼬리가 없어 심플한 외형을 지닌 이 생물은 항상 크기가 큰 수컷과 작은 암컷이 함께 다닌다.',
    'creature27': '일레이크는 자전류 생물로, 부기아 대륙의 메마른 계곡 지대에 서식한다. 외형은 지구의 뱀과 비슷한 길다란 몸통에 얇고 긴 다리 6개가 달려 있어 빠르게 기어 다닐 수 있다. 온몸은 얇고 유연해 상대를 만나면 몸을 감아 조이고꼬리에서 생성된 전기로 공격한다. ',
    'creature28': '테이네는 멘티라 행성의 부기아 대륙에 서식하는 냉화류 생물로, 독특한 외형과 생존 방식을 가지고 있다. 검은색의 물결 모양 외피는 마치 나무의 뿌리나 가지처럼 뻗어 있으며, 기온에 따라 그 형태가 변형된다. 낮 동안에는 외피가 단단해지면서 두꺼운 보호층을 형성해 강렬한 햇빛과 열을 차단하고, 밤이 되면 외피가 부드러워지며 체온을 유지하는 데 도움을 준다.',
    'creature29': '마카스는 부기아 대륙에 서식하는 냉화류 생물로, 털이 없는 매끄러운 외형을 지니고 있다. 몸체는 지구의 매머드를 연상시키는 형태지만, 이 생물은 총 6개의 다리를 가지고 있어 안정된 자세로 이동한다. 마카스는 주로 무리를 지어 다니며, 각 개체는 다른 마카스와의 협력 관계를 통해 생존을 이어간다. ',
    'creature30': '크리스블루는 부기아 대륙에 서식하는 냉화류 꽃으로, 날카롭게 뻗은 잎과 가시가 특징인 독특한 형태를 가지고 있다. 이 꽃은 강한 추위 속에서도 활짝 피어나는 생명력을 지니며, 가늘고 긴 줄기가 공기 중의 냉기를 흡수해 내부의 온도를 조절한다. 낮 동안에는 차가운 바람을 흡수해 축적한 냉기를 밤에 천천히 방출하여 주변을 서늘하게 유지하는데, 이를 통해 적정 온도를 확보하여 스스로를 보호한다. ',
    'creature31': '마카라톤은 부기아 대륙에 서식하는 아주 작은 냉화류 생물로, 주로 무리지어 다니며 집단 생활을 한다. 이 생물은 둥글고 부드러운 몸체와 더듬이를 가지고 있어 주변 환경을 감지하는 능력이 뛰어나다. 더듬이를 통해 온도와 습도를 민감하게 감지하여 서식지 내에서 최적의 위치를 찾아다니며, 무리 내 다른 개체들과의 소통 수단으로도 사용된다. ',
    'creature32': '셀아는 멘티라 행성의 부기아 대륙에 서식하는 냉화류 식물이다. 이 식물은 길게 뻗어 나선형으로 휘어진 독특한 형태를 가지고 있으며, 마치 덩굴처럼 주변을 감아 올라간다. 셀아의 나선형 구조는 기온 변화에 대응하기 위한 적응 방식으로, 차가운 공기를 내부로 흡수하여 온도를 조절하는 능력이 탁월하다.',
    'creature33': '프로즈 플레임은 부기아 대륙에 서식하는 냉화류 생물로, 몸 전체에서 열기를 발산하는 독특한 특징을 지니고 있다. 이 생물은 눈이 없는 대신 주변 온도와 진동을 감지하는 능력이 있으며, 이를 통해 방향을 인지하고 이동한다. 이족보행이 가능하여 두 다리로 서서 균형을 잡고, 유연하게 움직일 수 있다. ',
    'creature34': '번래빌은 부기아 대륙에 서식하는 생물이다. 이 생물은 3개의 다리로 균형을 잡아 이동하며, 몸통 양옆에 있는 날개는 비행 기능이 없으나 체온 조절과 방어 목적으로 사용된다. 날개는 부드럽게 펼쳐져 있어 천적의 접근을 감지하면 몸을 크게 부풀려 위협적인 모습을 만든다.',
    'creature35': '퍼이더는 부기아 대륙의 혹독한 환경에 완벽히 적응한 생물로, 각 다리마다 있는 관절이 매우 유연하여 험난한 지형을 빠르게 이동할 수 있다. 다리 끝에 있는 가시 같은 털들은 미세한 진동을 감지해 천적이나 먹이의 접근을 빠르게 파악하는 데 도움을 준다. 퍼이더의 털은 방한 효과가 뛰어날 뿐만 아니라, 기온과 습도에 따라 색이 미묘하게 변하는 특성이 있어 주변 환경에 위장하거나 다른 개체들과 신호를 주고받는 수단으로 사용된다.',
    'creature36': '부에르퍼는 부기아 대륙에 서식하는 냉화류 생물로, 얼굴이 없다. 몸체에는 총 네 개의 다리가 있는데, 두 개는 위쪽, 두 개는 아래쪽에 위치하여 균형을 이루고 있다. 부에르퍼는 일반적인 이동 방식과 달리 옆으로 몸을 굴러다니며, 이 과정에서 다리가 마치 바퀴처럼 회전하여 빠르고 효율적인 이동이 가능하다.',
  };
  return creatureInfo[creatureId] || '설명 정보 없음';
}
