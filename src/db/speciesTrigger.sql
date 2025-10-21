-- Helper function to get the species name for a character
CREATE OR REPLACE FUNCTION get_character_species(p_character_id INTEGER)
  RETURNS VARCHAR
  AS $$
BEGIN
  RETURN(
    SELECT
      s.name
    FROM
      species s
      JOIN characters c ON c.species_id = s.id
    WHERE
      c.id = p_character_id);
END;
$$
LANGUAGE plpgsql;

-- Trigger function to check species on contract creation/update
CREATE OR REPLACE FUNCTION check_contract_species()
  RETURNS TRIGGER
  AS $$
BEGIN
  -- Check if the human is a Human
  IF get_character_species(NEW.human_id) <> 'Human' THEN
    RAISE EXCEPTION 'Contract violation: Character with id % is not a Human.', NEW.human_id;
  END IF;
  -- Check if the devil is a Devil
  IF get_character_species(NEW.devil_id) <> 'Devil' THEN
    RAISE EXCEPTION 'Contract violation: Character with id % is not a Devil', NEW.devil_id;
  END IF;

  RETURN NEW;
END;
$$
LANGUAGE plpgsql;

-- Trigger that executes the check function before insert or update
CREATE TRIGGER trigger_check_contract_species
  BEFORE INSERT OR UPDATE ON contracts
  FOR EACH ROW
  EXECUTE FUNCTION check_contract_species();

-- To remove these later, if needed, use the following commands
-- DROP TRIGGER IF EXISTS trigger_check_contract_species ON contracts;
-- DROP FUNCTION IF EXISTS check_contract_species();
-- DROP FUNCTION IF EXISTS get_character_species(integer)
