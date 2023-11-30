function getLast14Days() {
    let dates = [];
    // Get today's date at  00:00
    const today = new Date(); 
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    for (let i = 13; i >= 0; i--) { // Loop through the last 14 days
        const date = new Date(today);
        date.setDate(today.getDate() - i); // Subtract 'i' days from today
        dates.push(date); // Push the date  to the array
    }
    return dates;
}

export default getLast14Days