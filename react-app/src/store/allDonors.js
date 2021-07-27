const SET_ALL_DONORS = "session/SET_DONORS"
const ADD_DONOR = "session/ADD_DONOR"

const setAllDonors = (donors) => {
    return {
        type: SET_ALL_DONORS,
        payload: donors
    }
}

const addDonor = (donor) => {
    return  {
        type: ADD_DONOR,
        payload: donor
    }
}


export const getAllDonors = () => async (dispatch) => {
    const response = await fetch(`/api/donors/`)
    const data = await response.json()
    dispatch(setAllDonors(data.donations))
}

export const addADonor = (newDonorData) => async (dispatch) => {
    // const {project_id, user_id, amount} = newDonorData;
    // console.log(`!!!ADD-A-DONOR-THUNK'S-NEW-DONOR-DATA!!!${JSON.stringify(newDonorData)}`)
    // const formData = new FormData();
    // formData.append("project_id", project_id)
    // formData.append("user_id", user_id)
    // formData.append("amount", amount)
    // console.log(formData)
    const response = await fetch(`/api/donors/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(newDonorData)
    })

    const data = await response.json();

    dispatch(addDonor(data.donor))
}

const initialState = {donors: []}

const allDonorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_DONORS: {
            let newState = {...state}
            newState.donors = action.payload
            return newState;
        }
        case ADD_DONOR: {
            let newState = {...state};
            newState.donors = [...newState.donors, action.payload]
            return newState
        }
        default: {
            return state;
        }
    }
}



export default allDonorsReducer;
