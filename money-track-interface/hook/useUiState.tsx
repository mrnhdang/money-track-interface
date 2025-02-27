import { useState } from 'react';

export type UiStateType = {
  loading: boolean;
  error?: string;
  success?: string;
};

const useUiState = () => {
  const [uiState, setUiState] = useState<UiStateType>({
    loading: false,
  });

  return {
    uiState,
    setUiState,
  };
};

export default useUiState;
