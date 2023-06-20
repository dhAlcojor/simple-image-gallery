import {useMemo, useReducer} from "react";
import Card from "./components/Card";
import Layout from "./components/Layout";
import './App.css';

const initialState = {
  items: [],
  count: 0,
  inputs: {title: null, file: null, path: null},
  isCollapsed: false,
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

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggle = (bool) => dispatch({type: 'SET_IS_COLLAPSED', payload: {bool}});
  const handleOnChange = (e) => dispatch({type: 'SET_INPUTS', payload: {value: e}});
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch({type: 'ADD_ITEM'});
    toggle(!state.isCollapsed);
  }

  const count = useMemo(
      () => `You have ${state.items.length} photo${state.items.length > 1 ? 's' : ''} in your gallery`,
      [state.items]
  );

  return (
      <Layout state={state} onChange={handleOnChange} onSubmit={handleOnSubmit} toggle={toggle}>
        <h1>Gallery</h1>
        {count}
        <div className="row">
          {state.items.map((item, index) => <Card key={index} {...item} />)}
        </div>
      </Layout>
  );
}

export default App;
