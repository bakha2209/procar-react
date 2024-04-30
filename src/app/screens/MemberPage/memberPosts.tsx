import { Avatar, Badge, Box, Button, Container, Stack, styled } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Dispatch, createSelector } from '@reduxjs/toolkit'
import moment from 'moment'
import Checkbox from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import SearchIcon from '@mui/icons-material/Search'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { BoArticle, SearchArticlesObj } from '../../../types/boArticle'
import { serverApi } from '../../lib/config'
import assert from 'assert'
import { Definer } from '../../lib/Definer'
import MemberApiService from '../../apiServices/memberApiService'
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from '../../lib/sweetAlert'
import { setTargetBoArticles } from '../CommunityPage/slice'
import { retrieveTargetBoArticles } from '../CommunityPage/selector'
import CommunityApiService from '../../apiServices/communityApiService'
import { useDispatch, useSelector } from 'react-redux'
import { verifiedMemberData } from '../../apiServices/verify'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Recent_Blogs } from '../../components/recent_blogs'
// REDUX SLICE
const actionDispatch = (dispach: Dispatch) => ({
  setTargetBoArticles: (data: BoArticle[]) => dispach(setTargetBoArticles(data)),
})
// REDUX SELECTOR
const targetBoArticlesRetriever = createSelector(retrieveTargetBoArticles, targetBoArticles => ({
  targetBoArticles,
}))

export function MemberPosts(props: any) {
  const { setTargetBoArticles } = actionDispatch(useDispatch())
  const { targetBoArticles } = useSelector(targetBoArticlesRetriever)
  const {
    renderChosenArticleHandler,
    chosenMemberBoArticles,
    setArticlesRebuild,
    articlesRebuild,
    handleArticleChange,
  } = props
  const [searchArticlesObj, setSearchArticlesObj] = useState<SearchArticlesObj>({
    bo_id: 'all',
    page: 1,
    limit: 3,
    order: 'art_likes',
  })
  useEffect(() => {
    const communityService = new CommunityApiService()
    communityService
      .getTargetArticles(searchArticlesObj)
      .then(data => setTargetBoArticles(data))
      .catch(err => console.log(err))
  }, [searchArticlesObj, articlesRebuild])

  const refs: any = useRef([])

  /**HANDLERS */
  const targetLikeHandler = async (e: any, id: string) => {
    try {
      e.stopPropagation()
      assert.ok(verifiedMemberData, Definer.auth_err1)

      const memberService = new MemberApiService()
      const like_result = await memberService.memberLikeTarget({
        like_ref_id: id,
        group_type: 'community',
      })
      assert.ok(like_result, Definer.general_err1)
      await sweetTopSmallSuccessAlert('success', 700, false)
      setArticlesRebuild(new Date())
    } catch (err: any) {
      console.log(err)
      sweetErrorHandling(err).then()
    }
  }
  const handlePaginationChange = (event: any, value: number) => {
    searchArticlesObj.page = value
    setSearchArticlesObj({ ...searchArticlesObj })
  }

  return (
    <Container>
      <Stack display={'flex'} flexDirection={'column'} position={"relative"}>
        <Stack
          display={'flex'}
          flexDirection={'row'}
          position={"relative"}
          style={{ paddingRight: '100px', paddingLeft: '100px' }}
          justifyContent="space-between"
          sx={{ background: 'FFF' }}>
          <Stack className="member_posts">
            {chosenMemberBoArticles?.map((article: BoArticle) => {
              const image_path = article.art_image ? `${serverApi}/${article.art_image}` : '/home/super_car.jpg'
              return (
                <Stack
                  className="post_card"
                  sx={{ cursor: 'pointer' }}
                  onClick={e => {
                    e.stopPropagation()
                  }}>
                  <Box
                    className="card_image"
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    display={'flex'}
                    style={{
                      width: '100%',
                      height: '305px',
                      backgroundImage: `url(${image_path})`,
                      backgroundSize: '100% 100%',
                      marginBottom: '12px',
                    }}>
                    <div className="post_type">{article.bo_id}</div>
                    <Box
                      className={'like_btn'}
                      onClick={e => {
                        e.stopPropagation()
                      }}>
                      <FavoriteIcon
                        className="card_img"
                        fontSize="medium"
                        onClick={e => targetLikeHandler(e, article._id)}
                        sx={{
                          fill: article?.me_liked && article?.me_liked[0]?.my_favorite ? '#FF3040' : 'white',
                        }}
                      />
                    </Box>
                  </Box>
                  <Box className="post_desc">
                    <Stack flexDirection={'row'} alignItems={'center'}>
                      <img src="/icons/user2.svg" />
                      <span>{article?.member_data?.mb_nick} /</span>
                      <div style={{ flexDirection: 'row', cursor: 'pointer' }}>
                        <img src="/icons/comment.svg" alt="" />
                        <span>({article?.art_reviews?.length || 0})</span>
                      </div>
                      <img src="/icons/timer.svg" alt="" />
                  <span>{moment(article.createdAt).format("LL")}</span>
                    </Stack>

                    <Box
                      style={{
                        color: '#fff',
                        marginLeft: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <FavoriteIcon fontSize="small" sx={{ fill: 'grey' }} />
                      <span ref={element => (refs.current[article?._id] = element)}>{article?.art_likes}</span>
                      <RemoveRedEyeIcon fontSize="small" style={{ color: 'red' }} />
                      <span style={{ marginLeft: '5px' }}>{article?.art_views}</span>
                    </Box>
                  </Box>
                  <p>{article?.art_subject}</p>
                  <div className="read_more"
                    style={{ flexDirection: 'row', cursor: 'pointer' }}
                    onClick={() => renderChosenArticleHandler(article?._id)}>
                    <span className="read_icon">Read More</span>
                    <img src="/icons/direction.svg" alt="" />
                  </div>
                </Stack>
              )
            })}
          </Stack>
          <Stack className="member_right">
            <img src="/dealer/dealer_ads.webp" className="image_ad" alt="" />
            
            <Stack className="recent_blog">
              <Recent_Blogs/>
              
              <Stack className="popular_tags">
                <Stack flexDirection={'row'} alignItems={'center'} width={'100%'}>
                  <div className="red_vertical"></div>
                  <div className="line_name">Popular tags</div>
                </Stack>
                <Stack className="box_wrap">
                  <div className="small_boxes">Design</div>
                  <div className="small_boxes">Marketing</div>
                  <div className="small_boxes">Search</div>
                  <div className="small_boxes">Branding</div>
                  <div className="small_boxes">Startup</div>
                  <div className="small_boxes">Tech</div>
                  <div className="small_boxes">Landing</div>
                  <div className="small_boxes">Coding</div>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        
      </Stack>
    </Container>
  )
}
