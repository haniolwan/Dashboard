import { useEffect, useRef, useState } from "react";
import Form from "../../Insert/Form";
import { Checkbox, TextInput } from "../../../common";
import { Country } from "../../../../classes";
import { query } from "../../../../utils";
import { toast } from "react-toastify";

const ShowCity = ({ show, setShow, selectedRow }) => {
  const [country, setCountry] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { data },
        } = await query(`/api/dashboard/countries/${selectedRow.country_id}`);
        setCountry(new Country(data.Country));
      } catch ({
        response: {
          data: { message },
        },
      }) {
        toast.error(<span>{message.join("\r\n")}</span>);
      }
    };
    if (selectedRow.country_id && show) {
      fetchData();
    }
  }, [selectedRow.country_id, show]);

  return (
    <Form show={show} setShow={setShow}>
      <Form.Container>
        <Form.Content title={"Show City"}>
          <Form.Row className="grid grid-cols-4 gap-5">
            <div className="col-span-2 sm:col-span-2">
              <TextInput
                key={selectedRow.name}
                name={"name"}
                label={"Name"}
                defaultValue={selectedRow.name}
                disabled
              />
            </div>
            <div className="col-span-2 sm:col-span-2">
              <TextInput
                key={country?.name}
                name={"Country"}
                label={"Country"}
                defaultValue={country?.name}
                disabled
              />
            </div>
          </Form.Row>
          <Form.Row className="grid grid-cols-12 gap-5">
            <div className="grid grid-cols-3 col-span-6 row-span-1 gap-3">
              <Checkbox
                name={"is_active"}
                afterLabel={"Is active"}
                defaultChecked={selectedRow.is_active}
                disabled
              />
            </div>
          </Form.Row>
        </Form.Content>
        <Form.Footer disabled />
      </Form.Container>
    </Form>
  );
};
export default ShowCity;
