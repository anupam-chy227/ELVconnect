"use client";

import { useQuery } from "@/hooks/useQuery";
import { useMutation } from "@/hooks/useMutation";
import { Job, JobApplication } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/Toast";
import {
  MapPin,
  DollarSign,
  Calendar,
  FileText,
  ArrowLeft,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface JobDetailPageProps {
  params: { id: string };
}

interface JobResponse {
  status: string;
  message: string;
  data: Job;
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = params;
  const { user } = useAuth();
  const { addToast } = useToast();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [coverNote, setCoverNote] = useState("");
  const [proposedAmount, setProposedAmount] = useState("");

  const { data: jobData, loading } = useQuery<JobResponse>(
    `/jobs/${id}`,
    { enabled: !!id }
  );

  const job = jobData?.data ?? null;

  const applyMutation = useMutation({
    method: "post",
    url: `/jobs/${id}/apply`,
    onSuccess: () => {
      addToast("Application submitted successfully!", "success");
      setShowApplicationForm(false);
      setCoverNote("");
      setProposedAmount("");
    },
    successMessage: "Application submitted",
  });

  const handleApplyToJob = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!coverNote.trim()) {
      addToast("Please provide a cover note", "error");
      return;
    }

    await applyMutation.mutate({
      coverNote,
      proposedAmount: proposedAmount ? parseFloat(proposedAmount) : undefined,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-r-purple-600"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </Link>
          <div className="bg-white rounded-lg p-12 text-center">
            <div className="text-4xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Job not found
            </h1>
            <p className="text-gray-600 mb-6">
              The job you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link
              href="/jobs"
              className="inline-block px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Browse Other Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isOwner = user?._id === job.customerId;
  const isServiceProvider = user?.role === "service_provider";
  const hasApplied =
    user &&
    job.applications?.some(
      (app: JobApplication) => app.serviceProviderId === user._id
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </Link>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-8 text-white">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                <div className="flex flex-wrap gap-2">
                  {job.category.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium capitalize"
                    >
                      {cat.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
              <span className="px-4 py-2 bg-white bg-opacity-20 rounded-lg text-sm font-semibold capitalize whitespace-nowrap">
                {job.status.replace(/_/g, " ")}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  Project Description
                </h2>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    Location
                  </h3>
                  <p className="text-gray-900 font-medium">{job.location.address}</p>
                  <p className="text-gray-600">
                    {job.location.city}, {job.location.country}
                  </p>
                </div>

                {/* Budget */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-purple-600" />
                    Budget
                  </h3>
                  <p className="text-gray-900 font-medium">
                    {job.budget.type === "get_quotes"
                      ? "Get Quotes"
                      : job.budget.type === "fixed"
                        ? `${job.budget.currency || "$"}${job.budget.min}`
                        : `${job.budget.currency || "$"}${job.budget.min} - ${job.budget.max}`}
                  </p>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    Timeline
                  </h3>
                  <p className="text-gray-900 font-medium">
                    Start: {new Date(job.timeline.startDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    Due: {new Date(job.timeline.deadline).toLocaleDateString()}
                  </p>
                </div>

                {/* Applications */}
                {job.applications && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-purple-600" />
                      Applications
                    </h3>
                    <p className="text-gray-900 font-medium">
                      {job.applications.length}{" "}
                      {job.applications.length === 1
                        ? "application"
                        : "applications"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Action Card */}
              {isOwner ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <p className="text-sm text-blue-900 mb-4">
                    You posted this job
                  </p>
                  <div className="space-y-2">
                    <Link
                      href="/dashboard/jobs"
                      className="block text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      View Applications
                    </Link>
                    <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      Edit Job
                    </button>
                  </div>
                </div>
              ) : isServiceProvider ? (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 space-y-4">
                  {hasApplied ? (
                    <>
                      <div className="p-3 bg-green-100 border border-green-300 rounded text-green-900 text-sm">
                        ✓ You&apos;ve applied to this job
                      </div>
                      <button
                        disabled
                        className="w-full px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                      >
                        Already Applied
                      </button>
                    </>
                  ) : (
                    <>
                      {job.status === "open" ? (
                        <>
                          <button
                            onClick={() =>
                              setShowApplicationForm(!showApplicationForm)
                            }
                            className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                          >
                            {showApplicationForm ? "Cancel" : "Apply Now"}
                          </button>

                          {showApplicationForm && (
                            <form onSubmit={handleApplyToJob} className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Cover Note *
                                </label>
                                <textarea
                                  value={coverNote}
                                  onChange={(e) => setCoverNote(e.target.value)}
                                  placeholder="Tell the customer why you're a good fit for this job..."
                                  rows={4}
                                  required
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Proposed Amount (Optional)
                                </label>
                                <input
                                  type="number"
                                  value={proposedAmount}
                                  onChange={(e) => setProposedAmount(e.target.value)}
                                  placeholder="0.00"
                                  step="0.01"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                                />
                              </div>
                              <button
                                type="submit"
                                disabled={applyMutation.loading}
                                className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
                              >
                                {applyMutation.loading
                                  ? "Submitting..."
                                  : "Submit Application"}
                              </button>
                            </form>
                          )}
                        </>
                      ) : (
                        <p className="text-sm text-gray-600 p-3 bg-gray-100 rounded">
                          This job is no longer open
                        </p>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <p className="text-sm text-gray-600 mb-4">
                    Sign in to apply for this job
                  </p>
                  <Link
                    href="/login"
                    className="block text-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
