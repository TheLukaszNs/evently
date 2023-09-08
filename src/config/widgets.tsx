import { GalleryHorizontalEnd, Map, MessageSquare, User } from "lucide-react";
import { ReactNode } from "react";

export type WidgetKind = "organizers" | "comments" | "location" | "stories";

export type WidgetOption = {
  icon: ReactNode;
  label: string;
  value: WidgetKind;
};

const iconClass = "w-6 h-6 mr-2";

export const WIDGET_OPTIONS: WidgetOption[] = [
  {
    icon: <User className={iconClass} />,
    label: "Organizers",
    value: "organizers",
  },
  {
    icon: <MessageSquare className={iconClass} />,
    label: "Comments",
    value: "comments",
  },
  {
    icon: <Map className={iconClass} />,
    label: "Location",
    value: "location",
  },
  {
    icon: <GalleryHorizontalEnd className={iconClass} />,
    label: "Evently Stories",
    value: "stories",
  },
];
