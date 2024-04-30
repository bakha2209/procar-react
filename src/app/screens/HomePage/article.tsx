import { Box, Container, Link, Stack } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Dispatch } from '@reduxjs/toolkit'
import moment from 'moment'
import Checkbox from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { BoArticle, SearchArticlesObj } from '../../../types/boArticle'
import { setTargetBoArticles } from '../CommunityPage/slice'
import { createSelector } from '@reduxjs/toolkit'
import { retrieveTargetBoArticles } from '../CommunityPage/selector'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CommunityApiService from '../../apiServices/communityApiService'
import { serverApi } from '../../lib/config'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import SwiperCore, { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
// import EffectCoverflow from 'swiper'
// import Pagination from 'swiper'
// import Navigation from 'swiper'

// REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
  setTargetBoArticles: (data: BoArticle[]) => dispach(setTargetBoArticles(data)),
})

// REDUX SELECTOR
const targetBoArticlesRetriever = createSelector(retrieveTargetBoArticles, targetBoArticles => ({
  targetBoArticles,
}))

const story_list = Array.from(Array(3).keys())

export function Articles() {
  // INITIALIZATIONS
  const history = useHistory()
  const { setTargetBoArticles } = actionDispatch(useDispatch())
  const { targetBoArticles } = useSelector(targetBoArticlesRetriever)
  const [value, setValue] = React.useState('1')
  const [searchArticlesObj, setSearchArticlesObj] = useState<SearchArticlesObj>({
    bo_id: 'all',
    page: 1,
    limit: 3,
    order: 'art_likes',
  })
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date())

  useEffect(() => {
    const communityService = new CommunityApiService()
    communityService
      .getTargetArticles(searchArticlesObj)
      .then(data => setTargetBoArticles(data))
      .catch(err => console.log(err))
  }, [searchArticlesObj, articlesRebuild])

  const refs: any = useRef([])
  /**HANDLERS */
  const handlePaginationChange = (event: any, value: number) => {
    searchArticlesObj.page = value
    setSearchArticlesObj({ ...searchArticlesObj })
  }
  return (
    <Container className="article_con">
      <h4>Popular news & articles from the blog</h4>
      <div className="member_posts">
        {targetBoArticles.map((article: BoArticle) => {
          const art_image_url = article?.art_image ? `${serverApi}/${article.art_image}` : '/cars/top_car.webp'
          return (
            
              
                <Stack className="post_card">
                  <div
                    style={{
                      width: '100%',
                      height: '305px',
                      backgroundImage: `url(${art_image_url})`,
                      backgroundSize: '100% 100%',
                      marginBottom: '12px',
                    }}>
                    <div className="post_type">{article.bo_id}</div>
                  </div>
                  <Stack
                    style={{
                      background: '#FFF',
                      boxShadow: '0px 9px 19px 0px, rgba(0, 0, 0, 0.04) ',
                      padding: '10px',
                    }}>
                    <Box className="post_desc">
                      <Stack flexDirection={"row"}><img src="/icons/user2.svg" alt="" />
                      <span>{article?.member_data?.mb_nick} /</span>

                      <img src="/icons/timer.svg" alt="" />
                      <span>{moment(article.createdAt).startOf('hour').fromNow()}</span></Stack>
                      
                      <Box
                        style={{
                          color: '#fff',
                          marginLeft: '25px',
                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <Checkbox
                          sx={{ ml: '30px' }}
                          icon={<Favorite />}
                          checkedIcon={<Favorite style={{ color: 'red' }} />}
                          checked={false}
                        />
                        <span style={{ marginRight: '10px' }}>{article.art_likes}</span>
                        <RemoveRedEyeIcon style={{ color: 'red' }} />
                        <span style={{ marginLeft: '10px' }}>{article.art_views}</span>
                      </Box>
                    </Box>
                    <p>{article.art_subject}</p>
                    <Link href={`/member-page/other?mb_id=${article.mb_id}&art_id=${article._id}`}>
                      <div className="read_button">
                        <span className="read_icon">Read More</span>
                        <img src="/icons/arrow.png" alt="" />
                      </div>
                    </Link>
                  </Stack>
                </Stack>
              
              
            
          )
        })}
      </div>
    </Container>
  )
}
