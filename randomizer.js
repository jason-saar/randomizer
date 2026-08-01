import express from "express";

const app = express();
const PORT = 5552;
app.use(express.json());

app.post("/random/numbers", (req, res) => {
    const { count, minimum, maximum } = req.body;

    // check that count, minimum and maximum are integers
    if (!Number.isInteger(count) || !Number.isInteger(minimum) || !Number.isInteger(maximum)) {
        return res.status(400).json({
            error: "count, minimum, and maximum must all be integers."
        });
    }

    // check that count is at least 1
    if (count < 1) {
        return res.status(400).json({
            error: "count must be at least 1."
        });
    }

    // check that maximum is greater than minimum
    if (minimum > maximum) {
        return res.status(400).json({
            error: "maximum must be greater than minimum."
        });
    }

    const numbers = []

    // push random number to numbers array count times
    for (let i = 0; i < count; i++) {
        const value = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
        numbers.push(value);
    }

    // respond with json containing numbers array
    res.json({ numbers });
});

app.post("/random/choice", (req, res) => {
    const { items, weights } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
            error: "items must be a non-empty array."
        });
    }

    if (!items.every(item => typeof item === "string")) {
        return res.status(400).json({
            error: "every item must be a string."
        })
    }

    let selectedItem;

    if (weights === undefined) {
        const randomIndex = Math.floor(Math.random() * items.length);
        selectedItem = items[randomIndex];
     } else {
        if (!Array.isArray(weights) || weights.length !== items.length) {
            return res.status(400).json({
                error: "weights must be an array with the same length as items."
            });
        }

        if (!weights.every(weight => Number.isInteger(weight) && weight > 0)) {
            return res.status(400).json({
                error: "all weights must be positive integers."
            });
        }

        const totalWeight = weights.reduce(
            (total, weight) => total + weight, 0);

        const randomValue = Math.random() * totalWeight;
        let runningTotal = 0;

        for (let i = 0; i < items.length; i++) {
            runningTotal += weights[i];

            if (randomValue < runningTotal) {
                selectedItem = items[i];
                break;
            }
        }
    }

    return res.json({
        item: selectedItem
    });
})

app.listen(PORT, () =>{
    console.log(`Name Generator is running on port ${PORT}`);
});