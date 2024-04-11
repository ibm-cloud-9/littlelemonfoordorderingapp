import * as SQLite from 'expo-sqlite';
//import { SECTION_LIST_MOCK_DATA } from './utils';

const db = SQLite.openDatabase('little_lemon');

export async function dropTable() {
  return new Promise((resolve, reject) => {

    db.transaction(
      (tx) => {
        tx.executeSql(
          'DROP TABLE IF EXISTS menuitems;'
        );
      },
      reject,
      resolve
    );
  });
}
export async function createTable() {
  return new Promise((resolve, reject) => {

    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, name text, price text, description text, image text, category text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
		   //console.log('GetMenuItems:', rows._array);
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  let sql_stmt =       `insert into menuitems (id, name, price, description, image, category) values ${menuItems
    .map((item) =>
      `("${item.id}", "${item.name}", "${item.price}", "${item.description}", "${item.image}", "${item.category}")`)
      .join(', ')}`;

  console.log('Sql Stmt:', sql_stmt)
  db.transaction((tx) => {
    tx.executeSql(sql_stmt
/*       `insert into menuitems (id, name, price, description, image, category) values ${menuItems
        .map((item) =>
          `("${item.id}", "${item.name}", "${item.price}", "${item.description}", "${item.image}", "${item.category}")`)
          .join(', ')}` */
    );
  });
}

export function simplesaveMenuItems(menuItems) {
  db.transaction((tx) => {
    tx.executeSql(
      `insert into menuitems (id, name, price, description, image, category) values ${menuItems
        .map((item) =>
          `("${item.id}", "${item.name}", "${item.price}", "${item.description}", "${item.image}", "${item.category}")`)
          .join(', ')}`
    );
  });
}
/**
 * 4. Implement a transaction that executes a SQL statement to filter the menu by 2 criteria:
 * a query string and a list of categories.
 *
 * The query string should be matched against the menu item titles to see if it's a substring.
 * For example, if there are 4 items in the database with titles: 'pizza, 'pasta', 'french fries' and 'salad'
 * the query 'a' should return 'pizza' 'pasta' and 'salad', but not 'french fries'
 * since the latter does not contain any 'a' substring anywhere in the sequence of characters.
 *
 * The activeCategories parameter represents an array of selected 'categories' from the filter component
 * All results should belong to an active category to be retrieved.
 * For instance, if 'pizza' and 'pasta' belong to the 'Main Dishes' category and 'french fries' and 'salad' to the 'Sides' category,
 * a value of ['Main Dishes'] for active categories should return  only'pizza' and 'pasta'
 *
 * Finally, the SQL statement must support filtering by both criteria at the same time.
 * That means if the query is 'a' and the active category 'Main Dishes', the SQL statement should return only 'pizza' and 'pasta'
 * 'french fries' is excluded because it's part of a different category and 'salad' is excluded due to the same reason,
 * even though the query 'a' it's a substring of 'salad', so the combination of the two filters should be linked with the AND keyword
 *
 */
export async function filterByQueryAndCategories(query, activeCategories) {
  //console.log('Query: ', query.length);
  //console.log('activeCategories: ', activeCategories);

/*   let lowerActiveCategories = activeCategories.map((value) => value.toLowerCase());
  console.log(lowerActiveCategories); */
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(`select * from menuitems where name like ? and category in ('${activeCategories.join("','")}')`, [`%${query}%`], (_, { rows }) => {

        resolve(rows._array);
      });
    },
    reject);
  });
/*     if (!query) {
      db.transaction((tx) => {
        tx.executeSql(
          `select * from menuitems where ${activeCategories
            .map((category) => `category='${category}'`)
            .join(' or ')}`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
          }
        );
      }, reject);
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          `select * from menuitems where (title like '%${query}%') and (${activeCategories
            .map((category) => `category='${category}'`)
            .join(' or ')})`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
          }
        );
      }, reject);
    } */

/*
  return new Promise((resolve, reject) => {
    resolve(SECTION_LIST_MOCK_DATA);
  });
*/
}
