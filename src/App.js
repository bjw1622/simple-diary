import DiaryEditor from "./DiaryEditor";
import "./App.css";
import DiaryList from "./DiaryList";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// https://jsonplaceholder.typicode.com/comments

const App = () => {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData((data) => [newItem, ...data]);
  }, []);

  const onRemove = useCallback((targetId) => {
    setData((data) => data.filter((it) => it.id !== targetId));
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    setData((data) =>
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  });

  // useMemo는 Memoization
  // 성능 최적화
  // 성능 향상을 위해서
  // 데이터의 전체 길이가 바뀔때만 getDiaryAnalysis를 호출해라!!
  // useMemo는 함수가 아닌 콜백함수의 값 리턴 값을 갖게 된다
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => {
      return it.emotion >= 3;
    }).length;

    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;

    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;
  return (
    <div className="App">
      {/* UseMemo로 성능 최적화 => 이 때 props가 객체 상태이면 값 비교 후 React Memo */}
      {/* <OptimizeTest /> */}
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
};

export default App;
