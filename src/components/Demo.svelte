<script lang="ts">
  import { onMount } from "svelte";
  import localforage from "localforage";

  onMount(async () => {
    const demo = await localforage.getItem("demo");
    if (!demo) {
      window.location.href = "#demo";
    }
  });
  const close = () => {
    localforage.setItem("demo", true);
  };
</script>

<div class="modal z-10000" id="demo">
  <div class="modal-box max-w-400 flex flex-col gap-5">
    <h3 class="font-bold text-lg">Welcome to RV Tracker</h3>
    <p>
      This is a small app to track your return visits. I know there is many
      other applications that do this but most of them felt overcomplicated and
      difficult to use.
    </p>
    <p>
      I wanted to be able to write down a new return visit in 2 clicks so I made
      RVTracker. I designed RVTracker so that you can record return visits
      however you remember them best. So, the address line does not even need to
      be an address it can be anything that helps you remember where it is. Use
      the plus button to add a return visit and click on a return visit for more
      options.
    </p>
    <p>
      This web app is installable on Windows/Mac/Android devices (Sorry IOS)
      just look for the popup menu that will open soon!
    </p>
    <p>
      PS: I don't recive any of the data that you enter into this site. In fact,
      if you install this as an app you don't even need internet to use it!
    </p>
    <p>
      If you have any sugestions, i'd love to hear them. Contact me at: <a
        href="mailto:guppybyte@gmail.com"
        class="link">Guppybyte@gmail.com</a
      >
    </p>
    <div class="modal-action">
      <a href="/" class="btn btn-primary" on:click={close}>Got it!</a>
    </div>
  </div>
</div>
