import { theme } from '@neato/guider/client';

export default function Page() {
  return (
    <div>
      <p>A react page:</p>
      <p>{JSON.stringify(theme)}</p>
    </div>
  );
}
