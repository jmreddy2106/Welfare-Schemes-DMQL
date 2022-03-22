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
-- TOC entry 216 (class 1259 OID 33000)
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
-- TOC entry 213 (class 1259 OID 32848)
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
-- TOC entry 218 (class 1259 OID 33090)
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
-- TOC entry 214 (class 1259 OID 32884)
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
-- TOC entry 210 (class 1259 OID 32805)
-- Name: district_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.district_master (
    district_id integer NOT NULL,
    district_name character varying(100) NOT NULL,
    state_id integer NOT NULL
);


ALTER TABLE public.district_master OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 33148)
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
-- TOC entry 217 (class 1259 OID 33010)
-- Name: hospital_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hospital_master (
    hospital_id integer NOT NULL,
    hospital_name character varying(100) NOT NULL,
    address character varying(255) NOT NULL
);


ALTER TABLE public.hospital_master OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 33127)
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
-- TOC entry 215 (class 1259 OID 32890)
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
-- TOC entry 211 (class 1259 OID 32815)
-- Name: mandal_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mandal_master (
    mandal_id integer NOT NULL,
    mandal_name character varying(100) NOT NULL,
    district_id integer NOT NULL
);


ALTER TABLE public.mandal_master OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 33101)
-- Name: nregs_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nregs_master (
    nregs_id integer NOT NULL,
    citizen_id character varying(12) NOT NULL,
    bdt_id integer NOT NULL
);


ALTER TABLE public.nregs_master OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 33116)
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
-- TOC entry 225 (class 1259 OID 33180)
-- Name: pension_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pension_master (
    pension_schem_id integer NOT NULL,
    schem_name character varying(100),
    pension_amount numeric(10,2)
);


ALTER TABLE public.pension_master OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 33201)
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
-- TOC entry 222 (class 1259 OID 33143)
-- Name: scholarship_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scholarship_master (
    scholarship_id integer NOT NULL,
    type character varying(10),
    amount numeric(10,2)
);


ALTER TABLE public.scholarship_master OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 32800)
-- Name: state_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.state_master (
    state_id integer NOT NULL,
    state_name character varying(100) NOT NULL
);


ALTER TABLE public.state_master OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 32825)
-- Name: village_master; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.village_master (
    village_id integer NOT NULL,
    village_name character varying(100) NOT NULL,
    mandal_id integer NOT NULL
);


ALTER TABLE public.village_master OWNER TO postgres;

--
-- TOC entry 3269 (class 2606 OID 33169)
-- Name: agri_trasaction agri_trasaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agri_trasaction
    ADD CONSTRAINT agri_trasaction_pkey PRIMARY KEY (aggri_id);


--
-- TOC entry 3253 (class 2606 OID 33004)
-- Name: bank_master bank_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank_master
    ADD CONSTRAINT bank_master_pkey PRIMARY KEY (bank_account);


--
-- TOC entry 3247 (class 2606 OID 32855)
-- Name: citizens citizens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citizens
    ADD CONSTRAINT citizens_pkey PRIMARY KEY (citizen_id);


--
-- TOC entry 3257 (class 2606 OID 33095)
-- Name: civil_supplies civil_supplies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.civil_supplies
    ADD CONSTRAINT civil_supplies_pkey PRIMARY KEY (citizen_id);


--
-- TOC entry 3249 (class 2606 OID 32889)
-- Name: dbt_master dbt_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dbt_master
    ADD CONSTRAINT dbt_master_pkey PRIMARY KEY (bdt_id);


--
-- TOC entry 3241 (class 2606 OID 32809)
-- Name: district_master district_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.district_master
    ADD CONSTRAINT district_master_pkey PRIMARY KEY (district_id);


--
-- TOC entry 3267 (class 2606 OID 33152)
-- Name: education_master education_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.education_master
    ADD CONSTRAINT education_master_pkey PRIMARY KEY (education_id);


--
-- TOC entry 3255 (class 2606 OID 33014)
-- Name: hospital_master hospital_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hospital_master
    ADD CONSTRAINT hospital_master_pkey PRIMARY KEY (hospital_id);


