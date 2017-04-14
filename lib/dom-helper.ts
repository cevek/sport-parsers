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
    return (nodes && nodes.length > 0 ? [...nodes] : null) as T | null;
}

export function getText(el: Element | null, query?: string) {
    return validateValue((query ? getNode(el, query) : validateValue(el, nullElArgError)).textContent,  `TextContent of ${query} is null`).trim();
}

export function getTextOrNull(el: Element | null, query?: string) {
    const node = query ? getNodeOrNull(el, query) : el;
    return node && node.textContent ? node.textContent.trim() : null;
}

export function getAttr(el: Element | null, attr: string) {
    return validateValue(validateValue(el, nullElArgError).getAttribute(attr),  `Attribute ${attr} is null`);
}


export function getAttrOrNull(el: Element | null, attr: string) {
    return el && el.getAttribute(attr) || null;
}

export function getWithRegexp(str: string | null, regexp: RegExp) {
    if (typeof str !== 'string') throw new Error(`${str} is not a string`);
    return validateValue(str.match(regexp), `Empty regexp ${regexp} result for: ${str}`)[1];
}

export function getWithRegexpOrNull(str: string | null, regexp: RegExp) {
    return typeof str === 'string' && (str.match(regexp) || [null, null])[1];
}
