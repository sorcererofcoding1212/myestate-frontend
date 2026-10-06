import {
  LucideCircleDollarSign,
  LucideHeart,
  LucideHouseHeart,
  LucideKeySquare,
  LucideInbox,
  LucideSearch,
} from "lucide-react";
import { BUY, INBOX, LIST, RENT } from "./constants";

export const routes = [
  { label: "Search", path: "/search", icon: LucideSearch },
  { label: "Buy", path: BUY, icon: LucideHouseHeart },
  { label: "Rent", path: RENT, icon: LucideKeySquare },
  { label: "List", path: LIST, icon: LucideCircleDollarSign },
  { label: "Favorites", path: "/favorites", icon: LucideHeart },
  { label: "Inbox", path: INBOX, icon: LucideInbox },
];
