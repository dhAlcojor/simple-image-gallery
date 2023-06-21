import {createContext, useContext, useEffect, useMemo, useReducer} from "react";
import {Firestore} from "../handlers/firestore";

export const FirestoreContext = createContext({});

const initialState = {
  items: [],
  placeholders: [],
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
        placeholders: [action.payload.item, ...state.items],
        count: state.items.length + 1,
        inputs: initialState.inputs,
      };
    case 'FILTER_ITEMS':
      return {
        ...state,
        items: action.payload.results,
      };
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload.items,
        placeholders: action.payload.items,
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
  const read = () => {
    Firestore.readDocs().then((docs) => {
      dispatch({type: 'SET_ITEMS', payload: {items: docs}});
    });
  };

  useEffect(() => {
    read();
  }, []);
  const [state, dispatch] = useReducer(reducer, initialState);
  const filterItems = input => {
    if (input === "" || input === null) {
      dispatch({type: "SET_ITEMS", payload: {items: state.placeholders}});
    }

    let list = state.placeholders.flat();
    let results = list.filter(item => {
      const name = item.title.toLowerCase();
      const searchInput = input.toLowerCase();
      return name.indexOf(searchInput) !== -1;
    });

    dispatch({type: "FILTER_ITEMS", payload: {results}});
  }

  const value = useMemo(() => {
    return {state, dispatch, read, filterItems};
  }, [state, dispatch, read, filterItems]);

  return <FirestoreContext.Provider value={value}>{children}</FirestoreContext.Provider>;
}

export const useFirestoreContext = () => {
  return useContext(FirestoreContext);
};

export default Provider;
