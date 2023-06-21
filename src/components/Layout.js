import UploadForm from "./UploadForm";
import Navbar from "./Navbar";
import {FirestoreContext} from "../context/FirestoreContext";
import {useContext} from "react";

const Layout = ({children}) => {
  const {dispatch, state: {isCollapsed}} = useContext(FirestoreContext);
  const toggle = (bool) => dispatch({type: 'SET_IS_COLLAPSED', payload: {bool}});

  return (
      <>
        <Navbar/>
        <div className="container mt-5">
          <button onClick={() => toggle(!isCollapsed)} className="btn btn-success float-end">
            {isCollapsed ? "+ Add" : "Close"}
          </button>
          <div className="clearfix mb-4"></div>
          <UploadForm/>
          {children}
        </div>
      </>
  );
};

export default Layout;
