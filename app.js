var app = new Vue({
  el: '#app',

  data: {
    title: 'Very Simple Chat',
    creator: 'Dongyu Kang',
    message: '',
    user: '',
    chatLists: {},
    signedIn: false
  },

  methods: {
    signInWithGoogle() {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider);
    },

    signOut() {
      firebase.auth().signOut();
    },

    sendMessage() {
      firebase.database().ref('chat-lists').push({
        name: this.user.displayName,
        email: this.user.email,
        message: this.message
      });
      this.message = '';
    }
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.signedIn = true;
      } else {
        this.user = '';
        this.signedIn = false;
      }
    });

    firebase.database().ref('chat-lists').on('value', (data) => {
      this.chatLists = data.val();
    });
  }

});
