<script>
    export let show = false;
    export let image = '';
    export let onClose;
  
    function handleClose() {
      if (onClose) onClose();
    }
  </script>
  
  {#if show}
    <div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" on:click={handleClose}>
      <img src={image} alt="Zoomed Image" class="max-w-full max-h-full rounded-lg shadow-lg" on:click|stopPropagation />
    </div>
  {/if}
  
  <style>
    .fixed {
      transition: opacity 0.3s ease;
    }
  </style>
  