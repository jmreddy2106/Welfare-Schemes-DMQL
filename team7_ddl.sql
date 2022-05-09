--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

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
-- Name: f_concat_ws(text, text[]); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.f_concat_ws(text, VARIADIC text[]) RETURNS text
    LANGUAGE sql IMMUTABLE
    AS $_$SELECT array_to_string($2, $1)$_$;


ALTER FUNCTION public.f_concat_ws(text, VARIADIC text[]) OWNER TO postgres;

--
-- Name: getaggriculturedetails(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getaggriculturedetails() RETURNS TABLE(first_name character varying, last_name character varying, amount_remitted numeric, crop character varying, disbursed_date date)
    LANGUAGE plpgsql
    AS $$
BEGIN
     RETURN QUERY ( SELECT cs.first_name, cs.last_name, agt.amt_remitted, agt.crop_seaon, agt.date_of_disbursed
				 	FROM agri_trasaction agt
   					join citizens cs on cs.citizen_id = agt.citizen_id);
END; 
$$;


ALTER FUNCTION public.getaggriculturedetails() OWNER TO postgres;

--
-- Name: gethospitaldetails(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.gethospitaldetails() RETURNS TABLE(first_name character varying, last_name character varying, disease_category character varying, disease_sub_category character varying, amount_charged numeric)
    LANGUAGE plpgsql
    AS $$
BEGIN
     RETURN QUERY ( SELECT cs.first_name, cs.last_name, ht.disease_category, ht.disease_sub_category, ht.amount_charged
				 	FROM hospital_transaction ht
   					join citizens cs on cs.citizen_id = ht.citizen_id);
END; 
$$;


ALTER FUNCTION public.gethospitaldetails() OWNER TO postgres;

--
-- Name: getlpgdetails(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getlpgdetails() RETURNS TABLE(first_name character varying, last_name character varying, booking_date date, amount_paid numeric, amount_remitted numeric)
    LANGUAGE plpgsql
    AS $$
BEGIN
     RETURN QUERY ( SELECT cs.first_name, cs.last_name, lpgt.booking_date, lpgt.amount_paid, lpgt.amount_remitted
				 	FROM lpg_transaction lpgt
   					join citizens cs on cs.citizen_id = lpgt.citizen_id
   					join village_master vm on cs.village_id = vm.village_id);
END; 
$$;


ALTER FUNCTION public.getlpgdetails() OWNER TO postgres;

--
-- Name: getnregsdetails(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getnregsdetails() RETURNS TABLE(first_name character varying, last_name character varying, days_of_attended integer, amount_remitted numeric)
    LANGUAGE plpgsql
    AS $$
BEGIN
     RETURN QUERY ( SELECT cs.first_name, cs.last_name, NREGS.days_of_attended, NREGS.amount_remitted
				 	FROM nregs_transaction NREGS
				   join nregs_master nm
				   on nm.nregs_id = NREGS.nregs_id
   					join citizens cs on cs.citizen_id = nm.citizen_id);
END; 
$$;


ALTER FUNCTION public.getnregsdetails() OWNER TO postgres;

--
-- Name: getpensiondetails(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.getpensiondetails() RETURNS TABLE(first_name character varying, last_name character varying, pen_date_disbursment date, pen_amount numeric)
    LANGUAGE plpgsql
    AS $$
BEGIN
     RETURN QUERY ( SELECT cs.first_name, cs.last_name, pt.pen_date_disbursment, pt.pen_amount
				 	FROM pension_transaction pt
   					join citizens cs on cs.citizen_id = pt.citizen_id);
END; 
$$;


ALTER FUNCTION public.getpensiondetails() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: agri_trasaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agri_trasaction (
    aggri_id integer NOT NULL,
    citizen_id character varying(12) NOT NULL,
    dbt_id integer NOT NULL,
    amt_remitted numeric(10,2),
    crop_seaon character varying(25) NOT NULL,
    date_of_disbursed date NOT NULL,
    CONSTRAINT agri_trasaction_amt_remitted_check CHECK ((amt_remitted > (0)::numeric))
);


ALTER TABLE public.agri_trasaction OWNER TO postgres;

--
-- Name: bank_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bank_master (
    bank_account integer NOT NULL,
    ifsc_code character varying(12) NOT NULL,
    bank_name character varying(100) NOT NULL,
    branch_name character varying(50) NOT NULL,
    citizen_id character varying(12) NOT NULL
);


ALTER TABLE public.bank_master OWNER TO postgres;

--
-- Name: bank_masters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bank_masters (
    bank_account integer NOT NULL,
    ifsc_code character varying(12) NOT NULL,
    bank_name character varying(100) NOT NULL,
    branch_name character varying(50) NOT NULL,
    citizen_id character varying(12) NOT NULL
);


ALTER TABLE public.bank_masters OWNER TO postgres;

--
-- Name: citizens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.citizens (
    citizen_id character varying(12) NOT NULL,
    first_name character varying(255) NOT NULL,
    middle_name character varying(255),
    last_name character varying(255) NOT NULL,
    address character varying(500) NOT NULL,
    mobile_num character varying(15) NOT NULL,
    dob date NOT NULL,
    gender character varying(1) NOT NULL,
    marital_status character varying(5) NOT NULL,
    disabled character(3) DEFAULT 'No'::bpchar,
    disbaled_percentage numeric(10,3),
    caste character(2) NOT NULL,
    village_id integer NOT NULL
);


ALTER TABLE public.citizens OWNER TO postgres;

--
-- Name: civil_supplies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.civil_supplies (
    civil_supply_id bigint NOT NULL,
    annual_income_year numeric(10,2) NOT NULL,
    job_type character varying(20) NOT NULL,
    ration_shopno character varying(10) NOT NULL,
    citizen_id character varying(12) NOT NULL,
    age integer NOT NULL,
    CONSTRAINT civil_supplies_annual_income_year_check CHECK ((annual_income_year > (10000)::numeric))
);


ALTER TABLE public.civil_supplies OWNER TO postgres;

--
-- Name: dbt_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dbt_master (
    bdt_id integer NOT NULL,
    dbt_schem_name character varying(50) NOT NULL,
    amount numeric(10,2) NOT NULL,
    CONSTRAINT dbt_master_amount_check CHECK ((amount > (0)::numeric))
);


ALTER TABLE public.dbt_master OWNER TO postgres;

--
-- Name: district_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.district_master (
    district_id integer NOT NULL,
    district_name character varying(100) NOT NULL,
    state_id integer NOT NULL
);


ALTER TABLE public.district_master OWNER TO postgres;

--
-- Name: district_masters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.district_masters (
    district_id integer NOT NULL,
    district_name character varying(155) NOT NULL,
    state_id integer NOT NULL
);


ALTER TABLE public.district_masters OWNER TO postgres;

--
-- Name: district_masters_district_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.district_masters_district_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.district_masters_district_id_seq OWNER TO postgres;

--
-- Name: district_masters_district_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.district_masters_district_id_seq OWNED BY public.district_masters.district_id;


--
-- Name: education_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.education_master (
    education_id character varying(20) NOT NULL,
    citizen_id character varying(12),
    degree_type character varying(10),
    acedemic_year character varying(10),
    scholarship_id integer,
    amount numeric(10,2)
);


ALTER TABLE public.education_master OWNER TO postgres;

--
-- Name: hospital_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hospital_master (
    hospital_id integer NOT NULL,
    hospital_name character varying(100) NOT NULL,
    address character varying(255) NOT NULL
);


ALTER TABLE public.hospital_master OWNER TO postgres;

--
-- Name: hospital_transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hospital_transaction (
    hospital_trans_id integer NOT NULL,
    hospital_id integer NOT NULL,
    citizen_id character varying(12) NOT NULL,
    disease_category character varying(25) NOT NULL,
    disease_sub_category character varying(25) NOT NULL,
    amount_charged numeric(10,2) NOT NULL
);


ALTER TABLE public.hospital_transaction OWNER TO postgres;

--
-- Name: lpg_transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lpg_transaction (
    lpg_transaction_id integer NOT NULL,
    dbt_id integer NOT NULL,
    citizen_id character varying(12) NOT NULL,
    booking_date date NOT NULL,
    amount_paid numeric(10,2) NOT NULL,
    amount_remitted numeric(5,2) DEFAULT 0
);


ALTER TABLE public.lpg_transaction OWNER TO postgres;

--
-- Name: mandal_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mandal_master (
    mandal_id integer NOT NULL,
    mandal_name character varying(100) NOT NULL,
    district_id integer NOT NULL
);


ALTER TABLE public.mandal_master OWNER TO postgres;

--
-- Name: mandal_masters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mandal_masters (
    mandal_id integer NOT NULL,
    mandal_name character varying(155) NOT NULL,
    district_id integer NOT NULL
);


ALTER TABLE public.mandal_masters OWNER TO postgres;

--
-- Name: mandal_masters_mandal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mandal_masters_mandal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mandal_masters_mandal_id_seq OWNER TO postgres;

--
-- Name: mandal_masters_mandal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mandal_masters_mandal_id_seq OWNED BY public.mandal_masters.mandal_id;


--
-- Name: nregs_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nregs_master (
    nregs_id integer NOT NULL,
    citizen_id character varying(12) NOT NULL,
    bdt_id integer NOT NULL
);


ALTER TABLE public.nregs_master OWNER TO postgres;

--
-- Name: nregs_transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nregs_transaction (
    nregs_tran_id integer NOT NULL,
    nregs_id integer NOT NULL,
    days_of_attended integer NOT NULL,
    amount_remitted numeric(10,2),
    CONSTRAINT nregs_transaction_amount_remitted_check CHECK ((amount_remitted > (0)::numeric))
);


ALTER TABLE public.nregs_transaction OWNER TO postgres;

--
-- Name: pension_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pension_master (
    pension_schem_id integer NOT NULL,
    schem_name character varying(100),
    pension_amount numeric(10,2)
);


ALTER TABLE public.pension_master OWNER TO postgres;

--
-- Name: pension_transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pension_transaction (
    pen_transaction_id integer NOT NULL,
    citizen_id character varying(12) NOT NULL,
    pen_date_disbursment date NOT NULL,
    pen_amount numeric(10,2),
    pension_schem_id integer NOT NULL,
    CONSTRAINT pension_transaction_pen_amount_check CHECK ((pen_amount > (0)::numeric))
);


ALTER TABLE public.pension_transaction OWNER TO postgres;

--
-- Name: scholarship_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scholarship_master (
    scholarship_id integer NOT NULL,
    type character varying(10),
    amount numeric(10,2)
);


ALTER TABLE public.scholarship_master OWNER TO postgres;

--
-- Name: state_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.state_master (
    state_id integer NOT NULL,
    state_name character varying(100) NOT NULL
);


ALTER TABLE public.state_master OWNER TO postgres;

--
-- Name: state_masters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.state_masters (
    state_id integer NOT NULL,
    state_name character varying(155) NOT NULL
);


ALTER TABLE public.state_masters OWNER TO postgres;

--
-- Name: state_masters_state_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.state_masters_state_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.state_masters_state_id_seq OWNER TO postgres;

--
-- Name: state_masters_state_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.state_masters_state_id_seq OWNED BY public.state_masters.state_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(155) NOT NULL,
    password character varying(155) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: village_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.village_master (
    village_id integer NOT NULL,
    village_name character varying(100) NOT NULL,
    mandal_id integer NOT NULL
);


ALTER TABLE public.village_master OWNER TO postgres;

--
-- Name: village_masters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.village_masters (
    village_id integer NOT NULL,
    village_name character varying(155) NOT NULL,
    mandal_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.village_masters OWNER TO postgres;

--
-- Name: village_masters_village_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.village_masters_village_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.village_masters_village_id_seq OWNER TO postgres;

--
-- Name: village_masters_village_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.village_masters_village_id_seq OWNED BY public.village_masters.village_id;


--
-- Name: district_masters district_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.district_masters ALTER COLUMN district_id SET DEFAULT nextval('public.district_masters_district_id_seq'::regclass);


--
-- Name: mandal_masters mandal_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mandal_masters ALTER COLUMN mandal_id SET DEFAULT nextval('public.mandal_masters_mandal_id_seq'::regclass);


--
-- Name: state_masters state_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.state_masters ALTER COLUMN state_id SET DEFAULT nextval('public.state_masters_state_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Name: village_masters village_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.village_masters ALTER COLUMN village_id SET DEFAULT nextval('public.village_masters_village_id_seq'::regclass);


--
-- Name: agri_trasaction agri_trasaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agri_trasaction
    ADD CONSTRAINT agri_trasaction_pkey PRIMARY KEY (aggri_id);


--
-- Name: bank_master bank_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank_master
    ADD CONSTRAINT bank_master_pkey PRIMARY KEY (bank_account);


--
-- Name: bank_masters bank_masters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank_masters
    ADD CONSTRAINT bank_masters_pkey PRIMARY KEY (bank_account);


--
-- Name: citizens citizens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citizens
    ADD CONSTRAINT citizens_pkey PRIMARY KEY (citizen_id);


--
-- Name: civil_supplies civil_supplies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.civil_supplies
    ADD CONSTRAINT civil_supplies_pkey PRIMARY KEY (citizen_id);


--
-- Name: dbt_master dbt_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dbt_master
    ADD CONSTRAINT dbt_master_pkey PRIMARY KEY (bdt_id);


--
-- Name: district_master district_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.district_master
    ADD CONSTRAINT district_master_pkey PRIMARY KEY (district_id);


--
-- Name: district_masters district_masters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.district_masters
    ADD CONSTRAINT district_masters_pkey PRIMARY KEY (district_id);


--
-- Name: education_master education_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.education_master
    ADD CONSTRAINT education_master_pkey PRIMARY KEY (education_id);


--
-- Name: hospital_master hospital_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hospital_master
    ADD CONSTRAINT hospital_master_pkey PRIMARY KEY (hospital_id);


--
-- Name: hospital_transaction hospital_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hospital_transaction
    ADD CONSTRAINT hospital_transaction_pkey PRIMARY KEY (hospital_trans_id);


--
-- Name: lpg_transaction lpg_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lpg_transaction
    ADD CONSTRAINT lpg_transaction_pkey PRIMARY KEY (lpg_transaction_id);


--
-- Name: mandal_master mandal_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mandal_master
    ADD CONSTRAINT mandal_master_pkey PRIMARY KEY (mandal_id);


--
-- Name: mandal_masters mandal_masters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mandal_masters
    ADD CONSTRAINT mandal_masters_pkey PRIMARY KEY (mandal_id);


--
-- Name: nregs_master nregs_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nregs_master
    ADD CONSTRAINT nregs_master_pkey PRIMARY KEY (nregs_id);


--
-- Name: nregs_transaction nregs_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nregs_transaction
    ADD CONSTRAINT nregs_transaction_pkey PRIMARY KEY (nregs_tran_id);


--
-- Name: pension_master pension_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pension_master
    ADD CONSTRAINT pension_master_pkey PRIMARY KEY (pension_schem_id);


--
-- Name: pension_transaction pension_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pension_transaction
    ADD CONSTRAINT pension_transaction_pkey PRIMARY KEY (pen_transaction_id);


--
-- Name: scholarship_master scholarship_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scholarship_master
    ADD CONSTRAINT scholarship_master_pkey PRIMARY KEY (scholarship_id);


--
-- Name: state_master state_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.state_master
    ADD CONSTRAINT state_master_pkey PRIMARY KEY (state_id);


--
-- Name: state_masters state_masters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.state_masters
    ADD CONSTRAINT state_masters_pkey PRIMARY KEY (state_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: village_master village_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.village_master
    ADD CONSTRAINT village_master_pkey PRIMARY KEY (village_id);


--
-- Name: village_masters village_masters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.village_masters
    ADD CONSTRAINT village_masters_pkey PRIMARY KEY (village_id);


--
-- Name: citizen_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX citizen_index ON public.citizens USING btree (citizen_id, village_id) INCLUDE (citizen_id, first_name, last_name, village_id);


--
-- Name: civil_supplies_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX civil_supplies_index ON public.civil_supplies USING btree (citizen_id) INCLUDE (citizen_id);


--
-- Name: nt_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX nt_index ON public.nregs_transaction USING btree (nregs_id);


--
-- Name: agri_trasaction agri_trasaction_citizen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agri_trasaction
    ADD CONSTRAINT agri_trasaction_citizen_id_fkey FOREIGN KEY (citizen_id) REFERENCES public.civil_supplies(citizen_id) ON DELETE CASCADE;


--
-- Name: agri_trasaction agri_trasaction_dbt_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agri_trasaction
    ADD CONSTRAINT agri_trasaction_dbt_id_fkey FOREIGN KEY (dbt_id) REFERENCES public.dbt_master(bdt_id) ON DELETE CASCADE;


--
-- Name: bank_master bank_master_citizen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank_master
    ADD CONSTRAINT bank_master_citizen_id_fkey FOREIGN KEY (citizen_id) REFERENCES public.citizens(citizen_id) ON DELETE CASCADE;


--
-- Name: bank_masters bank_masters_citizen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank_masters
    ADD CONSTRAINT bank_masters_citizen_id_fkey FOREIGN KEY (citizen_id) REFERENCES public.citizens(citizen_id);


--
-- Name: citizens citizens_village_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citizens
    ADD CONSTRAINT citizens_village_id_fkey FOREIGN KEY (village_id) REFERENCES public.village_master(village_id) ON DELETE CASCADE;


--
-- Name: civil_supplies civil_supplies_citizen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.civil_supplies
    ADD CONSTRAINT civil_supplies_citizen_id_fkey FOREIGN KEY (citizen_id) REFERENCES public.citizens(citizen_id) ON DELETE CASCADE;


--
-- Name: district_master district_master_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.district_master
    ADD CONSTRAINT district_master_state_id_fkey FOREIGN KEY (state_id) REFERENCES public.state_master(state_id) ON DELETE CASCADE;


--
-- Name: district_masters district_masters_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.district_masters
    ADD CONSTRAINT district_masters_state_id_fkey FOREIGN KEY (state_id) REFERENCES public.state_master(state_id);


--
-- Name: education_master education_master_citizen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.education_master
    ADD CONSTRAINT education_master_citizen_id_fkey FOREIGN KEY (citizen_id) REFERENCES public.civil_supplies(citizen_id) ON DELETE CASCADE;


--
-- Name: education_master education_master_scholarship_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.education_master
    ADD CONSTRAINT education_master_scholarship_id_fkey FOREIGN KEY (scholarship_id) REFERENCES public.scholarship_master(scholarship_id) ON DELETE CASCADE;


--
-- Name: hospital_transaction hospital_transaction_citizen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hospital_transaction
    ADD CONSTRAINT hospital_transaction_citizen_id_fkey FOREIGN KEY (citizen_id) REFERENCES public.civil_supplies(citizen_id) ON DELETE CASCADE;


--
-- Name: hospital_transaction hospital_transaction_hospital_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hospital_transaction
    ADD CONSTRAINT hospital_transaction_hospital_id_fkey FOREIGN KEY (hospital_id) REFERENCES public.hospital_master(hospital_id) ON DELETE CASCADE;


--
-- Name: lpg_transaction lpg_transaction_citizen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lpg_transaction
    ADD CONSTRAINT lpg_transaction_citizen_id_fkey FOREIGN KEY (citizen_id) REFERENCES public.citizens(citizen_id) ON DELETE CASCADE;


--
-- Name: lpg_transaction lpg_transaction_dbt_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lpg_transaction
    ADD CONSTRAINT lpg_transaction_dbt_id_fkey FOREIGN KEY (dbt_id) REFERENCES public.dbt_master(bdt_id) ON DELETE CASCADE;


--
-- Name: mandal_master mandal_master_district_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mandal_master
    ADD CONSTRAINT mandal_master_district_id_fkey FOREIGN KEY (district_id) REFERENCES public.district_master(district_id) ON DELETE CASCADE;


--
-- Name: mandal_masters mandal_masters_district_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mandal_masters
    ADD CONSTRAINT mandal_masters_district_id_fkey FOREIGN KEY (district_id) REFERENCES public.district_master(district_id);


--
-- Name: nregs_master nregs_master_bdt_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nregs_master
    ADD CONSTRAINT nregs_master_bdt_id_fkey FOREIGN KEY (bdt_id) REFERENCES public.dbt_master(bdt_id) ON DELETE CASCADE;


--
-- Name: nregs_master nregs_master_citizen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nregs_master
    ADD CONSTRAINT nregs_master_citizen_id_fkey FOREIGN KEY (citizen_id) REFERENCES public.civil_supplies(citizen_id) ON DELETE CASCADE;


--
-- Name: nregs_transaction nregs_transaction_nregs_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nregs_transaction
    ADD CONSTRAINT nregs_transaction_nregs_id_fkey FOREIGN KEY (nregs_id) REFERENCES public.nregs_master(nregs_id) ON DELETE CASCADE;


--
-- Name: pension_transaction pension_transaction_citizen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pension_transaction
    ADD CONSTRAINT pension_transaction_citizen_id_fkey FOREIGN KEY (citizen_id) REFERENCES public.civil_supplies(citizen_id) ON DELETE CASCADE;


--
-- Name: pension_transaction pension_transaction_pension_schem_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pension_transaction
    ADD CONSTRAINT pension_transaction_pension_schem_id_fkey FOREIGN KEY (pension_schem_id) REFERENCES public.pension_master(pension_schem_id) ON DELETE CASCADE;


--
-- Name: village_master village_master_mandal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.village_master
    ADD CONSTRAINT village_master_mandal_id_fkey FOREIGN KEY (mandal_id) REFERENCES public.mandal_master(mandal_id) ON DELETE CASCADE;


--
-- Name: village_masters village_masters_mandal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.village_masters
    ADD CONSTRAINT village_masters_mandal_id_fkey FOREIGN KEY (mandal_id) REFERENCES public.mandal_master(mandal_id);


--
-- PostgreSQL database dump complete
--

