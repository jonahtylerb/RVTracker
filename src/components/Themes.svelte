<script lang="ts">
  import { themes } from "./utils";
  import localforage from "localforage";

  const setTheme = async (theme: string) => {
    await localforage.setItem("theme", theme);
    document.getElementsByTagName("html")[0].setAttribute("data-theme", theme);
  };
</script>

<section class="flex flex-col gap-5">
  <h2 class="text-2xl">Themes</h2>
  {#each themes as theme}
    <div class="card bg-base-200 shadow-lg b-2 b-base-300" data-theme={theme}>
      <div class="card-body">
        <h3 class="card-title text-xl">{theme}</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div class="card-actions">
          <button class="btn btn-primary" on:click={() => setTheme(theme)}
            >Pick me!</button
          >
        </div>
      </div>
    </div>
  {/each}
</section>
