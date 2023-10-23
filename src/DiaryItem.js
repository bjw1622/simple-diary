const DiaryItem = ({ diaryList }) => {
  return (
    <div className="DiaryItem">
      <div className="info" key={diaryList.id}>
        <span>
          작성자 : {diaryList.author} | 감정 점수 : {diaryList.emotion}
        </span>
        <br />
        <span className="date">
          {new Date(diaryList.created_date).toLocaleDateString()}
        </span>
      </div>
      <div className="content">{diaryList.content}</div>
    </div>
  );
};

DiaryItem.defaultProps = {
  diaryList: [],
};

export default DiaryItem;
