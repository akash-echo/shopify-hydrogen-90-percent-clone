/**
 * Fetch metaobject field data and resolve image references.
 * @param {Object} context - The storefront context.
 * @param {Object} handleInput - The handle input {handle, type}.
 * @param {string} fieldKey - The key of the metaobject field to fetch.
 * @returns {Promise<Object>} - The resolved image data or null.
 */

export async function fetchMetaobjectUrlData(context, handleInput, fieldKeys) {
    try {
        // Query the metaobject
        const { metaobject } = await context.storefront.query(
            `query GetMetaobject($handleInput: MetaobjectHandleInput!) {
                metaobject(handle: $handleInput) {
                    fields {
                        key
                        value
                    }
                }
            }`,
            { variables: { handleInput } }
        );

        if (!metaobject) return null;

        // Extract the desired fields
        const result = {};
        fieldKeys.forEach((key) => {
            const field = metaobject.fields.find((f) => f.key === key);
            if (field) {
                result[key] = field.value;
            }
        });

        return result;
    } catch (error) {
        console.error('Error fetching metaobject data:', error);
        return null;
    }
}
