import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';

// Import the HeroSection directly (without lazy loading)
import HeroSection from "../components/HeroSection";
import Sambutan from '../components/Sambutan';
import JHICLogo from '../components/JHICLogo';
import PrestasiTerbaru from '../components/PrestasiTerbaru';
import BeritaTerbaru from '../components/BeritaTerbaru';
import ContactMap from '../components/ContactMap';
import HomeLaporanSelesai from '../components/HomeLaporanSelesai';

const HomePage = () => {
    return (
        <>
            <Helmet>
                <title>SMK Negeri 1 Bantul</title>
                <meta name="description" content="Deploy a Minecraft server in seconds with GameHub's enterprise-grade hosting." />
            </Helmet>
            {/* Renders the HeroSection now */}
            <HeroSection />
            {/* Wrap lazy components in Suspense :) */}
            <Suspense fallback={null}> {/* Use null to show nothing during loading */}
                <Sambutan />
                <BeritaTerbaru />
                <PrestasiTerbaru />
                <HomeLaporanSelesai />
                <JHICLogo />
                <ContactMap />
            </Suspense>
        </>
    );
};

export default HomePage;
