interface Tutor {
  id: string;
  name: string | null;
  email: string | null;
}

export default function TutorList({ tutors }: { tutors: Tutor[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {tutors.length === 0 ? (
        <p className="text-gray-500">등록된 튜터가 없습니다.</p>
      ) : (
        tutors.map((tutor) => (
          <div
            key={tutor.id}
            className="border p-4 rounded bg-gray-50 space-y-1"
          >
            <p className="font-bold">{tutor.name || "이름 없음"} 튜터</p>
            <p className="text-sm text-gray-500">{tutor.email}</p>
          </div>
        ))
      )}
    </div>
  );
}
