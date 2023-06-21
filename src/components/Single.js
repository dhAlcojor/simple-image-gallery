import {useLocation, useNavigate} from "react-router-dom";
import Card from "./Card";
import {useFirestoreContext} from "../context/FirestoreContext";

const Single = ({id}) => {
  const navigate = useNavigate();
  const {state} = useFirestoreContext();
  const {state: routerState} = useLocation();

  const item = state.items.find(item => item.id === routerState.id);

  return (
      <>
        <button className="btn btn-link" onClick={() => navigate(-1)}>Back</button>
        <div className="d-flex justify-content-center mb-5 align-items-center">
          <Card {...item} />
        </div>
      </>
  );
};

export default Single;
