import {
  useCallback,
  useMemo,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";
import JoinFormFields, { type FormFields } from "./JoinFormFields";
import JoinFormModals from "./JoinFormModals";
import JoinFormUpload from "./JoinFormUpload";

interface JoinFormProps {
  endpoint: string;
  uploadEndpoint: string;
  successMessage: string;
  failureMessage: string;
  imageQuality: number;
  imageMaxWidth: number;
  imageMaxHeight: number;
  studentIdLength: number;
}

const PHONE_REGEX = /^1[3-9]\d{9}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const DEFAULT_FILE_TIP = "请上传一张你的生活照~";
const BUTTON_PRIMARY_CLASS =
  "rounded-lg px-4 py-2.5 text-sm font-semibold transition cursor-pointer bg-brand-500 text-white hover:bg-brand-700";

const initialFields: FormFields = {
  name: "",
  number: "",
  major: "",
  sex: "",
  subject: "",
  mail: "",
  phone: "",
  cv: "",
};

function compressImage(
  file: File,
  quality: number,
  maxWidth: number,
  maxHeight: number,
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error("读取图片失败"));
    };

    reader.onload = (event) => {
      const image = new Image();

      image.onerror = () => {
        reject(new Error("加载图片失败"));
      };

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          reject(new Error("创建画布失败"));
          return;
        }

        let { width, height } = image;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        context.drawImage(image, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("压缩图片失败"));
              return;
            }

            const baseName = file.name.replace(/\.[^.]+$/, "");
            resolve(
              new File([blob], `${baseName}.jpg`, {
                type: "image/jpeg",
                lastModified: Date.now(),
              }),
            );
          },
          "image/jpeg",
          quality,
        );
      };

      const target = event.target as FileReader;
      image.src = target.result as string;
    };

    reader.readAsDataURL(file);
  });
}

function validateForm(
  fields: FormFields,
  uploadedImage: string,
  studentIdLength: number,
): string | null {
  if (uploadedImage === "") return "请选择图片";
  const trimmedName = fields.name.trim();
  if (!trimmedName) return "请填写姓名";
  if (trimmedName.length < 2) return "姓名长度不少于2";
  const trimmedNumber = fields.number.trim();
  if (!trimmedNumber) return "请填写学号";
  if (!/^\d+$/.test(trimmedNumber)) return "学号只能包含数字";
  if (trimmedNumber.length !== studentIdLength) {
    return `请填写正确的学号（${studentIdLength}位）`;
  }
  if (!fields.major) return "请选择专业";
  if (!fields.sex) return "请选择性别";
  if (!fields.subject) return "请选择意向部门";
  if (!fields.cv.trim()) return "请填写介绍";
  if (!fields.phone.trim()) return "请填写手机号";
  if (!PHONE_REGEX.test(fields.phone.trim())) return "请填写正确的手机号";
  if (!fields.mail.trim()) return "请填写邮箱";
  if (!EMAIL_REGEX.test(fields.mail.trim())) return "请填写正确的邮箱";
  return null;
}

export default function JoinForm({
  endpoint,
  uploadEndpoint,
  successMessage,
  failureMessage,
  imageQuality,
  imageMaxWidth,
  imageMaxHeight,
  studentIdLength,
}: JoinFormProps) {
  const [fields, setFields] = useState<FormFields>(initialFields);
  const [uploadedImage, setUploadedImage] = useState("");
  const [fileTip, setFileTip] = useState(DEFAULT_FILE_TIP);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [failureOpen, setFailureOpen] = useState(false);
  const [failureText, setFailureText] = useState(failureMessage);
  const [successText, setSuccessText] = useState(successMessage);

  const canPreview = useMemo(() => uploadedImage.length > 0, [uploadedImage]);

  const showFailure = useCallback((message: string) => {
    setFailureText(message);
    setFailureOpen(true);
  }, []);

  const showSuccess = useCallback((message: string) => {
    setSuccessText(message);
    setSuccessOpen(true);
  }, []);

  const updateField = useCallback(
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const { name, value } = event.target;
      setFields((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const onFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const input = event.target;
      const file = input.files?.[0];
      if (!file) return;

      setFileTip(`已选择文件：${file.name}`);

      const resetInput = () => {
        input.value = "";
      };

      try {
        const compressedFile = await compressImage(
          file,
          imageQuality,
          imageMaxWidth,
          imageMaxHeight,
        );

        const formData = new FormData();
        formData.append("file", compressedFile);

        const response = await fetch(uploadEndpoint, {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        const data = await response.json();

        if (data.code === 200) {
          setUploadedImage(data.data as string);
          return;
        }

        setUploadedImage("");
        setFileTip(DEFAULT_FILE_TIP);
        resetInput();
        showFailure((data.msg as string) || "上传图片失败");
      } catch {
        setUploadedImage("");
        setFileTip(DEFAULT_FILE_TIP);
        resetInput();
        showFailure("上传图片失败");
      }
    },
    [imageMaxHeight, imageMaxWidth, imageQuality, showFailure, uploadEndpoint],
  );

  const onSubmit = useCallback(
    async (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();

      const validationError = validateForm(
        fields,
        uploadedImage,
        studentIdLength,
      );
      if (validationError) {
        showFailure(validationError);
        return;
      }

      if (!endpoint) {
        showFailure("未配置表单提交地址");
        return;
      }

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fields.name,
            number: fields.number,
            major: fields.major,
            sex: fields.sex,
            position: fields.subject,
            email: fields.mail,
            phone: fields.phone,
            intro: fields.cv,
            img: uploadedImage,
          }),
        });

        const data = await response.json();

        if (data.code === 200) {
          showSuccess(successMessage);
          setFields(initialFields);
          setUploadedImage("");
          setFileTip(DEFAULT_FILE_TIP);
          setPreviewOpen(false);
          return;
        }

        showFailure((data.msg as string) || failureMessage);
      } catch (error) {
        console.error("提交失败", error);
        showFailure(failureMessage);
      }
    },
    [
      endpoint,
      failureMessage,
      fields,
      showFailure,
      showSuccess,
      studentIdLength,
      successMessage,
      uploadedImage,
    ],
  );

  return (
    <>
      <form className="mt-4 grid gap-4" onSubmit={onSubmit}>
        <JoinFormUpload
          fileTip={fileTip}
          canPreview={canPreview}
          onFileChange={onFileChange}
          onOpenPreview={() => setPreviewOpen(true)}
        />

        <JoinFormFields fields={fields} onChange={updateField} />

        <button type="submit" className={`${BUTTON_PRIMARY_CLASS} w-fit`}>
          提交报名
        </button>
      </form>

      <JoinFormModals
        previewOpen={previewOpen}
        uploadedImage={uploadedImage}
        onClosePreview={() => setPreviewOpen(false)}
        successOpen={successOpen}
        successText={successText}
        onCloseSuccess={() => setSuccessOpen(false)}
        failureOpen={failureOpen}
        failureText={failureText}
        onCloseFailure={() => setFailureOpen(false)}
        buttonClassName={BUTTON_PRIMARY_CLASS}
      />
    </>
  );
}
