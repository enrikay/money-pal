export function GenerateISODate(date?: Date) {
    let datee: Date;
    if (date) {
        datee = new Date(date);
    } else {
        datee = new Date();
    }
    return datee.toISOString();
}
