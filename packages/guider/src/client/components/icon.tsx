import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Icon(props: { icon: string; className?: string }) {
  const icon = props.icon.split(':', 2);
  return (
    <span className={props.className}>
      <FontAwesomeIcon icon={icon as any} />
    </span>
  );
}
