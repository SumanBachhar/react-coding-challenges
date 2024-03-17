import { Accordion } from "./components/Accordion";
import questions from "./data";
// const { title, info } = questions;
const App = () => {
  return (
    <>
      <div className="App">
        <h1>Accordion Example</h1>
        <Accordion questions={questions} />
      </div>
    </>
  );
};

export default App;
