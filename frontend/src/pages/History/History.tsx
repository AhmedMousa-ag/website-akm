import { useSelector } from "react-redux";
import { BasePage } from "../../components/BasePage";
import { HistoryContent } from "../../components/ContentManagement/HistoryContent/HistoryContent";
import { RootState } from "../../state/store";
import { NewHistoryPost } from "../../components/ContentManagement/HistoryContent/NewHistory";

export const HistoryPage = () => {
  const posts = useSelector((state: RootState) => state.postsState);
  const isEdittingState = useSelector(
    (state: RootState) => state.isEditing.isEditing
  );

  return (
    <BasePage>
      <div className="flex flex-col justify-end	 gap-y-20">
        {isEdittingState && <NewHistoryPost />}
        {posts.map((history, index) => (
          <HistoryContent
            key={history.id}
            sort_num={index}
            title={history.title}
            summary={history.summary}
            content={history.content}
          />
        ))}
      </div>
    </BasePage>
  );
};
