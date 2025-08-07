
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Users, Briefcase, GitBranch, MapPin, Check, ChevronsUpDown, X, Building2, Handshake, ActivitySquare, Target } from "lucide-react";

export default function GraphControls({
  filters,
  onFiltersChange,
  selectedOrganizations,
  onSelectedOrganizationsChange,
  graphData, // New prop: graphData is now required to derive organization names
}) {
  // leadingNodeType state controls the active button style. Initialized from filters prop or default.
  const [leadingNodeType, setLeadingNodeType] = useState(filters.leadingNodeType || 'organization');
  const [open, setOpen] = useState(false);

  // Memoize the list of organization/node names for the popover.
  // These names are cleaned by removing category prefixes.
  const organizationNames = useMemo(() => {
    if (!graphData || !graphData.nodes) return [];
    
    const names = new Set();
    // Use the leadingNodeType from filters prop as the source of truth for data operations
    const currentNodeType = filters.leadingNodeType || 'organization';
    graphData.nodes.forEach(node => {
      if (node.type === currentNodeType) {
        // Remove category prefixes for cleaner display
        // Updated regex to include 'Organization: '
        const cleanName = node.id.replace(/^(Organization: |Population: |Service: |Location: |Solution: |Partner: )/, '');
        names.add(cleanName);
      }
    });

    const namesArray = Array.from(names);

    // Custom sorting for 'population' type
    if (currentNodeType === 'population') {
      const chronologicalPopulationOrder = [
        'גיל הרך (לידה-6)',
        'יסודי (6–12)',
        'חטיבת ביניים ( 12-15)',
        'תיכון (15-18)',
        'צעירים (18-25)',
        'בוגרים (18+)',
        'אזרחים ותיקים (65+)',
        'הורים ומשפחות',
      ];
      
      return namesArray.sort((a, b) => {
        const indexA = chronologicalPopulationOrder.indexOf(a);
        const indexB = chronologicalPopulationOrder.indexOf(b);
        
        // Handle items in the defined order
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }
        // Place items in order before those not in the order
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        
        // Alphabetical sort for any other items
        return a.localeCompare(b, 'he');
      });
    }

    // Reverse alphabetical sort for location type
    if (currentNodeType === 'location') {
      return namesArray.sort((a, b) => b.localeCompare(a, 'he'));
    }

    // Default alphabetical sort for all other types, with Hebrew support
    return namesArray.sort((a, b) => a.localeCompare(b, 'he'));

  }, [graphData, filters.leadingNodeType]); // Updated dependencies

  // Check if any filters are applied
  const hasFilters = useMemo(() => {
    // Check if any specific organizations are selected
    if (selectedOrganizations.length > 0) return true;
    
    // Check if any toggle filters are OFF (meaning they are filtering)
    if (!filters.showOrganizations) return true;
    if (!filters.showPartnerships) return true;
    if (!filters.showPopulations) return true;
    if (!filters.showProfessions) return true;
    if (!filters.showSolutions) return true;
    if (!filters.showLocations) return true;
    
    // Check if leadingNodeType is not the default 'organization'
    if (filters.leadingNodeType && filters.leadingNodeType !== 'organization') return true;

    return false;
  }, [selectedOrganizations, filters]);

  const nodeTypeOptions = [
    { value: 'organization', label: 'ארגונים', icon: Building2 },
    { value: 'partner', label: 'שותפים', icon: Handshake },
    { value: 'population', label: 'אוכלוסיות', icon: Users },
    { value: 'service', label: 'התמחויות', icon: Target }, // Updated to match new data structure
    { value: 'solution', label: 'מענים', icon: ActivitySquare },
    { value: 'location', label: 'פריסה', icon: MapPin }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  // Handles selection of a cleaned name, maps it back to the full node ID
  const handleOrgSelect = (cleanName) => {
    if (!graphData || !graphData.nodes) return;
    
    const currentNodeType = filters.leadingNodeType || 'organization';
    // Find the original full node ID that corresponds to the clean name and current node type
    // Updated regex to include 'Organization: '
    const fullNodeId = graphData.nodes.find(node =>
      node.type === currentNodeType &&
      node.id.replace(/^(Organization: |Population: |Service: |Location: |Solution: |Partner: )/, '') === cleanName
    )?.id;

    if (!fullNodeId) return; // Should not happen if cleanName originated from organizationNames list

    onSelectedOrganizationsChange(prev =>
      prev.includes(fullNodeId) ? prev.filter(item => item !== fullNodeId) : [...prev, fullNodeId]
    );
  };

  // Handles removal of a selected item by its cleaned name, maps it back to the full node ID
  const handleOrgRemove = (cleanName) => {
    if (!graphData || !graphData.nodes) return;
    
    const currentNodeType = filters.leadingNodeType || 'organization';
    // Find the full node ID that corresponds to this clean name
    // Updated regex to include 'Organization: '
    const fullNodeId = graphData.nodes.find(node =>
      node.type === currentNodeType &&
      node.id.replace(/^(Organization: |Population: |Service: |Location: |Solution: |Partner: )/, '') === cleanName
    )?.id;

    if (!fullNodeId) return; // Should not happen if cleanName came from a selected badge

    onSelectedOrganizationsChange(prev => prev.filter(item => item !== fullNodeId));
  };

  // Updates the local state for button highlighting and notifies parent about filter change
  const handleLeadingNodeTypeChange = (newType) => {
    setLeadingNodeType(newType); // Update local state for UI styling
    onSelectedOrganizationsChange([]); // Clear selected items when the leading node type changes
    
    // Turn off all filters except the one corresponding to the selected leading node type
    const newFilters = {
      showOrganizations: newType === 'organization',
      showPartnerships: newType === 'partner',
      showPopulations: newType === 'population',
      showProfessions: newType === 'service', // Adjusted to 'service' to match nodeTypeOptions value
      showSolutions: newType === 'solution',
      showLocations: newType === 'location',
      leadingNodeType: newType
    };
    
    onFiltersChange(newFilters); // Notify parent about the new filters
  };

  const handleClearAllFilters = () => {
    // Reset all filters to their default state (all ON)
    onFiltersChange({
      showOrganizations: true,
      showPopulations: true,
      showProfessions: true,
      showLocations: true,
      showPartnerships: true,
      showSolutions: true,
      leadingNodeType: 'organization'
    });
    
    // Clear selected organizations
    onSelectedOrganizationsChange([]);
    
    // Reset local state
    setLeadingNodeType('organization');
    setOpen(false);
  };

  return (
    <>
      <Card className="backdrop-blur-sm bg-white/90 shadow-xl border-0">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <Filter className="w-5 h-5 text-blue-600" />
              סינון
            </CardTitle>
            
            {/* Clear All Filters Button */}
            {hasFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAllFilters}
                className="text-xs px-3 py-1 h-7 bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300"
              >
                <X className="w-3 h-3 mr-1" />
                נקה הכל
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Leading Node Type Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-600" />
              סוג הצומת המוביל
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {nodeTypeOptions.map(option => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleLeadingNodeTypeChange(option.value)}
                    className={`p-3 rounded-lg border-2 transition-all flex items-center gap-2 text-sm ${
                      leadingNodeType === option.value // Use local state for active button styling
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Organization/Node Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-gray-600" />
              מיקוד לפי {nodeTypeOptions.find(opt => opt.value === (filters.leadingNodeType || 'organization'))?.label}
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between bg-white/80"
                >
                  {selectedOrganizations.length > 0 ? `${selectedOrganizations.length} נבחרו` : `בחר ${nodeTypeOptions.find(opt => opt.value === (filters.leadingNodeType || 'organization'))?.label || 'פריטים'}...`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                  <CommandInput placeholder={`חיפוש ${nodeTypeOptions.find(opt => opt.value === (filters.leadingNodeType || 'organization'))?.label || 'פריטים'}...`} />
                  <CommandList>
                    <CommandEmpty>לא נמצאו פריטים.</CommandEmpty>
                    <CommandGroup>
                      {organizationNames.map((cleanName) => {
                        // Determine if this clean name corresponds to a selected full node ID
                        let isSelected = false;
                        if (graphData && graphData.nodes) {
                          const currentNodeType = filters.leadingNodeType || 'organization';
                          // Updated regex to include 'Organization: '
                          const fullNodeId = graphData.nodes.find(node =>
                            node.type === currentNodeType &&
                            node.id.replace(/^(Organization: |Population: |Service: |Location: |Solution: |Partner: )/, '') === cleanName
                          )?.id;
                          isSelected = fullNodeId && selectedOrganizations.includes(fullNodeId);
                        }

                        return (
                          <CommandItem
                            key={cleanName} // Use clean name as key for the CommandItem
                            value={cleanName}
                            onSelect={() => {
                              handleOrgSelect(cleanName); // Pass the clean name to the handler
                            }}
                          >
                            <Check
                              className={`mr-2 h-4 w-4 ${
                                isSelected ? "opacity-100" : "opacity-0"
                              }`}
                            />
                            {cleanName}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {selectedOrganizations.length > 0 && (
              <div className="pt-2 space-y-1">
                {/* Map over full IDs from selectedOrganizations, but display clean names */}
                {selectedOrganizations.map(fullId => {
                  // Derive the clean name from the full ID for display
                  // This regex is not affected by the outlined changes, preserving existing functionality.
                  const cleanName = fullId.replace(/^(Organization: |Population: |Service: |Location: |Solution: |Partner: )/, '');
                  return (
                    <Badge
                      key={fullId} // Keep fullId as key for stable identity
                      variant="secondary"
                      className="mr-1 mb-1 bg-blue-100 text-blue-800 border-blue-200"
                    >
                      {cleanName}
                      <button
                        onClick={() => handleOrgRemove(cleanName)} // Pass the clean name for removal
                        className="mr-2 rounded-full hover:bg-blue-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          {/* Toggle Switches */}
          <div className="space-y-3">
            {/* Organizations Switch */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <Label htmlFor="organizations" className="text-sm font-medium text-gray-700">
                  הצג ארגונים
                </Label>
              </div>
              <Switch
                id="organizations"
                checked={filters.showOrganizations}
                onCheckedChange={(checked) => handleFilterChange('showOrganizations', checked)}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            {/* Partnerships Switch */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100">
              <div className="flex items-center gap-2">
                <Handshake className="w-4 h-4 text-purple-600" />
                <Label htmlFor="partnerships" className="text-sm font-medium text-gray-700">
                  הצג שותפויות
                </Label>
              </div>
              <Switch
                id="partnerships"
                checked={filters.showPartnerships}
                onCheckedChange={(checked) => handleFilterChange('showPartnerships', checked)}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>

            {/* Populations Switch */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-600" />
                <Label htmlFor="populations" className="text-sm font-medium text-gray-700">
                  הצג אוכלוסיות
                </Label>
              </div>
              <Switch
                id="populations"
                checked={filters.showPopulations}
                onCheckedChange={(checked) => handleFilterChange('showPopulations', checked)}
                className="data-[state=checked]:bg-amber-600"
              />
            </div>

            {/* Professions Switch (formerly Services) */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-600" />
                <Label htmlFor="professions" className="text-sm font-medium text-gray-700">
                  הצג תחומי התמחות
                </Label>
              </div>
              <Switch
                id="professions"
                checked={filters.showProfessions}
                onCheckedChange={(checked) => handleFilterChange('showProfessions', checked)}
                className="data-[state=checked]:bg-emerald-600"
              />
            </div>

            {/* Activities Switch */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-100">
              <div className="flex items-center gap-2">
                <ActivitySquare className="w-4 h-4 text-rose-600" />
                <Label htmlFor="activities" className="text-sm font-medium text-gray-700">
                  הצג מענים
                </Label>
              </div>
              <Switch
                id="activities"
                checked={filters.showSolutions}
                onCheckedChange={(checked) => handleFilterChange('showSolutions', checked)}
                className="data-[state=checked]:bg-emerald-600"
              />
            </div>

            {/* Locations Switch */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-600" />
                <Label htmlFor="locations" className="text-sm font-medium text-gray-700">
                  הצג פריסה גיאוגרפית
                </Label>
              </div>
              <Switch
                id="locations"
                checked={filters.showLocations}
                onCheckedChange={(checked) => handleFilterChange('showLocations', checked)}
                className="data-[state=checked]:bg-orange-600"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
