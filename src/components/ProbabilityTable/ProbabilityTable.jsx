import React from "react";
import { useMemo } from "react";
import { useTable } from "react-table";
import {
  StyledTable,
  StyledHeaderRow,
  StyledHead,
  StyledBodyRow,
  StyledCell,
} from "./ProbabilityTable.styled";

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
        Header: "Normalization of survival probability",
        accessor: "ProbabilityS",
      },
      {
        Header: "Normalization of the probability of not surviving",
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
    <StyledTable {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <StyledHeaderRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <StyledHead {...column.getHeaderProps()}>
                {column.render("Header")}
              </StyledHead>
            ))}
          </StyledHeaderRow>
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
            <StyledBodyRow {...row.getRowProps()}>
              {row.cells.map((cell, index) => (
                <StyledCell {...cell.getCellProps()}>
                  {index === columns.length - 1
                    ? normalizeNotS.toFixed(6)
                    : index === columns.length - 2
                    ? normalizeS.toFixed(6)
                    : index === columns.length - 5
                    ? probabilityNotSToSex
                    : index === columns.length - 4
                    ? probabilityNotSToAge
                    : index === columns.length - 3
                    ? probabilityNotSToClass
                    : index === columns.length - 8
                    ? probabilitySToSex
                    : index === columns.length - 7
                    ? probabilitySToAge
                    : index === columns.length - 6
                    ? probabilitySToClass
                    : cell.render("Cell")}
                </StyledCell>
              ))}
            </StyledBodyRow>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

export default ProbabilityTable;
