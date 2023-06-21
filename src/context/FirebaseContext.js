import {createContext, useEffect, useReducer} from "react";
import {Firestore} from "../handlers/firestore";

export const FirebaseContext = createContext({});

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
        items: [action.payload.item, ...state.items],
        count: state.items.length + 1,
        inputs: initialState.inputs,
      };
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload.items,
      }
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
  const read = () => {
    Firestore.readDocs().then((docs) => {
      dispatch({type: 'SET_ITEMS', payload: {items: docs}});
    });
  };

  useEffect(() => {
    read();
  }, []);
  const [state, dispatch] = useReducer(reducer, initialState);
  return <FirebaseContext.Provider value={{state, dispatch, read}}>{children}</FirebaseContext.Provider>;
}

export default Provider;
