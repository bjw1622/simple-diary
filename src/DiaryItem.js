const DiaryItem = ({ diaryList }) => {
  return (
    <div className="DiaryName">
      <div key={diaryList.id}>
        <div>작성자 : {diaryList.author}</div>
        <div>일기 본문 : {diaryList.content}</div>
        <div>감정 : {diaryList.emotion}</div>
        <div>작성 시간 : {diaryList.created_date}</div>
        <br />
      </div>
    </div>
  );
};

DiaryItem.defaultProps = {
  diaryList: [],
};

export default DiaryItem;
