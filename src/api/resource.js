import fetch from '../util/fetch'


export function getList(page, pageSize) {
    return fetch({
        url: `/api/hiting/sheetlist?page=${page}&pageSize=${pageSize}`,
        method: 'get'
    })
}