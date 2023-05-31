<script lang="ts">
  import localforage from "localforage";
  import type { RVType } from "./utils";
  import ShareLink from "./ShareLink.svelte";
  import Fuse from "fuse.js";
  import { onMount } from "svelte";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import { RVToDelete } from "./stores";
  import DeletePopup from "./DeletePopup.svelte";

  let filteredRVArray: RVType[] = [];

  let RVArray: RVType[] = [];
  let allTags: string[] = [];

  onMount(async () => {
    const keys = await localforage.keys();
    keys.forEach(async (key) => {
      if (key === "theme" || key === "demo" || key === "tags") return;
      const value = await localforage.getItem(key);
      RVArray = [...RVArray, value] as RVType[];
      filteredRVArray = RVArray;
    });
    allTags = (await localforage.getItem("tags")) as string[];
  });

  let sort = "date";
  let sortUp = false;
  const sortRVs = () => {
    filteredRVArray = RVArray.sort((a, b) => {
      if (sort === "date") {
        return a.id.localeCompare(b.id);
      } else if (sort === "name") {
        return a.name.localeCompare(b.name);
      } else if (sort === "address") {
        return a.address.localeCompare(b.address);
      } else if (sort === "time") {
        return a.time.localeCompare(b.time);
      } else if (sort === "tags") {
        return b.tags.length - a.tags.length;
      } else {
        return 0;
      }
    });
    if (sortUp) {
      filteredRVArray = filteredRVArray.reverse();
    }
  };

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

  const date = {
    date: new Date().toDateString().replace(/ [0-9]{4}/g, ""),
    time: new Date().toLocaleTimeString().replace(/:[0-9]{2} /g, " "),
  };

  const showRVByTag = (tag: string) => {
    filteredRVArray = RVArray.filter((rv) => rv.tags.includes(tag));
  };
</script>

<div class="flex flex-row flex-center mb-5 gap-3">
  <input
    type="search"
    name="search"
    class="input input-bordered grow-1"
    placeholder="Search"
    on:change={search}
  />
  <div class="input-group w-auto grow-0">
    <select
      name="sort"
      class="select select-bordered"
      bind:value={sort}
      on:input={sortRVs}
    >
      <option value="date">Date</option>
      <option value="name">Name</option>
      <option value="address">Address</option>
      <option value="time">Time</option>
      <option value="tags">Tag #</option>
    </select>
    <label class="swap swap-rotate btn btn-square text-md">
      <input type="checkbox" bind:checked={sortUp} on:input={sortRVs} />
      <div class="swap-on">
        <span class="sr-only">sort asending</span>
        <span class="i-tabler-sort-ascending-2 bg-neutral-content" />
      </div>
      <div class="swap-off">
        <span class="sr-only">sort desending</span>
        <span class="i-tabler-sort-descending-2 bg-neutral-content" />
      </div>
    </label>
  </div>
</div>

<div class="flex flex-row flex-wrap gap-1 mb-5">
  <button class="badge" on:click={() => (filteredRVArray = RVArray)}
    >Clear filter</button
  >
  {#each allTags as tag}
    <button class="badge badge-primary" on:click={() => showRVByTag(tag)}
      >{tag}</button
    >
  {/each}
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
          <header class="flex flex-row justify-between">
            <hgroup class="card-title flex-col items-start max-w-75%">
              <h2 class="text-ellipsis overflow-hidden max-w-full">
                {RV.name}
              </h2>
              <h3
                class="text-sm op-60 font-light text-ellipsis overflow-hidden max-w-full"
              >
                {RV.address}
              </h3>
            </hgroup>
            <span class="text-xs op-60 font-light text-right">
              {date.date}
              <br />
              {date.time}
            </span>
          </header>
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
            on:click={() => {
              $RVToDelete = RV;
              window.location.href = "#delete";
            }}
          >
            <span class="i-tabler-trash" />
            <span class="sr-only">Delete</span>
          </button>
        </div>
      </div>
    {/each}
  </div>
  <DeletePopup />
{:else}
  <div class="text-center">No Visits ☹️</div>
{/if}
