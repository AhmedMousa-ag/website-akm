import { useState } from "react";
// import { useDeletePostMutation } from "../../../state/posts/postsApiSlice";
import { LoadingBouncer } from "../../Loading";
import { NewPost } from "./NewContent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import { changeIsEditing } from "../../../state/basePage";
import VerifyAction from "../Modals/VerifyModal";
import { changeOpenModal } from "../../../state/modals/verifySlice";
import { deletePost } from "../../../state/posts/apiCalls";
// import { removePost } from "../../../state/posts/postsSlice";
type PostContent = {
  id: number;
  post_type: string;
  sort_num: number;
  title: string;
  summary: string;
  content: string;
};

export const PostContent = ({
  id,
  post_type,
  sort_num,
  title,
  summary,
  content,
}: PostContent) => {
  // If logged in show edit, delete
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [isVerifyModal, setIsVerifyModal] = useState(false);
  const isEdittingState = useSelector(
    (state: RootState) => state.isEditing.isEditing
  );
  const deleteState = useSelector((state: RootState) => state.postsState);
  // const [useDeleteHistory, { isLoading, isError }] = useDeletePostMutation();
  const dispatch = useDispatch<AppDispatch>();
  const token = localStorage.getItem("token");

  let cssMargin = "";
  if (sort_num % 2 === 0) {
    cssMargin = "ml-60 mr-10 " + cssMargin;
  } else {
    cssMargin = "mr-60 ml-10 " + cssMargin;
  }

  function toggleExpandContent() {
    setIsContentExpanded((prev) => !prev);
  }

  function onDeleteButton() {
    // useDeleteHistory(id).then(() => {
    dispatch(changeOpenModal(false));
    dispatch(deletePost({ id }));
    // });
  }

  function onEditButton() {
    dispatch(changeIsEditing(true));
  }
  const contentParagraph = !isContentExpanded ? summary : content;
  return (
    <>
      {isEdittingState ? (
        <div className="grid items-center">
          <NewPost
            id={id}
            post_type={post_type}
            titleCom={title}
            contentCom={content}
            summaryCom={summary}
          />
        </div>
      ) : (
        <div className="grid items-center">
          <VerifyAction
            message="Are you sure you want to delete?"
            isOpen={isVerifyModal}
            toggleIsOpen={() => {
              setIsVerifyModal((prev) => !prev);
            }}
            yesFn={onDeleteButton}
          />
          <div
            className={
              cssMargin +
              "border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-100 max-w-screen-lg"
            }
            key={`page_content${id}`}
          >
            {token && token !== "" && (
              <div className="text-sm  flex gap-2 justify-between">
                <button
                  onClick={onEditButton}
                  className="hover:bg-green-600 hover:border hover:rounded-md"
                >
                  Edit
                </button>
                <button
                  className="hover:bg-red-600 hover:border hover:rounded-md"
                  onClick={() => setIsVerifyModal(() => true)}
                >
                  Delete
                </button>
                {deleteState.isLoading && <LoadingBouncer />}
                {deleteState.error && <p>Error</p>}
              </div>
            )}
            <title>{title}</title>
            <p>{title}</p>
            {
              <button
                className="text-lg hover:bg-gray-600 rounded"
                onClick={toggleExpandContent}
              >
                {contentParagraph}
              </button>
            }
          </div>
        </div>
      )}
    </>
  );
};
