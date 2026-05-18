"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ChevronRight, BookOpen, Plus, X, Save, Trash2, Filter, Search, Clock, ChevronLeft, ChevronsLeft, ChevronsRight, Briefcase, MapPin, CalendarDays, Upload, Rocket, Award, Play, Pause, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ITEMS_PER_PAGE = 10;

// Hardcoded Activity Logs Data - All 51 logs
const HARCODED_LOGS: ActivityLog[] = [
  {
    id: 1778919458900,
    slug: "flowstate-13",
    date: "May 14, 2026",
    title: "Flowstate",
    description: "Today’s work focused on improving Flowstate’s sprint planning, priority tracking, AI recommendations, and team synchronization features.",
    content: "*Priority Tasks View\\n  -Added a “View Priority Tasks” button in the My Tasks tab to display a REGULAR TASKS – BY PRIORITY table with filtering options for Today, This Week, and This Month.\\n\\n*Blocker Priority Monitoring\\n  -Added a “Blocker Priority” button in the Live Blockers tab to display a BLOCKERS PRIORITY table with filtering options based on workstream and deadline.\\n\\n*Sprint Planner Improvements\\n  -Enhanced the Sprint Planner tab with workload balancing and urgency-based task ordering to help optimize team capacity and sprint execution.\\n\\n*Google Gemini AI Integration\\n  -Successfully integrated Google Gemini AI into the Sprint Planner tab to generate intelligent workload balancing suggestions and blocker resolution recommendations.\\n\\n*Sidebar Team Synchronization Fix\\n  -Fixed sidebar synchronization issues to ensure proper team switching updates across both the AI Insights and Team Activity pages.",
    tags: ["next.js"],
    icon: "📝"
  },
  {
    id: 1778919279501,
    slug: "flowsate",
    date: "May 13, 2026",
    title: "Flowsate",
    description: "Today’s work focused on improving Flowstate’s sidebar interaction system, tooltip usability, and modal behavior.",
    content: "*Workspace Hover Interaction\\n  -Added hover interaction on the team/workspace icon in collapsed sidebar mode, displaying a tooltip with “Switch Workspace” and “Select a team to continue” before opening the dropdown.\\n\\n*Navigation Icon Tooltips\\n  -Implemented hover tooltips for navigation icons in collapsed mode, showing labels such as “(icon Dashboard)” without affecting sidebar width or layout structure.\\n\\n*Centered Modal Fixes\\n  -Fixed the Create Team and Join Team modals to remain perfectly centered using portal rendering, ensuring they are not affected by sidebar hover, collapse, or expanded states.",
    tags: ["next.js"],
    icon: "📝"
  },
  {
    id: 1778919136782,
    slug: "flowstate-12",
    date: "May 12, 2026",
    title: "Flowstate",
    description: "Today’s work focused on improving Flowstate’s sidebar navigation, profile management, and settings functionality.",
    content: "*Interactive Sidebar Toggle\\n  -Built a clickable FlowState logo that toggles the sidebar width from 64px to 256px with smooth transitions while always displaying the full FlowState brand name.\\n\\n*Enhanced Navigation UI\\n  -Organized menu items with hover tooltips, active state indicators (blue background with right-side bar), and responsive icon/text alignment for both collapsed and expanded sidebar states.\\n\\n*Profile Management System\\n  -Developed a full Settings profile management feature including photo uploads, resume uploads, role and skill editing, and password validation functionality.\\n\\n*Shift Scheduling Feature\\n  -Added editable shift scheduling in Settings with a time picker, live end-time and break preview, plus database persistence for saving schedule configurations.",
    tags: ["next.js"],
    icon: "📝"
  },
  {
    id: 1778918900406,
    slug: "flowstate-11",
    date: "May 11, 2026",
    title: "Flowstate",
    description: "Today’s work focused on improving Flowstate’s authentication system, password security, and validation workflow.",
    content: "*Security Tab Password Change\\n  -Added password change functionality in the Security Tab with 3 validation rules: minimum 8 characters, uppercase letter requirement, and special character requirement. Also included real-time checkbox indicators and current password verification before updating.\\n\\n*Secure Signup System\\n  -Built a secure signup process with a real-time password strength meter, validation for 8 characters, uppercase letters, special characters, email “@” checking, progress bar feedback, and checkbox requirement indicators.\\n\\n*Server-Side Validation & Password Protection\\n  -Implemented server-side validation matching frontend rules, added bcrypt password hashing, and blocked duplicate email registrations for secure credential storage.\\n\\n*Secure Login Backend\\n  -Developed the login backend with email lookup, bcrypt password comparison, secure error handling, and proper user data return for session management.",
    tags: ["next.js"],
    icon: "📝"
  },
  {
    id: 1778918602862,
    slug: "flowstate-10",
    date: "May 9, 2026",
    title: "Flowstate",
    description: "Today’s work focused on improving Flowstate’s real-time synchronization, admin controls, and interface consistency.",
    content: "*Workstream Rename Functionality\\n   -Added functionality to rename workstreams with real-time database updates and instant sidebar synchronization using Socket.IO.\\n\\n*Team Rename Feature (Admin Only)\\n  -Implemented functionality allowing admins to rename teams directly from the Settings tab, with live updates reflected across the sidebar and header.\\n\\n*Real-Time Socket Events\\n  -Added real-time socket events so all team and workstream name changes instantly appear for all members without requiring a page refresh.\\n\\n*Reaction Tooltip UI Cleanup\\n-Updated the reaction tooltip with a white theme, removed the close button, and hid scrollbars for a cleaner and more modern interface.\\n\\n*Custom FlowState Branding\\n  -Replaced all placeholder logos with the official FlowState logo across the navbar, sidebar, and footer for consistent branding.\\n\\n*Sidebar Hover Edit Controls\\n  -Implemented a hover-triggered pencil icon on sidebar workstreams, allowing admins to quickly edit workstream names and members.\\n\\n*Rename Field Validation\\n  -Added a 50-character limit with a live character counter in the rename field to improve input control and user feedback.",
    tags: ["next.js"],
    icon: "📝"
  },
  {
    id: 1778918119455,
    slug: "flowstate-9",
    date: "May 8, 2026",
    title: "Flowstate",
    description: "Today’s work focused on improving Flowstate’s real-time activity tracking and landing page user experience.",
    content: "*Blocker Count Synchronization Fix\\n  -Resolved the blocker count synchronization issue in Team Activity, ensuring accurate real-time updates whenever blockers are marked as “Resolved.”\\n\\n*Landing Page Redesign\\n  -Redesigned the landing page with interactive FAQ dropdowns, smoother navigation flow, and a more consistent design system applied across all sections for improved usability and visual consistency.",
    tags: ["next.js"],
    icon: "📝"
  },
  {
    id: 1778746756780,
    slug: "tesda-nc-ii-assessment-exam-completion-passed",
    date: "May 6, 2026",
    title: "TESDA NC II Assessment / Exam Completion Passed",
    description: "Successfully passed the TESDA NC II assessment, demonstrating competency in required technical skills.",
    content: "*Assessment Preparation\\n  -Reviewed required competencies and prepared for the NC II assessment.\\n\\n*Skills Evaluation Readiness\\n  -Practiced hands-on tasks to ensure readiness for the exam.\\n\\n*NC II Passed\\n  -Successfully passed the TESDA NC II assessment, meeting certification standards.",
    tags: ["NCII CERTIFIED"],
    icon: "🏅"
  },
  {
    id: 1778746615204,
    slug: "nc-ii-training-progress-april-21-may-5-2026",
    date: "April 21, 2026",
    title: "NC II Training – Progress",
    description: "Active participation in NC II training sessions and practical activities to strengthen core technical skills.",
    content: "*Training Participation\\n  -Actively participated in NC II training sessions.\\n\\n*Hands-on Learning Tasks\\n  -Completed guided exercises and applied learned concepts.\\n\\n*Skill Development Progress\\n  -Improved understanding of NC II competencies through continuous practice.",
    tags: ["NCII"],
    icon: "📖"
  },
  {
    id: 1778746306164,
    slug: "flowstate-8",
    date: "May 2, 2026",
    title: "Flowstate",
    description: "System update focused on improving account settings, assignee management, and API request handling.",
    content: "*Account Management Dropdowns\\n   -Added expandable dropdowns for Delete Account and Change Password.\\n\\n*Assignee & Profile Improvements\\n   -Profile photos now appear in the assignee dropdown. Implemented role-based permissions.\\n\\n*API Request Fix\\n   -Updated API request structure to fix user deletion.\\n\\n*Resume Viewer Enhancement\\n   -Adjusted resume viewer layout to properly display entire document.",
    tags: ["next.js"],
    icon: "📝"
  },
  {
    id: 1778669986407,
    slug: "flowstate-7",
    date: "April 20, 2026",
    title: "Flowstate",
    description: "Enhancing the Flowstate system UI structure and AI Insights dashboard features.",
    content: "*Floating Action Button Control\\n  -Updated FAB to only appear on Dashboard page.\\n\\n*Blockers UI Design\\n  -Started designing UI for Blockers system.\\n\\n*No Team Message\\n  -Added “No Team” message across all pages when user has no team.",
    tags: ["next.js"],
    icon: "📝"
  },
  {
    id: 1778669769792,
    slug: "flowstate-6",
    date: "April 17, 2026",
    title: "Flowstate",
    description: "Enhancing Flowstate system UI and AI Insights dashboard features.",
    content: "*Direct Team Switching\\n  -Enabled switching teams directly from sidebar dropdown.\\n\\n*Dynamic Team Feed Update\\n  -Implemented real-time team feed updates.\\n\\n*Invite Code Display\\n  -Added team invite code in chat header with copy button.\\n\\n*Admin Team Deletion\\n  -Allowed admins to delete teams.\\n\\n*Member Leave Team\\n  -Enabled members to leave teams.",
    tags: ["next.js"],
    icon: "📝"
  },
  {
    id: 1778669479233,
    slug: "flowstate-5",
    date: "April 16, 2026",
    title: "Flowstate",
    description: "Enhancing Flowstate system UI structure and AI Insights dashboard features.",
    content: "*Bug Fixes\\n-Fixed user name update issue.\\n\\n*Team Selection Page\\n-Created team selection page with cards.\\n\\n*Team Feed Tab System\\n-Built workspace with Chat, Members, Activity, Settings tabs.\\n\\n*Members Tab\\n-Displays team members with role badges.\\n\\n*Activity Tab\\n-Shows team activity logs.\\n\\n*Settings Tab\\n-Added Leave Group and Delete Team controls.\\n\\n*Chat Tab\\n-Implemented real-time messaging.",
    tags: ["next", "js"],
    icon: "📝"
  },
  {
    id: 1778669164368,
    slug: "flowstate-4",
    date: "April 15, 2026",
    title: "Flowstate",
    description: "Enhancing Flowstate system UI structure and AI Insights dashboard features.",
    content: "*First Name & Last Name Update\\n  -Implemented real-time name updates.\\n\\n*Email Change Feature\\n  -Enabled secure email updating with validation.\\n\\n*Password Change Feature\\n  -Added secure password update with verification.\\n\\n*Delete Account Feature\\n  -Built complete account deletion system.",
    tags: ["next.js"],
    icon: "📝"
  },
  {
    id: 1778668208441,
    slug: "flowstate-3",
    date: "April 14, 2026",
    title: "Flowstate",
    description: "Improving Flowstate system UI structure and AI Analytics navigation flow.",
    content: "*Settings Page UI Setup\\n  -Created Settings page layout with Profile/Security/Preferences tabs.\\n\\n*Team Selection Page\\n  -Built page for team selection before analytics.\\n\\n*AI Analytics Navigation\\n  -Added View AI Analytics button for better navigation.",
    tags: ["next", "js"],
    icon: "📝"
  },
  {
    id: 1778667986058,
    slug: "flowstate-2",
    date: "April 13, 2026",
    title: "Flowstate",
    description: "Enhancing Flowstate system UI structure and AI Insights dashboard features.",
    content: "*AI Insight UI Setup\\n  -Set up AI Insight section interface.\\n\\n*Custom Date Range Filter\\n  -Added date filtering options.\\n\\n*Dashboard Tabs\\n  -Added navigation tabs for AI Digest, Risk Monitor, Sprint Planner, Security.",
    tags: ["next.js"],
    icon: "📝"
  },
  {
    id: 1778667749106,
    slug: "flowstate-1",
    date: "April 10, 2026",
    title: "Flowstate",
    description: "Improving Flowstate system UI/UX design and initial page structure.",
    content: "*Layout UI/UX Design\\n  -Created overall layout and UI/UX design for Flowstate.\\n\\n*My Tasks Page Setup\\n  -Set up initial My Tasks page interface.",
    tags: ["NEXT.JS"],
    icon: "📝"
  },
  {
    id: 1778667214610,
    slug: "flowstate",
    date: "May 12, 2026",
    title: "Flowstate",
    description: "Setting up project environment and integrating backend database.",
    content: "*Project Setup Completed\\n  -Cloned repository and installed dependencies.\\n\\n*MongoDB Atlas Integration\\n  -Connected to MongoDB Atlas.\\n\\n*Data Storage Implementation\\n  -Successfully stored user data.",
    tags: ["MONGODB", "GITHUB"],
    icon: "📝"
  },
  {
    id: 1778666912843,
    slug: "one-page-pitch-creation",
    date: "April 6, 2026",
    title: "One-Page Pitch Creation",
    description: "Planning and presenting a digital solution idea to improve operational efficiency.",
    content: "*One-Page Pitch Creation\\n  -Created concise pitch for digital solution outlining problem, solution, and benefits.",
    tags: ["DOCUMENT"],
    icon: "📝"
  },
  {
    id: 1778666587219,
    slug: "created-a-design-template-for-the-2026-chevrolet-silverado-1500-vs-2026-toyota-tundra-comparison-page",
    date: "March 27, 2026",
    title: "Vehicle Comparison Page Design",
    description: "Designing a structured layout for a vehicle comparison page.",
    content: "*Comparison Page Design Template\\n  -Created design template for vehicle comparison page with clean structure.",
    tags: ["HTML", "CSS"],
    icon: "🎨"
  },
  {
    id: 1778666081339,
    slug: "page-creation",
    date: "March 26, 2026",
    title: "Page Creation",
    description: "Reviewing system guidelines and beginning page creation setup.",
    content: "*SOP Review\\n  -Reviewed page creation phases.\\n\\n*Page Template Setup\\n  -Started setting up initial page template.",
    tags: ["CSS", "HTML"],
    icon: "📝"
  },
  {
    id: 1778665826363,
    slug: "syncsnap-13",
    date: "March 25, 2026",
    title: "SyncSnap",
    description: "Improving SyncSnap notification handling, role-based security, and AI report interface.",
    content: "*Notification System Improvement\\n  -Fixed Mark All Read functionality.\\n\\n*Role-Based Access Control\\n  -Implemented proper access restrictions for reports.\\n\\n*AI Report UI Design\\n  -Developed initial design for AI-generated report interface.",
    tags: ["Laravel", "React"],
    icon: "📝"
  },
  {
    id: 1778665724316,
    slug: "syncsnap-12",
    date: "March 24, 2026",
    title: "SyncSnap",
    description: "Improving SyncSnap reporting, AI reliability, and permissions.",
    content: "*Member Report Feature\\n  -Built Member Report view showing team performance.\\n\\n*Multi-Provider AI System\\n  -Configured OpenRouter as backup AI system.\\n\\n*Permission Fixes\\n  -Fixed member access issues and resolved CSRF errors.",
    tags: ["Laravel", "React"],
    icon: "📝"
  },
  {
    id: 1778665483540,
    slug: "base-platform-furfund",
    date: "March 19, 2026",
    title: "Base Platform & FurFund",
    description: "Learning new platforms and starting FurFund prototype.",
    content: "*Base Platform Learning\\n  -Learned basics of Base platform and set up accounts.\\n\\n*FurFund Prototype\\n  -Built initial prototype of FurFund.",
    tags: ["Base Platform"],
    icon: "📝"
  },
  {
    id: 1778665145612,
    slug: "syncsnap-11",
    date: "March 16, 2026",
    title: "SyncSnap",
    description: "Improving SyncSnap usability and AI report rendering.",
    content: "*Reports Search Feature\\n  -Implemented workspace search in Reports Index.\\n\\n*Report Parsing Optimization\\n  -Improved parseReportText for cleaner display.",
    tags: ["Laravel", "React"],
    icon: "📝"
  },
  {
    id: 1778665042261,
    slug: "syncsnap-10",
    date: "March 17, 2026",
    title: "SyncSnap",
    description: "Strengthening SyncSnap security and access control.",
    content: "*IDOR Protection\\n  -Added ownership validation across controllers.\\n\\n*Admin & Member Report Separation\\n  -Restricted reports to admins only.\\n\\n*Notification Count Fix\\n  -Fixed notification count display.",
    tags: ["Laravel", "React"],
    icon: "📝"
  },
  {
    id: 1778664817636,
    slug: "syncsnap-9",
    date: "March 16, 2026",
    title: "SyncSnap",
    description: "Improving SyncSnap stability and AI report generation.",
    content: "*CSRF Error Fix\\n  -Resolved CSRF token errors.\\n\\n*Enhanced Deadline Reminders\\n  -Added working workspace links to emails.\\n\\n*OpenAI Integration\\n  -Integrated GPT-3.5-turbo for AI reports.",
    tags: ["Laravel", "React", "AI"],
    icon: "📝"
  },
  {
    id: 1778664694381,
    slug: "syncsnap-8",
    date: "March 13, 2026",
    title: "SyncSnap",
    description: "Improving SyncSnap AI report quality and analytics.",
    content: "*AI Reports Cleanup\\n  -Fixed duplicate paragraph issues.\\n\\n*Blocker Visibility\\n  -Allowed all team members to view blockers.\\n\\n*Date Picker Enhancement\\n  -Added date selector for reports.\\n\\n*Automated Deadline Reminders\\n  -Built system for email reminders.",
    tags: [],
    icon: "📝"
  },
  {
    id: 1778664394438,
    slug: "syncsnap-7",
    date: "March 12, 2026",
    title: "SyncSnap",
    description: "Improving SyncSnap AI integration and reporting.",
    content: "*OpenRouter API Fix\\n  -Switched to openai/gpt-3.5-turbo.\\n\\n*AI Reports LIVE\\n  -Activated live AI report generation.\\n\\n*Removed Fallback Errors\\n  -Eliminated No summary available fallback.\\n\\n*Notification Navigation Fix\\n  -Fixed View Details navigation.",
    tags: ["Laravel", "React"],
    icon: "📝"
  },
  {
    id: 1778664143374,
    slug: "syncsnap-6",
    date: "March 10, 2026",
    title: "SyncSnap",
    description: "Improving SyncSnap permissions and AI integration.",
    content: "*Member/Admin Permissions\\n  -Added status update for members.\\n\\n*Gemini API Fix\\n  -Fixed Gemini API key.\\n\\n*Status Tracking\\n  -Improved blocker visibility.",
    tags: ["Laravel", "React"],
    icon: "📝"
  },
  {
    id: 1778663665270,
    slug: "syncsnap-5",
    date: "March 8, 2026",
    title: "SyncSnap",
    description: "Improving SyncSnap AI reporting system.",
    content: "*AI Reports Working\\n  -Implemented AI reports using Gemini.\\n\\n*Server Error Fixes\\n  -Resolved 500 internal errors.",
    tags: ["Laravel", "React", "AI"],
    icon: "📝"
  },
  {
    id: 1778663530718,
    slug: "syncsnap-4",
    date: "March 5, 2026",
    title: "SyncSnap",
    description: "Improving SyncSnap blocker management and notifications.",
    content: "*Blocker Status Management\\n  -Implemented tracking with Pending/Processing/Resolved.\\n\\n*Email Notifications\\n  -Fixed admin alert system.\\n\\n*Admin Response Feature\\n  -Added direct response to blockers.\\n\\n*Workspace Search\\n  -Implemented search by title.",
    tags: ["Laravel", "React"],
    icon: "📝"
  },
  {
    id: 1778663305326,
    slug: "syncsnap-3",
    date: "March 4, 2026",
    title: "SyncSnap",
    description: "Improving SyncSnap UI and notification reliability.",
    content: "*Workspace Cards\\n  -Built separate notification cards per workspace.\\n\\n*Status Controls\\n  -Added status badges with three-dot menu.\\n\\n*Email Notifications\\n  -Resolved email errors.",
    tags: ["Laravel", "React"],
    icon: "📝"
  },
  {
    id: 1778662925359,
    slug: "syncsnap-2",
    date: "May 2, 2026",
    title: "SyncSnap",
    description: "Enhancing gamification features and user feedback.",
    content: "*Gamification Features\\n  -Daily streaks\\n  -Early bird bonuses (+10)\\n  -Milestone rewards\\n  -Leaderboard rankings\\n\\n*System Feedback\\n  -Success toasts and warning messages.",
    tags: ["Laravel", "React"],
    icon: "🎮"
  },
  {
    id: 1778661786367,
    slug: "syncsnap-1",
    date: "March 1, 2026",
    title: "SyncSnap",
    description: "Development of SyncSnap system improvements.",
    content: "*Workspace & Standup System\\n  -Improved collaboration features.\\n\\n*Gamification\\n  -Started implementing engagement elements.\\n\\n*Database Setup\\n  -Created required tables.",
    tags: ["Laravel", "React"],
    icon: "📝"
  },
  {
    id: 1778661216417,
    slug: "syncsnap",
    date: "May 26, 2026",
    title: "SyncSnap",
    description: "Research and planning for SyncSnap project.",
    content: "*Tool Research\\n  -Evaluated different technologies.\\n\\n*System Planning\\n  -Brainstormed features and workflow.\\n\\n*Implementation Strategy\\n  -Identified tech stack options.",
    tags: [],
    icon: "📝"
  },
  {
    id: 1778660776113,
    slug: "research-based",
    date: "February 25, 2026",
    title: "Research-Based",
    description: "Quality assurance testing for Sinag Villas Website.",
    content: "*QA Testing\\n  -Performed quality assurance checks.\\n\\n*Script Impact Research\\n  -Researched script effects on performance.",
    tags: ["Research"],
    icon: "📝"
  },
  {
    id: 1778660382665,
    slug: "axiom-scrumban-5",
    date: "May 24, 2026",
    title: "Axiom Scrumban",
    description: "System debugging and error resolution.",
    content: "*System Error Fixes\\n  -Fixed 404 errors\\n  -Solved PostgreSQL JSON issues\\n  -Corrected route conflicts\\n  -Fixed BOM encoding\\n  -Resolved ActivityLog null errors\\n  -Addressed Vue warnings",
    tags: ["Laravel", "Vue"],
    icon: "⚙️"
  },
  {
    id: 1778660158033,
    slug: "axiom-scrumban-4",
    date: "February 22, 2026",
    title: "Axiom Scrumban",
    description: "System functionality and notification improvements.",
    content: "*Permanent Project Deletion\\n  -Implemented with confirmation prompt.\\n\\n*Gmail SMTP Configuration\\n  -Configured for email notifications.",
    tags: ["Laravel", "Vue"],
    icon: "📧"
  },
  {
    id: 1778659899985,
    slug: "axiom-scrumban-3",
    date: "February 19, 2026",
    title: "Axiom Scrumban",
    description: "Project organization and UI improvements.",
    content: "*Project Archive System\\n  -Implemented archiving from notifications.\\n\\n*UI Components\\n  -Added responsive grid layout\\n  -Designed color-coded notification cards",
    tags: ["Laravel", "Vue"],
    icon: "🎨"
  },
  {
    id: 1778659464290,
    slug: "axiom-scrumban-2",
    date: "February 18, 2026",
    title: "Axiom Scrumban",
    description: "Notification system enhancement.",
    content: "*Notification System\\n  -3-day reminders\\n  -Due today alerts\\n  -Overdue alerts\\n  -Project creation alerts",
    tags: ["Laravel", "Vue"],
    icon: "🔔"
  },
  {
    id: 1778659064531,
    slug: "axiom-srumban",
    date: "February 17, 2026",
    title: "Axiom Scrumban",
    description: "Continuous development and workflow enhancement.",
    content: "*Workflow Enhancement\\n  -Improved task management\\n  -Created flowcharts\\n  -Implemented notification system",
    tags: ["Laravel", "Vue"],
    icon: "📊"
  },
  {
    id: 1778658196619,
    slug: "axiom-scrumban-1",
    date: "February 16, 2026",
    title: "Axiom Scrumban",
    description: "System documentation and core development.",
    content: "*Documentation\\n  -Features and implementation strategies\\n\\n*Core Pages\\n  -Authentication pages\\n  -Landing pages",
    tags: ["Laravel", "Vue"],
    icon: "📄"
  },
  {
    id: 1778657521755,
    slug: "axiom-scrumban",
    date: "February 15, 2026",
    title: "Axiom Scrumban",
    description: "Page creation for structured content management.",
    content: "*Page Creation\\n  -Created page for tasks and documentation\\n  -Designed for organized project information",
    tags: ["Laravel", "Vue"],
    icon: "📝"
  },
  {
    id: 1778656599037,
    slug: "learning-laravel-plus-vue",
    date: "February 5, 2026",
    title: "Learning Laravel Plus Vue",
    description: "Learning fundamentals of Laravel and Vue.js.",
    content: "*Learning Progress\\n  -Exploring Laravel and Vue.js fundamentals\\n  -Building scalable and modern systems",
    tags: ["Laravel", "Vue"],
    icon: "📚"
  },
  {
    id: 1778655932302,
    slug: "laravel-vue-integration",
    date: "February 5, 2026",
    title: "Laravel + Vue Integration",
    description: "Learning how Laravel and Vue.js work together.",
    content: "*Integration Learning\\n  -Understanding backend and frontend integration\\n  -Building dynamic systems",
    tags: ["Laravel", "Vue"],
    icon: "🔗"
  },
  {
    id: 1778655157647,
    slug: "reading-sui-modules-1-5",
    date: "February 4, 2026",
    title: "Reading Sui Modules 1-5",
    description: "Learning Sui blockchain platform basics.",
    content: "*Module 1: Sui 101\\n  -Introduction to Sui blockchain\\n\\n*Module 2: Move Language\\n  -Introduction to Move programming\\n\\n*Module 3: Smart Contracts\\n  -Building basic smart contracts\\n\\n*Module 4: DApp Development\\n  -Creating decentralized apps\\n\\n*Module 5: UX Enhancements\\n  -Advanced Move features",
    tags: ["SUI"],
    icon: "⛓️"
  }
];

