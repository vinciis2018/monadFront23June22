import React, { ReactNode, useState } from "react";

import { BackupModal } from "components/modals";

interface Context {
  showBackup: boolean;
  setShowBackup: (backup: boolean) => void;
}

const Ctx = React.createContext<Context>({
  showBackup: false,
  // TODO: why those func helper arguments unused?
  setShowBackup: (backup: boolean) => {},
});

interface ProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({ children }: ProviderProps) => {
  // TODO: we should not disable eslint.
  /* eslint-disable-next-line */
  const [showBackup, setShowBackup] = useState(false);

  return (
    <Ctx.Provider
      value={{
        showBackup,
        setShowBackup,
      }}
    >
      {children}
      {showBackup && (
        <BackupModal open={showBackup} handleClose={setShowBackup} />
      )}
    </Ctx.Provider>
  );
};

function useContext() {
  const context = React.useContext(Ctx);
  if (!context) {
    throw new Error(`useBackup must be used inside BackupProvider`);
  }
  return context;
}

export { ContextProvider as BackupProvider, useContext as useBackup };
