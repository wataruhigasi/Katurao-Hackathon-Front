// import Link from "next/link";

const buttonStyle = {
  backgroundColor: "white", // 背景色をwhiteに修正
  position: "absolute", // タイポ修正
  top: "50%", // ボタンを垂直方向の中央に配置
  left: "50%", // ボタンを水平方向の中央に配置
  transform: "translate(-50%, -50%)" // ボタンを中央に寄せる
};

const Page = () => {
  return (
    <div style={{ backgroundColor: "green", height: "100vh", position: "relative" }}>
      <button style={buttonStyle}>スレッド作成</button>
    </div>
  );
};

export default Page;