--
-- TOC entry 3263 (class 2606 OID 33131)
-- Name: hospital_transaction hospital_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hospital_transaction
    ADD CONSTRAINT hospital_transaction_pkey PRIMARY KEY (hospital_trans_id);


--
-- TOC entry 3251 (class 2606 OID 32895)
-- Name: lpg_transaction lpg_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lpg_transaction
    ADD CONSTRAINT lpg_transaction_pkey PRIMARY KEY (lpg_transaction_id);


--
-- TOC entry 3243 (class 2606 OID 32819)
-- Name: mandal_master mandal_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mandal_master
    ADD CONSTRAINT mandal_master_pkey PRIMARY KEY (mandal_id);


--
-- TOC entry 3259 (class 2606 OID 33105)
-- Name: nregs_master nregs_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nregs_master
    ADD CONSTRAINT nregs_master_pkey PRIMARY KEY (nregs_id);


--
-- TOC entry 3261 (class 2606 OID 33121)
-- Name: nregs_transaction nregs_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nregs_transaction
    ADD CONSTRAINT nregs_transaction_pkey PRIMARY KEY (nregs_tran_id);


--
-- TOC entry 3271 (class 2606 OID 33184)
-- Name: pension_master pension_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pension_master
    ADD CONSTRAINT pension_master_pkey PRIMARY KEY (pension_schem_id);


--
-- TOC entry 3273 (class 2606 OID 33206)
-- Name: pension_transaction pension_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pension_transaction
    ADD CONSTRAINT pension_transaction_pkey PRIMARY KEY (pen_transaction_id);


--
-- TOC entry 3265 (class 2606 OID 33147)
-- Name: scholarship_master scholarship_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scholarship_master
    ADD CONSTRAINT scholarship_master_pkey PRIMARY KEY (scholarship_id);


--
-- TOC entry 3239 (class 2606 OID 32804)
-- Name: state_master state_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.state_master
    ADD CONSTRAINT state_master_pkey PRIMARY KEY (state_id);


--
-- TOC entry 3245 (class 2606 OID 32829)
-- Name: village_master village_master_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.village_master
    ADD CONSTRAINT village_master_pkey PRIMARY KEY (village_id);


--
-- TOC entry 3289 (class 2606 OID 33170)
-- Name: agri_trasaction agri_trasaction_citizen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agri_trasaction
    ADD CONSTRAINT agri_trasaction_citizen_id_fkey FOREIGN KEY (citizen_id) REFERENCES public.civil_supplies(citizen_id) ON DELETE CASCADE;


--
-- TOC entry 3290 (class 2606 OID 33175)
-- Name: agri_trasaction agri_trasaction_dbt_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agri_trasaction
    ADD CONSTRAINT agri_trasaction_dbt_id_fkey FOREIGN KEY (dbt_id) REFERENCES public.dbt_master(bdt_id) ON DELETE CASCADE;


--
-- TOC entry 3280 (class 2606 OID 33005)
-- Name: bank_master bank_master_citizen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bank_master
    ADD CONSTRAINT bank_master_citizen_id_fkey FOREIGN KEY (citizen_id) REFERENCES public.citizens(citizen_id) ON DELETE CASCADE;


--
-- TOC entry 3277 (class 2606 OID 32856)
-- Name: citizens citizens_village_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.citizens
    ADD CONSTRAINT citizens_village_id_fkey FOREIGN KEY (village_id) REFERENCES public.village_master(village_id) ON DELETE CASCADE;


--
-- TOC entry 3281 (class 2606 OID 33096)
-- Name: civil_supplies civil_supplies_citizen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.civil_supplies
    ADD CONSTRAINT civil_supplies_citizen_id_fkey FOREIGN KEY (citizen_id) REFERENCES public.citizens(citizen_id) ON DELETE CASCADE;


--
-- TOC entry 3274 (class 2606 OID 32810)
-- Name: district_master district_master_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.district_master
    ADD CONSTRAINT district_master_state_id_fkey FOREIGN KEY (state_id) REFERENCES public.state_master(state_id) ON DELETE CASCADE;


--
-- TOC entry 3287 (class 2606 OID 33153)
-- Name: education_master education_master_citizen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.education_master
    ADD CONSTRAINT education_master_citizen_id_fkey FOREIGN KEY (citizen_id) REFERENCES public.civil_supplies(citizen_id) ON DELETE CASCADE;


