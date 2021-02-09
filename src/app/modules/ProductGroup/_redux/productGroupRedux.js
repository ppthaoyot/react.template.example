require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

export const actionTypes = {
  SET_CURRENTPAGE: "[SET_CURRENTPAGE] Action",
  UPDATE_CURRENT_PRODUCTGROUP: "[UPDATE_CURRENT_PRODUCTGROUP] Action",
  RESET_PRODUCTGROUP: "[RESET_PRODUCTGROUP] Action",
};

const initialState = {
  currentPage: 0,
  currentProductGroupToAdd: {
    name: "",
    createdBy: "2",
    createdDate: dayjs(),
    updatedBy: "2",
    updatedDate: dayjs(),
    isActive: true,
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENTPAGE: {
      return { ...state, currentPage: action.payload };
    }

    case actionTypes.UPDATE_CURRENT_PRODUCTGROUP: {
      return { ...state, currentProductGroupToAdd: action.payload };
    }

    case actionTypes.RESET_PRODUCTGROUP: {
      return {
        ...state,
        currentProductGroupToAdd: initialState.currentProductGroupToAdd,
        currentPage: 0,
      };
    }

    default:
      return state;
  }
};

export const actions = {
  setCurrentPage: (payload) => ({
    type: actionTypes.SET_CURRENTPAGE,
    payload,
  }),
  updateCurrentProductGroup: (payload) => ({
    type: actionTypes.UPDATE_CURRENT_PRODUCTGROUP,
    payload,
  }),
  resetCurrentProductGroup: () => ({
    type: actionTypes.RESET_PRODUCTGROUP,
  }),
};
