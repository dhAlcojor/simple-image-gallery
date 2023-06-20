import {useContext, useMemo} from "react";
import {Context} from "../context";
import {Firestore} from "../handlers/firestore";

const {writeDoc} = Firestore;

const Preview = () => {
  const {state} = useContext(Context);
  const {path} = state.inputs;
  return path && (
      <div
          className="rounded p-1 m-5"
          style={{
            width: "30%",
            height: "300px",
            backgroundImage: `url(${path}`,
            backgroundSize: "cover",
          }}
      ></div>
  );
};

const UploadForm = () => {
  const {dispatch, state: {inputs, isCollapsed}} = useContext(Context);
  const isDisabled = useMemo(() => {
    return !!Object.values(inputs).some((input) => input === null);
  }, [inputs]);

  const handleOnChange = (e) => dispatch({type: 'SET_INPUTS', payload: {value: e}});
  const handleOnSubmit = (e) => {
    e.preventDefault();
    writeDoc(inputs).then(console.log);
    dispatch({type: 'ADD_ITEM'});
    dispatch({type: 'SET_IS_COLLAPSED', payload: {bool: false}});
  }

  return (
      !isCollapsed && <>
        <p className="display-6 text-center mb-3">Upload Stock Image</p>
        <div className="mb-5 d-flex align-items-center justify-content-center">
          <Preview {...inputs} />
          <form className="mb-2" style={{textAlign: "left"}} onSubmit={handleOnSubmit}>
            <div className="mb-3">
              <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="title"
                  aria-describedby="text"
                  onChange={handleOnChange}
              />
            </div>
            <div className="mb-3">
              <input type="file" className="form-control" name="file" onChange={handleOnChange}/>
            </div>
            <button
                type="submit"
                className="btn btn-success float-end"
                disabled={isDisabled}
            >
              Save changes
            </button>
          </form>
        </div>
      </>
  );
};

export default UploadForm;
