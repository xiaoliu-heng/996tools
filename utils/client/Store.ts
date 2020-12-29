import {store} from "next/dist/build/output/store";

class Store{

	private constructor() {
	}

	private static instance:Store;

	public static getInstance():Store{
		if(!Store.instance){
			Store.instance = new Store();
		}
		return store.instance;
	}
	}
