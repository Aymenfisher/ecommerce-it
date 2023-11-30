function formatNumber(num) {
    if (num >= 1e12) {
        return (num / 1e12).toFixed(2) + 'T'; // Convert to trillions
    } else if (num >= 1e9) {
        return (num / 1e9).toFixed(2) + 'B'; // Convert to billions
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(2) + 'M'; // Convert to millions
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(2) + 'K'; // Convert to thousands
    }
    return num.toString(); // Return the number as is if it's less than 1000
}

export default formatNumber