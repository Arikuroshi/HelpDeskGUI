export default function HexGraphic() {
  return (
    <svg viewBox="0 0 200 180" width="200" height="180" aria-hidden="true">
      <g opacity="0.13" fill="#d4590a">
        <polygon points="100,10 130,27 130,61 100,78 70,61 70,27" />
        <polygon points="140,34 170,51 170,85 140,102 110,85 110,51" />
        <polygon points="60,34 90,51 90,85 60,102 30,85 30,51" />
        <polygon points="100,78 130,95 130,129 100,146 70,129 70,95" />
        <polygon points="140,102 170,119 170,153 140,170 110,153 110,119" />
        <polygon points="60,102 90,119 90,153 60,170 30,153 30,119" />
      </g>
      <g opacity="0.35" fill="none" stroke="#d4590a" strokeWidth="1.2">
        <polygon points="100,10 130,27 130,61 100,78 70,61 70,27" />
        <polygon points="140,34 170,51 170,85 140,102 110,85 110,51" />
        <polygon points="60,34 90,51 90,85 60,102 30,85 30,51" />
        <polygon points="100,78 130,95 130,129 100,146 70,129 70,95" />
      </g>
      <polygon
        points="100,28 118,38 118,58 100,68 82,58 82,38"
        fill="#d4590a"
        opacity="0.85"
      />
      <text
        x="100"
        y="52"
        textAnchor="middle"
        fontSize="20"
        fill="white"
        fontFamily="sans-serif"
      >
        ⬡
      </text>
    </svg>
  );
}
