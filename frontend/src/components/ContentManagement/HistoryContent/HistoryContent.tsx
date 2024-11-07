import { useState } from "react";

type HistoryContent = {
  sort_num: number;
  title: string;
  summary: string;
  content: string;
};
export const HistoryContent = ({
  sort_num,
  title,
  summary,
  content,
}: HistoryContent) => {
  // If logged in show edit, delete
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  let cssMargin = "";
  if (sort_num % 2 === 0) {
    cssMargin = "ml-60 mr-10 " + cssMargin;
  } else {
    cssMargin = "mr-60 ml-10 " + cssMargin;
  }

  function toggleExpandContent() {
    setIsContentExpanded((prev) => !prev);
  }
  console.log(cssMargin);
  const contentParagraph = !isContentExpanded ? summary : content;
  return (
    <div
      className={
        cssMargin +
        "border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-100 max-w-screen-lg"
      }
      key={sort_num}
    >
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
  );
};
