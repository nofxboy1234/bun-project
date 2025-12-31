--
-- PostgreSQL database dump
--

\restrict l6WbSeUUZB3kmlbQ47tajuDZgrrqPWpQiV7eiGeTenalIGyudbqOdgh5EhGJ8uC

-- Dumped from database version 17.7
-- Dumped by pg_dump version 17.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: affiliations; Type: TABLE; Schema: public; Owner: dylan
--

CREATE TABLE public.affiliations (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    name character varying(255) NOT NULL
);


ALTER TABLE public.affiliations OWNER TO dylan;

--
-- Name: affiliations_id_seq; Type: SEQUENCE; Schema: public; Owner: dylan
--

ALTER TABLE public.affiliations ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.affiliations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: character_affiliations; Type: TABLE; Schema: public; Owner: dylan
--

CREATE TABLE public.character_affiliations (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    character_id integer NOT NULL,
    affiliation_id integer NOT NULL
);


ALTER TABLE public.character_affiliations OWNER TO dylan;

--
-- Name: character_affiliations_id_seq; Type: SEQUENCE; Schema: public; Owner: dylan
--

ALTER TABLE public.character_affiliations ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.character_affiliations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: character_aliases; Type: TABLE; Schema: public; Owner: dylan
--

CREATE TABLE public.character_aliases (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    name character varying(255) NOT NULL,
    character_id integer NOT NULL
);


ALTER TABLE public.character_aliases OWNER TO dylan;

--
-- Name: character_aliases_id_seq; Type: SEQUENCE; Schema: public; Owner: dylan
--

ALTER TABLE public.character_aliases ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.character_aliases_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: character_occupations; Type: TABLE; Schema: public; Owner: dylan
--

CREATE TABLE public.character_occupations (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    character_id integer NOT NULL,
    occupation_id integer NOT NULL
);


ALTER TABLE public.character_occupations OWNER TO dylan;

--
-- Name: character_occupations_id_seq; Type: SEQUENCE; Schema: public; Owner: dylan
--

ALTER TABLE public.character_occupations ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.character_occupations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: characters; Type: TABLE; Schema: public; Owner: dylan
--

CREATE TABLE public.characters (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    name character varying(255) NOT NULL,
    age integer,
    height integer,
    species_id integer NOT NULL,
    gender_id integer NOT NULL,
    birthplace_id integer NOT NULL,
    status_id integer NOT NULL
);


ALTER TABLE public.characters OWNER TO dylan;

--
-- Name: characters_id_seq; Type: SEQUENCE; Schema: public; Owner: dylan
--

ALTER TABLE public.characters ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.characters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: contracts; Type: TABLE; Schema: public; Owner: dylan
--

CREATE TABLE public.contracts (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    terms character varying(2000) NOT NULL,
    human_id integer NOT NULL,
    devil_id integer NOT NULL,
    CONSTRAINT no_self_contract CHECK ((human_id <> devil_id))
);


ALTER TABLE public.contracts OWNER TO dylan;

--
-- Name: contracts_id_seq; Type: SEQUENCE; Schema: public; Owner: dylan
--

ALTER TABLE public.contracts ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.contracts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: genders; Type: TABLE; Schema: public; Owner: dylan
--

CREATE TABLE public.genders (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    name character varying(255) NOT NULL
);


ALTER TABLE public.genders OWNER TO dylan;

--
-- Name: genders_id_seq; Type: SEQUENCE; Schema: public; Owner: dylan
--

ALTER TABLE public.genders ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.genders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: location_types; Type: TABLE; Schema: public; Owner: dylan
--

CREATE TABLE public.location_types (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    name character varying(255) NOT NULL
);


ALTER TABLE public.location_types OWNER TO dylan;

--
-- Name: location_types_id_seq; Type: SEQUENCE; Schema: public; Owner: dylan
--

ALTER TABLE public.location_types ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.location_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: locations; Type: TABLE; Schema: public; Owner: dylan
--

CREATE TABLE public.locations (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    name character varying(255) NOT NULL,
    location_type_id integer NOT NULL
);


ALTER TABLE public.locations OWNER TO dylan;

--
-- Name: locations_id_seq; Type: SEQUENCE; Schema: public; Owner: dylan
--

ALTER TABLE public.locations ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.locations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: maps; Type: TABLE; Schema: public; Owner: dylan
--

CREATE TABLE public.maps (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    image_file_path character varying(255) NOT NULL,
    location_id integer NOT NULL
);


ALTER TABLE public.maps OWNER TO dylan;

