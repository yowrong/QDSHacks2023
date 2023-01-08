import { getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { collection, query, where, doc } from "firebase/firestore";

class Controller {

    ROUTES_TABLE;
    ANALYTICS_SUMMARY;
    ANALYTICS_TABLE;

    constructor() {
        this.ROUTES_TABLE = "routes";
        this.ANALYTICS_SUMMARY = "analytics_summary";
        this.ANALYTICS_TABLE = "analytics"
    }


    /**
     * @param { Number | undefined } truckId 
     * @param { String | undefined } date 
     * @returns undefined or a docuemnt
     */
    async getRoutes(bucketId, dumpId) {
        var docRef = doc(db, this.ROUTES_TABLE, "route_" + bucketId + dumpId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }
        return undefined;
    }

    /**
 * @param { Number | undefined } truckId 
 * @param { String | undefined } date 
 * @returns An array of found docuemnts
 */
    async getAnalytics(truckId, date) {
        var q = query(collection(db, this.ANALYTICS_TABLE));

        if (truckId) {
            q = this._getTruckIdQuery(truckId);
        }

        if (truckId && date) {
            q = this._getTruckIdAndDateQuery(truckId, date);
        }

        return await this.makeQuery(q);
    }

    _getTruckIdQuery(truckId) {
        return query(collection(db, this.ANALYTICS_TABLE), where("TRUCK_ID", "==", truckId))
    }

    _getTruckIdAndDateQuery(truckId, date) {
        return query(collection(db, this.ANALYTICS_TABLE), where("TRUCK_ID", "==", truckId), where("LOAD_DATE", "==", date))
    }




    async makeQuery(query) {

        const querySnapshot = await getDocs(query);

        if (querySnapshot.empty) {
            return undefined;
        }

        const docs = querySnapshot.docs;
        const result = []

        for (let i = 0; i < docs.length; i++) {
            result[i] = docs[i].data();
        }

        return result;
    }
}

export default Controller; 