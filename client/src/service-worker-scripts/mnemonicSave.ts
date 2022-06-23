import { notifBody, notifTitle } from "config/notification";
import {
  mnemonicSavePeriodicSyncTag,
  notiAction,
  notiActionTitle,
} from "utils/serviceWorkerMessages";

declare const self: ServiceWorkerGlobalScope;

export function registerNotificationClickHandler(): void {
  self.addEventListener("notificationclick", function (event: any) {
    event.notification.close(); // Android needs explicit close.
    switch (event.action) {
      case "open_url":
        self.clients.openWindow(event.notification.data.url); // which we got from above
        break;
    }
  });
}

export function registerSyncForMnemonicSaveNotification() {
  // https://developer.mozilla.org/en-US/docs/Web/API/Web_Periodic_Background_Synchronization_API
  // "periodicsync" does not have full support across different browsers so need to use `any`
  console.log("periodicSync setup");
  self.addEventListener("periodicsync", (event: any) => {
    console.log("incoming sync event", event);
    if (event.tag === mnemonicSavePeriodicSyncTag) {
      showMnemonicSaveNotification();
    }
  });
}

export function showMnemonicSaveNotification() {
  const url = window.location.origin + "/login?target=key-phrase-save";
  const options = {
    body: notifBody,
    icon: window.location.origin + "/logo192.png",
    data: { url },
    actions: [{ action: notiAction.OPEN_URL, title: notiActionTitle }],
  };
  self.registration.showNotification(notifTitle, options);
}
