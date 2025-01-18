import { useDispatch, useSelector } from "react-redux";
import { BasePage } from "../../components/BasePage";
import { PostContent } from "../../components/ContentManagement/Content/PageContent";
import { AppDispatch, RootState } from "../../state/store";
import { NewPost } from "../../components/ContentManagement/Content/NewContent";
import { LoadingBouncer } from "../../components/Loading";
import { useEffect } from "react";
import { fetchPosts } from "../../state/posts/apiCalls";

export const CertificatePage = () => {
  const isEdittingState = useSelector(
    (state: RootState) => state.isEditing.isEditing,
  );
  const posts = useSelector((state: RootState) => state.postsState);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchPosts("certificate"));
  }, [dispatch]);

  return (
    <BasePage>
      <div className="grid items-start gap-y-20">
        {isEdittingState && <NewPost post_type="certificate"></NewPost>}
        {posts.isLoading && <LoadingBouncer />}
        {!posts.isLoading &&
          posts.content &&
          posts.content.map((certificate, index) => {
            return (
              certificate &&
              certificate.post_type === "certificate" && (
                <PostContent
                  id={certificate.id}
                  key={certificate.id}
                  post_type={certificate.post_type}
                  sort_num={index}
                  title={certificate.title}
                  summary={certificate.summary}
                  content={certificate.content}
                  img_url={certificate.img_url}
                  postOrder={certificate.post_order}
                />
              )
            );
          })}
      </div>
    </BasePage>
  );
};
