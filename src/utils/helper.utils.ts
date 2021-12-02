import en from "../lang/en/error.lang"

/**
 * Timeout
 * 
 * @param ms 
 * @returns 
 */
export function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Sleep
 * @param fn 
 * @param args 
 * @returns 
 */
export async function sleep(fn: Function, ...args: any) {
    await timeout(3000);
    return fn(...args);
}

/**
 * Lang helper
 * 
 * @param key 
 * @returns 
 */
export function lang(key: string) {
    return en[key]
}