import { Collection, Db } from "zangodb";
import config from "../../config";

export default class Store {
  private readonly db: Db;
  private constructor() {
    const {
      client: { dbName, dbVersion, collections },
    } = config;
    this.db = new Db(dbName, dbVersion, { ...collections });
  }

  private static instance: Store;

  public static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  public static getCollection(name: string): Collection {
    const store = Store.getInstance();
    const {
      client: { collections },
    } = config;
    const collectionNames = Object.keys(collections);
    if (!collectionNames.includes(name)) {
      throw new Error("Please add collection in config!");
    }
    return store.db.collection(name);
  }
}
