<script lang="ts">
  import { onMount } from "svelte";
  import * as localforage from "localforage";
  import type { RVType } from "./utils";

  let RV: RVType = {
    id: "",
    name: "",
    address: "",
    gender: "",
    date: "",
    time: "",
    notes: [],
    returnDate: "",
    returnTime: "",
  };
  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) return;
    localforage.getItem(id).then((curRV) => {
      if (curRV) {
        RV = curRV as RVType;
      }
    });
  });
  const save = (e: SubmitEvent) => {
    const form = e.target as HTMLFormElement;
    const values = new FormData(form);
    const newRV = {
      id: RV.id,
      name: RV.name || "",
      address: RV.address,
      gender: RV.gender,
      date: values.get("date")?.toString() || "",
      time: values.get("time")?.toString() || "",
      notes: [
        ...RV.notes,
        RV.date + " " + values.get("notes")?.toString() || "",
      ],
      returnDate: values.get("returnDate")?.toString() || "",
      returnTime: values.get("returnTime")?.toString() || "",
    };
    localforage.setItem(RV.id, newRV).then(() => {
      window.location.href = "#success";
    });
  };
  const labelClass =
    "label translate-0 peer-placeholder-shown:translate-y-100% order--1 duration-300 transition-translate";
</script>

<form on:submit|preventDefault={save}>
  <h2 class="text-xl font-bold">{RV.name}</h2>
  <h3 class="text-xl">{RV.address}</h3>
  <div class="flex flex-row flex-center gap-2 mt-5">
    <div class="form-control w-full">
      <label for="name">
        <span class="label-text">Date</span>
      </label>
      <input
        name="date"
        type="date"
        class="input input-bordered peer z-10"
        value={RV.date || new Date().toISOString().split("T")[0]}
      />
    </div>
    <div class="form-control w-full">
      <label for="time">
        <span class="label-text">Time</span>
      </label>
      <input
        name="time"
        type="time"
        class="input input-bordered peer z-10"
        value={RV.time ||
          new Date().toTimeString().split(" ")[0].split(":")[0] +
            ":" +
            new Date().toTimeString().split(" ")[0].split(":")[1]}
      />
    </div>
  </div>
  <div class="form-control">
    <textarea
      name="notes"
      placeholder="Notes"
      class="textarea textarea-bordered peer z-10"
    />
    <label class={labelClass} for="notes">
      <span class="label-text">Notes</span>
    </label>
  </div>

  <div class="flex flex-row flex-center gap-2 mt-10">
    <div class="form-control w-full">
      <label for="returnDate">
        <span class="label-text">Next Return Date</span>
      </label>
      <input
        name="returnDate"
        type="date"
        class="input input-bordered peer z-10"
        value={RV.returnDate ||
          new Date(new Date().setDate(new Date().getDate() + 7))
            .toISOString()
            .split("T")[0]}
      />
    </div>
    <div class="form-control w-full">
      <label for="returnTime">
        <span class="label-text">Next Return Time</span>
      </label>
      <input
        name="returnTime"
        type="time"
        class="input input-bordered peer z-10"
        value={RV.returnTime ||
          new Date().toTimeString().split(" ")[0].split(":")[0] +
            ":" +
            new Date().toTimeString().split(" ")[0].split(":")[1]}
      />
    </div>
  </div>

  <div class="flex flex-row gap-5 mt-15" data-children="grow-1 flex gap-1">
    <button type="submit" class="btn btn-primary">
      Save
      <span class="i-tabler-check text-base" />
    </button>
    <a href="/" type="button" class="btn btn-error">
      Cancel
      <span class="i-tabler-x text-base" />
    </a>
  </div>
  <div class="modal" id="success">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Saved successfully</h3>
      <div class="modal-action">
        <a href="/" class="btn"> Yay! </a>
      </div>
    </div>
  </div>
</form>
