
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Building2, Users, Briefcase, MapPin, Handshake, ActivitySquare } from "lucide-react";

export default function GraphLegend() {
  const nodeTypes = [
    { type: 'organization', color: 'bg-blue-600', icon: <Building2 className="w-3 h-3 text-white" />, label: 'ארגון מפעיל' },
    { type: 'partner', color: 'bg-purple-600', icon: <Handshake className="w-3 h-3 text-white" />, label: 'שותף אסטרטגי' },
    { type: 'population', color: 'bg-amber-500', icon: <Users className="w-3 h-3 text-white" />, label: 'אוכלוסיה' },
    { type: 'service', color: 'bg-emerald-500', icon: <Briefcase className="w-3 h-3 text-white" />, label: 'תחום התמחות' },
    { type: 'solution', color: 'bg-rose-600', icon: <ActivitySquare className="w-3 h-3 text-white" />, label: 'מענה' },
    { type: 'location', color: 'bg-orange-600', icon: <MapPin className="w-3 h-3 text-white" />, label: 'פריסה גיאוגרפית' }
  ];

  const connectionTypes = [
    { label: 'שותפות אסטרטגית', color: 'border-purple-500', style: 'solid' },
    { label: 'שירותים לאוכלוסיות', color: 'border-emerald-500', style: 'solid' },
    { label: 'מענים לאוכלוסיות', color: 'border-rose-500', style: 'solid' },
    { label: 'שותפות בהפעלה', color: 'border-blue-500', style: 'solid' },
    { label: 'פריסה גיאוגרפית', color: 'border-orange-500', style: 'solid' }
  ];

  return (
    <Card className="backdrop-blur-sm bg-white/90 shadow-xl border-0">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <Info className="w-4 h-4 text-blue-600" />
          מקרא
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Node Types */}
          <div>
            <h4 className="font-medium text-sm mb-2 text-gray-700">סוגי צמתים</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {nodeTypes.map((item) => (
                <div key={item.type} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color} flex items-center justify-center`}>
                    {/* The icon can be placed here if needed */}
                  </div>
                  <span className="text-xs text-gray-600">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Connection Types */}
          <div>
            <h4 className="font-medium text-sm mb-2 text-gray-700">סוגי קשרים</h4>
            <div className="space-y-2">
              {connectionTypes.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  {/* Applying color as a Tailwind class and borderStyle inline for functionality */}
                  <div className={`w-8 h-px border-t-2 ${item.color}`} style={{ borderStyle: item.style }}></div>
                  <span className="text-xs text-gray-600">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
