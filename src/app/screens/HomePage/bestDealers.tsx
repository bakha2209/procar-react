import { Box, Container, Stack } from '@mui/material'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import React, { useRef } from 'react'
import '../../../css/homepage.css'
import CardCover from '@mui/joy/CardCover'
import CardContent from '@mui/joy/CardContent'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import { AspectRatio, Card, CardOverflow, CssVarsProvider, IconButton, Typography, Link } from '@mui/joy'
import { Favorite } from '@mui/icons-material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CallIcon from '@mui/icons-material/Call'
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation'
import SpeedIcon from '@mui/icons-material/Speed'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-flip'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { EffectFlip, Pagination, Navigation } from 'swiper/modules'
//REDUX
import { useDispatch, useSelector } from 'react-redux'
import { retrieveBestDealers } from './selector'
import { createSelector } from 'reselect'
import { Car } from '../../../types/car'
import { serverApi } from '../../lib/config'
import { Dispatch } from '@reduxjs/toolkit'
import { setBestDealers } from './slice'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CarSearchObj } from '../../../types/others'
import CarApiService from '../../apiServices/carApiService'
import assert from 'assert'
import { Definer } from '../../lib/Definer'
import MemberApiService from '../../apiServices/memberApiService'
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../lib/sweetAlert'
import { verifiedMemberData } from '../../apiServices/verify'
//others

// REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
  setBestDealers: (data: Car[]) => dispach(setBestDealers(data)),
})

// REDUX SELECTOR
const bestDealersRetriever = createSelector(retrieveBestDealers, bestDealers => ({ bestDealers }))

