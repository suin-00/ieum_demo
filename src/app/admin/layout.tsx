// app/admin/layout.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ADMIN_EMAIL } from "@/costants/admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !ADMIN_EMAILS.includes(user.email)) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main>{children}</main>
    </div>
  );
}
