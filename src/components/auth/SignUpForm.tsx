"use client";

import { useState, useActionState } from "react";
import { signupWithEmail, checkEmailDuplicate } from "@/actions/auth";

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(signupWithEmail, null);

  const [email, setEmail] = useState("");
  const [emailCheckMsg, setEmailCheckMsg] = useState("");
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckEmail = async () => {
    if (!email) {
      setEmailCheckMsg("이메일을 입력해주세요.");
      return;
    }

    setIsChecking(true);
    try {
      const isDuplicate = await checkEmailDuplicate(email);
      if (isDuplicate) {
        setEmailCheckMsg("이미 사용 중인 이메일입니다.");
        setIsEmailChecked(false);
      } else {
        setEmailCheckMsg("사용 가능한 이메일입니다.");
        setIsEmailChecked(true);
      }
    } catch {
      setEmailCheckMsg("중복 확인 중 오류가 발생했습니다.");
      setIsEmailChecked(false);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            성 (Last Name)
          </label>
          <input
            type="text"
            name="last_name"
            required
            className="mt-1 block w-full border p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            이름 (First Name)
          </label>
          <input
            type="text"
            name="first_name"
            required
            className="mt-1 block w-full border p-2 rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            성 카나 (Last Kana)
          </label>
          <input
            type="text"
            name="last_name_kana"
            placeholder="きむ"
            className="mt-1 block w-full border p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            이름 카나 (First Kana)
          </label>
          <input
            type="text"
            name="first_name_kana"
            placeholder="すいん"
            className="mt-1 block w-full border p-2 rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            성별
          </label>
          <select
            name="gender"
            required
            className="mt-1 block w-full border p-2 rounded-md"
          >
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            한국어 수준
          </label>
          <select
            name="korean_level"
            className="mt-1 block w-full border p-2 rounded-md"
          >
            <option value="beginner">초급 (Beginner)</option>
            <option value="intermediate">중급 (Intermediate)</option>
            <option value="advanced">고급 (Advanced)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          희망 학교 (School)
        </label>
        <input
          type="text"
          name="school"
          required
          className="mt-1 block w-full border p-2 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          이메일
        </label>
        <div className="flex gap-2 mt-1">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailChecked(false);
              setEmailCheckMsg("");
            }}
            required
            className="flex-1 border p-2 rounded-md"
          />
          <button
            type="button"
            onClick={handleCheckEmail}
            disabled={isChecking}
            className="px-4 bg-gray-200 text-gray-800 text-sm rounded-md hover:bg-gray-300 transition-colors whitespace-nowrap"
          >
            {isChecking ? "확인 중..." : "중복확인"}
          </button>
        </div>
        {emailCheckMsg && (
          <p
            className={`text-xs mt-1 ${isEmailChecked ? "text-green-600" : "text-red-500"}`}
          >
            {emailCheckMsg}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          비밀번호
        </label>
        <input
          type="password"
          name="password"
          required
          className="mt-1 block w-full border p-2 rounded-md"
        />
      </div>

      {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}
      {state?.success && (
        <p className="text-green-600 text-sm">회원가입이 완료되었습니다!</p>
      )}

      <button
        type="submit"
        disabled={isPending || !isEmailChecked}
        className={`w-full p-2 text-white rounded-md transition-colors ${
          !isEmailChecked
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isPending ? "가입 중..." : "회원가입"}
      </button>
    </form>
  );
}
