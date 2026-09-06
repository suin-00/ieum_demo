// 1. 역할 타입 정의
export type UserRole = "tutor" | "student";
export type UserGender = "male" | "female" | "other";

// 2. 테이블을 다룰 때 쓸 수 있는 확장 타입 예시
export interface Profile {
  id: string;
  role: UserRole;
  gender: UserGender;
}
