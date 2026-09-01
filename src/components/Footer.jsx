import React, { useState } from 'react';

const DESTINATIONS = [
  { city: "طوكيو", desc: "مساكن للإيجار لقضاء العطلات" },
  { city: "ويلمنغتون", desc: "فيلات للإيجار" },
  { city: "كي ويست", desc: "شقق للإيجار" },
  { city: "سانتو دومينغو", desc: "الإيجارات الشهرية" },
  { city: "مدريد", desc: "شقق للإيجار" },
  { city: "غولف شورز", desc: "فيلات للإيجار" },
  { city: "فيلادلفيا", desc: "شقق للإيجار" },
  { city: "أورنج بيتش", desc: "مساكن للإيجار لقضاء العطلات" },
  { city: "سان دييغو", desc: "أكواخ للإيجار" },
  { city: "أوشن سيتي", desc: "الإيجارات الشهرية" },
  { city: "كاواي", desc: "مساكن للإيجار لقضاء العطلات" },
  { city: "سان خوان", desc: "مساكن للإيجار لقضاء العطلات" },
  { city: "لندن", desc: "شقق للإيجار" },
  { city: "أوساكا", desc: "بيوت للإيجار" },
  { city: "برانسون", desc: "أكواخ للإيجار" },
  { city: "واشنطن", desc: "مساكن للإيجار لقضاء العطلات" },
  { city: "رالي", desc: "الإيجارات الشهرية" }
];

const TABS = ["رائج", "الفنون والثقافة", "على الشاطئ", "الجبال", "أنشطة في الهواء الطلق", "الأنشطة"];

const Footer = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12 pt-10 pb-8 text-gray-800">
      <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="pb-10 border-b border-gray-200">
          <h2 className="text-[20px] font-bold text-gray-900 mb-4">
            احصل على الإلهام للرحلات المستقبلية
          </h2>

          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar border-b border-gray-200 text-[14px]">
            {TABS.map((tab, idx) => (
              <button
                key={tab}
                onClick={() => setActiveTab(idx)}
                className={`pb-3 font-semibold transition-colors whitespace-nowrap border-b-2 ${
                  activeTab === idx
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-6 pt-6">
            {DESTINATIONS.map((item, idx) => (
              <div key={idx} className="cursor-pointer group">
                <p className="font-semibold text-[13.5px] text-gray-900 group-hover:underline">
                  {item.city}
                </p>
                <p className="text-[12.5px] text-gray-500 truncate">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-b border-gray-200 text-[13.5px]">
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-[14px]">الدعم</h3>
            <ul className="space-y-2.5 text-gray-600">
              <li className="hover:underline cursor-pointer">مركز المساعدة</li>
              <li className="hover:underline cursor-pointer">الحصول على مساعدة بشأن مشكلة تتعلق بالسلامة</li>
              <li className="hover:underline cursor-pointer">AirCover</li>
              <li className="hover:underline cursor-pointer">التأمين على السفر</li>
              <li className="hover:underline cursor-pointer">مناهضة التمييز</li>
              <li className="hover:underline cursor-pointer">دعم ذوي الاحتياجات</li>
              <li className="hover:underline cursor-pointer">خيارات الإلغاء</li>
              <li className="hover:underline cursor-pointer">إبلاغ عن مخاوف في الحي</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-[14px]">الاستضافة</h3>
            <ul className="space-y-2.5 text-gray-600">
              <li className="hover:underline cursor-pointer">اعرض بيتك على Airbnb</li>
              <li className="hover:underline cursor-pointer">اعرض تجربة السفر التي تقدمها على Airbnb</li>
              <li className="hover:underline cursor-pointer">اعرض الخدمة التي تقدمها على Airbnb</li>
              <li className="hover:underline cursor-pointer">حماية AirCover للمضيفين</li>
              <li className="hover:underline cursor-pointer">موارد الاستضافة</li>
              <li className="hover:underline cursor-pointer">منتدى المجتمع</li>
              <li className="hover:underline cursor-pointer">الاستضافة بمسؤولية</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-[14px]">Airbnb</h3>
            <ul className="space-y-2.5 text-gray-600">
              <li className="hover:underline cursor-pointer">تحديث الصيف لعام 2026</li>
              <li className="hover:underline cursor-pointer">غرفة الأخبار</li>
              <li className="hover:underline cursor-pointer">الوظائف</li>
              <li className="hover:underline cursor-pointer">المستثمرون</li>
              <li className="hover:underline cursor-pointer">بطاقات الهدايا</li>
              <li className="hover:underline cursor-pointer">Airbnb.org للطوارئ</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-[13px] text-gray-600">
          <div className="flex items-center gap-2 flex-wrap">
            <span>© 2026 Airbnb, Inc.</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">الخصوصية</span>
            <span>·</span>
            <span className="hover:underline cursor-pointer">البنود</span>
          </div>

          <div className="flex items-center gap-4 font-semibold text-gray-900">
            <span className="hover:underline cursor-pointer flex items-center gap-1">
              العربية (EG)
            </span>
            <span className="hover:underline cursor-pointer">
              EGP
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
