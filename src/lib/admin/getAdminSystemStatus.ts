import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export interface AdminSystemStatus {
  isAdminAuthenticated: boolean;
  hasDatabaseError: boolean;
  tutorCount: number | null;
  studentCount: number | null;
  atUpdated: string;
}

function formatCommitDate(value: string | undefined): string {
  if (!value) {
    return "정보 없음";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "정보 없음";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Seoul",
  }).format(date);
}

async function getLastCommitTime(): Promise<string> {
  try {
    const response = await fetch(
      "https://api.github.com/repos/suin-00/ieum_demo/commits?per_page=1",
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "User-Agent": "ieum-admin-dashboard",
        },
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      return "정보 없음";
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return "정보 없음";
    }

    const latestCommit = data[0];

    if (
      typeof latestCommit !== "object" ||
      latestCommit === null ||
      !("commit" in latestCommit)
    ) {
      return "정보 없음";
    }

    const commit = latestCommit.commit;

    if (
      typeof commit !== "object" ||
      commit === null ||
      !("committer" in commit)
    ) {
      return "정보 없음";
    }

    const committer = commit.committer;

    if (
      typeof committer !== "object" ||
      committer === null ||
      !("date" in committer) ||
      typeof committer.date !== "string"
    ) {
      return "정보 없음";
    }

    return formatCommitDate(committer.date);
  } catch {
    return "정보 없음";
  }
}

export async function getAdminSystemStatus(): Promise<AdminSystemStatus> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [
    { count: tutorCount, error: tutorError },
    { count: studentCount, error: studentError },
  ] = await Promise.all([
    supabaseAdmin.from("tutors").select("id", { count: "exact", head: true }),
    supabaseAdmin
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("role", "student"),
  ]);

  const hasDatabaseError = Boolean(tutorError || studentError);

  return {
    isAdminAuthenticated: user?.email === "admin@ieum.com",
    hasDatabaseError,
    tutorCount: hasDatabaseError ? null : (tutorCount ?? 0),
    studentCount: hasDatabaseError ? null : (studentCount ?? 0),
    atUpdated: await getLastCommitTime(),
  };
}
