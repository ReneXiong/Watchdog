import React from "react";
import CIcon from "@coreui/icons-react";
import {
	cibJson,
	cilBell,
	cilBullhorn,
	cilCalculator,
	cilChartPie,
	cilCursor,
	cilDescription,
	cilDrop,
	cilGlobeAlt,
	cilNotes,
	cilPencil,
	cilPeople,
	cilPuzzle,
	cilSettings,
	cilSpeedometer,
	cilStar,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
	{
		component: CNavItem,
		name: "Dashboard",
		to: "/dashboard",
		icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
		badge: {
			color: "info",
			text: "PRO",
		},
	},
	{
		component: CNavItem,
		name: "Triggers",
		to: "/triggers",
		icon: <CIcon icon={cilBullhorn} customClassName="nav-icon" />,
		badge: {
			color: "info",
			text: "PRO",
		},
	},
	{
		component: CNavItem,
		name: "Watchdog Plus",
		to: "/#",
		icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
		badge: {
			color: "info",
			text: "PRO",
		},
	},
];

export default _nav;
