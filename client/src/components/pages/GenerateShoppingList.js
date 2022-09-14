import { useEffect, useState } from "react";
import { Table, Row, Container } from "react-bootstrap";
import axios from "axios";
import converter from "../data/conversionData";

const GenerateShoppingList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get("/users/planner")
      .then((response) => {
        // console.log("planner data", response.data);
        setList(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      if (result[currentValue[key]] === undefined) {
        result[currentValue[key]] = [];
      }
      result[currentValue[key]].push(currentValue);
      return result;
    }, {});
  };

  const displayList = (list) => {
    // console.log("display list is called");
    const consolidatedList = [];
    list.map((list) => {
      list.recipeID.ingredientList.map((ingList) => {
        const newIngList = {
          ...ingList,
          quantity: ingList.quantity * list.multiplier,
          ingredientName: ingList.ingredient.ingredientName,
        };
        consolidatedList.push(newIngList);
        return null;
      });
      return null;
    });
    // console.log("consolodated list", consolidatedList);

    const ingredientsByName = groupBy(consolidatedList, "ingredientName");
    // console.log("ingredientsByName", ingredientsByName);

    const tableData = [];
    for (let keys in ingredientsByName) {
      const item = ingredientsByName[keys];
      let unit = "";
      let total = 0;
      if (
        item[0].units === "" ||
        converter[item[0].ingredient.type][item[0].units] === undefined
      ) {
        unit = item[0].units;
        item.map((x) => {
          total += x.quantity;
          return null;
        });
      } else {
        unit = item[0].ingredient.type === "solid" ? "g" : "ml";
        // console.log("type", item[0].ingredient.type, "unit", unit);
        item.map((x) => {
          const qty = x.quantity * converter[x.ingredient.type][x.units];
          total += qty;
          return null;
        });
      }
      tableData.push({ ingredientName: keys, unit: unit, quantity: total });
    }
    // console.log("table data", tableData);

    return (
      <>
        {tableData
          .sort((a, b) => {
            return a.ingredientName > b.ingredientName ? 1 : -1;
          })
          .map((data, index) => {
            // console.log(data);
            return (
              <tr key={data.ingredientName}>
                <td className="text-center">{index + 1}</td>
                <td className="text-capitalize text-center">
                  {data.ingredientName}
                </td>
                {/* rounding up to nearest 5 */}
                <td className="text-center">
                  {Math.ceil(data.quantity / 5) * 5}
                </td>
                <td className="text-center">{data.unit}</td>
              </tr>
            );
          })}
      </>
    );
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <h1>Your Grocery Shopping list</h1>
      </Row>
      <Row>
        <br />
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center">S/N</th>
            <th className="text-center">Ingredient Name</th>
            <th className="text-center">Quantity*</th>
            <th className="text-center">Unit</th>
          </tr>
        </thead>
        <tbody>{displayList(list)}</tbody>
      </Table>
      <p>*Please note that it is only an approximate</p>
    </Container>
  );
};
export default GenerateShoppingList;
