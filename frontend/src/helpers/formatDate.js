const formatDate = {
    dateWithTime: (dateString) => {
        const options = {
            year: 'numeric',
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Europe/Paris' //  UTC+1 timezone
        };
        const date = new Date(dateString)
    
        const formattedDate = date.toLocaleString('en-GB', options);
    
        // Split the date string and rearrange the day and month
        const [day, month, yearAndTime] = formattedDate.split('/');
        const [year, time] = yearAndTime.split(',');
    
        // Rearrange and format the date as needed
        const rearrangedDate = `${day.trim()}/${month.trim()}/${year.trim()} - ${time.trim()} UTC+1`;
        return rearrangedDate
    },
    dateOnly : (dateString) => { //format date string to dd/mm/yyyy
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB')
    }
}

export default formatDate