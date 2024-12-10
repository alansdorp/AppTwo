import { useEffect, useState } from "react";
import { navigateToUrl } from "single-spa";

export default function Root({ PubSubFunctions }) {
  const [hash, setHash] = useState(window.location.pathname);
  const [counter, setCounter] = useState(0);
  const [bgColor, setBgColor] = useState("");
  const [text, setText] = useState("");
  useEffect(() => {
    window.addEventListener("popstate", () => {
      console.warn(window.location.pathname);
      setHash(window.location.pathname);
    });
    PubSubFunctions.subscribeLib("Click", (data, msg) => {
      setCounter(msg);
    });
    PubSubFunctions.subscribeLib("Color", (data, msg) => {
      setBgColor(msg);
    });
    PubSubFunctions.subscribeLib("Text", (data, msg) => {
      setText(msg.toUpperCase());
    });
  }, []);
  return (
    <>
      <div className="appTwo-container" style={{ backgroundColor: bgColor }}>
        <h1>Counter {counter}</h1>
        <h1 onClick={() => navigateToUrl("/two")}>Aplicación #2</h1>
        {hash === "/two" && (
          <>
            <button
              className="action-button"
              type="button"
              onClick={() => navigateToUrl("/")}
            >
              Volver
            </button>
          </>
        )}
        <h2>{text}</h2>
      </div>
    </>
  );
}
