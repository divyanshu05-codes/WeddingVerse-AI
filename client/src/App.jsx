import { Routes, Route } from "react-router-dom";
import LoginForm from "./features/auth/components/LoginForm";
import RegisterForm from "./features/auth/components/RegisterForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./features/dashboard/pages/Dashboard";
import WeddingDashboard from "./features/wedding/pages/WeddingDashboard";
import CreateWedding from "./features/wedding/pages/CreateWedding";
import WeddingDetails from "./features/wedding/pages/WeddingDetails";
import EditWedding from "./features/wedding/pages/EditWedding";
import GuestDashboard from "./features/guest/pages/GuestDashboard";
import CreateGuest from "./features/guest/pages/CreateGuest";
import GuestDetails from "./features/guest/pages/GuestDetails";
import EditGuest from "./features/guest/pages/EditGuest";
import VendorDashboard from "./features/vendor/pages/VendorDashboard";
import CreateVendor from "./features/vendor/pages/CreateVendor";
import VendorDetails from "./features/vendor/pages/VendorDetails";
import EditVendor from "./features/vendor/pages/EditVendor";
import BudgetDashboard from "./features/budget/pages/BudgetDashboard";
import CreateExpense from "./features/budget/pages/CreateExpense";
import ExpenseDetails from "./features/budget/pages/ExpenseDetails";
import EditExpense from "./features/budget/pages/EditExpense";
import TaskDashboard from "./features/task/pages/TaskDashboard";
import CreateTask from "./features/task/pages/CreateTask";
import EditTask from "./features/task/pages/EditTask";
import WeddingPlannerAI from "./features/ai/pages/WeddingPlannerAI";
import WeddingPlanResult from "./features/ai/pages/WeddingPlanResult";
import WeddingTimelineAdvisor from "./features/ai/pages/WeddingTimelineAdvisor";
import GuestAnalyzer from "./features/ai/pages/GuestAnalyzer";
import InvitationGenerator from "./features/ai/pages/InvitationGenerator";
import VendorAssistant from "./features/ai/pages/VendorAssistant";
import WeddingChatbot from "./features/ai/pages/WeddingChatbot";
import AIInsightsDashboard from "./features/ai/pages/AIInsightsDashboard";
import WeddingInsights from "./features/ai/pages/WeddingInsights";
import NotificationPage from "./features/notifications/pages/NotificationPage";
import ForgotPassword from "./features/auth/pages/ForgotPassword";
import ResetPassword from "./features/auth/pages/ResetPassword";

function App() {
  return (
    <Routes>

      {/* ==================================================
          PUBLIC ROUTES
      ================================================== */}

      <Route
        path="/"
        element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <LoginForm />
          </div>
        }
      />

      <Route
        path="/register"
        element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <RegisterForm />
          </div>
        }
      />

      {/* ==================================================
    FORGOT PASSWORD
================================================== */}

<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

{/* ==================================================
    RESET PASSWORD
================================================== */}

<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>


      {/* ==================================================
          PROTECTED ROUTES
      ================================================== */}

      <Route element={<ProtectedRoute />}>

        {/* ==================================================
            MAIN DASHBOARD
        ================================================== */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />


        {/* ==================================================
            WEDDING
        ================================================== */}

        <Route
          path="/weddings"
          element={<WeddingDashboard />}
        />

        <Route
          path="/weddings/new"
          element={<CreateWedding />}
        />

        <Route
          path="/weddings/:weddingId"
          element={<WeddingDetails />}
        />

        <Route
          path="/weddings/:weddingId/edit"
          element={<EditWedding />}
        />


        {/* ==================================================
            AI WEDDING PLANNER
        ================================================== */}

        <Route
          path="/weddings/:weddingId/ai"
          element={<WeddingPlannerAI />}
        />

        <Route
          path="/weddings/:weddingId/ai/plan"
          element={<WeddingPlanResult />}
        />

        <Route
  path="/weddings/:weddingId/insights"
  element={<WeddingInsights />}
/>

{/* ==================================================
    AI TIMELINE ADVISOR
================================================== */}

<Route
  path="/weddings/:weddingId/timeline-advisor"
  element={<WeddingTimelineAdvisor />}
/>

{/* ==================================================
    AI GUEST ANALYZER
================================================== */}

<Route
  path="/weddings/:weddingId/guest-analyzer"
  element={<GuestAnalyzer />}
/>

{/* ==================================================
    AI INVITATION GENERATOR
================================================== */}

<Route
  path="/weddings/:weddingId/invitation-generator"
  element={<InvitationGenerator />}
/>

{/* ==================================================
    AI VENDOR ASSISTANT
================================================== */}

<Route
  path="/weddings/:weddingId/vendor-assistant"
  element={<VendorAssistant />}
/>

{/* ==================================================
    AI CHATBOT
================================================== */}

<Route
  path="/weddings/:weddingId/chatbot"
  element={<WeddingChatbot />}
/>

{/* ==================================================
    AI INSIGHTS DASHBOARD
================================================== */}

<Route
  path="/weddings/:weddingId/ai-insights"
  element={<AIInsightsDashboard />}
/>

<Route
  path="/notifications"
  element={<NotificationPage />}
/>

        {/* ==================================================
            TASKS / PLANNING CHECKLIST
        ================================================== */}

        <Route
          path="/weddings/:weddingId/tasks"
          element={<TaskDashboard />}
        />

        <Route
          path="/weddings/:weddingId/tasks/new"
          element={<CreateTask />}
        />

        <Route
          path="/weddings/:weddingId/tasks/:taskId/edit"
          element={<EditTask />}
        />


        {/* ==================================================
            GUESTS
        ================================================== */}

        <Route
          path="/weddings/:weddingId/guests"
          element={<GuestDashboard />}
        />

        <Route
          path="/weddings/:weddingId/guests/new"
          element={<CreateGuest />}
        />

        <Route
          path="/weddings/:weddingId/guests/:guestId"
          element={<GuestDetails />}
        />

        <Route
          path="/weddings/:weddingId/guests/:guestId/edit"
          element={<EditGuest />}
        />


        {/* ==================================================
            VENDORS
        ================================================== */}

        <Route
          path="/weddings/:weddingId/vendors"
          element={<VendorDashboard />}
        />

        <Route
          path="/weddings/:weddingId/vendors/new"
          element={<CreateVendor />}
        />

        <Route
          path="/weddings/:weddingId/vendors/:vendorId"
          element={<VendorDetails />}
        />

        <Route
          path="/weddings/:weddingId/vendors/:vendorId/edit"
          element={<EditVendor />}
        />


        {/* ==================================================
            BUDGET
        ================================================== */}

        <Route
          path="/weddings/:weddingId/budget"
          element={<BudgetDashboard />}
        />

        <Route
          path="/weddings/:weddingId/budget/new"
          element={<CreateExpense />}
        />

        <Route
          path="/weddings/:weddingId/budget/:expenseId"
          element={<ExpenseDetails />}
        />

        <Route
          path="/weddings/:weddingId/budget/:expenseId/edit"
          element={<EditExpense />}
        />

      </Route>

    </Routes>
  );
}

export default App;