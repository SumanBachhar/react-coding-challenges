import { AccorItem } from "./AccorItem";

export const Accordion = (questionsObj) => {
  return (
    <>
      {questionsObj.questions.map((question) => (
        <AccorItem key={question.id} {...question} />
      ))}
    </>
  );
};
