import { useDispatch, useSelector } from "react-redux";
import { BasePage } from "../../components/BasePage";
import { PostContent } from "../../components/ContentManagement/Content/PageContent";
import { AppDispatch, RootState } from "../../state/store";
import { NewPost } from "../../components/ContentManagement/Content/NewContent";
// import { useGetPostsQuery } from "../../state/posts/postsApiSlice";
import { LoadingBouncer } from "../../components/Loading";
// import { resetPostArr } from "../../state/posts/postsSlice";
import { useEffect } from "react";
import { fetchPosts } from "../../state/posts/apiCalls";

export const PersonalProjects = () => {
  const isEdittingState = useSelector(
    (state: RootState) => state.isEditing.isEditing
  );
  const posts = useSelector((state: RootState) => state.postsState);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchPosts("project"));
  }, [dispatch]);
  return (
    <BasePage>
      <div className="flex flex-col justify-end	 gap-y-20">
        {isEdittingState && <NewPost post_type="project"></NewPost>}
        {posts.isLoading && <LoadingBouncer />}
        {!posts.isLoading &&
          posts.content &&
          posts.content.map((project, index) => {
            return (
              project &&
              project.post_type === "project" && (
                <PostContent
                  id={project.id}
                  key={project.id}
                  post_type={project.post_type}
                  sort_num={index}
                  title={project.title}
                  summary={project.summary}
                  content={project.content}
                />
              )
            );
          })}
      </div>
    </BasePage>
  );
};
