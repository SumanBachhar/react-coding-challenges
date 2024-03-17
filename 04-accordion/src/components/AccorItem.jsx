import { useState } from "react";

export const AccorItem = (questionsObj) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHandler = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <>
      <section onClick={toggleHandler}>
        <h3>
          {questionsObj.title}
          {isOpen ? "-" : "+"}
        </h3>
        <div>{isOpen && <p>{questionsObj.info}</p>}</div>
      </section>
    </>
  );
};
