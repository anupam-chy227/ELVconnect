"use client";

import React from "react";
import Image from "next/image";
import { MaterialSymbol } from "@/components/MaterialSymbol";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col gap-4 justify-between md:flex-row md:items-end">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-on-surface">
            Platform Overview
          </h2>
          <p className="mt-1 text-base text-on-surface-variant">
            Live metrics and moderation tools for the national network.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-outline-variant bg-surface px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-surface-container">
            <MaterialSymbol name="download" className="text-sm" />
            Export Report
          </button>
        </div>
      </div>

      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {/* Primary Metric - Active Jobs */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm lg:col-span-2">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-container/10 blur-2xl" />
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
                Active Jobs Nationwide
              </h3>
              <MaterialSymbol name="work_history" className="text-primary" />
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-bold tracking-tight text-on-surface">
                4,289
              </span>
              <span className="flex items-center rounded-full bg-tertiary-container/20 px-2 py-0.5 text-xs font-medium text-tertiary">
                <MaterialSymbol name="trending_up" className="mr-1 text-[10px]" />
                +12%
              </span>
            </div>
          </div>
          <div className="mt-6 flex h-12 w-full items-end gap-1">
            <div className="h-1/4 w-1/12 rounded-t bg-primary-container/30" />
            <div className="h-2/4 w-1/12 rounded-t bg-primary-container/40" />
            <div className="h-1/4 w-1/12 rounded-t bg-primary-container/30" />
            <div className="h-3/4 w-1/12 rounded-t bg-primary-container/50" />
            <div className="h-2/4 w-1/12 rounded-t bg-primary-container/40" />
            <div className="h-4/5 w-1/12 rounded-t bg-primary-container/60" />
            <div className="h-3/4 w-1/12 rounded-t bg-primary-container/50" />
            <div className="h-full w-1/12 rounded-t bg-primary-container/70" />
            <div className="h-4/5 w-1/12 rounded-t bg-primary-container/60" />
            <div className="h-5/6 w-1/12 rounded-t bg-primary-container/80" />
            <div className="h-full w-1/12 rounded-t bg-primary-container/70" />
            <div className="h-[90%] w-1/12 rounded-t bg-primary-container" />
          </div>
        </div>

        {/* Engineers Online */}
        <div className="flex flex-col justify-between rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
                Engineers Online
              </h3>
              <MaterialSymbol name="engineering" className="text-secondary" />
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-semibold text-on-surface">1,842</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs text-on-surface-variant">
              <span>Verification Queue</span>
              <span>45 pending</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-surface-variant">
              <div className="h-1.5 w-[85%] rounded-full bg-secondary" />
            </div>
          </div>
        </div>

        {/* UPI Volume */}
        <div className="flex flex-col justify-between rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
                UPI Volume (Daily)
              </h3>
              <MaterialSymbol name="currency_rupee" className="text-tertiary" />
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-semibold text-on-surface">Rs 2.4M</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-tertiary" />
            <span className="text-xs font-medium text-on-surface-variant">
              Systems Operational
            </span>
          </div>
        </div>
      </div>

      {/* Complex Data Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Verification Queue Table */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-outline-variant bg-surface-bright p-6">
            <h3 className="text-2xl font-semibold text-on-surface">
              Verification Queue
            </h3>
            <button className="text-sm font-semibold text-primary hover:underline">
              View All
            </button>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-low text-xs font-medium uppercase tracking-wider text-on-surface-variant">
                  <th className="p-4 font-medium">Engineer</th>
                  <th className="p-4 font-medium">Region</th>
                  <th className="p-4 font-medium">Specialty</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/50 text-base text-on-surface">
                <tr className="transition-colors hover:bg-surface-container-lowest">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-on-primary">
                        RK
                      </div>
                      <div>
                        <p className="font-medium">Rahul Kumar</p>
                        <p className="text-xs text-on-surface-variant">KYC Submitted</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">Mumbai, MH</td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded border border-secondary-container/30 bg-secondary-container/20 px-2 py-1 text-xs font-medium text-on-secondary-container">
                      Fire Safety
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary">
                      <MaterialSymbol name="pending" className="text-[14px]" />
                      Pending Review
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        className="rounded p-1 text-tertiary transition-colors hover:bg-tertiary-container/10"
                        title="Approve"
                      >
                        <MaterialSymbol name="check_circle" className="text-sm" />
                      </button>
                      <button
                        className="rounded p-1 text-error transition-colors hover:bg-error-container/10"
                        title="Reject"
                      >
                        <MaterialSymbol name="cancel" className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="bg-surface-container-lowest transition-colors hover:bg-surface-container">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-on-secondary">
                        AS
                      </div>
                      <div>
                        <p className="font-medium">Amit Sharma</p>
                        <p className="text-xs text-on-surface-variant">Docs Flagged</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">Delhi, DL</td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded border border-secondary-container/30 bg-secondary-container/20 px-2 py-1 text-xs font-medium text-on-secondary-container">
                      CCTV
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-error">
                      <MaterialSymbol name="error" className="text-[14px]" />
                      ID Mismatch
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="rounded border border-primary px-2 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary-container/10">
                      Review
                    </button>
                  </td>
                </tr>
                <tr className="transition-colors hover:bg-surface-container-lowest">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-on-primary">
                        VP
                      </div>
                      <div>
                        <p className="font-medium">Vikram Patel</p>
                        <p className="text-xs text-on-surface-variant">KYC Submitted</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">Ahmedabad, GJ</td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded border border-secondary-container/30 bg-secondary-container/20 px-2 py-1 text-xs font-medium text-on-secondary-container">
                      Networking
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary">
                      <MaterialSymbol name="pending" className="text-[14px]" />
                      Pending Review
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        className="rounded p-1 text-tertiary transition-colors hover:bg-tertiary-container/10"
                        title="Approve"
                      >
                        <MaterialSymbol name="check_circle" className="text-sm" />
                      </button>
                      <button
                        className="rounded p-1 text-error transition-colors hover:bg-error-container/10"
                        title="Reject"
                      >
                        <MaterialSymbol name="cancel" className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Hot Zones */}
        <div className="flex flex-col rounded-xl border border-outline-variant bg-surface-container-lowest shadow-sm">
          <div className="flex items-center justify-between border-b border-outline-variant bg-surface-bright p-6">
            <h3 className="text-2xl font-semibold text-on-surface">Hot Zones</h3>
            <MaterialSymbol name="map" className="text-on-surface-variant" />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <div className="relative mb-6 flex h-32 w-full items-center justify-center overflow-hidden rounded-lg bg-surface-container">
              <Image
                src="/ELVLOGO-HQ.png"
                alt="Map visualization"
                fill
                className="object-cover opacity-20 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent" />
              <div className="absolute left-1/3 top-1/4 h-3 w-3 animate-pulse rounded-full bg-error shadow-[0_0_10px_rgba(186,26,26,0.8)]" />
              <div className="absolute left-2/3 top-1/2 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(83,42,168,0.8)]" />
              <div className="absolute bottom-1/4 right-1/4 h-2 w-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(0,82,55,0.8)]" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-error" />
                  <span className="text-sm font-medium">Mumbai Metro</span>
                </div>
                <span className="text-sm font-bold">1,204 jobs</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">Delhi NCR</span>
                </div>
                <span className="text-sm font-bold">856 jobs</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-tertiary" />
                  <span className="text-sm font-medium">Bangalore</span>
                </div>
                <span className="text-sm font-bold">642 jobs</span>
              </div>
            </div>
            <button className="mt-4 w-full rounded border border-outline-variant py-2 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container">
              View Full Map
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto grid w-full max-w-7xl grid-cols-2 gap-8 border-t border-outline-variant bg-surface-container-lowest px-10 py-12 text-xs font-medium uppercase tracking-widest text-primary md:grid-cols-4">
        <div className="col-span-2 mb-6 flex items-center justify-between border-b border-outline-variant pb-6 md:col-span-4 md:mb-0">
          <span className="text-lg font-black text-on-surface">
            <Image
              src="/ELVLOGO-HQ.png"
              alt="ELV Connect Logo"
              width={220}
              height={60}
              className="h-14 w-auto object-contain"
              style={{ width: "auto" }}
            />
          </span>
          <span className="normal-case tracking-normal text-on-surface-variant">
            Copyright 2024 National Security Infrastructure.
          </span>
        </div>
        <a
          href="#"
          className="text-on-surface-variant opacity-80 transition-opacity hover:text-on-surface hover:opacity-100"
        >
          Fire Safety
        </a>
        <a
          href="#"
          className="text-on-surface-variant opacity-80 transition-opacity hover:text-on-surface hover:opacity-100"
        >
          CCTV Systems
        </a>
        <a
          href="#"
          className="text-on-surface-variant opacity-80 transition-opacity hover:text-on-surface hover:opacity-100"
        >
          Networking
        </a>
        <a
          href="#"
          className="text-on-surface-variant opacity-80 transition-opacity hover:text-on-surface hover:opacity-100"
        >
          SLA Terms
        </a>
        <a
          href="#"
          className="text-on-surface-variant opacity-80 transition-opacity hover:text-on-surface hover:opacity-100"
        >
          City Directory
        </a>
        <a
          href="#"
          className="text-on-surface-variant opacity-80 transition-opacity hover:text-on-surface hover:opacity-100"
        >
          Trust & Safety
        </a>
      </footer>
    </div>
  );
}
