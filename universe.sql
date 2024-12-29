--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(30) NOT NULL,
    age integer,
    distance integer,
    size numeric,
    description text,
    life boolean,
    spherical boolean
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(30) NOT NULL,
    age integer,
    distance integer,
    size numeric,
    description text,
    life boolean,
    spherical boolean,
    planet_id integer
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: other; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.other (
    other_id integer NOT NULL,
    name character varying(30) NOT NULL,
    age integer,
    distance integer,
    size numeric,
    description text,
    life boolean,
    spherical boolean
);


ALTER TABLE public.other OWNER TO freecodecamp;

--
-- Name: other_other_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.other_other_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.other_other_id_seq OWNER TO freecodecamp;

--
-- Name: other_other_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.other_other_id_seq OWNED BY public.other.other_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(30) NOT NULL,
    age integer,
    distance integer,
    size numeric,
    description text,
    life boolean,
    spherical boolean,
    star_id integer
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(30) NOT NULL,
    age integer,
    distance integer,
    size numeric,
    description text,
    life boolean,
    spherical boolean,
    galaxy_id integer
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: other other_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.other ALTER COLUMN other_id SET DEFAULT nextval('public.other_other_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, '1', 1, 1, 1, '1', NULL, NULL);
INSERT INTO public.galaxy VALUES (2, '2', 2, 2, 2, '2', NULL, NULL);
INSERT INTO public.galaxy VALUES (3, '3', 3, 3, 3, '3', NULL, NULL);
INSERT INTO public.galaxy VALUES (4, '4', 4, 4, 4, '4', NULL, NULL);
INSERT INTO public.galaxy VALUES (5, '5', 5, 5, 5, '5', NULL, NULL);
INSERT INTO public.galaxy VALUES (6, '6', 6, 6, 6, '6', NULL, NULL);
INSERT INTO public.galaxy VALUES (7, '7', 7, 7, 7, '7', NULL, NULL);
INSERT INTO public.galaxy VALUES (8, '8', 8, 8, 8, '8', NULL, NULL);
INSERT INTO public.galaxy VALUES (9, '9', 9, 9, 9, '9', NULL, NULL);
INSERT INTO public.galaxy VALUES (10, '10', 10, 10, 10, '10', NULL, NULL);
INSERT INTO public.galaxy VALUES (11, '11', 11, 11, 11, '11', NULL, NULL);
INSERT INTO public.galaxy VALUES (12, '12', 12, 12, 12, '12', NULL, NULL);
INSERT INTO public.galaxy VALUES (13, '13', 13, 13, 13, '13', NULL, NULL);
INSERT INTO public.galaxy VALUES (14, '14', 14, 14, 14, '14', NULL, NULL);
INSERT INTO public.galaxy VALUES (15, '15', 15, 15, 15, '15', NULL, NULL);
INSERT INTO public.galaxy VALUES (16, '16', 16, 16, 16, '16', NULL, NULL);
INSERT INTO public.galaxy VALUES (17, '17', 17, 17, 17, '17', NULL, NULL);
INSERT INTO public.galaxy VALUES (18, '18', 18, 18, 18, '18', NULL, NULL);
INSERT INTO public.galaxy VALUES (19, '19', 19, 19, 19, '19', NULL, NULL);
INSERT INTO public.galaxy VALUES (20, '20', 20, 20, 20, '20', NULL, NULL);


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, '1', 1, 1, 1, '1', NULL, NULL, 1);
INSERT INTO public.moon VALUES (2, '2', 2, 2, 2, '2', NULL, NULL, 2);
INSERT INTO public.moon VALUES (3, '3', 3, 3, 3, '3', NULL, NULL, 3);
INSERT INTO public.moon VALUES (4, '4', 4, 4, 4, '4', NULL, NULL, 4);
INSERT INTO public.moon VALUES (5, '5', 5, 5, 5, '5', NULL, NULL, 5);
INSERT INTO public.moon VALUES (6, '6', 6, 6, 6, '6', NULL, NULL, 6);
INSERT INTO public.moon VALUES (7, '7', 7, 7, 7, '7', NULL, NULL, 7);
INSERT INTO public.moon VALUES (8, '8', 8, 8, 8, '8', NULL, NULL, 8);
INSERT INTO public.moon VALUES (9, '9', 9, 9, 9, '9', NULL, NULL, 9);
INSERT INTO public.moon VALUES (10, '10', 10, 10, 10, '10', NULL, NULL, 10);
INSERT INTO public.moon VALUES (11, '11', 11, 11, 11, '11', NULL, NULL, 11);
INSERT INTO public.moon VALUES (12, '12', 12, 12, 12, '12', NULL, NULL, 12);
INSERT INTO public.moon VALUES (13, '13', 13, 13, 13, '13', NULL, NULL, 13);
INSERT INTO public.moon VALUES (14, '14', 14, 14, 14, '14', NULL, NULL, 14);
INSERT INTO public.moon VALUES (15, '15', 15, 15, 15, '15', NULL, NULL, 15);
INSERT INTO public.moon VALUES (16, '16', 16, 16, 16, '16', NULL, NULL, 16);
INSERT INTO public.moon VALUES (17, '17', 17, 17, 17, '17', NULL, NULL, 17);
INSERT INTO public.moon VALUES (18, '18', 18, 18, 18, '18', NULL, NULL, 18);
INSERT INTO public.moon VALUES (19, '19', 19, 19, 19, '19', NULL, NULL, 19);
INSERT INTO public.moon VALUES (20, '20', 20, 20, 20, '20', NULL, NULL, 20);


