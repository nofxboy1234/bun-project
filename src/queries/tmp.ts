import { updateLocation } from "@/queries/locations";

const location = await updateLocation(2, {
  name: "The Beach",
  locationTypeId: 2,
});

console.log(location);
