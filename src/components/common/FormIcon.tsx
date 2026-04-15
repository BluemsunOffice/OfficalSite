import {
  User,
  CreditCard,
  BookOpen,
  UsersRound,
  Briefcase,
  Mail,
  Phone,
  PenLine,
  type LucideIcon,
} from "lucide-react";

export type FormIconName =
  | "user"
  | "id-card"
  | "book"
  | "person"
  | "briefcase"
  | "mail"
  | "phone"
  | "pen";

const iconMap: Record<FormIconName, LucideIcon> = {
  user: User,
  "id-card": CreditCard,
  book: BookOpen,
  person: UsersRound,
  briefcase: Briefcase,
  mail: Mail,
  phone: Phone,
  pen: PenLine,
};

interface FormIconProps {
  name: FormIconName;
  size?: number;
  className?: string;
}

export default function FormIcon({
  name,
  size = 14,
  className = "text-brand-500 shrink-0",
}: FormIconProps) {
  const Icon = iconMap[name];
  return <Icon size={size} className={className} />;
}
