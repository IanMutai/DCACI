"use client";

import { useState, useEffect, useCallback } from "react";

export interface Tenant {
  id: string;
  name: string;
  country: string;
  isoCode: string;
  region: string;
  enabledModules: string[];
  settings: Record<string, unknown>;
}

const DEFAULT_TENANT: Tenant = {
  id: "default",
  name: "NCTP Platform",
  country: "Kenya",
  isoCode: "KEN",
  region: "africa",
  enabledModules: ["mrv", "ndc", "registry"],
  settings: {},
};

export function useTenant() {
  const [tenant, setTenant] = useState<Tenant>(DEFAULT_TENANT);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTenant = useCallback(async () => {
    try {
      setIsLoading(true);
      // TODO: Fetch tenant from API based on session
      // const response = await fetch('/api/tenant');
      // const data = await response.json();
      // setTenant(data);

      // For now, use default tenant
      setTenant(DEFAULT_TENANT);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch tenant:", err);
      setError("Failed to load tenant information");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTenant();
  }, [fetchTenant]);

  const isModuleEnabled = useCallback(
    (moduleId: string) => {
      return tenant.enabledModules.includes(moduleId);
    },
    [tenant.enabledModules]
  );

  const updateTenantSettings = useCallback(
    async (settings: Record<string, unknown>) => {
      try {
        // TODO: Update tenant settings via API
        setTenant((prev) => ({
          ...prev,
          settings: { ...prev.settings, ...settings },
        }));
      } catch (err) {
        console.error("Failed to update tenant settings:", err);
        throw err;
      }
    },
    []
  );

  return {
    tenant,
    isLoading,
    error,
    isModuleEnabled,
    updateTenantSettings,
    refetch: fetchTenant,
  };
}

export default useTenant;
