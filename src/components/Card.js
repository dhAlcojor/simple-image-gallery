const Card = ({path, title}) => (
    <div className="col mb-5">
      <div className="card" style={{width: "18rem"}}>
        <img src={path} className="card-img-top" alt={title}/>
      </div>
    </div>
);

export default Card;
