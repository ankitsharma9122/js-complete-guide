
## Pagination

Pagination is the process of splitting a large dataset into smaller, manageable chunks (pages).

## 1. Offset-Based Pagination

### How It Works

The client requests a page by specifying:
- `offset`: number of records to skip
- `limit`: number of records to return

```http
GET /posts?offset=20&limit=10
```

### Pros
- Simple to implement
- Easy to understand and test
- Good for static datasets

###  Cons
- Can cause **duplicate or missing data** if the underlying data changes (e.g., new records added or deleted)
- Performance drops with large offsets (especially in large datasets)


## 2. Cursor-Based Pagination

###  How It Works

The client provides a **cursor** (usually the ID or timestamp of the last item from the previous page), and the server returns the next set.

```http
GET /posts?cursor=1681234567890&limit=10
```

Or in a social media-like API:
```http
GET /posts?after=post_107&limit=10
```

### Pros
- Consistent data — no skips or duplicates during changes
- Fast for large datasets
- Ideal for **real-time** or **infinite scroll** applications

### Cons
- More complex implementation
- Difficult to jump to a specific page (e.g., "Page 5")

---

- **Offset-based**: You now skip the first 10 items, missing the item that was originally at position 10 (because it’s now at 11).

- **Cursor-based**: You use the last seen item’s ID/timestamp, so the next page starts from exactly where you left off.

---

## Example Backend (Pseudo-code)

### Offset
```sql
SELECT * FROM posts ORDER BY created_at DESC
LIMIT 10 OFFSET 20;
```

### Cursor
```sql
SELECT * FROM posts
WHERE created_at < '2025-04-12T12:00:00Z'
ORDER BY created_at DESC
LIMIT 10;
```

---

## Frontend Support (React Example)

### Offset
```js
fetch(`/posts?offset=${page * limit}&limit=${limit}`);
```

### Cursor
```js
fetch(`/posts?cursor=${lastPostId}&limit=10`);
```

---

## Summary

- Offset is easy, but risky when data changes.
- Cursor is robust, but more complex.
- Pick based on your **user experience needs** and **data volatility**.

---

* Database ko first 10000 rows scan + skip karne padte hain
* Cursor-based pagination = index-friendly pointer → backend queries fast & memory-efficient, and ensures consistent scrolling experience.