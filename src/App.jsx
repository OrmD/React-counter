import { useEffect, useState } from "react";
import "./index.scss";
import { useInputValue } from "./useInputValue";

function App() {
  const minValue = 0;
  const maxValue = 1000;
  const input = useInputValue();
  const numberInput = Number(input.value);
  const [counter, setCounter] = useState(0);
  const [items, setItems] = useState([]);
  const [margin, setMargin] = useState(0);

  const onClickResult = (event, numberInp) => {
    const classes = event.target.className;
    switch (true) {
      case classes.includes("minus") && counter !== minValue:
        setCounter((prevCount) => Math.max(prevCount - numberInp, minValue));
        break;
      case classes.includes("plus") && counter + numberInp <= maxValue:
        setCounter((prevCount) => Math.min(prevCount + numberInp, maxValue));
        break;
      case classes.includes("reset"):
        setCounter(0);
        break;
      default:
        break;
    }
  };

  const addItem = (newItem) => {
    const storedItems = localStorage.getItem("items");
    let currentItems = storedItems ? JSON.parse(storedItems) : [];
    const updatedItems = [...currentItems, newItem];
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const cleanUpItems = () => {
    setItems([]);
    localStorage.removeItem("items");
  };

  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
    const marginValue = String(maxValue).length * -5;
    setMargin(marginValue);
  }, [maxValue]);

  return (
    <div className="app">
      <div>
        <h2>Лічильник:</h2>
        <h1>{counter}</h1>
        <div className="math-buttons">
          <p>Min:{minValue}</p>
          <button
            className="minus"
            onClick={(event) => onClickResult(event, numberInput)}
            disabled={counter === maxValue}
          >
            - Мінус
          </button>
          <button
            className="plus"
            onClick={(event) => onClickResult(event, numberInput)}
          >
            Плюс +
          </button>
          <p className="max-value" style={{ marginRight: `${margin}px` }}>
            Max:{maxValue}
          </p>
        </div>
        <div className="func-button">
          <button
            className="reset"
            onClick={(event) => onClickResult(event, numberInput)}
          >
            Скинути
          </button>
          <button className="add" onClick={() => addItem(counter)}>
            Додати
          </button>
        </div>
        <h2 className="iput-text">Ведіть число для лічильника</h2>
        <input className="input-place" type="number" {...input}></input>
      </div>
      <div className="counter-form">
        <div className="counter-form__body">
          <h2>Список Лічильника</h2>
          {items.length !== 0 && (
            <>
              <ol className="counter-form__item-list">
                {items.map((item, index) => (
                  <li className={"counter-form__item"} key={index}>
                    {item}
                  </li>
                ))}
              </ol>
              <button className="clean-up" onClick={cleanUpItems}>
                Очистити
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
