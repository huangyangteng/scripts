const dayjs = require('dayjs')
const getDay = (time) => {
    return Number(dayjs(time).format('DD')) - 1
}
const getHour = (time) => {
    let hour = dayjs(time).hour()
    if (hour >= 0 && hour < 11) {
        return 0
    } else if (hour >= 11 && hour < 18) {
        return 1
    } else {
        return 2
    }
}

const daysInMonth = (time) => {
    return dayjs(time).daysInMonth()
}
const getNow=()=>{
    return dayjs().format('YYYY-MM-DD_HH:mm:ss')
}
module.exports = {
    getDay,
    getHour,
    daysInMonth,
    getNow
}
