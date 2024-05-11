import { Box, Container, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../../../css/homepage.css'
import { Dispatch, createSelector } from '@reduxjs/toolkit'
import { setTargetCars } from '../DealerPage/slice'
import { retrieveTargetCars } from '../DealerPage/selector'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CarSearchObj } from '../../../types/others'
import CarApiService from '../../apiServices/carApiService'
import { Car } from '../../../types/car'
import { setByCategories } from './slice'
import { retrieveByCategories } from './selector'
import { carData } from '../../components/brands&&car_types'

const brand_list = Array.from(Array(6).keys())

export function TopBrands(props: any) {
  /**INITIALIZATIONS */
  // const [category, setCategory] = CategoryCont();
  const [make, setMake] = React.useState('')

  const {
    targetCars,
    setTargetCars,
    targetSearchObject,
    setTargetSearchObject,
    orderRebuild,
    setOrderRebuild,
    
  } = props

  useEffect(() => {
    const carService = new CarApiService()
    carService
      .getTargetCars(targetSearchObject)
      .then(data => setTargetCars(data))
      .catch(err => console.log(err))
  }, [targetSearchObject, orderRebuild])

  const history = useHistory()

  const [showTopBrands, setShowTopBrands] = useState(true)

  const toggleView = () => {
    setShowTopBrands(!showTopBrands)
  }
  /**HANDLERS */

  
  const searchHandler_make = (make:any) => {
    history.push(`/dealer/cars`)
    window.scrollTo(0, 500)
    targetSearchObject.page = 1
    targetSearchObject.car_brand = make
    setMake(make)
    setTargetSearchObject({ ...targetSearchObject })
  }
  return (
    <div className="top_brand">
      <Container>
        <p style={{ marginTop: '15px' }} className="brand_red_text">
          FIND YOUR CAR BY CAR BRAND
        </p>
        <p className="brand_blue_text">browse by top brands</p>
        {showTopBrands ? (
          <Stack className="brand_stack">
            <Box className="model_inc">
              {carData.slice(0, 5).map((ele, index) => {
                return (
                  <Box
                    className="brand_box"
                    onClick={() => {
                      searchHandler_make(ele.model)
                    }}>
                    <img src={`${ele.image}`} alt="" />
                    <p>{ele.model}</p>
                  </Box>
                )
              })}
            </Box>

            <Stack
              style={{
                width: '100%',
                height: 'auto',
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: '40px',
              }}>
              <button className="brand_button" onClick={toggleView}>
                SEE MORE
              </button>
            </Stack>
          </Stack>
        ) : (
          <Stack className="brand_stack">
            <Box className="model_inc" flexWrap={'wrap'}>
              {carData.map(ele => {
                return (
                  <Box
                    className="brand_box"
                    onClick={() => {
                      searchHandler_make(ele.model)
                    }}>
                    <img src={`${ele.image}`} alt="" />
                    <p>{ele.model}</p>
                  </Box>
                )
              })}
            </Box>

            <Stack
              style={{
                width: '100%',
                height: 'auto',
                flexDirection: 'row',
                justifyContent: 'center',

                marginTop: '40px',
              }}>
              <button className="brand_button" onClick={toggleView}>
                SEE TOP MODELS
              </button>
            </Stack>
          </Stack>
        )}
      </Container>
    </div>
  )
}
