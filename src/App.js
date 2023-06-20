import {useEffect, useReducer, useState} from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import UploadForm from "./components/UploadForm";
import './App.css';

const initialState = {
  items: [],
  count: 0,
  inputs: {title: null, file: null, path: null},
  isCollapsed: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [action.payload.path, ...state.items],
      };
    case 'SET_COUNT':
      return {
        ...state,
        count: action.payload,
      };
    case 'SET_INPUTS':
      return {
        ...state,
        inputs: action.payload,
      };
    case 'SET_IS_COLLAPSED':
      return {
        ...state,
        isCollapsed: action.payload,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [count, setCount] = useState("");
  const [inputs, setInputs] = useState({title: null, file: null, path: null});
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggle = () => setIsCollapsed(!isCollapsed);
  const handleOnChange = (e) => {
    if (e.target.name === 'file') {
      setInputs({...inputs, file: e.target.files[0], path: URL.createObjectURL(e.target.files[0])});
    } else {
      setInputs({...inputs, title: e.target.value});
    }
  }
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch({type: 'ADD_ITEM', payload: {path: inputs.path}});
    setInputs({title: null, file: null, path: null});
    setIsCollapsed(false);
  }

  useEffect(() => {
    console.log(state);
  }, [state.items]);

  useEffect(() => {
    setCount(`You have ${state.items.length} photo${state.items.length > 1 ? 's' : ''} in your gallery`);
  }, [state.items]);

  return (
    <>
      <Navbar/>
      <div className="container text-center mt-5">
        <button onClick={() => toggle()} className="btn btn-success float-end">
          {!isCollapsed ? "+ Add" : "Close"}
        </button>
        <div className="clearfix mb-4"></div>
        <UploadForm inputs={inputs} isVisible={isCollapsed} onChange={handleOnChange} onSubmit={handleOnSubmit} />
        <h1>Gallery</h1>
        {count}
        <div className="row">
          {state.items.map((photo, index) => <Card key={index} src={photo} />)}
        </div>
      </div>
    </>
  );
}

export default App;
