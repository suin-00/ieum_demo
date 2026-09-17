'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, Paperclip, Send, MoreVertical, 
  Phone, Video, FileText, Image as ImageIcon,
  Menu, X, Check, Clock, Settings, Download,
  ChevronLeft
} from 'lucide-react';

const UNIFIED_IMAGE_URL = "https://github.com/user-attachments/assets/a6cd9eb3-f396-442f-b16c-cfbbe5b69fb4";

export default function Chat() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeChatId, setActiveChatId] = useState('1');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [mobileView, setMobileView] = useState<'list' | 'chat' | 'info'>('list');

  // 講師リスト (Japanese Localization)
  const [chats] = useState([
    {
      id: '1',
      name: 'パク・ジフン 講師',
      role: 'ソウル大学校 国語国文学科',
      lastMessage: '資料拝見しました！明日の授業で詳しく解説しますね。',
      time: '10:10',
      unread: false,
      avatar: UNIFIED_IMAGE_URL
    },
    {
      id: '2',
      name: 'キム・ソヨン 講師',
      role: '高麗大学校 言語教育院',
      lastMessage: '新しいTOPIKⅡ頻出問題の解説PDFを共有しました。',
      time: '14:47',
      unread: true,
      avatar: UNIFIED_IMAGE_URL
    },
    {
      id: '3',
      name: 'チョン・ウソン 講師',
      role: '延世大学校 韓国語学堂',
      lastMessage: '本日の発音練習の録音フィードバックをお送りします。',
      time: '19:15',
      unread: true,
      avatar: UNIFIED_IMAGE_URL
    },
    {
      id: '4',
      name: 'イ・ジウン 講師',
      role: '成均館大学校 国際学部',
      lastMessage: '自己紹介書（自己PR）の添削が完了しました！',
      time: '昨日',
      unread: false,
      avatar: UNIFIED_IMAGE_URL
    },
    {
      id: '5',
      name: 'カン・ハヌル 講師',
      role: '漢陽大学校 留学支援室',
      lastMessage: '語学堂出願手続きのスケジュールについてご案内です。',
      time: '5月14日',
      unread: false,
      avatar: UNIFIED_IMAGE_URL
    }
  ]);

  // 会話履歴 (Japanese Localization)
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'tutor',
      text: 'こんにちは、花子さん！IEUM個別指導チャットへようこそ。専任講師のパク・ジフンです。本日の事前課題やご質問はいかがでしょうか？',
      time: '10:08',
      read: true
    },
    {
      id: 'm2',
      sender: 'user',
      text: 'パク先生、おはようございます！明日のTOPIK対策レッスンの事前課題について、いくつか確認したい点がありメッセージしました。',
      time: '10:09',
      read: true
    },
    {
      id: 'm3',
      sender: 'tutor',
      text: 'ご連絡ありがとうございます！すぐに確認いたしますので、気になる点や解けなかった問題があれば教えていただけますか？',
      time: '10:10',
      read: true
    },
    {
      id: 'm4',
      sender: 'user',
      text: 'はい！今週末の模擬試験に向けて復習しておきたい作文問題のメモと、過去問のノートを添付いたします。',
      time: '10:10',
      images: [
        UNIFIED_IMAGE_URL,
        UNIFIED_IMAGE_URL,
        UNIFIED_IMAGE_URL
      ],
      read: true
    },
    {
      id: 'm5',
      sender: 'tutor',
      text: '資料拝見しました！とても熱心に予習されていて素晴らしいですね。特に苦手とされていた接続詞の使い方と論理展開を中心に、明日の授業で詳しく解説しますね！',
      time: '10:11',
      read: true
    }
  ]);

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const now = new Date();
    const timeString = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newMsg = {
      id: `m_${Date.now()}`,
      sender: 'user',
      text: inputMessage.trim(),
      time: timeString,
      read: false // 新しいメッセージは未読状態
    };

    setMessages(prev => [...prev, newMsg]);
    setInputMessage('');
  };

  const filteredChats = chats.filter(chat => {
    if (unreadOnly && !chat.unread) return false;
    if (searchQuery.trim()) {
      return chat.name.includes(searchQuery.trim()) || chat.lastMessage.includes(searchQuery.trim());
    }
    return true;
  });

  return (
    <div className={`w-full flex flex-col overflow-hidden font-sans bg-white md:bg-slate-50 ${
      mobileView === 'list'
        ? 'relative h-[calc(100dvh-4rem)] md:h-screen md:min-h-[100dvh]'
        : 'fixed inset-0 z-[60] md:relative md:inset-auto md:z-auto md:h-screen md:min-h-[100dvh]'
    }`}>
      {/* 2. Main Content Area */}
      <div className="flex-1 min-h-0 w-full max-w-[1600px] mx-auto md:px-6 lg:px-12 md:pt-5 pb-0 flex flex-col overflow-hidden">
        {/* Main Chat Container (Apple Style 3-Column 1.5:4:1.5 with No Gaps) */}
        <div className="flex-1 min-h-0 w-full bg-white md:rounded-t-2xl rounded-b-none md:border border-b-0 border-slate-200 shadow-sm flex overflow-hidden">
          
          {/* ================= A. Left Column (Chat List - 1.5 ratio / approx 21.4%) ================= */}
          <div className={`w-full md:w-[21.4%] flex-shrink-0 h-full flex-col border-r border-slate-100 bg-white min-h-0 overflow-x-hidden ${mobileView === 'list' ? 'flex' : 'hidden md:flex'}`}>
            {/* Header */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100 flex-shrink-0">
              <h2 className="text-[17px] md:text-lg font-bold text-[#0E2640]">メッセージ</h2>
            </div>
            
            {/* Search & Filter */}
            <div className="px-4 py-3 border-b border-slate-50 flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="メッセージ・講師を検索..."
                  className="block w-full pl-9 pr-3 py-2 bg-slate-50 border-none rounded-md text-[13px] md:text-sm placeholder-slate-400 focus:ring-1 focus:ring-slate-200 focus:bg-white transition-colors outline-none"
                />
              </div>
              <div className="flex items-center gap-2 mt-3">
                <button 
                  onClick={() => setUnreadOnly(false)}
                  className={`text-[10px] md:text-[11px] font-bold px-3 py-1.5 rounded-md transition-colors flex-1 ${
                    !unreadOnly 
                      ? 'bg-[#0E2640] text-white' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  すべて
                </button>
                <button 
                  onClick={() => setUnreadOnly(true)}
                  className={`text-[10px] md:text-[11px] font-bold px-3 py-1.5 rounded-md transition-colors flex-1 ${
                    unreadOnly 
                      ? 'bg-[#0E2640] text-white' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  未読のみ
                </button>
              </div>
            </div>

            {/* List Items */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden divide-y divide-slate-50 min-h-0">
              {filteredChats.length === 0 ? (
                <div className="p-8 text-center text-[13px] md:text-sm text-slate-400">
                  該当するメッセージはありません
                </div>
              ) : (
                filteredChats.map((chat) => (
                  <div 
                    key={chat.id}
                    onClick={() => {
                      setActiveChatId(chat.id);
                      setMobileView('chat');
                    }}
                    className={`flex items-start gap-3 p-3.5 cursor-pointer transition-colors ${
                      activeChatId === chat.id ? 'bg-slate-50/90 border-l-2 border-[#0E2640]' : 'hover:bg-slate-50/50 border-l-2 border-transparent'
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <img 
                        src={UNIFIED_IMAGE_URL} 
                        alt={chat.name} 
                        className="w-10 h-10 rounded-full object-cover border border-slate-100" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className={`text-[13px] md:text-sm font-bold truncate ${chat.unread ? 'text-[#0E2640]' : 'text-slate-700'}`}>
                          {chat.name}
                        </h3>
                        <span className="text-[10px] md:text-[11px] text-slate-400 whitespace-nowrap ml-1">{chat.time}</span>
                      </div>
                      <p className={`text-[11px] md:text-xs leading-snug line-clamp-1 ${chat.unread ? 'font-semibold text-slate-800' : 'text-slate-500'}`}>
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ================= B. Center Column (Active Chat Window - 4 ratio / approx 57.2%) ================= */}
          <div className={`w-full md:w-[57.2%] flex-shrink-0 h-full flex-col border-r border-slate-100 bg-white relative min-h-0 overflow-x-hidden ${mobileView === 'chat' ? 'flex' : 'hidden md:flex'}`}>
            {/* Header */}
            <div className="px-4 md:px-6 pt-[calc(0.5rem+env(safe-area-inset-top))] pb-2 md:py-3.5 flex items-center justify-between border-b border-slate-100 bg-white z-10 flex-shrink-0 h-[calc(3.5rem+env(safe-area-inset-top))] md:h-auto">
              <div className="flex items-center gap-2 md:gap-3">
                <button 
                  onClick={() => setMobileView('list')}
                  className="md:hidden p-1.5 -ml-1.5 hover:bg-slate-50 rounded-lg text-slate-500 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="relative">
                  <img 
                    src={UNIFIED_IMAGE_URL} 
                    alt={activeChat.name} 
                    className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover border border-slate-100" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h2 className="text-[13px] md:text-base font-bold text-[#0E2640] line-clamp-1">{activeChat.name}</h2>
                  <p className="text-[10px] md:text-xs text-slate-500 font-medium line-clamp-1">
                    {activeChat.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 md:gap-3 text-slate-400">
                <button className="p-1.5 hover:text-[#0E2640] hover:bg-slate-50 rounded-lg transition-colors hidden sm:flex" title="音声通話">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-1.5 hover:text-[#0E2640] hover:bg-slate-50 rounded-lg transition-colors hidden sm:flex" title="ビデオ通話">
                  <Video className="w-5 h-5" />
                </button>
                <button 
                  className="p-1.5 hover:text-[#0E2640] hover:bg-slate-50 rounded-lg transition-colors" 
                  title="メニュー"
                  onClick={() => setMobileView('info')}
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages Area (Scrollable, No horizontal scroll) */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 md:p-6 space-y-4 md:space-y-5 bg-white min-h-0">
              <div className="flex justify-center">
                <span className="text-[11px] md:text-xs font-medium text-slate-400 bg-slate-50 border border-slate-100 px-3 md:px-3.5 py-0.5 md:py-1 rounded-full">
                  2026年5月16日 (月)
                </span>
              </div>
              
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div key={msg.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-full`}>
                    <div 
                      className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-3.5 md:px-4 py-2 md:py-2.5 text-[13px] md:text-sm leading-relaxed break-words ${
                        isUser 
                          ? 'bg-[#485B76] text-white rounded-br-none shadow-xs' 
                          : 'bg-slate-100 text-[#0E2640] rounded-bl-none'
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                      {msg.images && (
                        <div className="flex flex-wrap gap-2 mt-2.5">
                          {msg.images.map((img, i) => (
                            <img 
                              key={i} 
                              src={img} 
                              alt="添付ファイル" 
                              className="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-lg border border-black/5 hover:opacity-90 transition-opacity cursor-pointer flex-shrink-0" 
                              referrerPolicy="no-referrer"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 md:mt-1.5 px-1">
                      <span className="text-[10px] md:text-[11px] text-slate-400 font-medium">{msg.time}</span>
                      {isUser && (
                        <Check 
                          className={`w-3.5 h-3.5 stroke-[2.5] ${msg.read ? 'text-[#F0DDBD]' : 'text-[#0E2640]'}`} 
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Area (Pinned to Bottom, elevated on mobile) */}
            <div className="px-3 pt-2.5 pb-[calc(1rem+env(safe-area-inset-bottom))] md:pb-4 md:pt-4 md:px-4 bg-white border-t border-slate-100 flex-shrink-0">
              <form 
                onSubmit={handleSendMessage} 
                className="flex items-center gap-2 bg-slate-50 p-1.5 md:p-2 rounded-2xl border border-slate-200/70 focus-within:border-[#0E2640]/50 focus-within:bg-white transition-all"
              >
                <button 
                  type="button" 
                  className="p-1.5 md:p-2 text-slate-400 hover:text-[#0E2640] transition-colors flex-shrink-0 cursor-pointer"
                  title="ファイルを添付"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="メッセージを入力..."
                  className="flex-1 min-w-0 bg-transparent border-none text-[13px] md:text-sm text-[#0E2640] placeholder-slate-400 focus:ring-0 outline-none px-2"
                />
                <button 
                  type="submit" 
                  disabled={!inputMessage.trim()}
                  className={`p-2 md:p-2.5 rounded-xl flex-shrink-0 transition-all cursor-pointer ${
                    inputMessage.trim() 
                      ? 'bg-[#0E2640] text-white shadow-xs hover:bg-[#0a1c2f]' 
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                  title="送信"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* ================= C. Right Column (Info & Progress - 1.5 ratio / approx 21.4%) ================= */}
          <div className={`w-full md:w-[21.4%] flex-shrink-0 h-full flex-col bg-white min-h-0 overflow-x-hidden ${mobileView === 'info' ? 'flex' : 'hidden md:flex'}`}>
            {/* Mobile Header for Info */}
            <div className="md:hidden px-4 pt-[calc(0.5rem+env(safe-area-inset-top))] pb-2 flex items-center gap-2 border-b border-slate-100 bg-white flex-shrink-0 h-[calc(3.5rem+env(safe-area-inset-top))]">
              <button 
                onClick={() => setMobileView('chat')}
                className="p-1.5 -ml-1.5 hover:bg-slate-50 rounded-lg text-slate-500 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <span className="font-bold text-[13px] text-[#0E2640]">詳細情報</span>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden divide-y divide-slate-100 min-h-0">
              
              {/* Profile Header (Added back with top padding) */}
              <div className="flex flex-col items-center pt-8 pb-5 px-5 text-center">
                <img 
                  src={UNIFIED_IMAGE_URL} 
                  alt={activeChat.name} 
                  className="w-16 h-16 rounded-full object-cover mb-3 shadow-xs border border-slate-100" 
                  referrerPolicy="no-referrer"
                />
                <h3 className="text-[15px] md:text-base font-bold text-[#0E2640]">{activeChat.name}</h3>
                <p className="text-[10px] md:text-[11px] text-slate-500 mt-1">{activeChat.role}</p>
              </div>

              {/* Learning Progress */}
              <div className="p-4 md:p-5">
                <div className="flex justify-between items-end mb-2">
                  <h4 className="text-[13px] md:text-sm font-bold text-[#0E2640]">受講進捗</h4>
                  <span className="text-[11px] md:text-xs font-bold text-[#196E8A]">6 / 10 回完了</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0E2640] rounded-full" style={{ width: '60%' }}></div>
                </div>
                <div className="mt-3 flex items-center justify-between text-[10px] md:text-[11px]">
                  <span className="text-slate-500 font-medium">残りレッスン</span>
                  <span className="font-bold text-[#0E2640]">4回</span>
                </div>
                <p className="text-[10px] md:text-[11px] text-slate-400 mt-1.5 font-medium leading-relaxed">
                  目標: TOPIKⅡ 6級合格カリキュラム
                </p>
              </div>

              {/* Shared Files/Media */}
              <div className="p-4 md:p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[13px] md:text-sm font-bold text-[#0E2640]">
                    <ImageIcon className="w-4 h-4 text-[#196E8A]" />
                    <span>共有写真・メディア</span>
                  </div>
                  <span className="text-[10px] md:text-[11px] font-bold text-[#196E8A] bg-[#196E8A]/10 px-2.5 py-0.5 rounded-full">26</span>
                </div>
                
                {/* Unified Image Thumbnails */}
                <div className="grid grid-cols-4 gap-1.5">
                  <img 
                    src={UNIFIED_IMAGE_URL} 
                    alt="共有メディア 1" 
                    className="w-full aspect-square object-cover rounded-lg border border-slate-100 cursor-pointer hover:opacity-80 transition-opacity" 
                    referrerPolicy="no-referrer"
                  />
                  <img 
                    src={UNIFIED_IMAGE_URL} 
                    alt="共有メディア 2" 
                    className="w-full aspect-square object-cover rounded-lg border border-slate-100 cursor-pointer hover:opacity-80 transition-opacity" 
                    referrerPolicy="no-referrer"
                  />
                  <img 
                    src={UNIFIED_IMAGE_URL} 
                    alt="共有メディア 3" 
                    className="w-full aspect-square object-cover rounded-lg border border-slate-100 cursor-pointer hover:opacity-80 transition-opacity" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="w-full aspect-square bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors">
                    <span className="text-[10px] md:text-[11px] font-bold text-[#196E8A]">+23</span>
                  </div>
                </div>

                {/* Documents List */}
                <div className="pt-2 space-y-2">
                  <div className="flex items-center justify-between text-[13px] md:text-sm font-bold text-[#0E2640] mb-2">
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#196E8A]" />
                      <span>共有ドキュメント</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="w-4 h-4 text-[#196E8A] flex-shrink-0" />
                      <div className="truncate">
                        <p className="text-[11px] md:text-xs font-semibold text-slate-700 truncate group-hover:text-[#0E2640]">
                          TOPIKⅡ対策_接続詞まとめ.pdf
                        </p>
                        <p className="text-[9px] md:text-[10px] text-slate-400 mt-0.5">1.4 MB • 5月15日</p>
                      </div>
                    </div>
                    <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0E2640] flex-shrink-0 ml-1" />
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="w-4 h-4 text-[#196E8A] flex-shrink-0" />
                      <div className="truncate">
                        <p className="text-[11px] md:text-xs font-semibold text-slate-700 truncate group-hover:text-[#0E2640]">
                          第5回_作文添削シート.docx
                        </p>
                        <p className="text-[9px] md:text-[10px] text-slate-400 mt-0.5">420 KB • 5月12日</p>
                      </div>
                    </div>
                    <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0E2640] flex-shrink-0 ml-1" />
                  </div>
                </div>

                {/* Settings Item */}
                <div className="pt-3">
                  <button className="w-full flex items-center justify-between py-2 text-[13px] md:text-sm font-semibold text-slate-600 hover:text-[#0E2640] transition-colors cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-slate-400" />
                      <span>チャット設定・通知</span>
                    </div>
                    <span className="text-slate-400 text-sm">&rsaquo;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
