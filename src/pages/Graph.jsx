
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Network, Settings, Upload, Handshake, ActivitySquare } from "lucide-react";

import GraphVisualization from '../components/graph/GraphVisualization';
import GraphControls from '../components/graph/GraphControls';
import NodeDetails from '../components/graph/NodeDetails';
import GraphLegend from '../components/graph/GraphLegend';
import FileUploader from '../components/graph/FileUploader';
import InitialGraphPlaceholder from '../components/graph/InitialGraphPlaceholder';

// Updated graph data with complete nodes and edges to reflect new type schema
const defaultGraphData = {
  "nodes": [
    {
      "id": "Location: איזורים נוספים",
      "type": "location"
    },
    {
      "id": "Location: קריית שמונה",
      "type": "location"
    },
    {
      "id": "Location: גליל עליון",
      "type": "location"
    },
    {
      "id": "Organization: יעדים לצפון",
      "type": "organization"
    },
    {
      "id": "Population: תיכון (15-18)",
      "type": "population"
    },
    {
      "id": "Service: חינוך בלתי פורמלי",
      "type": "service"
    },
    {
      "id": "Service: טיפול רגשי",
      "type": "service"
    },
    {
      "id": "Solution: שבילי נעורים",
      "type": "solution"
    },
    {
      "id": "Population: יסודי (6–12)",
      "type": "population"
    },
    {
      "id": "Service: חוסן הורי ומשפחתי",
      "type": "service"
    },
    {
      "id": "Solution: מועדוניות",
      "type": "solution"
    },
    {
      "id": "Organization: משרד הרווחה",
      "type": "organization"
    },
    {
      "id": "Population: חטיבת ביניים ( 12-15)",
      "type": "population"
    },
    {
      "id": "Population: הורים ומשפחות",
      "type": "population"
    },
    {
      "id": "Solution: מרכז הורה-ילד קריית שמונה",
      "type": "solution"
    },
    {
      "id": "Solution: מרכז הורות גליל עליון",
      "type": "solution"
    },
    {
      "id": "Location: מבואות חרמון",
      "type": "location"
    },
    {
      "id": "Organization: הרשות הלאומית לביטחון קהילתי",
      "type": "organization"
    },
    {
      "id": "Organization: על\"ם",
      "type": "organization"
    },
    {
      "id": "Service: חינוך פורמלי",
      "type": "service"
    },
    {
      "id": "Service: נוער בסיכון",
      "type": "service"
    },
    {
      "id": "Solution: מדריכי מוגנות",
      "type": "solution"
    },
    {
      "id": "Organization: הביתה. חוזרים לגליל",
      "type": "organization"
    },
    {
      "id": "Organization: מרכז חוסן גליל מזרחי",
      "type": "organization"
    },
    {
      "id": "Organization: מ. גליל עליון שפ\"ח",
      "type": "organization"
    },
    {
      "id": "Organization: מתי\"א",
      "type": "organization"
    },
    {
      "id": "Service: חוסן קהילתי",
      "type": "service"
    },
    {
      "id": "Solution: סטודיו פתוח",
      "type": "solution"
    },
    {
      "id": "Organization: קרן הביתה \"Homeward",
      "type": "organization"
    },
    {
      "id": "Organization: ביטוח לאומי",
      "type": "organization"
    },
    {
      "id": "Organization: ק\"ש שפ\"ח",
      "type": "organization"
    },
    {
      "id": "Solution: המרחב השלם",
      "type": "solution"
    },
    {
      "id": "Organization: משרד העבודה",
      "type": "organization"
    },
    {
      "id": "Solution: נתיבים להורות",
      "type": "solution"
    },
    {
      "id": "Organization: מ. מבואות חרמון",
      "type": "organization"
    },
    {
      "id": "Solution: שילובים לנוער",
      "type": "solution"
    },
    {
      "id": "Organization: Early Starters",
      "type": "organization"
    },
    {
      "id": "Population: גיל הרך (לידה-6)",
      "type": "population"
    },
    {
      "id": "Solution: מרחבים בטוחים לגיל הרך",
      "type": "solution"
    },
    {
      "id": "Organization: מדברים ביחד - הורים וילדים",
      "type": "organization"
    },
    {
      "id": "Service: טיפול וטראומה נפשית",
      "type": "service"
    },
    {
      "id": "Solution: מדברים ביחד - הורים וילדים",
      "type": "solution"
    },
    {
      "id": "Organization: אנוש",
      "type": "organization"
    },
    {
      "id": "Population: בוגרים (18+)",
      "type": "population"
    },
    {
      "id": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "service"
    },
    {
      "id": "Solution: Headspace",
      "type": "solution"
    },
    {
      "id": "Solution: מתן מענים בתחום התרפיה בגנים",
      "type": "solution"
    },
    {
      "id": "Organization: משרד הבריאות",
      "type": "organization"
    },
    {
      "id": "Solution: טיפולים פרטניים לפי נוהל חרדה",
      "type": "solution"
    },
    {
      "id": "Location: ארצי",
      "type": "location"
    },
    {
      "id": "Organization: אקדמיית מצמיחים",
      "type": "organization"
    },
    {
      "id": "Population: צוותים ואנשי מקצוע",
      "type": "population"
    },
    {
      "id": "Solution: סדנת \"מצמיחים",
      "type": "solution"
    },
    {
      "id": "Organization: מחלקת ילדים ונוער",
      "type": "organization"
    },
    {
      "id": "Organization: ק\"ש מתנסים",
      "type": "organization"
    },
    {
      "id": "Organization: ק\"ש חינוך",
      "type": "organization"
    },
    {
      "id": "Solution: מתחם הנוער בפארק הזהב",
      "type": "solution"
    },
    {
      "id": "Organization: ארגון פותחים עתיד",
      "type": "organization"
    },
    {
      "id": "Solution: פותחים עתיד",
      "type": "solution"
    },
    {
      "id": "Organization: קרן \"פועלים לתקומה",
      "type": "organization"
    },
    {
      "id": "Solution: פרויקט תגבור לתלמידים",
      "type": "solution"
    },
    {
      "id": "Solution: שלוק",
      "type": "solution"
    },
    {
      "id": "Solution: הפוך על הפוך",
      "type": "solution"
    },
    {
      "id": "Solution: ניידת רחוב",
      "type": "solution"
    },
    {
      "id": "Organization: ניצן",
      "type": "organization"
    },
    {
      "id": "Solution: תגבור לימודי ורגשי",
      "type": "solution"
    },
    {
      "id": "Organization: חברת רביבים",
      "type": "organization"
    },
    {
      "id": "Solution: טיפולים רגשיים בתוך בית הספר",
      "type": "solution"
    },
    {
      "id": "Organization: מל\"ח הארץ",
      "type": "organization"
    },
    {
      "id": "Solution: סדנאות שטח להעצמה ומנהיגות",
      "type": "solution"
    },
    {
      "id": "Organization: גולד על\"ה",
      "type": "organization"
    },
    {
      "id": "Solution: על\"ה - ערכים לפני הכל",
      "type": "solution"
    },
    {
      "id": "Organization: מ. גליל עליון חינוך",
      "type": "organization"
    },
    {
      "id": "Solution: יזמות עסקית לנוער",
      "type": "solution"
    },
    {
      "id": "Organization: Unistream",
      "type": "organization"
    },
    {
      "id": "Solution: ספ\"ל - סגירת פער לימודי",
      "type": "solution"
    },
    {
      "id": "Organization: קרן אתנה",
      "type": "organization"
    },
    {
      "id": "Organization: מרכז משאבים",
      "type": "organization"
    },
    {
      "id": "Solution: מעבדת דמיון (ImagineBox)",
      "type": "solution"
    },
    {
      "id": "Organization: מכללת תל חי",
      "type": "organization"
    },
    {
      "id": "Solution: ניידת חוסן",
      "type": "solution"
    },
    {
      "id": "Organization: ציונות 2000",
      "type": "organization"
    },
    {
      "id": "Organization: שיתופים",
      "type": "organization"
    },
    {
      "id": "Organization: משרד הרווחה והביטחון החברתי",
      "type": "organization"
    },
    {
      "id": "Organization: משרד החינוך",
      "type": "organization"
    },
    {
      "id": "Organization: מנהלת תקומה",
      "type": "organization"
    },
    {
      "id": "Organization: נט\"ל",
      "type": "organization"
    },
    {
      "id": "Organization: הקואליציה הישראלית לטראומה",
      "type": "organization"
    },
    {
      "id": "Organization: מהות ישראל",
      "type": "organization"
    },
    {
      "id": "Organization: מכינות קדם צבאיות",
      "type": "organization"
    },
    {
      "id": "Solution: חוסן ילדינו",
      "type": "solution"
    },
    {
      "id": "Organization: תנובה",
      "type": "organization"
    },
    {
      "id": "Solution: זמן משפחה",
      "type": "solution"
    },
    {
      "id": "Partner: קרן עזריאלי",
      "type": "partner"
    },
    {
      "id": "Partner: הקרן המשפחתית על שם תד אריסון",
      "type": "partner"
    },
    {
      "id": "Partner: קרן משפחת שעשוע",
      "type": "partner"
    },
    {
      "id": "Partner: רשויות מקומיות בצפון הארץ",
      "type": "partner"
    },
    {
      "id": "Service: רווחה טיפול בפרט",
      "type": "service"
    },
    {
      "id": "Service: יזמות ותעסוקה",
      "type": "service"
    },
    {
      "id": "Partner: Open Valley",
      "type": "partner"
    },
    {
      "id": "Partner: ארגון מעוז",
      "type": "partner"
    },
    {
      "id": "Partner: רשויות מקומיות ומועצות אזוריות",
      "type": "partner"
    },
    {
      "id": "Partner: תנועות נוער",
      "type": "partner"
    },
    {
      "id": "Partner: קרן אדמונד דה רוטשילד",
      "type": "partner"
    },
    {
      "id": "Partner: רשת ביג",
      "type": "partner"
    },
    {
      "id": "Partner: משרד הביטחון",
      "type": "partner"
    },
    {
      "id": "Organization: עמך / בנפשנו",
      "type": "organization"
    },
    {
      "id": "Partner: קרן טראמפ",
      "type": "partner"
    },
    {
      "id": "Partner: פדרציות יהודיות",
      "type": "partner"
    },
    {
      "id": "Organization: Basecamp",
      "type": "organization"
    },
    {
      "id": "Partner: קרן הדור הבא",
      "type": "partner"
    },
    {
      "id": "Partner: אוניברסיטת רייכמן",
      "type": "partner"
    },
    {
      "id": "Organization: רשת אורט",
      "type": "organization"
    },
    {
      "id": "Partner: מכללת גורדון",
      "type": "partner"
    },
    {
      "id": "Organization: ברנקו וייס",
      "type": "organization"
    },
    {
      "id": "Partner: PEF Israel Endowment Funds (USA)",
      "type": "partner"
    },
    {
      "id": "Organization: חותם",
      "type": "organization"
    },
    {
      "id": "Partner: קרן נעמי",
      "type": "partner"
    },
    {
      "id": "Organization: מכון חרוב",
      "type": "organization"
    },
    {
      "id": "Partner: האוניברסיטה העברית",
      "type": "partner"
    },
    {
      "id": "Partner: קרן שוסטרמן ישראל",
      "type": "partner"
    },
    {
      "id": "Partner: ויצו",
      "type": "partner"
    },
    {
      "id": "Organization: IsraAid",
      "type": "organization"
    },
    {
      "id": "Partner: החברה למתנ\"סים",
      "type": "partner"
    },
    {
      "id": "Organization: עמותת גלילה",
      "type": "organization"
    },
    {
      "id": "Organization: מצפינים",
      "type": "organization"
    },
    {
      "id": "Partner: עמותת בוגרי 8200",
      "type": "partner"
    },
    {
      "id": "Organization: הקואליציה הישראלית לטראומה (ITC)",
      "type": "organization"
    },
    {
      "id": "Partner: ער'ן",
      "type": "partner"
    },
    {
      "id": "Partner: הדסה",
      "type": "partner"
    },
    {
      "id": "Partner: חברת CyberArc",
      "type": "partner"
    },
    {
      "id": "Partner: קרן רוח הגליל",
      "type": "partner"
    },
    {
      "id": "Partner: הסתדרות המורים",
      "type": "partner"
    },
    {
      "id": "Organization: קרן אספר",
      "type": "organization"
    },
    {
      "id": "Partner: הקרן החדשה לישראל",
      "type": "partner"
    },
    {
      "id": "Organization: קרן בלומברג",
      "type": "organization"
    },
    {
      "id": "Partner: לב אחד",
      "type": "partner"
    },
    {
      "id": "Partner: החמל האזרחי",
      "type": "partner"
    },
    {
      "id": "Partner: מרכז פרס",
      "type": "partner"
    },
    {
      "id": "Organization: קרן מנדל",
      "type": "organization"
    },
    {
      "id": "Organization: ג'וינט ישראל",
      "type": "organization"
    },
    {
      "id": "Partner: מכון ברוקדייל",
      "type": "partner"
    },
    {
      "id": "Partner: משרד הבינוי והשיכון",
      "type": "partner"
    },
    {
      "id": "Organization: קרן רש\"י",
      "type": "organization"
    },
    {
      "id": "Partner: משרד הפנים",
      "type": "partner"
    },
    {
      "id": "Organization: קרן שחף",
      "type": "organization"
    },
    {
      "id": "Partner: משרד ההתיישבות",
      "type": "partner"
    },
    {
      "id": "Partner: יוניסטרים",
      "type": "partner"
    },
    {
      "id": "Partner: חממת \"Fresh Start",
      "type": "partner"
    },
    {
      "id": "Organization: הנוער העובד והלומד",
      "type": "organization"
    },
    {
      "id": "Partner: הסתדרות העובדים",
      "type": "partner"
    },
    {
      "id": "Organization: צופים",
      "type": "organization"
    },
    {
      "id": "Organization: בני עקיבא",
      "type": "organization"
    },
    {
      "id": "Organization: השומר הצעיר",
      "type": "organization"
    },
    {
      "id": "Organization: בני המושבים",
      "type": "organization"
    },
    {
      "id": "Organization: התנועה החדשה",
      "type": "organization"
    },
    {
      "id": "Organization: משרד רה\"מ",
      "type": "organization"
    },
    {
      "id": "Organization: משרד הנגב",
      "type": "organization"
    },
    {
      "id": "Organization: הגליל והחוסן הלאומי",
      "type": "organization"
    },
    {
      "id": "Organization: הרשות לביטחון קהילתי",
      "type": "organization"
    },
    {
      "id": "Organization: מטה יישום תנופה לצפון",
      "type": "organization"
    },
    {
      "id": "Organization: מוקד ערב\"ה",
      "type": "organization"
    },
    {
      "id": "Organization: קופות חולים",
      "type": "organization"
    },
    {
      "id": "Organization: פיקוד העורף",
      "type": "organization"
    },
    {
      "id": "Organization: מפעל הפיס",
      "type": "organization"
    },
    {
      "id": "Organization: ק\"ש רווחה",
      "type": "organization"
    },
    {
      "id": "Organization: מ. גליל עליון רווחה",
      "type": "organization"
    },
    {
      "id": "Location: גליל מזרחי",
      "type": "location"
    },
    {
      "id": "Organization: אשכול גליל מזרחי",
      "type": "organization"
    },
    {
      "id": "Organization: התוכנית הלאומית לילדים ונוער בסיכון – 360",
      "type": "organization"
    }
  ],
  "edges": [
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: יעדים לצפון",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: יעדים לצפון",
      "type": "location_organization",
      "weight": 4
    },
    {
      "source": "Location: גליל עליון",
      "target": "Organization: יעדים לצפון",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Population: תיכון (15-18)",
      "type": "location_population",
      "weight": 26
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Population: תיכון (15-18)",
      "type": "location_population",
      "weight": 33
    },
    {
      "source": "Location: גליל עליון",
      "target": "Population: תיכון (15-18)",
      "type": "location_population",
      "weight": 19
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "location_service",
      "weight": 15
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Service: טיפול רגשי",
      "type": "location_service",
      "weight": 9
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "location_service",
      "weight": 16
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Service: טיפול רגשי",
      "type": "location_service",
      "weight": 14
    },
    {
      "source": "Location: גליל עליון",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "location_service",
      "weight": 9
    },
    {
      "source": "Location: גליל עליון",
      "target": "Service: טיפול רגשי",
      "type": "location_service",
      "weight": 10
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Solution: שבילי נעורים",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Solution: שבילי נעורים",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Solution: שבילי נעורים",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: יעדים לצפון",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 3
    },
    {
      "source": "Organization: יעדים לצפון",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: יעדים לצפון",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: יעדים לצפון",
      "target": "Solution: שבילי נעורים",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "population_service",
      "weight": 22
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Service: טיפול רגשי",
      "type": "population_service",
      "weight": 20
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Solution: שבילי נעורים",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך בלתי פורמלי",
      "target": "Solution: שבילי נעורים",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: טיפול רגשי",
      "target": "Solution: שבילי נעורים",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Population: יסודי (6–12)",
      "type": "location_population",
      "weight": 22
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "location_service",
      "weight": 10
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Solution: מועדוניות",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: יעדים לצפון",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 3
    },
    {
      "source": "Organization: יעדים לצפון",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: יעדים לצפון",
      "target": "Solution: מועדוניות",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "population_service",
      "weight": 11
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "population_service",
      "weight": 14
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Service: טיפול רגשי",
      "type": "population_service",
      "weight": 18
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Solution: מועדוניות",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חוסן הורי ומשפחתי",
      "target": "Solution: מועדוניות",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך בלתי פורמלי",
      "target": "Solution: מועדוניות",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: טיפול רגשי",
      "target": "Solution: מועדוניות",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: משרד הרווחה",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "location_population",
      "weight": 24
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Population: הורים ומשפחות",
      "type": "location_population",
      "weight": 17
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Solution: מרכז הורה-ילד קריית שמונה",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: יעדים לצפון",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: יעדים לצפון",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: משרד הרווחה",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 4
    },
    {
      "source": "Organization: משרד הרווחה",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 3
    },
    {
      "source": "Organization: משרד הרווחה",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 3
    },
    {
      "source": "Organization: משרד הרווחה",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 4
    },
    {
      "source": "Organization: משרד הרווחה",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "organization_service",
      "weight": 3
    },
    {
      "source": "Organization: יעדים לצפון",
      "target": "Solution: מרכז הורה-ילד קריית שמונה",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: משרד הרווחה",
      "target": "Solution: מרכז הורה-ילד קריית שמונה",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "population_service",
      "weight": 9
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "population_service",
      "weight": 8
    },
    {
      "source": "Population: הורים ומשפחות",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "population_service",
      "weight": 13
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Solution: מרכז הורה-ילד קריית שמונה",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Solution: מרכז הורה-ילד קריית שמונה",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Solution: מרכז הורה-ילד קריית שמונה",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: הורים ומשפחות",
      "target": "Solution: מרכז הורה-ילד קריית שמונה",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חוסן הורי ומשפחתי",
      "target": "Solution: מרכז הורה-ילד קריית שמונה",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: משרד הרווחה",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: גליל עליון",
      "target": "Organization: משרד הרווחה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Population: יסודי (6–12)",
      "type": "location_population",
      "weight": 15
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "location_population",
      "weight": 17
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Population: הורים ומשפחות",
      "type": "location_population",
      "weight": 14
    },
    {
      "source": "Location: גליל עליון",
      "target": "Population: יסודי (6–12)",
      "type": "location_population",
      "weight": 15
    },
    {
      "source": "Location: גליל עליון",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "location_population",
      "weight": 13
    },
    {
      "source": "Location: גליל עליון",
      "target": "Population: הורים ומשפחות",
      "type": "location_population",
      "weight": 11
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "location_service",
      "weight": 7
    },
    {
      "source": "Location: גליל עליון",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "location_service",
      "weight": 5
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Solution: מרכז הורות גליל עליון",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Solution: מרכז הורות גליל עליון",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Solution: מרכז הורות גליל עליון",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: משרד הרווחה",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: משרד הרווחה",
      "target": "Solution: מרכז הורות גליל עליון",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "population_service",
      "weight": 20
    },
    {
      "source": "Population: הורים ומשפחות",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "population_service",
      "weight": 10
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Solution: מרכז הורות גליל עליון",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Solution: מרכז הורות גליל עליון",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Solution: מרכז הורות גליל עליון",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: הורים ומשפחות",
      "target": "Solution: מרכז הורות גליל עליון",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חוסן הורי ומשפחתי",
      "target": "Solution: מרכז הורות גליל עליון",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך בלתי פורמלי",
      "target": "Solution: מרכז הורות גליל עליון",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: הרשות הלאומית לביטחון קהילתי",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: על\"ם",
      "type": "location_organization",
      "weight": 3
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: הרשות הלאומית לביטחון קהילתי",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: על\"ם",
      "type": "location_organization",
      "weight": 6
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Organization: הרשות הלאומית לביטחון קהילתי",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Organization: על\"ם",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Organization: הרשות הלאומית לביטחון קהילתי",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Organization: על\"ם",
      "type": "location_organization",
      "weight": 3
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Population: יסודי (6–12)",
      "type": "location_population",
      "weight": 9
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Population: תיכון (15-18)",
      "type": "location_population",
      "weight": 10
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "location_population",
      "weight": 8
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Service: חינוך פורמלי",
      "type": "location_service",
      "weight": 10
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Service: נוער בסיכון",
      "type": "location_service",
      "weight": 3
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Service: חינוך פורמלי",
      "type": "location_service",
      "weight": 15
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Service: נוער בסיכון",
      "type": "location_service",
      "weight": 10
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "location_service",
      "weight": 5
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Service: חינוך פורמלי",
      "type": "location_service",
      "weight": 4
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Service: נוער בסיכון",
      "type": "location_service",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Service: חינוך פורמלי",
      "type": "location_service",
      "weight": 9
    },
    {
      "source": "Location: גליל עליון",
      "target": "Service: נוער בסיכון",
      "type": "location_service",
      "weight": 6
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Solution: מדריכי מוגנות",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Solution: מדריכי מוגנות",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Solution: מדריכי מוגנות",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Solution: מדריכי מוגנות",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: הרשות הלאומית לביטחון קהילתי",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: הרשות הלאומית לביטחון קהילתי",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: הרשות הלאומית לביטחון קהילתי",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: על\"ם",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 3
    },
    {
      "source": "Organization: על\"ם",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 6
    },
    {
      "source": "Organization: על\"ם",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 5
    },
    {
      "source": "Organization: הרשות הלאומית לביטחון קהילתי",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: הרשות הלאומית לביטחון קהילתי",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: הרשות הלאומית לביטחון קהילתי",
      "target": "Service: נוער בסיכון",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: על\"ם",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: על\"ם",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: על\"ם",
      "target": "Service: נוער בסיכון",
      "type": "organization_service",
      "weight": 5
    },
    {
      "source": "Organization: הרשות הלאומית לביטחון קהילתי",
      "target": "Solution: מדריכי מוגנות",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: על\"ם",
      "target": "Solution: מדריכי מוגנות",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Service: חינוך פורמלי",
      "type": "population_service",
      "weight": 17
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Service: נוער בסיכון",
      "type": "population_service",
      "weight": 13
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Service: חינוך פורמלי",
      "type": "population_service",
      "weight": 22
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Service: נוער בסיכון",
      "type": "population_service",
      "weight": 18
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Service: חינוך פורמלי",
      "type": "population_service",
      "weight": 18
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Service: נוער בסיכון",
      "type": "population_service",
      "weight": 17
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Solution: מדריכי מוגנות",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Solution: מדריכי מוגנות",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Solution: מדריכי מוגנות",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך בלתי פורמלי",
      "target": "Solution: מדריכי מוגנות",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך פורמלי",
      "target": "Solution: מדריכי מוגנות",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: נוער בסיכון",
      "target": "Solution: מדריכי מוגנות",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Organization: הביתה. חוזרים לגליל",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: גליל עליון",
      "target": "Organization: מרכז חוסן גליל מזרחי",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: גליל עליון",
      "target": "Organization: מ. גליל עליון שפ\"ח",
      "type": "location_organization",
      "weight": 3
    },
    {
      "source": "Location: גליל עליון",
      "target": "Organization: מתי\"א",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Service: חוסן קהילתי",
      "type": "location_service",
      "weight": 9
    },
    {
      "source": "Location: גליל עליון",
      "target": "Solution: סטודיו פתוח",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: הביתה. חוזרים לגליל",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: הביתה. חוזרים לגליל",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: הביתה. חוזרים לגליל",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מרכז חוסן גליל מזרחי",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 4
    },
    {
      "source": "Organization: מרכז חוסן גליל מזרחי",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 4
    },
    {
      "source": "Organization: מרכז חוסן גליל מזרחי",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 4
    },
    {
      "source": "Organization: מ. גליל עליון שפ\"ח",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: מ. גליל עליון שפ\"ח",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: מ. גליל עליון שפ\"ח",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: מתי\"א",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מתי\"א",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מתי\"א",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: הביתה. חוזרים לגליל",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: הביתה. חוזרים לגליל",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: הביתה. חוזרים לגליל",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: מרכז חוסן גליל מזרחי",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: מרכז חוסן גליל מזרחי",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מרכז חוסן גליל מזרחי",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 4
    },
    {
      "source": "Organization: מ. גליל עליון שפ\"ח",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מ. גליל עליון שפ\"ח",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: מ. גליל עליון שפ\"ח",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 3
    },
    {
      "source": "Organization: מתי\"א",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מתי\"א",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מתי\"א",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: הביתה. חוזרים לגליל",
      "target": "Solution: סטודיו פתוח",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: מרכז חוסן גליל מזרחי",
      "target": "Solution: סטודיו פתוח",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: מ. גליל עליון שפ\"ח",
      "target": "Solution: סטודיו פתוח",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: מתי\"א",
      "target": "Solution: סטודיו פתוח",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Service: חוסן קהילתי",
      "type": "population_service",
      "weight": 16
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Service: חוסן קהילתי",
      "type": "population_service",
      "weight": 27
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Service: חוסן קהילתי",
      "type": "population_service",
      "weight": 20
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Service: טיפול רגשי",
      "type": "population_service",
      "weight": 17
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Solution: סטודיו פתוח",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Solution: סטודיו פתוח",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Solution: סטודיו פתוח",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חוסן קהילתי",
      "target": "Solution: סטודיו פתוח",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך פורמלי",
      "target": "Solution: סטודיו פתוח",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: טיפול רגשי",
      "target": "Solution: סטודיו פתוח",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: קרן הביתה \"Homeward",
      "type": "location_organization",
      "weight": 3
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: ביטוח לאומי",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: ק\"ש שפ\"ח",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Solution: המרחב השלם",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: קרן הביתה \"Homeward",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: קרן הביתה \"Homeward",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: קרן הביתה \"Homeward",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: ביטוח לאומי",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 3
    },
    {
      "source": "Organization: ביטוח לאומי",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 3
    },
    {
      "source": "Organization: ביטוח לאומי",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 3
    },
    {
      "source": "Organization: ק\"ש שפ\"ח",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: ק\"ש שפ\"ח",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: ק\"ש שפ\"ח",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: קרן הביתה \"Homeward",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 3
    },
    {
      "source": "Organization: קרן הביתה \"Homeward",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: קרן הביתה \"Homeward",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: קרן הביתה \"Homeward",
      "target": "Service: נוער בסיכון",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: ביטוח לאומי",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: ביטוח לאומי",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: ביטוח לאומי",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 3
    },
    {
      "source": "Organization: ביטוח לאומי",
      "target": "Service: נוער בסיכון",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: ק\"ש שפ\"ח",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש שפ\"ח",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: ק\"ש שפ\"ח",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: ק\"ש שפ\"ח",
      "target": "Service: נוער בסיכון",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: קרן הביתה \"Homeward",
      "target": "Solution: המרחב השלם",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: ביטוח לאומי",
      "target": "Solution: המרחב השלם",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש שפ\"ח",
      "target": "Solution: המרחב השלם",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Solution: המרחב השלם",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Solution: המרחב השלם",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Solution: המרחב השלם",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך בלתי פורמלי",
      "target": "Solution: המרחב השלם",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך פורמלי",
      "target": "Solution: המרחב השלם",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: טיפול רגשי",
      "target": "Solution: המרחב השלם",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: נוער בסיכון",
      "target": "Solution: המרחב השלם",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Organization: משרד העבודה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Organization: משרד הרווחה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: משרד העבודה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Population: הורים ומשפחות",
      "type": "location_population",
      "weight": 6
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "location_service",
      "weight": 5
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Service: טיפול רגשי",
      "type": "location_service",
      "weight": 5
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Solution: נתיבים להורות",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Solution: נתיבים להורות",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: משרד העבודה",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: משרד העבודה",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: משרד העבודה",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: משרד העבודה",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: משרד הרווחה",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: משרד העבודה",
      "target": "Solution: נתיבים להורות",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: משרד הרווחה",
      "target": "Solution: נתיבים להורות",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: הורים ומשפחות",
      "target": "Service: טיפול רגשי",
      "type": "population_service",
      "weight": 17
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Solution: נתיבים להורות",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: הורים ומשפחות",
      "target": "Solution: נתיבים להורות",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חוסן הורי ומשפחתי",
      "target": "Solution: נתיבים להורות",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: טיפול רגשי",
      "target": "Solution: נתיבים להורות",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Organization: מ. מבואות חרמון",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: גליל עליון",
      "target": "Organization: מ. מבואות חרמון",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: מ. מבואות חרמון",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Solution: שילובים לנוער",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Solution: שילובים לנוער",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Solution: שילובים לנוער",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: מ. מבואות חרמון",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: מ. מבואות חרמון",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: מ. מבואות חרמון",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: מ. מבואות חרמון",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: מ. מבואות חרמון",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מ. מבואות חרמון",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: מ. מבואות חרמון",
      "target": "Solution: שילובים לנוער",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Solution: שילובים לנוער",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Solution: שילובים לנוער",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Solution: שילובים לנוער",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חוסן הורי ומשפחתי",
      "target": "Solution: שילובים לנוער",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך פורמלי",
      "target": "Solution: שילובים לנוער",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: טיפול רגשי",
      "target": "Solution: שילובים לנוער",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: Early Starters",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: Early Starters",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "location_population",
      "weight": 9
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "location_population",
      "weight": 9
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Solution: מרחבים בטוחים לגיל הרך",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Solution: מרחבים בטוחים לגיל הרך",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: Early Starters",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: Early Starters",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: Early Starters",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: Early Starters",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: Early Starters",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: Early Starters",
      "target": "Solution: מרחבים בטוחים לגיל הרך",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: גיל הרך (לידה-6)",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "population_service",
      "weight": 7
    },
    {
      "source": "Population: גיל הרך (לידה-6)",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "population_service",
      "weight": 5
    },
    {
      "source": "Population: גיל הרך (לידה-6)",
      "target": "Service: טיפול רגשי",
      "type": "population_service",
      "weight": 11
    },
    {
      "source": "Population: גיל הרך (לידה-6)",
      "target": "Solution: מרחבים בטוחים לגיל הרך",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: הורים ומשפחות",
      "target": "Solution: מרחבים בטוחים לגיל הרך",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חוסן הורי ומשפחתי",
      "target": "Solution: מרחבים בטוחים לגיל הרך",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך בלתי פורמלי",
      "target": "Solution: מרחבים בטוחים לגיל הרך",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: טיפול רגשי",
      "target": "Solution: מרחבים בטוחים לגיל הרך",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: מדברים ביחד - הורים וילדים",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "location_service",
      "weight": 9
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Solution: מדברים ביחד - הורים וילדים",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: מדברים ביחד - הורים וילדים",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: מדברים ביחד - הורים וילדים",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: מדברים ביחד - הורים וילדים",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מדברים ביחד - הורים וילדים",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: מדברים ביחד - הורים וילדים",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: מדברים ביחד - הורים וילדים",
      "target": "Solution: מדברים ביחד - הורים וילדים",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: גיל הרך (לידה-6)",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "population_service",
      "weight": 7
    },
    {
      "source": "Population: הורים ומשפחות",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "population_service",
      "weight": 15
    },
    {
      "source": "Population: גיל הרך (לידה-6)",
      "target": "Solution: מדברים ביחד - הורים וילדים",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: הורים ומשפחות",
      "target": "Solution: מדברים ביחד - הורים וילדים",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חוסן הורי ומשפחתי",
      "target": "Solution: מדברים ביחד - הורים וילדים",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: טיפול רגשי",
      "target": "Solution: מדברים ביחד - הורים וילדים",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: טיפול וטראומה נפשית",
      "target": "Solution: מדברים ביחד - הורים וילדים",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: אנוש",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Population: בוגרים (18+)",
      "type": "location_population",
      "weight": 10
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "location_service",
      "weight": 4
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "location_service",
      "weight": 8
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Solution: Headspace",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: אנוש",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: אנוש",
      "target": "Population: בוגרים (18+)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: אנוש",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: אנוש",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: אנוש",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: אנוש",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: אנוש",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: אנוש",
      "target": "Solution: Headspace",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "population_service",
      "weight": 6
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "population_service",
      "weight": 15
    },
    {
      "source": "Population: בוגרים (18+)",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "population_service",
      "weight": 4
    },
    {
      "source": "Population: בוגרים (18+)",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "population_service",
      "weight": 3
    },
    {
      "source": "Population: בוגרים (18+)",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "population_service",
      "weight": 11
    },
    {
      "source": "Population: בוגרים (18+)",
      "target": "Service: טיפול רגשי",
      "type": "population_service",
      "weight": 5
    },
    {
      "source": "Population: הורים ומשפחות",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "population_service",
      "weight": 5
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Solution: Headspace",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: בוגרים (18+)",
      "target": "Solution: Headspace",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: הורים ומשפחות",
      "target": "Solution: Headspace",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: הכשרות והדרכה לאנשי מקצוע",
      "target": "Solution: Headspace",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: חוסן הורי ומשפחתי",
      "target": "Solution: Headspace",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: טיפול וטראומה נפשית",
      "target": "Solution: Headspace",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: טיפול רגשי",
      "target": "Solution: Headspace",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "location_population",
      "weight": 7
    },
    {
      "source": "Location: גליל עליון",
      "target": "Solution: מתן מענים בתחום התרפיה בגנים",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: מ. גליל עליון שפ\"ח",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מ. גליל עליון שפ\"ח",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: מ. גליל עליון שפ\"ח",
      "target": "Solution: מתן מענים בתחום התרפיה בגנים",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: גיל הרך (לידה-6)",
      "target": "Solution: מתן מענים בתחום התרפיה בגנים",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: הורים ומשפחות",
      "target": "Solution: מתן מענים בתחום התרפיה בגנים",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: טיפול רגשי",
      "target": "Solution: מתן מענים בתחום התרפיה בגנים",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: מרכז חוסן גליל מזרחי",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: משרד הבריאות",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: ביטוח לאומי",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: מרכז חוסן גליל מזרחי",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: משרד הבריאות",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Organization: מרכז חוסן גליל מזרחי",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Organization: משרד הבריאות",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Organization: ביטוח לאומי",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Organization: משרד הבריאות",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Organization: ביטוח לאומי",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Population: בוגרים (18+)",
      "type": "location_population",
      "weight": 8
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Population: בוגרים (18+)",
      "type": "location_population",
      "weight": 5
    },
    {
      "source": "Location: גליל עליון",
      "target": "Population: בוגרים (18+)",
      "type": "location_population",
      "weight": 6
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "location_service",
      "weight": 3
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "location_service",
      "weight": 2
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "location_service",
      "weight": 4
    },
    {
      "source": "Location: גליל עליון",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "location_service",
      "weight": 2
    },
    {
      "source": "Location: גליל עליון",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "location_service",
      "weight": 5
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Solution: טיפולים פרטניים לפי נוהל חרדה",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Solution: טיפולים פרטניים לפי נוהל חרדה",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Solution: טיפולים פרטניים לפי נוהל חרדה",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Solution: טיפולים פרטניים לפי נוהל חרדה",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: מרכז חוסן גליל מזרחי",
      "target": "Population: בוגרים (18+)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: מרכז חוסן גליל מזרחי",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: משרד הבריאות",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 3
    },
    {
      "source": "Organization: משרד הבריאות",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 3
    },
    {
      "source": "Organization: משרד הבריאות",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 3
    },
    {
      "source": "Organization: משרד הבריאות",
      "target": "Population: בוגרים (18+)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: משרד הבריאות",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: ביטוח לאומי",
      "target": "Population: בוגרים (18+)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ביטוח לאומי",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מרכז חוסן גליל מזרחי",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מרכז חוסן גליל מזרחי",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מרכז חוסן גליל מזרחי",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: משרד הבריאות",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: משרד הבריאות",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: משרד הבריאות",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: משרד הבריאות",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: ביטוח לאומי",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: ביטוח לאומי",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: ביטוח לאומי",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מרכז חוסן גליל מזרחי",
      "target": "Solution: טיפולים פרטניים לפי נוהל חרדה",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: משרד הבריאות",
      "target": "Solution: טיפולים פרטניים לפי נוהל חרדה",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: ביטוח לאומי",
      "target": "Solution: טיפולים פרטניים לפי נוהל חרדה",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "population_service",
      "weight": 4
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "population_service",
      "weight": 12
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "population_service",
      "weight": 3
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "population_service",
      "weight": 9
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Solution: טיפולים פרטניים לפי נוהל חרדה",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Solution: טיפולים פרטניים לפי נוהל חרדה",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Solution: טיפולים פרטניים לפי נוהל חרדה",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: בוגרים (18+)",
      "target": "Solution: טיפולים פרטניים לפי נוהל חרדה",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: הורים ומשפחות",
      "target": "Solution: טיפולים פרטניים לפי נוהל חרדה",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: הכשרות והדרכה לאנשי מקצוע",
      "target": "Solution: טיפולים פרטניים לפי נוהל חרדה",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: חוסן הורי ומשפחתי",
      "target": "Solution: טיפולים פרטניים לפי נוהל חרדה",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: טיפול וטראומה נפשית",
      "target": "Solution: טיפולים פרטניים לפי נוהל חרדה",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: טיפול רגשי",
      "target": "Solution: טיפולים פרטניים לפי נוהל חרדה",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: אקדמיית מצמיחים",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: אקדמיית מצמיחים",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "location_population",
      "weight": 5
    },
    {
      "source": "Location: ארצי",
      "target": "Population: יסודי (6–12)",
      "type": "location_population",
      "weight": 14
    },
    {
      "source": "Location: ארצי",
      "target": "Population: תיכון (15-18)",
      "type": "location_population",
      "weight": 18
    },
    {
      "source": "Location: ארצי",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "location_population",
      "weight": 14
    },
    {
      "source": "Location: ארצי",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "location_population",
      "weight": 6
    },
    {
      "source": "Location: ארצי",
      "target": "Service: חינוך פורמלי",
      "type": "location_service",
      "weight": 8
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Solution: סדנת \"מצמיחים",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Solution: סדנת \"מצמיחים",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: אקדמיית מצמיחים",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: אקדמיית מצמיחים",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: אקדמיית מצמיחים",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: אקדמיית מצמיחים",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: אקדמיית מצמיחים",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: אקדמיית מצמיחים",
      "target": "Solution: סדנת \"מצמיחים",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: צוותים ואנשי מקצוע",
      "target": "Service: חינוך פורמלי",
      "type": "population_service",
      "weight": 7
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Solution: סדנת \"מצמיחים",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Solution: סדנת \"מצמיחים",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Solution: סדנת \"מצמיחים",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: צוותים ואנשי מקצוע",
      "target": "Solution: סדנת \"מצמיחים",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך פורמלי",
      "target": "Solution: סדנת \"מצמיחים",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: מחלקת ילדים ונוער",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: ק\"ש מתנסים",
      "type": "location_organization",
      "weight": 3
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: ק\"ש חינוך",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Service: חוסן קהילתי",
      "type": "location_service",
      "weight": 11
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Solution: מתחם הנוער בפארק הזהב",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: מחלקת ילדים ונוער",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מחלקת ילדים ונוער",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש מתנסים",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 3
    },
    {
      "source": "Organization: ק\"ש מתנסים",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 3
    },
    {
      "source": "Organization: ק\"ש חינוך",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: ק\"ש חינוך",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: מחלקת ילדים ונוער",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מחלקת ילדים ונוער",
      "target": "Service: נוער בסיכון",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מחלקת ילדים ונוער",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש מתנסים",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: ק\"ש מתנסים",
      "target": "Service: נוער בסיכון",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש מתנסים",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: קרן הביתה \"Homeward",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: הרשות הלאומית לביטחון קהילתי",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש חינוך",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש חינוך",
      "target": "Service: נוער בסיכון",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: ק\"ש חינוך",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מחלקת ילדים ונוער",
      "target": "Solution: מתחם הנוער בפארק הזהב",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש מתנסים",
      "target": "Solution: מתחם הנוער בפארק הזהב",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: קרן הביתה \"Homeward",
      "target": "Solution: מתחם הנוער בפארק הזהב",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: הרשות הלאומית לביטחון קהילתי",
      "target": "Solution: מתחם הנוער בפארק הזהב",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש חינוך",
      "target": "Solution: מתחם הנוער בפארק הזהב",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Solution: מתחם הנוער בפארק הזהב",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Solution: מתחם הנוער בפארק הזהב",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך בלתי פורמלי",
      "target": "Solution: מתחם הנוער בפארק הזהב",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: נוער בסיכון",
      "target": "Solution: מתחם הנוער בפארק הזהב",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: חוסן קהילתי",
      "target": "Solution: מתחם הנוער בפארק הזהב",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: ארגון פותחים עתיד",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: ארגון פותחים עתיד",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Solution: פותחים עתיד",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Solution: פותחים עתיד",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: ארגון פותחים עתיד",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ארגון פותחים עתיד",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: ארגון פותחים עתיד",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: ארגון פותחים עתיד",
      "target": "Solution: פותחים עתיד",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Solution: פותחים עתיד",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חוסן הורי ומשפחתי",
      "target": "Solution: פותחים עתיד",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך פורמלי",
      "target": "Solution: פותחים עתיד",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Organization: קרן \"פועלים לתקומה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Solution: פרויקט תגבור לתלמידים",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: קרן \"פועלים לתקומה",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: קרן \"פועלים לתקומה",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: קרן \"פועלים לתקומה",
      "target": "Solution: פרויקט תגבור לתלמידים",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Solution: פרויקט תגבור לתלמידים",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך פורמלי",
      "target": "Solution: פרויקט תגבור לתלמידים",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Solution: שלוק",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: על\"ם",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 3
    },
    {
      "source": "Organization: על\"ם",
      "target": "Solution: שלוק",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Solution: שלוק",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Solution: שלוק",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך פורמלי",
      "target": "Solution: שלוק",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: טיפול רגשי",
      "target": "Solution: שלוק",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: נוער בסיכון",
      "target": "Solution: שלוק",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Solution: הפוך על הפוך",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: על\"ם",
      "target": "Solution: הפוך על הפוך",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Solution: הפוך על הפוך",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Solution: הפוך על הפוך",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: נוער בסיכון",
      "target": "Solution: הפוך על הפוך",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: טיפול רגשי",
      "target": "Solution: הפוך על הפוך",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Solution: ניידת רחוב",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Solution: ניידת רחוב",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: על\"ם",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: על\"ם",
      "target": "Solution: ניידת רחוב",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Solution: ניידת רחוב",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Solution: ניידת רחוב",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חוסן קהילתי",
      "target": "Solution: ניידת רחוב",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: נוער בסיכון",
      "target": "Solution: ניידת רחוב",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: ניצן",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Solution: תגבור לימודי ורגשי",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: ניצן",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: ניצן",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: ניצן",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: ניצן",
      "target": "Solution: תגבור לימודי ורגשי",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Solution: תגבור לימודי ורגשי",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: טיפול רגשי",
      "target": "Solution: תגבור לימודי ורגשי",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך פורמלי",
      "target": "Solution: תגבור לימודי ורגשי",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: חברת רביבים",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Service: טיפול רגשי",
      "type": "location_service",
      "weight": 5
    },
    {
      "source": "Location: ארצי",
      "target": "Solution: טיפולים רגשיים בתוך בית הספר",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: חברת רביבים",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: חברת רביבים",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: חברת רביבים",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: חברת רביבים",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: חברת רביבים",
      "target": "Solution: טיפולים רגשיים בתוך בית הספר",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Solution: טיפולים רגשיים בתוך בית הספר",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Solution: טיפולים רגשיים בתוך בית הספר",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך פורמלי",
      "target": "Solution: טיפולים רגשיים בתוך בית הספר",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: טיפול רגשי",
      "target": "Solution: טיפולים רגשיים בתוך בית הספר",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: מל\"ח הארץ",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: מל\"ח הארץ",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: מל\"ח הארץ",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Solution: סדנאות שטח להעצמה ומנהיגות",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Solution: סדנאות שטח להעצמה ומנהיגות",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Solution: סדנאות שטח להעצמה ומנהיגות",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: מל\"ח הארץ",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מל\"ח הארץ",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מל\"ח הארץ",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מל\"ח הארץ",
      "target": "Solution: סדנאות שטח להעצמה ומנהיגות",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Solution: סדנאות שטח להעצמה ומנהיגות",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Solution: סדנאות שטח להעצמה ומנהיגות",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך פורמלי",
      "target": "Solution: סדנאות שטח להעצמה ומנהיגות",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: גולד על\"ה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Solution: על\"ה - ערכים לפני הכל",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: גולד על\"ה",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: גולד על\"ה",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: גולד על\"ה",
      "target": "Solution: על\"ה - ערכים לפני הכל",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Solution: על\"ה - ערכים לפני הכל",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך פורמלי",
      "target": "Solution: על\"ה - ערכים לפני הכל",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: מ. גליל עליון חינוך",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Solution: יזמות עסקית לנוער",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: מ. גליל עליון חינוך",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: מ. גליל עליון חינוך",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: מ. גליל עליון חינוך",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: ק\"ש מתנסים",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מ. גליל עליון חינוך",
      "target": "Solution: יזמות עסקית לנוער",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש מתנסים",
      "target": "Solution: יזמות עסקית לנוער",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Solution: יזמות עסקית לנוער",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Solution: יזמות עסקית לנוער",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך פורמלי",
      "target": "Solution: יזמות עסקית לנוער",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: Unistream",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Solution: ספ\"ל - סגירת פער לימודי",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: Unistream",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: Unistream",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: Unistream",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: Unistream",
      "target": "Solution: ספ\"ל - סגירת פער לימודי",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Solution: ספ\"ל - סגירת פער לימודי",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Solution: ספ\"ל - סגירת פער לימודי",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך פורמלי",
      "target": "Solution: ספ\"ל - סגירת פער לימודי",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Organization: קרן אתנה",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Organization: מרכז משאבים",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Solution: מעבדת דמיון (ImagineBox)",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: קרן אתנה",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: קרן אתנה",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: קרן אתנה",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: קרן אתנה",
      "target": "Population: בוגרים (18+)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מרכז משאבים",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מרכז משאבים",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מרכז משאבים",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מרכז משאבים",
      "target": "Population: בוגרים (18+)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: קרן אתנה",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: קרן אתנה",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מרכז משאבים",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מרכז משאבים",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: קרן אתנה",
      "target": "Solution: מעבדת דמיון (ImagineBox)",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: מרכז משאבים",
      "target": "Solution: מעבדת דמיון (ImagineBox)",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: בוגרים (18+)",
      "target": "Service: חינוך פורמלי",
      "type": "population_service",
      "weight": 4
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Solution: מעבדת דמיון (ImagineBox)",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Solution: מעבדת דמיון (ImagineBox)",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Solution: מעבדת דמיון (ImagineBox)",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: בוגרים (18+)",
      "target": "Solution: מעבדת דמיון (ImagineBox)",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך פורמלי",
      "target": "Solution: מעבדת דמיון (ImagineBox)",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: טיפול וטראומה נפשית",
      "target": "Solution: מעבדת דמיון (ImagineBox)",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: מכללת תל חי",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: מכללת תל חי",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Organization: מכללת תל חי",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Organization: מכללת תל חי",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Service: חוסן קהילתי",
      "type": "location_service",
      "weight": 13
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Service: חוסן קהילתי",
      "type": "location_service",
      "weight": 4
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Solution: ניידת חוסן",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Solution: ניידת חוסן",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Solution: ניידת חוסן",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Solution: ניידת חוסן",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: מכללת תל חי",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מכללת תל חי",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מכללת תל חי",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מכללת תל חי",
      "target": "Population: בוגרים (18+)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: מכללת תל חי",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מכללת תל חי",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מכללת תל חי",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: מכללת תל חי",
      "target": "Solution: ניידת חוסן",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: בוגרים (18+)",
      "target": "Service: חוסן קהילתי",
      "type": "population_service",
      "weight": 8
    },
    {
      "source": "Population: בוגרים (18+)",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "population_service",
      "weight": 3
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Solution: ניידת חוסן",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Solution: ניידת חוסן",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Solution: ניידת חוסן",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: בוגרים (18+)",
      "target": "Solution: ניידת חוסן",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חוסן קהילתי",
      "target": "Solution: ניידת חוסן",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך בלתי פורמלי",
      "target": "Solution: ניידת חוסן",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: טיפול וטראומה נפשית",
      "target": "Solution: ניידת חוסן",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: ציונות 2000",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: שיתופים",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: משרד הרווחה והביטחון החברתי",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: משרד החינוך",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: מנהלת תקומה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: נט\"ל",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: הקואליציה הישראלית לטראומה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: מהות ישראל",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: מכינות קדם צבאיות",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: ציונות 2000",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: שיתופים",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: משרד הרווחה והביטחון החברתי",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: משרד החינוך",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: מנהלת תקומה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: נט\"ל",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: הקואליציה הישראלית לטראומה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: מהות ישראל",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: מכינות קדם צבאיות",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "location_population",
      "weight": 8
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Solution: חוסן ילדינו",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Solution: חוסן ילדינו",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: ציונות 2000",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ציונות 2000",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ציונות 2000",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ציונות 2000",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: שיתופים",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: שיתופים",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: שיתופים",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: שיתופים",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: משרד הרווחה והביטחון החברתי",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: משרד הרווחה והביטחון החברתי",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: משרד הרווחה והביטחון החברתי",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: משרד הרווחה והביטחון החברתי",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: משרד החינוך",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: משרד החינוך",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: משרד החינוך",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: משרד החינוך",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: משרד הבריאות",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מנהלת תקומה",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מנהלת תקומה",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מנהלת תקומה",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מנהלת תקומה",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מרכז חוסן גליל מזרחי",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: נט\"ל",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: נט\"ל",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: נט\"ל",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: נט\"ל",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: הקואליציה הישראלית לטראומה",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: הקואליציה הישראלית לטראומה",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: הקואליציה הישראלית לטראומה",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: הקואליציה הישראלית לטראומה",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מהות ישראל",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מהות ישראל",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מהות ישראל",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מהות ישראל",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: על\"ם",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מכינות קדם צבאיות",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מכינות קדם צבאיות",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מכינות קדם צבאיות",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מכינות קדם צבאיות",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ציונות 2000",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: ציונות 2000",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: שיתופים",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: שיתופים",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: משרד הרווחה והביטחון החברתי",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: משרד הרווחה והביטחון החברתי",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: משרד החינוך",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: משרד החינוך",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: משרד הבריאות",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מנהלת תקומה",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מנהלת תקומה",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מרכז חוסן גליל מזרחי",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: נט\"ל",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: נט\"ל",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: הקואליציה הישראלית לטראומה",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: הקואליציה הישראלית לטראומה",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מהות ישראל",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מהות ישראל",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מכינות קדם צבאיות",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מכינות קדם צבאיות",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: ציונות 2000",
      "target": "Solution: חוסן ילדינו",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: שיתופים",
      "target": "Solution: חוסן ילדינו",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: משרד הרווחה והביטחון החברתי",
      "target": "Solution: חוסן ילדינו",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: משרד החינוך",
      "target": "Solution: חוסן ילדינו",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: משרד הבריאות",
      "target": "Solution: חוסן ילדינו",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: מנהלת תקומה",
      "target": "Solution: חוסן ילדינו",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: מרכז חוסן גליל מזרחי",
      "target": "Solution: חוסן ילדינו",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: נט\"ל",
      "target": "Solution: חוסן ילדינו",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: הקואליציה הישראלית לטראומה",
      "target": "Solution: חוסן ילדינו",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: מהות ישראל",
      "target": "Solution: חוסן ילדינו",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: על\"ם",
      "target": "Solution: חוסן ילדינו",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Organization: מכינות קדם צבאיות",
      "target": "Solution: חוסן ילדינו",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: צוותים ואנשי מקצוע",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "population_service",
      "weight": 3
    },
    {
      "source": "Population: צוותים ואנשי מקצוע",
      "target": "Service: טיפול רגשי",
      "type": "population_service",
      "weight": 2
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Solution: חוסן ילדינו",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Solution: חוסן ילדינו",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Solution: חוסן ילדינו",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: צוותים ואנשי מקצוע",
      "target": "Solution: חוסן ילדינו",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חינוך בלתי פורמלי",
      "target": "Solution: חוסן ילדינו",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: טיפול רגשי",
      "target": "Solution: חוסן ילדינו",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: תנובה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: תנובה",
      "type": "location_organization",
      "weight": 2
    },
    {
      "source": "Location: גליל עליון",
      "target": "Organization: תנובה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Organization: תנובה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "location_population",
      "weight": 9
    },
    {
      "source": "Location: ארצי",
      "target": "Population: הורים ומשפחות",
      "type": "location_population",
      "weight": 16
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "location_population",
      "weight": 4
    },
    {
      "source": "Location: ארצי",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "location_service",
      "weight": 2
    },
    {
      "source": "Location: ארצי",
      "target": "Solution: זמן משפחה",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Solution: זמן משפחה",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Solution: זמן משפחה",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Solution: זמן משפחה",
      "type": "location_solution",
      "weight": 1
    },
    {
      "source": "Organization: תנובה",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: תנובה",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 2
    },
    {
      "source": "Organization: תנובה",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "organization_service",
      "weight": 2
    },
    {
      "source": "Organization: תנובה",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: תנובה",
      "target": "Solution: זמן משפחה",
      "type": "organization_solution",
      "weight": 1
    },
    {
      "source": "Population: גיל הרך (לידה-6)",
      "target": "Solution: זמן משפחה",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Population: הורים ומשפחות",
      "target": "Solution: זמן משפחה",
      "type": "population_solution",
      "weight": 1
    },
    {
      "source": "Service: חוסן הורי ומשפחתי",
      "target": "Solution: זמן משפחה",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Service: טיפול רגשי",
      "target": "Solution: זמן משפחה",
      "type": "service_solution",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Organization: יעדים לצפון",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: קרן עזריאלי",
      "type": "location_partner",
      "weight": 2
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: הקרן המשפחתית על שם תד אריסון",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: קרן משפחת שעשוע",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: רשויות מקומיות בצפון הארץ",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Partner: קרן עזריאלי",
      "type": "location_partner",
      "weight": 2
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Partner: הקרן המשפחתית על שם תד אריסון",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Partner: קרן משפחת שעשוע",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Partner: רשויות מקומיות בצפון הארץ",
      "type": "location_partner",
      "weight": 2
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Partner: קרן עזריאלי",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Partner: הקרן המשפחתית על שם תד אריסון",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Partner: קרן משפחת שעשוע",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Partner: רשויות מקומיות בצפון הארץ",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Partner: קרן עזריאלי",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Partner: הקרן המשפחתית על שם תד אריסון",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Partner: קרן משפחת שעשוע",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Partner: רשויות מקומיות בצפון הארץ",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Service: רווחה טיפול בפרט",
      "type": "location_service",
      "weight": 5
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Service: יזמות ותעסוקה",
      "type": "location_service",
      "weight": 4
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Service: רווחה טיפול בפרט",
      "type": "location_service",
      "weight": 7
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Service: יזמות ותעסוקה",
      "type": "location_service",
      "weight": 5
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Service: רווחה טיפול בפרט",
      "type": "location_service",
      "weight": 2
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Service: יזמות ותעסוקה",
      "type": "location_service",
      "weight": 2
    },
    {
      "source": "Location: גליל עליון",
      "target": "Service: רווחה טיפול בפרט",
      "type": "location_service",
      "weight": 6
    },
    {
      "source": "Location: גליל עליון",
      "target": "Service: יזמות ותעסוקה",
      "type": "location_service",
      "weight": 3
    },
    {
      "source": "Organization: יעדים לצפון",
      "target": "Partner: קרן עזריאלי",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: יעדים לצפון",
      "target": "Partner: הקרן המשפחתית על שם תד אריסון",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: יעדים לצפון",
      "target": "Partner: קרן משפחת שעשוע",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: יעדים לצפון",
      "target": "Partner: רשויות מקומיות בצפון הארץ",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: יעדים לצפון",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: יעדים לצפון",
      "target": "Population: בוגרים (18+)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: יעדים לצפון",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: יעדים לצפון",
      "target": "Service: רווחה טיפול בפרט",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: יעדים לצפון",
      "target": "Service: יזמות ותעסוקה",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: קרן עזריאלי",
      "target": "Population: יסודי (6–12)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן עזריאלי",
      "target": "Population: תיכון (15-18)",
      "type": "partner_population",
      "weight": 2
    },
    {
      "source": "Partner: קרן עזריאלי",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן עזריאלי",
      "target": "Population: הורים ומשפחות",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן עזריאלי",
      "target": "Population: בוגרים (18+)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: הקרן המשפחתית על שם תד אריסון",
      "target": "Population: יסודי (6–12)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: הקרן המשפחתית על שם תד אריסון",
      "target": "Population: תיכון (15-18)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: הקרן המשפחתית על שם תד אריסון",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: הקרן המשפחתית על שם תד אריסון",
      "target": "Population: הורים ומשפחות",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: הקרן המשפחתית על שם תד אריסון",
      "target": "Population: בוגרים (18+)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן משפחת שעשוע",
      "target": "Population: יסודי (6–12)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן משפחת שעשוע",
      "target": "Population: תיכון (15-18)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן משפחת שעשוע",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן משפחת שעשוע",
      "target": "Population: הורים ומשפחות",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן משפחת שעשוע",
      "target": "Population: בוגרים (18+)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: רשויות מקומיות בצפון הארץ",
      "target": "Population: יסודי (6–12)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: רשויות מקומיות בצפון הארץ",
      "target": "Population: תיכון (15-18)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: רשויות מקומיות בצפון הארץ",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: רשויות מקומיות בצפון הארץ",
      "target": "Population: הורים ומשפחות",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: רשויות מקומיות בצפון הארץ",
      "target": "Population: בוגרים (18+)",
      "type": "partner_population",
      "weight": 2
    },
    {
      "source": "Partner: קרן עזריאלי",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: קרן עזריאלי",
      "target": "Service: רווחה טיפול בפרט",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: קרן עזריאלי",
      "target": "Service: יזמות ותעסוקה",
      "type": "partner_service",
      "weight": 2
    },
    {
      "source": "Partner: הקרן המשפחתית על שם תד אריסון",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: הקרן המשפחתית על שם תד אריסון",
      "target": "Service: רווחה טיפול בפרט",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: הקרן המשפחתית על שם תד אריסון",
      "target": "Service: יזמות ותעסוקה",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: קרן משפחת שעשוע",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: קרן משפחת שעשוע",
      "target": "Service: רווחה טיפול בפרט",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: קרן משפחת שעשוע",
      "target": "Service: יזמות ותעסוקה",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: רשויות מקומיות בצפון הארץ",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "partner_service",
      "weight": 2
    },
    {
      "source": "Partner: רשויות מקומיות בצפון הארץ",
      "target": "Service: רווחה טיפול בפרט",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: רשויות מקומיות בצפון הארץ",
      "target": "Service: יזמות ותעסוקה",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Service: רווחה טיפול בפרט",
      "type": "population_service",
      "weight": 12
    },
    {
      "source": "Population: יסודי (6–12)",
      "target": "Service: יזמות ותעסוקה",
      "type": "population_service",
      "weight": 5
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Service: רווחה טיפול בפרט",
      "type": "population_service",
      "weight": 12
    },
    {
      "source": "Population: תיכון (15-18)",
      "target": "Service: יזמות ותעסוקה",
      "type": "population_service",
      "weight": 7
    },
    {
      "source": "Population: גיל הרך (לידה-6)",
      "target": "Service: רווחה טיפול בפרט",
      "type": "population_service",
      "weight": 6
    },
    {
      "source": "Population: גיל הרך (לידה-6)",
      "target": "Service: יזמות ותעסוקה",
      "type": "population_service",
      "weight": 5
    },
    {
      "source": "Population: הורים ומשפחות",
      "target": "Service: רווחה טיפול בפרט",
      "type": "population_service",
      "weight": 10
    },
    {
      "source": "Population: הורים ומשפחות",
      "target": "Service: יזמות ותעסוקה",
      "type": "population_service",
      "weight": 7
    },
    {
      "source": "Population: בוגרים (18+)",
      "target": "Service: רווחה טיפול בפרט",
      "type": "population_service",
      "weight": 5
    },
    {
      "source": "Population: בוגרים (18+)",
      "target": "Service: יזמות ותעסוקה",
      "type": "population_service",
      "weight": 4
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: הביתה. חוזרים לגליל",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Partner: Open Valley",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Partner: Open Valley",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Organization: הביתה. חוזרים לגליל",
      "target": "Partner: Open Valley",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: הביתה. חוזרים לגליל",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: הביתה. חוזרים לגליל",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: הביתה. חוזרים לגליל",
      "target": "Population: בוגרים (18+)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: הביתה. חוזרים לגליל",
      "target": "Service: יזמות ותעסוקה",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: הביתה. חוזרים לגליל",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: Open Valley",
      "target": "Population: יסודי (6–12)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: Open Valley",
      "target": "Population: תיכון (15-18)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: Open Valley",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: Open Valley",
      "target": "Population: הורים ומשפחות",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: Open Valley",
      "target": "Population: בוגרים (18+)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: Open Valley",
      "target": "Service: חינוך פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: Open Valley",
      "target": "Service: יזמות ותעסוקה",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: Open Valley",
      "target": "Service: טיפול רגשי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: Open Valley",
      "target": "Service: חוסן קהילתי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: Open Valley",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Population: גיל הרך (לידה-6)",
      "target": "Service: חינוך פורמלי",
      "type": "population_service",
      "weight": 5
    },
    {
      "source": "Population: גיל הרך (לידה-6)",
      "target": "Service: חוסן קהילתי",
      "type": "population_service",
      "weight": 8
    },
    {
      "source": "Population: הורים ומשפחות",
      "target": "Service: חינוך פורמלי",
      "type": "population_service",
      "weight": 8
    },
    {
      "source": "Population: הורים ומשפחות",
      "target": "Service: חוסן קהילתי",
      "type": "population_service",
      "weight": 16
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: קרן הביתה \"Homeward",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Organization: קרן הביתה \"Homeward",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: ארגון מעוז",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: רשויות מקומיות ומועצות אזוריות",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: תנועות נוער",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Partner: ארגון מעוז",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Partner: רשויות מקומיות ומועצות אזוריות",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Partner: תנועות נוער",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Partner: ארגון מעוז",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Partner: רשויות מקומיות ומועצות אזוריות",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Partner: תנועות נוער",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "location_population",
      "weight": 3
    },
    {
      "source": "Organization: קרן הביתה \"Homeward",
      "target": "Partner: ארגון מעוז",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: קרן הביתה \"Homeward",
      "target": "Partner: רשויות מקומיות ומועצות אזוריות",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: קרן הביתה \"Homeward",
      "target": "Partner: תנועות נוער",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: קרן הביתה \"Homeward",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: קרן הביתה \"Homeward",
      "target": "Service: רווחה טיפול בפרט",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: ארגון מעוז",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: רשויות מקומיות ומועצות אזוריות",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: תנועות נוער",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: ארגון מעוז",
      "target": "Service: חוסן קהילתי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: ארגון מעוז",
      "target": "Service: רווחה טיפול בפרט",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: ארגון מעוז",
      "target": "Service: חינוך פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: ארגון מעוז",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: רשויות מקומיות ומועצות אזוריות",
      "target": "Service: חוסן קהילתי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: רשויות מקומיות ומועצות אזוריות",
      "target": "Service: רווחה טיפול בפרט",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: רשויות מקומיות ומועצות אזוריות",
      "target": "Service: חינוך פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: רשויות מקומיות ומועצות אזוריות",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: תנועות נוער",
      "target": "Service: חוסן קהילתי",
      "type": "partner_service",
      "weight": 2
    },
    {
      "source": "Partner: תנועות נוער",
      "target": "Service: רווחה טיפול בפרט",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: תנועות נוער",
      "target": "Service: חינוך פורמלי",
      "type": "partner_service",
      "weight": 2
    },
    {
      "source": "Partner: תנועות נוער",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Population: צוותים ואנשי מקצוע",
      "target": "Service: חוסן קהילתי",
      "type": "population_service",
      "weight": 6
    },
    {
      "source": "Population: צוותים ואנשי מקצוע",
      "target": "Service: רווחה טיפול בפרט",
      "type": "population_service",
      "weight": 4
    },
    {
      "source": "Organization: על\"ם",
      "target": "Population: בוגרים (18+)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: על\"ם",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: על\"ם",
      "target": "Service: רווחה טיפול בפרט",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Population: בוגרים (18+)",
      "target": "Service: נוער בסיכון",
      "type": "population_service",
      "weight": 2
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: נט\"ל",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Partner: קרן אדמונד דה רוטשילד",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Partner: רשת ביג",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Partner: משרד הביטחון",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "location_service",
      "weight": 5
    },
    {
      "source": "Location: ארצי",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "location_service",
      "weight": 2
    },
    {
      "source": "Location: ארצי",
      "target": "Service: חוסן קהילתי",
      "type": "location_service",
      "weight": 13
    },
    {
      "source": "Organization: נט\"ל",
      "target": "Partner: קרן אדמונד דה רוטשילד",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: נט\"ל",
      "target": "Partner: רשת ביג",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: נט\"ל",
      "target": "Partner: משרד הביטחון",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: נט\"ל",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: נט\"ל",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: נט\"ל",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: נט\"ל",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: קרן אדמונד דה רוטשילד",
      "target": "Population: תיכון (15-18)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן אדמונד דה רוטשילד",
      "target": "Population: הורים ומשפחות",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן אדמונד דה רוטשילד",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: רשת ביג",
      "target": "Population: תיכון (15-18)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: רשת ביג",
      "target": "Population: הורים ומשפחות",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: רשת ביג",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: משרד הביטחון",
      "target": "Population: תיכון (15-18)",
      "type": "partner_population",
      "weight": 3
    },
    {
      "source": "Partner: משרד הביטחון",
      "target": "Population: הורים ומשפחות",
      "type": "partner_population",
      "weight": 2
    },
    {
      "source": "Partner: משרד הביטחון",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן אדמונד דה רוטשילד",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: קרן אדמונד דה רוטשילד",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: קרן אדמונד דה רוטשילד",
      "target": "Service: חוסן קהילתי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: רשת ביג",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: רשת ביג",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: רשת ביג",
      "target": "Service: חוסן קהילתי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: משרד הביטחון",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "partner_service",
      "weight": 2
    },
    {
      "source": "Partner: משרד הביטחון",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: משרד הביטחון",
      "target": "Service: חוסן קהילתי",
      "type": "partner_service",
      "weight": 2
    },
    {
      "source": "Population: צוותים ואנשי מקצוע",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "population_service",
      "weight": 3
    },
    {
      "source": "Population: צוותים ואנשי מקצוע",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "population_service",
      "weight": 3
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: עמך / בנפשנו",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: משרד הביטחון",
      "type": "location_partner",
      "weight": 3
    },
    {
      "source": "Organization: עמך / בנפשנו",
      "target": "Partner: משרד הביטחון",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: עמך / בנפשנו",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: עמך / בנפשנו",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: עמך / בנפשנו",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: עמך / בנפשנו",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: משרד הביטחון",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "partner_population",
      "weight": 2
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: Unistream",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: קרן טראמפ",
      "type": "location_partner",
      "weight": 2
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: פדרציות יהודיות",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Partner: קרן טראמפ",
      "type": "location_partner",
      "weight": 2
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Partner: פדרציות יהודיות",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Organization: Unistream",
      "target": "Partner: קרן טראמפ",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: Unistream",
      "target": "Partner: קרן עזריאלי",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: Unistream",
      "target": "Partner: פדרציות יהודיות",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: Unistream",
      "target": "Service: יזמות ותעסוקה",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: קרן טראמפ",
      "target": "Population: תיכון (15-18)",
      "type": "partner_population",
      "weight": 2
    },
    {
      "source": "Partner: קרן טראמפ",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן עזריאלי",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: פדרציות יהודיות",
      "target": "Population: תיכון (15-18)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: פדרציות יהודיות",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן טראמפ",
      "target": "Service: יזמות ותעסוקה",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: פדרציות יהודיות",
      "target": "Service: יזמות ותעסוקה",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Service: יזמות ותעסוקה",
      "type": "population_service",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Organization: Basecamp",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: Basecamp",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Partner: קרן הדור הבא",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: קרן הדור הבא",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "location_population",
      "weight": 2
    },
    {
      "source": "Organization: Basecamp",
      "target": "Partner: קרן הדור הבא",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: Basecamp",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: Basecamp",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: קרן הדור הבא",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן הדור הבא",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Partner: תנועות נוער",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Organization: אקדמיית מצמיחים",
      "target": "Partner: תנועות נוער",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: אקדמיית מצמיחים",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: תנועות נוער",
      "target": "Population: יסודי (6–12)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: תנועות נוער",
      "target": "Population: תיכון (15-18)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Organization: מכללת תל חי",
      "target": "Partner: רשויות מקומיות בצפון הארץ",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: מכללת תל חי",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: רשויות מקומיות בצפון הארץ",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: אוניברסיטת רייכמן",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Organization: מדברים ביחד - הורים וילדים",
      "target": "Partner: אוניברסיטת רייכמן",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Partner: אוניברסיטת רייכמן",
      "target": "Population: הורים ומשפחות",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: אוניברסיטת רייכמן",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: אוניברסיטת רייכמן",
      "target": "Service: טיפול רגשי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: אוניברסיטת רייכמן",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: רשת אורט",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: רשת אורט",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: מכללת גורדון",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Partner: מכללת גורדון",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Organization: רשת אורט",
      "target": "Partner: מכללת גורדון",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: רשת אורט",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: רשת אורט",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: רשת אורט",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: רשת אורט",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: רשת אורט",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: מכללת גורדון",
      "target": "Population: תיכון (15-18)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: מכללת גורדון",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: מכללת גורדון",
      "target": "Population: הורים ומשפחות",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: מכללת גורדון",
      "target": "Service: חוסן קהילתי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: מכללת גורדון",
      "target": "Service: חינוך פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: ברנקו וייס",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: ברנקו וייס",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: PEF Israel Endowment Funds (USA)",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Partner: PEF Israel Endowment Funds (USA)",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Organization: ברנקו וייס",
      "target": "Partner: קרן טראמפ",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: ברנקו וייס",
      "target": "Partner: PEF Israel Endowment Funds (USA)",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: ברנקו וייס",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ברנקו וייס",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ברנקו וייס",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ברנקו וייס",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ברנקו וייס",
      "target": "Population: בוגרים (18+)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ברנקו וייס",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: ברנקו וייס",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: קרן טראמפ",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן טראמפ",
      "target": "Population: יסודי (6–12)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן טראמפ",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן טראמפ",
      "target": "Population: בוגרים (18+)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: PEF Israel Endowment Funds (USA)",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: PEF Israel Endowment Funds (USA)",
      "target": "Population: יסודי (6–12)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: PEF Israel Endowment Funds (USA)",
      "target": "Population: תיכון (15-18)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: PEF Israel Endowment Funds (USA)",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: PEF Israel Endowment Funds (USA)",
      "target": "Population: בוגרים (18+)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן טראמפ",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: קרן טראמפ",
      "target": "Service: חינוך פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: PEF Israel Endowment Funds (USA)",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: PEF Israel Endowment Funds (USA)",
      "target": "Service: חינוך פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Population: גיל הרך (לידה-6)",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "population_service",
      "weight": 3
    },
    {
      "source": "Location: גליל עליון",
      "target": "Organization: חותם",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Partner: קרן נעמי",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Organization: חותם",
      "target": "Partner: קרן נעמי",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: חותם",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: חותם",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: קרן נעמי",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן נעמי",
      "target": "Service: חינוך פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: מכון חרוב",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Partner: האוניברסיטה העברית",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Partner: קרן שוסטרמן ישראל",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Organization: מכון חרוב",
      "target": "Partner: האוניברסיטה העברית",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: מכון חרוב",
      "target": "Partner: קרן שוסטרמן ישראל",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: מכון חרוב",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מכון חרוב",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מכון חרוב",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מכון חרוב",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מכון חרוב",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מכון חרוב",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: האוניברסיטה העברית",
      "target": "Population: יסודי (6–12)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: האוניברסיטה העברית",
      "target": "Population: תיכון (15-18)",
      "type": "partner_population",
      "weight": 2
    },
    {
      "source": "Partner: האוניברסיטה העברית",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: האוניברסיטה העברית",
      "target": "Population: הורים ומשפחות",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: האוניברסיטה העברית",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן שוסטרמן ישראל",
      "target": "Population: יסודי (6–12)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן שוסטרמן ישראל",
      "target": "Population: תיכון (15-18)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן שוסטרמן ישראל",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן שוסטרמן ישראל",
      "target": "Population: הורים ומשפחות",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן שוסטרמן ישראל",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: האוניברסיטה העברית",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: קרן שוסטרמן ישראל",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: ויצו",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Organization: Early Starters",
      "target": "Partner: ויצו",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: Early Starters",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: ויצו",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: ויצו",
      "target": "Population: הורים ומשפחות",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: ויצו",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: IsraAid",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: החברה למתנ\"סים",
      "type": "location_partner",
      "weight": 3
    },
    {
      "source": "Organization: IsraAid",
      "target": "Partner: החברה למתנ\"סים",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: IsraAid",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: IsraAid",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: IsraAid",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: IsraAid",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: IsraAid",
      "target": "Population: בוגרים (18+)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: IsraAid",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: החברה למתנ\"סים",
      "target": "Population: יסודי (6–12)",
      "type": "partner_population",
      "weight": 2
    },
    {
      "source": "Partner: החברה למתנ\"סים",
      "target": "Population: תיכון (15-18)",
      "type": "partner_population",
      "weight": 3
    },
    {
      "source": "Partner: החברה למתנ\"סים",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: החברה למתנ\"סים",
      "target": "Population: הורים ומשפחות",
      "type": "partner_population",
      "weight": 3
    },
    {
      "source": "Partner: החברה למתנ\"סים",
      "target": "Population: בוגרים (18+)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: החברה למתנ\"סים",
      "target": "Service: חוסן קהילתי",
      "type": "partner_service",
      "weight": 2
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: עמותת גלילה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: עמותת גלילה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Organization: עמותת גלילה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Organization: עמותת גלילה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Organization: עמותת גלילה",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: עמותת גלילה",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: עמותת גלילה",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: עמותת גלילה",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: עמותת גלילה",
      "target": "Population: בוגרים (18+)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: עמותת גלילה",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: עמותת גלילה",
      "target": "Service: רווחה טיפול בפרט",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: עמותת גלילה",
      "target": "Service: יזמות ותעסוקה",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: מצפינים",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: עמותת בוגרי 8200",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Organization: מצפינים",
      "target": "Partner: עמותת בוגרי 8200",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: מצפינים",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מצפינים",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מצפינים",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מצפינים",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מצפינים",
      "target": "Population: בוגרים (18+)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מצפינים",
      "target": "Service: יזמות ותעסוקה",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: עמותת בוגרי 8200",
      "target": "Population: יסודי (6–12)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: עמותת בוגרי 8200",
      "target": "Population: תיכון (15-18)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: עמותת בוגרי 8200",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: עמותת בוגרי 8200",
      "target": "Population: הורים ומשפחות",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: עמותת בוגרי 8200",
      "target": "Population: בוגרים (18+)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: עמותת בוגרי 8200",
      "target": "Service: יזמות ותעסוקה",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: הקואליציה הישראלית לטראומה (ITC)",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: ער'ן",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: הדסה",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Organization: הקואליציה הישראלית לטראומה (ITC)",
      "target": "Partner: ער'ן",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: הקואליציה הישראלית לטראומה (ITC)",
      "target": "Partner: הדסה",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: הקואליציה הישראלית לטראומה (ITC)",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: הקואליציה הישראלית לטראומה (ITC)",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: הקואליציה הישראלית לטראומה (ITC)",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: הקואליציה הישראלית לטראומה (ITC)",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: הקואליציה הישראלית לטראומה (ITC)",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: ער'ן",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: הדסה",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: ער'ן",
      "target": "Service: טיפול רגשי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: ער'ן",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: ער'ן",
      "target": "Service: חוסן קהילתי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: ער'ן",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: הדסה",
      "target": "Service: טיפול רגשי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: הדסה",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: הדסה",
      "target": "Service: חוסן קהילתי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: הדסה",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: קרן אתנה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Partner: חברת CyberArc",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Partner: קרן רוח הגליל",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Partner: הסתדרות המורים",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: חברת CyberArc",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: קרן רוח הגליל",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: הסתדרות המורים",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Organization: קרן אתנה",
      "target": "Partner: חברת CyberArc",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: קרן אתנה",
      "target": "Partner: קרן רוח הגליל",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: קרן אתנה",
      "target": "Partner: הסתדרות המורים",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: קרן אתנה",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Partner: חברת CyberArc",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: קרן רוח הגליל",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: הסתדרות המורים",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: חברת CyberArc",
      "target": "Service: חינוך פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: קרן רוח הגליל",
      "target": "Service: חינוך פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: הסתדרות המורים",
      "target": "Service: חינוך פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Organization: אנוש",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: אנוש",
      "target": "Service: רווחה טיפול בפרט",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: ניצן",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Organization: ניצן",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Organization: ניצן",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ניצן",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ניצן",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ניצן",
      "target": "Service: רווחה טיפול בפרט",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: קרן אספר",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: האוניברסיטה העברית",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: הקרן החדשה לישראל",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Organization: קרן אספר",
      "target": "Partner: החברה למתנ\"סים",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: קרן אספר",
      "target": "Partner: האוניברסיטה העברית",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: קרן אספר",
      "target": "Partner: הקרן החדשה לישראל",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: קרן אספר",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: קרן אספר",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: קרן אספר",
      "target": "Service: נוער בסיכון",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: קרן אספר",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: החברה למתנ\"סים",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "partner_population",
      "weight": 2
    },
    {
      "source": "Partner: האוניברסיטה העברית",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: הקרן החדשה לישראל",
      "target": "Population: תיכון (15-18)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: הקרן החדשה לישראל",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: החברה למתנ\"סים",
      "target": "Service: נוער בסיכון",
      "type": "partner_service",
      "weight": 2
    },
    {
      "source": "Partner: החברה למתנ\"סים",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "partner_service",
      "weight": 3
    },
    {
      "source": "Partner: האוניברסיטה העברית",
      "target": "Service: נוער בסיכון",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: האוניברסיטה העברית",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: הקרן החדשה לישראל",
      "target": "Service: נוער בסיכון",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: הקרן החדשה לישראל",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: קרן בלומברג",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: לב אחד",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: החמל האזרחי",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: מרכז פרס",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Organization: קרן בלומברג",
      "target": "Partner: החברה למתנ\"סים",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: קרן בלומברג",
      "target": "Partner: לב אחד",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: קרן בלומברג",
      "target": "Partner: החמל האזרחי",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: קרן בלומברג",
      "target": "Partner: מרכז פרס",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: קרן בלומברג",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: לב אחד",
      "target": "Service: חוסן קהילתי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: החמל האזרחי",
      "target": "Service: חוסן קהילתי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: מרכז פרס",
      "target": "Service: חוסן קהילתי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: קרן מנדל",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Organization: קרן מנדל",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: קרן מנדל",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: קרן מנדל",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: ג'וינט ישראל",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Partner: מכון ברוקדייל",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Partner: משרד הבינוי והשיכון",
      "type": "location_partner",
      "weight": 2
    },
    {
      "source": "Location: ארצי",
      "target": "Service: יזמות ותעסוקה",
      "type": "location_service",
      "weight": 2
    },
    {
      "source": "Location: ארצי",
      "target": "Service: רווחה טיפול בפרט",
      "type": "location_service",
      "weight": 6
    },
    {
      "source": "Organization: ג'וינט ישראל",
      "target": "Partner: מכון ברוקדייל",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: ג'וינט ישראל",
      "target": "Partner: משרד הבינוי והשיכון",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: ג'וינט ישראל",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ג'וינט ישראל",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ג'וינט ישראל",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ג'וינט ישראל",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ג'וינט ישראל",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ג'וינט ישראל",
      "target": "Service: יזמות ותעסוקה",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: ג'וינט ישראל",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: ג'וינט ישראל",
      "target": "Service: רווחה טיפול בפרט",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: מכון ברוקדייל",
      "target": "Population: יסודי (6–12)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: מכון ברוקדייל",
      "target": "Population: תיכון (15-18)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: מכון ברוקדייל",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: מכון ברוקדייל",
      "target": "Population: הורים ומשפחות",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: מכון ברוקדייל",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: משרד הבינוי והשיכון",
      "target": "Population: יסודי (6–12)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: משרד הבינוי והשיכון",
      "target": "Population: תיכון (15-18)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: משרד הבינוי והשיכון",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: משרד הבינוי והשיכון",
      "target": "Population: הורים ומשפחות",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: משרד הבינוי והשיכון",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "partner_population",
      "weight": 2
    },
    {
      "source": "Partner: מכון ברוקדייל",
      "target": "Service: יזמות ותעסוקה",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: מכון ברוקדייל",
      "target": "Service: חוסן קהילתי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: מכון ברוקדייל",
      "target": "Service: רווחה טיפול בפרט",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: משרד הבינוי והשיכון",
      "target": "Service: יזמות ותעסוקה",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: משרד הבינוי והשיכון",
      "target": "Service: חוסן קהילתי",
      "type": "partner_service",
      "weight": 2
    },
    {
      "source": "Partner: משרד הבינוי והשיכון",
      "target": "Service: רווחה טיפול בפרט",
      "type": "partner_service",
      "weight": 2
    },
    {
      "source": "Population: צוותים ואנשי מקצוע",
      "target": "Service: יזמות ותעסוקה",
      "type": "population_service",
      "weight": 2
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: קרן רש\"י",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Partner: משרד הפנים",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Organization: קרן רש\"י",
      "target": "Partner: משרד הפנים",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: קרן רש\"י",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: קרן רש\"י",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: קרן רש\"י",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: קרן רש\"י",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: קרן רש\"י",
      "target": "Service: יזמות ותעסוקה",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: קרן רש\"י",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: משרד הפנים",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: משרד הפנים",
      "target": "Population: תיכון (15-18)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: משרד הפנים",
      "target": "Population: הורים ומשפחות",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: משרד הפנים",
      "target": "Service: חוסן קהילתי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: משרד הפנים",
      "target": "Service: יזמות ותעסוקה",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: משרד הפנים",
      "target": "Service: חינוך פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: קרן שחף",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Organization: קרן שחף",
      "target": "Partner: משרד הבינוי והשיכון",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: קרן שחף",
      "target": "Population: צוותים ואנשי מקצוע",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: קרן שחף",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: קרן שחף",
      "target": "Service: רווחה טיפול בפרט",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: קרן \"פועלים לתקומה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: משרד ההתיישבות",
      "type": "location_partner",
      "weight": 2
    },
    {
      "source": "Organization: קרן \"פועלים לתקומה",
      "target": "Partner: משרד ההתיישבות",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: קרן \"פועלים לתקומה",
      "target": "Partner: משרד הביטחון",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Partner: משרד ההתיישבות",
      "target": "Service: חינוך פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: משרד הביטחון",
      "target": "Service: חינוך פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Partner: החברה למתנ\"סים",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Partner: יוניסטרים",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Partner: חממת \"Fresh Start",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Organization: תנובה",
      "target": "Partner: החברה למתנ\"סים",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: תנובה",
      "target": "Partner: יוניסטרים",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: תנובה",
      "target": "Partner: חממת \"Fresh Start",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: תנובה",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: תנובה",
      "target": "Service: יזמות ותעסוקה",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: יוניסטרים",
      "target": "Population: הורים ומשפחות",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: חממת \"Fresh Start",
      "target": "Population: הורים ומשפחות",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: החברה למתנ\"סים",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: החברה למתנ\"סים",
      "target": "Service: יזמות ותעסוקה",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: יוניסטרים",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: יוניסטרים",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: יוניסטרים",
      "target": "Service: יזמות ותעסוקה",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: חממת \"Fresh Start",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: חממת \"Fresh Start",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: חממת \"Fresh Start",
      "target": "Service: יזמות ותעסוקה",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Organization: הנוער העובד והלומד",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: הנוער העובד והלומד",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: הנוער העובד והלומד",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Partner: הסתדרות העובדים",
      "type": "location_partner",
      "weight": 2
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Partner: הסתדרות העובדים",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Partner: הסתדרות העובדים",
      "type": "location_partner",
      "weight": 2
    },
    {
      "source": "Organization: הנוער העובד והלומד",
      "target": "Partner: הסתדרות העובדים",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: הנוער העובד והלומד",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: הנוער העובד והלומד",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: הנוער העובד והלומד",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: הנוער העובד והלומד",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: הסתדרות העובדים",
      "target": "Population: תיכון (15-18)",
      "type": "partner_population",
      "weight": 3
    },
    {
      "source": "Partner: הסתדרות העובדים",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "partner_population",
      "weight": 3
    },
    {
      "source": "Partner: הסתדרות העובדים",
      "target": "Service: חוסן קהילתי",
      "type": "partner_service",
      "weight": 3
    },
    {
      "source": "Partner: הסתדרות העובדים",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "partner_service",
      "weight": 2
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: צופים",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: צופים",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Organization: צופים",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: צופים",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: צופים",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: צופים",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Organization: בני עקיבא",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: בני עקיבא",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: בני עקיבא",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Organization: בני עקיבא",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: בני עקיבא",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: בני עקיבא",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: בני עקיבא",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Organization: השומר הצעיר",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: השומר הצעיר",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Partner: משרד ההתיישבות",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Partner: משרד הביטחון",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Organization: השומר הצעיר",
      "target": "Partner: משרד ההתיישבות",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: השומר הצעיר",
      "target": "Partner: משרד הביטחון",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: השומר הצעיר",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: השומר הצעיר",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: השומר הצעיר",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: השומר הצעיר",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: משרד ההתיישבות",
      "target": "Population: תיכון (15-18)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: משרד ההתיישבות",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: משרד ההתיישבות",
      "target": "Service: חוסן קהילתי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: משרד ההתיישבות",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: משרד הביטחון",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Location: מבואות חרמון",
      "target": "Organization: בני המושבים",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: בני המושבים",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Organization: בני המושבים",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: בני המושבים",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: בני המושבים",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: בני המושבים",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Organization: התנועה החדשה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: איזורים נוספים",
      "target": "Organization: התנועה החדשה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Organization: התנועה החדשה",
      "target": "Partner: הסתדרות העובדים",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: התנועה החדשה",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: התנועה החדשה",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: התנועה החדשה",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: התנועה החדשה",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: משרד החינוך",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "location_service",
      "weight": 7
    },
    {
      "source": "Location: ארצי",
      "target": "Service: נוער בסיכון",
      "type": "location_service",
      "weight": 5
    },
    {
      "source": "Organization: משרד החינוך",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: משרד החינוך",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: משרד החינוך",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: משרד החינוך",
      "target": "Service: נוער בסיכון",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: משרד החינוך",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: משרד הרווחה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Population: בוגרים (18+)",
      "type": "location_population",
      "weight": 5
    },
    {
      "source": "Organization: משרד הרווחה",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: משרד הרווחה",
      "target": "Population: בוגרים (18+)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: משרד הרווחה",
      "target": "Service: רווחה טיפול בפרט",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: משרד הרווחה",
      "target": "Service: נוער בסיכון",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Population: הורים ומשפחות",
      "target": "Service: נוער בסיכון",
      "type": "population_service",
      "weight": 9
    },
    {
      "source": "Population: גיל הרך (לידה-6)",
      "target": "Service: נוער בסיכון",
      "type": "population_service",
      "weight": 5
    },
    {
      "source": "Population: חטיבת ביניים ( 12-15)",
      "target": "Service: רווחה טיפול בפרט",
      "type": "population_service",
      "weight": 6
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: משרד הבריאות",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Organization: משרד הבריאות",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: משרד רה\"מ",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Organization: משרד רה\"מ",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: משרד רה\"מ",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: משרד הנגב",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: הגליל והחוסן הלאומי",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Organization: משרד הנגב",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: משרד הנגב",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: משרד הנגב",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: משרד הנגב",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: הגליל והחוסן הלאומי",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: הגליל והחוסן הלאומי",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: הגליל והחוסן הלאומי",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: הגליל והחוסן הלאומי",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: משרד הנגב",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: משרד הנגב",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: הגליל והחוסן הלאומי",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: הגליל והחוסן הלאומי",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: הרשות לביטחון קהילתי",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Organization: הרשות לביטחון קהילתי",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: הרשות לביטחון קהילתי",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: הרשות לביטחון קהילתי",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: הרשות לביטחון קהילתי",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: הרשות לביטחון קהילתי",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: הרשות לביטחון קהילתי",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: הרשות לביטחון קהילתי",
      "target": "Service: רווחה טיפול בפרט",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: הרשות לביטחון קהילתי",
      "target": "Service: נוער בסיכון",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: מטה יישום תנופה לצפון",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Organization: מטה יישום תנופה לצפון",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מטה יישום תנופה לצפון",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מטה יישום תנופה לצפון",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מטה יישום תנופה לצפון",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מטה יישום תנופה לצפון",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מטה יישום תנופה לצפון",
      "target": "Population: בוגרים (18+)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מטה יישום תנופה לצפון",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מטה יישום תנופה לצפון",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מטה יישום תנופה לצפון",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: מוקד ערב\"ה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Organization: מוקד ערב\"ה",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: ביטוח לאומי",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Organization: ביטוח לאומי",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: ביטוח לאומי",
      "target": "Service: רווחה טיפול בפרט",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: קופות חולים",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Organization: קופות חולים",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: קופות חולים",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: קופות חולים",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: קופות חולים",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: קופות חולים",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: קופות חולים",
      "target": "Population: בוגרים (18+)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: קופות חולים",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: קופות חולים",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: פיקוד העורף",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Organization: פיקוד העורף",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: פיקוד העורף",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: פיקוד העורף",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: פיקוד העורף",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: פיקוד העורף",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: פיקוד העורף",
      "target": "Population: בוגרים (18+)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: פיקוד העורף",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: מפעל הפיס",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Organization: מפעל הפיס",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מפעל הפיס",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מפעל הפיס",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מפעל הפיס",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מפעל הפיס",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מפעל הפיס",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מפעל הפיס",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש מתנסים",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש מתנסים",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש מתנסים",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש חינוך",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש חינוך",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש חינוך",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש חינוך",
      "target": "Service: חינוך פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש חינוך",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Location: קריית שמונה",
      "target": "Organization: ק\"ש רווחה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש רווחה",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש רווחה",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש רווחה",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש רווחה",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש רווחה",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש רווחה",
      "target": "Service: רווחה טיפול בפרט",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש רווחה",
      "target": "Service: נוער בסיכון",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש רווחה",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש שפ\"ח",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: ק\"ש שפ\"ח",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מ. מבואות חרמון",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מ. מבואות חרמון",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מ. מבואות חרמון",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מ. גליל עליון שפ\"ח",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מ. גליל עליון שפ\"ח",
      "target": "Service: נוער בסיכון",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Organization: מ. גליל עליון חינוך",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Organization: מ. גליל עליון חינוך",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מ. גליל עליון חינוך",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מ. גליל עליון חינוך",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מ. גליל עליון חינוך",
      "target": "Service: נוער בסיכון",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מ. גליל עליון חינוך",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Location: גליל עליון",
      "target": "Organization: מ. גליל עליון רווחה",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Organization: מ. גליל עליון רווחה",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מ. גליל עליון רווחה",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מ. גליל עליון רווחה",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מ. גליל עליון רווחה",
      "target": "Population: גיל הרך (לידה-6)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מ. גליל עליון רווחה",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: מ. גליל עליון רווחה",
      "target": "Service: רווחה טיפול בפרט",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מ. גליל עליון רווחה",
      "target": "Service: נוער בסיכון",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מ. גליל עליון רווחה",
      "target": "Service: חוסן הורי ומשפחתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מ. גליל עליון רווחה",
      "target": "Service: הכשרות והדרכה לאנשי מקצוע",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: מ. גליל עליון רווחה",
      "target": "Service: טיפול רגשי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Location: גליל מזרחי",
      "target": "Organization: אשכול גליל מזרחי",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: גליל מזרחי",
      "target": "Population: יסודי (6–12)",
      "type": "location_population",
      "weight": 2
    },
    {
      "source": "Location: גליל מזרחי",
      "target": "Population: תיכון (15-18)",
      "type": "location_population",
      "weight": 2
    },
    {
      "source": "Location: גליל מזרחי",
      "target": "Population: הורים ומשפחות",
      "type": "location_population",
      "weight": 2
    },
    {
      "source": "Location: גליל מזרחי",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "location_population",
      "weight": 2
    },
    {
      "source": "Location: גליל מזרחי",
      "target": "Population: בוגרים (18+)",
      "type": "location_population",
      "weight": 2
    },
    {
      "source": "Location: גליל מזרחי",
      "target": "Service: חוסן קהילתי",
      "type": "location_service",
      "weight": 2
    },
    {
      "source": "Organization: אשכול גליל מזרחי",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: אשכול גליל מזרחי",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: אשכול גליל מזרחי",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: אשכול גליל מזרחי",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: אשכול גליל מזרחי",
      "target": "Population: בוגרים (18+)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: אשכול גליל מזרחי",
      "target": "Service: חוסן קהילתי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Location: גליל מזרחי",
      "target": "Organization: מרכז חוסן גליל מזרחי",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: גליל מזרחי",
      "target": "Partner: הסתדרות העובדים",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Location: גליל מזרחי",
      "target": "Service: טיפול רגשי",
      "type": "location_service",
      "weight": 1
    },
    {
      "source": "Location: גליל מזרחי",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "location_service",
      "weight": 1
    },
    {
      "source": "Organization: מרכז חוסן גליל מזרחי",
      "target": "Partner: הסתדרות העובדים",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Partner: הסתדרות העובדים",
      "target": "Population: יסודי (6–12)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: הסתדרות העובדים",
      "target": "Population: הורים ומשפחות",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: הסתדרות העובדים",
      "target": "Population: בוגרים (18+)",
      "type": "partner_population",
      "weight": 1
    },
    {
      "source": "Partner: הסתדרות העובדים",
      "target": "Service: טיפול רגשי",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Partner: הסתדרות העובדים",
      "target": "Service: טיפול וטראומה נפשית",
      "type": "partner_service",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Organization: התוכנית הלאומית לילדים ונוער בסיכון – 360",
      "type": "location_organization",
      "weight": 1
    },
    {
      "source": "Location: ארצי",
      "target": "Partner: החברה למתנ\"סים",
      "type": "location_partner",
      "weight": 1
    },
    {
      "source": "Organization: התוכנית הלאומית לילדים ונוער בסיכון – 360",
      "target": "Partner: החברה למתנ\"סים",
      "type": "organization_partner",
      "weight": 1
    },
    {
      "source": "Organization: התוכנית הלאומית לילדים ונוער בסיכון – 360",
      "target": "Population: יסודי (6–12)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: התוכנית הלאומית לילדים ונוער בסיכון – 360",
      "target": "Population: תיכון (15-18)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: התוכנית הלאומית לילדים ונוער בסיכון – 360",
      "target": "Population: הורים ומשפחות",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: התוכנית הלאומית לילדים ונוער בסיכון – 360",
      "target": "Population: חטיבת ביניים ( 12-15)",
      "type": "organization_population",
      "weight": 1
    },
    {
      "source": "Organization: התוכנית הלאומית לילדים ונוער בסיכון – 360",
      "target": "Service: רווחה טיפול בפרט",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: התוכנית הלאומית לילדים ונוער בסיכון – 360",
      "target": "Service: נוער בסיכון",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Organization: התוכנית הלאומית לילדים ונוער בסיכון – 360",
      "target": "Service: חינוך בלתי פורמלי",
      "type": "organization_service",
      "weight": 1
    },
    {
      "source": "Partner: החברה למתנ\"סים",
      "target": "Service: רווחה טיפול בפרט",
      "type": "partner_service",
      "weight": 1
    }
  ]
}
export default function GraphPage() {
  const [graphData, setGraphData] = useState(defaultGraphData);
  const [isLoading, setIsLoading] = useState(false); // Added isLoading state
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedOrganizations, setSelectedOrganizations] = useState([]);
  const [filters, setFilters] = useState({
    showOrganizations: true, // Default leading node type is on
    showPopulations: false,
    showProfessions: false, // Corresponds to 'service' nodes
    showLocations: false,
    showPartnerships: false,
    showSolutions: false, // Corresponds to 'solution' nodes
    leadingNodeType: 'organization',
  });
  // Moved stats here to be updated dynamically if graphData changes
  const [stats, setStats] = useState({
    organizations: defaultGraphData.nodes.filter(n => n.type === 'organization').length,
    partners: defaultGraphData.nodes.filter(n => n.type === 'partner').length,
    populations: defaultGraphData.nodes.filter(n => n.type === 'population').length,
    services: defaultGraphData.nodes.filter(n => n.type === 'service').length,
    solutions: defaultGraphData.nodes.filter(n => n.type === 'solution').length,
    locations: defaultGraphData.nodes.filter(n => n.type === 'location').length,
  });

  const controlsRef = useRef(null); // Define controlsRef

  // Effect to update stats when graphData changes
  useEffect(() => {
    setStats({
      organizations: graphData.nodes.filter(n => n.type === 'organization').length,
      partners: graphData.nodes.filter(n => n.type === 'partner').length,
      populations: graphData.nodes.filter(n => n.type === 'population').length,
      services: graphData.nodes.filter(n => n.type === 'service').length,
      solutions: graphData.nodes.filter(n => n.type === 'solution').length,
      locations: graphData.nodes.filter(n => n.type === 'location').length,
    });
  }, [graphData]);

  const organizationNames = useMemo(() => {
    const names = new Set();
    const nodeType = filters.leadingNodeType || 'organization'; // Changed from 'ORG'
    graphData.nodes.forEach(node => {
      if (node.type === nodeType) {
        names.add(node.id);
      }
    });
    return Array.from(names).sort();
  }, [graphData.nodes, filters.leadingNodeType]);

  const handleFileLoad = (data) => {
    setGraphData(data);
    setSelectedNode(null);
    // setShowUploader(false); // Removed as it's not used elsewhere
    setSelectedOrganizations([]);
    // Reset filters to initial state (only organizations visible)
    setFilters({
      showOrganizations: true,
      showPopulations: false,
      showProfessions: false,
      showLocations: false,
      showPartnerships: false,
      showSolutions: false,
      leadingNodeType: 'organization',
    });
    // setIsInitialView(true); // No longer needed due to logic in handleSelectedOrganizationsChange
  };

  const handleScrollToFilters = () => {
    controlsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSelectedOrganizationsChange = (selectionUpdater) => {
    // The updater can be a new array or a function `(prevState) => newState`.
    // We need to resolve the new state first to use it in our logic.
    const newSelection = typeof selectionUpdater === 'function' 
      ? selectionUpdater(selectedOrganizations) 
      : selectionUpdater;

    // Update the selected organizations state
    setSelectedOrganizations(newSelection);
  };

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
  };

  // Check if we should show initial view (no leading nodes selected)
  const shouldShowInitialView = selectedOrganizations.length === 0;

  // Logos definition
  const logos = [
    { src: "https://galil-elion.org.il/wp-content/uploads/2021/11/logo_galil_elion.png", alt: "מועצה אזורית גליל עליון לוגו" },
    { src: "https://www.mhg.org.il/wp-content/uploads/2021/08/Logo-main.png", alt: "מרכז חוסן גליל מזרחי לוגו" },
    { src: "https://upload.wikimedia.org/wikipedia/he/6/6f/Kiryat_Shmona.png", alt: "עיריית קריית שמונה לוגו" },
    { src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/36167c609_logo2.png", alt: "שותפים - בית לקולקטיב אימפקט לוגו" },
    { src: "https://www.m-harim.co.il/img/logo.jpg", alt: "מועצה אזורית מבואות חרמון לוגו" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-4 md:p-6" dir="rtl">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-700 bg-clip-text text-transparent leading-tight">
                מפת ארגונים וממענים
              </h1>
              <p className="text-2xl md:text-3xl font-semibold text-gray-700 mt-2">
                חוסן ילדים ונוער בצפון
              </p>
            </div>
            <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap mt-4 mb-8">
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/0ad77d4b2_logo-footer.png" alt="חוסן ילדינו לוגו" className="h-12 object-contain" />
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/2966100a4_958284_70d24a2827094ca7865207603e8dd09bmv2.png" alt="שותפים לוגו" className="h-16 object-contain" />
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/d46763da3_.png" alt="Whiteboard Logo" className="h-12 object-contain" />
            </div>
            <div className="mt-4 h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-blue-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{stats.organizations}</div>
                  <div className="text-sm text-gray-600">ארגונים</div>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-purple-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{stats.partners}</div>
                  <div className="text-sm text-gray-600">שותפים</div>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-amber-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{stats.populations}</div>
                  <div className="text-sm text-gray-600">סוגי אוכלוסיות</div>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{stats.services}</div>
                  <div className="text-sm text-gray-600">התמחויות</div>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-rose-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-rose-600"></div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{stats.solutions}</div>
                  <div className="text-sm text-gray-600">מענים</div>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-orange-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{stats.locations}</div>
                  <div className="text-sm text-gray-600">איזורי פריסה גיאוגרפית</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* File Uploader */}
        {/* Removed showUploader state as per current code; if re-added, this block might be relevant */}
        {/* {showUploader && (
          <div className="mb-6">
            <FileUploader onFileLoad={handleFileLoad} />
          </div>
        )} */}

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Right Column: Controls & Legend */}
          <div ref={controlsRef} className="lg:w-1/3 xl:w-1/4 space-y-6 shrink-0 filter-controls">
            <GraphControls
              filters={filters}
              onFiltersChange={handleFiltersChange}
              organizationNames={organizationNames}
              selectedOrganizations={selectedOrganizations}
              onSelectedOrganizationsChange={handleSelectedOrganizationsChange}
              graphData={graphData}
            />
            <GraphLegend />
          </div>

          {/* Left Column: Main Graph Area */}
          <div className="flex-grow">
            <Card className="p-0 overflow-hidden shadow-2xl border-0 h-[65vh] min-h-[500px] mb-4">
              {shouldShowInitialView ? (
                <InitialGraphPlaceholder onScrollToFilters={handleScrollToFilters} />
              ) : (
                <GraphVisualization
                  graphData={graphData}
                  filters={filters}
                  selectedNode={selectedNode}
                  onNodeSelect={handleNodeSelect}
                  selectedOrganizations={selectedOrganizations}
                />
              )}
            </Card>
            
            {/* Node Details or Selection Prompt - Below graph */}
            {selectedNode ? (
              <NodeDetails 
                node={selectedNode} 
                onClose={() => setSelectedNode(null)} 
                graphData={graphData}
              />
            ) : (
              !shouldShowInitialView && (
                <Card className="backdrop-blur-sm bg-white/90 shadow-xl border-0 p-6">
                  <div className="text-center text-gray-500">
                    <Network className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <h3 className="font-medium mb-2">בחר/י צומת</h3>
                    <p className="text-sm">
                      יש ללחוץ על צומת בגרף כדי לראות מידע מפורט על הקשרים שלו.
                    </p>
                  </div>
                </Card>
              )
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
