// 튜터 프로필 타입 정의
interface Tutor {
  id: string;
  name: string | null;
  email: string | null;
}

interface TutorListSectionProps {
  tutors: Tutor[];
}

export default function TutorListSection({ tutors }: TutorListSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {tutors.length === 0 ? (
        <p className="text-gray-500">등록된 튜터가 없습니다.</p>
      ) : (
        tutors.map((tutor) => (
          <div
            key={tutor.id}
            className="border p-4 rounded flex justify-between items-center bg-gray-50"
          >
            <div>
              <p className="font-bold">{tutor.name || "이름 없음"} 튜터</p>
              <p className="text-sm text-gray-500">{tutor.email}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
