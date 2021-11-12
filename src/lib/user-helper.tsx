export const splitDomainAndUserId = (index) => (id) => 
    id.split('|')[index]

export const getDomain = splitDomainAndUserId(0)    
export const getUserId = splitDomainAndUserId(1)
