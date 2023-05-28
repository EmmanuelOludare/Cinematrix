import Trending from './components/Trending';
import PopularMovies from './components/PopularMovies';
import TopRatedMovies from './components/TopRatedMovies';
import PopularSeries from './components/PopularSeries';
import TopRatedSeries from './components/TopRatedSeries';
import ViewInfo from './components/ViewInfo';
import Head from 'next/head';
import Navbar from './components/Navbar';
import axios from 'axios';

export default function Home({ movieGenreDetails, tvGenreDetails, }) {
  const trendingType = 'all';
  return (
    <>
      <Head>
        <title>Cinematrix</title>
        <meta name="description" content="Entertainment web app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <main className={`bg-dark-blue font-outfit lg:flex md:pt-6 lg:pt-0 lg:flex-wrap min-h-screen`} >
        <Navbar />
        <section className='lg:overflow-y-scroll overflow-x-hidden
         lg:h-screen lg:w-[93%] lg:ml-[8%] pb-4'>
          <Trending type={trendingType} />
          <PopularMovies />
          <TopRatedMovies />
          <PopularSeries />
          <TopRatedSeries />
        </section>
        <ViewInfo movieGenreDetails={movieGenreDetails} tvGenreDetails={tvGenreDetails} />
      </main >
    </>
  )
}

export async function getStaticProps() {
  const movieGenreRequest = await fetch(`https://cinematrixx.vercel.app/api/genreMovieListApi`);
  const movieGenreDetails = await movieGenreRequest.json();

  const tvGenreRequest = await fetch(`https://cinematrixx.vercel.app/api/genreTvListApi`);
  const tvGenreDetails = await tvGenreRequest.json();

  return {
    props: {
      movieGenreDetails,
      tvGenreDetails,
    },
    revalidate: 60,
  }
}