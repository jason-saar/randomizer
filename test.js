// Test valid request
const res = await fetch("http://localhost:5552/random/numbers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        count: 5,
        minimum: 1,
        maximum: 20
    })
});

const result = await res.json();

console.log(result);

// Test invalid request (count is not an integer)
const res2 = await fetch("http://localhost:5552/random/numbers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        count: 'h',
        minimum: 1,
        maximum: 20
    })
});

const result2 = await res2.json();

console.log(result2);

// Test invalid request (count is not at least 1)
const res3 = await fetch("http://localhost:5552/random/numbers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        count: 0,
        minimum: 1,
        maximum: 20
    })
});

const result3 = await res3.json();

console.log(result3);

// Test invalid request (maximum is less than minimum)
const res4 = await fetch("http://localhost:5552/random/numbers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        count: 5,
        minimum: 20,
        maximum: 1
    })
});

const result4 = await res4.json();

console.log(result4);
