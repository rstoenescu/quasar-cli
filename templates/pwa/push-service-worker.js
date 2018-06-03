/*
 * This file (which will be part of your service worker)
 * is picked up by the build system and appended at the end of the service-worker
 * To do so, You must active this option in
 * quasar.conf > pwa > swPlugins > push by setting the name of this file
 * THIS PART OF THE CODE is OUT of Hot Reload managment : You should refresh page to reload it.
 */

/**
 * Start listening for web notification (client part), and will display them to the user.
 * Fill free to add/remove anypart of the code
 */
self.addEventListener('push', function (event) {
  if (!event.data) {
    console.error('This push event has no data.', event)
    return
  }

  let msg
  try {
    msg = event.data.json()
  } catch (e) {
    console.error('This push event data is not valid JSON.', event.data)
    return
  }
  // Sending message to the service-worker for display
  const promiseChain = self.registration.showNotification(msg.title, msg.options)
  event.waitUntil(promiseChain)
})
