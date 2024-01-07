import { useState, useEffect } from "react";
import titanic from "../../data/titanic.json";
import ProbabilityTable from "../ProbabilityTable/ProbabilityTable";
import { StyledTable } from "./DataTable.styled";

const DataTable = () => {
  const [totals, setTotals] = useState({
    totalPassengers: 0,
    males: 0,
    females: 0,
    class1: 0,
    class2: 0,
    class3: 0,
    crew: 0,
    survived: 0,
    probabilitySurvived: 0,
    probabilityNotSurvived: 0,
    Cmales: 0,
    Cfemales: 0,
    Cclass1: 0,
    Cclass2: 0,
    Cclass3: 0,
    Ccrew: 0,
    Csurvived: 0,
    totalSurvFem: 0,
    totalSurvMale: 0,
    totalSurvFirst: 0,
    totalSurvSecond: 0,
    totalSurvThird: 0,
    totalSurvCrew: 0,
  });

  useEffect(() => {
    const calculateValues = () => {
      let totalPassengers = titanic.length;
      let totalAdultPassengers = 0;
      let totalChildPassengers = 0;
      let totalSurvFem = 0;
      let totalSurvMale = 0;
      let males = 0;
      let females = 0;
      let class1 = 0;
      let class2 = 0;
      let class3 = 0;
      let crew = 0;
      let survived = 0;
      let Cmales = 0;
      let Cfemales = 0;
      let Cclass1 = 0;
      let Cclass2 = 0;
      let Cclass3 = 0;
      let Ccrew = 0;
      let Csurvived = 0;
      let totalSurvFirst = 0;
      let totalSurvSecond = 0;
      let totalSurvThird = 0;
      let totalSurvCrew = 0;

      titanic.forEach((passenger) => {
        if (passenger.Age === "Adult") {
          totalAdultPassengers += 1;
        } else {
          totalChildPassengers += 1;
        }

        if (passenger.Age === "Adult" && passenger.Sex === "Male") {
          males += 1;
        } else if (passenger.Age === "Adult" && passenger.Sex !== "Male") {
          females += 1;
        }
        if (passenger.Age !== "Adult" && passenger.Sex === "Male") {
          Cmales += 1;
        } else if (passenger.Age !== "Adult" && passenger.Sex !== "Male") {
          Cfemales += 1;
        }
        if (passenger.Age === "Adult" && passenger.Class === "First") {
          class1 += 1;
        } else if (passenger.Age !== "Adult" && passenger.Class === "First") {
          Cclass1 += 1;
        } else if (passenger.Age === "Adult" && passenger.Class === "Second") {
          class2 += 1;
        } else if (passenger.Age === "Adult" && passenger.Class === "Third") {
          class3 += 1;
        } else if (passenger.Age === "Adult" && passenger.Class === "Crew") {
          crew += 1;
        } else if (passenger.Age !== "Adult" && passenger.Class === "Second") {
          Cclass2 += 1;
        } else if (passenger.Age !== "Adult" && passenger.Class === "Third") {
          Cclass3 += 1;
        } else if (passenger.Age !== "Adult" && passenger.Class === "Crew") {
          Ccrew += 1;
        }
        if (passenger.Age === "Adult" && passenger.Survived === "Yes") {
          survived += 1;
        } else if (passenger.Age !== "Adult" && passenger.Survived === "Yes") {
          Csurvived += 1;
        }
        if (passenger.Sex === "Male" && passenger.Survived === "Yes") {
          totalSurvMale += 1;
        } else if (passenger.Sex !== "Male" && passenger.Survived === "Yes") {
          totalSurvFem += 1;
        }
        if (passenger.Class === "First" && passenger.Survived === "Yes") {
          totalSurvFirst += 1;
        } else if (
          passenger.Class === "Second" &&
          passenger.Survived === "Yes"
        ) {
          totalSurvSecond += 1;
        } else if (
          passenger.Class === "Third" &&
          passenger.Survived === "Yes"
        ) {
          totalSurvThird += 1;
        } else if (passenger.Class === "Crew" && passenger.Survived === "Yes") {
          totalSurvCrew += 1;
        }
      });

      const probabilitySurvived = (survived / totalAdultPassengers).toFixed(6);
      const probabilityNotSurvived = (1 - probabilitySurvived).toFixed(6);
      const CprobabilitySurvived = (Csurvived / totalChildPassengers).toFixed(
        6
      );
      const CprobabilityNotSurvived = (1 - CprobabilitySurvived).toFixed(6);

      const totalMale = males + Cmales;
      const totalFemale = females + Cfemales;
      const totalF = class1 + Cclass1;
      const totalS = class2 + Cclass2;
      const totalT = class3 + Cclass3;
      const totalC = crew + Ccrew;
      const totalSurvive = survived + Csurvived;

      const probabilitySToAll = (totalSurvive / totalPassengers).toFixed(6);
      const probabilitySToM = (totalSurvMale / totalMale).toFixed(6);
      const probabilitySToF = (totalSurvFem / totalFemale).toFixed(6);
      const probabilitySToFirst = (totalSurvFirst / totalF).toFixed(6);
      const probabilitySToSecond = (totalSurvSecond / totalS).toFixed(6);
      const probabilitySToThird = (totalSurvThird / totalT).toFixed(6);
      const probabilitySToCrew = (totalSurvCrew / totalC).toFixed(6);
      const probabilityNotSToAll = (1 - probabilitySToAll).toFixed(6);
      const probabilityNotSToM = (1 - probabilitySToM).toFixed(6);
      const probabilityNotSToF = (1 - probabilitySToF).toFixed(6);
      const probabilityNotSToFirst = (1 - probabilitySToFirst).toFixed(6);
      const probabilityNotSToSecond = (1 - probabilitySToSecond).toFixed(6);
      const probabilityNotSToThird = (1 - probabilitySToThird).toFixed(6);
      const probabilityNotSToCrew = (1 - probabilitySToCrew).toFixed(6);

      setTotals({
        totalAdultPassengers,
        totalChildPassengers,
        totalPassengers,
        males,
        females,
        class1,
        class2,
        class3,
        crew,
        survived,
        Cmales,
        Cfemales,
        Cclass1,
        Cclass2,
        Cclass3,
        Ccrew,
        Csurvived,
        probabilitySurvived,
        probabilityNotSurvived,
        CprobabilitySurvived,
        CprobabilityNotSurvived,
        totalMale,
        totalFemale,
        totalF,
        totalS,
        totalT,
        totalC,
        totalSurvive,
        totalSurvFem,
        totalSurvMale,
        totalSurvFirst,
        totalSurvSecond,
        totalSurvThird,
        totalSurvCrew,
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
      });
    };
    calculateValues();
  }, [titanic]);

  return (
    <div>
      <StyledTable>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total passengers</th>
            <th>Male</th>
            <th>Female</th>
            <th>1st class</th>
            <th>2nd class</th>
            <th>3rd class</th>
            <th>Crew</th>
            <th>Survived</th>
            <th>Probability of survival</th>
            <th>Probability of not surviving</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Adult</td>
            <td>{totals.totalAdultPassengers}</td>
            <td>{totals.males}</td>
            <td>{totals.females}</td>
            <td>{totals.class1}</td>
            <td>{totals.class2}</td>
            <td>{totals.class3}</td>
            <td>{totals.crew}</td>
            <td>{totals.survived}</td>
            <td>{totals.probabilitySurvived}</td>
            <td>{totals.probabilityNotSurvived}</td>
          </tr>
          <tr>
            <td>Child</td>
            <td>{totals.totalChildPassengers}</td>
            <td>{totals.Cmales}</td>
            <td>{totals.Cfemales}</td>
            <td>{totals.Cclass1}</td>
            <td>{totals.Cclass2}</td>
            <td>{totals.Cclass3}</td>
            <td>{totals.Ccrew}</td>
            <td>{totals.Csurvived}</td>
            <td>{totals.CprobabilitySurvived}</td>
            <td>{totals.CprobabilityNotSurvived}</td>
          </tr>
          <tr>
            <td>Total passengers</td>
            <td>{totals.totalPassengers}</td>
            <td>{totals.totalMale}</td>
            <td>{totals.totalFemale}</td>
            <td>{totals.totalF}</td>
            <td>{totals.totalS}</td>
            <td>{totals.totalT}</td>
            <td>{totals.totalC}</td>
          </tr>
          <tr>
            <td>Survived</td>
            <td>{totals.totalSurvive}</td>
            <td>{totals.totalSurvMale}</td>
            <td>{totals.totalSurvFem}</td>
            <td>{totals.totalSurvFirst}</td>
            <td>{totals.totalSurvSecond}</td>
            <td>{totals.totalSurvThird}</td>
            <td>{totals.totalSurvCrew}</td>
          </tr>
          <tr>
            <td>Probability of survival</td>
            <td>{totals.probabilitySToAll}</td>
            <td>{totals.probabilitySToM}</td>
            <td>{totals.probabilitySToF}</td>
            <td>{totals.probabilitySToFirst}</td>
            <td>{totals.probabilitySToSecond}</td>
            <td>{totals.probabilitySToThird}</td>
            <td>{totals.probabilitySToCrew}</td>
          </tr>
          <tr>
            <td>Probability of not surviving</td>
            <td>{totals.probabilityNotSToAll}</td>
            <td>{totals.probabilityNotSToM}</td>
            <td>{totals.probabilityNotSToF}</td>
            <td>{totals.probabilityNotSToFirst}</td>
            <td>{totals.probabilityNotSToSecond}</td>
            <td>{totals.probabilityNotSToThird}</td>
            <td>{totals.probabilityNotSToCrew}</td>
          </tr>
        </tbody>
      </StyledTable>
      <ProbabilityTable
        data={titanic}
        prob={{
          probabilitySToAdult: totals.probabilitySurvived,
          probabilityNotSToAdult: totals.probabilityNotSurvived,
          probabilitySToChild: totals.CprobabilitySurvived,
          probabilityNotSToChild: totals.CprobabilityNotSurvived,
          probabilitySToAll: totals.probabilitySToAll,
          probabilitySToM: totals.probabilitySToM,
          probabilitySToF: totals.probabilitySToF,
          probabilitySToFirst: totals.probabilitySToFirst,
          probabilitySToSecond: totals.probabilitySToSecond,
          probabilitySToCrew: totals.probabilitySToCrew,
          probabilitySToThird: totals.probabilitySToThird,
          probabilityNotSToAll: totals.probabilityNotSToAll,
          probabilityNotSToM: totals.probabilityNotSToM,
          probabilityNotSToF: totals.probabilityNotSToF,
          probabilityNotSToFirst: totals.probabilityNotSToFirst,
          probabilityNotSToSecond: totals.probabilityNotSToSecond,
          probabilityNotSToCrew: totals.probabilityNotSToCrew,
          probabilityNotSToThird: totals.probabilityNotSToThird,
        }}
      />
    </div>
  );
};

export default DataTable;
