import {useContext, useMemo} from "react";
import {FirebaseContext} from "../context/FirebaseContext";
import {Firestore} from "../handlers/firestore";
import Storage from "../handlers/storage";
import {useAuthContext} from "../context/AuthContext";

const {writeDoc} = Firestore;
const {downloadFile, uploadFile} = Storage;

const Preview = () => {
  const {state} = useContext(FirebaseContext);
  const {path} = state.inputs;
  return path && (
      <div
          className="rounded p-1 m-5"
          style={{
            width: "30%",
            height: "300px",
            backgroundImage: `url(${path})`,
            backgroundSize: "cover",
          }}
      ></div>
  );
};

const UploadForm = () => {
  const {currentUser} = useAuthContext();
  const {dispatch, state: {inputs, isCollapsed}, read} = useContext(FirebaseContext);
  const isDisabled = useMemo(() => {
    return !!Object.values(inputs).some((input) => input === null);
  }, [inputs]);
  const username = useMemo(() => {
    return currentUser?.displayName.toLowerCase().split(" ").join("");
  }, [currentUser]);

  const handleOnChange = (e) => dispatch({type: 'SET_INPUTS', payload: {value: e}});
  const handleOnSubmit = (e) => {
    e.preventDefault();
    uploadFile(inputs)
        .then(downloadFile)
        .then((url) => {
              writeDoc({...inputs, path: url, user: username}).then(() => {
                read();
                dispatch({type: 'SET_IS_COLLAPSED', payload: {bool: true}});
              });
            }
        );
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
              Save and Upload
            </button>
          </form>
        </div>
      </>
  );
};

export default UploadForm;
