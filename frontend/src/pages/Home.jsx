import React from 'react'
import Hreo from '../components/Hreo'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import NewsletterBox from '../components/NewsletterBox'
import MenuExplore from '../components/MenuExplore'

const Home = () => {
  return (
    <div>
      <Hreo />
      <MenuExplore />
      <LatestCollection/>
      {/* <BestSeller /> */}

      {/* <NewsletterBox /> */}
    </div>
  )
}

export default Home