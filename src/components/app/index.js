import { useEffect, useState } from 'react';
import { factorial } from '../../utils';
import styles from './app.module.css'
import worker_script from "./worker.js";

var worker;

const App = () => {
    // States
    const [number, setNumber] = useState('');
    const [numberList, setNumberList] = useState([]);

    // Callbacks
    const addNumberList = () => {
        if (number < 0) {
            alert("Please Enter a positive number")
        } else {
            const numberToAdd = +number
            if (Number.isFinite(numberToAdd)) {
                setNumberList([...numberList, numberToAdd])
                setNumber('');
            }
        }
    }

    useEffect(() => {
        worker = new Worker(worker_script);
        worker.postMessage({ number });
        worker.onerror = (err) => err;
        worker.onmessage = (e) => {
            const { factNum } = e.data;
            console.log("worker result: ", factNum);
            // const resultDiv = document.createElement("div");
            // resultDiv.innerHTML = textCont(num, fibNum, time);
            // resultDiv.className = "result-div";
            // resultsContainer.appendChild(resultDiv);
        };
    }, [number])
    return (
        <div>
            <h2 className={styles.appTitle}>
                Factorial!
            </h2>
            <br />
            <label htmlFor="number">Enter a number from 0 to 9999</label>
            <input
                className={styles.numberInput}
                type="number"
                name="number"
                value={number}
                onChange={(event) => setNumber(event.target.value.slice(0, 4))}
            />
            <br />
            <button onClick={addNumberList}>Add For Calculation</button>
            <hr />
            <h2>Output</h2>
            <ul>
                {numberList.map(
                    (num) => <li key={num} className={styles.listItem}>
                        <strong>Result of {num}! is:</strong>
                        <br />
                        <code>{factorial(num).slice(0, 200)}...</code>
                        <button className={styles.smallButton} onClick={() => {
                            navigator.clipboard.writeText(factorial(num))
                        }}>Copy</button>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default App;
