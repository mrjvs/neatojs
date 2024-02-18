import * as Test from '@neato/guider/client';

export default function Page() {
  return (
    <div>
      <p>A react page:</p>
      <p>{JSON.stringify(Test)}</p>
    </div>
  );
}
