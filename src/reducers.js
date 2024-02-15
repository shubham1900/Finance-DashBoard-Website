// reducers.js
import { UPDATE_OPEN } from "./components/actionType";

const initialState = {
  dopen: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_OPEN:
      return {
        ...state,
        dopen: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
