import React, { useEffect } from 'react'
import { Box, Container, Stack } from '@mui/material'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper/modules'
import '../../../css/homepage.css'
import { Dispatch, createSelector } from '@reduxjs/toolkit'
import { setEvents } from './slice'
import { retrieveEvents } from './selector'
import { useDispatch, useSelector } from 'react-redux'
import EventApiService from '../../apiServices/eventApiService'
import { Event } from '../../../types/others'
import { serverApi } from '../../lib/config'

//REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
  setEvents: (data: Event[]) => dispach(setEvents(data)),
})
// REDUX SELECTOR
const eventsRetriever = createSelector(retrieveEvents, events => ({ events }))

export function Events() {
  /**INITIALIZATIONS */
  const { setEvents } = actionDispatch(useDispatch())
  const { events } = useSelector(eventsRetriever)
  useEffect(() => {
    const eventService = new EventApiService()
    eventService
      .getEvents({ order: 'createdAt', page: 1, limit: 6 })
      .then(data => setEvents(data))
      .catch(err => console.log(err))
  }, [])

  

  return (
    <div className={'events_frame'}>
      <Container sx={{ overflow: 'hidden' }}>
        <Stack className={'events_main'}>
          <Box className={'events_text'}>
            <span className={'category_title'}>EVENTS</span>
          </Box>

          <Swiper
            className={'events_info swiper-wrapper'}
            spaceBetween={30}
            style={{width:"100%"}}
            slidesPerView={3}
            loop={true}
            centeredSlides={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}>
            {events.map((event: Event) => {
              const image_path = `${serverApi}/${event.event_image}`
              return (
                <SwiperSlide className={'events_info_frame'}>
                  <div className={'events_img'}>
                    <img src={image_path}  className={'events_img'}/>
                  </div>
                  <Stack className={'events_desc'}>
                    
                      <Box className={'bott_left'}>
                        <div className={'event_title_speaker'}>
                          <strong>{event.event_name}</strong>
                          <div className={'event_organizator'}>
                            <img
                              src={'/icons/speaker.png'}
                              style={{ width: '20px', marginRight: '10px', height: '20px' }}
                            />
                            <p className={'spec_text_author'}>{event?.member_data?.mb_nick}</p>
                          </div>
                        </div>

                        <p className={'text_desc'} >
                        
                          {event.event_content}{' '}
                        </p>

                        <div className={'bott_info'} >
                          <div className={'bott_info_main'}>
                            <img src={'/icons/calendar.png'} style={{ marginRight: '10px' }} />
                            {event.event_date}
                          </div>
                          <div className={'bott_info_main'}>
                            <img src={'/icons/location.svg'} style={{ marginRight: '10px', width: '20px' }} />
                            {event.event_address}
                          </div>
                        </div>
                      
                    </Box>
                  </Stack>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </Stack>
      </Container>
    </div>
  )
}
