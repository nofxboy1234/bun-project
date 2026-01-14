import styles from "@/styles.module.css";
import deleteIcon from "@/icons/delete.svg";
import updateIcon from "@/icons/update.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { api } from "../routes/api.v1.$";
import type { ValidationError } from "elysia";
import { SelectLocation } from "@/types/validation/zod/select";

const deleteLocation = async (id: number) => {
  const { data, error } = await api().v1.locations({ id }).delete();

  if (error) throw error.value;

  return data;
};

export function LocationPreview({ location }: { location: SelectLocation }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      try {
        await deleteLocation(id);
      } catch (error) {
        console.log((error as ValidationError).message);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });

  const locationId = location.id.toString();

  return (
    <Link
      to="/locations/$locationId"
      params={{ locationId: locationId }}
      className={styles.location}
    >
      <div>{location.name}</div>
      <div>
        {location.createdAt!.toLocaleDateString("en-ZA", {
          timeZone: "Africa/Johannesburg",
        })}
      </div>
      <div className={styles.locationOperations}>
        <img
          src={updateIcon}
          alt="Update Location"
          className={styles.updateIcon}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();

            navigate({
              to: "/locations/$locationId/edit",
              params: { locationId: locationId },
            });
          }}
        />
        <img
          src={deleteIcon}
          alt="Delete Location"
          className={styles.deleteIcon}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();

            deleteMutation.mutate(location.id);
          }}
        />
        {deleteMutation.isError && (
          <p style={{ color: "red" }}>
            {(deleteMutation.error as ValidationError).message}
          </p>
        )}
      </div>
    </Link>
  );
}
