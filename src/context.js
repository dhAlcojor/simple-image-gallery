import {createContext, useReducer} from "react";

export const Context = createContext({});

const initialState = {
  items: [],
  count: 0,
  inputs: {title: null, file: null, path: null},
  isCollapsed: true,
};

const handleOnChange = (state, e) => {
  if (e.target.name === 'file') {
    return {...state.inputs, file: e.target.files[0], path: URL.createObjectURL(e.target.files[0])};
  } else {
    return {...state.inputs, title: e.target.value};
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [state.inputs, ...state.items],
        count: state.items.length + 1,
        inputs: initialState.inputs,
      };
    case 'SET_INPUTS':
      return {
        ...state,
        inputs: handleOnChange(state, action.payload.value),
      };
    case 'SET_IS_COLLAPSED':
      return {
        ...state,
        isCollapsed: action.payload.bool,
      };
    default:
      return state;
  }
};

const Provider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>;
}

export default Provider;
