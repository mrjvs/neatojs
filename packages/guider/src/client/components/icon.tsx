import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Icon(props: { icon: string }) {
  return <FontAwesomeIcon icon={props.icon as any} />;
}
