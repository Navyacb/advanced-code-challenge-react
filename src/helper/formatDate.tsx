export const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options)
    return formattedDate
}