<script lang="ts">
  import localforage from "localforage";
  import type { RVType } from "./utils";
  import Fuse from "fuse.js";
  import { onMount } from "svelte";
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";

  let filteredRVArray: RVType[] = [];

  let RVArray: RVType[] = [];
  onMount(() => {
    localforage.keys().then((keys) => {
      keys.forEach((key) => {
        localforage.getItem(key).then((value) => {
          RVArray = [...RVArray, value] as RVType[];
          filteredRVArray = RVArray;
        });
      });
    });
  });

  const search = (e: any) => {
    const fuse = new Fuse(RVArray, {
      keys: ["name", "address", "date", "time", "notes", "tags"],
      minMatchCharLength: 2,
      threshold: 0.3,
    });
    const value = (e.target as HTMLInputElement).value;
    const results = fuse.search(value);
    if (results.length === 0 && value.length === 0) {
      filteredRVArray = RVArray;
    } else {
      filteredRVArray = results.map((result) => result.item);
    }
  };
</script>

<input
  type="search"
  name="search"
  class="input input-bordered w-full mb-5"
  placeholder="Search"
  on:change={search}
/>
{#if filteredRVArray.length > 0}
  <div class="flex flex-col gap-5">
    {#each filteredRVArray as RV (RV.id)}
      <div
        class="card bg-base-200 group of-hidden relative"
        animate:flip={{ duration: 500 }}
        transition:fly={{ x: 200 }}
      >
        <div class="card-body">
          <hgroup class="card-title flex-col items-start">
            <h2>{RV.name}</h2>
            <h3 class="text-sm op-40 font-light">{RV.address}</h3>
          </hgroup>
          {#each RV.notes as note}
            <p>{note}</p>
          {/each}
          {#if RV.tags}
            <div class="flex flex-row gap-1">
              {#each RV.tags as tag}
                <span class="badge badge-primary badge-outline">{tag}</span>
              {/each}
            </div>
          {/if}
        </div>
        <div
          class="group-hover:bottom-0 duration-300 transition-all absolute bottom--100px bg-base-300 w-full p-5 flex flex-row gap-2"
          data-children="flex flex-row gap-1"
        >
          <a href={`/visit?id=${RV.id}`} class="btn btn-primary btn-sm">
            <span class="i-tabler-plus" />
            Add Visit
          </a>
          <a
            href={`/RV?id=${RV.id}`}
            class="btn btn-outline btn-primary btn-sm"
          >
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
    {/each}
  </div>
{:else}
  <span>No Visits found</span>
{/if}
