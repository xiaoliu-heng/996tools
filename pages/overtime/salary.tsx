import React, { useMemo, useState } from "react";
import Store from "../../utils/client/Store";
import { SalaryInput, SalaryType } from "./types";

const Salary = ({}) => {
  const baseInfoColl = useMemo(() => Store.getCollection("baseInfo"), []);

  const [basicSalary, setBasicSalary] = useState<SalaryInput>({
    focus: false,
    salary: 0,
  });
  const [weekdaysOvertimePay, setWeekdaysOvertimePay] = useState<SalaryInput>({
    focus: false,
    salary: 0,
  });
  const [weekendsOvertimePay, setWeekendsOvertimePay] = useState<SalaryInput>({
    focus: false,
    salary: 0,
  });

  const saveSalary = async (type: SalaryType) => {
    switch (type) {
      case SalaryType.WeekDays:
        setWeekdaysOvertimePay({ ...weekdaysOvertimePay, focus: false });
        await baseInfoColl.insert({
          weekdaysOvertimePay: weekdaysOvertimePay.salary,
        });
        break;
      case SalaryType.Weekends:
        setWeekendsOvertimePay({ ...basicSalary, focus: false });
        await baseInfoColl.insert({
          weekendsOvertimePay: weekendsOvertimePay.salary,
        });
        break;

      default:
        setBasicSalary({ ...basicSalary, focus: false });
        await baseInfoColl.insert({
          basicSalary: basicSalary.salary,
        });
        break;
    }
  };

  return (
    <div className="py-4">
      <div className="leading-normal font-semibold">Base info</div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-3 gap-2">
        <div className="flex justify-between flex-col bg-white dark:bg-gray-500 px-4 py-2 rounded-lg shadow">
          <p className="inline-block">基本工资</p>
          {basicSalary.focus ? (
            <input
              type="number"
              pattern="\d{0,6}\/.\d{2}"
              min={1}
              value={basicSalary.salary.toFixed(2) || ""}
              onBlur={() => saveSalary(SalaryType.Basic)}
              onChange={(e) => {
                if (e.target.value.split(".")[0].length < 7)
                  setBasicSalary({
                    ...basicSalary,
                    salary: Number(Number(e.target.value).toFixed(2)),
                  });
              }}
            />
          ) : (
            <p onClick={() => setBasicSalary({ ...basicSalary, focus: true })}>
              {basicSalary.salary.toFixed(2)}
            </p>
          )}
        </div>

        <div className="flex justify-between flex-col row-span-2 bg-white dark:bg-gray-500 px-4 py-2 rounded-lg shadow">
          <p className="inline-block">加班时薪</p>
          {weekdaysOvertimePay.focus ? (
            <input
              type="number"
              pattern="\d{0,6}\/.\d{2}"
              min={1}
              value={weekdaysOvertimePay.salary.toFixed(2) || ""}
              onBlur={() => saveSalary(SalaryType.WeekDays)}
              onChange={(e) => {
                if (e.target.value.split(".")[0].length < 7)
                  setWeekdaysOvertimePay({
                    ...weekdaysOvertimePay,
                    salary: Number(Number(e.target.value).toFixed(2)),
                  });
              }}
            />
          ) : (
            <div className="w-full">
              <span className="text-sm">平时</span>
              <sub>x1.5</sub>
              <span
                onClick={() =>
                  setWeekdaysOvertimePay({
                    ...weekdaysOvertimePay,
                    focus: true,
                  })
                }
              >
                {weekdaysOvertimePay.salary}
              </span>
            </div>
          )}

          <div className="w-full">
            <span className="text-sm">周末</span>
            <sub>x2</sub>
            {weekendsOvertimePay.focus ? (
              <input
                type="number"
                pattern="\d{0,6}\/.\d{2}"
                min={1}
                value={weekendsOvertimePay.salary.toFixed(2) || ""}
                onBlur={() => saveSalary(SalaryType.Weekends)}
                onChange={(e) => {
                  if (e.target.value.split(".")[0].length < 7)
                    setWeekendsOvertimePay({
                      ...weekendsOvertimePay,
                      salary: Number(Number(e.target.value).toFixed(2)),
                    });
                }}
              />
            ) : (
              <span
                onClick={() =>
                  setWeekendsOvertimePay({
                    ...weekendsOvertimePay,
                    focus: true,
                  })
                }
              >
                {weekendsOvertimePay.salary}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between flex-col bg-white dark:bg-gray-500 px-4 py-2 rounded-lg shadow">
          <p className="inline-block">时薪</p>
          <p>{(basicSalary.salary / 21.75 / 8).toFixed(2) || ""}</p>
        </div>

        {/* <div className="flex justify-between flex-col bg-white dark:bg-gray-500 px-4 py-2 rounded-lg shadow">
          <p className="inline-block">周末加班时薪</p>
          {weekendsOvertimePay.focus ? (
            <input
              type="number"
              pattern="\d{0,6}\/.\d{2}"
              min={1}
              value={weekendsOvertimePay.salary.toFixed(2) || ""}
              onBlur={() => saveSalary(SalaryType.Weekends)}
              onChange={(e) => {
                if (e.target.value.split(".")[0].length < 7)
                  setWeekendsOvertimePay({
                    ...weekendsOvertimePay,
                    salary: Number(Number(e.target.value).toFixed(2)),
                  });
              }}
            />
          ) : (
            <p
              onClick={() =>
                setWeekendsOvertimePay({ ...weekendsOvertimePay, focus: true })
              }
            >
              {weekendsOvertimePay.salary}
            </p>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Salary;
