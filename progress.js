// adding or removing a property must be done in 5 places:
// this file       -> in writeToVar: getDefault, setToDefault, if(progress) loop
//                 -> saveProgress
// conveyorbelt.js -> pen.onDragEnd

// technically every getDefault("id", index) can be replaced with LEVELS[index].id and case "id" deleted
//
// property "id" is also not strictly necessary

function loadProgress () {
    // write progress to the LEVEL_PROGRESS variable
    // in the same order as levels appear in the LEVELS array
    function writeToVar (progress = false) {
        let getDefault = (prop, index) => {
            switch(prop) {
                case "id"        : return LEVELS[index].id;
                    // tutorial starts unlocked; assume tutorial is first in the LEVELS arrray
                case "unlocked"  : return index === 0;
                case "highscore" : return 0;
                default          : throw new Error("No default for property: " + prop);
            }
        };

        // set entry at index to a default value
        let setToDefault = (index) => {
            LEVEL_PROGRESS[index] = {
                id        : getDefault("id"       , index),
                unlocked  : getDefault("unlocked" , index),
                highscore : getDefault("highscore", index)
            };
        };


        if(progress) { // fetch from database
            for (let i = 0; i < LEVELS.length; i++) {
                let dbEntry = progress[LEVELS[i].id];
                if(dbEntry == null) { // level id not found in the database
                    setToDefault(i);
                } else {
                    let getDbProp = (prop) => {
                        // if db entry doesn't have requested property, return default
                        return dbEntry[prop] == null ? getDefault(prop, i) : dbEntry[prop];
                    };

                    LEVEL_PROGRESS[i] = {
                        // id is not stored in database as a property so no point using getDbProp
                        id        : getDefault("id", i),
                        unlocked  : getDbProp("unlocked"),
                        highscore : getDbProp("highscore")
                    };
                }
            }
        } else { // load defaults
            for (let i = 0; i < LEVELS.length; i++) {
                setToDefault(i);
            }
        }
    }

    firebase.auth().onAuthStateChanged(function(user) {
        // check user is signed in or not
        if (user) {
            // signed in
            console.log(user.uid);
            console.log("Loading progress from database, please wait...");
            // check the user existence on db
            DATABASE.ref('users/' + user.uid).once('value').then(function(snapshot){
                if(snapshot.exists()) {
                    // the user already exists on db
                    console.log("Found existing user: " + user.uid);
                    // get the user object value and write the user's progress to an array
                    writeToVar(snapshot.val());
                } else {
                    // the user does not exist on db
                    console.log("New user detected: " + user.uid);
                    writeToVar(); // initialize progress with default values
                }
                console.log("Progress loaded.");
            });
        } else {
            console.log("Not logged in");
            writeToVar(); // initialize progress with default values
        }
    });
}

// Saves progress to database
function saveProgress() {
    // check user login status again before saving
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // signed in, then save progress
            console.log("Saving progress...");
            for (let i = 0; i < LEVEL_PROGRESS.length; i++) {
                DATABASE.ref('users/' + user.uid + '/' + LEVEL_PROGRESS[i].id).set({
                    unlocked  : LEVEL_PROGRESS[i].unlocked,
                    highscore : LEVEL_PROGRESS[i].highscore
                });
            }
        } else {
            // not signed in, then nothing.
            console.log("Failed to save. Please login.");
        }
    });
}