--
-- Name: maps_id_seq; Type: SEQUENCE; Schema: public; Owner: dylan
--

ALTER TABLE public.maps ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.maps_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: occupations; Type: TABLE; Schema: public; Owner: dylan
--

CREATE TABLE public.occupations (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    name character varying(255) NOT NULL
);


ALTER TABLE public.occupations OWNER TO dylan;

--
-- Name: occupations_id_seq; Type: SEQUENCE; Schema: public; Owner: dylan
--

ALTER TABLE public.occupations ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.occupations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: relative_types; Type: TABLE; Schema: public; Owner: dylan
--

CREATE TABLE public.relative_types (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    name character varying(255) NOT NULL
);


ALTER TABLE public.relative_types OWNER TO dylan;

--
-- Name: relative_types_id_seq; Type: SEQUENCE; Schema: public; Owner: dylan
--

ALTER TABLE public.relative_types ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.relative_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: relatives; Type: TABLE; Schema: public; Owner: dylan
--

CREATE TABLE public.relatives (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    character1_id integer NOT NULL,
    character2_id integer NOT NULL,
    relative_type_id integer NOT NULL
);


ALTER TABLE public.relatives OWNER TO dylan;

--
-- Name: relatives_id_seq; Type: SEQUENCE; Schema: public; Owner: dylan
--

ALTER TABLE public.relatives ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.relatives_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: species; Type: TABLE; Schema: public; Owner: dylan
--

CREATE TABLE public.species (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    name character varying(255) NOT NULL,
    description character varying(2000)
);


ALTER TABLE public.species OWNER TO dylan;

--
-- Name: species_aliases; Type: TABLE; Schema: public; Owner: dylan
--

CREATE TABLE public.species_aliases (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    name character varying(255) NOT NULL,
    species_id integer NOT NULL
);


ALTER TABLE public.species_aliases OWNER TO dylan;

--
-- Name: species_aliases_id_seq; Type: SEQUENCE; Schema: public; Owner: dylan
--

ALTER TABLE public.species_aliases ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.species_aliases_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: species_id_seq; Type: SEQUENCE; Schema: public; Owner: dylan
--

ALTER TABLE public.species ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.species_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: statuses; Type: TABLE; Schema: public; Owner: dylan
--

CREATE TABLE public.statuses (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    name character varying(255) NOT NULL
);


ALTER TABLE public.statuses OWNER TO dylan;

--
-- Name: statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: dylan
--

ALTER TABLE public.statuses ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.statuses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: affiliations affiliations_pkey; Type: CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.affiliations
    ADD CONSTRAINT affiliations_pkey PRIMARY KEY (id);


--
-- Name: character_affiliations character_affiliations_pkey; Type: CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.character_affiliations
    ADD CONSTRAINT character_affiliations_pkey PRIMARY KEY (id);


--
-- Name: character_aliases character_aliases_pkey; Type: CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.character_aliases
    ADD CONSTRAINT character_aliases_pkey PRIMARY KEY (id);


--
-- Name: character_occupations character_occupations_pkey; Type: CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.character_occupations
    ADD CONSTRAINT character_occupations_pkey PRIMARY KEY (id);


--
-- Name: characters characters_pkey; Type: CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.characters
    ADD CONSTRAINT characters_pkey PRIMARY KEY (id);


--
-- Name: contracts contracts_pkey; Type: CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_pkey PRIMARY KEY (id);


--
-- Name: genders genders_pkey; Type: CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.genders
    ADD CONSTRAINT genders_pkey PRIMARY KEY (id);


--
-- Name: location_types location_types_pkey; Type: CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.location_types
    ADD CONSTRAINT location_types_pkey PRIMARY KEY (id);


--
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- Name: maps maps_pkey; Type: CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.maps
    ADD CONSTRAINT maps_pkey PRIMARY KEY (id);


--
-- Name: occupations occupations_pkey; Type: CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.occupations
    ADD CONSTRAINT occupations_pkey PRIMARY KEY (id);


--
-- Name: relative_types relative_types_pkey; Type: CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.relative_types
    ADD CONSTRAINT relative_types_pkey PRIMARY KEY (id);


--
-- Name: relatives relatives_pkey; Type: CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.relatives
    ADD CONSTRAINT relatives_pkey PRIMARY KEY (id);


--
-- Name: species_aliases species_aliases_pkey; Type: CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.species_aliases
    ADD CONSTRAINT species_aliases_pkey PRIMARY KEY (id);


