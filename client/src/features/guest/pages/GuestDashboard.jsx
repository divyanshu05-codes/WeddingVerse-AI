import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import DashboardLayout from "../../../components/layout/DashboardLayout";
import GuestCard from "../components/GuestCard";
import useGuest from "../hooks/useGuest";

function GuestDashboard() {
  const { weddingId } = useParams();

  const { guests, loading } = useGuest(weddingId);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sideFilter, setSideFilter] = useState("All");

  const filteredGuests = useMemo(() => {
    return guests.filter((guest) => {
      const matchesSearch =
        guest.fullName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        guest.phone?.includes(search) ||
        guest.email
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All"
          ? true
          : guest.rsvpStatus === statusFilter;

      const matchesSide =
        sideFilter === "All"
          ? true
          : guest.side === sideFilter;

      return matchesSearch && matchesStatus && matchesSide;
    });
  }, [guests, search, statusFilter, sideFilter]);

  const accepted = guests.filter(
    (g) => g.rsvpStatus === "Accepted"
  ).length;

  const pending = guests.filter(
    (g) => g.rsvpStatus === "Pending"
  ).length;

  const declined = guests.filter(
    (g) => g.rsvpStatus === "Declined"
  ).length;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

          <div>
            <Link
              to={`/weddings/${weddingId}`}
              className="text-pink-600 font-semibold hover:underline"
            >
              ← Back to Wedding
            </Link>

            <h1 className="text-3xl font-bold mt-2">
              Guests
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">

            {/* AI Guest Analyzer */}
            <Link
              to={`/weddings/${weddingId}/guest-analyzer`}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition"
            >
              👥 AI Guest Analyzer
            </Link>

            {/* Add Guest */}
            <Link
              to={`/weddings/${weddingId}/guests/new`}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition"
            >
              + Add Guest
            </Link>

          </div>

        </div>


        {/* ==================================================
            STATISTICS
        ================================================== */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

          {/* Total */}

          <div className="bg-white shadow rounded-xl p-5">

            <h3 className="text-gray-500">
              Total
            </h3>

            <p className="text-3xl font-bold text-pink-600">
              {guests.length}
            </p>

          </div>


          {/* Accepted */}

          <div className="bg-white shadow rounded-xl p-5">

            <h3 className="text-gray-500">
              Accepted
            </h3>

            <p className="text-3xl font-bold text-green-600">
              {accepted}
            </p>

          </div>


          {/* Pending */}

          <div className="bg-white shadow rounded-xl p-5">

            <h3 className="text-gray-500">
              Pending
            </h3>

            <p className="text-3xl font-bold text-yellow-500">
              {pending}
            </p>

          </div>


          {/* Declined */}

          <div className="bg-white shadow rounded-xl p-5">

            <h3 className="text-gray-500">
              Declined
            </h3>

            <p className="text-3xl font-bold text-red-600">
              {declined}
            </p>

          </div>

        </div>


        {/* ==================================================
            SEARCH + FILTERS
        ================================================== */}

        <div className="bg-white rounded-xl shadow p-5 mb-8 grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Search by name, phone or email..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-lg p-3"
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="border rounded-lg p-3"
          >
            <option>All</option>
            <option>Accepted</option>
            <option>Pending</option>
            <option>Declined</option>
          </select>

          <select
            value={sideFilter}
            onChange={(e) =>
              setSideFilter(e.target.value)
            }
            className="border rounded-lg p-3"
          >
            <option>All</option>
            <option>Bride</option>
            <option>Groom</option>
          </select>

        </div>


        {/* ==================================================
            GUEST LIST
        ================================================== */}

        {loading ? (

          <p>Loading...</p>

        ) : filteredGuests.length === 0 ? (

          <div className="bg-white shadow rounded-xl p-10 text-center">

            <h2 className="text-xl font-semibold">
              No Guests Found
            </h2>

            <p className="text-gray-500 mt-2">
              Add guests to start managing your wedding
              guest list.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredGuests.map((guest) => (

              <GuestCard
                key={guest._id}
                guest={guest}
              />

            ))}

          </div>

        )}

      </div>
    </DashboardLayout>
  );
}

export default GuestDashboard;