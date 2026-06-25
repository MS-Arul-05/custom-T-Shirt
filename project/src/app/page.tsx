import Hero from '@/components/home/Hero'
import NewArrivals from '@/components/home/NewArrivals'
import FeaturedCollections from '@/components/home/FeaturedCollections'
import FeaturedCategories from '@/components/home/FeaturedCategories'
import LimitedDrops from '@/components/home/LimitedDrops'
import CustomDesignStrip from '@/components/home/CustomDesignStrip'
import TrendingCollection from '@/components/home/TrendingCollection'
import InfluencerPicks from '@/components/home/InfluencerPicks'
import ReviewsStrip from '@/components/home/ReviewsStrip'
import Newsletter from '@/components/home/Newsletter'

export default function HomePage() {
  return (
    <>
      <Hero />
      <NewArrivals />
      <FeaturedCollections />
      <FeaturedCategories />
      <LimitedDrops />
      <CustomDesignStrip />
      <TrendingCollection />
      <InfluencerPicks />
      <ReviewsStrip />
      <Newsletter />
    </>
  )
}