--
-- Name: species species_pkey; Type: CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.species
    ADD CONSTRAINT species_pkey PRIMARY KEY (id);


--
-- Name: statuses statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.statuses
    ADD CONSTRAINT statuses_pkey PRIMARY KEY (id);


--
-- Name: affiliations_name_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE UNIQUE INDEX affiliations_name_idx ON public.affiliations USING btree (name);


--
-- Name: character_affiliations_affiliation_id_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE INDEX character_affiliations_affiliation_id_idx ON public.character_affiliations USING btree (affiliation_id);


--
-- Name: character_affiliations_characterId_affiliationId_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE UNIQUE INDEX "character_affiliations_characterId_affiliationId_idx" ON public.character_affiliations USING btree (character_id, affiliation_id);


--
-- Name: character_affiliations_character_id_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE INDEX character_affiliations_character_id_idx ON public.character_affiliations USING btree (character_id);


--
-- Name: character_aliases_character_id_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE INDEX character_aliases_character_id_idx ON public.character_aliases USING btree (character_id);


--
-- Name: character_aliases_name_characterId_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE UNIQUE INDEX "character_aliases_name_characterId_idx" ON public.character_aliases USING btree (name);


--
-- Name: character_occupations_characterId_occupationId_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE UNIQUE INDEX "character_occupations_characterId_occupationId_idx" ON public.character_occupations USING btree (character_id, occupation_id);


--
-- Name: character_occupations_character_id_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE INDEX character_occupations_character_id_idx ON public.character_occupations USING btree (character_id);


--
-- Name: character_occupations_occupation_id_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE INDEX character_occupations_occupation_id_idx ON public.character_occupations USING btree (occupation_id);


--
-- Name: characters_birthplace_id_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE INDEX characters_birthplace_id_idx ON public.characters USING btree (birthplace_id);


--
-- Name: characters_gender_id_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE INDEX characters_gender_id_idx ON public.characters USING btree (gender_id);


--
-- Name: characters_name_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE UNIQUE INDEX characters_name_idx ON public.characters USING btree (name);


--
-- Name: characters_species_id_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE INDEX characters_species_id_idx ON public.characters USING btree (species_id);


--
-- Name: characters_status_id_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE INDEX characters_status_id_idx ON public.characters USING btree (status_id);


--
-- Name: contracts_devil_id_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE INDEX contracts_devil_id_idx ON public.contracts USING btree (devil_id);


--
-- Name: contracts_humanId_devilId_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE UNIQUE INDEX "contracts_humanId_devilId_idx" ON public.contracts USING btree (human_id, devil_id);


--
-- Name: contracts_human_id_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE INDEX contracts_human_id_idx ON public.contracts USING btree (human_id);


--
-- Name: genders_name_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE UNIQUE INDEX genders_name_idx ON public.genders USING btree (name);


--
-- Name: location_type_id_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE INDEX location_type_id_idx ON public.locations USING btree (location_type_id);


--
-- Name: location_types_name_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE UNIQUE INDEX location_types_name_idx ON public.location_types USING btree (name);


--
-- Name: locations_name_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE UNIQUE INDEX locations_name_idx ON public.locations USING btree (name);


--
-- Name: maps_location_id_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE UNIQUE INDEX maps_location_id_idx ON public.maps USING btree (location_id);


--
-- Name: occupations_name_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE UNIQUE INDEX occupations_name_idx ON public.occupations USING btree (name);


--
-- Name: relative_types_name_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE UNIQUE INDEX relative_types_name_idx ON public.relative_types USING btree (name);


--
-- Name: relatives_character1Id_character2Id_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE UNIQUE INDEX "relatives_character1Id_character2Id_idx" ON public.relatives USING btree (character1_id, character2_id);


--
-- Name: relatives_character1_id_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE INDEX relatives_character1_id_idx ON public.relatives USING btree (character1_id);


--
-- Name: relatives_character2_id_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE INDEX relatives_character2_id_idx ON public.relatives USING btree (character2_id);


--
-- Name: relatives_relative_type_id_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE INDEX relatives_relative_type_id_idx ON public.relatives USING btree (relative_type_id);


--
-- Name: species_aliases_name_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE UNIQUE INDEX species_aliases_name_idx ON public.species_aliases USING btree (name);


--
-- Name: species_aliases_species_id_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE INDEX species_aliases_species_id_idx ON public.species_aliases USING btree (species_id);


--
-- Name: species_name_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE UNIQUE INDEX species_name_idx ON public.species USING btree (name);


