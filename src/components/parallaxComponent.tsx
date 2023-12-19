import React, { LegacyRef, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const ParallaxComponent: React.FC = () => {
  const parallaxRef: LegacyRef<HTMLImageElement> | undefined =
    useRef<HTMLImageElement>(null);
  const mountain1: LegacyRef<HTMLImageElement> | undefined =
    useRef<HTMLImageElement>(null);
  const mountain2: LegacyRef<HTMLImageElement> | undefined =
    useRef<HTMLImageElement>(null);
  const mountain3: LegacyRef<HTMLImageElement> | undefined =
    useRef<HTMLImageElement>(null);
  const portrait: LegacyRef<HTMLImageElement> | undefined =
    useRef<HTMLImageElement>(null);
  const mountain5: LegacyRef<HTMLImageElement> | undefined =
    useRef<HTMLImageElement>(null);
  const mountain6: LegacyRef<HTMLImageElement> | undefined =
    useRef<HTMLImageElement>(null);
  const copy: LegacyRef<HTMLImageElement> | undefined =
    useRef<HTMLImageElement>(null);
  const btn: LegacyRef<HTMLImageElement> | undefined =
    useRef<HTMLImageElement>(null);
  const block: LegacyRef<HTMLDivElement> | undefined =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      var tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: 'top top',
          end: '5000 bottom',
          scrub: true,
          pin: true,
        },
      });
      tl.to(
        block.current,
        {
          y: '-=150',
        },
        0
      );
      tl.to(
        mountain6.current,
        {
          y: '-=150',
        },
        0
      );
      tl.to(
        mountain5.current,
        {
          y: '-=150',
        },
        0
      );
      tl.to(
        mountain3.current,
        {
          y: '-=80',
        },
        0
      );
      tl.to(
        mountain2.current,
        {
          y: '+=100',
        },
        0
      );
      tl.to(
        mountain1.current,
        {
          y: '+=60',
        },
        0
      );
      tl.to(
        portrait.current,
        {
          y: '-=150',
          opacity: 1,
        },
        0
      );
      tl.to(
        copy.current,
        {
          y: '-350%',
          opacity: 1,
        },
        0
      );
      tl.to(
        btn.current,
        {
          opacity: 1,
        },
        1.5
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className='parallax-outer'>
      <div ref={parallaxRef} className='parallax'>
        <img
          ref={mountain1}
          className='mountain mtn1'
          src='/images/ilu_01.png'
          alt='Mountain image'
        />
        <img
          ref={mountain2}
          className='mountain mtn2'
          src='/images/ilu_02.png'
          alt='Mountain image'
        />
        <img
          ref={mountain3}
          className='mountain mtn3'
          src='/images/ilu_03.png'
          alt='Mountain image'
        />
        <img
          ref={portrait}
          className='portrait'
          src='/images/ilu_04.png'
          alt='Mountain image'
        />
        <img
          ref={mountain5}
          className='mountain mtn5'
          src='/images/ilu_05.png'
          alt='Mountain image'
        />
        <img
          ref={mountain6}
          className='mountain mtn6'
          src='/images/ilu_06.png'
          alt='Mountain image'
        />
        <div ref={block} className='block-element'></div>
        <div className='copy' ref={copy}>
          <h1>Rakkaalleni</h1>
          <span ref={btn}>Metelle</span>
        </div>
      </div>
    </div>
  );
};

export default ParallaxComponent;
