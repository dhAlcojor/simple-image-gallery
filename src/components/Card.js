import {useMemo} from "react";
import {useNavigate} from "react-router-dom";

const Card = ({id, path, title, createdAt, user}) => {
  const navigate = useNavigate();
  const timestamp = useMemo(() => createdAt ? new Date(createdAt.seconds * 1000).toLocaleDateString() : "", [createdAt]);

  const handleOnClick = () => {
    navigate(`/images/${id}`, {state: {id}});
  };

  return (
      <div className="col mb-5" style={{cursor: "pointer"}} onClick={handleOnClick}>
        <div className="card" style={{width: "18rem"}}>
          <div style={{
            height: "220px",
            backgroundImage: `url(${path})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}></div>
          <h5 className="text-center mt-1">{title}</h5>
          <div className="d-flex justify-content-between p-2">
            <p>{timestamp}</p>
            <i>@{user || "username"}</i>
          </div>
        </div>
      </div>
  );
};

export default Card;