// OJT Timeline Data
const ojtTimeline = [
  {
    date: "Feb 2026",
    title: "OJT Started + Learning Phase",
    description: "Started online OJT at MakerSpace Innohub. Learned Laravel + Vue.js integration. Completed SUI Modules 1-5. Started Axiom Scrumban development.",
    icon: "🚀",
    category: "Learning"
  },
  {
    date: "Feb 15-20, 2026",
    title: "Axiom Scrumban - Notification System",
    description: "Built notification system with 3-day reminders, due today alerts, overdue alerts, and instant in-app notifications. Implemented project archive system.",
    icon: "💻",
    category: "Development"
  },
  {
    date: "Feb 23-25, 2026",
    title: "Axiom Scrumban - Bug Fixes",
    description: "Implemented permanent project deletion with confirmation. Configured Gmail SMTP for email notifications. Resolved 404 errors, PostgreSQL issues, route conflicts.",
    icon: "⚙️",
    category: "Bug Fix"
  },
  {
    date: "March 1-5, 2026",
    title: "SyncSnap - Gamification",
    description: "Implemented daily streaks, early bird bonuses (+10 points), milestone rewards, and leaderboard rankings.",
    icon: "🎮",
    category: "Development"
  },
  {
    date: "March 6-12, 2026",
    title: "SyncSnap - Blocker Management",
    description: "Implemented blocker status management (Pending/Processing/Resolved). Built email notification system for admin alerts.",
    icon: "🔒",
    category: "Development"
  },
  {
    date: "March 13-19, 2026",
    title: "SyncSnap - AI Reports",
    description: "Integrated Gemini API for AI report generation. Built deadline reminders with email notifications. Added date picker for custom ranges.",
    icon: "🤖",
    category: "AI Integration"
  },
  {
    date: "March 20-25, 2026",
    title: "SyncSnap - Reports & Permissions",
    description: "Built MemberReport dashboard with team performance analytics. Implemented role-based access control and IDOR protection.",
    icon: "📈",
    category: "Security"
  },
  {
    date: "March 26-31, 2026",
    title: "SyncSnap - Final Features",
    description: "Added Reports Search, optimized Report Parsing, created vehicle comparison design template.",
    icon: "🔧",
    category: "Development"
  },
  {
    date: "April 1-2, 2026",
    title: "FlowState - Account Management",
    description: "Added Delete Account with confirmation modal, Change Password with password fields. Profile photos in assignee dropdown. Fixed API call for user deletion.",
    icon: "🔐",
    category: "Security"
  },
  {
    date: "April 3-6, 2026",
    title: "FlowState - Project Setup",
    description: "Created one-page pitch for digital solution. Cloned repository, installed dependencies, connected to MongoDB Atlas.",
    icon: "🌊",
    category: "Setup"
  },
  {
    date: "April 7-12, 2026",
    title: "FlowState - UI Development",
    description: "Set up My Tasks page UI, Layout UI/UX, Blockers UI design, Floating Action Button, AI Insight page with custom date ranges.",
    icon: "🎨",
    category: "UI/UX"
  },
  {
    date: "April 13-17, 2026",
    title: "FlowState - Settings & Team Features",
    description: "Built Settings page with Profile/Security/Preferences tabs. Added team selection page, View AI Analytics button, switch teams from sidebar.",
    icon: "⚙️",
    category: "Development"
  },
  {
    date: "April 14-18, 2026",
    title: "FlowState - Team Feed Complete",
    description: "Built Team Feed Tab System (Chat, Members, Activity, Settings). Members list with color-coded badges. Real-time messaging.",
    icon: "👥",
    category: "Real-time"
  },
  {
    date: "April 18-20, 2026",
    title: "FlowState - Settings Functionality",
    description: "Working name/email/password changes with verification. Delete account with confirmation modal.",
    icon: "🔧",
    category: "Development"
  },
  {
    date: "April 21 - May 5, 2026",
    title: "📚 NCII CSS Training",
    description: "Started TESDA NCII CSS training. Focused on training modules and assessment preparation.",
    icon: "📖",
    category: "Training"
  },
  {
    date: "May 6, 2026",
    title: "🎉 NCII CSS Assessment - PASSED! 🎉",
    description: "Successfully passed the NCII CSS competency assessment. Officially NCII Certified! ✅",
    icon: "🏅",
    category: "Achievement"
  },
  {
    date: "May 7-9, 2026",
    title: "FlowState - Workstream Features",
    description: "Added workstream rename with real-time database sync. Team rename with live updates. Real-time socket events. Custom FlowState logo.",
    icon: "🔄",
    category: "Real-time"
  },
  {
    date: "May 10-12, 2026",
    title: "FlowState - Authentication System",
    description: "Built secure signup with real-time password meter (8 chars, uppercase, special). Login backend with bcrypt. Responsive design.",
    icon: "🔑",
    category: "Authentication"
  }
];

