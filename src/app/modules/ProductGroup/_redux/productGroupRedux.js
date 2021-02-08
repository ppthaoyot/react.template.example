require("dayjs/locale/th");
var dayjs = require("dayjs");
dayjs.locale("th");

export const actionTypes = {
  SET_CURRENTPAGE: "[SET_CURRENTPAGE] Action",
  UPDATE_CURRENT_EMPLOYEE: "[UPDATE_CURRENT_EMPLOYEE] Action",
  RESET_EMPLOYEE: "[RESET_EMPLOYEE] Action",
};

const initialState = {
  currentPage: 0,
  currentEmployeeToAdd: {
    titleId: 0,
    employeeCode: "",
    firstName: "",
    lastName: "",
    identityCardNo: "",
    dateOfBirth: dayjs(),
    address1: "",
    address2: "",
    subDistrictId: 0,
    postCode: "",
    genderId: "0",
    hobbies: [],
    isActive: true,
    employee_provinceId: 0,
    employee_districtId: 0,
    employee_subDistrictId: 0,
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENTPAGE: {
      return { ...state, currentPage: action.payload };
    }

    case actionTypes.UPDATE_CURRENT_EMPLOYEE: {
      return { ...state, currentEmployeeToAdd: action.payload };
    }

    case actionTypes.RESET_EMPLOYEE: {
      return {
        ...state,
        currentEmployeeToAdd: initialState.currentEmployeeToAdd,
        currentPage: 0,
      };
    }

    default:
      return state;
  }
};

export const actions = {
  setCurrentPage: (payload) => ({ type: actionTypes.SET_CURRENTPAGE, payload }),
  updateCurrentEmployee: (payload) => ({
    type: actionTypes.UPDATE_CURRENT_EMPLOYEE,
    payload,
  }),
  resetCurrentEmployee: () => ({ type: actionTypes.RESET_EMPLOYEE }),
};
