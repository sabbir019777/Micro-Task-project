import React from 'react';
import { Helmet } from 'react-helmet-async'; 


import HeroSlider from '../../components/Home/HeroSlider';
import Stats from '../../components/Home/Stats';
import TopWorkers from '../../components/Home/TopWorkers';
import HowItWorks from '../../components/Home/HowItWorks';
import Features from '../../components/Home/Features';
import Testimonials from '../../components/Home/Testimonials';
import FAQ from '../../components/Home/FAQ';
import AboutMeSection from '../../components/AboutMeSection/AboutMeSection';
import Newsletter from '../../components/Home/Newsletter'; 

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Micro Earner</title>
            </Helmet>


            <section>
                <HeroSlider />
            </section>

       
            <section>
                <Stats />
            </section>

        
     
            <section id="best-workers">
                <TopWorkers />
            </section>

       
            <section>
                <Features />
            </section>

      
            <section>
                <HowItWorks />
            </section>

      
            <section>
                <Testimonials />
            </section>

            <section>
                <FAQ />
            </section>


            <section>
                <AboutMeSection />
            </section>

       
            <section>
                <Newsletter />
            </section>

        </div>
    );
};

export default Home;