export interface SurveyAnswers {
  university: string;
  interests: string[];
  interest?: string;
  energyPreference: string;
  communicationPreference: string;
  structurePreference: string;
  learningGoal: string;
}

export interface ChoiceStepConfig {
  step: number;
  key: keyof SurveyAnswers;
  question: string;
  options: {
    label: string;
    summaryLabel: string;
  }[];
}

export const POPULAR_UNIVERSITIES = [
  "ソウル大学校",
  "延世大学校",
  "高麗大学校",
  "成均館大学校",
  "漢陽大学校",
  "未定",
];

export const STEP2_INTEREST_OPTIONS = [
  "課外活動・インターン・キャリア",
  "サークル活動",
  "大学文化・学園祭",
  "学業・勉強",
  "韓国生活・遊び",
];

// Step 7 요약 카드용 항목 이름 매핑
export const SUMMARY_TITLE_MAP: Record<string, string> = {
  energyPreference: "好みの雰囲気",
  communicationPreference: "訂正スタイル",
  structurePreference: "進め方",
  learningGoal: "学習目標",
};

// Step 3 ~ 6 단일 선택 단계 데이터
export const CHOICE_STEPS: ChoiceStepConfig[] = [
  {
    step: 3,
    key: "energyPreference",
    question: "授業中の好みの雰囲気は？",
    options: [
      {
        label: "テンポ良く会話が弾む、エネルギーあふれる明るい雰囲気！",
        summaryLabel: "明るく活動的",
      },
      {
        label:
          "落ち着いて真剣に、自分のペースに合わせてくれるリラックスした雰囲気",
        summaryLabel: "リラックス・マイペース",
      },
    ],
  },
  {
    step: 4,
    key: "communicationPreference",
    question: "言葉に詰まったり文法を間違えた時のチューターの対応は？",
    options: [
      {
        label: "間違えた部分をその場ですぐに丁寧に直してほしい！",
        summaryLabel: "その場で即時指導",
      },
      {
        label:
          "会話の流れを止めずに自然に聞いてくれて、後でまとめて教えてほしい",
        summaryLabel: "後でまとめてフィードバック",
      },
    ],
  },
  {
    step: 5,
    key: "structurePreference",
    question: "授業の資料や進度について、私は…",
    options: [
      {
        label: "体系的なカリキュラムと決まった教材・資料があると安心する",
        summaryLabel: "体系的カリキュラム",
      },
      {
        label: "その日の日常や関心のあるテーマで自由に会話したい",
        summaryLabel: "自由なフリートーク",
      },
    ],
  },
  {
    step: 6,
    key: "learningGoal",
    question: "今回の授業を通して最も得たいものは？",
    options: [
      {
        label: "文法、語彙、試験対策など、確かな実力を身につけること",
        summaryLabel: "文法・語彙・試験対策",
      },
      {
        label: "ネイティブのように自然に話せる実践的な会話と文化",
        summaryLabel: "自然な実践会話",
      },
    ],
  },
];
