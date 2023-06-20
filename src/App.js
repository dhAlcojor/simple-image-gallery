import './App.css';
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import {useState} from "react";
import UploadForm from "./components/UploadForm";

const photos = [
  'https://picsum.photos/id/1001/200/200',
  'https://picsum.photos/id/1002/200/200',
  'https://picsum.photos/id/1003/200/200',
  'https://picsum.photos/id/1004/200/200',
  'https://picsum.photos/id/1005/200/200',
  'https://picsum.photos/id/1006/200/200'
];

function App() {
  const [input, setInput] = useState();
  const [items, setItems] = useState(photos);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggle = () => setIsCollapsed(!isCollapsed);
  const handleOnChange = (e) => setInput(e.target.value);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setItems([input, ...items]);
  }

  return (
    <>
      <Navbar/>
      <div className="container text-center mt-5">
        <button onClick={() => toggle()} className="btn btn-success float-end">
          {!isCollapsed ? "+ Add" : "Close"}
        </button>
        <div className="clearfix mb-4"></div>
        <UploadForm isVisible={isCollapsed} onChange={handleOnChange} onSubmit={handleOnSubmit} />
        <h1>Gallery</h1>
        <div className="row">
          {items.map((photo, index) => <Card key={index} src={photo} />)}
        </div>
      </div>
    </>
  );
}

export default App;
