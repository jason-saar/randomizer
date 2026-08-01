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

// Test valid request (random choice)
const res5 = await fetch("http://localhost:5552/random/choice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        items: ["Potion", "Sword", "Shield"]
    })
});

const result5 = await res5.json();

console.log(result5);

// Test valid weighted request
const res6 = await fetch("http://localhost:5552/random/choice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        items: ["Common", "Rare", "Legendary"],
        weights: [70, 25, 5]
    })
});

const result6 = await res6.json();

console.log(result6);

// Test invalid request (missing items)
const res7 = await fetch("http://localhost:5552/random/choice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
});

const result7 = await res7.json();

console.log(result7);

// Test invalid request (empty items)
const res8 = await fetch("http://localhost:5552/random/choice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        items: []
    })
});

const result8 = await res8.json();

console.log(result8);

// Test invalid request (item is not a string)
const res9 = await fetch("http://localhost:5552/random/choice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        items: ["Potion", 42, "Shield"]
    })
});

const result9 = await res9.json();

console.log(result9);

// Test invalid request (weights length mismatch)
const res10 = await fetch("http://localhost:5552/random/choice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        items: ["Potion", "Sword", "Shield"],
        weights: [2, 5]
    })
});

const result10 = await res10.json();

console.log(result10);

// Test invalid request (negative weight)
const res11 = await fetch("http://localhost:5552/random/choice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        items: ["Potion", "Sword"],
        weights: [5, -1]
    })
});

const result11 = await res11.json();

console.log(result11);