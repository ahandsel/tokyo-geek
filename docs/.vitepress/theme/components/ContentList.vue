<script setup>
const pages = import.meta.glob('/docs/tips/*.md', { eager: true });

const pageList = Object.keys(pages).map((path) => {
  return {
    title: pages[path].frontmatter.title || path.split('/').pop().replace('.md', ''),
    link: path.replace('/docs', '').replace('.md', ''),
  };
});
</script>

<template>
  <div>
    <h2>Articles</h2>
    <ul>
      <li v-for="page in pageList" :key="page.link">
        <a :href="page.link">{{ page.title }}</a>
      </li>
    </ul>
  </div>
</template>