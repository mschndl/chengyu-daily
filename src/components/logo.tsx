export function Logo({ size = 34 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 56 56"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="成語 Chengyu Daily"
        >
            <circle cx="28" cy="28" r="28" fill="#c0392b" />
            <circle
                cx="28"
                cy="28"
                r="22"
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="0.8"
            />
            <text
                x="28"
                y="21"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="Noto Serif SC, serif"
                fontSize="13"
                fontWeight="700"
                fill="white"
            >
                成
            </text>
            <text
                x="28"
                y="35"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="Noto Serif SC, serif"
                fontSize="13"
                fontWeight="700"
                fill="white"
            >
                語
            </text>
        </svg>
    );
}