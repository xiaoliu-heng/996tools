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
    await db.insert({ startTime, endTime });
    refreshRecords();
  }

  return (
    <div>
      <Head>
        <title>Tools for 996 - Overtime</title>
      </Head>
      <div>Work for overtime</div>

      {all.map(r => (
        <div key={r._id}>{`${r.startTime} to ${r.endTime}`}</div>
      ))}

      <form onSubmit={saveTime}>
        <input type="datetime-local" required value={startTime} onChange={e => setStartTime(e.target.value)} />
        <input type="datetime-local" required value={endTime} onChange={e => setEndTime(e.target.value)} />
        <button type="submit" >save</button>
      </form>
    </div>
  );
}
