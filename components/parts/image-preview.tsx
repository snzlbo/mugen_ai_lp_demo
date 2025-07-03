import { XCircleIcon } from 'lucide-react';
import Image from 'next/image';

export const ImagePreview = ({ url, onRemove }: { url: string; onRemove: () => void }) => (
  <div className="relative aspect-square">
    <button className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2" onClick={onRemove}>
      <XCircleIcon className="fill-primary text-primary-foreground h-5 w-5" />
    </button>
    <Image src={url} height={500} width={500} alt="" className="border-border h-full w-full rounded-md border object-cover" />
  </div>
);
