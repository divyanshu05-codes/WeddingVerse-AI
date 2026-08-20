import { Routes, Route } from "react-router-dom";

// ======================================================
// AUTH
// ======================================================

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

// ======================================================
// PROTECTION
// ======================================================

import ProtectedRoute from "../components/auth/ProtectedRoute";

// ======================================================
// DASHBOARD
// ======================================================

import WeddingDashboard from "../features/wedding/pages/WeddingDashboard";

// ======================================================
// WEDDING
// ======================================================

import CreateWedding from "../features/wedding/pages/CreateWedding";
import WeddingDetails from "../features/wedding/pages/WeddingDetails";
import EditWedding from "../features/wedding/pages/EditWedding";

// ======================================================
// GUEST
// ======================================================

import GuestDashboard from "../features/guest/pages/GuestDashboard";
import CreateGuest from "../features/guest/pages/CreateGuest";
import GuestDetails from "../features/guest/pages/GuestDetails";
import EditGuest from "../features/guest/pages/EditGuest";

// ======================================================
// VENDOR
// ======================================================

import VendorDashboard from "../features/vendor/pages/VendorDashboard";
import CreateVendor from "../features/vendor/pages/CreateVendor";
import VendorDetails from "../features/vendor/pages/VendorDetails";
import EditVendor from "../features/vendor/pages/EditVendor";

// ======================================================
// BUDGET
// ======================================================

import BudgetDashboard from "../features/budget/pages/BudgetDashboard";
import CreateExpense from "../features/budget/pages/CreateExpense";
import ExpenseDetails from "../features/budget/pages/ExpenseDetails";
import EditExpense from "../features/budget/pages/EditExpense";

// ======================================================
// TASKS
// ======================================================

import TaskDashboard from "../features/task/pages/TaskDashboard";
import CreateTask from "../features/task/pages/CreateTask";
import EditTask from "../features/task/pages/EditTask";

// ======================================================
// AI
// ======================================================

import WeddingPlannerAI from "../features/ai/pages/WeddingPlannerAI";
import WeddingPlanResult from "../features/ai/pages/WeddingPlanResult";
import WeddingTimelineAdvisor from "../features/ai/pages/WeddingTimelineAdvisor";

// ======================================================
// OTHER
// ======================================================

import NotFound from "../components/NotFound";


// ======================================================
// APP ROUTES
// ======================================================

function AppRoutes() {
  return (
    <Routes>

      {/* ==================================================
          PUBLIC ROUTES
      ================================================== */}

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />


      {/* ==================================================
          PROTECTED ROUTES
      ================================================== */}

      <Route element={<ProtectedRoute />}>

        {/* ==================================================
            DASHBOARD
        ================================================== */}

        <Route
          path="/dashboard"
          element={<WeddingDashboard />}
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

          <Route
    path="/weddings/:weddingId/timeline-advisor"
    element={<WeddingTimelineAdvisor />}
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
          path="/weddings/:weddingId/ai-plan"
          element={<WeddingPlanResult />}
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


      {/* ==================================================
          404
      ================================================== */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default AppRoutes;