import UploadForm from "./UploadForm";
import Navbar from "./Navbar";

const Layout = ({children, state, onChange, onSubmit, toggle}) => {
  return (
      <>
        <Navbar/>
        <div className="container mt-5">
          <button onClick={() => toggle(!state.isCollapsed)} className="btn btn-success float-end">
            {!state.isCollapsed ? "+ Add" : "Close"}
          </button>
          <div className="clearfix mb-4"></div>
          <UploadForm inputs={state.inputs} isVisible={state.isCollapsed} onChange={onChange}
                      onSubmit={onSubmit}/>
          {children}
        </div>
      </>
  );
};

export default Layout;
