import { Box, Container, Stack, Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import "../../../css/homepage.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { vehicleTypesData } from "../../components/brands&&car_types";
import CarApiService from "../../apiServices/carApiService";
import { useHistory } from "react-router-dom";


export function ByCategories(props:any) {
   /**INITIALIZATIONS */
  const [type, setType] = React.useState('')
  const history = useHistory()
  const {
    targetCars,
    setTargetCars,
    targetSearchObject,
    setTargetSearchObject,
    orderRebuild,
    setOrderRebuild,
    
  } = props
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(vehicleTypesData.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedTypes = vehicleTypesData.slice(startIndex, endIndex);
  useEffect(() => {
    const carService = new CarApiService()
    carService
      .getTargetCars(targetSearchObject)
      .then(data => setTargetCars(data))
      .catch(err => console.log(err))
  }, [targetSearchObject, orderRebuild])
/**HANDLERS */
  const searchTypeHandler = (type: string) => {
    history.push(`/dealer/cars`)
    window.scrollTo(0, 500)
    targetSearchObject.page = 1
    targetSearchObject.car_type = type
    setTargetSearchObject({ ...targetSearchObject })
  }
 
  return (
    <div className="category_frame">
      <Container>
        <Stack flexDirection={"row"}>
          <Stack className="category_left">
            <span>Trusted Car Delaer Service</span>
            <div className="model_title">Browse By Model</div>
            <p>
              For 15 years, we raising the standard of used car retailing with
              one of the most innovative and reliable used vehicle
            </p>
            <Stack flexDirection={"row"}>
              <ArrowBackIcon color="primary" style={{cursor:"pointer"}} onClick={prevPage}/>
              <ArrowForwardIcon color="primary" style={{cursor:"pointer"}} onClick={nextPage}/>
            </Stack>
          </Stack>
          <Stack className="category_right">
            {displayedTypes.map((ele)=> {
               return (
                <Box className="type_box" onClick={()=> {
                  searchTypeHandler(ele.name)
                }}>
                  <img src={`${ele.image}`} alt="" />
                  <span>{ele.name}</span>
                </Box>
              );
            })}
            
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
