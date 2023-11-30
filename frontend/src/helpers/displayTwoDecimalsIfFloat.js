function displayTwoDecimalsIfFloat(number) {
    if (Number.isInteger(number)) {
        return number;
    } else {
        return Number(number.toFixed(2))
    }
}


export default displayTwoDecimalsIfFloat