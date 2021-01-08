const initialState = {
  gridColNumber: 6,
  gridRowNumber: 7,
};

const GRID_SELECT = "GRID_SELECT";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GRID_SELECT: {
      return {
        ...state,
        gridColNumber: action.payload.gridValue,
        gridRowNumber: action.payload.gridValue,
      };
    }

    default:
      return state;
  }
}
