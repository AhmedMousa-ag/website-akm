import { useState } from "react";
import {
  usePatchPostMutation,
  usePostPostMutation,
} from "../../../state/posts/postsApiSlice";
import { LoadingBouncer } from "../../Loading";
import { useDispatch } from "react-redux";
// import { RootState } from "../../../state/store";
import { changeIsEditing } from "../../../state/basePage";
import VerifyAction from "../Modals/VerifyModal";
import { changeOpenModal } from "../../../state/modals/verifySlice";
import { addPost, updatePost } from "../../../state/posts/postsSlice";

export const NewPost = ({
  post_type,
  id,
  titleCom,
  contentCom,
  summaryCom,
}: {
  post_type: string;
  id?: number;
  titleCom?: string;
  contentCom?: string;
  summaryCom?: string;
}) => {
  const [title, setTitle] = useState(titleCom ?? "");
  const [content, setContent] = useState(contentCom ?? "");
  const [summary, setSummary] = useState(summaryCom ?? "");
  const [postPostMutation, { isLoading }] = usePostPostMutation();
  const [isVerifyModal, setIsVerifyModal] = useState(false);
  const [
    usePatchPost,
    // { isLoading: isLoadingPatch, isError: isErrorPatch, error: errorPatch },
  ] = usePatchPostMutation();
  const dispatch = useDispatch();
  function submitFn() {
    const postData = { title, content, summary, post_type };
    if (titleCom) {
      // It means it's in editing state because it was passed from the parent
      const editedData = { id, data: postData };
      usePatchPost(editedData).then((response) => {
        if (response.data) {
          dispatch(changeIsEditing(false));
          // console.log(response.data.data);
          dispatch(updatePost({ ...editedData.data, id: id! }));
        }
      });
    } else {
      postPostMutation({ data: postData }).then((response) => {
        if (response.data) {
          dispatch(addPost(response.data.data));
          dispatch(changeIsEditing(false));
        }
      });
    }
  }
  function cancelButton() {
    dispatch(changeIsEditing(false));
  }

  const flexElementCss =
    "bg-gray-500 border-yellow-900 dark:border-yellow-900 rounded resize-y";
  return (
    <>
      <div className="grid items-center">
        <VerifyAction
          message="Are you sure you want to submit?"
          isOpen={isVerifyModal}
          toggleIsOpen={() => {
            setIsVerifyModal((prev) => !prev);
          }}
          yesFn={submitFn}
        />
        <div
          className={
            "flex flex-col  h-auto border border-yellow-900 rounded-lg dark:bg-gray-800 dark:border-yellow-900"
          }
        >
          <label>Title</label>

          <textarea
            rows={2}
            className={flexElementCss}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>
          <label>Content</label>

          <textarea
            rows={5}
            className={flexElementCss}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <label>Summary</label>

          <textarea
            rows={2}
            className={flexElementCss}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          ></textarea>
          {isLoading && <LoadingBouncer />}
          {/* {isError && <p>{error.error}</p>} */}
          <button
            className="hover:bg-green-800"
            onClick={() => {
              setIsVerifyModal(() => true);
            }}
          >
            Submit
          </button>
          <button className="hover:bg-red-600" onClick={cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};
