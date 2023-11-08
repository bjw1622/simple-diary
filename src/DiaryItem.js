import React, { useEffect, useRef, useState } from "react";

const DiaryItem = ({ diaryList, onRemove, onEdit }) => {
  useEffect(() => {
    console.log(`${diaryList.id}번 째 아이템 렌더`);
  });
  const handleRemove = () => {
    if (window.confirm(`${diaryList.id}번째 일기를 정말 삭제하시겠습니까??`)) {
      onRemove(diaryList.id);
    }
  };

  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };
  const [localContent, setLocalContent] = useState(diaryList.content);
  const localContentInput = useRef();

  const handleQuitEdit = () => {
    console.log(diaryList.id);
    setIsEdit(!isEdit);
    setLocalContent(diaryList.content);
  };
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {diaryList.author} | 감정 점수 : {diaryList.emotion}
        </span>
        <br />
        <span className="date">
          {new Date(diaryList.created_date).toLocaleDateString()}
        </span>
      </div>
      <div className="content">
        {isEdit ? (
          <textarea
            onChange={(e) => {
              setLocalContent(e.target.value);
            }}
            ref={localContentInput}
            value={localContent}
          />
        ) : (
          <>{diaryList.content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button
            onClick={() => {
              if (localContent.length < 5) {
                localContentInput.current.focus();
                return;
              }
              if (window.confirm(`일기를 수정 하시겠습니까??`)) {
                onEdit(diaryList.id, localContent);
                setIsEdit(!isEdit);
              }
            }}
          >
            수정 완료
          </button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

DiaryItem.defaultProps = {
  diaryList: [],
};

export default React.memo(DiaryItem);
