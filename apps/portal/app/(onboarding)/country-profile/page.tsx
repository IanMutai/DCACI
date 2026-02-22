"use client";

import Link from "next/link";
import { useState } from "react";

export default function CountryProfilePage() {
  const [profile, setProfile] = useState({
    countryName: "",
    isoCode: "",
    region: "",
    nationalFocalPoint: "",
    focalPointEmail: "",
    focalPointPhone: "",
    ministry: "",
    timezone: "",
    currency: "",
    population: "",
    gdp: "",
    unfcccParty: true,
    parisAgreement: true,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const value =
      e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    setProfile((prev) => ({ ...prev, [e.target.name]: value }));
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Country Profile</h1>
        <p className="mt-2 text-sm text-slate-600">
          Set up your country&apos;s basic information and designated contacts.
        </p>
      </div>

      <div className="card space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Country Name
            </label>
            <input
              name="countryName"
              value={profile.countryName}
              onChange={handleChange}
              placeholder="e.g., Republic of Kenya"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              ISO Country Code
            </label>
            <input
              name="isoCode"
              value={profile.isoCode}
              onChange={handleChange}
              placeholder="e.g., KEN"
              maxLength={3}
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Region
          </label>
          <select
            name="region"
            value={profile.region}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Select region</option>
            <option value="africa">Africa</option>
            <option value="asia-pacific">Asia-Pacific</option>
            <option value="eastern-europe">Eastern Europe</option>
            <option value="latin-america">Latin America & Caribbean</option>
            <option value="western-europe">Western Europe & Others</option>
          </select>
        </div>

        <hr className="border-slate-200" />

        <h3 className="text-lg font-semibold text-slate-900">
          National Focal Point
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Focal Point Name
            </label>
            <input
              name="nationalFocalPoint"
              value={profile.nationalFocalPoint}
              onChange={handleChange}
              placeholder="Full name"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Email
            </label>
            <input
              name="focalPointEmail"
              type="email"
              value={profile.focalPointEmail}
              onChange={handleChange}
              placeholder="email@government.go"
              className="input-field"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Ministry / Agency
            </label>
            <input
              name="ministry"
              value={profile.ministry}
              onChange={handleChange}
              placeholder="e.g., Ministry of Environment"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Phone
            </label>
            <input
              name="focalPointPhone"
              type="tel"
              value={profile.focalPointPhone}
              onChange={handleChange}
              placeholder="+254 ..."
              className="input-field"
            />
          </div>
        </div>

        <hr className="border-slate-200" />

        <h3 className="text-lg font-semibold text-slate-900">
          Treaty Status
        </h3>

        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="unfcccParty"
              checked={profile.unfcccParty}
              onChange={handleChange}
              className="h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-500"
            />
            <span className="text-sm text-slate-700">
              Party to the UNFCCC
            </span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="parisAgreement"
              checked={profile.parisAgreement}
              onChange={handleChange}
              className="h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-500"
            />
            <span className="text-sm text-slate-700">
              Ratified the Paris Agreement
            </span>
          </label>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Link href="/welcome" className="btn-secondary">
          Back
        </Link>
        <Link href="/module-selection" className="btn-primary">
          Continue
        </Link>
      </div>
    </div>
  );
}
