
export const getReducerFromObject = (object, initialState) => {
    object.default = object.default || (state => state)
    return (state, { type, payload }) => (object[type] || object['default'])(state || initialState, payload)
}
