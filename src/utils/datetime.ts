export function parseDateString(dateString: string) {
    return new Date(dateString).toLocaleDateString()
}

export function parseTimeString(TimeString: string) {
    return new Date(TimeString).toLocaleTimeString()
}
