import ModalDialog from "../../../common/ModalDialog";

interface JoinFormModalsProps {
  previewOpen: boolean;
  uploadedImage: string;
  onClosePreview: () => void;
  successOpen: boolean;
  successText: string;
  onCloseSuccess: () => void;
  failureOpen: boolean;
  failureText: string;
  onCloseFailure: () => void;
  buttonClassName: string;
}

export default function JoinFormModals({
  previewOpen,
  uploadedImage,
  onClosePreview,
  successOpen,
  successText,
  onCloseSuccess,
  failureOpen,
  failureText,
  onCloseFailure,
  buttonClassName,
}: JoinFormModalsProps) {
  return (
    <>
      <ModalDialog
        open={previewOpen}
        onClose={onClosePreview}
        title="照片预览"
        maxWidthClassName="max-w-lg"
        overlayClassName="bg-black/60"
      >
        <img
          src={uploadedImage}
          alt="上传的照片"
          className="max-h-96 w-full rounded-lg object-contain"
        />
      </ModalDialog>

      <ModalDialog
        open={successOpen}
        onClose={onCloseSuccess}
        title="提交成功"
        maxWidthClassName="max-w-xs"
        showCloseButton={false}
        bodyClassName="px-6 pt-6 pb-4 text-center"
        footerClassName="px-6 pb-6 pt-0 text-center"
        footer={
          <button
            type="button"
            className={buttonClassName}
            onClick={onCloseSuccess}
          >
            关闭
          </button>
        }
      >
        <div className="text-ink-600">{successText}</div>
      </ModalDialog>

      <ModalDialog
        open={failureOpen}
        onClose={onCloseFailure}
        title={<span className="text-red-600">提交失败</span>}
        maxWidthClassName="max-w-xs"
        showCloseButton={false}
        bodyClassName="px-6 pt-6 pb-4 text-center"
        footerClassName="px-6 pb-6 pt-0 text-center"
        footer={
          <button
            type="button"
            className={buttonClassName}
            onClick={onCloseFailure}
          >
            关闭
          </button>
        }
      >
        <div className="text-ink-600">{failureText}</div>
      </ModalDialog>
    </>
  );
}
