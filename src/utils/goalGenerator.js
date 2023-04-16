
function zfirst(size) {
    var flatGoal = []
    var arr2D = []
    for (var i = 0; i < size * size; i++) {
        flatGoal.push(i)
    }
    for (var i = 0; i < size; i++) {
        arr2D.push(flatGoal.slice(i * size, (i + 1) * size))
    }
    return arr2D
}
function create2DArray(size) {
    const arr = new Array(size);
    for (let i = 0; i < size; i++) {
        arr[i] = new Array(size).fill(0);
    }
    return arr;
}
function snail(size) {
    // create 2d array filled with zeros
    var goal = create2DArray(size)
    // colInc and rowInc determin the sign of the incrementer , because if we follow the path from 1 to size * size, the indices increment and decrement till they reach the center
    var colInc = 1
    var rowInc = 1

    // col and row are  the i, j indices 
    var col = 0
    var row = 0

    // step is the counter
    var step = 1

    // at the end of reach row or column  filling we switch the sign of the incrementer so that next time it will take the opposite way
    while (step < size * size) {
        while (col >= 0 && col < size && !goal[row][col]) {
            goal[row][col] = step
            col += colInc
            step++
        }
        colInc *= -1
        col += colInc
        row += rowInc
        while (row >= 0 && row < size && !goal[row][col]) {
            goal[row][col] = step
            row += rowInc
            step++
        }
        rowInc *= -1
        col += colInc
        row += rowInc

    }
    return goal
}


export function goalGenerator(type, size) {
    const funcs = { snail: snail(size), zfirst: zfirst(size) }

    return funcs[type]

}