// database: should be the only object in the *Database class define in *-model.ts
// For example, in menu-items-model.ts, the database function is MenuItemsDataBase.menuItems
const bulkInsert = async (databaseObject: any, documents: any[]) => {
  try {
    const result = await databaseObject.insertMany(documents);
    console.log('Bulk insert successful:', result);
  } catch (error) {
    console.error('Bulk insert error:', error);
  }
};

export { bulkInsert };