--
-- Name: statuses_name_idx; Type: INDEX; Schema: public; Owner: dylan
--

CREATE UNIQUE INDEX statuses_name_idx ON public.statuses USING btree (name);


--
-- Name: character_affiliations character_affiliations_affiliation_id_affiliations_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.character_affiliations
    ADD CONSTRAINT character_affiliations_affiliation_id_affiliations_id_fkey FOREIGN KEY (affiliation_id) REFERENCES public.affiliations(id) ON DELETE CASCADE;


--
-- Name: character_affiliations character_affiliations_character_id_characters_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.character_affiliations
    ADD CONSTRAINT character_affiliations_character_id_characters_id_fkey FOREIGN KEY (character_id) REFERENCES public.characters(id) ON DELETE CASCADE;


--
-- Name: character_aliases character_aliases_character_id_characters_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.character_aliases
    ADD CONSTRAINT character_aliases_character_id_characters_id_fkey FOREIGN KEY (character_id) REFERENCES public.characters(id) ON DELETE CASCADE;


--
-- Name: character_occupations character_occupations_character_id_characters_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.character_occupations
    ADD CONSTRAINT character_occupations_character_id_characters_id_fkey FOREIGN KEY (character_id) REFERENCES public.characters(id) ON DELETE CASCADE;


--
-- Name: character_occupations character_occupations_occupation_id_occupations_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.character_occupations
    ADD CONSTRAINT character_occupations_occupation_id_occupations_id_fkey FOREIGN KEY (occupation_id) REFERENCES public.occupations(id) ON DELETE CASCADE;


--
-- Name: characters characters_birthplace_id_locations_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.characters
    ADD CONSTRAINT characters_birthplace_id_locations_id_fkey FOREIGN KEY (birthplace_id) REFERENCES public.locations(id) ON DELETE CASCADE;


--
-- Name: characters characters_gender_id_genders_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.characters
    ADD CONSTRAINT characters_gender_id_genders_id_fkey FOREIGN KEY (gender_id) REFERENCES public.genders(id) ON DELETE CASCADE;


--
-- Name: characters characters_species_id_species_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.characters
    ADD CONSTRAINT characters_species_id_species_id_fkey FOREIGN KEY (species_id) REFERENCES public.species(id) ON DELETE CASCADE;


--
-- Name: characters characters_status_id_statuses_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.characters
    ADD CONSTRAINT characters_status_id_statuses_id_fkey FOREIGN KEY (status_id) REFERENCES public.statuses(id) ON DELETE CASCADE;


--
-- Name: contracts contracts_devil_id_characters_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_devil_id_characters_id_fkey FOREIGN KEY (devil_id) REFERENCES public.characters(id) ON DELETE CASCADE;


--
-- Name: contracts contracts_human_id_characters_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_human_id_characters_id_fkey FOREIGN KEY (human_id) REFERENCES public.characters(id) ON DELETE CASCADE;


--
-- Name: locations locations_location_type_id_location_types_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_location_type_id_location_types_id_fkey FOREIGN KEY (location_type_id) REFERENCES public.location_types(id) ON DELETE CASCADE;


--
-- Name: maps maps_location_id_locations_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.maps
    ADD CONSTRAINT maps_location_id_locations_id_fkey FOREIGN KEY (location_id) REFERENCES public.locations(id) ON DELETE CASCADE;


--
-- Name: relatives relatives_character1_id_characters_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.relatives
    ADD CONSTRAINT relatives_character1_id_characters_id_fkey FOREIGN KEY (character1_id) REFERENCES public.characters(id) ON DELETE CASCADE;


--
-- Name: relatives relatives_character2_id_characters_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.relatives
    ADD CONSTRAINT relatives_character2_id_characters_id_fkey FOREIGN KEY (character2_id) REFERENCES public.characters(id) ON DELETE CASCADE;


--
-- Name: relatives relatives_relative_type_id_relative_types_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.relatives
    ADD CONSTRAINT relatives_relative_type_id_relative_types_id_fkey FOREIGN KEY (relative_type_id) REFERENCES public.relative_types(id) ON DELETE CASCADE;


--
-- Name: species_aliases species_aliases_species_id_species_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dylan
--

ALTER TABLE ONLY public.species_aliases
    ADD CONSTRAINT species_aliases_species_id_species_id_fkey FOREIGN KEY (species_id) REFERENCES public.species(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict l6WbSeUUZB3kmlbQ47tajuDZgrrqPWpQiV7eiGeTenalIGyudbqOdgh5EhGJ8uC

