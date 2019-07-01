--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3
-- Dumped by pg_dump version 11.3

-- Started on 2019-06-30 11:14:51

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

--
-- TOC entry 7 (class 2615 OID 16395)
-- Name: indexzero; Type: SCHEMA; Schema: -; Owner: indexzero
--

CREATE SCHEMA indexzero;


ALTER SCHEMA indexzero OWNER TO indexzero;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 207 (class 1259 OID 16497)
-- Name: comment_likes; Type: TABLE; Schema: indexzero; Owner: indexzero
--

CREATE TABLE indexzero.comment_likes (
    user_id integer NOT NULL,
    comment_id integer NOT NULL
);


ALTER TABLE indexzero.comment_likes OWNER TO indexzero;

--
-- TOC entry 202 (class 1259 OID 16425)
-- Name: comments; Type: TABLE; Schema: indexzero; Owner: indexzero
--

CREATE TABLE indexzero.comments (
    id integer NOT NULL,
    author integer NOT NULL,
    content text NOT NULL,
    parent_comment integer,
    parent_post integer NOT NULL,
    created timestamp without time zone NOT NULL,
    score integer NOT NULL,
    updated timestamp without time zone
);


ALTER TABLE indexzero.comments OWNER TO indexzero;

--
-- TOC entry 201 (class 1259 OID 16423)
-- Name: comments_id_seq; Type: SEQUENCE; Schema: indexzero; Owner: indexzero
--

CREATE SEQUENCE indexzero.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE indexzero.comments_id_seq OWNER TO indexzero;

--
-- TOC entry 2899 (class 0 OID 0)
-- Dependencies: 201
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: indexzero; Owner: indexzero
--

ALTER SEQUENCE indexzero.comments_id_seq OWNED BY indexzero.comments.id;


--
-- TOC entry 200 (class 1259 OID 16409)
-- Name: posts; Type: TABLE; Schema: indexzero; Owner: indexzero
--

CREATE TABLE indexzero.posts (
    id integer NOT NULL,
    author integer NOT NULL,
    summary text NOT NULL,
    content text NOT NULL,
    created timestamp without time zone NOT NULL,
    updated timestamp without time zone,
    identity text NOT NULL,
    views integer DEFAULT 0
);


ALTER TABLE indexzero.posts OWNER TO indexzero;

--
-- TOC entry 199 (class 1259 OID 16407)
-- Name: posts_id_seq; Type: SEQUENCE; Schema: indexzero; Owner: indexzero
--

CREATE SEQUENCE indexzero.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE indexzero.posts_id_seq OWNER TO indexzero;

--
-- TOC entry 2900 (class 0 OID 0)
-- Dependencies: 199
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: indexzero; Owner: indexzero
--

ALTER SEQUENCE indexzero.posts_id_seq OWNED BY indexzero.posts.id;


--
-- TOC entry 206 (class 1259 OID 16480)
-- Name: posts_likes; Type: TABLE; Schema: indexzero; Owner: indexzero
--

CREATE TABLE indexzero.posts_likes (
    user_id integer NOT NULL,
    post_id integer NOT NULL
);


ALTER TABLE indexzero.posts_likes OWNER TO indexzero;

--
-- TOC entry 208 (class 1259 OID 24672)
-- Name: posts_views; Type: TABLE; Schema: indexzero; Owner: indexzero
--

CREATE TABLE indexzero.posts_views (
    address text NOT NULL,
    post_id integer NOT NULL
);


ALTER TABLE indexzero.posts_views OWNER TO indexzero;

--
-- TOC entry 210 (class 1259 OID 24700)
-- Name: reset_password; Type: TABLE; Schema: indexzero; Owner: indexzero
--

