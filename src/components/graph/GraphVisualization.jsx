
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Briefcase, MapPin, Phone, Mail, Move, ZoomIn, ZoomOut, Maximize2, Expand, Shrink, X, Handshake, ActivitySquare } from "lucide-react";
import { Button } from "@/components/ui/button";

// Helper function to convert degrees to radians
const toRadians = (degrees) => degrees * (Math.PI / 180);

// Helper function for arc layout
const layoutArc = (nodes, cx, cy, { startAngle, endAngle, minRadius, maxRadius, stagger = true }) => {
  const angleRange = endAngle - startAngle;
  // Adjust angleStep to always distribute nodes even if there's only one
  const angleStep = angleRange / Math.max(1, nodes.length - 1);

  return nodes.map((node, i) => {
    // For a single node, place it in the middle of the arc segment
    const angle = nodes.length > 1 ? (startAngle + i * angleStep) : (startAngle + endAngle) / 2;
    
    // Stagger radius to prevent label overlap for arc layouts
    const radius = stagger && nodes.length > 1 && i % 2 === 0 ? maxRadius : minRadius;
    
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    return { ...node, x, y };
  });
};

// Helper function for column layout
const layoutColumn = (nodes, { x, startY, endY }) => {
  // Adjust yStep to always distribute nodes even if there's only one
  const yStep = (endY - startY) / Math.max(1, nodes.length - 1);

  return nodes.map((node, i) => {
    // For a single node, place it in the middle of the column segment
    const y = nodes.length > 1 ? (startY + i * yStep) : (startY + endY) / 2;
    return { ...node, x, y };
  });
};

