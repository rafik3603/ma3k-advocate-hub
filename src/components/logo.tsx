
export function Logo() {
  return (
    <div className="flex justify-center my-2">
      <svg width="80" height="60" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
        <rect x="37" y="10" width="26" height="5" fill="#000" />
        <circle cx="50" cy="20" r="3" fill="#000" />
        <path d="M30 25 L50 20 L70 25 L70 30 L50 25 L30 30 Z" fill="#000" />
        <rect x="28" y="30" width="44" height="3" fill="#000" />
        <path d="M30 33 L30 60 L45 55 L55 55 L70 60 L70 33" fill="none" stroke="#000" strokeWidth="1" />
        <path d="M40 35 L40 50 L50 47 L60 50 L60 35" fill="none" stroke="#000" strokeWidth="1" />
      </svg>
    </div>
  );
}
