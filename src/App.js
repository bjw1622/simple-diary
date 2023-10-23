import DiaryEditor from "./DiaryEditor";
import "./App.css";
import DiaryList from "./DiaryList";
import { useRef, useState } from "react";

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

  const onRemove = (targetId) => {
    const newDiarytList = data.filter((it) => {
      return it.id !== targetId;
    });
    setData(newDiarytList);
  };

  const onEdit = (targetId, newContent) => {
    const a = data.map((it) =>
      it.id === targetId ? { ...data, content: newContent } : it
    );
    setData(
      data.map((it) => {
        return it.id === targetId ? { ...it, content: newContent } : it;
      })
    );
  };
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
