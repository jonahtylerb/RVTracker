<script lang="ts">
  import { onMount } from "svelte";
  import JSConfetti from "js-confetti";
  import { uid } from "./utils";
  import localforage from "localforage";

  let confetti: JSConfetti;

  onMount(() => {
    confetti = new JSConfetti();
    const params = new URLSearchParams(window.location.search);
    const get = (name: string) => {
      return atob(params.get(name) || "");
    };
    const RV = {
      id: uid(),
      name: get("n"),
      address: get("a"),
      gender: get("g"),
      date: get("d"),
      time: get("t"),
      tags: get("tg").split(","),
      notes: get("nt").split(","),
      returnDate: get("rd"),
      returnTime: get("rt"),
    };
    localforage.setItem(RV.id, RV).then(() => {
      confetti.addConfetti();
      window.location.href = "#saved";
    });
  });
</script>

<div class="modal z-10000" id="saved">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Imported successfully</h3>
    <div class="modal-action">
      <a href="/" class="btn"> Yay! </a>
    </div>
  </div>
</div>
