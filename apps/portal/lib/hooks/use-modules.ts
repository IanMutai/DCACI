"use client";

import { useState, useEffect, useCallback } from "react";
import { MODULE_CONFIG, type ModuleConfig } from "@/lib/module-config";

export interface EnabledModule {
  id: string;
  config: ModuleConfig;
  enabledSubmodules: string[];
}

export function useModules() {
  const [enabledModules, setEnabledModules] = useState<EnabledModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch enabled modules from tenant config API
    // For now, enable all modules with all submodules
    const modules: EnabledModule[] = Object.entries(MODULE_CONFIG).map(
      ([id, config]) => ({
        id,
        config,
        enabledSubmodules: config.submodules.map((s) => s.id),
      })
    );

    setEnabledModules(modules);
    setIsLoading(false);
  }, []);

  const isModuleEnabled = useCallback(
    (moduleId: string) => {
      return enabledModules.some((m) => m.id === moduleId);
    },
    [enabledModules]
  );

  const isSubmoduleEnabled = useCallback(
    (moduleId: string, submoduleId: string) => {
      const module = enabledModules.find((m) => m.id === moduleId);
      return module?.enabledSubmodules.includes(submoduleId) ?? false;
    },
    [enabledModules]
  );

  const getModuleConfig = useCallback(
    (moduleId: string) => {
      return enabledModules.find((m) => m.id === moduleId);
    },
    [enabledModules]
  );

  const toggleModule = useCallback((moduleId: string) => {
    setEnabledModules((prev) => {
      const exists = prev.some((m) => m.id === moduleId);
      if (exists) {
        return prev.filter((m) => m.id !== moduleId);
      }
      const config = MODULE_CONFIG[moduleId];
      if (!config) return prev;
      return [
        ...prev,
        {
          id: moduleId,
          config,
          enabledSubmodules: config.submodules.map((s) => s.id),
        },
      ];
    });
  }, []);

  const toggleSubmodule = useCallback(
    (moduleId: string, submoduleId: string) => {
      setEnabledModules((prev) =>
        prev.map((m) => {
          if (m.id !== moduleId) return m;
          const exists = m.enabledSubmodules.includes(submoduleId);
          return {
            ...m,
            enabledSubmodules: exists
              ? m.enabledSubmodules.filter((s) => s !== submoduleId)
              : [...m.enabledSubmodules, submoduleId],
          };
        })
      );
    },
    []
  );

  return {
    enabledModules,
    isLoading,
    isModuleEnabled,
    isSubmoduleEnabled,
    getModuleConfig,
    toggleModule,
    toggleSubmodule,
  };
}

export default useModules;
