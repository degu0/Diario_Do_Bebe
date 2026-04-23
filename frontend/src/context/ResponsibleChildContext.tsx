import { responsibleChildren } from '@/constants/ResponsibleChildren';
import { useAuth } from '@/context/AuthContext';
import type { ResponsibleChild } from '@/types/responsibleChild';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

type ResponsibleChildContextValue = {
  children: ResponsibleChild[];
  selectedChild: ResponsibleChild | null;
  selectChild: (childId: string) => Promise<void>;
  getChildById: (childId: string) => ResponsibleChild | null;
};

const STORAGE_KEY = '@diario_bebe:selected_responsible_child';

const ResponsibleChildContext = createContext<ResponsibleChildContextValue | undefined>(undefined);

export function ResponsibleChildProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const syncSelectedChild = async () => {
      if (user?.type !== 'responsible') {
        if (isMounted) {
          setSelectedChildId(null);
        }
        return;
      }

      const storedChildId = await AsyncStorage.getItem(STORAGE_KEY);
      const fallbackChildId = responsibleChildren[0]?.id ?? null;
      const nextSelectedChildId =
        responsibleChildren.find((child) => child.id === storedChildId)?.id ?? fallbackChildId;

      if (!isMounted) {
        return;
      }

      setSelectedChildId(nextSelectedChildId);
    };

    syncSelectedChild();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const selectChild = async (childId: string) => {
    setSelectedChildId(childId);
    await AsyncStorage.setItem(STORAGE_KEY, childId);
  };

  const value = useMemo<ResponsibleChildContextValue>(() => {
    const selectedChild =
      responsibleChildren.find((child) => child.id === selectedChildId) ??
      responsibleChildren[0] ??
      null;

    return {
      children: responsibleChildren,
      selectedChild,
      selectChild,
      getChildById: (childId: string) =>
        responsibleChildren.find((child) => child.id === childId) ?? null,
    };
  }, [selectedChildId]);

  return (
    <ResponsibleChildContext.Provider value={value}>{children}</ResponsibleChildContext.Provider>
  );
}

export function useResponsibleChild() {
  const context = useContext(ResponsibleChildContext);

  if (!context) {
    throw new Error('useResponsibleChild must be used within ResponsibleChildProvider');
  }

  return context;
}
