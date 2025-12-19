export function toFarsiDigits(value: string | number) {
    return value.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

