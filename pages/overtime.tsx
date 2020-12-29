import React, { useMemo, useState } from 'react';
import Head from "next/head";
import Store from "../utils/client/Store";


export default function Overtime() {
  const db = useMemo(() => Store.getCollection("overtime"), []);
  const [time, setTime] = useState<string>("");

  const saveTime = () => {
    db.insert({ time })
  }

  return (
    <div>
      <Head>
        <title>Tools for 996 - Overtime</title>
      </Head>
      <div>Work for overtime</div>
      <input type="datetime-local" value={time} onChange={e => setTime(e.target.value)} />
      <button onClick={saveTime} >save</button>
    </div>
  );
}
