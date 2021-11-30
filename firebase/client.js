import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyAwp86HBBN2xC42aSYQHoLtH2weDEWC9XM',
  authDomain: 'covid-81148.firebaseapp.com',
  databaseURL: 'https://covid-81148.firebaseio.com',
  projectId: 'covid-81148',
  storageBucket: 'covid-81148.appspot.com',
  messagingSenderId: '145901315533',
  appId: '1:145901315533:web:6fcd977de335f33069d084',
  measurementId: 'G-LWRZKVD52G',
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const addCovidDia = ({ countrie, deaths, confirmed, recovered }) => {
  return db.collection('countries_covid_stat').add({
    countrie,
    deaths,
    confirmed,
    recovered,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
  });
};
//actualizar
export const updateCovidDia = ({
  countrie,
  countriename,
  deaths,
  confirmed,
  recovered,
}) => {
  return db
    .collection('countries_covid_stat')
    .doc(countrie)
    .set({
      countrie: countrie,
      name: countriename,
      deaths: deaths,
      confirmed: confirmed,
      recovered: recovered,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
    })
    .then(function () {
      console.log('Document successfully written!');
    })
    .catch(function (error) {
      console.error('Error writing document: ', error);
    });
};

export const fetchLatestCovids = () => {
  return db
    .collection('countries_covid_stat')
    .orderBy('deaths', 'desc')
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        const { createdAt } = data;

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        };
      });
    });
};

export const fetchLatestCovidsConfir = () => {
  return db
    .collection('countries_covid_stat')
    .orderBy('confirmed', 'desc')
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        const { createdAt } = data;

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        };
      });
    });
};

export const deleteCovidDia = () => {
  return db
    .collection('countries_covid_stat')
    .doc('DC')
    .delete()
    .then(function () {
      console.log('Document successfully deleted!');
    })
    .catch(function (error) {
      console.error('Error removing document: ', error);
    });
};

export const addCountries = ({ name, iso2, iso3 }) => {
  return db.collection('countries').add({
    name,
    iso2,
    iso3,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
  });
};

export const fetchCountries = () => {
  return db
    .collection('countries')
    .orderBy('name', 'asc')
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        const { createdAt } = data;

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        };
      });
    });
};
