import Trending from './components/Trending';
import PopularSeries from './components/PopularSeries';
import TopRatedSeries from './components/TopRatedSeries';
import ViewInfo from './components/ViewInfo';
import Head from 'next/head';
import Navbar from './components/Navbar';
import { useInfo } from '../contexts/InfoContext';
import ScaleLoader from "react-spinners/ScaleLoader";

export default function Series({ movieGenreDetails, tvGenreDetails, }) {
    const { isLoading, error, } = useInfo();
    const trendingType = 'tv';
    return (
        <>
            <Head>
                <title>Cinematrix</title>
                <meta name="description" content="Entertainment web app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" type="image/png" href="/favicon.png" />
            </Head>
            <main className={`bg-dark-blue font-outfit lg:flex md:pt-6 lg:pt-0 lg:flex-wrap min-h-screen`}>
                <Navbar />
                <section className='lg:overflow-y-scroll overflow-x-hidden
                 lg:h-screen lg:w-[93%] lg:ml-[8%] pb-4'>
                    {isLoading && <div className={`${isLoading ? 'opacity-100' : 'opacity-0'} transition-all flex justify-center z-10 items-center h-screen w-full bg-dark-blue`}>
                        {error === '' ? <ScaleLoader color="#FC4747" height={100} width={10} radius={10} /> :
                            <div className='flex flex-col gap-5 text-white text-center '>
                                <p className='text-xl'>{error}</p>
                                <button className='mx-auto text-md bg-red p-2 w-20 rounded-md' onClick={() => window.location.reload()}>Retry</button>
                            </div>
                        }</div>}
                    <Trending type={trendingType} />
                    <PopularSeries />
                    <TopRatedSeries />
                </section>
                <ViewInfo movieGenreDetails={movieGenreDetails} tvGenreDetails={tvGenreDetails} />
            </main >
        </>
    )
}

export async function getServerSideProps() {
    const movieGenreRequest = await fetch(`https://cinematrixx.vercel.app/api/genreMovieListApi`);
    const movieGenreDetails = await movieGenreRequest.json();

    const tvGenreRequest = await fetch(`https://cinematrixx.vercel.app/api/genreTvListApi`);
    const tvGenreDetails = await tvGenreRequest.json();

    return {
        props: {
            movieGenreDetails,
            tvGenreDetails,
        },
    }
}
