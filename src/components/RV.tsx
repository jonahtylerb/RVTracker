import type { Component } from "solid-js";

const RV: Component = () => {
  return (
    <div class="card bg-base-200 group of-hidden relative">
      <div class="card-body">
        <hgroup class="card-title flex-col items-start">
          <h2>Jonah Brupbacher</h2>
          <h3 class="text-sm op-40 font-light">1828 Hermosa St</h3>
        </hgroup>
        <div class="flex flex-row flex-wrap gap-1">
          <span class="badge badge-base">New Orleans</span>
          <span class="badge badge-base">Houma</span>
        </div>
      </div>
      <div
        class="group-hover:bottom-0 duration-300 transition-all absolute bottom--100px bg-base-300 w-full p-5 flex flex-row gap-2"
        un-children="flex flex-row gap-1"
      >
        <button class="btn btn-primary btn-sm">
          <span class="i-tabler-plus" />
          Add Visit
        </button>
        <button class="btn btn-outline btn-primary btn-sm">
          <span class="i-tabler-pencil" />
          Edit
        </button>
        <button class="btn btn-error btn-sm">
          <span class="i-tabler-trash" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default RV;
