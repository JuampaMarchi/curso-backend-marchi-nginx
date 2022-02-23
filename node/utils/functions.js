export const randomNum = (qty, array) => {
    for (let i = 0; i < qty; i++) {
        let num = Math.round(Math.random() * 1000)
        array.push(num)
    }
}