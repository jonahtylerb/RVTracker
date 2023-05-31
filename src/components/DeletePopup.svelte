<script lang="ts">
  import localforage from "localforage";
  import { RVToDelete } from "./stores";

  const deleteRV = async () => {
    await localforage.removeItem($RVToDelete!.id);
    RVToDelete.set(null);
    window.location.href = "/";
  };
</script>

<div class="modal z-10000" id="delete">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Are you sure you want to delete this?</h3>
    <div class="modal-action">
      <label for="delete" class="btn btn-primary">Cancel</label>
      <button on:click={deleteRV} class="btn btn-error">Delete</button>
    </div>
  </div>
</div>
