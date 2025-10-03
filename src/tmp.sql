SELECT
  person.*,
  -- Select person's pets as a json array
  (
    SELECT
      COALESCE(JSON_AGG(pet), '[]')
    FROM
      (
        SELECT
          pet.id,
          pet.name
        FROM
          pet
        WHERE
          pet.owner_id = person.id
        ORDER BY
          pet.name
      ) pet
  ) pet,
  -- Select person's mother as a json object
  (
    SELECT
      TO_JSON(mother)
    FROM
      (
        SELECT
          mother.id,
          mother.first_name
        FROM
          person as mother
        WHERE
          mother.id = person.mother_id
      ) mother
  ) mother
FROM
  person
