export default function Task(props) {
  return <div className="d-flex">
      <div><input type="checkbox"></input></div>
      <div><span>{props.task.name}</span></div>
  </div>;
}
