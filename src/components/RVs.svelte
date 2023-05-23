<script lang="ts">
  import localforage from "localforage";
  import Card from "./Card.svelte";
  import type { RVType } from "./utils";

  let RVArray: RVType[] = [];
  localforage.keys().then((keys) => {
    keys.forEach((key) => {
      localforage.getItem(key).then((value) => {
        RVArray = [...RVArray, value] as RVType[];
      });
    });
  });
</script>

<div class="flex flex-col gap-5">
  {#each RVArray as RV}
    <Card {RV} />
  {/each}
</div>
