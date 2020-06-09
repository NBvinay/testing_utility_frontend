const initialState = {
    databaseConfigSourceId: '',
    databaseConfigTargetId : '',
    currentUser: ''
    
}

const reducer = (state = initialState, action) => {
    console.log("inside reducer")
    if(action.type == 'SOURCE'){
        const tempState = {...state}
        tempState['databaseConfigSourceId'] = action.newId
        state = tempState
    }

    if(action.type == 'TARGET'){
        const tempState = {...state}
        tempState['databaseConfigTargetId'] = action.newId
        state = tempState
    }

    if(action.type == 'ADD USER'){
        const tempState = {...state}
        tempState['currentUser'] = action.newUser
        tempState['databaseConfigSourceId'] = ''
        tempState['databaseConfigTargetId'] = ''
        state = tempState
    }
    return state;
}

export default reducer;