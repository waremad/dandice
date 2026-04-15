const dice = document.getElementById("dice");

let rolling = false;
let x = 0;
let y = 0;

// 6面の「正しい安定姿勢」
const faces = [
  { x: 0,   y: 0 },     // 1
  { x: 180, y: 0 },     // 6
  { x: 0,   y: 90 },    // 3
  { x: 0,  y: -90 },    // 4
  { x: -90, y: 0 },     // 5
  { x: 90,  y: 0 },     // 2
];

function rollDice() {
  if (rolling) return;
  rolling = true;

  // 「投げた感」：ランダムな大きい回転
  let vx = Math.random() * 40 + 25;
  let vy = Math.random() * 40 + 25;

  if (Math.random() < 0.5) vx *= -1;
  if (Math.random() < 0.5) vy *= -1;

  let t = 0;

  function animate() {
    t++;

    // 回転中の挙動（減衰）
    x += vx;
    y += vy;

    vx *= 0.92;
    vy *= 0.92;

    // 軽い揺れ（物理っぽさ）
    x += Math.sin(t * 0.2) * 0.5;
    y += Math.cos(t * 0.2) * 0.5;

    dice.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;

    // 停止判定
    if (Math.abs(vx) < 0.3 && Math.abs(vy) < 0.3) {
      finish();
      return;
    }

    requestAnimationFrame(animate);
  }

  function finish() {
    // どの面が上になるか決定（これが物理的な“結果”）
    const face = faces[Math.floor(Math.random() * faces.length)];

    // ここで「必ず安定姿勢に吸着」
    dice.style.transition =
      "transform 0.8s cubic-bezier(0.2, 0.9, 0.2, 1)";

    x = face.x;
    y = face.y;

    dice.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;

    setTimeout(() => {
      rolling = false;
    }, 800);
  }

  animate();
}

dice.addEventListener("click", rollDice);