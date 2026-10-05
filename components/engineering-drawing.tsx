export function EngineeringDrawing() {
  return (
    <svg
      className="engineering-drawing"
      viewBox="0 0 640 400"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1">
        <path d="M130 310V135L350 60L535 130V305L315 375Z M130 135L315 210L535 130 M315 210V375 M130 222L315 296L535 218 M165 148V321 M210 166V340 M260 187V358 M365 192V357 M415 173V338 M475 151V318 M130 310L350 235L535 305 M350 60V235" />
        <path
          d="M102 131V315 M94 131H110 M94 315H110 M137 343L305 409 M137 335V351 M305 401V417 M362 44L548 115 M357 38L367 50 M543 109L553 121"
          strokeDasharray="3 3"
        />
        <path
          d="M80 338L570 338 M315 25V390 M90 105L555 105"
          strokeDasharray="7 8"
          opacity=".5"
        />
        <circle cx="80" cy="338" r="10" />
        <circle cx="570" cy="338" r="10" />
        <circle cx="315" cy="25" r="10" />
      </g>
      <g fill="currentColor" fontFamily="monospace" fontSize="9">
        <text x="77" y="341">
          A
        </text>
        <text x="567" y="341">
          B
        </text>
        <text x="312" y="28">
          C
        </text>
        <text x="82" y="223" transform="rotate(-90 82 223)">
          LEVEL / 02
        </text>
        <text x="435" y="69" transform="rotate(21 435 69)">
          6000
        </text>
        <text x="370" y="389">
          CONCEPT / NOT TO SCALE
        </text>
      </g>
    </svg>
  );
}
