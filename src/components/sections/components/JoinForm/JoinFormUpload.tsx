import type { ChangeEvent } from "react";
import FormIcon from "../../../common/FormIcon";

interface JoinFormUploadProps {
  fileTip: string;
  canPreview: boolean;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onOpenPreview: () => void;
}

export default function JoinFormUpload({
  fileTip,
  canPreview,
  onFileChange,
  onOpenPreview,
}: JoinFormUploadProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <label
        htmlFor="file-upload"
        className="inline-flex items-center gap-2 cursor-pointer rounded-lg border border-blue-300 bg-white px-3 py-2.5 text-sm transition hover:border-blue-400 shadow-sm"
      >
        <FormIcon name="image" />
        <span>选择照片</span>
        <input
          id="file-upload"
          name="photo"
          type="file"
          accept="image/png, image/jpeg, image/gif, image/webp, image/svg+xml"
          className="hidden"
          onChange={onFileChange}
        />
      </label>
      <span className="text-sm text-ink-500">{fileTip}</span>
      <button
        type="button"
        className={`items-center gap-1.5 rounded-lg border border-brand-100 bg-white px-2.5 py-2 text-sm text-ink-500 shadow-sm transition hover:border-brand-300 hover:text-brand-500 ${canPreview ? "inline-flex" : "hidden"}`}
        onClick={onOpenPreview}
      >
        <FormIcon name="zoom-in" />
        <span>查看照片</span>
      </button>
    </div>
  );
}
