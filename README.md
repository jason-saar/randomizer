# Randomizer Microservice

## Description

A headless microservice that:\
&emsp;Generates a set of random numbers in the range of **min** and **max**.\
&emsp;Chooses a random item from a given list.\
&emsp;Can optionally apply weights to the items in the given list, making items more or less likely given their weight.

## Communication Contract

### Requesting Data

Send an HTTP POST to /random/numbers with a JSON request to receive a set of random numbers:

| Parameter | Type | Description |
|---|---|---|
| count | integer | The amount of random numbers to be returned **required** |
| minimum | integer | The minimum value of a random number **required** |
| maximum | integer | The maximum value of a random number **required** |

All parameters are required. The service is stateless and stores nothing between requests.

```javascript
const res = await fetch("http://localhost:5552/random/numbers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        count: 5,
        minimum: 1,
        maximum: 20
    })
});
```

Send an HTTP POST to /random/choice with a JSON request to receive a random item chosen from a list of given items:

| Parameter | Type | Description |
|---|---|---|
| items | array[str] | The list of items to be chosen from **required** |
| weights | array[int] | The weights of items in the given list |

Only items is required. The service is stateless and stores nothing between requests.

```javascript
const res = await fetch("http://localhost:5552/random/choice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        items: ["Potion of Healing", "Potion of Damage", "Potion of Slowness"],
        weights: [1, 3, 5]
    })
});
```

### Receiving Data

The microservice returns an HTTP response with a JSON object containing the requested result. For /random/numbers, it returns an array of randomly generated numbers. For /random/choice, it returns a randomly selected item from the list. If a weights array is provided, the selection reflects the weighting. Otherwise, if a request is missing necessary parameters or contains invalid data, the service returns an HTTP 400 error with a JSON object describing the error.

If the requested theme wordlist doesn't exist, or count is out of range, the service returns 400 with a JSON error object instead.

```json
const result = await res.json();

console.log(result);

{ "numbers": [7, 14, 3, 19, 11] } 

{
    "item": "Potion of Healing"
}

```

### UML Sequence Diagram

See randomizer.png in this repo
