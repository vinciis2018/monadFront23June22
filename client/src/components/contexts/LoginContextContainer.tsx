/* eslint-disable no-console */
import React, { useEffect } from "react";
// hooks
import { useWallet } from "./WalletContextContainer";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "hooks";
import { AUTH_ROUTES } from "utils/constants";

import { WithChildren } from "types/utils";
import { mnemonicSavePeriodicSyncTag } from "utils/serviceWorkerMessages";
import {
  isSeedPhraseSaved,
  setSeedPhraseSaved as _setSeedPhraseSaved,
} from "services";
import { MNENONIC_SAVE_REMINDER_INTERVAL } from "../../config/notification";

interface User {
  expired: number;
}

interface Context {
  user: User | undefined;
  // TODO: better helper func types.
  login: (expired: number) => void;
  register: (expired: number) => void;
  lock: () => void;
  logout: () => void;

  // TODO: Move it to separate context or something
  setSeedPhraseSaved(): Promise<void>;
}

const Ctx = React.createContext<Context | undefined>(undefined);

const ContextProvider = ({ children }: WithChildren) => {
  const navigate = useHistory();
  const pathname = window.location.pathname
  const searchParams = new URLSearchParams();
  const [user, setUser, clearUser] = useLocalStorage<User>("user", undefined);

  // TODO: Context in a context is not a good pattern I guess
  const { isUnlocked, isPinSetup, isConnected } = useWallet();
  

  const askForPermissions = () => {
    Notification.requestPermission();

    navigator.permissions
      .query({
        name: "periodic-background-sync" as PermissionName,
      })
      .then(async (status) =>
        isSeedPhraseSaved().then((isSaved) => {
          if (status.state === "granted" && !isSaved) {
            registerSeedPhraseSaveReminder(MNENONIC_SAVE_REMINDER_INTERVAL);
          }
        })
      );
  };

  const registerSeedPhraseSaveReminder = (interval: number): Promise<void> => {
    return navigator.serviceWorker.ready.then((registration) => {
      if ("periodicSync" in registration) {
        return (registration as any).periodicSync.register(
          mnemonicSavePeriodicSyncTag,
          {
            minInterval: interval,
          }
        );
      }
      // TODO: Make better error handling
      return Promise.resolve();
    });
  };

  const unregisterSeedPhraseSaveReminder = (): Promise<void> => {
    return navigator.serviceWorker.ready.then((registration) => {
      if ("periodicSync" in registration) {
        return (registration as any).periodicSync.unregister(
          mnemonicSavePeriodicSyncTag
        );
      }
      // TODO: Make better error handling
      return Promise.resolve();
    });
  };

  const setSeedPhraseSaved = (): Promise<void> => {
    console.log("here");
    return Promise.all([
      _setSeedPhraseSaved(),
      unregisterSeedPhraseSaveReminder(),
    ]).then();
  };

  useEffect(() => {
    if (user) {
      const expired = user.expired;
      const current = Math.floor(Date.now() / 1000);
      if (current - Number(expired) < 0 && isConnected) {

        if (AUTH_ROUTES.includes(pathname)) {
          const expired = Math.floor(Date.now() / 1000) + 10 * 60; // 10 mins
          setUser({
            expired,
          });
          // navigate.push(pathname);
        } else {
          if (pathname === "/login") {
            const target = searchParams.get("target");
            if (target) return;
          }
          window.location.replace("/upload");
        }
      } else {
        if (AUTH_ROUTES.includes(pathname)) {
          navigate.push("/login");
        }
      }
    } else {
      if (AUTH_ROUTES.includes(pathname)) {
        // window.location.replace("/");
      }
    }
    /* eslint-disable-next-line */
  }, [pathname]);

  useEffect(() => {
    if (user) {
      const expired = user.expired;
      const current = Math.floor(Date.now() / 1000);
      if (current - Number(expired) > 0) {
        if (AUTH_ROUTES.includes(pathname)) {
          window.location.replace("/login");
        }
      }
    }
    /* eslint-disable-next-line */
  }, [user]);

  useEffect(() => {
    isPinSetup().then((hasData) => {
      if (!hasData) {
        // window.location.replace("/welcome");
      }
    });

    askForPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginUser = async (expired: number) => {
    // check user verification and send message to service worker
    return setUser({ ...user, expired });
  };

  const registerUser = async (expired: number) => {
    return setUser({ expired });
  };

  const logoutUser = () => {
    clearUser();
  };

  const lockUser = () => {
    setUser({
      ...user,
      expired: Math.floor((Date.now() - 2000) / 1000),
    });
  };

  return (
    <Ctx.Provider
      value={{
        user,
        login: loginUser,
        register: registerUser,
        logout: logoutUser,
        lock: lockUser,
        setSeedPhraseSaved,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

function useContext() {
  const context = React.useContext(Ctx);
  if (!context) {
    throw new Error(`useLogin must be used inside LoginProvider`);
  }
  return context;
}

export { ContextProvider as LoginProvider, useContext as useLogin };
