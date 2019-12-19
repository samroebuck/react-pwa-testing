importScripts("https://www.gstatic.com/firebasejs/5.5.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.5.4/firebase-messaging.js");

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// using message api of firebase instead of push event handler
// when we got a message in raw formatn without body message in notification
// [Receive Messages in a JavaScript Client](https://goo.gl/B6qqOu)
messaging.setBackgroundMessageHandler(({data} = {}) => {
  const title = data.title || 'Title';
  const opts = Object.assign({
    body: data.body || 'Body'
  }, data);

  return self.registration.showNotification(title, opts);
});
