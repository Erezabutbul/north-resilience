
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Briefcase, MapPin, X, Handshake, ActivitySquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NodeDetails({ node, onClose, graphData }) {
  if (!node) return null;

  const nameMapping = {
    "ק\"ש מתנסים": "עיריית קריית שמונה – רשת המתנ\"סים",
    "ק\"ש חינוך": "עיריית קריית שמונה – אגף החינוך",
    "ק\"ש רווחה": "עיריית קריית שמונה – אגף הרווחה",
    "ק\"ש שפ\"ח": "עיריית קריית שמונה – שירות פסיכולוגי-חינוכי (שפ\"ח)",
    "מ. מבואות חרמון": "מועצה אזורית מבואות חרמון",
    "מ. גליל עליון שפ\"ח": "מועצה אזורית גליל עליון – שירות פסיכולוגי-חינוכי (שפ\"ח)",
    "מ. גליל עליון חינוך": "מועצה אזורית גליל עליון – אגף החינוך",
    "מ. גליל עליון רווחה": "מועצה אזורית גליל עליון – אגף הרווחה",
    "על\"ם": "עמותת על\"ם – עזרה לנוער במצוקה",
    "נט\"ל": "נט\"ל – עמותה לנפגעי טראומה על רקע לאומי",
    "הנוער העובד והלומד": "התנועה – הנוער העובד והלומד",
  };

  const nodeTypes = {
    organization: { icon: Building2, color: 'blue', label: 'ארגון' },
    partner: { icon: Handshake, color: 'purple', label: 'שותף' },
    population: { icon: Users, color: 'amber', label: 'אוכלוסיה' },
    service: { icon: Briefcase, color: 'emerald', label: 'תחום התמחות' },
    solution: { icon: ActivitySquare, color: 'rose', label: 'מענה' },
    location: { icon: MapPin, color: 'orange', label: 'פריסה גיאוגרפית' }
  };

  const { icon: Icon, color, label } = nodeTypes[node.type] || { icon: Building2, color: 'gray', label: 'צומת' };

  const cardColors = {
    organization: 'from-blue-50 to-indigo-50 border-blue-200',
    partner: 'from-purple-50 to-violet-50 border-purple-200',
    population: 'from-amber-50 to-orange-50 border-amber-200',
    service: 'from-emerald-50 to-green-50 border-emerald-200',
    solution: 'from-rose-50 to-pink-50 border-rose-200',
    location: 'from-orange-50 to-red-50 border-orange-200',
    default: 'from-gray-50 to-slate-50 border-gray-200'
  };

  const connections = useMemo(() => {
    const getConnections = () => {
      const connections = {
        organizations: [],
        partners: [],
        populations: [],
        services: [],
        solutions: [],
        locations: []
      };

      if (!graphData || !graphData.edges) return connections;

      graphData.edges.forEach(edge => {
        const isSource = edge.source === node.id;
        const isTarget = edge.target === node.id;
        
        if (!isSource && !isTarget) return;

        // Get the connected node (the other end of the edge)
        const connectedNodeId = isSource ? edge.target : edge.source;
        const connectedNode = graphData.nodes.find(n => n.id === connectedNodeId);
        
        if (!connectedNode) return;

        // Categorize the connected node by its type
        switch (connectedNode.type) {
          case 'organization':
            connections.organizations.push(connectedNode);
            break;
          case 'partner':
            connections.partners.push(connectedNode);
            break;
          case 'population':
            connections.populations.push(connectedNode);
            break;
          case 'service':
            connections.services.push(connectedNode);
            break;
          case 'solution':
            connections.solutions.push(connectedNode);
            break;
          case 'location':
            connections.locations.push(connectedNode);
            break;
        }
      });

      // Remove duplicates (in case there are multiple edges between the same nodes)
      Object.keys(connections).forEach(key => {
        const uniqueNodes = new Map();
        connections[key].forEach(node => {
          uniqueNodes.set(node.id, node);
        });
        connections[key] = Array.from(uniqueNodes.values());
      });

      return connections;
    };
    return getConnections();
  }, [node, graphData]);

  const shortName = node.id.replace(/^(Organization: |Partner: |Population: |Service: |Location: |Solution: )/, '');
  const displayName = nameMapping[shortName] || shortName;

  // ConnectionSection component definition
  const ConnectionSection = ({ title, items, icon: SectionIcon, colorClass }) => {
    if (!items || items.length === 0) return null;
    
    return (
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <SectionIcon className={`w-4 h-4 ${colorClass}`} />
          {title} ({items.length})
        </h4>
        <div className="space-y-1">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-white/40 rounded-lg text-sm">
              <div className={`w-2 h-2 rounded-full ${
                item.type === 'organization' ? 'bg-blue-500' :
                item.type === 'partner' ? 'bg-purple-500' :
                item.type === 'population' ? 'bg-amber-500' :
                item.type === 'service' ? 'bg-emerald-500' :
                item.type === 'solution' ? 'bg-rose-500' :
                'bg-orange-500'
              }`} />
              <span className="text-gray-700">
                {item.id.replace(/^(Organization: |Partner: |Population: |Service: |Location: |Solution: )/, '')}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className={`backdrop-blur-sm bg-white/90 shadow-xl border-t-4 ${cardColors[node.type] || cardColors.default} overflow-hidden`}>
      <CardHeader className="flex flex-row items-start justify-between pb-4">
        <div className="flex items-center gap-3">
          {Icon && <Icon className={`w-5 h-5 text-${color}-600`} />}
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800">
              {displayName}
            </CardTitle>
            {nameMapping[shortName] && (
              <p className="text-xs text-gray-500 mt-1">({shortName})</p>
            )}
            <Badge variant="secondary" className="mt-1 text-xs">
              {label}
            </Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4 max-h-96 overflow-y-auto">
        {/* Show all connection types for every node */}
        <ConnectionSection 
          title="ארגונים מחוברים" 
          items={connections.organizations} 
          icon={Building2} 
          colorClass="text-blue-600" 
        />
        
        <ConnectionSection 
          title="שותפים אסטרטגיים" 
          items={connections.partners} 
          icon={Handshake} 
          colorClass="text-purple-600" 
        />
        
        <ConnectionSection 
          title="אוכלוסיות" 
          items={connections.populations} 
          icon={Users} 
          colorClass="text-amber-600" 
        />
        
        <ConnectionSection 
          title="תחומי התמחות" 
          items={connections.services} 
          icon={Briefcase} 
          colorClass="text-emerald-600" 
        />
        
        <ConnectionSection 
          title="מענים" 
          items={connections.solutions} 
          icon={ActivitySquare} 
          colorClass="text-rose-600" 
        />
        
        <ConnectionSection 
          title="פריסה גיאוגרפית" 
          items={connections.locations} 
          icon={MapPin} 
          colorClass="text-orange-600" 
        />

        {/* Show summary if no connections */}
        {Object.values(connections).every(arr => arr.length === 0) && (
          <div className="p-3 bg-white/60 rounded-lg">
            <p className="text-sm text-gray-600">
              אין חיבורים זמינים לצומת זה.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
