import {useAuthContext} from "../context/AuthContext";

const Profile = () => {
  const {currentUser} = useAuthContext();

  return (
      <>
        <h1 className="text-center">Profile</h1>
        <hr style={{width: "50%", margin: "3rem auto"}}/>
        <div className="d-flex justify-content-center align-items-center">
          <img className="rounded-circle" src={currentUser?.photoURL} alt={currentUser?.displayName} width="200"
               height="200"/>
          <ul className="list-group mx-5">
            <li className="list-group-item"><span
                className="fs-5 text-capitalize">Name: {currentUser?.displayName}</span></li>
            <li className="list-group-item"><span className="fs-5">Email: {currentUser?.email}</span></li>
            <li className="list-group-item"><span className="fs-5"></span> ---</li>
            <li className="list-group-item"><span className="fs-5"></span> ---</li>
            <li className="list-group-item"><span className="fs-5"></span> ---</li>
          </ul>
        </div>
      </>
  );
};

export default Profile;
