/**
 * Created by fkelpin on 25/11/15.
 */
/**
 * Flattens an attributes tree.
 * @param attributes the attributes tree to flatten
 */
export function getAllAttributes(attributes) {
    var result = [];
    attributes.forEach(a => {
        result.push(a);
        Array.prototype.push.apply(result, getAtomicAttributes(a.attributes));
    });
    return result;
}

/**
 * Flattens an attributes tree and filters out the atomic attributes.
 * @param attributes the attributes tree to flatten
 */
export function getAtomicAttributes(attributes) {
    return getAllAttributes(attributes).filter(a => a.attributes.length === 0);
}