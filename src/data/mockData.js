export const FEED_DATA = [
  {
    id: 1,
    type: 'DANGER', // 확정된 위험
    author: '경찰청 공식',
    content: '[긴급] "아빠 나 폰 고장났어" 문자로 기프트카드 요구하는 사례 급증. 절대 보내지 마세요.',
    votes: 1240,
    date: '방금 전',
  },
  {
    id: 2,
    type: 'QUESTION', // 질문
    author: '김*자 님',
    content: '010-XXXX-XXXX 번호로 우체국 택배 반송됐다고 링크 누르라는데 이거 맞나요?',
    votes: 0,
    answers: { safe: 2, danger: 45 }, // 집단 지성 투표 현황
    date: '10분 전',
  },
  {
    id: 3,
    type: 'SAFE', // 안전 확인됨
    author: '안심지킴이',
    content: '국민건강보험공단 검진 안내 문자는 1577-1000 번호로만 옵니다. 확인하세요.',
    votes: 56,
    date: '1시간 전',
  },
];