Page navigation for lists — post archive, search results.
```jsx
<Pagination page={page} total={5} onChange={setPage} />
```
- Prev/next text buttons at the ends, mono zero-padded numbers in the middle; current page = ink fill with bee text. Collapses with "…" beyond `siblings`.
