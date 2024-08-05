import * as SQLite from 'expo-sqlite';
import { BirdData } from '../Models/BirdData';

const database = SQLite.openDatabase('birds.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS birds (
                id INTEGER PRIMARY KEY NOT NULL,
                date TEXT NOT NULL,
                file TEXT NOT NULL,
                fileType TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL
            )`,
                [],
                () => {
                    resolve()
                },
                (_, error) => {
                    reject(error)
                }
            );
        });
    });

    return promise;
}


export const insertBird = (data) => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`INSERT INTO birds (date,file,fileType,lat,lng) VALUES (?,?,?,?,?)`,
                [data.date, data.file, data.fileType, data.location.lat, data.location.lng],
                (_, result) => {
                    console.log(result);
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
}

export const fetchBirds = () => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`SELECT * FROM birds`,
                [],
                (_, result) => {
                    const birds = [];
                    for (const dp of result.rows._array) {
                        birds.push(new BirdData(
                            dp.date,
                            dp.file,
                            dp.fileType,
                            {
                                lat: dp.lat,
                                lng: dp.lng
                            },
                            dp.id
                        ))
                    }
                    resolve(birds);
                },
                (_, error) => {
                    reject(error);
                }
            )
        })
    });

    return promise;
}
export const deleteBirdById = (id) => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `DELETE FROM birds WHERE id = ?`,
                [id],
                (_, result) => {
                    console.log(result);
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
};
