export const getToday = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; // month index is zero based\

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return `${yyyy}-${mm}-${dd}`;
};

const formatSingleDigitInt = number => {
    if (number > 9 || number < -9) {
        return String(number);
    }

    return `0${number}`;
};

export const formatDate = timestamp => {
    let adjustedDate = new Date(timestamp);
    // subtract the difference between UTC and current time zone
    // adjustedDate = new Date(timestamp - adjustedDate.getTimezoneOffset()*60*1000);

    return `${adjustedDate.getFullYear()}-${formatSingleDigitInt(adjustedDate.getMonth()+1)}-${formatSingleDigitInt(adjustedDate.getDate())}`;
};