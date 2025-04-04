export function formatDateToWords(dateString) {
    if(!dateString) return "___ "
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const addOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return day + "th"; // Covers 4th to 20th
        const suffixes = ["st", "nd", "rd"];
        const lastDigit = day % 10;
        return day + (suffixes[lastDigit - 1] || "th");
    };

    const [year, month, day] = dateString.split("-").map(Number);
    return `${addOrdinalSuffix(day)} ${months[month - 1]} ${year}`;
}
