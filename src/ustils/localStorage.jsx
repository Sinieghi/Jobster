export const addUserLocalSorage = (user)=>{
localStorage.setItem('user', JSON.stringify(user))
}

export const removeUserFromStorage = ()=>{
    localStorage.removeItem('user')
}

export const getFromLocalStorage = ()=>{
    const result = localStorage.getItem('user')
    const user = result ? JSON.parse(result) : null
    return user
}