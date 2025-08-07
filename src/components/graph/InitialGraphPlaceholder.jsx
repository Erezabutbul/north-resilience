import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, ArrowDown } from 'lucide-react';

export default function InitialGraphPlaceholder({ onScrollToFilters }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 text-center">
      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
        <Filter className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">ברוכים הבאים לגרף הקשרים</h2>
      <p className="text-gray-600 max-w-md mb-6">
        הגרף מציג את הקשרים בין ארגונים, תחומי התמחות, מענים, אוכלוסיות לפי מיקום גיאוגרפי.
        כדי להתחיל, השתמשו בסינון בצד ימין להתאמת התצוגה לפי הצרכים שלכם.
      </p>
      <Button onClick={onScrollToFilters} size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-md">
        <ArrowDown className="w-5 h-5 ml-2" />
        להתחיל בסינון
      </Button>
    </div>
  );
}