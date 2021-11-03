function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

let arr = [];
for(let i = 0; i < 10000; i++){
    let place = {
        latitude: "" + getRandomArbitrary(-90, 90),
        longitude: "" + getRandomArbitrary(-180, 80)
    }
    arr.push(place);
}

console.log(JSON.stringify(arr));