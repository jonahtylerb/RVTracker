<script lang="ts">
  import localforage from "localforage";
  import type { RVType } from "./utils";

  export let RV: RVType;
</script>

<div class="card bg-base-200 group of-hidden relative">
  <div class="card-body">
    <hgroup class="card-title flex-col items-start">
      <h2>{RV.name}</h2>
      <h3 class="text-sm op-40 font-light">{RV.address}</h3>
    </hgroup>
    {#each RV.notes as note}
      <p>{note}</p>
    {/each}
  </div>
  <div
    class="group-hover:bottom-0 duration-300 transition-all absolute bottom--100px bg-base-300 w-full p-5 flex flex-row gap-2"
    data-children="flex flex-row gap-1"
  >
    <a href={`/visit?id=${RV.id}`} class="btn btn-primary btn-sm">
      <span class="i-tabler-plus" />
      Add Visit
    </a>
    <a href={`/RV?id=${RV.id}`} class="btn btn-outline btn-primary btn-sm">
      <span class="i-tabler-pencil" />
      Edit
    </a>
    <button
      class="btn btn-error btn-sm"
      on:click={() =>
        localforage.removeItem(RV.id).then(() => {
          window.location.reload();
        })}
    >
      <span class="i-tabler-trash" />
      Delete
    </button>
  </div>
</div>
