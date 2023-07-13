const reducer = (state,action)=>{
    if(action.type=== 'User'){
        return action.payload;
    }
    return state;
}
export const reducer1 = (state,action)=>{
    if(action.type=== 'admin'){
        return action.payload;
    }
    return state;
}
export const reducer2 = (state,action)=>{
    if(action.type=== 'filter'){
        return action.payload;
    }
    return state;
}
export default reducer;