import React, { useState } from 'react';

const WhenModal = () => {
  const [subTab, setSubTab] = useState('Dates');
  const [stayDuration, setStayDuration] = useState('Weekend');
  const [selectedFlexOption, setSelectedFlexOption] = useState('Exact dates');

  const flexOptions = ['Exact dates', '± 1 day', '± 2 days', '± 3 days', '± 7 days', '± 14 days'];
  const monthsList = [
    { name: 'September', year: '2026' },
    { name: 'October', year: '2026' },
    { name: 'November', year: '2026' },
    { name: 'December', year: '2026' },
    { name: 'January', year: '2027' },
    { name: 'February', year: '2027' },
  ];

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const septDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const septEmpty = [null, null];
  const octDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const octEmpty = [null, null, null, null];

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 w-[680px] text-gray-800 mx-auto select-none">
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-full flex gap-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setSubTab('Dates')}
            className={`px-8 py-2 rounded-full transition ${
              subTab === 'Dates' ? 'bg-white text-black shadow-sm font-bold' : 'text-gray-600 hover:text-black'
            }`}
          >
            Dates
          </button>
          <button
            type="button"
            onClick={() => setSubTab('Flexible')}
            className={`px-8 py-2 rounded-full transition ${
              subTab === 'Flexible' ? 'bg-white text-black shadow-sm font-bold' : 'text-gray-600 hover:text-black'
            }`}
          >
            Flexible
          </button>
        </div>
      </div>

      {subTab === 'Dates' && (
        <div>
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <div className="text-center font-bold text-xs text-gray-900 mb-4">September 2026</div>
              <div className="grid grid-cols-7 gap-y-2 text-center text-[11px] font-semibold text-gray-400 mb-2">
                {daysOfWeek.map((day, i) => <span key={i}>{day}</span>)}
              </div>
              <div className="grid grid-cols-7 gap-y-1 text-center text-xs font-medium text-gray-800">
                {septEmpty.map((_, i) => <div key={`e-${i}`}></div>)}
                {septDays.map((day) => (
                  <div key={day} className="w-8 h-8 flex items-center justify-center rounded-full hover:border hover:border-black cursor-pointer mx-auto transition">
                    {day}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-center font-bold text-xs text-gray-900 mb-4">October 2026</div>
              <div className="grid grid-cols-7 gap-y-2 text-center text-[11px] font-semibold text-gray-400 mb-2">
                {daysOfWeek.map((day, i) => <span key={i}>{day}</span>)}
              </div>
              <div className="grid grid-cols-7 gap-y-1 text-center text-xs font-medium text-gray-800">
                {octEmpty.map((_, i) => <div key={`e-${i}`}></div>)}
                {octDays.map((day) => (
                  <div key={day} className="w-8 h-8 flex items-center justify-center rounded-full hover:border hover:border-black cursor-pointer mx-auto transition">
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 pt-2 border-t border-gray-100 overflow-x-auto">
            {flexOptions.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => setSelectedFlexOption(opt)}
                className={`px-3.5 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap transition ${
                  selectedFlexOption === opt ? 'border-black bg-gray-50 text-black font-semibold' : 'border-gray-200 text-gray-600 hover:border-black'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {subTab === 'Flexible' && (
        <div className="py-2">
          <div className="text-center mb-6">
            <h4 className="text-sm font-bold text-gray-900 mb-3">How long would you like to stay?</h4>
            <div className="flex justify-center gap-2">
              {['Weekend', 'Week', 'Month'].map((dur) => (
                <button
                  type="button"
                  key={dur}
                  onClick={() => setStayDuration(dur)}
                  className={`px-5 py-2 rounded-full border text-xs font-semibold transition ${
                    stayDuration === dur ? 'border-black bg-gray-50 text-black' : 'border-gray-200 text-gray-600 hover:border-black'
                  }`}
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-xs font-bold text-gray-900 text-center mb-4">Go anytime</h4>
            <div className="grid grid-cols-6 gap-3">
              {monthsList.map((m, idx) => (
                <div key={idx} className="border border-gray-200 hover:border-black rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition hover:shadow-xs group">
                  <div className="text-2xl mb-2 text-gray-400 group-hover:text-black">🗓️</div>
                  <div className="text-xs font-bold text-gray-900">{m.name}</div>
                  <div className="text-[10px] text-gray-500 font-medium">{m.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhenModal;