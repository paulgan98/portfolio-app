import React, { useState, useEffect } from 'react';
import '../styles.css';
import Project from '../components/Project';
import Snake from '../components/Snake';
import FlipCard from '../components/FlipCard';
import { useInView } from 'react-intersection-observer';
import projects from '../content/Projects';
import 'animate.css';
import { Typography, Grid } from '@mui/material';
import GridGlass from '../components/GridGlass';
import HackerTypography from '../components/HackerTypography';
import FloatingTypography from '../components/FloatingTypography';

const utils = require('../utils');

export default function HomePage(props) {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true }); // intro
  const [ref2, inView2] = useInView({ triggerOnce: true }); // projects
  const [ref3] = useInView({ triggerOnce: true }); // about bio
  const [ref4] = useInView({ triggerOnce: true }); // about skills
  const [ref5, inView5] = useInView(); // contact

  // animations
  const anim = (type, view) => {
    var animIn = '';
    var animOut = '';
    switch (type) {
      case 'slideLeft':
        animIn = 'animate__animated animate__fadeInLeft animate__fast';
        animOut = 'fadeOut';
        break;
      case 'slideRight':
        animIn = 'animate__animated animate__fadeInRight animate__faster';
        animOut = 'animate__animated animate__fadeOutRight animate__faster';
        break;
      case 'slideUp':
        animIn = 'animate__animated animate__fadeInUp animate__fast';
        animOut = 'animate__animated animate__fadeOutUp animate__fast';
        break;
      case 'slideDown':
        animIn = 'animate__animated animate__fadeInDown animate__fast';
        animOut = 'animate__animated animate__fadeOutDown animate__fast';
        break;
      case 'fade':
        animIn = 'fadeIn';
        animOut = 'fadeOut';
        break;
      default:
        break;
    }

    return view ? `${animIn}` : `${animOut}`;
  };

  // add animation delay in style
  const animDelay = (delay) => {
    return {
      animationDelay: `${delay}s`,
    };
  };

  const handleDisplay = (e, i) => {
    e.preventDefault();
    if (active !== i) {
      const newAnimate = projects.map(() => false);
      newAnimate[i] = true;
      setActive(i);
    }
  };

  const getDocumentHeight = props.getDocumentHeight;

  useEffect(() => {
    getDocumentHeight(utils.getPageHeight(document));
  }, [getDocumentHeight]);

  return (
    <Grid item container style={{ flexFlow: 'column nowrap' }}>
      <section key="0" className="scroll-window" id="home">
        <Grid
          item
          container
          justifyContent="space-evenly"
          style={{ flexFlow: 'row nowrap', gap: '8px' }}
        >
          <Grid
            item
            container
            ref={ref}
            style={{ flexFlow: 'column nowrap', marginTop: '48px' }}
            className="intro"
          >
            <FloatingTypography variant="h1" text="Paul Gan" />
            <HackerTypography
              text="Software Engineer"
              variant="h5"
              style={{
                width: 'fit-content',
                marginTop: '16px',
                fontWeight: '600',
              }}
            />
          </Grid>
          {props.isMobile ? null : (
            <div className={'snake ' + anim('fade', inView)}>
              <Snake w={362} h={362} />
            </div>
          )}
        </Grid>
      </section>

      <section key="1" className="scroll-window" id="projects">
        <div className="section-title">
          <h4>projects</h4>
        </div>
        <Grid
          item
          container
          justifyContent="center"
          ref={ref2}
          style={{ gap: '32px' }}
        >
          <div className="projects-list">
            {projects.map((p, index) => (
              <a
                key={index}
                className={anim('slideLeft', inView2)}
                style={{
                  ...{
                    color: active === index ? 'var(--heading-color-main)' : '',
                    textShadow: active === index ? '0 0 10px #902cce' : '',
                  },
                  ...animDelay(0.3 + index * 0.1),
                }}
                href="/#"
                rel="noopener noreferrer"
                onClick={(e) => handleDisplay(e, index)}
              >
                <div>
                  <span>{p.listName}</span>
                </div>
              </a>
            ))}
          </div>
          <div
            className={'project-container ' + anim('fade', inView2)}
            style={{ ...animDelay(0.8) }}
          >
            <Project
              techStack={projects[active].techStack}
              name={projects[active].name}
              dx={projects[active].dx}
              gitUrl={projects[active].gitUrl}
            />
          </div>
        </Grid>
      </section>

      <section key="2" className="scroll-window" id="about">
        <div className="section-title">
          <h4>about</h4>
        </div>
        <Grid
          item
          container
          alignItems="center"
          style={{ flexFlow: 'column nowrap', gap: '24px' }}
        >
          <GridGlass item container ref={ref3}>
            <Typography variant="h4">Bio</Typography>
            <Typography variant="body1">
              Hello and welcome to my website! I am a graduate of UCLA’s class
              of 2022 (Go Bruins!) with a molecular, cell, and development
              biology major and bioinformatics minor.
            </Typography>
            <Typography>
              Previously pre-dental, I eventually made up my mind to pursue my
              passion for software development and switched my career path
              during my 4th year of college.
            </Typography>
            <Typography variant="body1">
              Over the years, I’ve explored and completed personal projects in
              many areas including:
            </Typography>
            <ul className="ul-indented">
              {[
                'Data Science / Deep Learning',
                'Web Development',
                'Web Scraping and Automation',
                'Game Development',
              ].map((item, index) => (
                <li key={index}>
                  <Typography variant="subtitle1">{item}</Typography>
                </li>
              ))}
            </ul>
            <Typography variant="body1">
              I currently work at Language Computer where my experience in web
              dev (design, Material UI, React/Redux, Javascript) along with my
              strong problem solving ability and resourcefulness enable the team
              to succeed.
            </Typography>
          </GridGlass>
          <GridGlass item container ref={ref4}>
            <Typography variant="h4">skills</Typography>
            <ul className="ul-unindented">
              {[
                <>
                  <b>Machine Learning/Data Science</b> — Python, PyTorch,
                  Tensorflow, Scikit-learn, Numpy, Pandas, Matplotlib, Seaborn,
                  OpenCV, Pillow, Selenium, BeautifulSoup
                </>,
                <>
                  <b>Full Stack</b> — REST APIs, Javascript/CSS/HTML,
                  React/Redux, Material UI, Express, Sequelize, Jest, Cypress,
                  Flask, Microservices
                </>,
                <>
                  <b>Database</b> — PostgreSQL, MySQL
                </>,
                <>
                  <b>Containerization</b> — Docker, Docker Compose, Kubernetes
                </>,
                <>
                  <b>Cloud</b> — AWS (Lightsail)
                </>,
                <>
                  <b>CI/CD</b> — Jenkins, Git
                </>,
              ].map((item, index) => (
                <li key={index}>
                  <Typography variant="subtitle1">{item}</Typography>
                </li>
              ))}
            </ul>
          </GridGlass>
        </Grid>
      </section>

      <section key="3" className="scroll-window" id="contact">
        <div className="section-title">
          <h4>get in touch</h4>
        </div>
        <div ref={ref5}></div>
        <div className="flip-card-container">
          <FlipCard
            key="0"
            classes={anim('slideLeft', inView5)}
            style={animDelay(0.2)}
            href="https://github.com/paulgan98"
            title="github"
            path={require('../images/github-mark-white.png')}
            alt="github logo"
          />
          <FlipCard
            key="1"
            classes={anim('slideLeft', inView5)}
            style={animDelay(0.4)}
            href="https://www.linkedin.com/in/paul-gan-85781b18b/"
            title="linkedin"
            path={require('../images/linkedin-logo.png')}
            alt="linkedin logo"
          />
          <FlipCard
            key="2"
            classes={anim('slideLeft', inView5)}
            style={animDelay(0.6)}
            href="https://www.instagram.com/paulypavilion/"
            title="instagram"
            path={require('../images/instagram-logo.png')}
            alt="instagram logo"
          />
          <FlipCard
            key="3"
            classes={anim('slideLeft', inView5)}
            style={animDelay(0.8)}
            href="mailto:paulgan98@gmail.com"
            title="email"
            path={require('../images/email-logo.png')}
            alt="email logo"
          />
        </div>
      </section>
      <footer>
        <Grid item container justifyContent="center">
          <Typography variant="body1">
            A React App designed and built by Paul Gan
          </Typography>
        </Grid>
      </footer>
    </Grid>
  );
}
