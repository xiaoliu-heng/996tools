import React, { FormEvent, useMemo, useState, useEffect } from 'react';
import Head from "next/head";
import Store from "../utils/client/Store";
import dayjs from 'dayjs';


export default function Overtime() {
  const db = useMemo(() => Store.getCollection("overtime"), []);

  const [all, setAll] = useState([]);
  const [startTime, setStartTime] = useState<string>(dayjs().format("YYYY-MM-DDTHH:mm"));
  const [endTime, setEndTime] = useState<string>(dayjs().format("YYYY-MM-DDTHH:mm"));

  const refreshRecords = async () => {
    const records = await db.find({}).toArray()
    setAll(records);
  }

  useEffect(() => {
    if (db) refreshRecords()
  }, [db])

  const saveTime = async (e: FormEvent) => {
    e.preventDefault();
    if (startTime === endTime) return;
    await db.insert({ startTime, endTime });
    await refreshRecords();
  }

  return (
    <div>
      <Head>
        <title>Tools for 996 - Overtime</title>
      </Head>
      <div>Work for overtime</div>

      <div className="space-y-4 my-6 max-h-96">
        {all.map(r => (
          <div key={r._id} className="bg-white dark:bg-gray-500 shadow rounded-lg px-4 py-2" >
            <div>{`${r.startTime} to ${r.endTime}`}</div>
            <div className="text-sm">{`worked ${dayjs(r.endTime).diff(r.startTime, 'minute') / 60.0} hour(s)`}</div>
          </div>
        ))}
      </div>

      <form onSubmit={saveTime}>
        <input type="datetime-local" required value={startTime} onChange={e => setStartTime(e.target.value)} />
        <input type="datetime-local" required value={endTime} onChange={e => setEndTime(e.target.value)} />
        <button type="submit" >save</button>
      </form>
    </div>
  );
}
