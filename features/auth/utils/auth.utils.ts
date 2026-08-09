export function NormalizerPhone(phone: string): string{
    let normalize = phone.trim();

    normalize = normalize.replace(/\s+/g, "");

    if(normalize.startsWith("+")){
        normalize = normalize.substring(1);
    }

    if(normalize.startsWith("0")){
        normalize = "62" + normalize.substring(1);
    }

    return normalize
}

