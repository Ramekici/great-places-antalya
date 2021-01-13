import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction( tx => {
            tx.executeSql(
            'CREATE TABLE [IF NOT EXISTS] placesAnt (id INTEGER PRIMARY KEY UNIQUE NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, adress TEXT NOT NULL, lat TEXT NOT NULL, lng TEXT NOT NULL)',
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

export const insertPlace = (title, imageUri, adress, lat, lng) => {

    console.log(title, imageUri, adress, lat, lng);

    const promise = new Promise((resolve, reject) => {
        db.transaction( tx => {
            tx.executeSql(
            `INSERT INTO placesAnt (title, imageUri, adress, lat, lng) VALUES (?, ?, ?, ?, ?);`,
            [title, imageUri, adress, lat, lng],
            (_, result) => {
                resolve(result);
            },
            (_, err) => {
                reject(err);
            })
        })
    })  
    return promise;

}

export const fetchPlaces = () => {

    const promise = new Promise((resolve, reject) => {
        db.transaction( tx => {
            tx.executeSql(
            `SELECT * FROM placesAnt`,
            [],
            (_, result) => {
                resolve(result);
            },
            (_, err) => {
                reject(err);
            })
        })
    })  
    return promise;

}