// Helper function to format date for input (YYYY-MM-DD)
const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper function to format date for display (Month Day, Year)
const formatDateForDisplay = (year: number, month: number, day: number): string => {
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

export default function LogsPage() {
  const [logs] = useState<ActivityLog[]>(HARCODED_LOGS);
  const [filteredLogs, setFilteredLogs] = useState<ActivityLog[]>(HARCODED_LOGS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showOjtJourney, setShowOjtJourney] = useState(true);
  const [ojtCurrentIndex, setOjtCurrentIndex] = useState(0);
  const [ojtVisibleCards, setOjtVisibleCards] = useState(3);
  const [ojtIsAutoPlaying, setOjtIsAutoPlaying] = useState(true);
  const ojtScrollRef = useRef<HTMLDivElement>(null);
  const ojtAutoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    updateFilters();
  }, []);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) setOjtVisibleCards(1);
      else if (window.innerWidth < 1024) setOjtVisibleCards(2);
      else setOjtVisibleCards(3);
    };
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  useEffect(() => {
    if (ojtIsAutoPlaying && showOjtJourney) {
      ojtAutoPlayRef.current = setInterval(() => {
        setOjtCurrentIndex((prev) => 
          prev + ojtVisibleCards >= ojtTimeline.length ? 0 : prev + 1
        );
      }, 4000);
    }
    return () => {
      if (ojtAutoPlayRef.current) clearInterval(ojtAutoPlayRef.current);
    };
  }, [ojtIsAutoPlaying, ojtVisibleCards, showOjtJourney]);

  useEffect(() => {
    if (ojtScrollRef.current && ojtScrollRef.current.children[0]) {
      const cardWidth = (ojtScrollRef.current.children[0] as HTMLElement).offsetWidth;
      ojtScrollRef.current.scrollTo({
        left: ojtCurrentIndex * (cardWidth + 24),
        behavior: 'smooth'
      });
    }
  }, [ojtCurrentIndex]);

  const allTags = [...new Set(HARCODED_LOGS.flatMap(log => log.tags))];
  
  const months = [...new Set(HARCODED_LOGS.map(log => {
    const match = log.date.match(/(\w+) (\d+), (\d+)/);
    if (match) {
      return `${match[1]} ${match[3]}`;
    }
    return '';
  }))];

  const updateFilters = () => {
    let filtered = [...HARCODED_LOGS];
    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (selectedTag) {
      filtered = filtered.filter(log => log.tags.includes(selectedTag));
    }
    if (selectedMonth) {
      filtered = filtered.filter(log => {
        const match = log.date.match(/(\w+) (\d+), (\d+)/);
        if (match) {
          return `${match[1]} ${match[3]}` === selectedMonth;
        }
        return false;
      });
    }
    setFilteredLogs(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    updateFilters();
  }, [searchTerm, selectedTag, selectedMonth]);

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentLogs = filteredLogs.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleOjtPrev = () => {
    setOjtIsAutoPlaying(false);
    setOjtCurrentIndex((prev) => 
      prev - 1 < 0 ? Math.max(0, ojtTimeline.length - ojtVisibleCards) : prev - 1
    );
    setTimeout(() => setOjtIsAutoPlaying(true), 5000);
  };

  const handleOjtNext = () => {
    setOjtIsAutoPlaying(false);
    setOjtCurrentIndex((prev) => 
      prev + ojtVisibleCards >= ojtTimeline.length ? 0 : prev + 1
    );
    setTimeout(() => setOjtIsAutoPlaying(true), 5000);
  };

  const toggleOjtAutoPlay = () => {
    setOjtIsAutoPlaying(!ojtIsAutoPlaying);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTag("");
    setSelectedMonth("");
  };

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen relative pb-32 bg-black">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold mb-2">
          <Briefcase className="w-3 h-3" />
          <span>OJT COMPANY</span>
        </div>

        <div className="space-y-6">
          <h1 className="font-headline font-black text-4xl md:text-5xl lg:text-6xl tracking-tight text-white">
            Activity Logs
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl">
            Add, manage, and track your daily activities and accomplishments during OJT.
          </p>
        </div>

        {/* MakerSpace Innohub Company Card */}
        <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-red-500/5 via-red-600/5 to-transparent border border-red-500/20 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gray-800 flex items-center justify-center shadow-md border border-gray-700 p-2">
                <img 
                  src="/Makespace.png"
                  alt="MakerSpace Innohub Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-headline font-bold text-xl md:text-2xl text-white">
                  MakerSpace Innohub
                </h2>
                <Badge variant="secondary" className="bg-green-900/30 text-green-400">
                  Active
                </Badge>
              </div>
              
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Building the Future of Digital Business with AI & Expert Marketing. We combine Custom Software Development, 
                SEO Authority, and Business Automation to turn your vision into a market leader.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>001 Zinnia St., Nilombot, Mapandan, Pangasinan</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>OJT Period: February - May 2026</span>
                </div>
                <a 
                  href="https://www.makerspace.ph/#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-400 transition-colors group"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4-3-9s1.34-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span className="group-hover:underline">makerspace.ph</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <div className="text-center p-3 rounded-lg bg-gray-900/50 border border-gray-800">
            <p className="text-2xl font-bold text-red-500">{HARCODED_LOGS.length}</p>
            <p className="text-xs text-gray-500">Total Logs</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-900/50 border border-gray-800">
            <p className="text-2xl font-bold text-red-500">{allTags.length}</p>
            <p className="text-xs text-gray-500">Unique Tags</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-900/50 border border-gray-800">
            <p className="text-2xl font-bold text-red-500">🏅</p>
            <p className="text-xs text-gray-500">NCII Certified</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-900/50 border border-gray-800">
            <p className="text-2xl font-bold text-red-500">{totalPages}</p>
            <p className="text-xs text-gray-500">Total Pages</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-800 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-sm text-white"
              />
            </div>
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 text-sm ${showFilters || selectedTag || selectedMonth ? 'bg-red-500 text-white border-red-500' : 'bg-gray-900 border-gray-800 hover:border-red-500/50'}`}>
            <Filter className="w-4 h-4" />
            Filters
            {(selectedTag || selectedMonth) && <span className="ml-1 w-5 h-5 rounded-full bg-white/20 text-xs flex items-center justify-center">{(selectedTag ? 1 : 0) + (selectedMonth ? 1 : 0)}</span>}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 rounded-lg bg-gray-900 border border-gray-800 animate-in slide-in-from-top-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-2 block">Filter by Tag</label>
                <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-800 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-sm text-white">
                  <option value="">All Tags</option>
                  {allTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-2 block">Filter by Month</label>
                <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-800 bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/50 text-sm text-white">
                  <option value="">All Months</option>
                  {months.map(month => <option key={month} value={month}>{month}</option>)}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={clearFilters} className="px-3 py-1.5 text-sm text-gray-500 hover:text-white transition-colors">Clear Filters</button>
            </div>
          </div>
        )}

        {(selectedTag || selectedMonth || searchTerm) && (
          <div className="flex flex-wrap gap-2 mt-3">
            {searchTerm && <Badge variant="secondary" className="flex items-center gap-1 bg-gray-800">Search: {searchTerm}<X className="w-3 h-3 cursor-pointer" onClick={() => setSearchTerm("")} /></Badge>}
            {selectedTag && <Badge variant="secondary" className="flex items-center gap-1 bg-red-500/20 text-red-400">Tag: {selectedTag}<X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedTag("")} /></Badge>}
            {selectedMonth && <Badge variant="secondary" className="flex items-center gap-1 bg-gray-800">Month: {selectedMonth}<X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedMonth("")} /></Badge>}
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto mb-4">
        <p className="text-sm text-gray-500">Showing {startIndex + 1}-{Math.min(endIndex, filteredLogs.length)} of {filteredLogs.length} activity logs</p>
      </div>

      {/* Activity Logs List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {currentLogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2 text-white">No logs found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="mt-4 px-4 py-2 text-sm bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors text-red-400">Clear all filters</button>
          </div>
        ) : (
          currentLogs.map((log) => (
            <div key={log.id} className="relative group">
              <Link href={`/logs/${log.slug}`} className="block">
                <Card className="hover:shadow-md transition-all border-gray-800 hover:border-red-500/50 overflow-hidden cursor-pointer bg-gray-900/80 backdrop-blur-sm">
                  <CardContent className="p-5">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3 text-xs font-code text-gray-500 flex-wrap">
                          <span className="text-xl">{log.icon}</span>
                          <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-red-400" />{log.date}</div>
                          <div className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-red-400" />2 min read</div>
                        </div>
                        <h2 className="font-headline font-bold text-lg md:text-xl group-hover:text-red-500 transition-colors text-white">
                          {log.title}
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">{log.description}</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {log.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-[10px] uppercase font-bold tracking-wider px-2 cursor-pointer hover:bg-red-500/20 transition-colors bg-red-500/10 text-red-400" onClick={(e) => { e.preventDefault(); setSelectedTag(tag); }}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-red-500/5 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="max-w-4xl mx-auto mt-8 flex justify-center items-center gap-2">
          <button onClick={() => goToPage(1)} disabled={currentPage === 1} className="p-2 rounded-lg border border-gray-800 hover:border-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronsLeft className="w-4 h-4" /></button>
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-lg border border-gray-800 hover:border-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronLeft className="w-4 h-4" /></button>
          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) pageNum = i + 1;
              else if (currentPage <= 3) pageNum = i + 1;
              else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
              else pageNum = currentPage - 2 + i;
              return (
                <button key={pageNum} onClick={() => goToPage(pageNum)} className={`w-10 h-10 rounded-lg border transition-colors ${currentPage === pageNum ? 'bg-red-500 text-white border-red-500' : 'border-gray-800 hover:border-red-500/50'}`}>
                  {pageNum}
                </button>
              );
            })}
          </div>
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-gray-800 hover:border-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronRight className="w-4 h-4" /></button>
          <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-gray-800 hover:border-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"><ChevronsRight className="w-4 h-4" /></button>
        </div>
      )}

      {/* My OJT Journey Section */}
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-red-500 font-bold tracking-widest text-xs uppercase">
              <Rocket className="w-4 h-4" />
              <span>MY OJT JOURNEY</span>
            </div>
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              <Award className="w-3 h-3 mr-1" />
              NCII CSS Certified
            </Badge>
          </div>
          <button
            onClick={() => setShowOjtJourney(!showOjtJourney)}
            className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {showOjtJourney ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </button>
        </div>

        {showOjtJourney && (
          <div className="space-y-4">
            <div className="flex justify-end items-center gap-2">
              <button 
                onClick={toggleOjtAutoPlay} 
                className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-800 transition-colors"
                title={ojtIsAutoPlaying ? "Pause Auto-Slide" : "Play Auto-Slide"}
              >
                {ojtIsAutoPlaying ? <Pause className="w-3.5 h-3.5 text-gray-400" /> : <Play className="w-3.5 h-3.5 text-gray-400" />}
              </button>
              <button 
                onClick={handleOjtPrev} 
                className="p-2 rounded-full bg-red-500/10 hover:bg-red-500/20 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-red-500" />
              </button>
              <button 
                onClick={handleOjtNext} 
                className="p-2 rounded-full bg-red-500/10 hover:bg-red-500/20 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-red-500" />
              </button>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-l from-black via-black/80 to-transparent"></div>
              
              <div 
                ref={ojtScrollRef} 
                className="flex gap-5 overflow-x-auto scroll-smooth pb-4 hide-scrollbar" 
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {ojtTimeline.map((event, index) => (
                  <div key={index} className="relative flex-shrink-0 w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] group">
                    <div className={`relative h-full bg-gray-900/80 backdrop-blur-sm rounded-xl border overflow-hidden hover:shadow-xl transition-all duration-300 ${
                      event.title.includes("PASSED") 
                        ? 'border-yellow-500/40 hover:border-yellow-500/60' 
                        : 'border-gray-800 hover:border-red-500/40'
                    }`}>
                      <div className={`px-4 py-2 border-b ${
                        event.title.includes("PASSED") 
                          ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/20' 
                          : 'bg-red-500/5 border-gray-800'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-bold ${
                            event.title.includes("PASSED") ? 'text-yellow-500' : 'text-red-500'
                          }`}>
                            {event.date}
                          </span>
                          <span className="text-lg">{event.icon}</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className={`font-headline font-bold text-sm md:text-base mb-2 line-clamp-2 ${
                          event.title.includes("PASSED") ? 'text-yellow-500' : 'text-white'
                        }`}>
                          {event.title}
                        </h3>
                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-3">
                          {event.description}
                        </p>
                      </div>
                      <div className="px-4 pb-3">
                        <Badge variant="secondary" className="text-[9px] bg-gray-800/50 text-gray-500">
                          {event.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: Math.ceil(ojtTimeline.length / ojtVisibleCards) }).map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => { 
                    setOjtIsAutoPlaying(false); 
                    setOjtCurrentIndex(i * ojtVisibleCards); 
                    setTimeout(() => setOjtIsAutoPlaying(true), 5000); 
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    Math.floor(ojtCurrentIndex / ojtVisibleCards) === i 
                      ? 'w-6 bg-red-500' 
                      : 'w-1.5 bg-red-500/30 hover:bg-red-500/50'
                  }`} 
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-top {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-in { animation: slide-in 0.3s ease-out; }
        .slide-in-from-top-2 { animation: slide-in-top 0.3s ease-out; }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
        @media (min-width: 640px) {
          .animate-slide-up { animation: none; }
        }
      `}</style>
    </div>
  );
}

// ActivityLog interface
interface ActivityLog {
  id: number;
  slug: string;
  date: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  icon: string;
}