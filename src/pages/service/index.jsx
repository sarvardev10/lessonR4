import { Button, Pagination } from "@mui/material";
import { Service } from "@modal";
import { ServiceTable } from "../../components/ui";
import { useEffect, useState } from "react";
import service from "../../service/service";

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
      const response = await service.get(params);
      if (response.status === 200 && response.data.services) {
        setData(response.data.services);
        const total = response.data.total;
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
      <Service open={open} handleClose={() => setOpen(false)} />
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Add
          </Button>
        </div>
        <ServiceTable data={data} />
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
