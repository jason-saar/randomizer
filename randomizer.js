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

app.listen(PORT, () =>{
    console.log(`Name Generator is running on port ${PORT}`);
});