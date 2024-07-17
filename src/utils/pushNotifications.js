export function subscribeToPushNotifications() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.ready.then(function(registration) {
      registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY
      }).then(function(subscription) {
        console.log('User is subscribed:', subscription);
        // Here you would typically send the subscription to your server
      }).catch(function(err) {
        console.log('Failed to subscribe the user: ', err);
      });
    });
  }
}

export function requestNotificationPermission() {
  return new Promise(function(resolve, reject) {
    if (!('Notification' in window)) {
      reject("This browser does not support desktop notification");
    } else {
      Notification.requestPermission().then(function(permission) {
        if (permission === "granted") {
          resolve("Notification permission granted");
        } else {
          reject("Notification permission denied");
        }
      });
    }
  });
}