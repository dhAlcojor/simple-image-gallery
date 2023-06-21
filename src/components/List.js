import Card from "./Card";

const List = ({items}) => (
    <div className="row mt-3">
      {items.map((item, index) => <Card key={index} {...item} />)}
    </div>
);

export default List;
