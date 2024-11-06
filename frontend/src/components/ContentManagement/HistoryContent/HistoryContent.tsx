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
  let cssMargin = "-52 ";
  if (sort_num % 2 === 0) {
    cssMargin = "mr" + cssMargin;
  } else {
    cssMargin = "ml" + cssMargin;
  }

  function toggleExpandContent() {
    setIsContentExpanded((prev) => !prev);
  }
  const contentParagraph = !isContentExpanded ? summary : content;
  return (
    <div
      className={
        cssMargin +
        "border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-100"
      }
      key={sort_num}
    >
      <title>{title}</title>
      <p>{title}</p>
      {
        <button className="text-lg" onClick={toggleExpandContent}>
          {contentParagraph}
        </button>
      }
    </div>
  );
};
