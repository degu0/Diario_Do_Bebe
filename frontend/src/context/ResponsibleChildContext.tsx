import { useAuth } from '@/context/AuthContext';
import { listDiariosByBebe } from '@/services/diarioService';
import { mapResponsibleChild } from '@/services/mappers';
import type { ResponsibleChild } from '@/types/responsibleChild';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

type ResponsibleChildContextValue = {
  children: ResponsibleChild[];
  selectedChild: ResponsibleChild | null;
  selectChild: (childId: string) => Promise<void>;
  getChildById: (childId: string) => ResponsibleChild | null;
  loading: boolean;
};

const STORAGE_KEY = '@diario_bebe:selected_responsible_child';

const ResponsibleChildContext = createContext<ResponsibleChildContextValue | undefined>(undefined);

export function ResponsibleChildProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [responsibleChildren, setResponsibleChildren] = useState<ResponsibleChild[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const syncSelectedChild = async () => {
      if (user?.type !== 'responsible') {
        if (isMounted) {
          setSelectedChildId(null);
          setResponsibleChildren([]);
          setLoading(false);
        }
        return;
      }

      if (isMounted) setLoading(true);

      const childrenFromApi = await Promise.all(
        (user.bebes ?? []).map(async (vinculo) => {
          const diarios = await listDiariosByBebe(vinculo.bebeId).catch(() => []);
          return mapResponsibleChild(vinculo, diarios[0] ?? null);
        }),
      );

      const storedChildId = await AsyncStorage.getItem(STORAGE_KEY);
      const fallbackChildId = childrenFromApi[0]?.id ?? null;
      const nextSelectedChildId =
        childrenFromApi.find((child) => child.id === storedChildId)?.id ?? fallbackChildId;

      if (!isMounted) {
        return;
      }

      setResponsibleChildren(childrenFromApi);
      setSelectedChildId(nextSelectedChildId);
      setLoading(false);
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
      loading,
    };
  }, [responsibleChildren, selectedChildId, loading]);

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
