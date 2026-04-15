import type { ChangeEvent, CSSProperties } from "react";
import FormIcon from "../../../common/FormIcon";

export interface FormFields {
  name: string;
  number: string;
  major: string;
  sex: string;
  subject: string;
  mail: string;
  phone: string;
  cv: string;
}

interface JoinFormFieldsProps {
  fields: FormFields;
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
}

const INPUT_WRAPPER_CLASS =
  "inline-flex items-center gap-2 rounded-lg border border-blue-300 bg-white px-3 py-2.5 shadow-sm transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100";
const INPUT_CLASS =
  "bg-transparent outline-none placeholder-ink-400 flex-1 text-sm";

const SELECT_STYLE: CSSProperties = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234f46e5' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right center",
};

export default function JoinFormFields({
  fields,
  onChange,
}: JoinFormFieldsProps) {
  return (
    <>
      <div className={INPUT_WRAPPER_CLASS}>
        <FormIcon name="user" />
        <input
          name="name"
          value={fields.name}
          onChange={onChange}
          placeholder="姓名"
          className={INPUT_CLASS}
          required
        />
      </div>

      <div className={INPUT_WRAPPER_CLASS}>
        <FormIcon name="id-card" />
        <input
          name="number"
          value={fields.number}
          onChange={onChange}
          placeholder="学号"
          className={INPUT_CLASS}
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className={INPUT_WRAPPER_CLASS}>
          <FormIcon name="book" />
          <select
            name="major"
            value={fields.major}
            onChange={onChange}
            className="bg-transparent outline-none flex-1 text-sm appearance-none pr-5"
            style={SELECT_STYLE}
            required
          >
            <option value="" disabled>
              专业
            </option>
            <option value="0">计算机类</option>
            <option value="1">计算机科学与技术（中美）</option>
            <option value="2">教育技术学（公费师范）</option>
            <option value="3">其他</option>
          </select>
        </div>

        <div className={INPUT_WRAPPER_CLASS}>
          <FormIcon name="person" />
          <select
            name="sex"
            value={fields.sex}
            onChange={onChange}
            className="bg-transparent outline-none flex-1 text-sm appearance-none pr-5"
            style={SELECT_STYLE}
            required
          >
            <option value="" disabled>
              性别
            </option>
            <option value="0">女</option>
            <option value="1">男</option>
          </select>
        </div>

        <div className={INPUT_WRAPPER_CLASS}>
          <FormIcon name="briefcase" />
          <select
            name="subject"
            value={fields.subject}
            onChange={onChange}
            className="bg-transparent outline-none flex-1 text-sm appearance-none pr-5"
            style={SELECT_STYLE}
            required
          >
            <option value="" disabled>
              意向部门
            </option>
            <option value="0">前端</option>
            <option value="1">后端</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={INPUT_WRAPPER_CLASS}>
          <FormIcon name="mail" />
          <input
            name="mail"
            type="email"
            value={fields.mail}
            onChange={onChange}
            placeholder="邮箱"
            className={INPUT_CLASS}
            required
          />
        </div>

        <div className={INPUT_WRAPPER_CLASS}>
          <FormIcon name="phone" />
          <input
            name="phone"
            value={fields.phone}
            onChange={onChange}
            placeholder="电话号码"
            className={INPUT_CLASS}
            required
          />
        </div>
      </div>

      <div className="rounded-lg border border-blue-300 bg-white p-3 shadow-sm transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
        <div className="mb-2 flex items-start gap-2">
          <FormIcon name="pen" />
        </div>
        <textarea
          name="cv"
          value={fields.cv}
          onChange={onChange}
          placeholder="个人介绍(可以从个人技能、学业、兴趣爱好等方面介绍)"
          rows={4}
          className="w-full resize-none bg-transparent text-sm placeholder-ink-400 outline-none"
          required
        />
      </div>
    </>
  );
}
