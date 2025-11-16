// // await seed.character_affiliations([
// //   {
// //     characters: (ctx) =>
// //       ctx.connect(characters.find((char) => char.name === "Denji")!),
// //     affiliations: (ctx) =>
// //       ctx.connect(affiliations.find((aff) => aff.name === "Pochita")!),
// //   },
// // ]);

// // await seed.character_affiliations((charAff) => charAff(3, () => ({})), {
// //   connect: { characters, affiliations },
// // });

// // await seed.character_occupations((charOcc) => charOcc(3, () => ({})), {
// //   connect: { characters, occupations },
// // });

// // await seed.contracts(
// //   [
// //     {
// //       terms:
// //         "In exchange for letting him live in his right eye, Aki can see a few seconds into the future with the Future Devil's power. For the two others in Public Safety, one has to pay half of their lifespan, and the other one has to exchange their eyes, sense of taste and smell. The price of the exchange will depend on the future of the devil hunter.",
// //       characters_contracts_human_idTocharacters: (contractCtx) =>
// //         contractCtx.connect(characters.find((char) => char.name === "Aki")!),
// //       characters_contracts_devil_idTocharacters: (contractCtx) =>
// //         contractCtx.connect(
// //           characters.find((char) => char.name === "Future Devil")!,
// //         ),
// //     },
// //     {
// //       terms:
// //         "The Control Devil will give Aki power if he gives everything of himself to her",
// //       characters_contracts_human_idTocharacters: (contractCtx) =>
// //         contractCtx.connect(characters.find((char) => char.name === "Aki")!),
// //       characters_contracts_devil_idTocharacters: (contractCtx) =>
// //         contractCtx.connect(
// //           characters.find((char) => char.name === "Makima")!,
// //         ),
// //     },
// //     {
// //       terms:
// //         "In exchange for most of his lifespan, the Curse Devil kills his target if he stabs it with his sword by three times.",
// //       characters_contracts_human_idTocharacters: (contractCtx) =>
// //         contractCtx.connect(characters.find((char) => char.name === "Aki")!),
// //       characters_contracts_devil_idTocharacters: (contractCtx) =>
// //         contractCtx.connect(
// //           characters.find((char) => char.name === "Curse Devil")!,
// //         ),
// //     },
// //     {
// //       terms:
// //         "In exchange for feeding her a part of his body, Aki may summon the Fox Devil to attack a target. Aki can summon her head because the Fox Devil considers him 'handsome'",
// //       characters_contracts_human_idTocharacters: (contractCtx) =>
// //         contractCtx.connect(characters.find((char) => char.name === "Aki")!),
// //       characters_contracts_devil_idTocharacters: (contractCtx) =>
// //         contractCtx.connect(
// //           characters.find((char) => char.name === "Fox Devil")!,
// //         ),
// //     },
// //     {
// //       terms:
// //         "In exchange for promising to find and befriend the reincarnated blood devil and 'turn her back into Power,' Power gave Denji her blood.",
// //       characters_contracts_human_idTocharacters: (contractCtx) =>
// //         contractCtx.connect(
// //           characters.find((char) => char.name === "Denji")!,
// //         ),
// //       characters_contracts_devil_idTocharacters: (contractCtx) =>
// //         contractCtx.connect(
// //           characters.find((char) => char.name === "Power")!,
// //         ),
// //     },
// //     {
// //       terms:
// //         "In exchange for living a normal life, the Chainsaw Devil became Denji's heart and turned him into a hybrid.",
// //       characters_contracts_human_idTocharacters: (contractCtx) =>
// //         contractCtx.connect(
// //           characters.find((char) => char.name === "Denji")!,
// //         ),
// //       characters_contracts_devil_idTocharacters: (contractCtx) =>
// //         contractCtx.connect(
// //           characters.find((char) => char.name === "Pochita")!,
// //         ),
// //     },
// //     {
// //       terms:
// //         "In exchange for escaping Aging's World, and Yoshida, Denji, Asa, Yoru and the Aging Devil's Victim to return to their respective worlds and never fight each other again.",
// //       characters_contracts_human_idTocharacters: (contractCtx) =>
// //         contractCtx.connect(
// //           characters.find((char) => char.name === "Denji")!,
// //         ),
// //       characters_contracts_devil_idTocharacters: (contractCtx) =>
// //         contractCtx.connect(
// //           characters.find((char) => char.name === "Aging Devil")!,
// //         ),
// //     },
// //   ],
// //   // {
// //   //   connect: { characters },
// //   // },
// // );

// // const { relative_types } = await seed.relative_types([
// //   { name: "Mother" },
// //   { name: "Father" },
// //   { name: "Child" },
// //   { name: "Sister" },
// //   { name: "Brother" },
// //   { name: "Owner" },
// //   { name: "Pet" },
// //   { name: "Devil Pet" },
// //   { name: "Previous Incarnation" },
// //   { name: "Reincarnation" },
// //   { name: "Boyfriend" },
// //   { name: "Girlfriend" },
// // ]);

// // await seed.relatives((relative) => relative(3, () => ({})), {
// //   connect: { characters, relative_types },
// // });
