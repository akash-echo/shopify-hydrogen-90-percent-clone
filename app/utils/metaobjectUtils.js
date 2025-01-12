// metaobjectUtils.js

/**
 * Fetch metaobject field data and resolve image references.
 * @param {Object} context - The storefront context.
 * @param {Object} handleInput - The handle input {handle, type}.
 * @param {string} fieldKey - The key of the metaobject field to fetch.
 * @returns {Promise<Object>} - The resolved image data or null.
 */
export async function fetchMetaobjectImage(context, handleInput, fieldKey) {
    try {
        // Query the metaobject
        const { metaobject } = await context.storefront.query(
            `query GetMetaobject($handleInput: MetaobjectHandleInput!) {
                metaobject(handle: $handleInput) {
                    fields {
                        key
                        value
                        reference {
                            ... on MediaImage {
                                id
                                image {
                                    url
                                    altText
                                    width
                                    height
                                }
                            }
                        }
                    }
                }
            }`,
            { variables: { handleInput } },
        );

        if (!metaobject) return null;

        // Extract the desired field
        const field = metaobject.fields.find((f) => f.key === fieldKey);
        if (!field) return null;

        // Resolve reference or value
        const mediaImageId = JSON.parse(field.value)?.[0];
        if (!mediaImageId) return null;

        // Fetch the image details
        const { node } = await context.storefront.query(
            `query GetImage($id: ID!) {
                node(id: $id) {
                    ... on MediaImage {
                        image {
                            url
                            altText
                            width
                            height
                        }
                    }
                }
            }`,
            { variables: { id: mediaImageId } },
        );

        return node?.image || null;
    } catch (error) {
        console.error('Error fetching metaobject image:', error);
        return null;
    }
}
