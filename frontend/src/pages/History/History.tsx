import { useDispatch, useSelector } from "react-redux";
import { BasePage } from "../../components/BasePage";
import { PostContent } from "../../components/ContentManagement/Content/PageContent";
import { AppDispatch, RootState } from "../../state/store";
import { NewPost } from "../../components/ContentManagement/Content/NewContent";
import { LoadingBouncer } from "../../components/Loading";
import { useEffect } from "react";
import { fetchPosts } from "../../state/posts/apiCalls";

export const HistoryPage = () => {
  const isEdittingState = useSelector(
    (state: RootState) => state.isEditing.isEditing
  );
  const posts = useSelector((state: RootState) => state.postsState);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchPosts("history"));
  }, [dispatch]);

  return (
    <BasePage>
      <div className="grid items-start gap-y-20">
        {isEdittingState && <NewPost post_type="history"></NewPost>}
        {posts.isLoading && <LoadingBouncer />}
        {!posts.isLoading &&
          posts.content &&
          posts.content.map((history, index) => {
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
