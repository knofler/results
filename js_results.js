// #Question 1 
function isNullOrEmpty(str) {
    let response = str === null ? true :
        str === "`${str}`" ? false :
            str === "" ? true :
                str === "null" ? false : false
    return response;
}
console.log("isNullOrEmpty(null) result is:: ", isNullOrEmpty(null) )

// #Question 2 
function* NumberIterator(num) {
    const arr = [];
    if (this > 0) {
        for (let i = 1; i <= this; i++){
            if (this % i == 0) {
                // yield i
                arr.push(i)
            }
            
        }
    }
    console.log("arr is ", arr)
} 

Number.prototype[Symbol.iterator] = NumberIterator
console.log(...60)


// #qQuestion 3
function getArr(a, b, c) {
    let arr = Object.keys(arguments).map((a) => arguments[a])
    try {
        arr.forEach((a) => {
            if (a < 0) {
                throw `InvalidTriangleException,${a}`
            }
        })

        const perimeter = arr.reduce((a, b) => a + b) / 2;
        const area = Math.sqrt(perimeter * ((perimeter - a) * (perimeter - b) * (perimeter - c)));
        if (isNaN(area)) {
            throw `InvalidTriangleException,Not a Valid Triangle`
        }
        console.log("perimeter is ", perimeter)
        console.log("area is ", area)
    } catch (e) {
    console.log("exception thrown is : : ", e)
  }

}   

getArr(3,4,5)

// #Question 4
// let data = [15, 14, 23, 42, 23, 42, 24, 44, 15, 35, 15, 16];
let data = [5, 4, 3, 2, 4, 5, 1, 6, 1, 2, 5, 4]

function findCommon(numbers) {
    let counted = numbers.reduce((acc, curr) => { 
        // console.log("acc is", acc)
        // console.log("curr is", curr)
        
        if (curr in acc) {
            
            // console.log(curr in acc)
            acc[curr]++;
            // console.log("acc in truthy is:: ",  acc[curr])
        } else {
            // console.log("acc in falsy is:: ",  acc[curr])
            acc[curr] = 1;
        }

        return acc;
    }, {});
    console.log("counted is", counted)
    console.log("sorted is",
        Object.keys(counted)
            .sort((a, b) =>counted[b] - counted[a]
        ).map((a) => {
            // console.log("a in map is", a)
            return { 'number': a, 'appeared': counted[a]}
        }))
}

findCommon(data)