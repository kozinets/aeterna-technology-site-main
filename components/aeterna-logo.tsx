type Props = {
  className?: string;
  title?: string;
};

export function AeternaLogo({ className, title = "Aeterna" }: Props) {
  return (
    <svg
      viewBox="0 10 900 214"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={title}
      className={`block w-auto ${className ?? ""}`}
    >
      <g transform="translate(-146 0)">
        <path
          d="M242 10 L146 216 L186 216 L261 58 L291 121 L233 157 L248 187 L306 154 L335 216 L374 216 L336 135 L378 112 L363 82 L322 103 L279 11 Z"
          fill="#4ADE80"
          shapeRendering="geometricPrecision"
        />
        <text
          x="410"
          y="216"
          fontSize="170"
          fontWeight="500"
          letterSpacing="-3"
          dominantBaseline="alphabetic"
          style={{
            fill: "#FFFFFF",
            fontFamily:
              "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif"
          }}
        >
          eterna
        </text>
      </g>
    </svg>
  );
}
