import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../../components/layout/DashboardLayout";

import {
  generateWeddingInvitation,
  getWeddingInvitation,
} from "../services/ai.api";

function InvitationGenerator() {
  const { weddingId } = useParams();

  const [invitation, setInvitation] = useState("");

  const [style, setStyle] = useState("Elegant");
  const [language, setLanguage] = useState("English");
  const [customMessage, setCustomMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  // ======================================================
  // LOAD SAVED INVITATION
  // ======================================================

  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        setLoading(true);

        const response =
          await getWeddingInvitation(weddingId);

        setInvitation(
          response.data?.data?.invitation || ""
        );
      } catch (error) {
        console.error(
          "Failed to load invitation:",
          error
        );

        toast.error(
          error.response?.data?.message ||
            "Failed to load invitation."
        );
      } finally {
        setLoading(false);
      }
    };

    if (weddingId) {
      fetchInvitation();
    }
  }, [weddingId]);

  // ======================================================
  // GENERATE INVITATION
  // ======================================================

  const handleGenerateInvitation = async () => {
    try {
      setGenerating(true);

      const response =
        await generateWeddingInvitation(
          weddingId,
          {
            style,
            language,
            customMessage,
          }
        );

      const generatedInvitation =
        response.data?.data?.invitation || "";

      setInvitation(generatedInvitation);

      toast.success(
        "Invitation generated successfully."
      );
    } catch (error) {
      console.error(
        "Invitation generation failed:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to generate invitation."
      );
    } finally {
      setGenerating(false);
    }
  };

  // ======================================================
  // COPY INVITATION
  // ======================================================

  const handleCopyInvitation = async () => {
    try {
      await navigator.clipboard.writeText(
        invitation
      );

      toast.success(
        "Invitation copied to clipboard."
      );
    } catch (error) {
      console.error(
        "Failed to copy invitation:",
        error
      );

      toast.error(
        "Failed to copy invitation."
      );
    }
  };

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">

            <div className="w-14 h-14 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin mx-auto" />

            <p className="mt-5 text-gray-500 font-medium">
              Loading your invitation studio...
            </p>

          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ======================================================
  // UI
  // ======================================================

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto pb-12">

        {/* ==================================================
            TOP NAVIGATION
        ================================================== */}

        <div className="mb-6">

          <Link
            to={`/weddings/${weddingId}`}
            className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-semibold transition"
          >
            ← Back to Wedding
          </Link>

        </div>


        {/* ==================================================
            HERO
        ================================================== */}

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 border border-pink-100 shadow-sm mb-8">

          {/* Decorative circles */}

          <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl" />

          <div className="absolute -bottom-24 -left-20 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />

          <div className="relative p-8 md:p-10">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div>

                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-pink-100 px-4 py-2 rounded-full text-sm font-semibold text-pink-600 mb-4">
                  ✨ AI Wedding Studio
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                  Invitation
                  <span className="text-pink-600">
                    {" "}Studio
                  </span>
                </h1>

                <p className="text-gray-600 mt-3 max-w-2xl text-lg">
                  Create a beautiful, personalized wedding
                  invitation using your actual wedding details.
                </p>

              </div>

              <div className="hidden md:flex w-24 h-24 rounded-3xl bg-white/80 backdrop-blur-sm shadow-sm items-center justify-center text-5xl border border-white">
                💌
              </div>

            </div>

          </div>

        </div>


        {/* ==================================================
            MAIN STUDIO
        ================================================== */}

        <div className="grid lg:grid-cols-[380px_1fr] gap-8">


          {/* ==================================================
              SETTINGS PANEL
          ================================================== */}

          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden h-fit">

            <div className="p-6 border-b border-gray-100">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-2xl bg-pink-100 flex items-center justify-center text-xl">
                  🎨
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Invitation Settings
                  </h2>

                  <p className="text-sm text-gray-500">
                    Customize your invitation
                  </p>
                </div>

              </div>

            </div>


            <div className="p-6 space-y-6">

              {/* STYLE */}

              <div>

                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Invitation Style
                </label>

                <select
                  value={style}
                  onChange={(e) =>
                    setStyle(e.target.value)
                  }
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-700 font-medium outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition"
                >
                  <option value="Elegant">
                    ✨ Elegant
                  </option>

                  <option value="Traditional">
                    🪷 Traditional
                  </option>

                  <option value="Modern">
                    ✦ Modern
                  </option>

                  <option value="Indian Traditional">
                    🪔 Indian Traditional
                  </option>

                  <option value="Royal">
                    👑 Royal
                  </option>

                  <option value="Casual">
                    💕 Casual
                  </option>
                </select>

              </div>


              {/* LANGUAGE */}

              <div>

                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Language
                </label>

                <select
                  value={language}
                  onChange={(e) =>
                    setLanguage(e.target.value)
                  }
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-700 font-medium outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition"
                >
                  <option value="English">
                    🇬🇧 English
                  </option>

                  <option value="Hindi">
                    🇮🇳 Hindi
                  </option>
                </select>

              </div>


              {/* CUSTOM MESSAGE */}

              <div>

                <div className="flex justify-between items-center mb-2">

                  <label className="text-sm font-bold text-gray-700">
                    Personal Message
                  </label>

                  <span className="text-xs text-gray-400">
                    Optional
                  </span>

                </div>

                <textarea
                  value={customMessage}
                  onChange={(e) =>
                    setCustomMessage(
                      e.target.value
                    )
                  }
                  placeholder="Add something personal you'd like to include..."
                  rows={6}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-700 outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition resize-none"
                />

              </div>


              {/* GENERATE BUTTON */}

              <button
                onClick={handleGenerateInvitation}
                disabled={generating}
                className="w-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold shadow-lg shadow-pink-200 transition-all duration-200 hover:-translate-y-0.5"
              >
                {generating ? (
                  <span className="flex items-center justify-center gap-3">

                    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />

                    Creating Invitation...

                  </span>
                ) : invitation ? (
                  "✨ Generate Again"
                ) : (
                  "✨ Generate Invitation"
                )}
              </button>


              {/* INFO */}

              <div className="bg-pink-50 border border-pink-100 rounded-xl p-4">

                <p className="text-sm text-pink-700 leading-6">
                  <span className="font-bold">
                    💡 Tip:
                  </span>{" "}
                  Choose a style that matches the feeling
                  you want your guests to experience.
                </p>

              </div>

            </div>

          </div>


          {/* ==================================================
              PREVIEW PANEL
          ================================================== */}

          <div className="bg-gray-100 rounded-3xl p-4 md:p-8 min-h-[650px]">

            <div className="flex items-center justify-between mb-5 px-2">

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  Live Preview
                </h2>

                <p className="text-sm text-gray-500">
                  Your generated invitation
                </p>

              </div>

              {invitation && (
                <span className="hidden sm:inline-flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-full text-xs font-semibold text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Saved
                </span>
              )}

            </div>


            {/* ==================================================
                INVITATION CARD
            ================================================== */}

            <div className="flex justify-center">

              <div className="relative w-full max-w-2xl">

                {/* Shadow layer */}

                <div className="absolute inset-3 bg-pink-300/20 rounded-[2rem] blur-2xl" />

                <div className="relative bg-gradient-to-br from-white via-rose-50/30 to-pink-50 rounded-[2rem] border border-pink-200 shadow-2xl overflow-hidden">

                  {/* Top decoration */}

                  <div className="h-2 bg-gradient-to-r from-pink-400 via-rose-500 to-purple-500" />

                  <div className="p-7 md:p-12">

                    {/* Decorative header */}

                    <div className="text-center">

                      <div className="flex justify-center items-center gap-3 text-pink-400 text-xl mb-5">
                        <span>✦</span>
                        <span>♡</span>
                        <span>✦</span>
                      </div>

                      <p className="uppercase tracking-[0.3em] text-xs md:text-sm font-semibold text-gray-400">
                        Wedding Invitation
                      </p>

                    </div>


                    {/* No invitation */}

                    {!invitation && !generating && (
                      <div className="py-20 text-center">

                        <div className="w-20 h-20 mx-auto rounded-full bg-pink-100 flex items-center justify-center text-4xl mb-5">
                          💌
                        </div>

                        <h3 className="text-2xl font-bold text-gray-800">
                          Your Invitation Awaits
                        </h3>

                        <p className="text-gray-500 mt-3 max-w-md mx-auto leading-6">
                          Select your preferred style and
                          language, then let AI create your
                          personalized invitation.
                        </p>

                      </div>
                    )}


                    {/* Generating */}

                    {generating && (
                      <div className="py-20 text-center">

                        <div className="w-20 h-20 mx-auto rounded-full bg-pink-100 flex items-center justify-center text-4xl mb-5 animate-pulse">
                          ✨
                        </div>

                        <h3 className="text-2xl font-bold text-gray-800">
                          Creating Something Beautiful
                        </h3>

                        <p className="text-gray-500 mt-3">
                          AI is writing your invitation...
                        </p>

                      </div>
                    )}


                    {/* Generated Invitation */}

                    {invitation && !generating && (
                      <div className="mt-8">

                        <div className="whitespace-pre-wrap text-center text-gray-700 leading-8 text-base md:text-lg font-medium">
                          {invitation}
                        </div>

                      </div>
                    )}


                    {/* Bottom decoration */}

                    <div className="text-center mt-10">

                      <div className="flex justify-center items-center gap-3 text-pink-400 text-xl">
                        <span>✦</span>
                        <span>♡</span>
                        <span>✦</span>
                      </div>

                    </div>

                  </div>

                  {/* Bottom border */}

                  <div className="h-2 bg-gradient-to-r from-purple-500 via-rose-500 to-pink-400" />

                </div>

              </div>

            </div>


            {/* ==================================================
                ACTIONS
            ================================================== */}

            {invitation && !generating && (
              <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">

                <button
                  onClick={handleCopyInvitation}
                  className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl font-semibold transition shadow-md"
                >
                  📋 Copy Invitation
                </button>

                <button
                  onClick={handleGenerateInvitation}
                  disabled={generating}
                  className="bg-white hover:bg-gray-50 text-pink-600 border border-pink-200 px-6 py-3 rounded-xl font-semibold transition shadow-sm"
                >
                  🔄 Generate Again
                </button>

              </div>
            )}

          </div>

        </div>


        {/* ==================================================
            FOOTER NOTE
        ================================================== */}

        <div className="mt-8 text-center">

          <p className="text-sm text-gray-400">
            ✨ Your invitation is saved automatically and
            remains available after refreshing the page.
          </p>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default InvitationGenerator;