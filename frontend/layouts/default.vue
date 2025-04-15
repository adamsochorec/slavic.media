<template>
  <div>
    <NavBar :headerTitle="headerTitle" />
    <slot style="min-height: 71vh" />
    <RequestProposal />
    <hr class="semi bodyxfooter" role="separator" />
    <Footer />
  </div>
</template>
