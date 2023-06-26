export const INITIAL_STATE={
    userid:JSON.parse(localStorage.getItem("currentUser"))?._id,
    title:"",
    cat:"",
    cover:"",
    images:[],
    desc:"",
    shorttitle:"",
    shortdesc:"",
    deliveryTime:0,
    revisionNumber:0,
    features:[],
    price:0,
};
export const gigReducer=(state,action)=>{//action will define what to do given by react or mygigs and 
    //state will be current state that can be use.
    switch(action.type){
        case "CHANGE_INPUT":
            return{
                ...state,//rest will be same
                [action.payload.name]:action.payload.value,
            }
        case "ADD_IMAGES":
            return{
                ...state,
                cover:action.payload.cover,
                images:action.payload.images
             }
        case "ADD_FEATURES":
        return{
            ...state,
            features:[...state.feature,action.payload],
            };
        case "REMOVE_FEATURES":
            return{
                ...state,
                features:state.features.filter((feature)=>feature!=action.payload)
                };
        default:
            return state;
    }

}