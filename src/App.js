import DiaryEditor from "./DiaryEditor";
import "./App.css";
import DiaryList from "./DiaryList";
import { useRef, useState } from "react";

// const dummyList = [
//   {
//     id: 1,
//     author: "백재원",
//     content: "sdadad",
//     created_date: new Date().getTime(),
//     emotion: 1,
//   },
//   {
//     id: 2,
//     author: "백재원",
//     content: "sdadad",
//     created_date: new Date().getTime(),
//     emotion: 1,
//   },
//   {
//     id: 3,
//     author: "백재원",
//     content: "sdadad",
//     created_date: new Date().getTime(),
//     emotion: 1,
//   },
//   {
//     id: 4,
//     author: "백재원",
//     content: "sdadad",
//     created_date: new Date().getTime(),
//     emotion: 1,
//   },
// ];

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  // 새로운 일기를 추가하는 함수
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} />
    </div>
  );
}

export default App;
