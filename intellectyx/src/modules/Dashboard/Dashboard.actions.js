import * as constants from './Dashboard.constants'
export const fetchall = () => ({ type: constants.FETCH_ALL })
export const storeAll = (payload) => ({ type: constants.STORE_ALL, payload })
export const addNew = (payload) => ({ type: constants.ADD_NEW, payload })
export const storeNew = (payload) => ({ type: constants.STORE_NEW, payload })
export const deleter = (payload) => ({ type: constants.DELETE, payload })
export const update = (payload) => ({ type: constants.UPDATE, payload })