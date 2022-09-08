
export function toTrimCase(obj:any) {
    for (const key in obj) {
        if (typeof obj[key] === "string") {
            obj[key] = obj[key].trim();
        }
    }
    return obj;
}

