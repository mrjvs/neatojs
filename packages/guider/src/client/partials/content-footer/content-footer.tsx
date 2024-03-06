import { Icon } from '../../components/icon';

export function ContentFooterInternal() {
  const year = new Date().getFullYear();
  return (
    <footer className="gd-py-3 gd-border-t gd-border-line gd-mt-12 gd-text-text gd-flex gd-items-center gd-justify-between">
      <div className="gd-flex gd-items-center">
        <div className="gd-flex gd-items-center">
          <a
            href="https://youtu.be/TENzstSjsus"
            target="_blank"
            rel="noopener noreferrer"
            className="gd-p-1 gd-flex gd-items-center gd-justify-center hover:gd-bg-bgLight gd-rounded"
          >
            <Icon icon="fa6-brands:discord" className="text-[1rem]" />
          </a>
          <a
            href="https://youtu.be/TENzstSjsus"
            target="_blank"
            rel="noopener noreferrer"
            className="gd-p-1 gd-flex gd-items-center gd-justify-center hover:gd-bg-bgLight gd-rounded"
          >
            <Icon icon="fa6-brands:github" className="text-[1rem]" />
          </a>
          <a
            href="https://youtu.be/TENzstSjsus"
            target="_blank"
            rel="noopener noreferrer"
            className="gd-p-1 gd-flex gd-items-center gd-justify-center hover:gd-bg-bgLight gd-rounded"
          >
            <Icon icon="fa6-brands:slack" className="text-[1rem]" />
          </a>
        </div>
        <div className="gd-ml-6">
          Copyright &copy; {year}{' '}
          <span className="gd-text-line gd-inline-block gd-mx-2">—</span>{' '}
          Powered by Guider
        </div>
      </div>
      <div>
        <a
          href="https://youtu.be/TENzstSjsus"
          target="_blank"
          rel="noopener noreferrer"
        >
          Edit this page on GitHub
        </a>
      </div>
    </footer>
  );
}