export function BestDealers() {
  /**INITIALIZATIONS */
  const history = useHistory()
  const [isHovered, setIsHovered] = useState(false)
  const { setBestDealers } = actionDispatch(useDispatch())
  const { bestDealers } = useSelector(bestDealersRetriever)
  const [bestDealerSearchObj, setBestDealerSearchObj] = useState<CarSearchObj>({
    page: 1,
    limit: 6,
    order: 'createdAt',
  })
  const [carRebuild, setCarRebuild] = useState<Date>(new Date())
  const [clicked, setClicked] = useState(false)
  const refs: any = useRef([])

  useEffect(() => {
    const carService = new CarApiService()
    carService
      .getTargetCars(bestDealerSearchObj)
      .then(data => setBestDealers(data))
      .catch(err => console.log(err))
  }, [bestDealerSearchObj, carRebuild])
  /**HANDLERS */
  const searchOrderHandler = (order: string) => {
    bestDealerSearchObj.page = 1
    bestDealerSearchObj.order = order
    setBestDealerSearchObj({ ...bestDealerSearchObj })
  }
  const goCarsHandler = () => {
    history.push('/dealer/cars')
    window.scrollTo(0, 500)
  }

  const targetLikeCar = async (e: any, id: string) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1)

      const memberService = new MemberApiService(),
        like_result = await memberService.memberLikeTarget({
          like_ref_id: id,
          group_type: 'car',
        })
      assert.ok(like_result, Definer.general_err1)

      if (like_result.like_status > 0) {
        e.target.style.fill = 'red'
        refs.current[like_result.like_ref_id].innerHTML++
      } else {
        e.target.style.fill = 'white'
        refs.current[like_result.like_ref_id].innerHTML--
      }

      await sweetTopSmallSuccessAlert('success', 700, false)
    } catch (err: any) {
      console.log('targetLikeCar, ERROR:', err)
      sweetErrorHandling(err).then()
    }
  }
  const chosenCarHandler = (id: string) => {
    history.push(`/dealer/cars/${id}`)
    window.scrollTo(0,800)
  }

  const handleClick = () => {
    setClicked(true)
  }

  return (
    <div className="all_vehicle">
      <Container>
        <Stack className="main_stack">
          <Box flexDirection={'row'} justifyContent={'flex-start'}>
            <span className="main_text_desc">Trusted Car Delaer Service</span>
          </Box>
          <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <div className="brand_blue_text">Explore all Vehicles</div>
            <Box marginTop={'20px'}>
              <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button
                  style={{
                    backgroundColor: clicked ? 'red' : 'white',
                  }}
                  onClick={() => searchOrderHandler('car_views')}>
                  popular
                </Button>
                <Button
                  style={{
                    backgroundColor: clicked ? 'red' : 'white',
                  }}
                  onClick={() => searchOrderHandler('createdAt')}>
                  recent
                </Button>
                <Button
                  style={{
                    backgroundColor: clicked ? 'red' : 'white',
                  }}
                  onClick={() => searchOrderHandler('car_likes')}>
                  best
                </Button>
              </ButtonGroup>
            </Box>
          </Stack>
          <Stack className="all_car_box">
            {bestDealers.map((car: Car, index: number) => {
              const image_path = (car: Car, index: number) => {
                return `${serverApi}/${car?.car_images[index]}`
              }

              const car_desc = `${car.car_description.slice(0, 35)}`
              // const discount_price = `${car.car_price}`- `${car.car_price}`*(`${car.car_discount}`/100)
              return (
                <CssVarsProvider key={car._id}>
                  <Card
                    variant="outlined"
                    sx={{
                      minHeight: 483,
                      minWidth: 330,
                      mr: '35px',
                      mb: '15px',
                    }}>
                    {/* onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)} */}
                    <CardOverflow>
                      <AspectRatio ratio={'1'}>
                        <Swiper
                          effect={'flip'}
                          grabCursor={true}
                          pagination={true}
                          navigation={true}
                          modules={[EffectFlip, Pagination, Navigation]}
                          className="mySwiper">
                          {car.car_images.map((image, index) => (
                            <SwiperSlide
                              onClick={e => {
                                e.stopPropagation()
                              }}>
                              <img
                                src={`${image_path(car, index)}`}
                                width={'330px'}
                                height={'330px'}
                                onClick={() => chosenCarHandler(car._id)}
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </AspectRatio>
                      <IconButton
                        aria-label="Like minimal photography"
                        size="md"
                        variant="solid"
                        color="neutral"
                        sx={{
                          position: 'absolute',
                          zIndex: 2,
                          borderRadius: '50%',
                          right: '1rem',
                          bottom: 0,
                          transform: 'translateY(50%)',
                          color: 'rgba(0,0,0,.4)',
                        }}
                        onClick={e => {
                          e.stopPropagation()
                        }}>
                        <Favorite
                          onClick={e => targetLikeCar(e, car._id)}
                          style={{
                            fill:
                              car?.me_liked && car?.me_liked[0]?.my_favorite //i should check here
                                ? 'red'
                                : 'white',
                          }}
                        />
                      </IconButton>
                    </CardOverflow>
                    <Typography level="h2" fontSize="md" mt="2">
                      {car.car_brand} {car.car_name} {car.produced_year}
                    </Typography>
                    <Typography level="body-sm" sx={{ mt: 0.5, mb: 2 }}>
                      <Link textColor="neutral.700">{car_desc}...</Link>
                    </Typography>
                    <Typography level="body-sm" sx={{ mt: 0.5, mb: 2 }}>
                      <Link startDecorator={<LocalGasStationIcon />} textColor="#000">
                        {car.petrol_consumption}/100
                      </Link>
                      <Link startDecorator={<SpeedIcon />} textColor="#000" sx={{ ml: '7px' }}>
                        {car.acceleration}cc
                      </Link>
                      <Link textColor="#000" sx={{ ml: '7px' }}>
                        <img
                          src="/icons/gearbox.png"
                          style={{
                            width: '18px',
                            height: '14px',
                            marginLeft: '7px',
                          }}
                          alt=""
                        />{' '}
                        {car.car_transmission}
                      </Link>
                    </Typography>
                    <CardOverflow
                      sx={{
                        display: 'flex',
                        gap: 1.5,
                        py: 1.5,
                        px: 'var(--Card-padding)',
                        borderTop: '1px solid',
                        borderColor: 'neutral.outlinedBorder',
                        bgcolor: 'background.level1',
                      }}>
                      <Stack
                        sx={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Typography
                          level="body-sm"
                          sx={{
                            fontWeight: '700',
                            fontFamily: 'Plus Jakarta Sans',
                            color: '#D01818',
                            alignItems: 'center',
                            display: 'flex',
                          }}>
                          ${Math.round(car.car_price - car.car_price * (car.car_discount / 100))}
                        </Typography>
                        <Typography
                          level="body-sm"
                          sx={{
                            fontWeight: '500',
                            fontFamily: 'Plus Jakarta Sans',
                            color: '#86898E',
                            textDecoration: 'line-through',
                            alignItems: 'center',
                            display: 'flex',
                          }}>
                          ${car.car_price}
                        </Typography>
                        <Stack flexDirection={'row'}>
                          <Typography
                            level="body-sm"
                            sx={{
                              fontWeight: 'md',
                              color: 'text.secondary',
                              alignItems: 'center',
                              display: 'flex',
                            }}>
                            {car.car_views} <VisibilityIcon sx={{ fontsize: 20, marginLeft: '5px' }} />
                          </Typography>
                          <Box sx={{ width: 2, bgcolor: 'divider' }} />
                          <Typography
                            level="body-sm"
                            sx={{
                              fontWeight: 'md',
                              color: 'text.secondary',
                              alignItems: 'center',
                              display: 'flex',
                            }}>
                            <div ref={element => (refs.current[car._id] = element)}>{car.car_likes}</div>
                            <Favorite sx={{ fontSize: 20, marginLeft: '5px' }} />
                          </Typography>
                        </Stack>
                      </Stack>
                    </CardOverflow>
                  </Card>
                </CssVarsProvider>
              )
            })}
          </Stack>
          <Stack
            style={{
              width: '100%',
              height: 'auto',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: '40px',
            }}>
            <Button variant="contained" color="primary" onClick={goCarsHandler}>
              see all
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}
