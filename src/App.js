import './App.css';
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import {useEffect, useState} from "react";
import UploadForm from "./components/UploadForm";

const photos = [
  'https://picsum.photos/id/1001/200/200',
];

function App() {
  const [count, setCount] = useState("");
  const [inputs, setInputs] = useState({title: null, file: null, path: null});
  const [items, setItems] = useState(photos);
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
    setItems([inputs.path, ...items]);
    setInputs({title: null, file: null, path: null});
    setIsCollapsed(false);
  }

  useEffect(() => {
    setCount(`You have ${items.length} photo${items.length > 1 ? 's' : ''} in your gallery`);
  }, [items]);

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
          {items.map((photo, index) => <Card key={index} src={photo} />)}
        </div>
      </div>
    </>
  );
}

export default App;
