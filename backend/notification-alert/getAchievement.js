const admin = require('firebase-admin');
const serviceAccount = require('./prefab-pixel-391815-firebase-adminsdk-pvkwu-1a437e2c67.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

exports.handler = async (event, context) => {
  try {
    // Retrieve the parameter from the request
    const {teamName} = event;
    
    // Reference to the collection and document
    const teamsRef = firestore.collection('Teams');
    const teamDocRef = teamsRef.doc(teamName);
    
    // Retrieve the document data
    const teamDoc = await teamDocRef.get();
    
    if (teamDoc.exists) {
      // Get the 'points' field from the document data
      const points = teamDoc.get('points');
      
      // Reference to the 'Achievements' collection and 'Level1' document
      const achievementsRef = firestore.collection('Achievements');
      const level1DocRef = achievementsRef.doc('Level1');
      
      // Retrieve the 'Level1' document data
      const level1Doc = await level1DocRef.get();
      
      if (level1Doc.exists) {
        // Iterate through the fields in the 'Level1' document
        const level1Data = level1Doc.data();
        let achievementName = 'No achievement';
        
        for (const threshold in level1Data) {
          if (points >= parseInt(threshold)) {
            achievementName = level1Data[threshold];
          } else {
            break; 
          }
        }
        
        return {
          statusCode: 200,
          body: { points, achievementName }
        };
      } else {
        return {
          statusCode: 404,
          body: {error: 'Achievements not found' }
        };
      }
    } else {
      return {
        statusCode: 404,
        body: { error: 'Team not found' }
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: { error: 'Internal server error' }
    };
  }
};
