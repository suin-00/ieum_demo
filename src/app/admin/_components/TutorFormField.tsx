interface TutorFormFieldProps {
  name: string;
  label: string;
  type?: "email" | "text" | "date";
  maxLength?: number;
}

export default function TutorFormField({
  name,
  label,
  type = "text",
  maxLength,
}: TutorFormFieldProps) {
  return (
    <div>
      <label className="mb-1 block text-xs font-bold text-slate-600">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required
        maxLength={maxLength}
        className="w-full rounded-xl border p-2.5 text-sm text-slate-900 placeholder:text-slate-400"
      />
    </div>
  );
}
