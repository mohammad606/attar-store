

import {app} from "@/app/lib/firebaseConfig";


export const fetchData = async (url:string) => {

    const dataRef = app.database().ref(url);

    const snapshot = await dataRef.once('value');

    if (snapshot.exists()) {
        return snapshot.val();
    }

    return null;
};

export const fetchDataWithLimit = async (url:string, limit:number) => {
    const dataRef = app.database().ref(url).limitToLast(limit);

    const snapshot = await dataRef.once('value');

    if (snapshot.exists()) {
        return snapshot.val();
    }

    return null;
};





