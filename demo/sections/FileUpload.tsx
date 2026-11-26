import { useEffect, useState } from 'react';
import { FileUpload, FileUploadDropzone, FileUploadItem, type FileUploadItemProps } from '../../src/components/file-upload';
import { Row, Section } from '../ui';

type Q = Omit<FileUploadItemProps, 'id'> & { id: number };
let nextId = 10;

function fmt(bytes: number) {
  return bytes > 1e6 ? `${(bytes / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1e3))} KB`;
}

/** Interactive composition: pick or drop files and watch a fake upload progress. */
function LiveUpload() {
  const [files, setFiles] = useState<Q[]>([
    { id: 1, name: 'Tech design requirements.pdf', size: '200 KB', state: 'complete', progress: 100 },
    { id: 2, name: 'Dashboard recording.mp4', size: '1.6 MB', state: 'in-progress', progress: 40 },
  ]);
  useEffect(() => {
    const t = setInterval(
      () =>
        setFiles((fs) =>
          fs.map((f) =>
            f.state === 'in-progress'
              ? { ...f, progress: Math.min(100, (f.progress ?? 0) + 5), state: (f.progress ?? 0) + 5 >= 100 ? 'complete' : 'in-progress' }
              : f,
          ),
        ),
      600,
    );
    return () => clearInterval(t);
  }, []);
  const remove = (id: number) => setFiles((fs) => fs.filter((f) => f.id !== id));
  return (
    <FileUpload
      wrapperClassName="w-[512px]"
      onFiles={(list) =>
        setFiles((fs) => [...fs, ...list.map((f) => ({ id: nextId++, name: f.name, size: fmt(f.size), state: 'in-progress' as const, progress: 0 }))])
      }
      files={files.map((f) => ({ ...f, onRemove: () => remove(f.id) }))}
    />
  );
}

const noop = () => undefined;

export default function FileUploadDemo() {
  return (
    <Section id="file-upload" title="File upload" figma="_File upload base · _File upload item base · File upload">
      <Row label="_File upload base — default / disabled / drag-over" className="flex flex-col gap-4">
        <FileUploadDropzone className="w-[512px]" />
        <FileUploadDropzone className="w-[512px]" disabled />
        <FileUploadDropzone className="w-[512px]" data-dragging />
      </Row>
      <Row label="_File upload item base — progress bar (file type / simple) × in progress / error / complete" className="grid grid-cols-[512px_512px] gap-4">
        <FileUploadItem name="Tech design requirements.pdf" size="200 KB" progress={10} onRemove={noop} />
        <FileUploadItem iconType="simple" name="Dashboard prototype FINAL.fig" size="4.2 MB" progress={80} onRemove={noop} />
        <FileUploadItem state="error" name="Tech design requirements.pdf" onRemove={noop} onRetry={noop} />
        <FileUploadItem state="error" iconType="simple" name="Dashboard prototype FINAL.fig" onRemove={noop} onRetry={noop} />
        <FileUploadItem state="complete" name="Tech design requirements.pdf" size="200 KB" />
        <FileUploadItem state="complete" iconType="simple" name="Dashboard prototype FINAL.fig" size="4.2 MB" />
      </Row>
      <Row label="_File upload item base — progress fill" className="grid grid-cols-[512px_512px] gap-4">
        <FileUploadItem type="progress-fill" name="Tech design requirements.pdf" size="200 KB" progress={70} />
        <FileUploadItem type="progress-fill" iconType="simple" name="Tech design requirements.pdf" size="200 KB" progress={70} />
        <FileUploadItem type="progress-fill" state="complete" name="Tech design requirements.pdf" size="200 KB" />
        <FileUploadItem type="progress-fill" state="complete" iconType="simple" name="Tech design requirements.pdf" size="200 KB" />
        <FileUploadItem type="progress-fill" state="error" name="Tech design requirements.pdf" onRemove={noop} onRetry={noop} />
        <FileUploadItem type="progress-fill" state="error" iconType="simple" name="Dashboard prototype FINAL.fig" onRemove={noop} onRetry={noop} />
      </Row>
      <Row label="File upload — files queued (live demo: drop or pick files)" className="flex flex-wrap items-start gap-8">
        <LiveUpload />
        <FileUpload
          wrapperClassName="w-[512px]"
          type="progress-fill"
          files={[
            { id: 1, name: 'Tech design requirements.pdf', size: '200 KB', state: 'complete' },
            { id: 2, name: 'Dashboard recording.mp4', size: '1.6 MB', progress: 40 },
            { id: 3, name: 'Dashboard prototype FINAL.fig', size: '4.2 MB', progress: 80 },
          ]}
        />
      </Row>
    </Section>
  );
}
