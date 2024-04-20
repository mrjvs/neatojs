export function SearchButton(props: { onClick?: () => void }) {
  return (
    <button type="button" onClick={props.onClick}>
      Search
    </button>
  );
}
