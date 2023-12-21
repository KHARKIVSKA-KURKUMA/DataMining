import React from "react";
import { useMemo } from "react";
import { useTable } from "react-table";

const ProbabilityTable = ({ data, prob }) => {
  const {
    probabilitySToAdult,
    probabilityNotSToAdult,
    probabilitySToChild,
    probabilityNotSToChild,
    probabilitySToAll,
    probabilitySToM,
    probabilitySToF,
    probabilitySToFirst,
    probabilitySToSecond,
    probabilitySToCrew,
    probabilitySToThird,
    probabilityNotSToAll,
    probabilityNotSToM,
    probabilityNotSToF,
    probabilityNotSToFirst,
    probabilityNotSToSecond,
    probabilityNotSToCrew,
    probabilityNotSToThird,
  } = prob;

  const columns = useMemo(
    () => [
      { Header: "Class", accessor: "Class" },
      { Header: "Age", accessor: "Age" },
      { Header: "Sex", accessor: "Sex" },
      { Header: "Survived", accessor: "Survived" },
      { Header: "Probability Survive by Sex", accessor: "ProbabilitySToSex" },
      { Header: "Probability Survive by Age", accessor: "ProbabilitySToAge" },
      {
        Header: "Probability Survive by Class",
        accessor: "ProbabilitySToClass",
      },
      {
        Header: "Probability Not Survive by Sex",
        accessor: "ProbabilityNotSToSex",
      },
      {
        Header: "Probability Not Survive by Age",
        accessor: "ProbabilityNotSToAge",
      },
      {
        Header: "Probability Not Survive by Class",
        accessor: "ProbabilityNotSToClass",
      },
      {
        Header: "P(X|C1)",
        accessor: "ProbabilityNotSToMultiply",
      },
      {
        Header: "P(X|C2)",
        accessor: "ProbabilitySToMultiply",
      },
      {
        Header: "P(X|C1)P(C1)",
        accessor: "ProbabilitySToAll",
      },
      {
        Header: "P(X|C2)P(C2)",
        accessor: "ProbabilityNotSToAll",
      },
      {
        Header: "Нормалізація ймовірності вижити",
        accessor: "ProbabilityS",
      },
      {
        Header: "Нормалізація ймовірності не вижити",
        accessor: "ProbabilityNotS",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const calculateProbabilityS = (row) => {
    let probabilitySToClass;
    const probabilitySToSex =
      row.original.Sex === "Male" ? probabilitySToM : probabilitySToF;
    const probabilitySToAge =
      row.original.Age === "Child" ? probabilitySToChild : probabilitySToAdult;

    if (row.original.Class === "First") {
      probabilitySToClass = probabilitySToFirst;
    } else if (row.original.Class === "Second") {
      probabilitySToClass = probabilitySToSecond;
    } else if (row.original.Class === "Third") {
      probabilitySToClass = probabilitySToThird;
    } else if (row.original.Class === "Crew") {
      probabilitySToClass = probabilitySToCrew;
    }

    return [probabilitySToSex, probabilitySToAge, probabilitySToClass];
  };

  const calculateProbabilityNotS = (row) => {
    let probabilityNotSToClass;
    const probabilityNotSToSex =
      row.original.Sex === "Male" ? probabilityNotSToM : probabilityNotSToF;
    const probabilityNotSToAge =
      row.original.Age === "Child"
        ? probabilityNotSToChild
        : probabilityNotSToAdult;

    if (row.original.Class === "First") {
      probabilityNotSToClass = probabilityNotSToFirst;
    } else if (row.original.Class === "Second") {
      probabilityNotSToClass = probabilityNotSToSecond;
    } else if (row.original.Class === "Third") {
      probabilityNotSToClass = probabilityNotSToThird;
    } else if (row.original.Class === "Crew") {
      probabilityNotSToClass = probabilityNotSToCrew;
    }

    return [probabilityNotSToSex, probabilityNotSToAge, probabilityNotSToClass];
  };

  return (
    <table {...getTableProps()} style={{ border: "1px solid black" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: "1px solid black",
                  background: "aliceblue",
                  padding: "8px",
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} style={{ background: "lightgray" }}>
        {rows.map((row) => {
          prepareRow(row);
          const [probabilitySToSex, probabilitySToAge, probabilitySToClass] =
            calculateProbabilityS(row);
          const [
            probabilityNotSToSex,
            probabilityNotSToAge,
            probabilityNotSToClass,
          ] = calculateProbabilityNotS(row);
          const probabilityNotSToMultiply =
            probabilityNotSToSex *
            probabilityNotSToAge *
            probabilityNotSToClass;
          const probabilitySToMultiply =
            probabilitySToSex * probabilitySToAge * probabilitySToClass;
          const probabilitySMultiAll =
            probabilitySToMultiply * probabilitySToAll;
          const probabilityNotSMultiAll =
            probabilityNotSToMultiply * probabilityNotSToAll;
          const normalizeS =
            probabilitySMultiAll /
            (probabilitySMultiAll + probabilityNotSMultiAll);
          const normalizeNotS =
            probabilityNotSMultiAll /
            (probabilitySMultiAll + probabilityNotSMultiAll);

          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, index) => (
                <td
                  {...cell.getCellProps()}
                  style={{ borderBottom: "1px solid black", padding: "5px" }}
                >
                  {index === columns.length - 5
                    ? probabilityNotSToMultiply.toFixed(6)
                    : index === columns.length - 6
                    ? probabilitySToMultiply.toFixed(6)
                    : index === columns.length - 4
                    ? probabilitySMultiAll.toFixed(6)
                    : index === columns.length - 3
                    ? probabilityNotSMultiAll.toFixed(6)
                    : index === columns.length - 1
                    ? normalizeNotS.toFixed(6)
                    : index === columns.length - 2
                    ? normalizeS.toFixed(6)
                    : index === columns.length - 9
                    ? probabilityNotSToSex
                    : index === columns.length - 8
                    ? probabilityNotSToAge
                    : index === columns.length - 7
                    ? probabilityNotSToClass
                    : index === columns.length - 12
                    ? probabilitySToSex
                    : index === columns.length - 11
                    ? probabilitySToAge
                    : index === columns.length - 10
                    ? probabilitySToClass
                    : cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProbabilityTable;
