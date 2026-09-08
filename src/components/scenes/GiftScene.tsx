// Scene13 마음 전하는 곳(14쪽, T110 · T111 · T119 · T120 · T131). 행을 누르면 계좌번호(숫자만)가 복사됩니다
import { CopyIcon } from "@/components/ui/CopyIcon";
import { ACCOUNTS } from "@/content/accounts";

export function GiftScene({ onCopy }: { onCopy: (text: string, message: string) => void }) {
  return (
    <section id="gift" className="block story">
      <div className="sheet">
        <div className="sheet__head">
          <img className="sheet__mark" src="/intro/rose-seal.png" width={84} height={84} alt="" />
          <h2 className="sheet__title">마음 전하는 곳</h2>
        </div>
        <div className="sheet__body">
          <p className="sheet__text sheet__text--center">참석이 어려우신 분들을 위해 안내드립니다.</p>
          {ACCOUNTS.map((group) => (
            <div className="gift__group" key={group.side}>
              <h3 className="sheet__label">{group.side}</h3>
              {group.rows.map((row) => (
                <button
                  type="button"
                  className="account"
                  key={row.name}
                  aria-label={`${row.role} ${row.bank} ${row.name} ${row.num} 복사`}
                  onClick={() => onCopy(row.num.replace(/-/g, ""), "계좌번호를 복사했습니다")}
                >
                  <span className="account__text">
                    <span className="account__role">{row.role}</span>
                    <span className="account__num">{row.num}</span>
                    <span className="account__holder">
                      {row.bank} {row.name}
                    </span>
                  </span>
                  <span className="account__copy" aria-hidden="true">
                    <CopyIcon />
                    복사
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
