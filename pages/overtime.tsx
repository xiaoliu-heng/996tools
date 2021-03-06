import React, { FormEvent, useMemo, useState, useEffect } from 'react';
import Head from "next/head";
import Store from "../utils/client/Store";
import dayjs from 'dayjs';


export default function Overtime() {
  const overtimeColl = useMemo(() => Store.getCollection("overtime"), []);
  const baseinfoColl = useMemo(() => Store.getCollection("baseinfo"), []);

  const [all, setAll] = useState([]);
  const [startTime, setStartTime] = useState<string>(dayjs().format("YYYY-MM-DDTHH:mm"));
  const [endTime, setEndTime] = useState<string>(dayjs().format("YYYY-MM-DDTHH:mm"));

  const refreshRecords = async () => {
    const records = await overtimeColl.find({}).toArray()
    setAll(records);
  }

  useEffect(() => {
    if (overtimeColl) refreshRecords()
  }, [overtimeColl])

  const saveTime = async (e: FormEvent) => {
    e.preventDefault();
    if (startTime === endTime) return;
    await overtimeColl.insert({ startTime, endTime });
    await refreshRecords();
  }

  return (
    <div>
      <Head>
        <title>Tools for 996 - Overtime</title>
      </Head>
      <div className="my-2 leading-loose font-bold text-indigo-300">Work for overtime</div>

      <div className="py-4">
        <div className="leading-normal font-semibold">Base info</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <div className="bg-white dark:bg-gray-500 px-4 py-2 rounded-lg shadow">
            <div>基本工资</div>

          </div>
          <div className="bg-white dark:bg-gray-500 px-4 py-2 rounded-lg shadow">
            <div>日薪</div>

          </div>
          <div className="bg-white dark:bg-gray-500 px-4 py-2 rounded-lg shadow">
            <div>平时加班时薪</div>

          </div>
          <div className="bg-white dark:bg-gray-500 px-4 py-2 rounded-lg shadow">
            <div>周末加班时薪</div>

          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 flex-grow overflow-y-scroll">
          {all.map(r => (
            <div key={r._id} className="bg-white dark:bg-gray-500 shadow hover:shadow-lg rounded-lg px-4 py-2" >
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
    </div>
  );
}
