// 마음 전하는 곳(디자인 논의 T110 · T112 · T120 · T131). 성함 · 계좌번호는 이산하가 준 실값입니다.
// 표시는 하이픈, 복사는 숫자만입니다. 행은 관계 · 계좌번호 · 은행 성함의 세 줄로 보입니다

export type AccountRow = { role: string; name: string; bank: string; num: string };
export type AccountGroup = { side: string; rows: AccountRow[] };

export const ACCOUNTS: AccountGroup[] = [
  {
    side: "신랑 측",
    rows: [
      { role: "신랑 아버지", name: "이종노", bank: "하나은행", num: "468-910199-62707" },
      { role: "신랑 어머니", name: "이은경", bank: "국민은행", num: "879602-01-133871" },
      { role: "신랑", name: "이산하", bank: "토스뱅크", num: "1001-6105-5173" },
    ],
  },
  {
    side: "신부 측",
    rows: [
      { role: "신부 아버지", name: "송영봉", bank: "삼성증권", num: "7084-1174-8301" },
      { role: "신부 어머니", name: "임인화", bank: "삼성증권", num: "7082-4708-9301" },
      { role: "신부", name: "송시야", bank: "국민은행", num: "879201-00-010006" },
    ],
  },
];
