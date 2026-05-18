"use client";

import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { AISummaryTool } from '@/components/portfolio/ai-summary-tool';
import { ArrowLeft, Calendar, User, Clock, BookOpen, ThumbsUp, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, use } from 'react';

// ALL 51 HARDCODED ACTIVITY LOGS
const HARCODED_LOGS = [
  {
    "id": 1778919458900,
    "slug": "flowstate-13",
    "date": "May 14, 2026",
    "title": "Flowstate",
    "description": "Today’s work focused on improving Flowstate’s sprint planning, priority tracking, AI recommendations, and team synchronization features to support better productivity and workflow management.",
    "content": "*Priority Tasks View\\n  -Added a “View Priority Tasks” button in the My Tasks tab to display a REGULAR TASKS – BY PRIORITY table with filtering options for Today, This Week, and This Month.\\n\\n*Blocker Priority Monitoring\\n  -Added a “Blocker Priority” button in the Live Blockers tab to display a BLOCKERS PRIORITY table with filtering options based on workstream and deadline.\\n\\n*Sprint Planner Improvements\\n  -Enhanced the Sprint Planner tab with workload balancing and urgency-based task ordering to help optimize team capacity and sprint execution.\\n\\n*Google Gemini AI Integration\\n  -Successfully integrated Google Gemini AI into the Sprint Planner tab to generate intelligent workload balancing suggestions and blocker resolution recommendations.\\n\\n*Sidebar Team Synchronization Fix\\n  -Fixed sidebar synchronization issues to ensure proper team switching updates across both the AI Insights and Team Activity pages.",
    "tags": ["next.js"],
    "icon": "📝"
  },
  {
    "id": 1778919279501,
    "slug": "flowsate",
    "date": "May 13, 2026",
    "title": "Flowsate",
    "description": "Today’s work focused on improving Flowstate’s sidebar interaction system, tooltip usability, and modal behavior to create a smoother and more consistent user experience.",
    "content": "*Workspace Hover Interaction\\n  -Added hover interaction on the team/workspace icon in collapsed sidebar mode, displaying a tooltip with “Switch Workspace” and “Select a team to continue” before opening the dropdown.\\n\\n*Navigation Icon Tooltips\\n  -Implemented hover tooltips for navigation icons in collapsed mode, showing labels such as “(icon Dashboard)” without affecting sidebar width or layout structure.\\n\\n*Centered Modal Fixes\\n  -Fixed the Create Team and Join Team modals to remain perfectly centered using portal rendering, ensuring they are not affected by sidebar hover, collapse, or expanded states.",
    "tags": ["next.js"],
    "icon": "📝"
  },
  {
    "id": 1778919136782,
    "slug": "flowstate-12",
    "date": "May 12, 2026",
    "title": "Flowstate",
    "description": "Today’s work focused on improving Flowstate’s sidebar navigation, profile management, and settings functionality to create a more responsive and user-friendly interface.",
    "content": "*Interactive Sidebar Toggle\\n  -Built a clickable FlowState logo that toggles the sidebar width from 64px to 256px with smooth transitions while always displaying the full FlowState brand name.\\n\\n*Enhanced Navigation UI\\n  -Organized menu items with hover tooltips, active state indicators (blue background with right-side bar), and responsive icon/text alignment for both collapsed and expanded sidebar states.\\n\\n*Profile Management System\\n  -Developed a full Settings profile management feature including photo uploads, resume uploads, role and skill editing, and password validation functionality.\\n\\n*Shift Scheduling Feature\\n  -Added editable shift scheduling in Settings with a time picker, live end-time and break preview, plus database persistence for saving schedule configurations.",
    "tags": ["next.js"],
    "icon": "📝"
  },
  {
    "id": 1778918900406,
    "slug": "flowstate-11",
    "date": "May 11, 2026",
    "title": "Flowstate",
    "description": "Today’s work focused on improving Flowstate’s authentication system, password security, and validation workflow to provide safer and more reliable user account management.",
    "content": "*Security Tab Password Change\\n  -Added password change functionality in the Security Tab with 3 validation rules: minimum 8 characters, uppercase letter requirement, and special character requirement. Also included real-time checkbox indicators and current password verification before updating.\\n\\n*Secure Signup System\\n  -Built a secure signup process with a real-time password strength meter, validation for 8 characters, uppercase letters, special characters, email “@” checking, progress bar feedback, and checkbox requirement indicators.\\n\\n*Server-Side Validation & Password Protection\\n  -Implemented server-side validation matching frontend rules, added bcrypt password hashing, and blocked duplicate email registrations for secure credential storage.\\n\\n*Secure Login Backend\\n  -Developed the login backend with email lookup, bcrypt password comparison, secure error handling, and proper user data return for session management.",
    "tags": ["next.js"],
    "icon": "📝"
  },
  {
    "id": 1778918602862,
    "slug": "flowstate-10",
    "date": "May 9, 2026",
    "title": "Flowstate",
    "description": "Today’s work focused on improving Flowstate’s real-time synchronization, admin controls, and interface consistency to enhance collaboration and usability.",
    "content": "*Workstream Rename Functionality\\n   -Added functionality to rename workstreams with real-time database updates and instant sidebar synchronization using Socket.IO.\\n\\n*Team Rename Feature (Admin Only)\\n  -Implemented functionality allowing admins to rename teams directly from the Settings tab, with live updates reflected across the sidebar and header.\\n\\n*Real-Time Socket Events\\n  -Added real-time socket events so all team and workstream name changes instantly appear for all members without requiring a page refresh.\\n\\n*Reaction Tooltip UI Cleanup\\n-Updated the reaction tooltip with a white theme, removed the close button, and hid scrollbars for a cleaner and more modern interface.\\n\\n*Custom FlowState Branding\\n  -Replaced all placeholder logos with the official FlowState logo across the navbar, sidebar, and footer for consistent branding.\\n\\n*Sidebar Hover Edit Controls\\n  -Implemented a hover-triggered pencil icon on sidebar workstreams, allowing admins to quickly edit workstream names and members.\\n\\n*Rename Field Validation\\n  -Added a 50-character limit with a live character counter in the rename field to improve input control and user feedback.",
    "tags": ["next.js"],
    "icon": "📝"
  },
  {
    "id": 1778918119455,
    "slug": "flowstate-9",
    "date": "May 8, 2026",
    "title": "Flowstate",
    "description": "Today’s work focused on improving Flowstate’s real-time activity tracking and landing page user experience to ensure accurate updates and smoother navigation.",
    "content": "*Blocker Count Synchronization Fix\\n  -Resolved the blocker count synchronization issue in Team Activity, ensuring accurate real-time updates whenever blockers are marked as “Resolved.”\\n\\n*Landing Page Redesign\\n  -Redesigned the landing page with interactive FAQ dropdowns, smoother navigation flow, and a more consistent design system applied across all sections for improved usability and visual consistency.",
    "tags": ["next.js"],
    "icon": "📝"
  },
  {
    "id": 1778746756780,
    "slug": "tesda-nc-ii-assessment-exam-completion-passed",
    "date": "May 6, 2026",
    "title": "TESDA NC II Assessment / Exam Completion Passed",
    "description": "A training and assessment activity for TESDA NC II, focusing on evaluating technical skills, practical knowledge, and competency based on industry standards. This includes preparation, hands-on practice, and completion of the required assessment to demonstrate qualification readiness.",
    "content": "*Assessment Preparation\\n  -Reviewed required competencies and prepared for the NC II assessment by revising key technical skills and practical procedures.\\n\\n*Skills Evaluation Readiness\\n  -Practiced hands-on tasks to ensure readiness for the exam, focusing on accuracy, efficiency, and proper workflow execution.\\n\\n*Understanding Exam Requirements\\n  -Gained full understanding of TESDA NC II assessment standards, including performance criteria, tools, and expected outputs.\\n\\n*NC II Passed\\n  -Successfully passed the TESDA NC II assessment, demonstrating competency in required technical skills and meeting certification standards.",
    "tags": ["NCII CERTIFIED"],
    "icon": "🏅"
  },
  {
    "id": 1778746615204,
    "slug": "nc-ii-training-progress-april-21-may-5-2026",
    "date": "April 21, 2026",
    "title": "NC II Training – Progress April 21 - May 5 2026",
    "description": "A training progress update for NC II, focusing on developing practical skills, improving technical knowledge, and completing hands-on training activities required for certification and competency building.",
    "content": "*Training Participation (NC II)\\n  -Actively participated in NC II training sessions and practical activities to strengthen core technical skills.\\n\\n*Hands-on Learning Tasks\\n   -Completed guided exercises and applied learned concepts in real training scenarios to improve competency.\\n\\n*Skill Development Progress\\n  -Improved understanding of required NC II competencies through continuous practice and supervised training activities.",
    "tags": ["NCII"],
    "icon": "📖"
  },
  {
    "id": 1778746306164,
    "slug": "flowstate-8",
    "date": "May 2, 2026",
    "title": "Flowstate",
    "description": "A system update focused on improving account settings, assignee management, API request handling, and resume viewer functionality to enhance usability and overall user experience.",
    "content": "*Account Management Dropdowns\\n   -Added expandable dropdowns for Delete Account with a Yes/No confirmation modal and Change Password with secure password input fields for better user interaction and safety.\\n\\n*Assignee & Profile Improvements\\n   -Profile photos now appear in the assignee dropdown for easier user identification. Implemented role-based permissions where only admins can change assignees, while members have view-only access.\\n\\n*API Request Fix\\n   -Updated the API request structure from body: { id } to ?userId=${userId} as a query parameter, successfully fixing user deletion and ensuring proper database removal.\\n\\n*Resume Viewer Enhancement\\n   -Adjusted the resume viewer layout to properly fit and display the entire document without requiring scrolling, improving readability and viewing experience.",
    "tags": ["next.js"],
    "icon": "📝"
  },
  {
    "id": 1778669986407,
    "slug": "flowstate-7",
    "date": "April 20, 2026",
    "title": "Flowstate",
    "description": "Today’s work focused on enhancing the Flowstate system UI structure and AI Insights dashboard features to improve usability and data navigation.",
    "content": "*Floating Action Button (FAB) Control\\n  -Updated the Floating Action Button so it only appears on the Dashboard page, ensuring cleaner UI behavior and preventing unnecessary display on other pages.\\n\\n*Blockers UI Design\\n  -Started designing the UI for the Blockers system, focusing on a structured layout for reporting, tracking, and managing blockers more efficiently.\\n\\n*No Team Message (Global UI Update)\\n  -Added a “No Team” message across all pages when a user has not joined or selected a team, improving clarity and guiding user actions.",
    "tags": ["next.js"],
    "icon": "📝"
  },
  {
    "id": 1778669769792,
    "slug": "flowstate-6",
    "date": "April 17, 2026",
    "title": "Flowstate",
    "description": "Today’s work focused on enhancing the Flowstate system UI structure and AI Insights dashboard features to improve usability and data navigation.",
    "content": "*Direct Team Switching (Sidebar Dropdown)\\n  -Enabled users to switch teams directly from the sidebar dropdown, removing the need for a separate team selection page and making navigation faster and more seamless.\\n\\n*Dynamic Team Feed Update\\n  -Implemented real-time updates so the team feed automatically changes when a different team is selected in the sidebar.\\n\\n*Invite Code Display in Chat Header\\n  -Added the team invite code in the chat header with a copy button for easy sharing and access.\\n\\n*Admin Team Deletion\\n  -Allowed admins to delete a team, fully removing it from the database and sidebar to ensure proper cleanup.\\n\\n*Member Leave Team Feature\\n-Enabled members to leave a team, removing them from both the database and sidebar view for accurate membership tracking.",
    "tags": ["next.js"],
    "icon": "📝"
  },
  {
    "id": 1778669479233,
    "slug": "flowstate-5",
    "date": "April 16, 2026",
    "title": "Flowstate",
    "description": "Today’s work focused on enhancing the Flowstate system UI structure and AI Insights dashboard features to improve usability and data navigation.",
    "content": "*Bug Fixes\\n-Fixed an issue in the settings page where the user name was not updating correctly, ensuring proper real-time display across the system.\\n\\n*Team Selection Page\\n-Created a page where users can select a team to join. Each team is shown as a card with team name, code, member count, copy button, and open button.\\n\\n*Team Feed Tab System\\n-Built a structured team workspace with 4 tabs (Chat, Members, Activity, Settings) for easier team management.\\n\\n*Members Tab\\n-Displays all team members with role badges: purple = Admin, blue = Member, improving role clarity.\\n\\n*Activity Tab\\n-Shows team activity logs and allows users to view detailed history per member using “View Activity”.\\n\\n*Settings Tab\\n-Added team controls including Leave Group (all members) and Delete Team (admin only).\\n\\n*Chat Tab\\n-Implemented real-time messaging where members can send and read messages with timestamps and sender info.",
    "tags": ["next", "js"],
    "icon": "📝"
  },
  {
    "id": 1778669164368,
    "slug": "flowstate-4",
    "date": "April 15, 2026",
    "title": "Flowstate",
    "description": "Today’s work focused on enhancing the Flowstate system UI structure and AI Insights dashboard features to improve usability and data navigation.",
    "content": " *First Name & Last Name Update (Real-Time Sync)\\n   -Implemented working functionality for updating first and last name, with changes reflected in both the database and localStorage in real-time.\\n\\n*Email Change Feature (With Validation)\\n  -Enabled secure email updating with duplicate email checking to prevent conflicts and ensure data integrity.\\n\\n*Password Change Feature (Secure Verification)\\n  -Added secure password update functionality requiring current password verification before allowing changes.\\n\\n*Delete Account Feature (Full Implementation)\\n  -Built a complete account deletion system with a confirmation modal that removes the user and all related data from the database, then redirects to the signup page.",
    "tags": ["next.js"],
    "icon": "📝"
  },
  {
    "id": 1778668208441,
    "slug": "flowstate-3",
    "date": "April 14, 2026",
    "title": "Flowstate",
    "description": "This update focuses on improving the Flowstate system UI structure, especially the Settings page and AI Analytics navigation flow, to make user configuration and data access more organized and intuitive.",
    "content": " *Settings Page UI Setup\\n   -Created the initial layout for the Settings page with organized tabs:\\n-Profile\\n-Security\\n-Preferences\\n   -Added core features such as dark mode support and password change functionality to improve user control and personalization.\\n\\n*Team Selection Page\\n  -Built a dedicated page that allows users to select a team before accessing analytics, ensuring that AI insights are properly grouped and relevant per team.\\n\\n*AI Analytics Navigation Button\\n   -Added a “View AI Analytics” button that redirects users from the team selection page directly to the AI Insight page, improving navigation flow and user experience.",
    "tags": ["next", "js"],
    "icon": "📝"
  },
  {
    "id": 1778667986058,
    "slug": "flowstate-2",
    "date": "April 13, 2026",
    "title": "Flowstate",
    "description": "Today’s work focused on enhancing the Flowstate system UI structure and AI Insights dashboard features to improve usability and data navigation.",
    "content": "*Focus Area: Flowstate\\n\\n*AI Insight UI Setup\\n  -Set up the initial user interface for the AI Insight section, laying the foundation for displaying analytics and AI-generated summaries.\\n\\n*Custom Date Range Filter\\n  -Added flexible date filtering options including 7 Days, 30 Days, 90 Days, and Custom Range, allowing users to adjust data views based on time selection.\\n\\n*Dashboard Tabs Implementation\\n  -Added structured navigation tabs for better organization of insights, including:\\n-AI Digest\\n-Risk Monitor\\n-Sprint Planner\\n-Security",
    "tags": ["next.js"],
    "icon": "📝"
  },
  {
    "id": 1778667749106,
    "slug": "flowstate-1",
    "date": "April 10, 2026",
    "title": "Flowstate",
    "description": "Today’s work focused on improving the Flowstate system UI/UX design and initial page structure development to establish a clean and functional interface.",
    "content": "*Focus Area: Flowstate\\n\\n*Layout UI/UX Design\\n  -Helped create the overall layout and UI/UX design for Flowstate, focusing on improving structure, usability, and visual consistency across the system.\\n\\n*My Tasks Page Setup\\n  -Set up the initial user interface for the My Tasks page, establishing the base layout where users can view and manage their assigned tasks.",
    "tags": ["NEXT.JS"],
    "icon": "📝"
  },
  {
    "id": 1778667214610,
    "slug": "flowstate",
    "date": "May 12, 2026",
    "title": "Flowstate",
    "description": "Today’s work focused on setting up the project environment and successfully integrating the backend database for the web application.",
    "content": "*Project Setup Completed\\n  -Successfully cloned the repository, installed all required dependencies, configured environment variables, and successfully ran the project locally.\\n\\n*MongoDB Atlas Integration\\n  -Connected the web application to MongoDB Atlas, ensuring a stable cloud database connection for the system.\\n\\n*Data Storage Implementation\\n  -Successfully stored user data in the MongoDB database, confirming that the backend and database integration are working properly.",
    "tags": ["MONGODB", "GITHUB"],
    "icon": "📝"
  },
  {
    "id": 1778666912843,
    "slug": "one-page-pitch-creation",
    "date": "April 6, 2026",
    "title": "One-Page Pitch Creation",
    "description": "Today’s work focused on planning and presenting a simple digital solution idea to improve operational efficiency.",
    "content": "A planning and documentation activity that focuses on creating a one-page pitch for a digital solution designed to enhance daily operations by improving efficiency, workflow organization, and overall productivity.\\n\\n\\n*One-Page Pitch Creation\\n  -Created a concise one-page pitch for a digital solution aimed at improving daily operations. The pitch outlines the main problem, proposed solution, and expected benefits, presenting the idea in a clear and structured way for easy understanding and evaluation.",
    "tags": ["DOCUMENT"],
    "icon": "📝"
  },
  {
    "id": 1778666587219,
    "slug": "created-a-design-template-for-the-2026-chevrolet-silverado-1500-vs-2026-toyota-tundra-comparison-page",
    "date": "March 27, 2026",
    "title": "Created a design template for the 2026 Chevrolet Silverado 1500 vs. 2026 Toyota Tundra comparison page.",
    "description": "Today’s work focused on designing a structured layout for a vehicle comparison page to support consistent and organized content presentation.",
    "content": "A design progress report highlighting the creation of a structured template for a vehicle comparison page, specifically for the 2026 Chevrolet Silverado 1500 and 2026 Toyota Tundra, aimed at improving content clarity, consistency, and visual organization.\\n\\n*Comparison Page Design Template\\n  -Created a design template for the 2026 Chevrolet Silverado 1500 vs. 2026 Toyota Tundra comparison page, focusing on a clean structure that clearly presents key specifications, features, and differences between the two vehicles for easy user understanding.",
    "tags": ["HTML", "CSS"],
    "icon": "🎨"
  },
  {
    "id": 1778666081339,
    "slug": "page-creation",
    "date": "March 26, 2026",
    "title": "Page Creation",
    "description": "Today’s work focused on reviewing system guidelines and beginning the setup process for structured page creation.",
    "content": "*SOP Review – Page Creation Phases\\n  -Reviewed the Standard Operating Procedure (SOP) for page creation phases to ensure proper understanding of the workflow, structure, and required steps before implementing new pages.\\n\\n*Page Template Setup\\n  -Started setting up the initial page template to establish a consistent structure for future pages, ensuring uniform design and easier content management across the system.",
    "tags": ["CSS", "HTML"],
    "icon": "📝"
  },
  {
    "id": 1778665826363,
    "slug": "syncsnap-13",
    "date": "March 25, 2026",
    "title": "SyncSnap",
    "description": "Today’s work focused on improving the SyncSnap system’s notification handling, role-based security, and AI report interface design to enhance usability, responsiveness, and access control.",
    "content": "*Focus Area: SyncSnap\\n\\n*Notification System Improvement (“Mark All Read”)\\n  -Fixed the “Mark All Read” functionality in notifications and improved user experience by adding immediate UI updates and loading states, ensuring real-time feedback and smoother interaction.\\n\\n*Role-Based Access Control for Reports\\n  -Implemented proper access restrictions for reports based on user roles. Members now see a “Reports Access Restricted” message with a lock icon, while Admins have full access to view and generate reports, improving system security and clarity.\\n\\n*AI Report UI Design\\n  -Developed the initial design structure for the AI-generated report interface, establishing a clean and organized layout for future enhancements and better report visualization.",
    "tags": ["Laravel", "React"],
    "icon": "📝"
  },
  {
    "id": 1778665724316,
    "slug": "syncsnap-12",
    "date": "March 24, 2026",
    "title": "SyncSnap",
    "description": "Today’s work focused on improving the SyncSnap system’s reporting, AI reliability, permissions, and UI/UX enhancements to create a more stable and user-friendly experience.",
    "content": "*Focus Area: SyncSnap\\n\\n*Member Report Feature\\n  -Built a clean and structured Member Report view that shows team performance, activity trends, and blocker impact analysis, helping teams better understand progress and issues.\\n\\n*Multi-Provider AI System\\n  -Configured a multi-provider AI setup using OpenRouter as a backup system to improve reliability and ensure continuous AI report generation even if the primary provider fails.\\n\\n*Permission Fixes & UI Polish\\n  -Fixed member access issues for notification details, resolved CSRF token errors, and improved the user interface by adding a collapsible sidebar with orange hover effects for better navigation and visual feedback.",
    "tags": ["Laravel", "React"],
    "icon": "📝"
  },
  {
    "id": 1778665483540,
    "slug": "base-platform-furfund",
    "date": "March 19, 2026",
    "title": "Base Platform & FurFund",
    "description": "Today’s work focused on learning new platforms and starting the development of a new project prototype.",
    "content": "*Focus Area: Base Platform & FurFund\\n\\n*Base Platform Learning & Setup\\n  -Learned the basics of the Base platform and successfully set up accounts on both the Base App and Vercel, preparing the environment for future blockchain and deployment development.\\n\\n*FurFund Prototype Development\\n  -Built the initial prototype of FurFund, establishing the first version of the project structure and laying the foundation for future features and enhancements.",
    "tags": ["Base Platform"],
    "icon": "📝"
  },
  {
    "id": 1778665145612,
    "slug": "syncsnap-11",
    "date": "March 16, 2026",
    "title": "SyncSnap",
    "description": "Today’s work focused on improving SyncSnap system usability and AI report rendering efficiency, making it easier for admins to navigate reports and ensuring cleaner AI output display.",
    "content": "*Focus Area: SyncSnap\\n\\n*Reports Search Feature\\n  -Implemented a workspace name search functionality in the Reports Index, allowing admins to quickly filter and locate specific workspaces, improving navigation and productivity.\\n\\n*Report Parsing Optimization\\n  -Improved the parseReportText function to simplify how AI-generated reports are displayed. Reports now appear exactly as generated and downloaded, eliminating duplicate formatting and improving consistency and readability.",
    "tags": ["Laravel", "React"],
    "icon": "📝"
  },
  {
    "id": 1778665042261,
    "slug": "syncsnap-10",
    "date": "March 17, 2026",
    "title": "SyncSnap",
    "description": "Today’s work focused on strengthening SyncSnap system security, access control, and notification accuracy to ensure proper data protection and correct user-specific information display.",
    "content": "*Focus Area: SyncSnap\\n\\n*IDOR Protection Implementation\\n  -Added strict ownership and membership validation across all major controllers including Notification, Workspace, BlockerStatus, and Report. This prevents unauthorized access to data and ensures users can only view and interact with resources they are allowed to access.\\n\\n*Admin & Member Report Separation\\n  -Updated the reports module to ensure that only admins/owners can see workspace reports, while regular members no longer have access to the Reports tab. This improves role-based access control and system clarity.\\n\\n*Notification Count Fix\\n  -Fixed incorrect admin notification counting by changing it from a global workspace count to a personal unread notification count. The display now correctly shows (3) instead of (13), matching the header notification logic.",
    "tags": ["Laravel", "React"],
    "icon": "📝"
  },
  {
    "id": 1778664817636,
    "slug": "syncsnap-9",
    "date": "March 16, 2026",
    "title": "SyncSnap",
    "description": "Today’s work focused on improving SyncSnap system stability, notification accuracy, and AI report generation integration to ensure smoother performance and reliable user experience.",
    "content": "*Focus Area: SyncSnap\\n\\n*CSRF Error Fix (Stats Endpoint)\\n  -Resolved 419 CSRF token errors occurring in the stats endpoint by improving token handling and request validation, ensuring secure and stable data fetching.\\n\\n*Enhanced Deadline Reminder Emails\\n  -Improved automated email reminders by adding working workspace links (localhost:8000), allowing users to directly access relevant workspace pages from reminder emails.\\n\\n*OpenAI GPT-3.5-turbo Integration\\n  -Successfully integrated and tested the OpenAI GPT-3.5-turbo model for AI report generation, enabling accurate and reliable AI-powered summaries within the system.",
    "tags": ["Laravel", "React", "AI Integrate"],
    "icon": "📝"
  },
  {
    "id": 1778664694381,
    "slug": "syncsnap-8",
    "date": "March 13, 2026",
    "title": "SyncSnap",
    "description": "Today’s work focused on improving the SyncSnap system’s AI report quality, visibility access, analytics filtering, and automated deadline reminders to enhance usability and real-time workflow support.",
    "content": "*Focus Area: SyncSnap\\n\\n*AI Reports Cleanup\\n  -Fixed duplicate paragraph issues in AI-generated reports. Reports now consistently display 4 clean, unique summaries without repeated headers, improving readability and structure.\\n\\n*Blocker Visibility Expansion\\n  -Updated the system to allow any team member to view all blockers, improving transparency and collaboration across the entire workspace.\\n\\n*Date Picker Enhancement\\n  -Added a popover date selector next to the AI report header, allowing users to switch between 7-day, 30-day, or custom date ranges. Statistics update instantly without affecting report generation logic.\\n\\n*Automated Deadline Reminders\\n  -Built a background system that runs every minute to check deadlines and send friendly email reminders 30 minutes before due time. The system is timezone-aware and prevents duplicate email spamming for the same deadline.",
    "tags": [],
    "icon": "📝"
  },
  {
    "id": 1778664394438,
    "slug": "syncsnap-7",
    "date": "March 12, 2026",
    "title": "SyncSnap",
    "description": "Today’s work focused on improving the SyncSnap system’s AI integration, reporting accuracy, and notification navigation reliability to ensure smoother and fully functional workflows.",
    "content": "*Focus Area: SyncSnap\\n\\n*OpenRouter API Fix\\n  -Fixed issues with the OpenRouter API by switching to openai/gpt-3.5-turbo, resolving previous 404 errors. The API is now stable and successfully returning 200 OK responses, ensuring reliable communication with the AI service.\\n\\n*AI Reports LIVE\\n  -Successfully activated live AI report generation in the Test AI workspace. The system now produces accurate 4-paragraph reports based on real standup data, improving reporting quality and automation.\\n\\n*Removed Fallback Errors\\n  -Eliminated the recurring “No summary available” fallback issue. The system now fully relies on AI-generated content, ensuring consistent and meaningful outputs without default placeholders.\\n\\n*Notification Navigation Fix\\n  -Fixed the notification “View Details” issue by updating handleNotificationClick to use latestNotificationId instead of blockerId, restoring proper navigation in the member dropdown and improving user interaction.",
    "tags": ["Laravel", "React"],
    "icon": "📝"
  },
  {
    "id": 1778664143374,
    "slug": "syncsnap-6",
    "date": "March 10, 2026",
    "title": "SyncSnap",
    "description": "Today’s work focused on improving SyncSnap system permissions, AI integration stability, and blocker status tracking to strengthen overall workflow management between Admin and Members.",
    "content": "*Focus Area: SyncSnap\\n\\n*Member/Admin Permissions\\n  -Added status update capabilities for designated members, allowing them to update blocker statuses alongside Admins based on assigned roles, improving collaboration and task accountability.\\n\\n*Gemini API Fix\\n-Fixed the Gemini API error, and confirmed that the API key is now working properly, successfully generating and processing blocker data from the system.\\n\\n*Status Tracking Improvements\\n -Improved blocker visibility and workflow handling by ensuring that all “Processing” status blockers are now visible, accessible, and actionable within the system.",
    "tags": ["Laravel", "React"],
    "icon": "📝"
  },
  {
    "id": 1778663665270,
    "slug": "syncsnap-5",
    "date": "March 8, 2026",
    "title": "SyncSnap",
    "description": "Today’s work focused on improving the SyncSnap AI reporting system and fixing critical backend errors to ensure stable and accurate report generation.",
    "content": "*Focus Area: SyncSnap\\n\\n*AI Reports Working\\n    -Successfully implemented AI-powered reports using Gemini, allowing the system to automatically generate structured blocker tables that include names, dates, and fixes. Additionally, fixed issues related to incorrect date display to ensure accurate reporting.\\n\\n*Server Error Fixes (500 Errors)\\n   -Resolved multiple server-side issues that were causing 500 internal errors, which previously broke the report generation process. This improved system stability and ensured reports are now generated smoothly without interruptions.",
    "tags": ["Laravel", "React", "AI Integrate"],
    "icon": "📝"
  },
  {
    "id": 1778663530718,
    "slug": "syncsnap-4",
    "date": "March 5, 2026",
    "title": "SyncSnap",
    "description": "Today’s work focused on improving the SyncSnap system, particularly in blocker management, email notifications, workspace organization, and usability enhancements.",
    "content": "*Focus Area: SyncSnap\\n\\n*Blocker Status Management\\n  -Implemented a structured blocker tracking system with three statuses: Pending, Processing, and Resolved, applicable for both Admin and Members to improve workflow tracking and transparency.\\n\\n*Email Notification System Fixes\\n  -Fixed issues in the email notification system to ensure that blocker alerts are properly and reliably sent to the Admin.\\nWorkspace Structure Improvement\\nImproved system organization by separating workspaces and properly grouping members under their respective workspaces for better management and clarity.\\n\\n*Admin Response Feature\\n  -Added a feature that allows Admins to respond directly to reported blockers, with automatic email notifications sent to the respective member for real-time communication.\\n*Workspace Search Function\\n  -Implemented a search bar that allows users to quickly find workspaces by title, improving navigation and overall system usability.",
    "tags": ["Laravel", "React"],
    "icon": "📝"
  },
  {
    "id": 1778663305326,
    "slug": "syncsnap-3",
    "date": "March 4, 2026",
    "title": "SyncSnap",
    "description": "Today’s work focused on improving the SyncSnap system UI, status management, and notification reliability to enhance usability and communication between users and administrators.",
    "content": "*Focus Area: SyncSnap\\n\\n-Workspace Cards\\n   -Built separate notification cards for each workspace with color-coded headers to improve visual organization and make it easier for users to distinguish different workspaces at a glance.\\n\\n-Status Controls\\n  -Added functional status badges including Pending, Processing, and Resolved, along with a three-dot menu for additional actions, improving task tracking and management flexibility.\\n\\n-Email Notifications\\n  -Resolved email-related errors and implemented proper admin-to-member threading, ensuring smoother and more reliable communication through the notification system.",
    "tags": ["Laravel", "React"],
    "icon": "📝"
  },
  {
    "id": 1778662925359,
    "slug": "syncsnap-2",
    "date": "May 2, 2026",
    "title": "SyncSnap",
    "description": "Today’s work focused on improving the SyncSnap system, particularly enhancing gamification features and user feedback mechanisms to improve engagement and system interaction.",
    "content": "* Focus Area: SyncSnap\\n\\n\\n-Gamification Features\\nImplemented daily engagement mechanics to encourage consistent user activity within the system:\\n  -Daily streaks to track continuous usage\\n  -Early bird bonuses (+10) for early task completion\\n  -Milestone rewards for achieving progress goals\\n  -Leaderboard rankings to display user performance and encourage healthy competition\\n\\n*System Feedback Enhancements\\n  Improved user experience through better notifications and validation messages:\\n  -Success toasts for earned bonuses and successful actions\\n  -Warning messages for duplicate submissions to prevent repeated entries",
    "tags": ["Laravel", "React"],
    "icon": "🎮"
  },
  {
    "id": 1778661786367,
    "slug": "syncsnap-1",
    "date": "March 1, 2026",
    "title": "SyncSnap",
    "description": "Today’s work focused on the ongoing development of the SyncSnap system, with improvements in workspace functionality, standup features, gamification, and database structure.",
    "content": " *Focus of Developing: SyncSnap\\n\\n -Workspace & Standup System\\n   -Developed and improved the workspace and standup system to support better team collaboration, task tracking, and daily progress updates within SyncSnap.\\n\\n-Gamification Features\\n   -Started implementing gamification elements to make the system more engaging, including features that can improve user motivation and productivity through rewards or progress-based interaction.\\n\\n-Database Setup\\n  -Created the required database tables for core functionalities to support system operations, data storage, and future feature expansion.",
    "tags": ["Laravel", "React"],
    "icon": "📝"
  },
  {
    "id": 1778661216417,
    "slug": "syncsnap",
    "date": "May 26, 2026",
    "title": "SyncSnap",
    "description": "Today’s work focused on research, planning, and system design exploration for the SyncSnap project to support its future development and architecture decisions.",
    "content": " *A planning and research-focused report for the SyncSnap project that covers technology evaluation, feature brainstorming, workflow design, and exploration of implementation strategies and tech stack options to guide future development.\\n\\n *Tool and Technology Research (SyncSnap Project)\\n-Researched and evaluated different tools, frameworks, and technologies that could be used for the SyncSnap project to ensure scalability, performance, and maintainability.\\n\\n*System Planning and Feature Brainstorming\\n  -Brainstormed potential features and defined the initial system workflow. Explored how users will interact with the system and how data will flow within the application.\\n\\n*Implementation Strategy and Tech Stack Exploration\\n -Identified possible implementation approaches, including backend and frontend integration methods, and evaluated different tech stack options to determine the most suitable setup for the project.",
    "tags": [],
    "icon": "📝"
  },
  {
    "id": 1778660776113,
    "slug": "research-based",
    "date": "February 25, 2026",
    "title": "Research-Based",
    "description": "Today’s work focused on quality assurance testing and system verification for the Sinag Villas Website to ensure stability and proper functionality.",
    "content": "   *A daily report covering quality assurance testing and script impact analysis for the Sinag Villas Website, focusing on verifying system stability and ensuring that scripts do not negatively affect website performance or functionality.\\n\\n  *QA Testing – Sinag Villas Website\\n-Performed quality assurance checks on the website to identify potential issues, verify features, and ensure smooth performance across different sections.\\n\\n*Script Impact Research\\n  -Conducted research to determine whether the existing script affects the website’s performance or behavior, ensuring that no conflicts or errors are introduced into the system.",
    "tags": ["Research"],
    "icon": "📝"
  },
  {
    "id": 1778660382665,
    "slug": "axiom-scrumban-5",
    "date": "May 24, 2026",
    "title": "Axiom Scrumban",
    "description": "Today’s work focused on system debugging, error resolution, and additional support tasks for production-related activities.",
    "content": "* Focus Area: Axiom Scrumban\\n\\n*System Error Fixes\\n -Resolved multiple critical issues affecting system stability and functionality, including:\\n\\n    -Fixed 404 errors on delete and archive actions\\n    -Solved PostgreSQL JSON query issues affecting data retrieval\\n    -Corrected route conflicts causing navigation problems\\n    -Fixed BOM encoding bugs affecting data display and file handling\\n    -Resolved ActivityLog null errors preventing proper logging\\n    -Addressed Vue warnings to improve frontend stability and performance",
    "tags": ["Laravel + vue"],
    "icon": "⚙️"
  },
  {
    "id": 1778660158033,
    "slug": "axiom-scrumban-4",
    "date": "February 22, 2026",
    "title": "Axiom Scrumban",
    "description": "Today’s work focused on improving system functionality and notification reliability in the Axiom Scrumban project.",
    "content": "* Focus Area: Axiom Scrumban\\n\\n*Permanent Project Deletion\\n -Implemented a feature that allows users to permanently delete projects, with a confirmation prompt to prevent accidental data loss and ensure safer actions.\\n\\n*Gmail SMTP Configuration\\n  -Configured Gmail SMTP to enable reliable email notifications for the system, ensuring users receive updates such as reminders, alerts, and important project activities in real time.",
    "tags": ["Laravel + vue"],
    "icon": "📧"
  },
  {
    "id": 1778659899985,
    "slug": "axiom-scrumban-3",
    "date": "February 19, 2026",
    "title": "Axiom Scrumban",
    "description": "Today’s work focused on improving and enhancing the Axiom Scrumban system, specifically in the areas of project organization and user interface improvements.",
    "content": "Project Archive System\\n-Implemented a feature that allows users to archive projects directly from notification cards, helping keep the workspace clean and organized while preserving important project records.\\n\\n-UI Components\\n  -Improved the user interface to enhance usability and visual clarity.\\n    -Added a responsive grid layout for better display across different screen sizes.\\n     -Designed color-coded notification cards to clearly distinguish different types of alerts such as reminders, due tasks, and overdue items.",
    "tags": ["Laravel + vue"],
    "icon": "🎨"
  },
  {
    "id": 1778659464290,
    "slug": "axiom-scrumban-2",
    "date": "February 18, 2026",
    "title": "Axiom Scrumban",
    "description": "Today’s work focused on improving and developing the Axiom Scrumban system, with a strong focus on enhancing the notification system to improve task tracking and deadline awareness.",
    "content": "Focus on Developing Axiom Scrumban\\n\\nThe main progress today was the implementation and improvement of the notification system, designed to keep users updated in real time about project activities and deadlines.\\n\\n-3-day reminders: Automated email and database notifications are triggered 3 days before a project deadline to help users prepare early.\\n\\n-Due today alerts: Urgent red warnings are displayed for projects that are due on the current day to ensure immediate attention.\\n-Overdue alerts: Critical red notifications are shown for projects that have already passed their deadline.\\n\\n-Project creation alerts: Instant in-app notifications are sent whenever a new project is created to keep users updated in real time.",
    "tags": ["Laravel + vue"],
    "icon": "🔔"
  },
  {
    "id": 1778659064531,
    "slug": "axiom-srumban",
    "date": "February 17, 2026",
    "title": "Axiom Srumban",
    "description": "A continuous development section for Axiom Scrumban that focuses on improving system features, designing workflow processes through flowcharts, and implementing a notification system for upcoming deadlines and overdue tasks to enhance task monitoring and productivity.",
    "content": "Axiom Scrumban – Continuous Development & Workflow Enhancement\\n\\nThis section focuses on the ongoing improvement and expansion of the Axiom Scrumban system. It includes enhancing existing features and refining the overall workflow to make task management more efficient and user-friendly. It also involves creating a clear flowchart to visually represent the system process, from task creation to task completion, to better understand how each part of the system connects and works together.\\n\\nIt also includes the notification system, which keeps users informed about important updates such as upcoming deadlines and overdue tasks. This helps improve task tracking, time management, and overall productivity within the system.",
    "tags": ["Laravel + vue"],
    "icon": "📊"
  },
  {
    "id": 1778658196619,
    "slug": "axiom-scrumban-1",
    "date": "February 16, 2026",
    "title": "Axiom Scrumban",
    "description": "- A complete documentation that covers system features, recommendations, and implementation strategies.\\n- It also includes the development of core pages such as authentication pages and landing pages for a project management system using Laravel, Elasticsearch, and WebSockets.",
    "content": "Project Management Document – Features and System Development\\n\\n-This document combines both system planning and development for a project management system using Laravel, Elasticsearch, and WebSockets. It explains the system features, recommendations, and implementation approach.\\n\\n-It also includes the development of core user pages needed for authentication and system access.",
    "tags": ["Laravel + vue"],
    "icon": "📄"
  },
  {
    "id": 1778657521755,
    "slug": "axiom-scrumban",
    "date": "February 15, 2026",
    "title": "Axiom Scrumban",
    "description": "A simple page for creating and managing structured content such as tasks, updates, and documentation within the Axiom Scrumban project.",
    "content": "Create a new page to add structured content for tasks, updates, or documentation in Axiom Scrumban. This page is designed to help the team organize project information in a clear and structured way, making it easier to track progress, manage tasks, and document important updates.",
    "tags": ["Laravel + vue"],
    "icon": "📝"
  },
  {
    "id": 1778656599037,
    "slug": "learning-laravel-plus-vue",
    "date": "February 5, 2026",
    "title": "Learning Laravel Plus Vue",
    "description": "Learning Progress: Learning Laravel Plus Vue",
    "content": "This learning progress is about exploring the fundamentals of Laravel and Vue.js to develop efficient and interactive web applications. It involves learning how to manage data, create responsive user interfaces, connect frontend and backend functions, and improve the overall user experience. By combining both technologies, developers can build scalable and modern systems used in real-world projects.",
    "tags": ["Laravel +vue"],
    "icon": "📚"
  },
  {
    "id": 1778655932302,
    "slug": "laravel-vue-integration",
    "date": "February 5, 2026",
    "title": "Laravel + Vue integration",
    "description": "Learning Progress: Learning Laravel Plus Vue",
    "content": "This learning progress focuses on learning how Laravel and Vue.js work together to create modern and interactive web applications. It helps improve both backend and frontend development skills by understanding server-side functions, database management, user interfaces, and real-time interactions. Through this process, learners gain experience in building responsive, user-friendly, and dynamic systems commonly used in modern web development.",
    "tags": ["Laravel + Vue integration"],
    "icon": "🔗"
  },
  {
    "id": 1778655157647,
    "slug": "reading-sui-modules-1-5",
    "date": "February 4, 2026",
    "title": "Reading Sui Modules 1 - 5",
    "description": "Reading Sui Modules",
    "content": "Module 1: Sui 101 – Introduction to Sui\\n\\nThis module introduces Sui as a fast and secure blockchain platform designed for developers, beginners, and people who are curious about cryptocurrency and Web3 technology.\\n\\nModule 2: Introduction to Move\\n\\nThis module explains the Move programming language, which is used in Sui to create secure smart contracts and manage digital assets safely.\\n\\nModule 3: Your First Smart Contract\\n\\nThis module teaches how to build and deploy a basic smart contract using Move while exploring Sui features, framework integration, and NFTs.\\n\\nModule 4: Let Us Build Your DApp\\n\\nThis module focuses on the process of creating a decentralized application (dApp), including front-end integration and wallet connectivity for users.\\n\\nModule 5: Enhancing User Experience and Other Integrations\\n\\nThis module discusses advanced Move features and integrations that help improve the performance, security, and overall user experience of dApps on Sui.",
    "tags": ["SUI"],
    "icon": "⛓️"
  }
];

