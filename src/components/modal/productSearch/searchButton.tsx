interface SearchButtonProps {
  name: string;
  url: string;
  icon?: string;
  //   color?: string; // not implemented
}
const buttonStyle = `btn btn-primary btn-sm ms-2 my-1 shadow-sm`;
export default function SearchButton({ ...props }: SearchButtonProps) {
  return (
    <a href={props.url} target="_blank" rel="noreferrer">
      <button className={buttonStyle}>
        {props.icon && (
          <img
            src={props.icon}
            className="me-1 pb-1"
            alt={props.name}
            style={{
              height: "1.6em",
            }}
          />
        )}
        <span>{props.name}</span>
      </button>
    </a>
  );
}
