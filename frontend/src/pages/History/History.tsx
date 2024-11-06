import { HistoryContent } from "../../components/ContentManagement/HistoryContent/HistoryContent";

const DEMO_DATA = [
  {
    id: "1",
    title: "This is a title",
    summary: "This is a summary content",
    content: "This is a detailed Content of this history",
  },
  {
    id: "2",
    title: "This is the second title",
    summary: "This is the second summary content",
    content: "This is the second detailed Content of this history",
  },
  {
    id: "3",
    title: "This is the third title",
    summary: "This is the third summary content",
    content: "This is the third detailed Content of this history",
  },
  {
    id: "4",
    title: "This is the third title",
    summary: "This is the third summary content",
    content: "This is the third detailed Content of this history",
  },
  {
    id: "5",
    title: "This is the third title",
    summary: "This is the third summary content",
    content: "This is the third detailed Content of this history",
  },
];

export const HistoryPage = () => {
  // if logged in show add at the top right

  return (
    <div className="flex flex-col justify-end	 gap-y-10">
      {DEMO_DATA.map((history, index) => (
        <HistoryContent
          key={history.id}
          sort_num={index}
          title={history.title}
          summary={history.summary}
          content={history.content}
        />
      ))}
    </div>
  );
};
