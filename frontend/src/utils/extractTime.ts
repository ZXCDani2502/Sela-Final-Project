export function extractTime(dateString: string) {
    const date = new Date(dateString)
    const hours = padZero(date.getHours())
    const minutes = padZero(date.getMinutes())
    return `${hours}:${minutes}`
}

//pad single digit numbers with a leading zero
function padZero(num: number) {
    return num.toString().padStart(2, '0')
}
