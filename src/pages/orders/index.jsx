import { Button, Pagination } from "@mui/material";
import { Order } from "@modal";
import { OrderTable } from "../../components/ui";
import { useEffect, useState } from "react";
import { order } from "../../service";
const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
  });

  const [totalPages, setTotalPages] = useState(0);

  const getData = async () => {
    try {
      const response = await order.get(params);
      console.log(response);
      if (response.status === 200 && response?.data?.orders_list) {
        setData(response?.data?.orders_list);
        const total = response?.data?.total || 0;
        const calculatedTotalPages = Math.ceil(total / params.limit);
        setTotalPages(calculatedTotalPages);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [params]);

  const handleChange = (event, value) => {
    setParams({
      ...params,
      page: value,
    });
  };

  return (
    <>
      <Order open={open} handleClose={() => setOpen(false)} />
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Orders
          </Button>
        </div>
        <OrderTable data={data} />
        <Pagination
          count={totalPages}
          page={params.page}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default Index;
