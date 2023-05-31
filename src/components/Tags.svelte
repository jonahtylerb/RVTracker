<script lang="ts">
  import localforage from "localforage";
  import { onMount } from "svelte";
  import Fuse from "fuse.js";

  export let tags: string[];
  export let labelClass: string;
  let filteredTags: string[] = [];

  const addTag = (e: Event) => {
    const value = (e.target as HTMLInputElement).dataset.value as string;
    tags = [...new Set([...tags, value])];
  };

  let allTags: string[] = [];
  onMount(async () => {
    allTags = (await localforage.getItem("tags")) as string[];
    filteredTags = allTags;
  });

  let newTag = "";
  const addNewTag = () => {
    tags = [...new Set([...tags, newTag])];
    allTags = [...new Set([...allTags, newTag])];
    localforage.setItem("tags", allTags);
  };

  let search = "";
  const searchTags = () => {
    const fuse = new Fuse(allTags, {
      minMatchCharLength: 2,
      threshold: 0.5,
    });
    filteredTags = fuse.search(search).map((result) => result.item);
    if (search.length === 0) {
      filteredTags = allTags;
    }
  };
</script>

<div class="flex flex-row gap-2 items-end">
  <div class="form-control grow-1">
    <div class="dropdown w-full">
      <input
        class="input input-bordered w-full"
        type="search"
        placeholder="Search all tags"
        name="search"
        bind:value={search}
        on:input={searchTags}
      />
      <section
        class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {#if filteredTags.length === 0}
          <p class="text-center btn btn-ghost">No tags found</p>
        {/if}
        {#each filteredTags as tag}
          <button
            type="button"
            class="btn btn-ghost"
            data-value={tag}
            on:click={addTag}
          >
            {tag}
          </button>
        {/each}
      </section>
    </div>
    <label class={labelClass} for="notes">
      <span class="label-text">Tags</span>
    </label>
  </div>

  <a href="#newTag" class="btn btn-primary" on:click={() => (newTag = "")}>
    New Tag
    <span class="i-tabler-plus text-base bg-primary-content" />
  </a>
</div>

<div class="flex flex-row flex-wrap gap-1 mt-2">
  {#each tags as tag}
    <span class="badge badge-primary flex gap-1">
      {tag}
      <button
        type="button"
        class="i-tabler-x"
        on:click={() => (tags = tags.filter((t) => t !== tag))}
      />
    </span>
  {/each}
</div>

<div class="modal" id="newTag">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-4">Create A New Tag</h3>
    <input
      type="text"
      name="tag"
      class="input input-bordered w-full"
      placeholder="Tag Name"
      bind:value={newTag}
    />
    <div class="modal-action">
      <a href="#1" class="btn btn-error btn-outline">Cancel</a>
      <a href="#1" class="btn btn-primary" on:click={addNewTag}>Add</a>
    </div>
  </div>
</div>