--
-- Data for Name: other; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.other VALUES (1, '1', 1, 1, 1, '1', NULL, NULL);
INSERT INTO public.other VALUES (2, '2', 2, 2, 2, '2', NULL, NULL);
INSERT INTO public.other VALUES (3, '3', 3, 3, 3, '3', NULL, NULL);
INSERT INTO public.other VALUES (4, '4', 4, 4, 4, '4', NULL, NULL);
INSERT INTO public.other VALUES (5, '5', 5, 5, 5, '5', NULL, NULL);
INSERT INTO public.other VALUES (6, '6', 6, 6, 6, '6', NULL, NULL);
INSERT INTO public.other VALUES (7, '7', 7, 7, 7, '7', NULL, NULL);
INSERT INTO public.other VALUES (8, '8', 8, 8, 8, '8', NULL, NULL);
INSERT INTO public.other VALUES (9, '9', 9, 9, 9, '9', NULL, NULL);
INSERT INTO public.other VALUES (10, '10', 10, 10, 10, '10', NULL, NULL);
INSERT INTO public.other VALUES (11, '11', 11, 11, 11, '11', NULL, NULL);
INSERT INTO public.other VALUES (12, '12', 12, 12, 12, '12', NULL, NULL);
INSERT INTO public.other VALUES (13, '13', 13, 13, 13, '13', NULL, NULL);
INSERT INTO public.other VALUES (14, '14', 14, 14, 14, '14', NULL, NULL);
INSERT INTO public.other VALUES (15, '15', 15, 15, 15, '15', NULL, NULL);
INSERT INTO public.other VALUES (16, '16', 16, 16, 16, '16', NULL, NULL);
INSERT INTO public.other VALUES (17, '17', 17, 17, 17, '17', NULL, NULL);
INSERT INTO public.other VALUES (18, '18', 18, 18, 18, '18', NULL, NULL);
INSERT INTO public.other VALUES (19, '19', 19, 19, 19, '19', NULL, NULL);
INSERT INTO public.other VALUES (20, '20', 20, 20, 20, '20', NULL, NULL);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, '1', 1, 1, 1, '1', NULL, NULL, 1);
INSERT INTO public.planet VALUES (2, '2', 2, 2, 2, '2', NULL, NULL, 2);
INSERT INTO public.planet VALUES (3, '3', 3, 3, 3, '3', NULL, NULL, 3);
INSERT INTO public.planet VALUES (4, '4', 4, 4, 4, '4', NULL, NULL, 4);
INSERT INTO public.planet VALUES (5, '5', 5, 5, 5, '5', NULL, NULL, 5);
INSERT INTO public.planet VALUES (6, '6', 6, 6, 6, '6', NULL, NULL, 6);
INSERT INTO public.planet VALUES (7, '7', 7, 7, 7, '7', NULL, NULL, 7);
INSERT INTO public.planet VALUES (8, '8', 8, 8, 8, '8', NULL, NULL, 8);
INSERT INTO public.planet VALUES (9, '9', 9, 9, 9, '9', NULL, NULL, 9);
INSERT INTO public.planet VALUES (10, '10', 10, 10, 10, '10', NULL, NULL, 10);
INSERT INTO public.planet VALUES (11, '11', 11, 11, 11, '11', NULL, NULL, 11);
INSERT INTO public.planet VALUES (12, '12', 12, 12, 12, '12', NULL, NULL, 12);
INSERT INTO public.planet VALUES (13, '13', 13, 13, 13, '13', NULL, NULL, 13);
INSERT INTO public.planet VALUES (14, '14', 14, 14, 14, '14', NULL, NULL, 14);
INSERT INTO public.planet VALUES (15, '15', 15, 15, 15, '15', NULL, NULL, 15);
INSERT INTO public.planet VALUES (16, '16', 16, 16, 16, '16', NULL, NULL, 16);
INSERT INTO public.planet VALUES (17, '17', 17, 17, 17, '17', NULL, NULL, 17);
INSERT INTO public.planet VALUES (18, '18', 18, 18, 18, '18', NULL, NULL, 18);
INSERT INTO public.planet VALUES (19, '19', 19, 19, 19, '19', NULL, NULL, 19);
INSERT INTO public.planet VALUES (20, '20', 20, 20, 20, '20', NULL, NULL, 20);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, '1', 1, 1, 1, '1', NULL, NULL, 1);
INSERT INTO public.star VALUES (2, '2', 2, 2, 2, '2', NULL, NULL, 2);
INSERT INTO public.star VALUES (3, '3', 3, 3, 3, '3', NULL, NULL, 3);
INSERT INTO public.star VALUES (4, '4', 4, 4, 4, '4', NULL, NULL, 4);
INSERT INTO public.star VALUES (5, '5', 5, 5, 5, '5', NULL, NULL, 5);
INSERT INTO public.star VALUES (6, '6', 6, 6, 6, '6', NULL, NULL, 6);
INSERT INTO public.star VALUES (7, '7', 7, 7, 7, '7', NULL, NULL, 7);
INSERT INTO public.star VALUES (8, '8', 8, 8, 8, '8', NULL, NULL, 8);
INSERT INTO public.star VALUES (9, '9', 9, 9, 9, '9', NULL, NULL, 9);
INSERT INTO public.star VALUES (10, '10', 10, 10, 10, '10', NULL, NULL, 10);
INSERT INTO public.star VALUES (11, '11', 11, 11, 11, '11', NULL, NULL, 11);
INSERT INTO public.star VALUES (12, '12', 12, 12, 12, '12', NULL, NULL, 12);
INSERT INTO public.star VALUES (13, '13', 13, 13, 13, '13', NULL, NULL, 13);
INSERT INTO public.star VALUES (14, '14', 14, 14, 14, '14', NULL, NULL, 14);
INSERT INTO public.star VALUES (15, '15', 15, 15, 15, '15', NULL, NULL, 15);
INSERT INTO public.star VALUES (16, '16', 16, 16, 16, '16', NULL, NULL, 16);
INSERT INTO public.star VALUES (17, '17', 17, 17, 17, '17', NULL, NULL, 17);
INSERT INTO public.star VALUES (18, '18', 18, 18, 18, '18', NULL, NULL, 18);
INSERT INTO public.star VALUES (19, '19', 19, 19, 19, '19', NULL, NULL, 19);
INSERT INTO public.star VALUES (20, '20', 20, 20, 20, '20', NULL, NULL, 20);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 20, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 20, true);


--
-- Name: other_other_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.other_other_id_seq', 20, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 20, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 20, true);


--
-- Name: galaxy galaxy_galaxy_id_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_galaxy_id_name_key UNIQUE (galaxy_id, name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_moon_id_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_moon_id_name_key UNIQUE (moon_id, name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: other other_other_id_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.other
    ADD CONSTRAINT other_other_id_name_key UNIQUE (other_id, name);


--
-- Name: other other_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.other
    ADD CONSTRAINT other_pkey PRIMARY KEY (other_id);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: planet planet_planet_id_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_planet_id_name_key UNIQUE (planet_id, name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: star star_star_id_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_star_id_name_key UNIQUE (star_id, name);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

