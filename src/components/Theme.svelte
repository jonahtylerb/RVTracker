<script lang="ts">
  import localForage from "localforage";
  import { onMount } from "svelte";

  onMount(async () => {
    const theme = ((await localForage.getItem("theme")) as string) || "light";
    document.getElementsByTagName("html")[0].setAttribute("data-theme", theme);
  });
</script>
