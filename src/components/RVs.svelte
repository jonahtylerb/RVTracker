<script lang="ts">
  import localforage from "localforage";
  import type { RVType } from "./utils";
  import ShareLink from "./ShareLink.svelte";
  import Fuse from "fuse.js";
  import { onMount } from "svelte";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";

  let filteredRVArray: RVType[] = [];

  let RVArray: RVType[] = [];

  onMount(async () => {
    const keys = await localforage.keys();
    keys.forEach(async (key) => {
      if (key === "theme" || key === "demo" || key === "tags") return;
      const value = await localforage.getItem(key);
      RVArray = [...RVArray, value] as RVType[];
      filteredRVArray = RVArray;
    });
  });

  let sort = "default";
  $: {
    filteredRVArray = RVArray.sort((a, b) => {
      if (sort === "default") {
        return a.id.localeCompare(b.id);
      } else if (sort === "name") {
        return a.name.localeCompare(b.name);
      } else if (sort === "address") {
        return a.address.localeCompare(b.address);
      } else if (sort === "date") {
        return a.date.localeCompare(b.date);
      } else if (sort === "time") {
        return a.time.localeCompare(b.time);
      } else if (sort === "tags") {
        return b.tags.length - a.tags.length;
      } else {
        return 0;
      }
    });
  }

  const search = (e: any) => {
    const fuse = new Fuse(RVArray, {
      keys: ["name", "address", "date", "time", "tags"],
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

<div class="flex flex-row gap-5">
  <input
    type="search"
    name="search"
    class="input input-bordered w-full mb-5"
    placeholder="Search"
    on:change={search}
  />
  <select name="sort" class="select select-bordered" bind:value={sort}>
    <option value="default">Sort</option>
    <option value="name">Name</option>
    <option value="address">Address</option>
    <option value="date">Date</option>
    <option value="time">Time</option>
    <option value="tags">Tag #</option>
  </select>
</div>
{#if filteredRVArray.length > 0}
  <div class="flex flex-col gap-5">
    {#each filteredRVArray as RV (RV.id)}
      <div
        class="card bg-base-100 group of-hidden relative shadow-lg b-2 b-base-200"
        animate:flip={{ duration: 500 }}
        transition:fade={{ duration: 200 }}
      >
        <div class="card-body">
          <hgroup class="card-title flex-col items-start">
            <h2>{RV.name}</h2>
            <h3 class="text-sm op-60 font-light">{RV.address}</h3>
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
        <ShareLink {RV} />
        <div
          class="group-hover:bottom-0 duration-300 transition-all absolute bottom--100px bg-base-200 w-full p-3 flex flex-row gap-2"
          data-children="flex flex-row gap-1"
        >
          <a href={`/visit?id=${RV.id}`} class="btn btn-primary btn-sm grow-1">
            <span class="i-tabler-plus" />
            Add Visit
          </a>
          <a
            href={`/RV?id=${RV.id}`}
            class="btn btn-outline btn-primary btn-sm grow-1"
          >
            <span class="i-tabler-pencil" />
            Edit
          </a>
          <button
            class="btn btn-error btn-sm grow-0"
            on:click={() =>
              localforage.removeItem(RV.id).then(() => {
                window.location.reload();
              })}
          >
            <span class="i-tabler-trash" />
            <span class="sr-only">Delete</span>
          </button>
        </div>
      </div>
    {/each}
  </div>
{:else}
  <div class="text-center">No Visits ☹️</div>
{/if}