export default function LogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const log = HARCODED_LOGS.find(log => log.slug === slug);

  // Function to render formatted content
  const renderFormattedContent = (content: string) => {
    if (!content) return null;
    
    const lines = content.split('\n');
    const sections: JSX.Element[] = [];
    let currentSection: JSX.Element[] = [];
    let isBulletList = false;
    let bulletItems: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.startsWith('## ')) {
        if (currentSection.length > 0) {
          sections.push(<div key={`section-${i}`} className="mb-6">{currentSection}</div>);
          currentSection = [];
        }
        sections.push(
          <div key={`header-${i}`} className="mb-4 mt-6 first:mt-0">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">{line.replace('## ', '')}</h2>
            </div>
          </div>
        );
        continue;
      }
      
      if (line.startsWith('### ')) {
        if (currentSection.length > 0) {
          sections.push(<div key={`section-${i}`} className="mb-6">{currentSection}</div>);
          currentSection = [];
        }
        sections.push(
          <div key={`subheader-${i}`} className="mb-3 mt-4">
            <h3 className="text-lg md:text-xl font-semibold text-foreground/90">{line.replace('### ', '')}</h3>
          </div>
        );
        continue;
      }
      
      if (line.trim().startsWith('- ')) {
        if (!isBulletList) {
          if (currentSection.length > 0) {
            sections.push(<div key={`section-${i}`} className="mb-6">{currentSection}</div>);
            currentSection = [];
          }
          isBulletList = true;
          bulletItems = [];
        }
        bulletItems.push(line.trim().replace('- ', ''));
        continue;
      } else if (isBulletList && line.trim() === '') {
        sections.push(
          <div key={`bullet-list-${i}`} className="mb-6 space-y-2">
            {bulletItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        );
        isBulletList = false;
        bulletItems = [];
        continue;
      } else if (isBulletList) {
        bulletItems.push(line.trim().replace('- ', ''));
        continue;
      }
      
      if (line.trim()) {
        currentSection.push(
          <p key={`paragraph-${i}`} className="text-foreground/80 leading-relaxed mb-4">
            {line}
          </p>
        );
      } else if (currentSection.length > 0) {
        sections.push(<div key={`section-end-${i}`} className="mb-6">{currentSection}</div>);
        currentSection = [];
      }
    }
    
    if (currentSection.length > 0) {
      sections.push(<div key="section-final" className="mb-6">{currentSection}</div>);
    }
    
    if (isBulletList && bulletItems.length > 0) {
      sections.push(
        <div key="bullet-list-final" className="mb-6 space-y-2">
          {bulletItems.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
              <span className="text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      );
    }
    
    return sections;
  };

  if (!log) {
    notFound();
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-red-500/5 to-red-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-2 h-2 bg-red-500/30 rounded-full animate-float" />
        <div className="absolute top-[30%] right-[10%] w-3 h-3 bg-red-600/30 rounded-full animate-float-delay" />
        <div className="absolute bottom-[20%] left-[15%] w-2 h-2 bg-red-500/20 rounded-full animate-float-slow" />
        <div className="absolute bottom-[40%] right-[20%] w-1.5 h-1.5 bg-red-600/25 rounded-full animate-float" />
        <div className="absolute top-[60%] left-[80%] w-2.5 h-2.5 bg-red-500/15 rounded-full animate-float-delay" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in-up">
            <Button variant="ghost" asChild className="p-0 hover:bg-transparent text-muted-foreground hover:text-red-500 group">
              <Link href="/logs" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="text-sm font-medium">Back to All Logs</span>
              </Link>
            </Button>
          </div>

          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-red-500/20 overflow-hidden shadow-2xl animate-fade-in-up animation-delay-200">
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-red-600/5 to-transparent" />
              <div className="relative p-6 md:p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {log.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1 text-xs font-medium bg-red-500/10 hover:bg-red-500/20 transition-colors text-red-400">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="font-headline font-black text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {log.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-red-400" />
                    <span>{log.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-red-400" />
                    <span>Renzcell Rick Loresco</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-400" />
                    <span>5 min read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-red-400" />
                    <span>Activity Log</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 pt-0">
              <div className="mb-8 animate-slide-up animation-delay-300">
                <AISummaryTool content={log.content} />
              </div>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-800"></div></div>
                <div className="relative flex justify-center"><span className="bg-gray-900 px-4 text-xs text-muted-foreground">DETAILED LOG</span></div>
              </div>

              <article className="prose prose-lg max-w-none prose-invert animate-fade-in animation-delay-400">
                {renderFormattedContent(log.content)}
              </article>
            </div>

            <div className="border-t border-gray-800 p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsLiked(!isLiked)} className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${isLiked ? 'bg-red-500/20 text-red-500' : 'hover:bg-red-500/10 text-muted-foreground'}`}><ThumbsUp className="w-4 h-4" /></button>
                  <button onClick={() => setIsBookmarked(!isBookmarked)} className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${isBookmarked ? 'bg-red-500/20 text-red-500' : 'hover:bg-red-500/10 text-muted-foreground'}`}><Bookmark className="w-4 h-4" /></button>
                  <button className="p-2 rounded-full hover:bg-red-500/10 transition-all duration-300 hover:scale-110 group"><Share2 className="w-4 h-4 text-muted-foreground group-hover:text-red-500 transition-colors" /></button>
                </div>
                <div className="text-xs text-muted-foreground">Last updated: {log.date}</div>
              </div>
            </div>
          </div>

          <div className="mt-12 animate-fade-in-up animation-delay-500">
            <div className="bg-gradient-to-br from-red-500/10 via-red-600/5 to-transparent rounded-2xl p-8 border border-red-500/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <h4 className="font-bold text-lg flex items-center gap-2 justify-center md:justify-start"><span className="text-2xl">📖</span>Thanks for reading!</h4>
                  <p className="text-muted-foreground text-sm">Check out more of my daily activity logs and internship journey.</p>
                </div>
                <Button asChild className="rounded-full h-12 px-8 font-bold bg-gradient-to-r from-red-600 to-red-500 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <Link href="/logs">Explore More Logs<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-15px) translateX(5px); }
          75% { transform: translateY(10px) translateX(-5px); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-float { animation: float 7s ease-in-out infinite; }
        .animate-float-delay { animation: float-delay 9s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 11s ease-in-out infinite; }
        .animation-delay-200 { animation-delay: 0.2s; opacity: 0; animation-fill-mode: forwards; }
        .animation-delay-300 { animation-delay: 0.3s; opacity: 0; animation-fill-mode: forwards; }
        .animation-delay-400 { animation-delay: 0.4s; opacity: 0; animation-fill-mode: forwards; }
        .animation-delay-500 { animation-delay: 0.5s; opacity: 0; animation-fill-mode: forwards; }
      `}</style>
    </div>
  );
}