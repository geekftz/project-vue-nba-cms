import request from '@/utils/request'

export const getTeamList = params => {
    return request.get('/nba/team', params)
}