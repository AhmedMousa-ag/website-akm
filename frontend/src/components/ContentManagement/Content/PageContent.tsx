import { useState } from "react";
import { LoadingBouncer } from "../../Loading";
import { NewPost } from "./NewContent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import { changeIsEditing } from "../../../state/basePage";
import VerifyAction from "../Modals/VerifyModal";
import { changeOpenModal } from "../../../state/modals/verifySlice";
import { deletePost } from "../../../state/posts/apiCalls";
import { BACKEDN_URL } from "../../../configs/constanst";
type PostContent = {
  id: number;
  post_type: string;
  sort_num: number;
  title: string;
  summary: string;
  content: string;
  img_url: string;
  postOrder: number;
};

export const PostContent = ({
  id,
  post_type,
  title,
  summary,
  content,
  img_url,
  postOrder,
}: PostContent) => {
  const [isVerifyModal, setIsVerifyModal] = useState(false);
  const isEdittingState = useSelector(
    (state: RootState) => state.isEditing.isEditing,
  );
  const deleteState = useSelector((state: RootState) => state.postsState);
  const dispatch = useDispatch<AppDispatch>();
  const token = localStorage.getItem("token");
  const cssMargin = " ";

  function onDeleteButton() {
    dispatch(changeOpenModal(false));
    dispatch(deletePost({ id }));
  }

  function onEditButton() {
    dispatch(changeIsEditing(true));
  }
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
            postOrder={postOrder}
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
            <article>
              <p className="text-2xl font-bold">{title}</p>
              {img_url ? (
                <img src={`${BACKEDN_URL}/${img_url}`} alt={post_type + id} />
              ) : (
                ""
              )}
              <p className="clear-left text-lg">{content}</p>
            </article>
          </div>
        </div>
      )}
    </>
  );
};
