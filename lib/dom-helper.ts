export function validateValue<T>(value: T | null | undefined, error: string): T {
    if (value) {
        return value;
    } else {
        throw new Error(error);
    }
}

export function validateNode<T>(value: T | null, element: string, error = `Element ${element} is not found`): T {
    if (value) {
        return value;
    } else {
        throw new Error(error);
    }
}

const nullElArgError = 'Null el argument';

export function getNode<T extends Element>(el: NodeSelector | null, query: string) {
    return validateNode(validateValue(el, nullElArgError).querySelector(query), query) as T;
}

export function getNodeOrNull<T extends Element>(el: NodeSelector | null, query: string) {
    return el ? el.querySelector(query) as T | null : null;
}

export function getNodeList<T extends Element>(el: NodeSelector | null, query: string) {
    const nodes = validateValue(el, nullElArgError).querySelectorAll(query);
    return validateNode(nodes.length === 0 ? null : [...nodes], query) as T[];
}

export function getNodeListOrNull<T extends Element>(el: NodeSelector | null, query: string) {
    const nodes = el ? el.querySelectorAll(query) : null;
    return (nodes && nodes.length > 0 ? [...nodes] : null) as T[] | null;
}

export function getText(el: Element | null, query?: string): string {
    return validateValue((query ? getNode(el, query) : validateValue(el, nullElArgError)).textContent,  `TextContent of ${query} is null`).trim();
}

export function getTextOrNull(el: Element | null, query?: string): string | null {
    const node = query ? getNodeOrNull(el, query) : el;
    return node && node.textContent ? node.textContent.trim() : null;
}


export function getNum(el: Element | null, query?: string): number {
    return num(getText(el, query));
}

export function getNumOrNull(el: Element | null, query?: string): number | null {
    return numOrNull(getTextOrNull(el, query));
}


export function getAttr(el: Element | null, attr: string): string {
    return validateValue(validateValue(el, nullElArgError).getAttribute(attr),  `Attribute ${attr} is null`);
}


export function getAttrOrNull(el: Element | null, attr: string): string | null {
    return el && el.getAttribute(attr) || null;
}

export function getWithRegexp(str: string | null, regexp: RegExp): string {
    if (typeof str !== 'string') throw new Error(`${str} is not a string`);
    return validateValue(str.match(regexp), `Empty regexp ${regexp} result for: ${str}`)[1];
}

export function getWithRegexpOrNull(str: string | null, regexp: RegExp): string | null {
    if (typeof str === 'string') {
        return (str.match(regexp) || [null, null])[1];
    }
    return null;
}

export function num(num: Maybe<string | number>): number {
    if (num === null || num === void 0 || +num !== +num) throw new Error(`${num} is not number`);
    return +num;
}

export function numOrNull(num: Maybe<string | number>): number | null {
    return num === null || num === void 0 || +num !== +num ? null : +num;
}
