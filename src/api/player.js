import request from '@/utils/request'

export const getPlayerList = params => {
    return request.get('/nba/player', params)
}