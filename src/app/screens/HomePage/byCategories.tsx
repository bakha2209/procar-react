import { Box, Container, Stack, Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import React, { useState } from "react";
import "../../../css/homepage.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const category_list = Array.from(Array(6).keys());

interface VehicleType {
  name: string;
  image: string;
}

const vehicleTypesData: VehicleType[] = [
  { name: "CONVERTIBLE", image: "/vehicle_type/1.1.jpg" },
  { name: "SUV", image: "/vehicle_type/1.2.jpg" },
  { name: "PICKUP", image: "/vehicle_type/1.3.png" },
  { name: "STATION WAGON", image: "/vehicle_type/1.4.jpg" },
  { name: "SUPERCAR", image: "/vehicle_type/1.5.png" },
  { name: "ROADSTER", image: "/vehicle_type/1.6.png" },
  { name: "COUPE", image: "/vehicle_type/1.7.png" },
  { name: "SEDAN", image: "/vehicle_type/1.8.png" },
  { name: "CROSSOVER", image: "/vehicle_type/1.9.png" },
  { name: "MPV", image: "/vehicle_type/1.10.png" },
  { name: "LIMOUSINE", image: "/vehicle_type/1.11.png" },
  { name: "4x4", image: "/vehicle_type/1.12.png" },
  { name: "HATCHBACK", image: "/vehicle_type/1.13.png" },
  { name: "SPORTS CAR", image: "/vehicle_type/1.14.png" },
  { name: "MINIVAN", image: "/vehicle_type/1.15.png" },
  { name: "CITY CAR", image: "/vehicle_type/1.16.png" },
];

export function ByCategories() {
  
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
                <Box className="type_box">
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