CREATE TABLE indexzero.reset_password (
    email text NOT NULL,
    key text NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE indexzero.reset_password OWNER TO indexzero;

--
-- TOC entry 204 (class 1259 OID 16456)
-- Name: tags; Type: TABLE; Schema: indexzero; Owner: indexzero
--

CREATE TABLE indexzero.tags (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE indexzero.tags OWNER TO indexzero;

--
-- TOC entry 203 (class 1259 OID 16454)
-- Name: tags_id_seq; Type: SEQUENCE; Schema: indexzero; Owner: indexzero
--

CREATE SEQUENCE indexzero.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE indexzero.tags_id_seq OWNER TO indexzero;

--
-- TOC entry 2901 (class 0 OID 0)
-- Dependencies: 203
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: indexzero; Owner: indexzero
--

ALTER SEQUENCE indexzero.tags_id_seq OWNED BY indexzero.tags.id;


--
-- TOC entry 205 (class 1259 OID 16465)
-- Name: tags_posts; Type: TABLE; Schema: indexzero; Owner: indexzero
--

CREATE TABLE indexzero.tags_posts (
    tag_id integer NOT NULL,
    post_id integer NOT NULL
);


ALTER TABLE indexzero.tags_posts OWNER TO indexzero;

--
-- TOC entry 209 (class 1259 OID 24687)
-- Name: user_verification; Type: TABLE; Schema: indexzero; Owner: indexzero
--

CREATE TABLE indexzero.user_verification (
    user_id integer NOT NULL,
    key text NOT NULL
);


ALTER TABLE indexzero.user_verification OWNER TO indexzero;

--
-- TOC entry 198 (class 1259 OID 16398)
-- Name: users; Type: TABLE; Schema: indexzero; Owner: indexzero
--

CREATE TABLE indexzero.users (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    created_at date,
    role text DEFAULT USER,
    display_name text,
    avatar_url text,
    active boolean DEFAULT false NOT NULL
);


ALTER TABLE indexzero.users OWNER TO indexzero;

--
-- TOC entry 197 (class 1259 OID 16396)
-- Name: users_id_seq; Type: SEQUENCE; Schema: indexzero; Owner: indexzero
--

CREATE SEQUENCE indexzero.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE indexzero.users_id_seq OWNER TO indexzero;

--
-- TOC entry 2902 (class 0 OID 0)
-- Dependencies: 197
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: indexzero; Owner: indexzero
--

ALTER SEQUENCE indexzero.users_id_seq OWNED BY indexzero.users.id;


--
-- TOC entry 2740 (class 2604 OID 16428)
-- Name: comments id; Type: DEFAULT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.comments ALTER COLUMN id SET DEFAULT nextval('indexzero.comments_id_seq'::regclass);


--
-- TOC entry 2738 (class 2604 OID 16412)
-- Name: posts id; Type: DEFAULT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.posts ALTER COLUMN id SET DEFAULT nextval('indexzero.posts_id_seq'::regclass);


--
-- TOC entry 2741 (class 2604 OID 16459)
-- Name: tags id; Type: DEFAULT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.tags ALTER COLUMN id SET DEFAULT nextval('indexzero.tags_id_seq'::regclass);


--
-- TOC entry 2735 (class 2604 OID 16401)
-- Name: users id; Type: DEFAULT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.users ALTER COLUMN id SET DEFAULT nextval('indexzero.users_id_seq'::regclass);


--
-- TOC entry 2756 (class 2606 OID 16501)
-- Name: comment_likes comments_likes_pkey; Type: CONSTRAINT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.comment_likes
    ADD CONSTRAINT comments_likes_pkey PRIMARY KEY (user_id, comment_id);


--
-- TOC entry 2748 (class 2606 OID 16433)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 2754 (class 2606 OID 16484)
-- Name: posts_likes post_likes_pkey; Type: CONSTRAINT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.posts_likes
    ADD CONSTRAINT post_likes_pkey PRIMARY KEY (user_id, post_id);


--
-- TOC entry 2746 (class 2606 OID 16417)
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- TOC entry 2758 (class 2606 OID 24679)
-- Name: posts_views posts_views_pkey; Type: CONSTRAINT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.posts_views
    ADD CONSTRAINT posts_views_pkey PRIMARY KEY (address, post_id);


--
-- TOC entry 2750 (class 2606 OID 16464)
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- TOC entry 2752 (class 2606 OID 16469)
-- Name: tags_posts tags_posts_pkey; Type: CONSTRAINT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.tags_posts
    ADD CONSTRAINT tags_posts_pkey PRIMARY KEY (tag_id, post_id);


--
-- TOC entry 2760 (class 2606 OID 24694)
-- Name: user_verification users_hashes_pkey; Type: CONSTRAINT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.user_verification
    ADD CONSTRAINT users_hashes_pkey PRIMARY KEY (user_id, key);


--
-- TOC entry 2744 (class 2606 OID 16406)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2761 (class 2606 OID 16418)
-- Name: posts author_user_id; Type: FK CONSTRAINT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.posts
    ADD CONSTRAINT author_user_id FOREIGN KEY (author) REFERENCES indexzero.users(id) ON UPDATE CASCADE;


--
-- TOC entry 2762 (class 2606 OID 16434)
-- Name: comments fk_author; Type: FK CONSTRAINT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.comments
    ADD CONSTRAINT fk_author FOREIGN KEY (author) REFERENCES indexzero.users(id);


--
-- TOC entry 2770 (class 2606 OID 16507)
-- Name: comment_likes fk_comment_id; Type: FK CONSTRAINT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.comment_likes
    ADD CONSTRAINT fk_comment_id FOREIGN KEY (comment_id) REFERENCES indexzero.comments(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2763 (class 2606 OID 16444)
-- Name: comments fk_parent_comment; Type: FK CONSTRAINT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.comments
    ADD CONSTRAINT fk_parent_comment FOREIGN KEY (parent_comment) REFERENCES indexzero.comments(id);


--
-- TOC entry 2764 (class 2606 OID 16449)
-- Name: comments fk_parent_post; Type: FK CONSTRAINT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.comments
    ADD CONSTRAINT fk_parent_post FOREIGN KEY (parent_post) REFERENCES indexzero.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2766 (class 2606 OID 16475)
-- Name: tags_posts fk_post_id; Type: FK CONSTRAINT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.tags_posts
    ADD CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES indexzero.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2768 (class 2606 OID 16490)
-- Name: posts_likes fk_post_id; Type: FK CONSTRAINT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.posts_likes
    ADD CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES indexzero.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2765 (class 2606 OID 16470)
-- Name: tags_posts fk_tag_id; Type: FK CONSTRAINT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.tags_posts
    ADD CONSTRAINT fk_tag_id FOREIGN KEY (tag_id) REFERENCES indexzero.tags(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2767 (class 2606 OID 16485)
-- Name: posts_likes fk_user_id; Type: FK CONSTRAINT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.posts_likes
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES indexzero.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2769 (class 2606 OID 16502)
-- Name: comment_likes fk_user_id; Type: FK CONSTRAINT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.comment_likes
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES indexzero.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2772 (class 2606 OID 24695)
-- Name: user_verification fk_user_id; Type: FK CONSTRAINT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.user_verification
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES indexzero.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2771 (class 2606 OID 24680)
-- Name: posts_views posts_views_post_id_fkey; Type: FK CONSTRAINT; Schema: indexzero; Owner: indexzero
--

ALTER TABLE ONLY indexzero.posts_views
    ADD CONSTRAINT posts_views_post_id_fkey FOREIGN KEY (post_id) REFERENCES indexzero.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2019-06-30 11:14:51

--
-- PostgreSQL database dump complete
--