--
-- TOC entry 3288 (class 2606 OID 33158)
-- Name: education_master education_master_scholarship_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.education_master
    ADD CONSTRAINT education_master_scholarship_id_fkey FOREIGN KEY (scholarship_id) REFERENCES public.scholarship_master(scholarship_id) ON DELETE CASCADE;


--
-- TOC entry 3286 (class 2606 OID 33137)
-- Name: hospital_transaction hospital_transaction_citizen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hospital_transaction
    ADD CONSTRAINT hospital_transaction_citizen_id_fkey FOREIGN KEY (citizen_id) REFERENCES public.civil_supplies(citizen_id) ON DELETE CASCADE;


--
-- TOC entry 3285 (class 2606 OID 33132)
-- Name: hospital_transaction hospital_transaction_hospital_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hospital_transaction
    ADD CONSTRAINT hospital_transaction_hospital_id_fkey FOREIGN KEY (hospital_id) REFERENCES public.hospital_master(hospital_id) ON DELETE CASCADE;


--
-- TOC entry 3279 (class 2606 OID 32901)
-- Name: lpg_transaction lpg_transaction_citizen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lpg_transaction
    ADD CONSTRAINT lpg_transaction_citizen_id_fkey FOREIGN KEY (citizen_id) REFERENCES public.citizens(citizen_id) ON DELETE CASCADE;


--
-- TOC entry 3278 (class 2606 OID 32896)
-- Name: lpg_transaction lpg_transaction_dbt_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lpg_transaction
    ADD CONSTRAINT lpg_transaction_dbt_id_fkey FOREIGN KEY (dbt_id) REFERENCES public.dbt_master(bdt_id) ON DELETE CASCADE;


--
-- TOC entry 3275 (class 2606 OID 32820)
-- Name: mandal_master mandal_master_district_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mandal_master
    ADD CONSTRAINT mandal_master_district_id_fkey FOREIGN KEY (district_id) REFERENCES public.district_master(district_id) ON DELETE CASCADE;


--
-- TOC entry 3283 (class 2606 OID 33111)
-- Name: nregs_master nregs_master_bdt_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nregs_master
    ADD CONSTRAINT nregs_master_bdt_id_fkey FOREIGN KEY (bdt_id) REFERENCES public.dbt_master(bdt_id) ON DELETE CASCADE;


--
-- TOC entry 3282 (class 2606 OID 33106)
-- Name: nregs_master nregs_master_citizen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nregs_master
    ADD CONSTRAINT nregs_master_citizen_id_fkey FOREIGN KEY (citizen_id) REFERENCES public.civil_supplies(citizen_id) ON DELETE CASCADE;


--
-- TOC entry 3284 (class 2606 OID 33122)
-- Name: nregs_transaction nregs_transaction_nregs_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nregs_transaction
    ADD CONSTRAINT nregs_transaction_nregs_id_fkey FOREIGN KEY (nregs_id) REFERENCES public.nregs_master(nregs_id) ON DELETE CASCADE;


--
-- TOC entry 3291 (class 2606 OID 33207)
-- Name: pension_transaction pension_transaction_citizen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pension_transaction
    ADD CONSTRAINT pension_transaction_citizen_id_fkey FOREIGN KEY (citizen_id) REFERENCES public.civil_supplies(citizen_id) ON DELETE CASCADE;


--
-- TOC entry 3292 (class 2606 OID 33212)
-- Name: pension_transaction pension_transaction_pension_schem_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pension_transaction
    ADD CONSTRAINT pension_transaction_pension_schem_id_fkey FOREIGN KEY (pension_schem_id) REFERENCES public.pension_master(pension_schem_id) ON DELETE CASCADE;


--
-- TOC entry 3276 (class 2606 OID 32830)
-- Name: village_master village_master_mandal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.village_master
    ADD CONSTRAINT village_master_mandal_id_fkey FOREIGN KEY (mandal_id) REFERENCES public.mandal_master(mandal_id) ON DELETE CASCADE;


-- Completed on 2022-03-22 00:11:09

--
-- PostgreSQL database dump complete
--

