// config for Firebase auth
let fbConf = {
    // The url to redirect automatically when user signed in
    'signInSuccessUrl': '../../play.html',
    // Call back functions
    'callbacks': {
        // Called when user signed in.
        'signInSuccess': function (user, credential, redirectUrl) {
            displaySignedInUI(user);
            // A flag to activate the redirect to the URL of signInSuccessUrl
            return true;
        }
    },
    'signInOptions': [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
};

// variables
let unameDispMessage = "Signed in as : ";

// Initialize Firebase UI
let fbUI = new firebaseui.auth.AuthUI(firebase.auth());
let currentUid = null;

// Initialize game related buttons for index.html
let initButtons = function () {
    document.getElementById('signOut').addEventListener('click', function() {
        firebase.auth().signOut();
    });

    document.getElementById('runWithId').addEventListener('click', function() {
        document.location = "../../play.html";
    });

    document.getElementById('runWithoutId').addEventListener('click', function() {
        firebase.auth().signOut();
        document.location = "../../play.html";
    });
};

// Display the buttons for sign in users
let displaySignedInUI = function (user) {
    currentUid = user.uid;
    document.getElementById('signedInUI').style.display = 'block';
    document.getElementById('signedOutUI').style.display = 'none';
    // if displayName is not available, show email instead
    let nameShown = user.providerData[0].displayName != null ? user.providerData[0].displayName : user.providerData[0].email;
    document.getElementById('username').textContent = unameDispMessage + nameShown;
    // console.log(user.providerData[0]);
};

// Display the buttons for sign out users
let displaySignedOutUI = function () {
    document.getElementById('signedInUI').style.display = 'none';
    document.getElementById('signedOutUI').style.display = 'block';
    fbUI.start('#authMethods', fbConf);
};

// Observe user sign in state and invoke the function when the state changed
firebase.auth().onAuthStateChanged(function(user) {
    if (user && user.uid == currentUid) {
        return;
    }
    document.getElementById('loadArea').style.display = 'block';
    user ? displaySignedInUI(user) : displaySignedOutUI();
});

// Add event listeners to buttons when the web page is loaded
window.addEventListener('load', initButtons);
