import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('placesAnt');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction( tx => {
            tx.executeSql(
            'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUrl TEXT NOT NULL)',
            [],
            () => {
                resolve();
            },
            (_, err) => {
                reject(err);
            })
        })
    })  
    return promise;

}