export default function GraphVisualization({
  graphData,
  filters,
  selectedNode,
  onNodeSelect,
  selectedOrganizations,
}) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
  const [simulatedLayout, setSimulatedLayout] = useState(null);
  const [draggedNodePositions, setDraggedNodePositions] = useState(new Map()); // Track custom positions

  // Interaction states
  const [isPanning, setIsPanning] = useState(false);
  const [startPanPoint, setStartPanPoint] = useState({ x: 0, y: 0 });
  const [draggedNode, setDraggedNode] = useState(null);
  const dragOccurredRef = useRef(false);
  const panOccurredRef = useRef(false); // New ref to track panning motion

  // Selection box states
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
  const [selectionEnd, setSelectionEnd] = useState({ x: 0, y: 0 });
  const [selectedNodes, setSelectedNodes] = useState(new Set());
  const [isDraggingGroup, setIsDraggingGroup] = useState(false);
  const [groupDragStart, setGroupDragStart] = useState({ x: 0, y: 0 });

  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nameMapping = useMemo(() => ({
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
    "הנוער העובד והלומד": "התנועה – הנוער העובד והלומד"
  }), []);

  // Helper to convert hex to RGB values string
  const hexToRgb = (hex) => {
    if (!hex || hex.length !== 7) return '107, 114, 128'; // Default gray RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const nodeColorsHex = useMemo(() => ({
    organization: '#1e40af', // Deep blue
    partner: '#9333ea', // Purple
    population: '#f59e0b',   // Amber
    service: '#10b981', // Emerald Green (changed from service_type)
    solution: '#e11d48',     // Rose
    location: '#f97316'      // Orange
  }), []);

  const getNodeColor = useCallback((node) => {
    const opacity = 0.8;
    const rgb = hexToRgb(nodeColorsHex[node.type] || '#6b7280');
    return `rgba(${rgb}, ${opacity})`;
  }, [nodeColorsHex]);

  const getEdgeColor = useCallback((edge) => {
    const edgeColors = {
      // Location connections
      location_organization: '#f97316',   // Orange
      location_partner: '#f97316',        // Orange  
      location_population: '#f97316',     // Orange
      location_service: '#f97316',        // Orange
      location_solution: '#f97316',       // Orange
      
      // Organization connections
      organization_partner: '#8b5cf6',    // Purple
      organization_population: '#f59e0b', // Amber
      organization_service: '#10b981',   // Emerald
      organization_solution: '#e11d48',   // Rose
      
      // Partner connections
      partner_population: '#8b5cf6',      // Purple
      partner_service: '#8b5cf6',         // Purple
      partner_solution: '#8b5cf6',        // Purple
      
      // Population connections
      population_service: '#f59e0b',      // Amber
      population_solution: '#f59e0b',     // Amber
      
      // Service connections
      service_solution: '#10b981',        // Emerald
      
      // Legacy support (fallback)
      serves: '#f59e0b',
      offers: '#10b981',
      collaboration: '#3b82f6',
      partners_with: '#8b5cf6',
      located_in: '#f97316',
      solution: '#ef4444'
    };
    return edgeColors[edge.type] || '#6b7280';
  }, []);

  const filteredData = useMemo(() => {
    if (!graphData) return { nodes: [], edges: [] };

    let baseNodes = graphData.nodes;
    let baseEdges = graphData.edges;

    // First, filter by selected organizations/collaborators if any
    if (selectedOrganizations && selectedOrganizations.length > 0) {
      const selectedIds = new Set(selectedOrganizations); // Hub(s)

      // Step 1: Find all direct neighbors of the hub(s)
      const neighborIds = new Set();
      graphData.edges.forEach(edge => {
        if (selectedIds.has(edge.source)) neighborIds.add(edge.target);
        if (selectedIds.has(edge.target)) neighborIds.add(edge.source);
      });

      // Step 2: The set of all nodes in our sub-graph (hubs + their neighbors)
      const relevantNodeIds = new Set([...selectedIds, ...neighborIds]);
      
      // Step 3: Filter nodes based on this complete set
      baseNodes = graphData.nodes.filter(node => relevantNodeIds.has(node.id));

      // Step 4: Filter edges to include ALL connections WITHIN the sub-graph
      // This ensures edges between two neighbors (not directly connected to a hub) are also included
      baseEdges = graphData.edges.filter(edge => 
        relevantNodeIds.has(edge.source) && relevantNodeIds.has(edge.target)
      );
    }
    
    // Apply edge type filters to determine which edges should be visible
    let filteredEdges = baseEdges.filter(edge => {
      // Handle specific combined edge types first
      if (edge.type === 'organization_solution') {
        return filters.showOrganizations && filters.showSolutions;
      }
      if (edge.type === 'organization_service') {
        return filters.showOrganizations && filters.showProfessions;
      }
      if (edge.type === 'organization_partner') {
        return filters.showOrganizations && filters.showPartnerships;
      }
      if (edge.type === 'organization_population') {
        return filters.showOrganizations && filters.showPopulations;
      }
      if (edge.type === 'organization_location') {
        return filters.showOrganizations && filters.showLocations;
      }
      if (edge.type === 'service_solution') {
        return filters.showProfessions && filters.showSolutions;
      }
      if (edge.type === 'partner_solution') {
        return filters.showPartnerships && filters.showSolutions;
      }
      if (edge.type === 'partner_service') {
        return filters.showPartnerships && filters.showProfessions;
      }
      if (edge.type === 'partner_population') {
        return filters.showPartnerships && filters.showPopulations;
      }
      if (edge.type === 'population_service') {
        return filters.showPopulations && filters.showProfessions;
      }
      if (edge.type === 'population_solution') {
        return filters.showPopulations && filters.showSolutions;
      }
      if (edge.type === 'location_organization') {
        return filters.showLocations && filters.showOrganizations;
      }
      if (edge.type === 'location_partner') {
        return filters.showLocations && filters.showPartnerships;
      }
      if (edge.type === 'location_population') {
        return filters.showLocations && filters.showPopulations;
      }
      if (edge.type === 'location_service') {
        return filters.showLocations && filters.showProfessions;
      }
      if (edge.type === 'location_solution') {
        return filters.showLocations && filters.showSolutions;
      }
      
      // Handle generic edge types that contain keywords
      if (edge.type.includes('partner')) {
        return filters.showPartnerships;
      }
      if (edge.type.includes('population')) {
        return filters.showPopulations;
      }
      if (edge.type.includes('service')) {
        return filters.showProfessions;
      }
      if (edge.type.includes('solution')) {
        return filters.showSolutions;
      }
      if (edge.type.includes('location')) {
        return filters.showLocations;
      }
      if (edge.type.includes('organization')) {
        return filters.showOrganizations;
      }
      
      // Default: show edge if both node types are enabled
      return true;
    });

    // Get all node IDs that are connected by visible edges
    const connectedNodeIds = new Set();
    filteredEdges.forEach(edge => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });

    // Filter nodes based on both toggle filters and whether they have connections
    let finalNodes = baseNodes.filter(node => {
      // Always show nodes that are explicitly selected in the filter
      if (selectedOrganizations && selectedOrganizations.includes(node.id)) {
        return true;
      }

      // Check if the node type's corresponding filter is enabled
      let nodeTypeFilterEnabled = true;
      switch (node.type) {
        case 'organization':
          nodeTypeFilterEnabled = filters.showOrganizations;
          break;
        case 'partner':
          nodeTypeFilterEnabled = filters.showPartnerships;
          break;
        case 'population':
          nodeTypeFilterEnabled = filters.showPopulations;
          break;
        case 'service':
          nodeTypeFilterEnabled = filters.showProfessions;
          break;
        case 'solution':
          nodeTypeFilterEnabled = filters.showSolutions;
          break;
        case 'location':
          nodeTypeFilterEnabled = filters.showLocations;
          break;
        default:
          nodeTypeFilterEnabled = true;
      }

      // If the node type filter is off, don't show the node
      if (!nodeTypeFilterEnabled) {
        return false;
      }

      // Show the node if it has connections through visible edges
      return connectedNodeIds.has(node.id);
    });

    // Final edge filtering to ensure both source and target are still visible
    const visibleNodeIds = new Set(finalNodes.map(n => n.id));
    let finalEdges = filteredEdges.filter(edge =>
      visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)
    );

    return { nodes: finalNodes, edges: finalEdges };
  }, [graphData, filters, selectedOrganizations]);

  const getNodeSize = useCallback((node) => (node.type === 'organization' || node.type === 'partner' ? 12 : node.type === 'solution' ? 10 : 8), []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) {
      setSimulatedLayout(null);
      return;
    }

    if (!filteredData.nodes.length) {
      setSimulatedLayout({ nodes: [], edges: [] });
      return;
    }

    const { width, height } = dimensions;
    const centerX = width / 2;
    const centerY = height / 2;

    let layoutNodes;

    // --- NEW STATIC LAYOUT LOGIC ---
    // A single node must be selected to trigger the focused layout
    if (selectedOrganizations && selectedOrganizations.length === 1 && filteredData.nodes.some(n => n.id === selectedOrganizations[0])) {
      const centerNodeId = selectedOrganizations[0];
      const centerNode = filteredData.nodes.find(n => n.id === centerNodeId);
      const satelliteNodes = filteredData.nodes.filter(n => n.id !== centerNodeId);

      // Place the central node
      // Ensure centerNode exists before pushing
      layoutNodes = centerNode ? [{ ...centerNode, x: centerX, y: centerY }] : [];

      // Group satellite nodes by type
      const nodesByType = {
        population: satelliteNodes.filter(n => n.type === 'population'),
        location: satelliteNodes.filter(n => n.type === 'location'),
        service: satelliteNodes.filter(n => n.type === 'service'),
        solution: satelliteNodes.filter(n => n.type === 'solution'),
        partner: satelliteNodes.filter(n => n.type === 'partner'),
        organization: satelliteNodes.filter(n => n.type === 'organization'),
      };

      // Define the fixed spatial regions
      // Angles are in radians. Radii/coordinates are relative to dimensions.
      const baseRadius = Math.min(width, height);
      
      // Dynamic solution arc based on count
      const solutionCount = nodesByType.solution.length;
      const serviceCount = nodesByType.service.length;
      const partnerCount = nodesByType.partner.length;
      
      let solutionArcRange, solutionRadius;
      
      if (solutionCount <= 5) {
        // Moderately clustered in the inner ring for 5 or fewer solutions
        solutionArcRange = { start: toRadians(-130), end: toRadians(-50) };
        solutionRadius = { min: baseRadius * 0.38, max: baseRadius * 0.42 };
      } else {
        // Move solutions to the outermost ring for more than 5 solutions
        solutionArcRange = { start: toRadians(-160), end: toRadians(-20) };
        solutionRadius = { min: baseRadius * 0.55, max: baseRadius * 0.62 };
      }

      // Dynamic partner arc based on count
      let partnerArcRange;
      if (partnerCount <= 5) {
        // Very tight arc for few partners
        partnerArcRange = { start: toRadians(160), end: toRadians(200) };
      } else if (partnerCount <= 15) {
        // Moderate spread
        partnerArcRange = { start: toRadians(140), end: toRadians(220) };
      } else {
        // Full spread for many partners
        partnerArcRange = { start: toRadians(110), end: toRadians(250) };
      }

      // Dynamic radius adjustment for organizations and partners based on solution/service count
      const outerRadiusMultiplier = Math.max(1, (solutionCount <= 5 ? solutionCount : 0) / 20 + serviceCount / 30); // Adjusted multiplier
      const baseOuterRadius = baseRadius * 0.45 * outerRadiusMultiplier;
      const maxOuterRadius = baseRadius * 0.52 * outerRadiusMultiplier;

      const regions = {
        // Top-inner arc for Populations
        population: { 
          type: 'arc', 
          startAngle: toRadians(-120), 
          endAngle: toRadians(-60), 
          minRadius: baseRadius * 0.18, 
          maxRadius: baseRadius * 0.22, 
          stagger: true 
        },
        
        // Dynamic upper arc for Solutions
        solution: { 
          type: 'arc', 
          startAngle: solutionArcRange.start, 
          endAngle: solutionArcRange.end, 
          minRadius: solutionRadius.min, 
          maxRadius: solutionRadius.max, 
          stagger: true 
        },
        
        // Bottom arc for Locations
        location: { 
          type: 'arc', 
          startAngle: toRadians(60), 
          endAngle: toRadians(120), 
          minRadius: baseRadius * 0.18, 
          maxRadius: baseRadius * 0.22, 
          stagger: true 
        },
        
        // Bottom-outer arc for Services (expanded when many services)
        service: { 
          type: 'arc', 
          startAngle: toRadians(40), 
          endAngle: toRadians(140), 
          minRadius: baseRadius * (0.28 + serviceCount * 0.002), 
          maxRadius: baseRadius * (0.32 + serviceCount * 0.002), 
          stagger: true 
        },
        
        // Left curved arc for Partners (now with dynamic spread)
        partner: { 
          type: 'arc', 
          startAngle: partnerArcRange.start, 
          endAngle: partnerArcRange.end, 
          minRadius: baseOuterRadius, 
          maxRadius: maxOuterRadius, 
          stagger: false 
        },
        
        // Right curved arc for Organizations (expanded and more spread)
        organization: { 
          type: 'arc', 
          startAngle: toRadians(-70), 
          endAngle: toRadians(70), 
          minRadius: baseOuterRadius, 
          maxRadius: maxOuterRadius, 
          stagger: false 
        },
      };

      // Special adjustment for population, service, or location leading nodes
      if (selectedOrganizations && selectedOrganizations.length === 1) {
        const centerNodeId = selectedOrganizations[0];
        const centerNode = filteredData.nodes.find(n => n.id === centerNodeId);
        
        const isBalancedLayoutNode = centerNode && ['population', 'service', 'location'].includes(centerNode.type);

        if (isBalancedLayoutNode) {
          // Push solutions farther out to avoid collision for these views
          regions.solution = {
            type: 'arc',
            startAngle: toRadians(-140),
            endAngle: toRadians(-40),
            minRadius: baseRadius * 0.60,
            maxRadius: baseRadius * 0.68,
            stagger: true
          };

          // ONLY for population nodes, move locations to the top to avoid crowding with services
          if (centerNode.type === 'population') {
            regions.location = {
              type: 'arc',
              startAngle: toRadians(-120),
              endAngle: toRadians(-60),
              minRadius: baseRadius * 0.18,
              maxRadius: baseRadius * 0.22,
              stagger: true
            };
          }

          // Dynamically balance the space for Organization and Partner nodes
          const orgNodes = nodesByType.organization || [];
          const partnerNodes = nodesByType.partner || [];
          const totalSideNodes = orgNodes.length + partnerNodes.length;

          if (totalSideNodes > 0) {
            const orgRatio = orgNodes.length / totalSideNodes;
            
            // Define a continuous arc from the right side, around the bottom, to the left side
            const totalArcStart = toRadians(-80); // Starts slightly up from the right
            const totalArcEnd = toRadians(260);   // Ends slightly up from the left
            const totalArcSpan = totalArcEnd - totalArcStart;
            
            // Add a small gap between organization and partner sections to prevent overlap
            const gapSize = toRadians(5); // 5 degree gap
            const availableSpan = totalArcSpan - gapSize;
            
            const orgArcSpan = availableSpan * orgRatio;
            const orgArcEnd = totalArcStart + orgArcSpan;

            // Assign the calculated arc space to organizations
            regions.organization.startAngle = totalArcStart;
            regions.organization.endAngle = orgArcEnd;

            // Assign the remaining arc space to partners with a small gap
            regions.partner.startAngle = orgArcEnd + gapSize;
            regions.partner.endAngle = totalArcEnd;
            
            // Also slightly adjust the radius to create more separation
            regions.organization.minRadius = baseOuterRadius * 0.95;
            regions.organization.maxRadius = maxOuterRadius * 0.95;
            regions.partner.minRadius = baseOuterRadius * 1.05;
            regions.partner.maxRadius = maxOuterRadius * 1.05;
          }
        }
      }

      // Apply the layout for each category
      for (const [type, params] of Object.entries(regions)) {
        const nodesToLayout = nodesByType[type];
        if (nodesToLayout && nodesToLayout.length > 0) {
          // All regions are now 'arc', so simplified logic
          const laidOutNodes = layoutArc(nodesToLayout, centerX, centerY, params);
          layoutNodes.push(...laidOutNodes);
        }
      }
    } else {
      // Fallback for overview mode (no single node selected)
      // Scatter nodes randomly within a bounded area
      layoutNodes = filteredData.nodes.map(node => ({
        ...node,
        x: centerX + (Math.random() - 0.5) * width * 0.6,
        y: centerY + (Math.random() - 0.5) * height * 0.6
      }));
    }

    // --- Finalize layout data ---
    const finalNodeMap = new Map();
    layoutNodes.forEach(node => finalNodeMap.set(node.id, node));

    const finalEdges = filteredData.edges.map(edge => ({
      ...edge,
      source: finalNodeMap.get(typeof edge.source === 'object' ? edge.source.id : edge.source),
      target: finalNodeMap.get(typeof edge.target === 'object' ? edge.target.id : edge.target)
    })).filter(edge => edge.source && edge.target); // Filter out any edges whose source/target nodes were not found (e.g., if centerNode was not found)

    setSimulatedLayout({ nodes: layoutNodes, edges: finalEdges });
  }, [filteredData, dimensions, selectedOrganizations]);

  // This useMemo will apply dragged positions and remap edges for final rendering
  const graphLayout = useMemo(() => {
    if (!simulatedLayout) return null;

    // Apply any previously dragged node positions (user overrides)
    const finalNodes = simulatedLayout.nodes.map(node => {
        return draggedNodePositions && draggedNodePositions.has(node.id) ? { ...node, ...draggedNodePositions.get(node.id) } : node;
    });

    // Create a map for quick lookup of node objects by ID
    const finalNodeMap = new Map();
    finalNodes.forEach(node => finalNodeMap.set(node.id, node));

    // Re-map edges to use the final, potentially user-modified node objects as their source/target
    const finalEdges = simulatedLayout.edges.map(edge => ({
      ...edge,
      source: finalNodeMap.get(typeof edge.source === 'object' ? edge.source.id : edge.source),
      target: finalNodeMap.get(typeof edge.target === 'object' ? edge.target.id : edge.target)
    })).filter(edge => edge.source && edge.target); // Filter out any edges whose source/target nodes were somehow removed

    return { nodes: finalNodes, edges: finalEdges };
  }, [simulatedLayout, draggedNodePositions]);

  const finalLayout = useMemo(() => {
    // If no node is selected, or no layout is ready, return the base layout
    if (!selectedNode || !graphLayout) {
      return graphLayout;
    }

    const { nodes, edges } = graphLayout;
    const centerNode = nodes.find(n => n.id === selectedNode.id);

    if (!centerNode) {
      // If the selected node is not in the current graph layout (e.g., filtered out), 
      // we should still try to show it by creating a new minimal layout centered on it.
      const originalNode = graphData?.nodes?.find(n => n.id === selectedNode.id);
      if (originalNode) {
        const centerX = dimensions.width / 2;
        const centerY = dimensions.height / 2;
        
        // Start with only the selected node at the center
        const newNodes = [
          { ...originalNode, x: centerX, y: centerY }
        ];
        
        const nodeMap = new Map(newNodes.map(n => [n.id, n]));
        
        // Find connected nodes from the original graph data, regardless of filters
        const connectedNodeIds = new Set();
        if (graphData?.edges) {
          graphData.edges.forEach(edge => {
            const sourceId = typeof edge.source === 'object' ? edge.source.id : edge.source;
            const targetId = typeof edge.target === 'object' ? edge.target.id : edge.target;
            if (sourceId === selectedNode.id) connectedNodeIds.add(targetId);
            if (targetId === selectedNode.id) connectedNodeIds.add(sourceId);
          });
        }
        
        // Get the actual connected nodes from the original graphData, excluding the selected node itself
        const actualConnectedNodes = graphData.nodes.filter(n => 
          connectedNodeIds.has(n.id) && n.id !== selectedNode.id
        );

        // Add these connected nodes to the newNodes array and nodeMap
        actualConnectedNodes.forEach(node => {
          const newNode = { ...node }; // Deep copy to avoid modifying original graphData
          newNodes.push(newNode);
          nodeMap.set(node.id, newNode);
        });
        
        // Position connected nodes in a circle around the center node
        if (actualConnectedNodes.length > 0) {
          const radius = Math.min(dimensions.width, dimensions.height) * 0.25;
          const angleStep = (2 * Math.PI) / actualConnectedNodes.length;
          
          actualConnectedNodes.forEach((node, i) => {
            const angle = i * angleStep - Math.PI / 2; // Start at top
            const nodeInMap = nodeMap.get(node.id);
            if (nodeInMap) {
              nodeInMap.x = centerX + radius * Math.cos(angle);
              nodeInMap.y = centerY + radius * Math.sin(angle);
            }
          });
        }
        
        // Create edges that connect to the selected node, using the original graphData
        const relevantEdges = graphData?.edges?.filter(edge => {
          const sourceId = typeof edge.source === 'object' ? edge.source.id : edge.source;
          const targetId = typeof edge.target === 'object' ? edge.target.id : edge.target;
          return (sourceId === selectedNode.id || targetId === selectedNode.id) &&
                 nodeMap.has(sourceId) && nodeMap.has(targetId); // Ensure both ends are in the newNodes map
        }).map(edge => ({
          ...edge,
          source: nodeMap.get(typeof edge.source === 'object' ? edge.source.id : edge.source),
          target: nodeMap.get(typeof edge.target === 'object' ? edge.target.id : edge.target)
        })).filter(edge => edge.source && edge.target) || [];
        
        return { nodes: Array.from(nodeMap.values()), edges: relevantEdges };
      }
      return graphLayout; // fallback if selected node is not found at all, even in original graphData
    }

    // --- Start creating the exploded layout for when centerNode IS found in graphLayout ---
    const newNodes = nodes.map(n => ({...n})); // Deep copy nodes to modify positions
    const nodeMap = new Map(newNodes.map(n => [n.id, n]));

    // Find connected nodes
    const connectedNodeIds = new Set();
    edges.forEach(edge => {
      const sourceId = typeof edge.source === 'object' ? edge.source.id : edge.source;
      const targetId = typeof edge.target === 'object' ? edge.target.id : edge.target;
      if (sourceId === selectedNode.id) connectedNodeIds.add(targetId);
      if (targetId === selectedNode.id) connectedNodeIds.add(sourceId);
    });
    
    const connectedNodes = newNodes.filter(n => connectedNodeIds.has(n.id));

    // Group connected nodes by type
    const nodesByType = connectedNodes.reduce((acc, node) => {
      acc[node.type] = acc[node.type] || [];
      acc[node.type].push(node);
      return acc;
    }, {});

    // Position the center node at the screen center
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    
    // Update the selected node position to center
    const selectedNodeInMap = nodeMap.get(selectedNode.id);
    if (selectedNodeInMap) {
      selectedNodeInMap.x = centerX;
      selectedNodeInMap.y = centerY;
    }

    // Arrange connected nodes in arcs around the center node
    const types = Object.keys(nodesByType).sort();
    const numTypes = types.length;
    let typeStartAngle = -Math.PI / 2; // Start at 12 o'clock

    if (numTypes > 0) {
      const anglePerType = (2 * Math.PI) / numTypes;

      types.forEach((type) => {
        const groupNodes = nodesByType[type];
        const numInGroup = groupNodes.length;
        
        // Make radius larger for clarity and add extra spacing for organizations and partners
        let baseRadius = Math.min(dimensions.width, dimensions.height) * 0.2;
        if (type === 'organization' || type === 'partner') {
          baseRadius = Math.min(dimensions.width, dimensions.height) * 0.35; // Much larger radius for orgs/partners
        }
        const radius = baseRadius + numInGroup * 15;

        // Calculate the angular space for this group's nodes
        // Much more spread for organizations and partners
        let angleSpreadForGroup;
        if (type === 'organization' || type === 'partner') {
          angleSpreadForGroup = toRadians(Math.min(numInGroup * 25, 90)); // Increased spacing
        } else {
          angleSpreadForGroup = toRadians(Math.min(numInGroup * 15, 45));
        }
        
        let nodeAngle = typeStartAngle;
        
        // Center the cluster of nodes around the main angle for the type
        if (numInGroup > 1) {
            nodeAngle -= angleSpreadForGroup / 2;
        }

        groupNodes.forEach(nodeToLayout => {
          const x = centerX + radius * Math.cos(nodeAngle);
          const y = centerY + radius * Math.sin(nodeAngle);
          
          // Update position in the map
          const nodeInMap = nodeMap.get(nodeToLayout.id);
          if (nodeInMap) {
            nodeInMap.x = x;
            nodeInMap.y = y;
          }
          
          // Increment angle for the next node in the same group
          if (numInGroup > 1) {
            nodeAngle += angleSpreadForGroup / (numInGroup - 1);
          }
        });

        typeStartAngle += anglePerType;
      });
    }

    // Apply user-dragged positions as an override to the programmatic layout
    // This ensures that if a node within the exploded view was manually dragged,
    // its dragged position takes precedence over the calculated layout position.
    if (draggedNodePositions) {
      draggedNodePositions.forEach((pos, nodeId) => {
          const nodeInMap = nodeMap.get(nodeId);
          if (nodeInMap) {
              nodeInMap.x = pos.x;
              nodeInMap.y = pos.y;
          }
      });
    }

    // Remap edges to the new node objects
    const newEdges = edges.map(edge => ({
      ...edge,
      source: nodeMap.get(typeof edge.source === 'object' ? edge.source.id : edge.source),
      target: nodeMap.get(typeof edge.target === 'object' ? edge.target.id : edge.target)
    })).filter(e => e.source && e.target);

    return { nodes: Array.from(nodeMap.values()), edges: newEdges };

  }, [selectedNode, graphLayout, dimensions, graphData, draggedNodePositions]);

  const highlightedElements = useMemo(() => {
    if (!selectedNode || !finalLayout) {
      return null;
    }

    const localNodeIds = new Set([selectedNode.id]);
    const localEdgeKeys = new Set();
    
    // Find directly connected nodes and ONLY the edges connecting to the selected node.
    finalLayout.edges.forEach((edge, i) => {
      const sourceId = typeof edge.source === 'object' ? edge.source.id : edge.source;
      const targetId = typeof edge.target === 'object' ? edge.target.id : edge.target;

      // Check if both source and target are valid node objects (not just IDs)
      if (edge.source && edge.target) {
        if (sourceId === selectedNode.id) {
          localNodeIds.add(targetId);
          localEdgeKeys.add(sourceId + '-' + targetId + '-' + i);
        } else if (targetId === selectedNode.id) {
          localNodeIds.add(sourceId);
          localEdgeKeys.add(sourceId + '-' + targetId + '-' + i);
        }
      }
    });

    return { nodes: localNodeIds, edges: localEdgeKeys };
  }, [selectedNode, finalLayout]);

  const fullscreenConnections = useMemo(() => {
    if (!selectedNode || !graphData) return null;
    
    const connections = {
      organizations: [],
      partners: [],
      populations: [],
      services: [],
      solutions: [],
      locations: []
    };

    graphData.edges.forEach(edge => {
      const sourceId = typeof edge.source === 'object' ? edge.source.id : edge.source;
      const targetId = typeof edge.target === 'object' ? edge.target.id : edge.target;

      const isSource = sourceId === selectedNode.id;
      const isTarget = targetId === selectedNode.id;
      
      if (!isSource && !isTarget) return;

      const connectedNodeId = isSource ? targetId : sourceId;
      const connectedNode = graphData.nodes.find(n => n.id === connectedNodeId);
      
      if (!connectedNode) return;

      const typeKey = `${connectedNode.type}s`; // e.g., 'organization' -> 'organizations'
      const list = connections[typeKey];
      
      if (list && !list.some(n => n.id === connectedNode.id)) {
          list.push(connectedNode);
      }
    });

    return connections;
  }, [selectedNode, graphData]);

  // Effect to center the view on the selected node
  useEffect(() => {
    // When a node is selected, reset the view's pan and clear any previous drag positions
    // This works in conjunction with the finalLayout logic, which programmatically moves
    // the selected node to the center of the graph's coordinate space.
    // Resetting the pan aligns the viewport, effectively centering the node on screen.
    if (selectedNode) {
        setTransform(prev => ({
            ...prev,
            x: 0,
            y: 0,
        }));
        // Clear all dragged node positions when switching to a new selected node
        setDraggedNodePositions(new Map());
    }
  }, [selectedNode]);

  // Use containerRef for dimension calculation
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleMouseDown = (e) => {
    if (e.button === 2) { // Right mouse button
      // Start selection box
      e.preventDefault();
      const svgRect = svgRef.current.getBoundingClientRect();
      const mouseX = (e.clientX - svgRect.left - transform.x) / transform.k;
      const mouseY = (e.clientY - svgRect.top - transform.y) / transform.k;
      
      setIsSelecting(true);
      setSelectionStart({ x: mouseX, y: mouseY });
      setSelectionEnd({ x: mouseX, y: mouseY });
      setSelectedNodes(new Set()); // Clear previous selection
      onNodeSelect(null); // Deselect any single node
      return;
    }

    if (e.button !== 0) return;

    // Check if click is on background (not on a node)
    const target = e.target;
    if (target.tagName === 'svg' || target.tagName === 'rect') {
      // Don't deselect the node immediately on mousedown.
      // This allows panning while the exploded view is active.
      // Deselection will happen on mouseup if no panning occurred.
      panOccurredRef.current = false; // Reset pan occurred flag
      setIsPanning(true);
      const svgRect = svgRef.current.getBoundingClientRect();
      const mouseX = e.clientX - svgRect.left;
      const mouseY = e.clientY - svgRect.top;
      setStartPanPoint({
        x: (mouseX - transform.x) / transform.k,
        y: (mouseY - transform.y) / transform.k
      });
    }
  };

  const handleNodeMouseDown = (e, node) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    e.preventDefault();
    
    dragOccurredRef.current = false;
    
    // Check if this node is part of a selection
    if (selectedNodes?.has(node.id)) {
      // Start group drag
      setIsDraggingGroup(true);
      const svgRect = svgRef.current.getBoundingClientRect();
      const mouseX = (e.clientX - svgRect.left - transform.x) / transform.k;
      const mouseY = (e.clientY - svgRect.top - transform.y) / transform.k;
      setGroupDragStart({ x: mouseX, y: mouseY });
    } else {
      // Single node drag
      setDraggedNode(node.id);
      setSelectedNodes(new Set()); // Clear selection when dragging individual node
    }
    
    setIsPanning(false);
  };

  const handleMouseMove = useCallback((e) => {
    if (isSelecting) {
      // Update selection box
      const svgRect = svgRef.current.getBoundingClientRect();
      const mouseX = (e.clientX - svgRect.left - transform.x) / transform.k;
      const mouseY = (e.clientY - svgRect.top - transform.y) / transform.k;
      setSelectionEnd({ x: mouseX, y: mouseY });
      
      // Update selected nodes based on selection box
      if (finalLayout) {
        const minX = Math.min(selectionStart.x, selectionEnd.x);
        const maxX = Math.max(selectionStart.x, selectionEnd.x);
        const minY = Math.min(selectionStart.y, selectionEnd.y);
        const maxY = Math.max(selectionStart.y, selectionEnd.y);
        
        const nodesInSelection = new Set();
        finalLayout.nodes.forEach(node => { // Use finalLayout for nodes
          // Get the current rendered position of the node (could be layout or dragged)
          const nodePos = draggedNodePositions.get(node.id) || { x: node.x, y: node.y };
          if (nodePos.x >= minX && nodePos.x <= maxX && nodePos.y >= minY && nodePos.y <= maxY) {
            nodesInSelection.add(node.id);
          }
        });
        setSelectedNodes(nodesInSelection);
      }
      return;
    }

    if (isPanning && !draggedNode && !isDraggingGroup) {
      panOccurredRef.current = true; // Register that a pan drag is happening
      // Panning logic
      const svgRect = svgRef.current.getBoundingClientRect();
      const mouseX = e.clientX - svgRect.left;
      const mouseY = e.clientY - svgRect.top;

      setTransform(prev => ({
        ...prev,
        x: mouseX - startPanPoint.x * prev.k,
        y: mouseY - startPanPoint.y * prev.k
      }));
    } else if (isDraggingGroup) {
      // Group drag logic
      dragOccurredRef.current = true;
      
      const svgRect = svgRef.current.getBoundingClientRect();
      const mouseX = (e.clientX - svgRect.left - transform.x) / transform.k;
      const mouseY = (e.clientY - svgRect.top - transform.y) / transform.k;
      
      const deltaX = mouseX - groupDragStart.x;
      const deltaY = mouseY - groupDragStart.y;
      
      // Move all selected nodes
      setDraggedNodePositions(prev => {
        const newMap = new Map(prev || new Map());
        if (selectedNodes && selectedNodes.size > 0) {
          selectedNodes.forEach(nodeId => {
            // Get the current position (either from dragged map or initial layout)
            const currentNode = finalLayout.nodes.find(n => n.id === nodeId); // Use finalLayout for current node
            const currentPos = (prev || new Map()).get(nodeId) || (currentNode ? { x: currentNode.x, y: currentNode.y } : null);
            
            if (currentPos) {
              newMap.set(nodeId, {
                x: currentPos.x + deltaX,
                y: currentPos.y + deltaY
              });
            }
          });
        }
        return newMap;
      });
      
      setGroupDragStart({ x: mouseX, y: mouseY });
    } else if (draggedNode) {
      // Single node drag logic
      dragOccurredRef.current = true;

      const svgRect = svgRef.current.getBoundingClientRect();
      const mouseX = e.clientX - svgRect.left;
      const mouseY = e.clientY - svgRect.top;

      const newX = (mouseX - transform.x) / transform.k;
      const newY = (mouseY - transform.y) / transform.k;

      setDraggedNodePositions(prev => {
        const newMap = new Map(prev || new Map());
        newMap.set(draggedNode, { x: newX, y: newY });
        return newMap;
      });
    }
  }, [isSelecting, isPanning, draggedNode, isDraggingGroup, transform, finalLayout, selectionStart, draggedNodePositions, selectedNodes, groupDragStart, startPanPoint]);

  const handleMouseUp = (e) => {
    if (isSelecting) {
      setIsSelecting(false);
      return;
    }
    
    // If panning was initiated but no mouse movement occurred, it's a click on background.
    // Deselect the node now and clear any dragged positions.
    if (isPanning && !panOccurredRef.current) {
      onNodeSelect(null);
      setSelectedNodes(new Set());
      // Clear dragged positions when deselecting nodes
      setDraggedNodePositions(new Map());
    }

    if (draggedNode || isPanning || isDraggingGroup) {
      e.stopPropagation();
      e.preventDefault();
    }
    setIsPanning(false);
    setDraggedNode(null);
    setIsDraggingGroup(false);
  };

  const handleNodeClick = (e, node) => {
    // If a drag occurred, do not fire the click event.
    if (dragOccurredRef.current) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    // Only select the node if no group selection is active
    if (!selectedNodes?.has(node.id)) {
        onNodeSelect(node);
        setSelectedNodes(new Set()); // Clear any previous selection if clicking a new node
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Make zoom much more gentle and controlled
    const scaleAmount = 1.02;
    const deltaY = e.deltaY;

    // Reduce threshold to make zoom more responsive
    if (Math.abs(deltaY) < 2) return;

    // Reduce zoom frequency limit to make it more responsive
    const now = Date.now();
    if (now - (handleWheel.lastZoom || 0) < 20) return;
    handleWheel.lastZoom = now;

    const newK = deltaY > 0 ? transform.k / scaleAmount : transform.k * scaleAmount;

    // Get mouse position relative to SVG container
    const svgRect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - svgRect.left;
    const mouseY = e.clientY - svgRect.top;

    // Convert mouse position to coordinates in the current SVG space
    const currentSVGX = (mouseX - transform.x) / transform.k;
    const currentSVGY = (mouseY - transform.y) / transform.k;

    // Calculate new transform based on new scale and mouse position
    const newX = mouseX - currentSVGX * newK;
    const newY = mouseY - currentSVGY * newK;

    // Apply stricter zoom limits
    const clampedK = Math.max(0.3, Math.min(newK, 3));

    setTransform({ k: clampedK, x: newX, y: newY });
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      // Enter fullscreen
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current?.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current?.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  // Function to reset all interaction states
  const resetInteractionStates = () => {
    setIsPanning(false);
    setDraggedNode(null);
    setIsDraggingGroup(false);
    setIsSelecting(false);
    dragOccurredRef.current = false;
    panOccurredRef.current = false;
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const newIsFullscreen = !!document.fullscreenElement;
      setIsFullscreen(newIsFullscreen);
      
      // Reset all interaction states when fullscreen changes
      resetInteractionStates();
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Prevent context menu on right-click
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  if (!finalLayout || dimensions.width === 0 || dimensions.height === 0) {
    return (
      <div ref={containerRef} className="flex items-center justify-center w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const nodeTypes = {
    organization: { icon: Building2, color: 'blue', label: 'ארגון' },
    partner: { icon: Handshake, color: 'purple', label: 'שותף' },
    population: { icon: Users, color: 'amber', label: 'אוכלוסיה' },
    service: { icon: Briefcase, color: 'emerald', label: 'תחום התמחות' },
    solution: { icon: ActivitySquare, color: 'rose', label: 'מענה' },
    location: { icon: MapPin, color: 'orange', label: 'פריסה גיאוגרפית' }
  };

  const ConnectionSection = ({ title, items, icon: SectionIcon, colorClass }) => {
    if (!items || items.length === 0) return null;
    
    return (
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          {SectionIcon && <SectionIcon className={`w-4 h-4 ${colorClass}`} />}
          {title} ({items.length})
        </h4>
        <div className="space-y-1">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2 p-1.5 bg-slate-50/60 rounded-md text-xs">
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
    <div ref={containerRef} className={`relative w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''}`}>
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ cursor: draggedNode ? 'grabbing' : isDraggingGroup ? 'grabbing' : isPanning ? 'grabbing' : isSelecting ? 'crosshair' : 'grab' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onContextMenu={handleContextMenu}
        onTouchStart={(e) => e.preventDefault()}
      >
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.k})`}>
          <g className="edges">
            {finalLayout.edges.map((edge, i) => {
              // Using a unique key that includes the index to differentiate between multiple edges between the same nodes
              const edgeKey = `${edge.source.id}-${edge.target.id}-${i}`;
              const isHighlighted = highlightedElements?.edges?.has(edgeKey) || false;
              
              let opacity, strokeWidth;

              // Only show edges when a specific node is selected and this edge is highlighted
              if (selectedNode && isHighlighted) {
                // A specific node is selected, and this edge is a direct connection. Show it.
                opacity = 0.9;
                strokeWidth = 2;
              } else {
                // No node selected OR this edge is not a direct connection to the selected node. Hide it.
                opacity = 0;
                strokeWidth = 1;
              }

              return (
                <line
                  key={edgeKey}
                  x1={edge.source.x} y1={edge.source.y}
                  x2={edge.target.x} y2={edge.target.y}
                  stroke={getEdgeColor(edge)}
                  strokeWidth={strokeWidth}
                  strokeDasharray="none"
                  opacity={opacity}
                  className="transition-all duration-300"
                />
              );
            })}
          </g>

          <g className="nodes">
            {finalLayout.nodes.map(node => {
              const nodePos = (draggedNodePositions && draggedNodePositions.has(node.id)) ? 
                { ...{ x: node.x, y: node.y }, ...draggedNodePositions.get(node.id) } : 
                { x: node.x, y: node.y };
              const isSelectedForMove = selectedNodes?.has(node.id) ?? false;
              const isHighlighted = highlightedElements?.nodes?.has(node.id) ?? !selectedNode; // Highlight if no node is selected, or if this node is part of the highlighted group
              
              return (
                <g
                  key={node.id}
                  className="node-group"
                  transform={`translate(${nodePos.x}, ${nodePos.y})`}
                  style={{
                    opacity: isHighlighted ? 1 : 0.2,
                    transition: 'opacity 0.3s, transform 0.5s ease-in-out',
                  }}
                >
                  <circle
                    cx={0} cy={0}
                    r={getNodeSize(node)}
                    fill={getNodeColor(node)}
                    stroke={isSelectedForMove ? '#ff6b35' : selectedNode?.id === node.id ? '#ffffff' : getNodeColor(node)}
                    strokeWidth={isSelectedForMove ? 3 : 2}
                    className="cursor-pointer transition-all duration-300"
                    onMouseDown={e => handleNodeMouseDown(e, node)}
                    onClick={e => handleNodeClick(e, node)}
                    style={{
                      filter: selectedNode?.id === node.id ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' : isSelectedForMove ? 'drop-shadow(0 2px 4px rgba(255,107,53,0.4))' : 'none',
                      transformOrigin: `center`,
                      cursor: draggedNode === node.id || isDraggingGroup ? 'grabbing' : 'grab',
                      userSelect: 'none'
                    }}
                  />

                  <text
                    x={0}
                    y={getNodeSize(node) + 16}
                    textAnchor="middle"
                    className="text-xs font-medium fill-gray-700 pointer-events-none"
                    style={{ fontSize: '11px', userSelect: 'none' }}
                  >
                    {node.id.replace(/^(Organization: |Population: |Service: |Location: |Solution: |Partner: )/, '')}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Selection box */}
          {isSelecting && (
            <rect
              x={Math.min(selectionStart.x, selectionEnd.x)}
              y={Math.min(selectionStart.y, selectionEnd.y)}
              width={Math.abs(selectionEnd.x - selectionStart.x)}
              height={Math.abs(selectionEnd.y - selectionStart.y)}
              fill="rgba(59, 130, 246, 0.1)"
              stroke="#3b82f6"
              strokeWidth={1}
              strokeDasharray="5,5"
              className="pointer-events-none"
            />
          )}
        </g>
      </svg>

      {/* Controls in top-right */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTransform(prev => ({ ...prev, k: Math.min(prev.k * 1.2, 3) }))}
          className="bg-white/80 backdrop-blur-sm"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTransform(prev => ({ ...prev, k: Math.max(prev.k / 1.2, 0.1) }))}
          className="bg-white/80 backdrop-blur-sm"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setTransform({ x: 0, y: 0, k: 1 });
            setDraggedNodePositions(new Map());
            setSelectedNodes(new Set());
            onNodeSelect(null); // Clear selected node as well
          }}
          className="bg-white/80 backdrop-blur-sm"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleFullscreen}
          className="bg-white/80 backdrop-blur-sm"
          title={isFullscreen ? 'יציאה ממסך מלא' : 'מסך מלא'}
        >
          {isFullscreen ? <Shrink className="w-4 h-4" /> : <Expand className="w-4 h-4" />}
        </Button>
      </div>

      {/* Selection info */}
      {selectedNodes && selectedNodes.size > 0 && (
        <div className="absolute top-4 left-4 bg-orange-100 border border-orange-300 rounded-lg p-2 text-sm">
          <span className="text-orange-800">
            {selectedNodes.size} nodes selected
          </span>
        </div>
      )}

      {/* Fullscreen overlay with legend and controls */}
      {isFullscreen && (
        <>
          {/* Top-left content: Instructions or Node Details */}
          <div className={`absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg ${selectedNode ? 'max-w-sm w-full' : 'w-auto max-w-xs'}`}>
            {!selectedNode ? (
               <>
                <h3 className="font-semibold text-xs mb-2 text-gray-800">הוראות שימוש</h3>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>• לחץ על צומת לפרטים נוספים</p>
                  <p>• גרור צמתים למיקום חדש</p>
                  <p>• לחץ ימני וגרור לבחירת קבוצת צמתים</p>
                </div>
              </>
            ) : (() => {
                const shortName = selectedNode.id.replace(/^(Organization: |Partner: |Population: |Service: |Location: |Solution: )/, '');
                const displayName = nameMapping[shortName] || shortName;
                
                return (
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between pb-3 border-b mb-3">
                        <div className="flex items-center gap-3">
                            {nodeTypes[selectedNode.type]?.icon && React.createElement(nodeTypes[selectedNode.type].icon, { className: `w-5 h-5 text-${nodeTypes[selectedNode.type].color}-600` })}
                            <div>
                                <h4 className="font-semibold text-base text-gray-800">
                                    {displayName}
                                </h4>
                                {nameMapping[shortName] && (
                                  <p className="text-xs text-gray-500 mt-1">({shortName})</p>
                                )}
                                <span className={`text-xs text-${nodeTypes[selectedNode.type]?.color}-700 font-medium`}>{nodeTypes[selectedNode.type]?.label}</span>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => onNodeSelect(null)} className="h-7 w-7 text-gray-400 hover:text-gray-600">
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="space-y-4 overflow-y-auto" style={{maxHeight: 'calc(100vh - 200px)'}}>
                        <ConnectionSection title="ארגונים מחוברים" items={fullscreenConnections.organizations} icon={Building2} colorClass="text-blue-600" />
                        <ConnectionSection title="שותפים אסטרטגיים" items={fullscreenConnections.partners} icon={Handshake} colorClass="text-purple-600" />
                        <ConnectionSection title="אוכלוסיות" items={fullscreenConnections.populations} icon={Users} colorClass="text-amber-600" />
                        <ConnectionSection title="תחומי התמחות" items={fullscreenConnections.services} icon={Briefcase} colorClass="text-emerald-600" />
                        <ConnectionSection title="מענים" items={fullscreenConnections.solutions} icon={ActivitySquare} colorClass="text-rose-600" />
                        <ConnectionSection title="פריסה גיאוגרפית" items={fullscreenConnections.locations} icon={MapPin} colorClass="text-orange-600" />
                    </div>
                  </div>
                )
            })()}
          </div>

          {/* Legend in bottom-right */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs">
            <h3 className="font-semibold text-sm mb-3 text-gray-800">מקרא</h3>
            
            {/* Node types legend */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span>ארגון מפעיל</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                <span>שותף אסטרטגי</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span>אוכלוסיה</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span>תחום התמחות</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-rose-600"></div>
                <span>מענה</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                <span>פריסה גיאוגרפית</span>
              </div>
            </div>

            {/* Connection types legend */}
            <div className="space-y-2 border-t pt-3">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-0.5 bg-blue-500"></div>
                <span>שותפות בהפעלה</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-0.5 bg-emerald-500"></div>
                <span>מתמחה ב</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-0.5 bg-rose-500"></div>
                <span>מפעיל מענה</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-0.5 bg-purple-500"></div>
                <span>שותפות אסטרטגית</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-0.5 bg-orange-500"></div>
                <span>פריסה גיאוגרפית</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
