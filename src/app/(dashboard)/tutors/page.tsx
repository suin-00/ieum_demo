"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface MatchedStudent {
  matchId: string;
  id: string;
  name: string;
  plan: string;
  school: string;
  major: string;
}

interface ActiveLessonStudent {
  lessonId: string;
  matchId: string;
  id: string;
  name: string;
  school: string;
  major: string;
  sessionNumber: number;
  scheduledAt: string | null;
  plan: string;
}

interface RawProfile {
  name: string | null;
}

interface RawStudent {
  school: string | null;
  major: string | null;
  profiles: RawProfile | RawProfile[] | null;
}

interface RawMatch {
  id: string;
  plan_sessions: number;
  status: string;
  student_id: string;
  students: RawStudent | null;
}

interface RawLessonMatch {
  plan_sessions: number;
  student_id: string;
  students: RawStudent | null;
}

interface RawLesson {
  id: string;
  match_id: string;
  session_number: number;
  scheduled_at: string | null;
  status: string;
  matches: RawLessonMatch | null;
}

export default function TutorDashboardPage() {
  const [matchedStudents, setMatchedStudents] = useState<MatchedStudent[]>([]);
  const [activeLessonStudents, setActiveLessonStudents] = useState<
    ActiveLessonStudent[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState<{ [key: string]: string }>({});
  const [loadingComplete, setLoadingComplete] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  // 데이터 로드 함수 (컴포넌트 내부 상태 조작용)
  const fetchData = useCallback(async () => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("사용자 인증 정보가 없습니다.");
        return;
      }

      const { data: matchData, error: matchError } = await supabase
        .from("matches")
        .select(
          `
          id,
          plan_sessions,
          status,
          student_id,
          students!matches_student_id_fkey (
            school,
            major,
            profiles (
              name
            )
          )
        `,
        )
        .eq("tutor_id", user.id)
        .eq("status", "active");

      if (matchError) {
        console.error("매칭된 학생 조회 실패:", matchError.message);
      } else if (matchData) {
        const typedMatchData = matchData as unknown as RawMatch[];
        const formattedMatches: MatchedStudent[] = typedMatchData.map(
          (match) => {
            const profileObj = Array.isArray(match.students?.profiles)
              ? match.students?.profiles[0]
              : match.students?.profiles;

            return {
              matchId: match.id,
              id: match.student_id,
              name: profileObj?.name || "학생",
              plan: `${match.plan_sessions}회 수업 플랜`,
              school: match.students?.school || "학교 미입력",
              major: match.students?.major || "전공 미입력",
            };
          },
        );
        setMatchedStudents(formattedMatches);

        const matchIds = typedMatchData.map((m) => m.id);

        if (matchIds.length > 0) {
          const { data: lessonData, error: lessonError } = await supabase
            .from("lessons")
            .select(
              `
              id,
              match_id,
              session_number,
              scheduled_at,
              status,
              matches!lessons_match_id_fkey (
                plan_sessions,
                student_id,
                students!matches_student_id_fkey (
                  school,
                  major,
                  profiles:students_id_fkey (
                    name
                  )
                )
              )
            `,
            )
            .in("match_id", matchIds)
            .eq("status", "scheduled");

          if (lessonError) {
            console.error("수업 중인 학생 조회 실패:", lessonError.message);
          } else if (lessonData) {
            const typedLessonData = lessonData as unknown as RawLesson[];
            const formattedLessons: ActiveLessonStudent[] = typedLessonData.map(
              (lesson) => {
                const profileObj = Array.isArray(
                  lesson.matches?.students?.profiles,
                )
                  ? lesson.matches?.students?.profiles[0]
                  : lesson.matches?.students?.profiles;

                return {
                  lessonId: lesson.id,
                  matchId: lesson.match_id,
                  id: lesson.matches?.student_id || "",
                  name: profileObj?.name || "학생",
                  school: lesson.matches?.students?.school || "학교 미입력",
                  major: lesson.matches?.students?.major || "전공 미입력",
                  sessionNumber: lesson.session_number,
                  scheduledAt: lesson.scheduled_at,
                  plan: `${lesson.matches?.plan_sessions}회 플랜 중`,
                };
              },
            );
            setActiveLessonStudents(formattedLessons);
          }
        }
      }
    } catch (err) {
      console.error("예외 발생:", err);
    }
  }, [supabase]);

  // useEffect 내에서는 비동기 함수 실행만 처리하고 직접 setState를 호출하지 않음
  useEffect(() => {
    let isMounted = true;

    const loadInitialData = async () => {
      setLoading(true);
      await fetchData();
      if (isMounted) {
        setLoading(false);
      }
    };

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, [fetchData]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("로그아웃 실패:", error.message);
      alert("로그아웃 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } else {
      router.push("/login");
    }
  };

  const handleFeedbackChange = (key: string, value: string) => {
    setFeedbacks((prev) => ({ ...prev, [key]: value }));
  };

  const handleCompleteLesson = async (lessonId: string, uniqueKey: string) => {
    setLoadingComplete(uniqueKey);

    try {
      const { error } = await supabase
        .from("lessons")
        .update({
          status: "completed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", lessonId);

      if (error) {
        alert("수업 완료 처리 중 오류가 발생했습니다.");
        console.error(error.message);
      } else {
        alert("수업이 완료 처리되었습니다!");
        setFeedbacks((prev) => ({ ...prev, [uniqueKey]: "" }));
        await fetchData();
      }
    } catch (err) {
      console.error("예외 발생:", err);
    } finally {
      setLoadingComplete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">튜터 대시보드</h1>
          <div className="flex items-center space-x-4">
            <Link
              href="/tutors/chat"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              채팅함
            </Link>
            <Link
              href="/tutors/settings"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              계정 수정
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {loading ? (
          <div className="text-center py-12 text-gray-500">
            데이터를 불러오는 중...
          </div>
        ) : (
          <>
            <section>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  🤝 현재 매칭된 학생 목록
                </h2>
                <p className="text-sm text-gray-600">
                  현재 활성화된 매칭 상태인 학생 전체 목록입니다.
                </p>
              </div>

              {matchedStudents.length === 0 ? (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center text-gray-500">
                  현재 매칭된 학생이 없습니다.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {matchedStudents.map((student) => (
                    <div
                      key={student.matchId}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {student.name} 학생
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {student.school} / {student.major}
                          </p>
                          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                            선택 플랜: {student.plan}
                          </span>
                        </div>
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-md">
                          매칭 활성 (Active)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  📚 현재 수업 중인 학생 목록
                </h2>
                <p className="text-sm text-gray-600">
                  예정된 수업 일정을 확인하고 수업 완료 후 피드백을 남겨주세요.
                </p>
              </div>

              {activeLessonStudents.length === 0 ? (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center text-gray-500">
                  현재 진행 예정인 수업이 없습니다.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeLessonStudents.map((lesson) => (
                    <div
                      key={lesson.lessonId}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">
                              {lesson.name} 학생
                            </h3>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {lesson.school} / {lesson.major}
                            </p>
                            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                              수업 회차: 제 {lesson.sessionNumber}회차 (
                              {lesson.plan})
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            일정:{" "}
                            {lesson.scheduledAt
                              ? new Date(lesson.scheduledAt).toLocaleString()
                              : "미정"}
                          </span>
                        </div>

                        <div className="mb-4 mt-4">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            수업 후 피드백 작성
                          </label>
                          <textarea
                            rows={2}
                            value={feedbacks[lesson.lessonId] || ""}
                            onChange={(e) =>
                              handleFeedbackChange(
                                lesson.lessonId,
                                e.target.value,
                              )
                            }
                            placeholder="오늘 수업 내용 및 피드백을 입력하세요..."
                            className="w-full rounded-md border border-gray-300 p-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          handleCompleteLesson(lesson.lessonId, lesson.lessonId)
                        }
                        disabled={loadingComplete === lesson.lessonId}
                        className="w-full mt-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                      >
                        {loadingComplete === lesson.lessonId
                          ? "처리 중..."
                          : "수업 완료 및 피드백 전송"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
