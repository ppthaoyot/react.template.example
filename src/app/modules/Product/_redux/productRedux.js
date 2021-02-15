require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

export const actionTypes = {
  SET_CURRENTPAGE: "[SET_CURRENTPAGE] Action",
  UPDATE_CURRENT_PRODUCT: "[UPDATE_CURRENT_PRODUCT] Action",
  RESET_PRODUCT: "[RESET_PRODUCT] Action",
};

const initialState = {
  currentPage: 0,
  currentProductToAdd: {
    name: "",
    price: "",
    stock: "",
    productGroupId: "",
    isActive: false,
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENTPAGE: {
      return { ...state, currentPage: action.payload };
    }

    case actionTypes.UPDATE_CURRENT_PRODUCT: {
      return { ...state, currentProductToAdd: action.payload };
    }

    case actionTypes.RESET_PRODUCT: {
      return {
        ...state,
        currentProductToAdd: initialState.currentProductToAdd,
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
  updateCurrentProduct: (payload) => ({
    type: actionTypes.UPDATE_CURRENT_PRODUCT,
    payload,
  }),
  resetCurrentProduct: () => ({
    type: actionTypes.RESET_PRODUCT,
  }),
};
