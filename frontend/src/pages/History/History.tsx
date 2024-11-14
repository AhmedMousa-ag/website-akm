import { useDispatch, useSelector } from "react-redux";
import { BasePage } from "../../components/BasePage";
import { PostContent } from "../../components/ContentManagement/Content/PageContent";
import { RootState } from "../../state/store";
import { NewPost } from "../../components/ContentManagement/Content/NewContent";
import { useGetPostsQuery } from "../../state/posts/postsApiSlice";
import { LoadingBouncer } from "../../components/Loading";
import { addPostsArr } from "../../state/posts/postsSlice";
import { useEffect } from "react";

export const HistoryPage = () => {
  const { data, isLoading } = useGetPostsQuery("history");
  const isEdittingState = useSelector(
    (state: RootState) => state.isEditing.isEditing
  );
  const posts = useSelector((state: RootState) => state.postsState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoading && data) {
      dispatch(addPostsArr(data));
    }
  }, [data]);

  return (
    <BasePage>
      <div className="flex flex-col justify-end	 gap-y-20">
        {isEdittingState && <NewPost post_type="history"></NewPost>}
        {isLoading && <LoadingBouncer />}
        {!isLoading &&
          posts &&
          posts.map((history, index) => {
            return (
              history &&
              history.post_type === "history" && (
                <PostContent
                  id={history.id}
                  key={history.id}
                  post_type={history.post_type}
                  sort_num={index}
                  title={history.title}
                  summary={history.summary}
                  content={history.content}
                />
              )
            );
          })}
      </div>
    </BasePage>
  );
};
