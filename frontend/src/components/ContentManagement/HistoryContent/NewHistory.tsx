import { useState } from "react";
import { addPost } from "../../../state/history/historySlice";
import { useDispatch } from "react-redux";

export const NewHistoryPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const dispatch = useDispatch();
  function submitFn() {
    const id = "1";
    const newPost = { id, title, content, summary };
    dispatch(addPost(newPost));
  }

  const flexElementCss =
    "bg-gray-500 border-yellow-900 dark:border-yellow-900 rounded resize-y";
  return (
    <div
      className={
        "flex flex-col  h-auto border border-yellow-900 rounded-lg dark:bg-gray-800 dark:border-yellow-900"
      }
    >
      <label>Title</label>

      <textarea
        rows={2}
        className={flexElementCss}
        defaultValue="New Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></textarea>
      <label>Content</label>

      <textarea
        rows={5}
        className={flexElementCss}
        defaultValue="New Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <label>Summary</label>

      <textarea
        rows={2}
        className={flexElementCss}
        defaultValue="New Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      ></textarea>

      <button className="hover:bg-green-800" onClick={submitFn}>
        Submit
      </button>
    </div>
  );
};
