const { Firestore } = require("@google-cloud/firestore");

function modelData(doc) {
	return {
		id: doc.id,
		history: {
			result: doc.data().result,
			createdAt: doc.data().createdAt,
			suggestion: doc.data().suggestion,
			id: doc.id,
		},
	};
}

async function storeData(id, data) {
	const db = new Firestore();
   
	const predictCollection = db.collection('predictions');
	return predictCollection.doc(id).set(data);
  }

async function getData(id = null) {
	const predictCollection = db.collection('predictions');
	if (id) {
		const doc = await predictCollection.doc(id).get();
		if (!doc.exists) return null;
		return modelData(doc);
	} else {
		const snapshot = await predictCollection.get();
		const allData = [];
		snapshot.forEach(doc => allData.push(modelData(doc)));
		return allData;
	}
}

module.exports = { storeData, getData, modelData };
